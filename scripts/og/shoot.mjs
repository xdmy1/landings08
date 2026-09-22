// Mobile screenshots through the DevTools protocol (real 390px viewport, DSF 3).
// Usage: node shoot.mjs <outDir> name=url [name=url ...]
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const [outDir, ...pairs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const chrome = spawn(
  CH,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${outDir}/.profile`,
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForChrome() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return;
    } catch {}
    await sleep(200);
  }
  throw new Error("chrome did not start");
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
    } else if (m.method) listeners.forEach((l) => l(m));
  };
  const ready = new Promise((r) => (ws.onopen = r));
  return {
    ready,
    send: (method, params = {}) =>
      new Promise((res, rej) => {
        const i = ++id;
        pending.set(i, { res, rej });
        ws.send(JSON.stringify({ id: i, method, params }));
      }),
    on: (fn) => listeners.push(fn),
    close: () => ws.close(),
  };
}

async function shoot(name, url) {
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json();
  const c = cdp(t.webSocketDebuggerUrl);
  await c.ready;
  await c.send("Page.enable");
  await c.send("Emulation.setUserAgentOverride", { userAgent: UA, platform: "iPhone" });
  await c.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
    screenWidth: 390,
    screenHeight: 844,
  });
  await c.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  const loaded = new Promise((r) => c.on((m) => m.method === "Page.loadEventFired" && r()));
  await c.send("Page.navigate", { url });
  await Promise.race([loaded, sleep(15000)]);
  await sleep(3500); // let fonts, images and entrance animations settle
  // Kill cookie banners / fixed overlays that would sit on the hero
  await c.send("Runtime.evaluate", {
    expression: `(() => {
      const kill = [...document.querySelectorAll('[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i]')];
      kill.forEach(el => el.remove());
      // fixed overlays parked over the lower half (cookie sheets, dim backdrops)
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (cs.position !== 'fixed') continue;
        const r = el.getBoundingClientRect();
        const covers = r.height > innerHeight * 0.8 && r.width > innerWidth * 0.8;
        if (r.top > innerHeight * 0.35 || covers) el.remove();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0,0);
    })()`,
  });
  await sleep(400);
  const { data } = await c.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(`${outDir}/${name}.png`, Buffer.from(data, "base64"));
  console.log("ok", name);
  c.close();
  await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`);
}

try {
  await waitForChrome();
  for (const p of pairs) {
    const [name, url] = p.split("=");
    try {
      await shoot(name, url);
    } catch (e) {
      console.error("fail", name, e.message);
    }
  }
} finally {
  chrome.kill();
}
