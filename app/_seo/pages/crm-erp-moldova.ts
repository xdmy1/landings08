import type { SeoPage } from "../types";

const page: SeoPage = {
  slug: "crm-erp-moldova",
  kw: "CRM",
  kwAlt: ["ERP"],
  title: "CRM și ERP în Moldova. Sisteme făcute pe firma ta",
  desc: "CRM și ERP scrise de la zero pentru firme din Moldova: clienți, comenzi, facturare automată, stoc, profit, contabilitate, roluri și rapoarte. Preț la ofertă.",

  h1a: "CRM și ERP în Moldova,",
  words: ["pe firma ta.", "fără șabloane.", "folosit zilnic."],
  sub: "Construim CRM și ERP pe măsura firmei, nu firma pe măsura unui program cumpărat. Clienți, comenzi, facturare automată, stoc, profit, contabilitate și roluri, într-un singur loc, cu cod scris de la zero în Chișinău.",

  introLabel: "CRM și ERP",
  introTitle: "Un CRM bun se mulează pe felul în care lucrezi deja.",
  introParas: [
    "Multe firme din Moldova plătesc lunar pentru un CRM străin pe care nu îl deschide nimeni. Câmpurile nu se potrivesc cu fluxul real, meniurile sunt în altă limbă, iar după două luni echipa revine la Excel și la mesaje pe WhatsApp. Noi lucrăm invers: întâi ne uităm cum circulă o comandă la tine, de la prima discuție până la bani încasați, și abia apoi scriem sistemul.",
    "ERP nu înseamnă o mie de butoane pe care nu le atinge nimeni. La o firmă care vinde piese, ERP înseamnă factura care se face singură când pleacă marfa, stocul care scade automat, profitul pe fiecare comandă și contabilitatea care nu se mai ține pe foi. Exact asta am construit pentru Inter-Bus, lângă magazinul lor B2B cu conturi și căutare după cod OEM.",
    "Fiecare CRM pe care îl scriem stă pe cod propriu, fără pluginuri care se strică la prima actualizare. Ne construim și propriile sisteme, cum este DropPack, platforma noastră pentru colete între Moldova și Europa, deci știm ce înseamnă să ții un sistem în viață ani la rând, nu doar să îl livrezi.",
  ],
  introPoints: [
    { t: "Construit pe fluxul tău", d: "Un CRM care repetă pașii reali din firmă: ofertă, comandă, livrare, factură, încasare. Nimic în plus." },
    { t: "Roluri și permisiuni", d: "Fiecare om vede doar ce are de lucru. La Școala Auto GLG sistemul are 7 roluri, de la instructor la administrator." },
    { t: "Rapoarte citite de patron", d: "Un ERP scoate stocul, profitul și restanțele într-o pagină, nu în douăzeci de tabele exportate manual." },
  ],

  servLabel: "Ce intră într-un CRM sau ERP de la noi",
  services: [
    { name: "CRM pentru clienți și comenzi", desc: "Fișa clientului, istoricul discuțiilor, ofertele trimise și comenzile în lucru. Nimeni nu mai caută prin conversații ca să afle unde a rămas o vânzare." },
    { name: "ERP cu facturare automată", desc: "Factura se generează din comandă, cu seria și datele tale, și pleacă la client fără să o mai scrie cineva a doua oară în alt program." },
    { name: "Stoc și profit în timp real", desc: "Intrările, ieșirile și marja pe fiecare produs se văd direct în ERP. Știi ce ai în depozit și cât îți rămâne după fiecare comandă." },
    { name: "Roluri și permisiuni în CRM", desc: "Vânzări, depozit, contabilitate și administrator, fiecare cu ecranul lui. Datele sensibile rămân la oamenii care au nevoie de ele." },
    { name: "Legătura cu site-ul și magazinul", desc: "Comenzile de pe site intră direct în sistem, fără copiere manuală. Magazinul online și CRM-ul lucrează pe aceeași bază de date." },
  ],

  casesLabel: "Case studies",
  casesLine: "Sisteme de tip CRM și ERP construite de noi, pentru firme care le folosesc zilnic.",
  cases: [
    {
      key: "interbus",
      name: "Inter-Bus",
      domain: "inter-bus.md",
      href: "https://inter-bus.md",
      line: "Piese pentru autobuze, microbuze și camioane",
      body: "Magazin B2B cu conturi de client și căutare după cod OEM, plus ERP în spate: facturare automată, stoc, profit și contabilitate. Comanda intră de pe site și merge mai departe singură, fără ca cineva să o rescrie în alt program. Este exemplul clar de CRM și ERP croite pe un business de piese, nu pe un manual de instrucțiuni.",
      stats: [
        { v: "B2B", l: "Conturi de client" },
        { v: "Cod OEM", l: "Căutare în catalog" },
        { v: "ERP", l: "Facturare, stoc, profit" },
      ],
    },
    {
      key: "glg",
      name: "Școala Auto GLG",
      domain: "scoalaautoglg.com",
      href: "https://scoalaautoglg.com",
      line: "Școală auto din Chișinău, aplicație internă completă",
      body: "Aplicația școlii ține programările, grupele și plățile într-un singur loc, în locul caietelor și al tabelelor trimise pe WhatsApp. În ea lucrează peste 60 de instructori, alături de operatori, secretare, profesori de teorie, contabili, examinatori și administrator. Aici se vede cel mai bine ce înseamnă un CRM cu roluri: fiecare intră și vede exact partea lui.",
      stats: [
        { v: "60+", l: "Oameni în aplicație" },
        { v: "7", l: "Roluri diferite" },
      ],
    },
    {
      key: "infobac",
      name: "Infobac",
      domain: "infobac.md",
      href: "https://infobac.md",
      line: "Platformă de cursuri pentru BAC-ul la informatică",
      body: "Platformă de cursuri cu simulări de examen și pregătire pentru certificările Certiport. Nu este un CRM clasic, dar pornește din același loc: materialele și evoluția fiecărui elev stau într-un singur sistem scris de noi, nu în fișiere separate. Aceeași structură o folosim când construim ERP pentru firme.",
      stats: [
        { v: "Simulări", l: "Examen la informatică" },
        { v: "Certiport", l: "Pregătire pentru certificări" },
        { v: "Cursuri", l: "BAC la informatică" },
      ],
    },
  ],

  priceNote:
    "Un CRM sau un ERP se ofertează după ce vedem fluxurile din firmă, deci prețul este la ofertă, nu pe listă. Sumele de 350, 550 și 850 EUR sunt pentru site-uri de prezentare și magazine online, nu pentru sisteme interne. Primești o ofertă fixă înainte să înceapă lucrul, plus etapele în care se livrează.",
  proofLine: "Nu facem doar CRM și ERP. Pentru Davo.md am făcut și SEO cu backlinkuri, iar profilul de linkuri se vede în Ahrefs.",

  faqLabel: "Întrebări despre CRM și ERP",
  faq: [
    {
      q: "Cât costă un CRM făcut la comandă?",
      a: "Prețul este la ofertă, pentru că depinde de câte fluxuri intră în sistem și de câți oameni îl folosesc. Ne spui cum lucrezi acum, îți trimitem o ofertă fixă și etapele de livrare. Nu lucrăm cu abonamente lunare inventate pe loc.",
    },
    {
      q: "De ce un CRM propriu și nu unul cu abonament?",
      a: "Pentru că un program străin te obligă să îți schimbi procesele ca să încapă în câmpurile lui. Un sistem scris de la zero face invers, repetă pașii pe care echipa îi știe deja, așa că oamenii chiar îl deschid. Plus că plătești o dată construcția, nu lunar pentru fiecare angajat adăugat.",
    },
    {
      q: "Ce diferență este între CRM și ERP?",
      a: "CRM ține partea de oameni și vânzări: clienți, discuții, oferte, comenzi. ERP ține partea de operațiuni: facturare, stoc, profit, contabilitate. La firmele mici cele două stau de obicei în același sistem, cum am făcut la Inter-Bus, unde magazinul B2B și partea de facturare lucrează împreună.",
    },
    {
      q: "Cât durează până pornește un ERP?",
      a: "O platformă cu conturi și panou de administrare se livrează în trei sau patru săptămâni. Un ERP complet se face în etape: pornim cu partea care doare cel mai tare, de obicei comenzile și facturarea, apoi adăugăm stocul, rapoartele și restul. Așa îl folosești din prima lună, nu după jumătate de an.",
    },
    {
      q: "Putem muta datele din Excel în CRM?",
      a: "Da. Fișierele cu clienți, produse și prețuri se importă la pornire, ca să nu începi de la zero. Structura tabelelor tale ne arată de multe ori chiar fluxul pe care trebuie să îl repete sistemul.",
    },
    {
      q: "Se leagă CRM-ul de magazinul online?",
      a: "Da, și este cel mai util caz. La Inter-Bus comanda plasată în magazinul B2B ajunge direct în partea de facturare și scade stocul, fără intervenție manuală. Dacă ai deja un site, ne uităm dacă se poate lega sau dacă merită rescris odată cu sistemul.",
    },
  ],

  contactTitle: "Hai să vedem ce CRM îți trebuie.",
  contactSub: "Scrie-ne cum lucrează firma ta acum și primești în cel mult 24 de ore o ofertă pentru CRM sau ERP.",

  projectOrder: ["interbus", "glg", "infobac", "davo", "mobo", "radx", "eurogard", "inauto"],
  related: ["solutii-software-moldova", "aplicatii-mobile-chisinau-moldova", "automatizari-ai-moldova", "magazin-online-chisinau-moldova"],
};

export default page;
