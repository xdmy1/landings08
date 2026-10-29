/* IP addresses the studio blocked from the check (from /admin); kept in the shared store,
   read at most once a minute per server instance */

import { readStoreJson, storeWritable, writeStoreJson } from "./store";

export type Ban = { t: string; note?: string };
type Bans = Record<string, Ban>;

const PATH = "bans/list.json";
let mem: Bans = {};
let cache: { at: number; bans: Bans } | null = null;

export async function loadBans(fresh = false): Promise<Bans> {
  if (!storeWritable()) return mem;
  if (!fresh && cache && Date.now() - cache.at < 60_000) return cache.bans;
  const bans = (await readStoreJson<Bans>(PATH)) || {};
  cache = { at: Date.now(), bans };
  return bans;
}

async function save(bans: Bans): Promise<void> {
  if (storeWritable()) {
    await writeStoreJson(PATH, bans);
    cache = { at: Date.now(), bans };
  } else mem = bans;
}

export async function isBanned(ip: string): Promise<boolean> {
  return Boolean(ip) && Boolean((await loadBans())[ip]);
}

export async function ban(ip: string, note = ""): Promise<void> {
  const bans = { ...(await loadBans(true)) };
  bans[ip] = { t: new Date().toISOString(), note: note.slice(0, 120) };
  await save(bans);
}

export async function unban(ip: string): Promise<void> {
  const bans = { ...(await loadBans(true)) };
  delete bans[ip];
  await save(bans);
}
