/* Monthly maintenance plans sold online (maib e-commerce).
   Prices are set in EUR and charged in MDL at the BNM rate of the payment day. */

export const COMPANY = {
  brand: "landings.md",
  legalName: "Antreprenor Independent „DAMIAN BOBERNAGA”",
  idno: "1026023160988",
  address: "mun. Chișinău, Republica Moldova",
  email: "contact@landings.md",
  phone: "+373 68 327 082",
  site: "https://www.landings.md",
} as const;

export type PlanId = "start" | "business" | "prioritar";
export type PayLang = "ro" | "ru" | "en";

export type Plan = {
  id: PlanId;
  eur: number;
  name: Record<PayLang, string>;
  feats: Record<PayLang, string[]>;
};

export const PLANS: Record<PlanId, Plan> = {
  start: {
    id: "start",
    eur: 50,
    name: { ro: "Start", ru: "Старт", en: "Start" },
    feats: {
      ro: [
        "Grup Telegram cu echipa noastră",
        "Răspuns în 48 de ore, luni–vineri",
        "Până la 5 cereri pe lună",
        "Poze, texte, prețuri și produse actualizate",
        "Site-ul verificat și ținut în funcțiune",
      ],
      ru: [
        "Группа в Telegram с нашей командой",
        "Ответ в течение 48 часов, пн–пт",
        "До 5 запросов в месяц",
        "Фото, тексты, цены и товары всегда актуальны",
        "Сайт под контролем и работает",
      ],
      en: [
        "Telegram group with our team",
        "Reply within 48 hours, Monday to Friday",
        "Up to 5 requests a month",
        "Photos, text, prices and products kept up to date",
        "Website checked and kept running",
      ],
    },
  },
  business: {
    id: "business",
    eur: 150,
    name: { ro: "Business", ru: "Бизнес", en: "Business" },
    feats: {
      ro: [
        "Grup Telegram cu echipa noastră",
        "Răspuns în aceeași zi lucrătoare",
        "Până la 25 de cereri pe lună",
        "Produse, bannere, oferte și pagini simple",
        "Reclamele verificate și ajustate săptămânal",
        "Raport lunar scurt",
      ],
      ru: [
        "Группа в Telegram с нашей командой",
        "Ответ в тот же рабочий день",
        "До 25 запросов в месяц",
        "Товары, баннеры, акции и простые страницы",
        "Реклама проверяется и настраивается каждую неделю",
        "Короткий ежемесячный отчёт",
      ],
      en: [
        "Telegram group with our team",
        "Reply the same working day",
        "Up to 25 requests a month",
        "Products, banners, offers and simple pages",
        "Ads checked and tuned every week",
        "Short monthly report",
      ],
    },
  },
  prioritar: {
    id: "prioritar",
    eur: 250,
    name: { ro: "Prioritar", ru: "Приоритет", en: "Priority" },
    feats: {
      ro: [
        "Răspuns în 2 ore, luni–sâmbătă",
        "Până la 3 cereri pe zi",
        "Reclame Meta și Google gestionate de noi",
        "Urgențe rezolvate și în weekend",
        "O pagină nouă sau un landing de campanie pe lună",
        "Raport și apel lunar de 30 de minute",
      ],
      ru: [
        "Ответ в течение 2 часов, пн–сб",
        "До 3 запросов в день",
        "Реклама Meta и Google под нашим управлением",
        "Срочные задачи и в выходные",
        "Новая страница или лендинг для кампании каждый месяц",
        "Отчёт и 30-минутный созвон раз в месяц",
      ],
      en: [
        "Reply within 2 hours, Monday to Saturday",
        "Up to 3 requests a day",
        "Meta and Google ads run by us",
        "Urgent fixes on weekends too",
        "One new page or campaign landing page a month",
        "Monthly report and a 30-minute call",
      ],
    },
  },
};

export const PLAN_IDS = Object.keys(PLANS) as PlanId[];

export function isPlanId(v: unknown): v is PlanId {
  return typeof v === "string" && (PLAN_IDS as string[]).includes(v);
}

export function isPayLang(v: unknown): v is PayLang {
  return v === "ro" || v === "ru" || v === "en";
}

/* line shown on the maib checkout page, in the email and on the receipt */
export function planTitle(plan: Plan, lang: PayLang): string {
  const word = { ro: "Mentenanță lunară", ru: "Ежемесячное сопровождение", en: "Monthly maintenance" }[lang];
  const month = { ro: "1 lună", ru: "1 месяц", en: "1 month" }[lang];
  return `${word} ${plan.name[lang]}, ${month}`;
}
