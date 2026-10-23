/* eslint-disable @next/next/no-img-element */
import { COMPANY } from "./plans";

export const PAY_MARKS: ReadonlyArray<{ n: string; alt: string; h: number }> = [
  { n: "maib", alt: "maib", h: 17 },
  { n: "mia", alt: "MIA Plăți Instant", h: 19 },
  { n: "visa", alt: "Visa", h: 13 },
  { n: "mastercard", alt: "Mastercard", h: 22 },
  { n: "applepay", alt: "Apple Pay", h: 22 },
  { n: "googlepay", alt: "Google Pay", h: 18 },
];

export function PayMarks() {
  return (
    <div className="container foot-pay">
      {PAY_MARKS.map((p) => (
        <img key={p.n} src={`/images/pay/${p.n}.svg`} alt={p.alt} style={{ height: p.h }} loading="lazy" decoding="async" />
      ))}
    </div>
  );
}

/* footer for the payment and legal pages: marks, legal entity, terms link */
export function LegalFooter() {
  return (
    <footer className="footer">
      <PayMarks />
      <div className="container footer-in">
        <span className="foot-legal">
          &copy; {new Date().getFullYear()} landings.md. {COMPANY.legalName}, IDNO {COMPANY.idno}, {COMPANY.address}.
        </span>
        <a className="foot-terms" href="/termeni-si-conditii">
          Termeni și condiții
        </a>
      </div>
    </footer>
  );
}
