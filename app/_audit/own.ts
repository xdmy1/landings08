/* Sites built by landings.md: the public check doesn't evaluate them.
   More domains can be added without a deploy in AUDIT_OWN_DOMAINS (comma-separated). */

const OWN = [
  "landings.md",
  "landings08.vercel.app",
  "scoalaautoglg.com",
  "mobo.md",
  "inauto.md",
  "davo.md",
  "radx.solutions",
  "inter-bus.md",
  "eurogard.md",
  "infobac.md",
];

function ownList(): string[] {
  const extra = (process.env.AUDIT_OWN_DOMAINS || "").split(",").map((d) => d.trim().toLowerCase()).filter(Boolean);
  return [...OWN, ...extra];
}

/* the domain itself or any subdomain (www., rezervari., app. ...) */
export function isOwnSite(host: string): boolean {
  const h = host.toLowerCase().replace(/\.$/, "");
  return ownList().some((d) => h === d || h.endsWith("." + d));
}
