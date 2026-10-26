import type { Metadata } from "next";
import { BlogTopBar } from "../blog/chrome";
import { LegalFooter } from "../_pay/legal-footer";
import { COMPANY, PLANS, PLAN_IDS } from "../_pay/plans";

export const metadata: Metadata = {
  title: "Termeni și condiții | landings.md",
  description:
    "Termenii și condițiile landings.md: servicii, prețuri, comandă și plată online cu cardul prin maib, prestarea serviciilor, anulare și rambursare, protecția datelor personale, date de contact.",
  alternates: { canonical: "/termeni-si-conditii" },
};

const UPDATED = "23 octombrie 2026";

type Sec = { id: string; h: string; p?: string[]; list?: string[]; after?: string[] };

const plansLine = PLAN_IDS.map((id) => `${PLANS[id].name.ro}: €${PLANS[id].eur} pe lună`).join("; ");

const SECTIONS: Sec[] = [
  {
    id: "dispozitii-generale",
    h: "1. Dispoziții generale",
    p: [
      `Acești termeni reglementează relația dintre ${COMPANY.legalName}, IDNO ${COMPANY.idno}, care activează sub numele landings.md (numit mai jos „Prestatorul” sau „noi”), și orice persoană fizică sau juridică ce comandă și plătește servicii pe site-ul landings.md (numită mai jos „Clientul”).`,
      "Prin bifarea casetei „Am citit și accept Termenii și condițiile” și prin efectuarea plății, Clientul confirmă că a citit, a înțeles și acceptă acești termeni. Contractul se consideră încheiat în momentul în care plata este confirmată de bancă.",
      "Putem actualiza acești termeni. Pentru fiecare comandă se aplică versiunea publicată pe site în ziua plății.",
    ],
  },
  {
    id: "servicii",
    h: "2. Serviciile și prețurile",
    p: [
      "Prin plata online vindem pachete de mentenanță lunară. Clientul ne scrie într-un grup Telegram dedicat sau pe email ce are nevoie, iar noi executăm: actualizăm poze, texte, prețuri și produse pe site, facem bannere, oferte și pagini simple, verificăm și ajustăm reclamele, în limitele pachetului ales.",
      `Pachetele și prețurile sunt: ${plansLine}. Conținutul exact al fiecărui pachet este descris pe pagina principală și pe pagina de comandă.`,
    ],
    list: [
      "O cerere înseamnă o sarcină de până la 30 de minute de lucru. Sarcinile mai mari se estimează separat și se fac doar cu acordul Clientului.",
      "Bugetul pentru reclame (Meta, Google) nu este inclus și se plătește de Client direct platformei de reclame.",
      "Lucrările mari, cum ar fi un site nou sau funcții noi, nu fac parte din pachete și primesc ofertă separată.",
      "Cererile nefolosite într-o lună nu se mută în luna următoare.",
      "Raportul complet de verificare a unui site (pagina „Verifică-ți site-ul”): 5 EUR, plată unică. Verificarea de bază este gratuită; plata deblochează raportul complet pentru site-ul verificat: toate problemele găsite și soluțiile lor, poziția estimată în căutare și concurenții, comparația cu concurenții, ce apare la căutarea numelui firmei, dacă asistenții AI recomandă firma, texte gata de copiat, un plan pe 30 de zile, verificarea paginilor site-ului, problemele marcate pe capturi și varianta PDF. Raportul este generat automat, cu ajutorul inteligenței artificiale, pe baza datelor publice ale site-ului din ziua verificării, și are caracter informativ.",
    ],
  },
  {
    id: "comanda-si-plata",
    h: "3. Plasarea comenzii și modalitățile de plată",
    list: [
      "Clientul alege pachetul pe landings.md și apasă „Alege pachetul”.",
      "Pe pagina de comandă completează numele, emailul și telefonul, apoi bifează acceptarea acestor termeni.",
      "La apăsarea butonului „Plătește”, Clientul este trimis pe pagina de plată securizată a băncii maib.",
      "Plata se face cu cardul Visa sau Mastercard ori cu Apple Pay, Google Pay sau MIA Plăți Instant, în funcție de opțiunile afișate pe pagina maib.",
      "După plată, Clientul revine pe landings.md, unde vede numărul comenzii, detaliile ei și data plății, și primește aceeași confirmare pe email.",
    ],
    after: [
      "Prețurile sunt afișate în euro. Plata se încasează în lei moldovenești (MDL), la cursul oficial al Băncii Naționale a Moldovei din ziua plății. Suma exactă în lei este afișată pe pagina de comandă, înainte de plată.",
      "Datele cardului se introduc doar pe pagina băncii maib, protejată cu 3-D Secure. Noi nu vedem și nu păstrăm datele cardului.",
      "Pachetele se plătesc lunar și nu se reînnoiesc automat. Nu retragem bani de pe card fără o plată nouă făcută de Client.",
    ],
  },
  {
    id: "livrare",
    h: "4. Condiții de livrare (prestarea serviciilor)",
    p: ["Serviciile se prestează la distanță, online. Nu există livrare fizică de bunuri."],
    list: [
      "În cel mult o zi lucrătoare de la confirmarea plății, îl adăugăm pe Client în grupul Telegram dedicat și îi confirmăm activarea pe email.",
      "Pachetul este activ 30 de zile din ziua activării.",
      "Programul de lucru este luni–vineri, 10:00–18:00, ora Moldovei. Pentru pachetul Prioritar programul este luni–sâmbătă, iar urgențele (site căzut, eroare care oprește vânzările) se rezolvă și în weekend.",
      "Timpii de răspuns din fiecare pachet se socotesc în programul de lucru.",
      "Clientul ne oferă accesele necesare (site, conturi de reclame) și materialele (poze, texte, prețuri). Termenele încep din momentul în care avem materialele.",
      "Raportul complet de verificare se deschide imediat după confirmarea plății, pe pagina raportului, în browserul în care s-a făcut verificarea. Raportul rămâne salvat în acel browser; Clientul îl poate descărca oricând în format PDF de pe acea pagină.",
    ],
  },
  {
    id: "retur",
    h: "5. Politica de anulare, retur și rambursare",
    list: [
      "Clientul poate renunța oricând. Pachetul rămâne activ până la sfârșitul celor 30 de zile plătite, iar luna următoare pur și simplu nu se mai plătește.",
      "Rambursăm integral suma dacă cererea vine în 14 zile de la plată și nu am executat încă nicio cerere din pachet.",
      "Dacă am executat deja cereri, rambursăm suma proporțional cu zilele rămase din perioada de 30 de zile.",
      "Dacă nu putem presta serviciul din vina noastră, rambursăm integral partea neprestată.",
      "Pentru raportul de verificare: dacă după plată raportul complet nu se deblochează din cauza unei erori tehnice și nu o rezolvăm în 24 de ore, rambursăm integral suma.",
      "Cererea de rambursare se trimite la " + COMPANY.email + ", cu numărul comenzii. Răspundem în cel mult 3 zile lucrătoare.",
      "Banii se întorc pe același card, prin maib, de obicei în 5–10 zile lucrătoare, în funcție de banca care a emis cardul. Se rambursează suma plătită în lei, fără recalcularea cursului.",
    ],
  },
  {
    id: "date-personale",
    h: "6. Protecția datelor cu caracter personal",
    p: [
      "Prelucrăm datele personale conform legislației Republicii Moldova privind protecția datelor cu caracter personal.",
    ],
    list: [
      "Ce date colectăm: numele, emailul, telefonul și, opțional, numele firmei, pe care Clientul le completează la comandă.",
      "De ce: pentru a executa contractul, a emite confirmarea și documentele de plată și a comunica cu Clientul despre serviciu.",
      "Cui le transmitem: băncii maib, pentru procesarea plății, și serviciului de email prin care trimitem confirmarea. Nu vindem și nu închiriem datele nimănui.",
      "Cât le păstrăm: pe durata colaborării și apoi atât cât cere legislația fiscală și contabilă.",
      "Drepturile Clientului: să afle ce date avem despre el, să le corecteze sau să ceară ștergerea lor, în limitele legii, scriind la " + COMPANY.email + ".",
      "Accesele primite de la Client (parole, conturi de reclame) le folosim doar pentru lucrul cerut și nu le transmitem altor persoane.",
    ],
  },
  {
    id: "confidentialitate",
    h: "7. Politica de confidențialitate",
    list: [
      "Site-ul landings.md nu folosește cookie-uri de urmărire sau de publicitate. Browserul poate păstra doar preferințe tehnice, cum ar fi limba aleasă.",
      "Datele cardului nu ajung la noi. Ele sunt procesate doar de banca maib, pe pagina ei securizată.",
      "Conexiunea la site este criptată (HTTPS).",
      "Informațiile despre afacerea Clientului, primite în timpul lucrului, rămân confidențiale.",
    ],
  },
  {
    id: "litigii",
    h: "8. Răspundere și litigii",
    p: [
      "Răspundem pentru lucrul făcut de noi. Nu răspundem pentru întreruperi cauzate de furnizori terți (găzduire, platforme de reclame, Telegram) sau de modificări făcute de alte persoane pe site.",
      "Orice neînțelegere o rezolvăm întâi pe cale amiabilă. Dacă nu reușim, litigiul se soluționează de instanțele competente din Republica Moldova.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <BlogTopBar />
      <main>
        <div className="blog-hero legal-hero">
          <div className="container blog-hero-in">
            <p className="legal-date">Actualizat: {UPDATED}</p>
            <h1 className="art-h1" style={{ marginTop: 18 }}>
              Termeni și condiții
            </h1>
          </div>
        </div>

        <article className="container art legal">
          <nav className="legal-toc" aria-label="Cuprins">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.h}
              </a>
            ))}
            <a href="#contact">9. Date de contact</a>
          </nav>

          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="art-h2">{s.h}</h2>
              {s.p?.map((x, i) => <p key={i}>{x}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              )}
              {s.after?.map((x, i) => <p key={i}>{x}</p>)}
            </section>
          ))}

          <section id="contact">
            <h2 className="art-h2">9. Date de contact</h2>
            <dl className="co-rows legal-rows">
              <div>
                <dt>Denumire</dt>
                <dd>{COMPANY.legalName}</dd>
              </div>
              <div>
                <dt>IDNO</dt>
                <dd>{COMPANY.idno}</dd>
              </div>
              <div>
                <dt>Adresa juridică</dt>
                <dd>{COMPANY.address}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href="tel:+37368327082">{COMPANY.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Telegram</dt>
                <dd>
                  <a href="https://t.me/damiqqn" target="_blank" rel="noopener noreferrer">
                    @damiqqn
                  </a>
                </dd>
              </div>
              <div>
                <dt>Program</dt>
                <dd>luni–vineri, 10:00–18:00</dd>
              </div>
            </dl>
          </section>
        </article>
      </main>
      <LegalFooter />
    </>
  );
}
