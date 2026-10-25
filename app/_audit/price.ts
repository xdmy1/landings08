/* price of the full report, in EUR (charged in MDL at the BNM rate) */
export const AUDIT_EUR = Number(process.env.AUDIT_PRICE_EUR || 5);
/* the struck-through price shown next to it */
export const AUDIT_EUR_WAS = Number(process.env.AUDIT_PRICE_WAS_EUR || 25);

/* report orders carry the report id: RAP-<id>-<rnd>-RO */
export function reportIdOfOrder(orderId: string): string | null {
  const m = orderId.match(/^RAP-([a-z0-9]{12})-/);
  return m ? m[1] : null;
}
