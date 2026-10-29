/* Daily limits on the free check, counted in the shared store so every server
   instance sees the same numbers (Vercel runs many, and restarts them often).
   Without the store (local development) the counters live in memory. */

import { adminEmail, sendMail } from "../_pay/maib";
import { dayOf, readStoreJson, storeWritable, writeStoreJson } from "../_track/store";

type Day = { start: number; request: number; ip: Record<string, number>; notified?: boolean };
type Kind = "start" | "request";

const CAP = () => Number(process.env.AUDIT_PER_DAY || 50); // checks per day, the whole site
const CAP_IP = () => Number(process.env.AUDIT_PER_IP_DAY || 5); // checks per day, one visitor

const mem = new Map<string, Day>();
const blank = (): Day => ({ start: 0, request: 0, ip: {} });

async function load(day: string): Promise<Day> {
  if (storeWritable()) return (await readStoreJson<Day>(`limits/${day}.json`)) || blank();
  return mem.get(day) || blank();
}
async function save(day: string, d: Day): Promise<void> {
  if (storeWritable()) await writeStoreJson(`limits/${day}.json`, d);
  else mem.set(day, d);
}

/* one more check (or report request) from this visitor today: allowed, or over the visitor's or the site's limit */
export async function allow(kind: Kind, ip: string): Promise<"ok" | "ip" | "site"> {
  const day = dayOf(new Date());
  const d = await load(day);
  const key = `${kind}:${ip}`;
  if (d[kind] >= CAP()) {
    if (!d.notified) {
      d.notified = true;
      await save(day, d);
      sendMail({ email: adminEmail() }, `Verificările au atins limita zilnică (${CAP()})`, `<p>Azi s-au făcut ${d[kind]} verificări pe landings.md, limita e ${CAP()}. Până mâine, verificarea afișează „revino mâine”.</p>`, `Azi s-au făcut ${d[kind]} verificări, limita e ${CAP()}.`).catch(() => false);
    }
    return "site";
  }
  if ((d.ip[key] || 0) >= CAP_IP()) return "ip";
  d[kind] += 1;
  d.ip[key] = (d.ip[key] || 0) + 1;
  await save(day, d);
  return "ok";
}

/* each step of a check runs once per report: a replayed request gets nothing */
const ran = new Set<string>();
export async function once(rid: string, step: string): Promise<boolean> {
  const key = `${rid}-${step}`;
  if (storeWritable()) {
    if (await readStoreJson<{ t: string }>(`ran/${key}.json`)) return false;
    await writeStoreJson(`ran/${key}.json`, { t: new Date().toISOString() });
    return true;
  }
  if (ran.has(key)) return false;
  ran.add(key);
  return true;
}

/* a paid report runs each deeper step a few times at most (a retry after a failure, a second device) */
const deepRuns = new Map<string, number>();
export function allowDeep(rid: string, step: string): boolean {
  if (deepRuns.size > 5000) deepRuns.clear();
  const n = (deepRuns.get(`${rid}:${step}`) || 0) + 1;
  deepRuns.set(`${rid}:${step}`, n);
  return n <= Number(process.env.AUDIT_DEEP_RUNS || 3);
}

export function newRid(): string {
  const abc = "abcdefghijkmnpqrstuvwxyz23456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => abc[b % abc.length]).join("");
}
