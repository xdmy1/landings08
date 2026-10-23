import type { Metadata } from "next";
import { BlogTopBar } from "../../blog/chrome";
import { LegalFooter } from "../../_pay/legal-footer";
import { COMPANY, isPlanId } from "../../_pay/plans";
import { langOfOrder, maibReady, payInfo, type PayInfo } from "../../_pay/maib";
import { RC, fmtDateTime, fmtMoney } from "../../_pay/receipt";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Plata | landings.md",
  robots: { index: false, follow: false },
};

/* maib sends the customer here (okUrl / failUrl) with ?payId=…&orderId=… */
export default async function PayResult({ searchParams }: { searchParams: { payId?: string; orderId?: string } }) {
  const payId = String(searchParams.payId || "");
  const orderId = String(searchParams.orderId || "").slice(0, 36);
  const lang = langOfOrder(orderId);
  const t = RC[lang];

  let info: PayInfo | null = null;
  if (payId && maibReady()) {
    try {
      info = await payInfo(payId);
    } catch (e) {
      console.error("[pay] result", e);
    }
  }

  const status = info?.status || "";
  const ok = status === "OK";
  const failed = Boolean(info) && !ok && status !== "PENDING" && status !== "CREATED";
  const item = info?.items?.[0];
  const retryPlan = item && isPlanId(item.id) ? item.id : "business";

  const rows: [string, string][] = [
    [t.order, info?.orderId || orderId || "—"],
    [t.merchant, COMPANY.legalName],
    [t.site, "landings.md"],
  ];
  if (item || info?.description) rows.push([t.service, item?.name || info?.description || ""]);
  if (item) rows.push([t.qty, String(item.quantity || 1)]);
  if (info?.amount !== undefined) rows.push([t.amount, fmtMoney(info.amount, info.currency)]);
  rows.push([t.date, fmtDateTime(new Date(), lang)]);
  if (info?.cardNumber) rows.push([t.card, info.cardNumber]);
  if (info?.statusMessage) rows.push([t.status, info.statusMessage]);

  const title = ok ? t.okTitle : failed ? t.failTitle : t.pendingTitle;
  const sub = ok ? t.okSub : failed ? t.failSub : "";

  return (
    <>
      <BlogTopBar />
      <main className="container co-main">
        <div className="co-res">
          <h1 className="co-res-title">{title}</h1>
          {sub && <p className="co-res-sub">{sub}</p>}
          <dl className="co-rows">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {ok && <p className="co-res-next">{t.next}</p>}
          <div className="co-res-actions">
            {failed && (
              <a className="btn" href={`/plata/${retryPlan}`}>
                {t.retry}
              </a>
            )}
            <a className={failed ? "pill-btn" : "btn"} href="/">
              {t.home}
            </a>
          </div>
        </div>
      </main>
      <LegalFooter />
    </>
  );
}
