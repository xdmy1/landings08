/* Daily limits per visitor and for the whole site, kept in memory.
   Without a database this is per server instance: a soft brake on spending,
   not an exact count. */

const hits = new Map<string, number>();
let day = "";

export function allow(kind: "start" | "ai", ip: string): "ok" | "ip" | "site" {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    hits.clear();
    day = today;
  }
  const perIp = Number(process.env.AUDIT_PER_IP_DAY || 5) * (kind === "ai" ? 3 : 1);
  const perSite = Number(process.env.AUDIT_PER_DAY || 300) * (kind === "ai" ? 3 : 1);
  const site = (hits.get(`${kind}:*`) || 0) + 1;
  const mine = (hits.get(`${kind}:${ip}`) || 0) + 1;
  if (site > perSite) return "site";
  if (mine > perIp) return "ip";
  hits.set(`${kind}:*`, site);
  hits.set(`${kind}:${ip}`, mine);
  return "ok";
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
