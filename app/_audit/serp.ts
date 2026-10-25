/* Real Google results, pages 1-5, from Moldova (Serper, google.serper.dev).
   Without SERPER_API_KEY the check falls back to Claude's own web search. */

export type SerpRow = { position: number; title: string; link: string; snippet: string };

export function serpReady(): boolean {
  return Boolean(process.env.SERPER_API_KEY);
}

const sameSite = (link: string, host: string) => {
  try {
    const h = new URL(link).hostname.replace(/^www\./, "");
    const target = host.replace(/^www\./, "");
    return h === target || h.endsWith("." + target);
  } catch {
    return false;
  }
};

/* walks Google page by page until the site shows up (or page 5 ends) */
export async function googlePages(q: string, host: string, maxPages = 5): Promise<{ rows: SerpRow[]; position: number | null; page: number | null }> {
  const rows: SerpRow[] = [];
  for (let page = 1; page <= maxPages; page++) {
    const r = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: { "X-API-KEY": process.env.SERPER_API_KEY!, "Content-Type": "application/json" },
      body: JSON.stringify({ q, gl: "md", hl: "ro", page }),
      cache: "no-store",
    });
    if (!r.ok) throw new Error(`serper ${r.status}`);
    const j = (await r.json()) as { organic?: { position?: number; title?: string; link?: string; snippet?: string }[] };
    const organic = j.organic || [];
    if (!organic.length) break;
    const base = rows.length; // ranks run on across pages
    organic.forEach((o, k) => rows.push({ position: base + k + 1, title: o.title || "", link: o.link || "", snippet: o.snippet || "" }));
    const hit = rows.find((x) => sameSite(x.link, host));
    if (hit) return { rows, position: hit.position, page };
  }
  return { rows, position: null, page: null };
}
