/* Receipt texts shared by the return page and the confirmation email.
   maib requires: order number, merchant name, site name, amount, currency,
   payment date and the order description (product names and quantities). */

import { button, esc, p, rows, shell, tick, WA } from "./mailui";
import { COMPANY, type PayLang } from "./plans";

export const RC: Record<
  PayLang,
  {
    okTitle: string;
    failTitle: string;
    pendingTitle: string;
    okSub: string;
    failSub: string;
    order: string;
    merchant: string;
    site: string;
    service: string;
    qty: string;
    amount: string;
    date: string;
    card: string;
    status: string;
    next: string;
    nextReport: string;
    retry: string;
    home: string;
    subject: string;
    hello: string;
    thanks: string;
    questions: string;
  }
> = {
  ro: {
    okTitle: "Plata a reușit.",
    failTitle: "Plata nu a reușit.",
    pendingTitle: "Plata se procesează.",
    okSub: "Mulțumim. Confirmarea a fost trimisă și pe email.",
    failSub: "Banii nu au fost retrași. Puteți încerca din nou sau ne puteți scrie.",
    order: "Numărul comenzii",
    merchant: "Comerciant",
    site: "Site",
    service: "Serviciu",
    qty: "Cantitate",
    amount: "Suma",
    date: "Data plății",
    card: "Card",
    status: "Stare",
    next: "În cel mult o zi lucrătoare vă adăugăm în grupul Telegram și pachetul începe din acea zi, pentru 30 de zile.",
    nextReport: "Raportul complet s-a deschis pe pagina raportului, în browserul în care ați plătit. De acolo îl puteți descărca și în PDF.",
    retry: "Încearcă din nou",
    home: "Înapoi pe site",
    subject: "Confirmare plată",
    hello: "Bună ziua",
    thanks: "Vă mulțumim pentru plată. Mai jos sunt detaliile comenzii.",
    questions: "Pentru orice întrebare, răspundeți la acest email sau scrieți-ne la",
  },
  ru: {
    okTitle: "Оплата прошла успешно.",
    failTitle: "Оплата не прошла.",
    pendingTitle: "Оплата обрабатывается.",
    okSub: "Спасибо. Подтверждение отправлено и на email.",
    failSub: "Деньги не списаны. Попробуйте ещё раз или напишите нам.",
    order: "Номер заказа",
    merchant: "Продавец",
    site: "Сайт",
    service: "Услуга",
    qty: "Количество",
    amount: "Сумма",
    date: "Дата оплаты",
    card: "Карта",
    status: "Статус",
    next: "В течение одного рабочего дня мы добавим вас в группу Telegram, и пакет начнёт действовать с этого дня на 30 дней.",
    nextReport: "Полный отчёт открылся на странице отчёта, в браузере, в котором вы оплатили. Оттуда его можно скачать и в PDF.",
    retry: "Попробовать снова",
    home: "Вернуться на сайт",
    subject: "Подтверждение оплаты",
    hello: "Здравствуйте",
    thanks: "Спасибо за оплату. Ниже детали заказа.",
    questions: "Если есть вопросы, ответьте на это письмо или напишите нам на",
  },
  en: {
    okTitle: "Payment successful.",
    failTitle: "Payment failed.",
    pendingTitle: "Payment is processing.",
    okSub: "Thank you. A confirmation was also sent by email.",
    failSub: "No money was taken. You can try again or write to us.",
    order: "Order number",
    merchant: "Merchant",
    site: "Website",
    service: "Service",
    qty: "Quantity",
    amount: "Amount",
    date: "Payment date",
    card: "Card",
    status: "Status",
    next: "Within one working day we add you to the Telegram group, and the plan runs for 30 days from that day.",
    nextReport: "The full report opened on the report page, in the browser you paid in. You can also download it as a PDF from there.",
    retry: "Try again",
    home: "Back to the website",
    subject: "Payment confirmation",
    hello: "Hello",
    thanks: "Thank you for your payment. The order details are below.",
    questions: "For any question, reply to this email or write to",
  },
};

export function fmtDateTime(d: Date, lang: PayLang): string {
  const loc = { ro: "ro-RO", ru: "ru-RU", en: "en-GB" }[lang];
  return new Intl.DateTimeFormat(loc, {
    timeZone: "Europe/Chisinau",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function fmtMoney(amount: number | undefined, currency: string | undefined): string {
  if (amount === undefined) return "";
  return `${amount.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency || "MDL"}`;
}

export function receiptEmail(
  lang: PayLang,
  o: { orderId: string; name: string; service: string; qty: number; amount: string; date: string; card?: string },
  kind: "plan" | "report" = "plan"
) {
  const t = RC[lang];
  const next = kind === "report" ? t.nextReport : t.next;
  const rowsList: [string, string][] = [
    [t.order, o.orderId],
    [t.merchant, COMPANY.legalName],
    [t.site, "landings.md"],
    [t.service, o.service],
    [t.qty, String(o.qty)],
    [t.amount, o.amount],
    [t.date, o.date],
  ];
  if (o.card) rowsList.push([t.card, o.card]);

  const text = [
    `${t.hello}${o.name ? `, ${o.name}` : ""}!`,
    "",
    t.thanks,
    "",
    ...rowsList.map(([k, v]) => `${k}: ${v}`),
    "",
    next,
    "",
    `${t.questions} ${COMPANY.email}, ${COMPANY.phone}.`,
    "",
    `${COMPANY.legalName}, IDNO ${COMPANY.idno}, ${COMPANY.address}`,
  ].join("\n");

  const html = shell({
    preheader: `${t.okTitle} ${o.amount} · ${o.service}`,
    badge: tick("green"),
    title: t.okTitle,
    sub: `${o.orderId} · ${o.amount}`,
    body: `${p(`${esc(t.hello)}${o.name ? `, ${esc(o.name)}` : ""}! ${esc(t.thanks)}`)}
<div style="margin-top:18px">${rows(rowsList)}</div>
${p(esc(next))}
${p(`${esc(t.questions)} <a href="mailto:${COMPANY.email}" style="color:#0f0f0e">${COMPANY.email}</a>, <span style="white-space:nowrap">${esc(COMPANY.phone)}</span>.`)}
<div style="margin-top:22px">${button(WA, lang === "ru" ? "Написать в WhatsApp" : lang === "en" ? "Write on WhatsApp" : "Scrie-ne pe WhatsApp", "light")}</div>`,
  });

  return { subject: `${t.subject} ${o.orderId} · landings.md`, html, text };
}

/* the copy of every paid order that goes to the studio */
export function studioEmail(o: { orderId: string; service: string; amount: string; date: string; name: string; email: string; phone: string; payId: string }) {
  const list: [string, string][] = [
    ["Comanda", o.orderId],
    ["Pachet", o.service],
    ["Suma", o.amount],
    ["Data", o.date],
    ["Client", o.name || "—"],
    ["Email", o.email || "—"],
    ["Telefon", o.phone || "—"],
    ["maib payId", o.payId],
  ];
  const text = ["Plată nouă pe landings.md", "", ...list.map(([k, v]) => `${k}: ${v}`)].join("\n");
  const html = shell({
    preheader: `${o.amount} · ${o.service}`,
    badge: tick("green"),
    title: "Plată nouă",
    sub: `${o.amount} · ${o.orderId}`,
    body: `<div style="margin-top:18px">${rows(list)}</div>
${o.email ? `<div style="margin-top:22px">${button(`mailto:${o.email}`, "Scrie clientului", "black")}</div>` : ""}`,
  });
  return { subject: `Plată nouă ${o.orderId}: ${o.service}, ${o.amount}`, html, text };
}
