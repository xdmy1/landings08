/* Receipt texts shared by the return page and the confirmation email.
   maib requires: order number, merchant name, site name, amount, currency,
   payment date and the order description (product names and quantities). */

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

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

export function receiptEmail(
  lang: PayLang,
  o: { orderId: string; name: string; service: string; qty: number; amount: string; date: string; card?: string },
  kind: "plan" | "report" = "plan"
) {
  const t = RC[lang];
  const next = kind === "report" ? t.nextReport : t.next;
  const rows: [string, string][] = [
    [t.order, o.orderId],
    [t.merchant, COMPANY.legalName],
    [t.site, "landings.md"],
    [t.service, o.service],
    [t.qty, String(o.qty)],
    [t.amount, o.amount],
    [t.date, o.date],
  ];
  if (o.card) rows.push([t.card, o.card]);

  const text = [
    `${t.hello}${o.name ? `, ${o.name}` : ""}!`,
    "",
    t.thanks,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    next,
    "",
    `${t.questions} ${COMPANY.email}, ${COMPANY.phone}.`,
    "",
    `${COMPANY.legalName}, IDNO ${COMPANY.idno}, ${COMPANY.address}`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;background:#f4f4f1;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0f0f0e">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fcfcfa;border:1px solid #e6e6e1;border-radius:18px;padding:32px">
<tr><td style="font-size:15px;font-weight:600;letter-spacing:-0.01em">landings.md</td></tr>
<tr><td style="padding-top:22px;font-size:22px;font-weight:500;letter-spacing:-0.02em">${esc(t.subject)} ${esc(o.orderId)}</td></tr>
<tr><td style="padding-top:12px;font-size:15px;line-height:1.6;color:#45453f">${esc(t.hello)}${o.name ? `, ${esc(o.name)}` : ""}! ${esc(t.thanks)}</td></tr>
<tr><td style="padding-top:20px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:9px 0;border-top:1px solid #e6e6e1;color:#6b6b64">${esc(k)}</td><td align="right" style="padding:9px 0;border-top:1px solid #e6e6e1">${esc(v)}</td></tr>`
  )
  .join("")}
</table></td></tr>
<tr><td style="padding-top:20px;font-size:14px;line-height:1.6;color:#45453f">${esc(next)}</td></tr>
<tr><td style="padding-top:14px;font-size:14px;line-height:1.6;color:#45453f">${esc(t.questions)} <a href="mailto:${COMPANY.email}" style="color:#0f0f0e">${COMPANY.email}</a>, ${esc(COMPANY.phone)}.</td></tr>
<tr><td style="padding-top:26px;font-size:12px;line-height:1.6;color:#8a8a83">${esc(COMPANY.legalName)} · IDNO ${COMPANY.idno} · ${esc(COMPANY.address)}</td></tr>
</table></td></tr></table></body></html>`;

  return { subject: `${t.subject} ${o.orderId} · landings.md`, html, text };
}
