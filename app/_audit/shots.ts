/* Sharp screenshots of the first screen, desktop and phone, with a real
   headless Chrome (@sparticuz/chromium on Vercel, the installed Chrome locally).
   PageSpeed's own screenshots are small and heavily compressed. */

import { publicHost } from "./collect";

export type Shots = { desktop: string | null; mobile: string | null };

const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const LOCAL_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/* headless Chrome: @sparticuz/chromium on Vercel, the installed Chrome locally */
export async function launch() {
  const chromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = (await import("puppeteer-core")).default;
  const onVercel = Boolean(process.env.VERCEL);
  return puppeteer.launch({
    args: onVercel ? [...chromium.args, "--hide-scrollbars"] : ["--hide-scrollbars"],
    executablePath: onVercel ? await chromium.executablePath() : process.env.CHROME_PATH || LOCAL_CHROME,
    headless: true,
  });
}

export async function screenshots(url: string): Promise<Shots> {
  const browser = await launch();
  const publicOk = new Map<string, Promise<boolean>>();
  const shoot = async (phone: boolean) => {
    const page = await browser.newPage();
    // the page and everything it loads must stay on public addresses
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const u = req.url();
      if (u.startsWith("data:") || u.startsWith("blob:")) return void req.continue();
      let host = "";
      try {
        const p = new URL(u);
        if (!/^https?:$/.test(p.protocol)) return void req.abort();
        host = p.hostname;
      } catch {
        return void req.abort();
      }
      if (!publicOk.has(host)) publicOk.set(host, publicHost(host));
      publicOk.get(host)!.then((ok) => (ok ? req.continue() : req.abort())).catch(() => req.abort());
    });
    if (phone) {
      await page.setUserAgent(IPHONE);
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    } else {
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.25 });
    }
    await page.goto(url, { waitUntil: "networkidle2", timeout: 22000 }).catch(() => undefined);
    await new Promise((r) => setTimeout(r, 1200)); // let fonts and entrance animations settle
    const jpg = await page.screenshot({ type: "jpeg", quality: 78 });
    await page.close();
    return `data:image/jpeg;base64,${Buffer.from(jpg).toString("base64")}`;
  };
  try {
    const [desktop, mobile] = await Promise.all([shoot(false).catch(() => null), shoot(true).catch(() => null)]);
    return { desktop, mobile };
  } finally {
    await browser.close().catch(() => undefined);
  }
}

/* what the browser hands back: only JPEG data URIs of a sane size */
export function cleanShots(v: unknown): Shots | undefined {
  if (!v || typeof v !== "object") return undefined;
  const ok = (s: unknown) => (typeof s === "string" && s.startsWith("data:image/jpeg;base64,") && s.length < 1_500_000 ? s : null);
  const o = v as Record<string, unknown>;
  const shots = { desktop: ok(o.desktop), mobile: ok(o.mobile) };
  return shots.desktop || shots.mobile ? shots : undefined;
}
