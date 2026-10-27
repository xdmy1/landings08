"use client";

import { useEffect, useState } from "react";
import { PLANS, type PayLang, type PlanId } from "./plans";

const TELEGRAM = "https://t.me/damiqqn";
const WHATSAPP = "https://wa.me/37368327082";
const MIA_PHONE = "+373 68 327 082";

/* while card payments are off: pay through MIA to the phone number, confirm in a chat */
const OFF: Record<PayLang, { title: string; text: string; wa: string; tg: string; fine: string; msg: (plan: string, eur: number, mdl: string) => string }> = {
  ro: {
    title: "Plata online e sistată temporar.",
    text: `Până o pornim din nou, poți plăti prin MIA, la numărul ${MIA_PHONE}, din aplicația băncii tale. Scrie-ne și îți confirmăm activarea pe loc.`,
    wa: "Scrie pe WhatsApp",
    tg: "Scrie pe Telegram",
    fine: "MIA: plată instant la număr de telefon, din aplicația oricărei bănci din Moldova.",
    msg: (plan, eur, mdl) => `Bună! Vreau să plătesc pachetul ${plan} (${eur} €, ${mdl} lei) prin MIA.`,
  },
  ru: {
    title: "Онлайн-оплата временно приостановлена.",
    text: `Пока она не работает, можно оплатить через MIA на номер ${MIA_PHONE} из приложения вашего банка. Напишите нам, и мы сразу подтвердим активацию.`,
    wa: "Написать в WhatsApp",
    tg: "Написать в Telegram",
    fine: "MIA: мгновенный платёж по номеру телефона из приложения любого банка Молдовы.",
    msg: (plan, eur, mdl) => `Здравствуйте! Хочу оплатить пакет ${plan} (${eur} €, ${mdl} лей) через MIA.`,
  },
  en: {
    title: "Online payment is paused for now.",
    text: `Until it is back, you can pay through MIA to ${MIA_PHONE} from your banking app (any bank in Moldova). Message us and we confirm the activation right away.`,
    wa: "Message on WhatsApp",
    tg: "Message on Telegram",
    fine: "MIA: instant payment to a phone number from any Moldovan bank app.",
    msg: (plan, eur, mdl) => `Hi! I want to pay for the ${plan} plan (€${eur}, ${mdl} MDL) through MIA.`,
  },
};

function PayOff({ lang, plan, eur, mdl }: { lang: PayLang; plan: string; eur: number; mdl: string }) {
  const o = OFF[lang];
  const text = encodeURIComponent(o.msg(plan, eur, mdl));
  return (
    <div className="co-form co-off">
      <p className="co-off-title">{o.title}</p>
      <p className="co-off-text">{o.text}</p>
      <a className="btn btn-lg co-pay" href={`${WHATSAPP}?text=${text}`} target="_blank" rel="noopener noreferrer" data-track="Plata MIA: WhatsApp">
        {o.wa}
      </a>
      <a className="pill-btn co-off-tg" href={`${TELEGRAM}?text=${text}`} target="_blank" rel="noopener noreferrer" data-track="Plata MIA: Telegram">
        {o.tg}
      </a>
      <p className="co-secure">{o.fine}</p>
    </div>
  );
}

const L: Record<
  PayLang,
  {
    kicker: string;
    perMonth: string;
    approx: (mdl: string, date: string) => string;
    period: string;
    delivery: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    acceptA: string;
    acceptLink: string;
    pay: (mdl: string) => string;
    paying: string;
    secure: string;
    other: string;
    err: Record<string, string>;
  }
> = {
  ro: {
    kicker: "Mentenanță lunară",
    perMonth: "/lună",
    approx: (m, d) => `${m} lei la cursul BNM din ${d}`,
    period: "Perioada: 30 de zile de la activare. Fără reînnoire automată.",
    delivery: "Activare în cel mult o zi lucrătoare după plată. Lucrăm la distanță, prin Telegram și email.",
    name: "Nume și prenume",
    company: "Firma (opțional)",
    email: "Email",
    phone: "Telefon",
    acceptA: "Am citit și accept",
    acceptLink: "Termenii și condițiile",
    pay: (m) => `Plătește ${m} lei`,
    paying: "Se deschide plata…",
    secure: "Plata se face pe pagina securizată maib, cu 3-D Secure. Datele cardului nu ajung la noi.",
    other: "Alt pachet",
    err: {
      name: "Scrieți numele.",
      email: "Adresa de email nu e validă.",
      phone: "Numărul de telefon nu e valid.",
      terms: "Bifați acceptarea termenilor.",
      not_configured: "Plata online se activează în curând. Până atunci scrieți-ne pe Telegram și vă trimitem factura.",
      maib: "Plata nu a putut fi pornită. Încercați din nou peste un minut.",
      net: "Nu am putut trimite datele. Verificați conexiunea și încercați din nou.",
    },
  },
  ru: {
    kicker: "Ежемесячное сопровождение",
    perMonth: "/мес",
    approx: (m, d) => `${m} лей по курсу НБМ на ${d}`,
    period: "Срок: 30 дней с момента активации. Без автопродления.",
    delivery: "Активация в течение одного рабочего дня после оплаты. Работаем удалённо, через Telegram и email.",
    name: "Имя и фамилия",
    company: "Компания (необязательно)",
    email: "Email",
    phone: "Телефон",
    acceptA: "Я прочитал(а) и принимаю",
    acceptLink: "Условия",
    pay: (m) => `Оплатить ${m} лей`,
    paying: "Открываем оплату…",
    secure: "Оплата проходит на защищённой странице maib с 3-D Secure. Данные карты к нам не попадают.",
    other: "Другой пакет",
    err: {
      name: "Укажите имя.",
      email: "Неверный email.",
      phone: "Неверный номер телефона.",
      terms: "Отметьте согласие с условиями.",
      not_configured: "Онлайн-оплата скоро заработает. А пока напишите нам в Telegram, и мы пришлём счёт.",
      maib: "Не удалось начать оплату. Попробуйте через минуту.",
      net: "Не удалось отправить данные. Проверьте соединение и попробуйте снова.",
    },
  },
  en: {
    kicker: "Monthly maintenance",
    perMonth: "/month",
    approx: (m, d) => `${m} MDL at the BNM rate of ${d}`,
    period: "Period: 30 days from activation. No automatic renewal.",
    delivery: "Activated within one working day after payment. We work remotely, over Telegram and email.",
    name: "Full name",
    company: "Company (optional)",
    email: "Email",
    phone: "Phone",
    acceptA: "I have read and accept the",
    acceptLink: "Terms and conditions",
    pay: (m) => `Pay ${m} MDL`,
    paying: "Opening the payment…",
    secure: "Payment happens on the secure maib page, with 3-D Secure. Your card details never reach us.",
    other: "Other plan",
    err: {
      name: "Enter your name.",
      email: "The email address is not valid.",
      phone: "The phone number is not valid.",
      terms: "Tick the box to accept the terms.",
      not_configured: "Online payment is being switched on. Until then, message us on Telegram and we send you an invoice.",
      maib: "The payment could not start. Try again in a minute.",
      net: "We could not send the form. Check your connection and try again.",
    },
  },
};

function detectLang(): PayLang {
  try {
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const p of prefs) {
      const c = (p || "").toLowerCase().slice(0, 2);
      if (c === "ro" || c === "mo") return "ro";
      if (c === "ru") return "ru";
      if (c === "en" || c === "de" || c === "fr" || c === "es") return "en";
    }
  } catch {
    /* default below */
  }
  return "ro";
}

const nf = (n: number) => n.toLocaleString("ro-RO").replace(/ /g, " ");

export default function Checkout({ planId, mdl, rateDate, online }: { planId: PlanId; mdl: number; rateDate: string; online: boolean }) {
  const [lang, setLang] = useState<PayLang>("ro");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [accept, setAccept] = useState(false);
  useEffect(() => setLang(detectLang()), []);

  const t = L[lang];
  const plan = PLANS[planId];
  const mdlTxt = nf(mdl);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.currentTarget);
    if (!accept) return setErr("terms");
    setErr("");
    setBusy(true);
    try {
      const r = await fetch("/api/plata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          lang,
          name: f.get("name"),
          company: f.get("company"),
          email: f.get("email"),
          phone: f.get("phone"),
          accept,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.payUrl) {
        window.location.href = j.payUrl;
        return;
      }
      setErr(j.error || "maib");
    } catch {
      setErr("net");
    }
    setBusy(false);
  }

  return (
    <div className="co">
      <div className="co-sum">
        <p className="co-kicker">{t.kicker}</p>
        <h1 className="co-plan">{plan.name[lang]}</h1>
        <p className="co-price">
          €{plan.eur}
          <span>{t.perMonth}</span>
        </p>
        <p className="co-mdl">{t.approx(mdlTxt, rateDate)}</p>
        <ul className="price-feats">
          {plan.feats[lang].map((x) => (
            <li key={x}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4.5 12.6l5 5 10-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {x}
            </li>
          ))}
        </ul>
        <p className="co-terms-line">{t.period}</p>
        <p className="co-terms-line">{t.delivery}</p>
        <p className="co-other">
          {t.other}:{" "}
          {(Object.keys(PLANS) as PlanId[])
            .filter((id) => id !== planId)
            .map((id, i) => (
              <span key={id}>
                {i > 0 && " · "}
                <a href={`/plata/${id}`}>
                  {PLANS[id].name[lang]}, €{PLANS[id].eur}
                </a>
              </span>
            ))}
        </p>
      </div>

      {!online && <PayOff lang={lang} plan={plan.name[lang]} eur={plan.eur} mdl={mdlTxt} />}
      {online && (
      <form className="co-form" onSubmit={submit} noValidate>
        <label className="co-field">
          <span>{t.name}</span>
          <input name="name" autoComplete="name" required maxLength={80} />
        </label>
        <label className="co-field">
          <span>{t.company}</span>
          <input name="company" autoComplete="organization" maxLength={60} />
        </label>
        <label className="co-field">
          <span>{t.email}</span>
          <input name="email" type="email" autoComplete="email" required maxLength={40} />
        </label>
        <label className="co-field">
          <span>{t.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="+373" />
        </label>
        <label className="co-check">
          <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
          <span>
            {t.acceptA}{" "}
            <a href="/termeni-si-conditii" target="_blank" rel="noopener">
              {t.acceptLink}
            </a>
          </span>
        </label>
        {err && (
          <p className="co-err" role="alert">
            {t.err[err] || t.err.maib}
            {err === "not_configured" && (
              <>
                {" "}
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </>
            )}
          </p>
        )}
        <button className="btn btn-lg co-pay" type="submit" disabled={busy}>
          {busy ? t.paying : t.pay(mdlTxt)}
        </button>
        <p className="co-secure">{t.secure}</p>
      </form>
      )}
    </div>
  );
}
