import type { Metadata } from "next";
import { BlogTopBar } from "../../blog/chrome";
import { LegalFooter } from "../../_pay/legal-footer";
import { PLANS, type PayLang } from "../../_pay/plans";
import { cancelKeyOk, fmtDay, loadSub } from "../../_pay/subs";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Abonament | landings.md", robots: { index: false, follow: false } };

const T: Record<PayLang, { title: string; plan: string; status: string; next: string; until: string; sure: string; btn: string; done: (d: string) => string; already: string; bad: string; home: string; st: Record<string, string> }> = {
  ro: { title: "Abonamentul tău", plan: "Pachet", status: "Stare", next: "Următoarea plată", until: "Activ până pe", sure: "Dacă anulezi, nu se mai retrag bani de pe card. Pachetul rămâne activ până la finalul lunii deja plătite.", btn: "Anulează abonamentul", done: (d) => `Gata, abonamentul e anulat. Nu se mai retrag bani de pe card. Pachetul rămâne activ până pe ${d}.`, already: "Abonamentul nu mai este activ. Nu se retrag bani de pe card.", bad: "Linkul nu este valabil. Scrie-ne și te ajutăm.", home: "Înapoi pe site", st: { pending: "în așteptarea plății", active: "activ", past_due: "plata a eșuat, reîncercăm", cancelled: "anulat", stopped: "oprit" } },
  ru: { title: "Ваша подписка", plan: "Пакет", status: "Статус", next: "Следующий платёж", until: "Действует до", sure: "После отмены с карты больше ничего не списывается. Пакет действует до конца уже оплаченного месяца.", btn: "Отменить подписку", done: (d) => `Готово, подписка отменена. С карты больше ничего не списывается. Пакет действует до ${d}.`, already: "Подписка уже не активна. С карты ничего не списывается.", bad: "Ссылка недействительна. Напишите нам, и мы поможем.", home: "Вернуться на сайт", st: { pending: "ожидает оплаты", active: "активна", past_due: "платёж не прошёл, пробуем снова", cancelled: "отменена", stopped: "остановлена" } },
  en: { title: "Your subscription", plan: "Plan", status: "Status", next: "Next payment", until: "Active until", sure: "If you cancel, nothing more is taken from your card. Your plan stays active until the end of the month already paid.", btn: "Cancel subscription", done: (d) => `Done, your subscription is cancelled. Nothing more is taken from your card. Your plan stays active until ${d}.`, already: "This subscription is no longer active. Nothing is taken from your card.", bad: "This link is not valid. Write to us and we will help.", home: "Back to the website", st: { pending: "awaiting payment", active: "active", past_due: "payment failed, retrying", cancelled: "cancelled", stopped: "stopped" } },
};

export default async function CancelPage({ searchParams }: { searchParams: { id?: string; k?: string; done?: string } }) {
  const id = String(searchParams.id || "").slice(0, 36);
  const k = String(searchParams.k || "").slice(0, 64);
  const s = cancelKeyOk(id, k) ? await loadSub(id) : null;
  const t = T[s?.lang || "ro"];
  const live = s && (s.status === "active" || s.status === "past_due" || s.status === "pending");
  const until = s?.nextChargeAt ? fmtDay(s.nextChargeAt, s.lang) : "";

  return (
    <>
      <BlogTopBar lang={s?.lang === "ru" ? "ru" : s?.lang === "en" ? "en" : "ro"} />
      <main className="container co-main">
        <div className="co-res">
          <h1 className="co-res-title">{t.title}</h1>
          {!s ? (
            <p className="co-res-sub">{t.bad}</p>
          ) : (
            <>
              {searchParams.done ? <p className="co-res-sub">{t.done(until)}</p> : !live ? <p className="co-res-sub">{t.already}</p> : <p className="co-res-sub">{t.sure}</p>}
              <dl className="co-rows">
                <div>
                  <dt>{t.plan}</dt>
                  <dd>{PLANS[s.plan].name[s.lang]}</dd>
                </div>
                <div>
                  <dt>{t.status}</dt>
                  <dd>{t.st[s.status] || s.status}</dd>
                </div>
                {until && (
                  <div>
                    <dt>{live ? t.next : t.until}</dt>
                    <dd>{until}</dd>
                  </div>
                )}
              </dl>
              {live && !searchParams.done && (
                <form method="post" action="/api/abonament/anulare" className="co-res-actions">
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="k" value={k} />
                  <button className="btn" type="submit">
                    {t.btn}
                  </button>
                </form>
              )}
            </>
          )}
          <div className="co-res-actions">
            <a className="pill-btn" href="/">
              {t.home}
            </a>
          </div>
        </div>
      </main>
      <LegalFooter />
    </>
  );
}
