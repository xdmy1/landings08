// Render og.html at 1200x630 (DSF 2) through the DevTools protocol.
// Usage: node render-og.mjs <og.html path> <out.png>
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const [htmlPath, outPath] = process.argv.slice(2);
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9334;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  CH,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PORT}`,
   `--user-data-dir=${outPath}.profile`, "--no-first-run", "--allow-file-access-from-files", "about:blank"],
  { stdio: "ignore" }
);

for (let i = 0; i < 50; i++) {
  try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break; } catch {}
  await sleep(200);
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0; const pending = new Map(); const listeners = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
    else if (m.method) listeners.forEach((l) => l(m));
  };
  const ready = new Promise((r) => (ws.onopen = r));
  return {
    ready,
    send: (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); }),
    on: (fn) => listeners.push(fn),
    close: () => ws.close(),
  };
}

try {
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json();
  const c = cdp(t.webSocketDebuggerUrl);
  await c.ready;
  await c.send("Page.enable");
  await c.send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  const loaded = new Promise((r) => c.on((m) => m.method === "Page.loadEventFired" && r()));
  await c.send("Page.navigate", { url: pathToFileURL(htmlPath).href });
  await Promise.race([loaded, sleep(10000)]);
  await c.send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
  const fonts = await c.send("Runtime.evaluate", { expression: "[...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight).join(', ')" });
  console.log("fonts:", fonts.result.value || "(none)");
  await sleep(600);
  const { data } = await c.send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 630, scale: 2 } });
  writeFileSync(outPath, Buffer.from(data, "base64"));
  console.log("ok", outPath);
  c.close();
} finally {
  chrome.kill();
}
