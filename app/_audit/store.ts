/* Where audit reports live.

   Production: a Redis database over its REST API (Upstash, added from
   Vercel → Storage, which sets KV_REST_API_URL + KV_REST_API_TOKEN or
   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
   Local dev without those variables: JSON files under .data/ (gitignored). */

import { promises as fs } from "fs";
import path from "path";
import type { Audit } from "./types";

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const REPORT_TTL = 60 * 60 * 24 * 180; // reports stay reachable for six months

export function storeReady(): boolean {
  return Boolean(URL_ && TOKEN) || process.env.NODE_ENV !== "production";
}

async function redis(cmd: (string | number)[]): Promise<unknown> {
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const j = (await r.json()) as { result?: unknown; error?: string };
  if (j.error) throw new Error(`redis: ${j.error}`);
  return j.result;
}

const DIR = path.join(process.cwd(), ".data", "audits");

/* An audit is one base record plus parts written by separate requests
   (speed, google, analysis, pay), so parallel steps never overwrite each other. */
export type Part = "speed" | "google" | "analysis" | "pay";
const PARTS: Part[] = ["speed", "google", "analysis", "pay"];

async function put(key: string, value: unknown): Promise<void> {
  if (URL_) {
    await redis(["SET", key, JSON.stringify(value), "EX", REPORT_TTL]);
    return;
  }
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(path.join(DIR, `${key.replace(/:/g, "_")}.json`), JSON.stringify(value));
}

async function getMany(keys: string[]): Promise<(unknown | null)[]> {
  if (URL_) {
    const vals = (await redis(["MGET", ...keys])) as (string | null)[];
    return vals.map((v) => (typeof v === "string" ? JSON.parse(v) : null));
  }
  return Promise.all(keys.map((k) => fs.readFile(path.join(DIR, `${k.replace(/:/g, "_")}.json`), "utf8").then(JSON.parse).catch(() => null)));
}

/* the base record: what the first request measured; the parts are saved separately */
export async function saveAudit(a: Audit): Promise<void> {
  const base = { id: a.id, createdAt: a.createdAt, url: a.url, host: a.host, keyword: a.keyword, facts: a.facts, errors: a.errors };
  await put(`audit:${a.id}`, base);
}

export async function savePart(id: string, part: Part, value: unknown): Promise<void> {
  await put(`audit:${id}:${part}`, value);
}

export async function loadAudit(id: string): Promise<Audit | null> {
  if (!/^[a-z0-9]{12}$/.test(id)) return null;
  try {
    const [base, speed, google, analysis, pay] = (await getMany([`audit:${id}`, ...PARTS.map((p) => `audit:${id}:${p}`)])) as [
      Omit<Audit, "mobile" | "desktop" | "google" | "analysis" | "paid" | "payId"> | null,
      { mobile?: Audit["mobile"]; desktop?: Audit["desktop"]; error?: string } | null,
      (Audit["google"] & { error?: string }) | { error: string } | null,
      (Audit["analysis"] & { error?: string }) | { error: string } | null,
      { paid: boolean; payId?: string } | null,
    ];
    if (!base) return null;
    const errors = [...(base.errors || [])];
    const err = (p: { error?: string } | null, label: string) => p?.error && errors.push(`${label}: ${p.error}`);
    err(speed, "speed");
    err(google as { error?: string } | null, "google");
    err(analysis as { error?: string } | null, "analysis");
    return {
      ...base,
      errors,
      mobile: speed?.mobile || undefined,
      desktop: speed?.desktop || undefined,
      google: google && !("error" in google && google.error) ? (google as Audit["google"]) : undefined,
      analysis: analysis && !("error" in analysis && analysis.error) ? (analysis as Audit["analysis"]) : undefined,
      paid: Boolean(pay?.paid),
      payId: pay?.payId,
    };
  } catch {
    return null;
  }
}

export function newAuditId(): string {
  const abc = "abcdefghijkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => abc[b % abc.length]).join("");
}

/* ---------- limits: per visitor per day, and for the whole site per day ---------- */

const memory = new Map<string, number>();

async function hit(key: string, ttl: number): Promise<number> {
  if (URL_) {
    const n = Number(await redis(["INCR", key]));
    if (n === 1) await redis(["EXPIRE", key, ttl]);
    return n;
  }
  const n = (memory.get(key) || 0) + 1;
  memory.set(key, n);
  return n;
}

export async function allowAudit(ip: string): Promise<"ok" | "ip" | "site"> {
  const day = new Date().toISOString().slice(0, 10);
  const perIp = Number(process.env.AUDIT_PER_IP_DAY || 5);
  const perSite = Number(process.env.AUDIT_PER_DAY || 300);
  if ((await hit(`audit:n:${day}`, 90000)) > perSite) return "site";
  if ((await hit(`audit:ip:${day}:${ip}`, 90000)) > perIp) return "ip";
  return "ok";
}
