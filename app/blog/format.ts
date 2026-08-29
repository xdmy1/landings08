const MONTHS = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];

export function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[(m || 1) - 1]} ${y}`;
}
