/* What happens to a subscription: it starts when maib confirms the first payment,
   it is charged once a month, it stops when the client or the studio cancels it,
   or after three failed tries in a row. Each step sends the emails it needs. */

import { adminEmail, eurRate, executeRecurring, newOrderId, sendMail, toMdl, type PayInfo } from "./maib";
import { button, esc, p, rows, shell, tick } from "./mailui";
import { COMPANY, PLANS, planTitle, type PayLang } from "./plans";
import { fmtDateTime, fmtMoney, receiptEmail, studioEmail } from "./receipt";
import { addMonth, cancelUrl, fmtDay, markChargeOrder, saveSub, todayChisinau, type Sub } from "./subs";

const SITE = process.env.SITE_URL || "https://www.landings.md";
const MAX_FAILURES = 3;

const TX: Record<PayLang, { failSubject: string; failTitle: string; failText: (n: number) => string; stopSubject: string; stopTitle: string; stopText: string; cancelSubject: string; cancelTitle: string; cancelText: (until: string) => string; write: string }> = {
  ro: {
    failSubject: "Plata lunară nu a trecut",
    failTitle: "Plata lunară nu a trecut.",
    failText: (n) => `Nu am putut retrage plata pentru abonament de pe card (încercarea ${n} din ${MAX_FAILURES}). Încercăm din nou mâine. Dacă ați schimbat cardul sau are fonduri insuficiente, scrieți-ne și vă trimitem un link nou.`,
    stopSubject: "Abonamentul s-a oprit",
    stopTitle: "Abonamentul s-a oprit.",
    stopText: `După ${MAX_FAILURES} încercări nu am putut retrage plata lunară, așa că am oprit abonamentul. Nu se mai iau bani de pe card. Dacă vreți să continuați, scrieți-ne și vă trimitem un link nou de plată.`,
    cancelSubject: "Abonamentul a fost anulat",
    cancelTitle: "Abonamentul a fost anulat.",
    cancelText: (until) => `Nu se mai retrag bani de pe card. Pachetul rămâne activ până pe ${until}, adică până la finalul lunii deja plătite.`,
    write: "Scrie-ne pe WhatsApp",
  },
  ru: {
    failSubject: "Ежемесячный платёж не прошёл",
    failTitle: "Ежемесячный платёж не прошёл.",
    failText: (n) => `Не удалось списать платёж за подписку с карты (попытка ${n} из ${MAX_FAILURES}). Попробуем снова завтра. Если вы сменили карту или на ней недостаточно средств, напишите нам, и мы пришлём новую ссылку.`,
    stopSubject: "Подписка остановлена",
    stopTitle: "Подписка остановлена.",
    stopText: `После ${MAX_FAILURES} попыток не удалось списать ежемесячный платёж, поэтому подписка остановлена. С карты больше ничего не списывается. Если хотите продолжить, напишите нам, и мы пришлём новую ссылку на оплату.`,
    cancelSubject: "Подписка отменена",
    cancelTitle: "Подписка отменена.",
    cancelText: (until) => `С карты больше ничего не списывается. Пакет действует до ${until}, то есть до конца уже оплаченного месяца.`,
    write: "Написать в WhatsApp",
  },
  en: {
    failSubject: "The monthly payment did not go through",
    failTitle: "The monthly payment did not go through.",
    failText: (n) => `We could not take the subscription payment from your card (try ${n} of ${MAX_FAILURES}). We will try again tomorrow. If you changed your card or it lacks funds, write to us and we will send a new link.`,
    stopSubject: "Your subscription has stopped",
    stopTitle: "Your subscription has stopped.",
    stopText: `After ${MAX_FAILURES} tries we could not take the monthly payment, so the subscription has stopped. Nothing more is taken from your card. If you want to continue, write to us and we will send a new payment link.`,
    cancelSubject: "Your subscription is cancelled",
    cancelTitle: "Your subscription is cancelled.",
    cancelText: (until) => `Nothing more is taken from your card. Your plan stays active until ${until}, the end of the month already paid.`,
    write: "Write on WhatsApp",
  },
};

const WA_LINK = "https://wa.me/37368327082";

function note(lang: PayLang, subject: string, title: string, text: string, badge = false) {
  const t = TX[lang];
  const html = shell({
    preheader: text.slice(0, 90),
    ...(badge ? { badge: tick("green") } : {}),
    title,
    body: `${p(esc(text))}
<div style="margin-top:22px">${button(WA_LINK, t.write, "black")}</div>
${p(`${esc(COMPANY.legalName)}, IDNO ${COMPANY.idno}`, "#7a7a73")}`,
  });
  return { subject: `${subject} · landings.md`, html, text: `${title}\n\n${text}\n\n${WA_LINK}` };
}

const studio = (subject: string, list: [string, string][]) => {
  const html = shell({ preheader: subject, title: subject, body: `<div style="margin-top:18px">${rows(list)}</div>` });
  return sendMail({ email: adminEmail() }, `${subject} · abonamente`, html, list.map(([k, v]) => `${k}: ${v}`).join("\n")).catch(() => false);
};

const who = (s: Sub): [string, string][] => [
  ["Client", `${s.name}${s.company ? `, ${s.company}` : ""}`],
  ["Email", s.email],
  ["Telefon", s.phone || "—"],
  ["Pachet", PLANS[s.plan].name.ro],
  ["Abonament", s.id],
];

/* maib confirmed the first payment: the card is saved, the subscription starts today.
   Returns true only the first time, so the receipt goes out once. */
export async function activateSub(s: Sub, info: Pick<PayInfo, "payId" | "billerId" | "billerExpiry" | "cardNumber" | "amount" | "currency" | "orderId">): Promise<boolean> {
  if (s.status !== "pending" || !info.billerId) return false;
  const today = todayChisinau();
  const day = Number(today.slice(8, 10));
  s.status = "active";
  s.billerId = info.billerId;
  s.billerExpiry = info.billerExpiry;
  s.card = info.cardNumber;
  s.startedAt = today;
  s.anchorDay = day;
  s.nextChargeAt = addMonth(today, day);
  s.lastChargeAt = today;
  s.charges.push({ orderId: s.id, payId: info.payId, amount: Number(info.amount || 0), at: new Date().toISOString(), ok: true, note: "prima lună, cardul salvat" });
  await saveSub(s);

  const amount = fmtMoney(info.amount, info.currency || "MDL");
  const m = receiptEmail(
    s.lang,
    { orderId: s.id, name: s.name, service: planTitle(PLANS[s.plan], s.lang), qty: 1, amount, date: fmtDateTime(new Date(), s.lang), card: info.cardNumber },
    "plan",
    { next: fmtDay(s.nextChargeAt, s.lang), cancelUrl: cancelUrl(SITE, s.id) }
  );
  await sendMail({ email: s.email, name: s.name }, m.subject, m.html, m.text).catch(() => false);
  const st = studioEmail({ orderId: s.id, service: `${planTitle(PLANS[s.plan], "ro")} (abonament nou)`, amount, date: fmtDateTime(new Date(), "ro"), name: s.name, email: s.email, phone: s.phone, payId: info.payId });
  await sendMail({ email: adminEmail() }, st.subject, st.html, st.text).catch(() => false);
  return true;
}

/* one monthly charge on the saved card */
export async function chargeSub(s: Sub, today = todayChisinau()): Promise<{ ok: boolean; payId?: string; error?: string }> {
  if (!s.billerId || !s.nextChargeAt || !s.anchorDay) return { ok: false, error: "no card" };
  const plan = PLANS[s.plan];
  const { rate } = await eurRate();
  const amount = toMdl(plan.eur, rate);
  const orderId = newOrderId(s.lang);
  const title = planTitle(plan, s.lang);
  await markChargeOrder(orderId, s.id);
  const r = await executeRecurring({ billerId: s.billerId, amount, currency: "MDL", description: `${COMPANY.brand}: ${title}`.slice(0, 124), orderId, items: [{ id: plan.id, name: title.slice(0, 128), price: amount, quantity: 1 }] });
  console.log("[subs] charge", s.id, orderId, r.result?.payId, r.ok ? "OK" : `FAIL ${r.error}`);
  s.charges.push({ orderId, payId: r.result?.payId || "", amount, at: new Date().toISOString(), ok: r.ok, ...(r.ok ? {} : { note: r.error }) });

  if (r.ok) {
    s.status = "active";
    s.failures = 0;
    s.lastError = undefined;
    s.lastChargeAt = today;
    s.nextChargeAt = addMonth(s.nextChargeAt, s.anchorDay);
    await saveSub(s);
    const money = fmtMoney(r.result?.amount ?? amount, r.result?.currency || "MDL");
    const m = receiptEmail(
      s.lang,
      { orderId, name: s.name, service: title, qty: 1, amount: money, date: fmtDateTime(new Date(), s.lang), card: r.result?.cardNumber || s.card },
      "renewal",
      { next: fmtDay(s.nextChargeAt, s.lang), cancelUrl: cancelUrl(SITE, s.id) }
    );
    await sendMail({ email: s.email, name: s.name }, m.subject, m.html, m.text).catch(() => false);
    const st = studioEmail({ orderId, service: `${planTitle(plan, "ro")} (plată lunară)`, amount: money, date: fmtDateTime(new Date(), "ro"), name: s.name, email: s.email, phone: s.phone, payId: r.result?.payId || "" });
    await sendMail({ email: adminEmail() }, st.subject, st.html, st.text).catch(() => false);
    return { ok: true, payId: r.result?.payId };
  }

  s.failures += 1;
  s.lastError = r.error || "plata nu a trecut";
  const t = TX[s.lang];
  if (s.failures >= MAX_FAILURES) {
    s.status = "stopped";
    s.cancelledAt = new Date().toISOString();
    s.cancelledBy = "system";
    await saveSub(s);
    const m = note(s.lang, t.stopSubject, t.stopTitle, t.stopText);
    await sendMail({ email: s.email, name: s.name }, m.subject, m.html, m.text).catch(() => false);
    await studio("Abonament oprit: plata nu a trecut de 3 ori", [...who(s), ["Ultima eroare", s.lastError]]);
  } else {
    s.status = "past_due";
    await saveSub(s);
    const m = note(s.lang, t.failSubject, t.failTitle, t.failText(s.failures));
    await sendMail({ email: s.email, name: s.name }, m.subject, m.html, m.text).catch(() => false);
    await studio(`Plata lunară nu a trecut (${s.failures}/${MAX_FAILURES})`, [...who(s), ["Eroare", s.lastError]]);
  }
  return { ok: false, error: s.lastError };
}

/* the client (from the link in a receipt) or the studio (from /admin) stops it */
export async function cancelSub(s: Sub, by: "client" | "studio"): Promise<boolean> {
  if (s.status === "cancelled" || s.status === "stopped") return false;
  const until = s.nextChargeAt || todayChisinau();
  s.status = "cancelled";
  s.cancelledAt = new Date().toISOString();
  s.cancelledBy = by;
  await saveSub(s);
  const t = TX[s.lang];
  const m = note(s.lang, t.cancelSubject, t.cancelTitle, t.cancelText(fmtDay(until, s.lang)), true);
  await sendMail({ email: s.email, name: s.name }, m.subject, m.html, m.text).catch(() => false);
  await studio(by === "client" ? "Clientul și-a anulat abonamentul" : "Ai oprit un abonament", [...who(s), ["Activ până pe", fmtDay(until, "ro")]]);
  return true;
}
