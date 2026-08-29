export type PostSection = { h: string; p: string[]; list?: string[] };
export type PostFaq = { q: string; a: string };
export type Post = {
  slug: string;
  title: string;
  description: string;
  category: "SEO" | "Ads" | "Web" | "Legal";
  date: string;
  minutes: number;
  intro: string[];
  sections: PostSection[];
  faq: PostFaq[];
};

export const POSTS: Post[] = [
  {
    "slug": "ce-este-seo",
    "title": "Ce este SEO și cum funcționează optimizarea pentru Google",
    "description": "Află ce este SEO și cum funcționează optimizarea pentru motoarele de căutare: pași concreți pentru afaceri din Moldova care vor mai mulți clienți din Google.",
    "category": "SEO",
    "date": "2026-06-02",
    "minutes": 4,
    "intro": [
      "Cauți un instalator, un contabil sau un magazin de mobilă și scrii câteva cuvinte în Google. Primele rezultate primesc aproape toate clickurile, restul rămân nevăzute. Pentru o afacere, diferența dintre poziția 3 și poziția 30 înseamnă clienți reali, nu doar cifre într-un raport.",
      "În acest articol explicăm ce este SEO, cum funcționează motoarele de căutare și ce poți face concret pentru site-ul tău. Fără termeni complicați: doar pașii care contează pentru o afacere din Moldova sau România, în ordinea în care merită făcuți."
    ],
    "sections": [
      {
        "h": "Ce este SEO, pe scurt",
        "p": [
          "SEO vine de la Search Engine Optimization, adică optimizarea pentru motoarele de căutare. Este procesul prin care faci un site mai ușor de înțeles pentru Google și mai util pentru oameni, ca să apară mai sus în rezultatele organice. Spre deosebire de reclame, nu plătești pentru fiecare click: plătești cu timp și muncă, iar efectul rămâne și după ce te oprești din investit.",
          "Practic, optimizarea SEO răspunde la trei întrebări. Ce caută clienții tăi, cât de bine răspunde site-ul tău la acele căutări și câtă încredere are Google în domeniul tău."
        ]
      },
      {
        "h": "Cum funcționează motoarele de căutare",
        "p": [
          "Google lucrează în trei etape. Mai întâi trimite roboți care descoperă paginile de pe internet, proces numit crawling. Apoi salvează conținutul într-un index, o bibliotecă uriașă de pagini. Când cineva caută ceva, algoritmul alege din acest index paginile cele mai relevante și le ordonează.",
          "Pentru site-ul tău, asta se traduce în trei condiții. Roboții trebuie să poată accesa paginile, conținutul trebuie să răspundă clar la o căutare reală, iar domeniul trebuie să inspire încredere. Dacă una dintre condiții lipsește, pozițiile suferă."
        ]
      },
      {
        "h": "SEO on-page: conținut care răspunde la căutări",
        "p": [
          "On-page înseamnă tot ce controlezi direct pe site. Începe cu cercetarea cuvintelor cheie: află ce expresii folosesc clienții când caută serviciile tale. Un service auto din Chișinău nu optimizează pentru cuvântul reparații, ci pentru expresii precum schimb ulei Chișinău sau diagnosticare auto preț.",
          "După ce știi expresiile, construiește pagini care le răspund complet. Elementele de bază sunt aceleași pentru orice site:"
        ],
        "list": [
          "Title și H1 care conțin expresia căutată",
          "Texte complete, nu paragrafe de umplutură",
          "URL-uri scurte și clare",
          "Descrieri alt pentru imagini",
          "Linkuri interne între paginile conexe"
        ]
      },
      {
        "h": "SEO tehnic: fundația site-ului",
        "p": [
          "SEO tehnic se ocupă de infrastructură. Un site lent, fără versiune mobilă bună sau cu erori de indexare pierde poziții indiferent cât de bun este conținutul. Verifică viteza cu PageSpeed Insights, conectează site-ul la Google Search Console și rezolvă erorile raportate acolo.",
          "Cele mai frecvente probleme sunt paginile duplicate, redirecturile în lanț și lipsa certificatului SSL. Vestea bună: se rezolvă o singură dată și rămân rezolvate."
        ]
      },
      {
        "h": "SEO off-page: autoritate și backlinkuri",
        "p": [
          "Off-page acoperă semnalele din afara site-ului, în primul rând backlinkurile, adică linkurile de pe alte site-uri către al tău. Google le tratează ca pe niște recomandări: cu cât mai multe site-uri serioase trimit către tine, cu atât crește autoritatea domeniului. Contează calitatea sursei, nu doar numărul.",
          "Un exemplu din practica noastră la landings.md: pentru magazinul davo.md, munca de link building a dus domeniul la Ahrefs DR 50, cu 2.6K backlinkuri din 348 de domenii de referință. Creșterea a venit treptat, din linkuri contextuale plasate pe site-uri relevante."
        ]
      },
      {
        "h": "SEO local: cum apari în căutările din Moldova",
        "p": [
          "Pentru afaceri care vând în Chișinău, Bălți sau în alte orașe, SEO local aduce cele mai rapide rezultate. Creează și completează profilul Google Business Profile: adresă, program, fotografii, categorii corecte. Cere recenzii de la clienții mulțumiți, ele influențează direct pozițiile pe hartă.",
          "Pe site, menționează orașele în care lucrezi în titluri și în texte. O pagină separată pentru fiecare serviciu plus oraș funcționează mai bine decât o pagină generală. Pe piața de SEO din Moldova, concurența pe multe nișe locale este încă mică, deci rezultatele apar mai repede decât pe piețele mari."
        ]
      },
      {
        "h": "Cât durează și cum măsori rezultatele",
        "p": [
          "SEO nu dă rezultate peste noapte. Pentru cuvinte cheie locale cu concurență mică, primele creșteri pot apărea în câteva luni, iar termenii competitivi cer mai mult timp. Tocmai de aceea contează măsurarea: poziții, trafic organic, cereri primite de pe site.",
          "Instrumentele de bază sunt gratuite. Google Search Console arată pe ce căutări apari și unde, iar Google Analytics arată ce fac vizitatorii după click. Verifică datele lunar și ajustează: paginile cu multe afișări dar puține clickuri au nevoie de titluri mai bune."
        ]
      }
    ],
    "faq": [
      {
        "q": "Care este diferența dintre SEO și Google Ads?",
        "a": "Ads aduce trafic imediat, dar plătești fiecare click și traficul se oprește odată cu bugetul. SEO crește mai lent, însă traficul organic rămâne, iar costul per client scade în timp. Cele două funcționează bine împreună: Ads pentru rezultate rapide, SEO pentru termen lung."
      },
      {
        "q": "Cât costă optimizarea SEO în Moldova?",
        "a": "Depinde de concurența din nișă și de starea actuală a site-ului. Auditul și optimizarea on-page sunt de regulă o investiție unică, iar link buildingul este un cost lunar recurent. Cere o analiză concretă a site-ului tău înainte de a semna un contract pe termen lung."
      },
      {
        "q": "Pot face SEO singur sau am nevoie de specialiști?",
        "a": "Bazele le poți face singur: profilul Google Business, texte clare, viteza site-ului. Partea tehnică avansată și link buildingul cer experiență și timp constant. Începe cu ce poți controla și apelează la specialiști când progresul se oprește."
      }
    ]
  },
  {
    "slug": "ghid-backlink-uri",
    "title": "Backlink-uri: ce sunt și cum obții link-uri de calitate",
    "description": "Ghid practic despre backlink-uri și link building: cum evaluezi un link, ce greșeli eviți și cum obții link-uri care îți aduc poziții mai bune în Google.",
    "category": "SEO",
    "date": "2026-06-07",
    "minutes": 4,
    "intro": [
      "Ai un site bine făcut, cu texte scrise atent, dar concurenții apar înaintea ta în Google. De cele mai multe ori diferența nu stă în conținut, ci în link-urile care arată către site: backlink-urile. Ele rămân unul dintre cei mai puternici factori de poziționare și unul dintre cei mai prost înțeleși.",
      "În acest ghid vezi ce sunt backlink-urile, cum deosebești un link valoros de unul inutil, ce metode de link building funcționează pentru firmele din Moldova și România și la ce să fii atent dacă vrei să cumperi backlink-uri. Fără teorie inutilă, doar pași pe care îi poți aplica."
    ],
    "sections": [
      {
        "h": "Ce sunt backlink-urile și cum le vede Google",
        "p": [
          "Un backlink este un link de pe alt site către site-ul tău. Pentru Google, fiecare astfel de link este un vot de încredere: dacă un site respectat trimite cititorii către pagina ta, algoritmul deduce că pagina merită o poziție mai bună. Principiul stă la baza motorului de căutare de la începuturile lui.",
          "Voturile nu au însă aceeași greutate. Un link dintr-un articol publicat pe un site cu autoritate reală valorează mai mult decât zeci de link-uri din directoare obscure. Contează sursa, contextul în care apare link-ul și textul pe care este pus, numit anchor."
        ]
      },
      {
        "h": "De ce contează pentru afacerea ta",
        "p": [
          "Poți avea cel mai bun conținut din nișă și un site tehnic impecabil, dar fără backlink-uri rămâi greu de găsit pe cuvintele competitive. Link-urile ajută Google să decidă cine merită prima pagină atunci când zeci de site-uri oferă cam același lucru.",
          "Pentru o firmă din Chișinău sau din București care concurează pe termeni căutați des, diferența dintre poziția 3 și poziția 8 înseamnă clienți reali. Link building-ul mută acul acolo unde optimizarea din site nu mai are ce să adauge."
        ]
      },
      {
        "h": "Cum recunoști un backlink de calitate",
        "p": [
          "Înainte să aduni link-uri noi, învață să le evaluezi. Un backlink bun are câteva trăsături clare, indiferent de domeniu."
        ],
        "list": [
          "Vine de pe un site cu trafic organic real, nu doar cu metrici umflate",
          "Este plasat în conținut, într-un articol relevant pentru nișa ta",
          "Site-ul sursă are autoritate, măsurată prin DR în Ahrefs sau DA în Moz",
          "Anchor-ul sună natural, nu este o înșiruire de cuvinte cheie",
          "Este dofollow, deci transmite autoritate paginii tale"
        ]
      },
      {
        "h": "Metode de link building care funcționează",
        "p": [
          "Nu ai nevoie de tactici sofisticate ca să începi. Cele mai sigure metode sunt simple, doar că cer consecvență și puțină muncă de relaționare.",
          "Un ritm de câteva link-uri bune pe lună bate orice campanie agresivă făcută o singură dată. Google preferă profilurile care cresc natural."
        ],
        "list": [
          "Articole invitate pe bloguri și publicații din nișa ta",
          "Mențiuni în presa locală din Moldova și România, cu link spre site",
          "Parteneriate cu furnizori și clienți care te pot recomanda pe site-urile lor",
          "Conținut care atrage link-uri natural: ghiduri, calculatoare, date proprii",
          "Recuperarea mențiunilor fără link, acolo unde brandul tău este deja citat"
        ]
      },
      {
        "h": "Cumperi backlink-uri sau le câștigi?",
        "p": [
          "În nișele competitive, aproape toată lumea folosește și plasări plătite în publicații. Problema nu este plata în sine, ci calitatea. Dacă vrei să cumperi backlink-uri, tratează achiziția ca pe orice serviciu: verifică site-ul sursă, traficul lui și articolele deja publicate acolo.",
          "Backlink-urile premium sunt plasări contextuale: un articol relevant, publicat pe un site cu autoritate și trafic real, cu link natural către pagina ta. Un reper din piața locală: pentru davo.md, echipa landings.md a construit un profil care a ajuns la DR 50 în Ahrefs, cu 2.6K backlink-uri din 348 de domenii de referință.",
          "Evită pachetele de mii de link-uri la prețuri de nimic. Sunt aproape întotdeauna rețele de site-uri create doar pentru vânzarea de link-uri, iar Google le ignoră sau le penalizează."
        ]
      },
      {
        "h": "Greșeli frecvente și cum măsori progresul",
        "p": [
          "Cea mai des întâlnită greșeală este graba: multe link-uri obținute în câteva săptămâni, toate cu același anchor exact. Un astfel de profil arată artificial și poate declanșa un filtru algoritmic. La fel de inutile sunt comentariile pe bloguri, semnăturile din forumuri și directoarele generale.",
          "Urmărește progresul în Google Search Console și, dacă ai buget, în Ahrefs sau Semrush. Contează trei lucruri: numărul de domenii de referință, evoluția autorității și pozițiile pe cuvintele cheie importante. Efectul se vede de regulă după câteva luni, dar este cumulativ: fiecare link bun rămâne un activ al site-ului."
        ]
      }
    ],
    "faq": [
      {
        "q": "Câte backlink-uri are nevoie site-ul meu?",
        "a": "Nu există un număr magic, contează relevanța și ritmul constant. Un site nou câștigă mai mult din câteva link-uri bune pe lună decât dintr-un val mare obținut o singură dată. Uită-te și la concurenții de pe prima pagină: profilul lor de link-uri îți arată nivelul la care trebuie să ajungi."
      },
      {
        "q": "Este sigur să cumperi backlink-uri?",
        "a": "Nu este ilegal, dar Google descurajează link-urile plătite care manipulează pozițiile. Riscul este mic dacă plasările sunt articole relevante pe site-uri reale, cu trafic și cu anchor-e naturale. Riscul crește mult când cumperi volume mari din rețele de site-uri de calitate slabă."
      },
      {
        "q": "În cât timp se văd rezultatele link building-ului?",
        "a": "De regulă în câteva luni, în funcție de competiția din nișă și de starea site-ului. Google trebuie să descopere link-urile, să le evalueze și să recalculeze pozițiile. Efectul este cumulativ, deci constanța bate viteza."
      }
    ]
  },
  {
    "slug": "gdpr-pentru-site-uri",
    "title": "GDPR pentru site-uri: obligații și pași concreți",
    "description": "Ghid GDPR pentru site-uri: politica de confidențialitate, cookies și consimțământ, explicate pas cu pas, ca să îți pui site-ul în regulă fără stres.",
    "category": "Legal",
    "date": "2026-06-12",
    "minutes": 5,
    "intro": [
      "Un banner de cookies copiat de pe alt site și o politică de confidențialitate generată automat nu te pun în regulă cu GDPR. Regulamentul se aplică oricărui site care colectează date de la vizitatori din Uniunea Europeană, deci și unui magazin online din Chișinău care livrează în România. Riscul nu este doar amenda, ci și încrederea pe care o pierzi când clienții văd că datele lor sunt tratate neglijent.",
      "În acest ghid vezi ce date colectează site-ul tău de fapt, ce trebuie să conțină politica de confidențialitate, cum configurezi corect banner-ul de cookies și cum răspunzi când cineva îți cere ștergerea datelor. La final ai un checklist pe care îl poți parcurge într-o singură zi de lucru."
    ],
    "sections": [
      {
        "h": "De ce te privește GDPR, chiar dacă site-ul e în Moldova",
        "p": [
          "GDPR este regulamentul european pentru protecția datelor personale. Nu contează unde este găzduit site-ul sau unde este înregistrată firma. Contează dacă prelucrezi date ale persoanelor aflate în Uniunea Europeană.",
          "Practic, un site din Moldova care vinde sau livrează în România intră sub incidența GDPR. Moldova are și propria legislație privind protecția datelor cu caracter personal, construită pe principii similare. Dacă respecți GDPR, ești acoperit în ambele direcții."
        ]
      },
      {
        "h": "Ce date personale colectează site-ul tău fără să îți dai seama",
        "p": [
          "Datele personale nu înseamnă doar nume și email. Adresa IP, identificatorii din cookies și istoricul de navigare intră în aceeași categorie. Aproape orice site modern colectează astfel de date din prima secundă a vizitei.",
          "Fă un inventar simplu înainte de orice altceva. Sursele tipice sunt:"
        ],
        "list": [
          "Formulare de contact și de comandă",
          "Google Analytics sau alte instrumente de statistici",
          "Pixeli de remarketing pentru reclame",
          "Chat-uri live și formulare de abonare la newsletter",
          "Log-urile serverului, care rețin adrese IP"
        ]
      },
      {
        "h": "Politica de confidențialitate: ce trebuie să conțină",
        "p": [
          "Politica de confidențialitate este documentul în care explici, pe limba oamenilor, ce faci cu datele vizitatorilor. Nu este o formalitate copiată de pe alt site, ci o descriere a proceselor tale reale. Dacă politica spune una și site-ul face alta, documentul nu te protejează.",
          "Elementele minime pe care trebuie să le acopere:"
        ],
        "list": [
          "Cine este operatorul de date și cum poate fi contactat",
          "Ce date colectezi și în ce scop",
          "Temeiul legal pentru fiecare prelucrare",
          "Cât timp păstrezi datele",
          "Cu cine le partajezi, de exemplu procesatori de plăți sau curieri",
          "Drepturile utilizatorilor și cum le pot exercita"
        ]
      },
      {
        "h": "Cookies și GDPR: cum arată un banner corect",
        "p": [
          "Regula pentru cookies sub GDPR este simplă: pentru orice cookie care nu este strict necesar funcționării site-ului ai nevoie de consimțământ înainte de plasare. Statisticile și pixelii de publicitate intră aici. Cookie-urile de coș de cumpărături sau de autentificare nu au nevoie de consimțământ.",
          "Un banner corect oferă opțiunea de refuz la fel de vizibilă ca cea de acceptare. Bifele pre-selectate și butoanele de refuz ascunse în al doilea ecran nu sunt conforme. Folosește o platformă de gestionare a consimțământului care blochează scripturile până când utilizatorul alege."
        ]
      },
      {
        "h": "Drepturile utilizatorilor și cum răspunzi la solicitări",
        "p": [
          "Utilizatorii au dreptul să afle ce date ai despre ei, să ceară corectarea sau ștergerea lor și să retragă consimțământul oricând. Ai la dispoziție o lună ca să răspunzi unei solicitări. Termenul curge de la primirea cererii, nu de la momentul în care o citește cineva din echipă.",
          "Stabilește un canal clar, de exemplu o adresă de email dedicată, menționată în politica de confidențialitate. Documentează fiecare solicitare și răspunsul dat. Un proces simplu, notat într-un document intern, este suficient pentru majoritatea afacerilor mici."
        ]
      },
      {
        "h": "Checklist: pune-ți site-ul în regulă pas cu pas",
        "p": [
          "Nu ai nevoie de un proiect de șase luni. Pentru un site de prezentare sau un magazin online mic, pașii de mai jos acoperă esențialul.",
          "Pentru situații mai complexe, cum ar fi date medicale sau volume mari de date, discută cu un specialist în protecția datelor. Acest articol este informativ și nu înlocuiește consultanța juridică."
        ],
        "list": [
          "Inventariază toate punctele unde colectezi date",
          "Scrie sau actualizează politica de confidențialitate",
          "Instalează un banner de cookies care blochează scripturile până la consimțământ",
          "Adaugă bifă de consimțământ la formulare, fără pre-bifare",
          "Verifică contractele cu furnizorii care procesează date pentru tine",
          "Stabilește procedura de răspuns la solicitările utilizatorilor"
        ]
      }
    ],
    "faq": [
      {
        "q": "Am nevoie de banner de cookies dacă folosesc doar Google Analytics?",
        "a": "Da. Cookie-urile de analiză nu sunt strict necesare funcționării site-ului, deci cer consimțământ prealabil. Scriptul de Analytics trebuie să se încarce doar după ce vizitatorul acceptă."
      },
      {
        "q": "Se aplică GDPR unui site din Moldova?",
        "a": "Da, dacă site-ul se adresează persoanelor din Uniunea Europeană, de exemplu prin livrare în România sau prețuri afișate în euro. Moldova are în plus propria legislație de protecție a datelor, cu principii similare. Conformarea cu GDPR acoperă în practică ambele cerințe."
      },
      {
        "q": "Pot copia politica de confidențialitate de pe alt site?",
        "a": "Nu este o idee bună. Politica trebuie să descrie exact ce faci tu cu datele, iar procesele diferă de la o afacere la alta. Poți porni de la un model, dar adapteaz-o la realitatea site-ului tău și cere verificarea unui specialist când ai dubii."
      }
    ]
  },
  {
    "slug": "cat-costa-un-site-web",
    "title": "Cât costă un site web în Moldova: prețuri reale",
    "description": "Afli cât costă un site web în Moldova, ce primești la fiecare buget și cum eviți costurile ascunse, ca să investești corect încă de la prima versiune.",
    "category": "Web",
    "date": "2026-06-16",
    "minutes": 4,
    "intro": [
      "Întrebi trei studiouri cât costă un site și primești trei răspunsuri diferite, uneori cu diferențe de mii de euro. Nu e neapărat un semn că cineva te păcălește. Prețul unui site depinde de ce vinzi, cât conținut ai și ce trebuie să facă site-ul pentru afacerea ta.",
      "În acest articol vezi din ce se compune prețul unui site web în Moldova, ce primești la fiecare nivel de buget și ce costuri apar după lansare. La final vei putea citi o ofertă ca un client informat și vei ști exact ce întrebări să pui înainte să semnezi."
    ],
    "sections": [
      {
        "h": "De ce prețurile variază atât de mult",
        "p": [
          "Un site nu este un produs de raft, este un serviciu. Două oferte care sună la fel pot ascunde volume de muncă foarte diferite. Un studio pornește de la un șablon și schimbă culorile, altul proiectează fiecare pagină de la zero, testează pe mobil și scrie textele împreună cu tine.",
          "Înainte să compari prețuri, compară ce intră în ele. Cele mai mari diferențe vin din câteva zone:"
        ],
        "list": [
          "Design la comandă sau șablon adaptat",
          "Numărul de pagini și volumul de conținut",
          "Funcționalități: formulare, plăți, conturi de utilizator",
          "Texte și fotografii: le aduci tu sau le face echipa",
          "Optimizare SEO de bază și viteză de încărcare"
        ]
      },
      {
        "h": "Site de prezentare: punctul de pornire",
        "p": [
          "Pentru majoritatea afacerilor mici din Moldova, primul pas este un site de prezentare: pagina principală, servicii, despre noi, contact. Scopul lui este simplu, să transforme vizitatorii în apeluri și cereri de ofertă. La acest nivel bugetele încep de la câteva sute de euro: la landings.md, de exemplu, un site pornește de la 350 EUR.",
          "Un site bun de prezentare include design adaptat pe mobil, viteză bună de încărcare și structură gândită pentru Google. Dacă oferta nu spune nimic despre aceste trei lucruri, întreabă direct. Ele fac diferența între un site care aduce clienți și unul care doar există."
        ]
      },
      {
        "h": "Magazin online și proiecte custom: unde cresc costurile",
        "p": [
          "Un magazin online costă mai mult decât un site de prezentare pentru că are mai multe piese în mișcare: catalog de produse, coș de cumpărături, procesare de plăți, integrare cu firmele de curierat, gestiunea stocurilor. Fiecare integrare înseamnă ore de lucru și testare. La fel stau lucrurile cu aplicațiile custom: un sistem de programări sau un portal pentru clienți se calculează pornind de la funcționalități, nu de la numărul de pagini.",
          "Aici prețul corect se stabilește după o discuție detaliată, nu dintr-un mesaj scurt. O echipă serioasă îți va pune multe întrebări înainte să spună o cifră. Dacă primești un preț ferm în cinci minute, e un semnal de atenție."
        ]
      },
      {
        "h": "Costurile pe care nu le vezi în prima ofertă",
        "p": [
          "Prețul de creare a site-ului este doar o parte din investiție. Un site are și costuri de întreținere, mici, dar permanente. Bugetează-le de la început ca să nu ai surprize:",
          "Întreabă din start cine deține domeniul și conturile. Ele trebuie înregistrate pe firma ta, nu pe firma care îți face site-ul. Așa poți schimba oricând furnizorul fără să îți pierzi site-ul."
        ],
        "list": [
          "Domeniul, plătit anual",
          "Găzduirea, lunar sau anual",
          "Certificatul SSL, adesea inclus în găzduire",
          "Mentenanța: actualizări, copii de rezervă, mici modificări",
          "Conținut nou: texte, fotografii, articole de blog"
        ]
      },
      {
        "h": "Cum citești o ofertă de creare site",
        "p": [
          "O ofertă bună pentru creare site în Moldova arată clar ce este inclus și ce se plătește separat. Caută în ea numărul de pagini, cine scrie textele, câte runde de modificări sunt incluse și ce se întâmplă după lansare. Cere exemple de proiecte reale și verifică-le pe telefon, nu doar pe laptop.",
          "Compară apoi ofertele pe același conținut. Prețul unui site web în Chișinău poate părea mare până observi că include texte, SEO de bază și mentenanță, iar oferta mai ieftină nu include nimic din toate astea."
        ]
      },
      {
        "h": "Ieftin acum sau corect de la început",
        "p": [
          "Tentația de a alege cea mai mică cifră este mare, mai ales la primul site. Problema este că un site făcut prost se plătește de două ori: o dată la creare și încă o dată când îl refaci. Textele copiate, viteza slabă și structura haotică se văd în Google și în numărul de clienți.",
          "Asta nu înseamnă că trebuie să pornești cu buget maxim. Înseamnă să pornești cu o versiune mică, dar făcută corect: câteva pagini bune, rapide, cu texte scrise pentru clienții tăi. Poți extinde site-ul pe măsură ce afacerea crește, fără să arunci nimic la gunoi."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât costă un site de prezentare simplu?",
        "a": "În Moldova, un site de prezentare pornește de la câteva sute de euro și crește odată cu numărul de pagini și complexitatea designului. Prețul final depinde de cine scrie textele și de funcționalitățile de care ai nevoie. Cere mereu o ofertă detaliată pe puncte, nu doar o cifră totală."
      },
      {
        "q": "Nu e mai ieftin să îmi fac singur site pe un constructor?",
        "a": "Pe termen scurt, da, plătești doar abonamentul platformei. Pe termen lung plătești cu timpul tău și cu limitările ei: design generic, viteză modestă și control redus asupra SEO. Pentru un hobby e suficient, pentru o afacere care depinde de clienți online rareori ajunge."
      },
      {
        "q": "Cât durează crearea unui site web?",
        "a": "Un site de prezentare durează de regulă câteva săptămâni, de la brief până la lansare. Magazinele online și proiectele custom pot dura câteva luni, în funcție de integrări. Cel mai des termenul se lungește din cauza conținutului, așa că pregătește textele și fotografiile din timp."
      }
    ]
  },
  {
    "slug": "meta-ads-pentru-afaceri",
    "title": "Meta Ads pentru afaceri: ghid practic de la zero",
    "description": "Ghid practic de Meta Ads pentru afaceri din Moldova și România: buget, targetare, creative și greșeli de evitat, ca să obții clienți din reclame fără risipă.",
    "category": "Ads",
    "date": "2026-06-21",
    "minutes": 5,
    "intro": [
      "Multe afaceri din Moldova își fac primele reclame pe Facebook apăsând butonul Boost. Banii se duc, rezultatele nu apar, iar concluzia grăbită este că publicitatea pe Facebook nu funcționează. De cele mai multe ori, problema nu este platforma, ci modul în care este folosită.",
      "În acest ghid vezi cum construiești o campanie de Meta Ads de la zero: cont, pixel, obiectiv, targetare, creative și buget. Exemplele sunt pentru afaceri reale din Moldova și România, de la cafenele și service-uri auto până la magazine online. La final găsești și răspunsuri la cele mai frecvente întrebări."
    ],
    "sections": [
      {
        "h": "Ce sunt Meta Ads și de ce merită atenția ta",
        "p": [
          "Meta Ads este sistemul de publicitate al companiei Meta. Din același cont gestionezi reclame Facebook și reclame Instagram, plus plasări în Messenger și în rețeaua Audience Network, cu aceleași setări de buget și public.",
          "Pentru o afacere mică, avantajul este precizia. Poți arăta o ofertă doar oamenilor din Chișinău interesați de cosmetică, sau doar celor care ți-au vizitat site-ul săptămâna trecută. Plătești pentru un public ales, nu pentru toată lumea."
        ]
      },
      {
        "h": "Pregătește fundația: Business Manager și pixelul",
        "p": [
          "Nu porni reclame din profilul personal și nu te limita la butonul Boost. Creează un cont de business în Meta Business Suite, conectează pagina de Facebook, contul de Instagram și o metodă de plată. Așa păstrezi controlul asupra conturilor și istoricului, chiar dacă un angajat pleacă.",
          "Instalează apoi Meta Pixel pe site, iar dacă platforma ta o permite, și Conversions API. Pixelul înregistrează ce fac vizitatorii: ce pagini văd, ce adaugă în coș, ce formulare trimit. Fără aceste date, algoritmul optimizează orbește."
        ],
        "list": [
          "Cont de Business Manager cu minim doi administratori",
          "Pagina de Facebook și contul de Instagram conectate",
          "Metodă de plată adăugată și limită de cheltuieli setată",
          "Meta Pixel instalat și verificat în Events Manager"
        ]
      },
      {
        "h": "Alege obiectivul corect al campaniei",
        "p": [
          "La crearea campaniei, Meta te întreabă ce rezultat vrei: notorietate, trafic, interacțiune, lead-uri sau vânzări. Alegerea contează enorm, pentru că algoritmul livrează exact ce i-ai cerut. Dacă alegi trafic, primești click-uri ieftine, nu neapărat clienți.",
          "Regula simplă: alege obiectivul cel mai apropiat de bani. Un magazin online alege vânzări. Un service auto sau un cabinet stomatologic alege lead-uri sau mesaje. Notorietatea are sens abia la bugete mari, după ce restul funcționează."
        ]
      },
      {
        "h": "Targetare: cui arăți reclamele",
        "p": [
          "Începe simplu: locație, vârstă și cel mult un interes larg. Pentru publicitate pe Facebook în Moldova, publicul este relativ mic, deci nu îl îngusta excesiv. O targetare pe Chișinău plus 40 km, de la 25 la 55 de ani, acoperă deja majoritatea clienților unui business local.",
          "Al doilea pas sunt publicurile personalizate: oameni care ți-au vizitat site-ul, ți-au scris pe Instagram sau ți-au lăsat datele. Din ele construiești publicuri asemănătoare, așa-numitele lookalike, care aduc de regulă rezultate bune la un cost decent."
        ]
      },
      {
        "h": "Creative: reclama pe care oamenii chiar o observă",
        "p": [
          "Creativul, adică imaginea sau videoclipul plus textul, decide cea mai mare parte din rezultat. Primele două secunde trebuie să arate clar pentru cine este oferta și ce primește omul. Un video simplu, filmat cu telefonul, bate adesea un banner scump dacă mesajul este concret.",
          "Testează mai multe variante în paralel și scrie textul cum ai vorbi cu un client la tejghea. Ofertă clară, un singur îndemn: scrie-ne, comandă, programează-te."
        ],
        "list": [
          "Video de 15 secunde cu produsul în folosire",
          "Carusel cu 3 până la 5 produse și prețuri vizibile",
          "Testimonial filmat cu un client real, cu acordul lui",
          "Ofertă cu termen limită, de exemplu valabilă până duminică"
        ]
      },
      {
        "h": "Unde ajung oamenii după click",
        "p": [
          "O reclamă bună cu o pagină slabă pierde bani. Trimite oamenii pe o pagină care continuă exact mesajul din reclamă, se încarcă repede pe telefon și are un singur pas următor: formular, buton de WhatsApp sau coș de cumpărături.",
          "Dacă nu ai încă un site, nu este un obstacol mare: un landing simplu este o investiție mică, la un studio local precum landings.md pornește de la 350 EUR. Pentru servicii locale funcționează bine și campaniile cu mesaje directe în Messenger sau WhatsApp, fără site."
        ]
      },
      {
        "h": "Buget, testare și citirea rezultatelor",
        "p": [
          "Pentru un business local poți începe cu 5 până la 10 EUR pe zi. Lasă campania să ruleze cel puțin o săptămână înainte să tragi concluzii, pentru că algoritmul are nevoie de date. Modificările zilnice resetează învățarea și strică rezultatele.",
          "Urmărește costul pe rezultat, nu like-urile. Contează cât te costă un mesaj, un lead sau o vânzare și cât valorează acel client pentru afacerea ta. Când costul pe client este clar sub profitul adus de el, campania merită scalată."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât costă publicitatea pe Facebook în Moldova?",
        "a": "Nu există un preț fix: tu decizi bugetul, iar Meta acceptă și sume de câțiva euro pe zi. Pentru un business local, un buget de test de 150 până la 300 EUR pe lună este un punct de pornire rezonabil. Costul pe rezultat depinde de ofertă, creativ și concurență."
      },
      {
        "q": "Merg mai bine reclamele pe Facebook sau pe Instagram?",
        "a": "Depinde de publicul tău și de creativ, iar în practică este mai eficient să lași plasările automate active. Algoritmul împarte bugetul între Facebook și Instagram în funcție de unde primești rezultate mai ieftine. Verifică apoi în rapoarte pe ce plasare se duce bugetul și adaptează formatele."
      },
      {
        "q": "Pot să fac singur Meta Ads sau am nevoie de un specialist?",
        "a": "Poți începe singur dacă urmezi pașii din acest ghid și îți rezervi timp pentru testare. Un specialist sau o agenție are sens când bugetul crește și fiecare procent de eficiență contează. Indiferent de variantă, campaniile trebuie să ruleze în contul tău de reclame, la care păstrezi acces deplin."
      }
    ]
  },
  {
    "slug": "google-ads-ghid",
    "title": "Google Ads pentru începători: reclame care aduc clienți",
    "description": "Ghid practic de Google Ads pentru afaceri din Moldova: cuvinte cheie, anunțuri și optimizare, ca să plătești pentru clienți reali, nu doar pentru click-uri.",
    "category": "Ads",
    "date": "2026-06-26",
    "minutes": 5,
    "intro": [
      "Ai pornit o campanie de reclame Google, bugetul s-a topit în câteva zile și telefonul nu a sunat. Situația asta se repetă în multe afaceri mici din Chișinău și din România. Vina nu este a platformei, ci a modului în care a fost construită campania: fără obiectiv clar, fără cuvinte cheie negative și fără o pagină care să convingă vizitatorul să lase o cerere.",
      "În acest ghid parcurgem pașii esențiali: cum funcționează licitația din Google Ads, cum alegi cuvinte cheie cu intenție de cumpărare, cum scrii anunțuri care filtrează curioșii și cum măsori rezultatele. La final vei ști să lansezi o campanie PPC simplă, cu buget controlat, orientată spre clienți, nu spre click-uri."
    ],
    "sections": [
      {
        "h": "Cum funcționează licitația din Google Ads",
        "p": [
          "Google Ads este un sistem de tip PPC, adică plătești doar când cineva dă click pe anunțul tău. La fiecare căutare, Google organizează o licitație instant între toți advertiserii interesați de acel cuvânt cheie. Nu câștigă mereu cine plătește mai mult.",
          "Poziția anunțului depinde și de calitatea lui: relevanța textului față de căutare, rata de click estimată și experiența pe pagina de destinație. Un anunț bine construit poate plăti mai puțin pe click decât unul neglijent, chiar pentru același cuvânt cheie. De aceea optimizarea contează mai mult decât bugetul brut."
        ]
      },
      {
        "h": "Stabilește o conversie clară înainte să cheltui un ban",
        "p": [
          "Traficul nu plătește facturi. Înainte de a lansa campania, decide ce acțiune înseamnă un client potențial pentru tine: un formular completat, un apel telefonic, o comandă în magazinul online. Aceea este conversia ta.",
          "Configurează urmărirea conversiilor din prima zi, prin Google Tag sau prin import din Google Analytics. Fără aceste date nu vei ști niciodată care cuvinte cheie aduc clienți și care doar consumă buget. Tot sistemul de optimizare al platformei se bazează pe conversiile pe care i le raportezi."
        ]
      },
      {
        "h": "Alege cuvinte cheie cu intenție de cumpărare",
        "p": [
          "Cineva care caută «ce este un aparat de aer condiționat» citește. Cineva care caută «montare aer condiționat Chișinău preț» cumpără. La început, concentrează bugetul pe căutările cu intenție comercială clară, chiar dacă au volum mai mic.",
          "Dacă faci publicitate Google în Moldova, ține cont că o parte importantă din public caută în rusă. Rulează grupuri de anunțuri separate pentru română și rusă, cu texte scrise nativ în fiecare limbă, nu traduse mecanic."
        ],
        "list": [
          "preț, cost, ofertă",
          "comandă, rezervare, programare",
          "numele orașului sau «aproape de mine»",
          "urgent, rapid, azi",
          "marca sau modelul exact"
        ]
      },
      {
        "h": "Scrie anunțuri care filtrează, nu doar atrag",
        "p": [
          "Scopul anunțului nu este să adune click-uri de la oricine, ci să atragă exact oamenii pregătiți să cumpere. Spune clar ce oferi, pentru cine și prin ce te deosebești. Dacă publicul tău este sensibil la preț, pune prețul direct în anunț: cei pentru care este prea scump nu vor mai da click, iar tu nu vei mai plăti pentru ei.",
          "Completează anunțurile cu extensii: sitelink-uri, număr de telefon, locație, avantaje cheie. Anunțul ocupă astfel mai mult spațiu pe ecran și îi dă utilizatorului mai multe motive să te aleagă."
        ]
      },
      {
        "h": "Pagina de destinație decide costul pe client",
        "p": [
          "Un anunț excelent care duce spre o pagină lentă și confuză aruncă banii pe fereastră. Pagina trebuie să continue promisiunea din anunț: același serviciu, aceeași ofertă, cu un formular sau un buton de apel vizibil fără scroll.",
          "Trimite fiecare grup de anunțuri spre pagina cea mai relevantă, nu spre pagina principală a site-ului. Pentru o campanie serioasă merită o pagină dedicată ofertei, cu un singur mesaj și un singur îndemn. Spre exemplu, la landings.md un site de prezentare pornește de la 350 EUR, o investiție mică în raport cu un buget lunar de reclame."
        ]
      },
      {
        "h": "Rutina săptămânală de optimizare",
        "p": [
          "Google Ads nu este un sistem pe care îl pornești și îl uiți. În primele săptămâni, raportul de termeni de căutare îți arată exact pentru ce căutări ai plătit. Tot acolo găsești și primele economii.",
          "După ce aduni suficiente conversii, poți trece de la licitare manuală la strategii automate, cum ar fi maximizarea conversiilor cu un cost țintă per acțiune. Lasă apoi sistemul să învețe câteva săptămâni înainte de a trage concluzii."
        ],
        "list": [
          "verifică termenii de căutare și adaugă cuvinte negative",
          "oprește cuvintele cheie cu multe click-uri și zero conversii",
          "mută buget spre anunțurile cu rezultate",
          "testează un titlu sau o descriere nouă",
          "compară costul pe conversie de la o săptămână la alta"
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât costă un click în Google Ads în Moldova?",
        "a": "Nu există un tarif fix, prețul se stabilește prin licitație și diferă mult de la un domeniu la altul. Poți vedea estimări gratuite pentru cuvintele tale cheie în Keyword Planner, direct din contul Google Ads. Ca regulă, domeniile cu concurență mare plătesc mai mult pe click."
      },
      {
        "q": "În cât timp aduce rezultate o campanie Google Ads?",
        "a": "Primele click-uri apar de obicei în ziua în care campania este aprobată. Pentru concluzii corecte ai însă nevoie de câteva săptămâni de date, timp în care cureți termenii de căutare și ajustezi anunțurile. Judecă o campanie după costul pe conversie, nu după primele zile."
      },
      {
        "q": "Pot administra singur campaniile sau am nevoie de un specialist?",
        "a": "O campanie de căutare simplă, pentru un singur serviciu și cu urmărire de conversii configurată, poate fi administrată de un antreprenor atent. Un specialist devine rentabil când bugetul crește sau când rulezi mai multe canale în paralel. Important este ca cine se ocupă să raporteze conversii, nu doar click-uri și afișări."
      }
    ]
  },
  {
    "slug": "seo-on-page",
    "title": "SEO on-page: ghid practic de optimizare internă",
    "description": "Ghid de SEO on-page pentru site-ul tău: meta title, meta description, structură, viteză și conținut. Aplici pașii și urci în Google fără buget de ads.",
    "category": "SEO",
    "date": "2026-07-01",
    "minutes": 5,
    "intro": [
      "Poți avea cel mai bun serviciu din Chișinău și totuși să fii greu de găsit în Google. De cele mai multe ori problema nu e bugetul de promovare, ci pagina în sine: titluri neclare, texte subțiri, structură haotică. SEO on-page este exact partea pe care o controlezi complet, fără să depinzi de alte site-uri sau de algoritmi misterioși.",
      "În acest ghid vezi ce optimizezi în interiorul site-ului: meta title, meta description, headinguri, URL-uri, linkuri interne, viteză și conținut. Fiecare punct vine cu exemple concrete, ca să le aplici singur sau să știi exact ce să ceri de la echipa care îți administrează site-ul."
    ],
    "sections": [
      {
        "h": "Ce înseamnă SEO on-page și de ce contează",
        "p": [
          "SEO on-page, numit și SEO intern, acoperă tot ce optimizezi direct în paginile site-ului: texte, taguri, structură, linkuri interne, viteză. Spre deosebire de linkurile externe, aici nu aștepți după nimeni. Modifici azi, Google vede la următoarea accesare a paginii.",
          "Pentru un business mic din Moldova sau România, on-page este de obicei cel mai accesibil canal de creștere. Multe site-uri locale concurează cu pagini slab optimizate, așa că lucrurile de bază făcute corect te pot duce în prima pagină pe căutări locale."
        ]
      },
      {
        "h": "Meta title și meta description: prima impresie în Google",
        "p": [
          "Meta title este titlul albastru din rezultatele Google, iar meta description este textul de sub el. Nu se văd în pagină, dar decid dacă omul dă click pe tine sau pe concurent. Un meta title bun are sub 60 de caractere și include cuvântul cheie principal.",
          "Meta description nu influențează direct poziția, dar influențează rata de click. Scrie 140 la 160 de caractere, cu un beneficiu clar. Exemplu pentru un serviciu local: Curățătorie chimică în Chișinău, cu preluare și livrare la domiciliu. Programează online."
        ],
        "list": [
          "Un singur meta title pe pagină, unic în tot site-ul",
          "Cuvântul cheie cât mai aproape de început",
          "Fără înșiruiri de cuvinte cheie despărțite prin virgulă",
          "Numele brandului la final, nu la început"
        ]
      },
      {
        "h": "Headinguri și conținut: structura care se citește",
        "p": [
          "Fiecare pagină are nevoie de un singur H1, care spune clar despre ce este pagina. Subtitlurile H2 și H3 împart textul în blocuri scurte, ușor de scanat. Google folosește această ierarhie ca să înțeleagă subiectul, iar vizitatorii o folosesc ca să găsească rapid ce îi interesează.",
          "Conținutul rămâne partea grea a optimizării unei pagini. Răspunde la întrebarea reală a vizitatorului, nu repeta cuvântul cheie la fiecare propoziție. O pagină de serviciu bună spune ce oferi, pentru cine, cât costă și ce se întâmplă după ce clientul te contactează."
        ]
      },
      {
        "h": "URL-uri curate și linkuri interne",
        "p": [
          "Un URL scurt și descriptiv ajută și oamenii, și motoarele de căutare. Folosește adrese de tip /reparatii-frigidere, nu /pagina?id=173. Odată publicat, nu schimba URL-ul fără o redirecționare 301, altfel pierzi pozițiile acumulate.",
          "Linkurile interne distribuie autoritate între pagini și țin vizitatorul pe site. Leagă articolele de blog de paginile de servicii și invers. Folosește ancore descriptive, de exemplu optimizare SEO pentru magazine online, nu apasă aici."
        ]
      },
      {
        "h": "Viteză, mobil și imagini",
        "p": [
          "Viteza de încărcare face parte din SEO intern. O pagină lentă pierde vizitatori înainte ca ei să apuce să citească oferta. Testează gratuit cu PageSpeed Insights și rezolvă întâi imaginile, acolo se pierde cel mai mult timp de încărcare.",
          "Adaugă și atribute alt la imagini. Ele descriu conținutul pentru persoanele care folosesc cititoare de ecran și dau context suplimentar pentru Google Images."
        ],
        "list": [
          "Comprimă imaginile și folosește formate moderne precum WebP",
          "Servește imaginile la dimensiunea reală de afișare",
          "Elimină scripturile pe care nu le folosești",
          "Verifică pagina pe telefon, acolo vin cei mai mulți vizitatori"
        ]
      },
      {
        "h": "Cum verifici și cum arată rezultatele",
        "p": [
          "Instalează Google Search Console, este gratuit și îți arată pe ce căutări apari, ce poziții ai și ce pagini au probleme. Verifică lunar paginile neindexate, titlurile duplicate și erorile pe mobil. Corectezi, apoi urmărești evoluția câteva săptămâni, schimbările în SEO nu apar peste noapte.",
          "On-page este fundația, restul se construiește deasupra. Am văzut asta la landings.md pe proiectul davo.md: optimizarea internă a paginilor a fost baza pe care campania de linkuri a ajuns la 2.6K backlinkuri din 348 de domenii de referință și DR 50 în Ahrefs. Fără pagini bine structurate, linkurile trimit trafic către un site care nu convinge."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât durează până se văd rezultatele SEO on-page?",
        "a": "Google observă modificările la următoarea accesare a paginii, de obicei în câteva zile. Efectul asupra pozițiilor apare în general în câteva săptămâni, în funcție de concurență. Pe căutări locale cu concurență mică, schimbările se pot vedea mai repede."
      },
      {
        "q": "Pot face SEO on-page singur sau am nevoie de un specialist?",
        "a": "Lucrurile de bază le poți face singur: meta title, meta description, headinguri, texte alt la imagini. Pentru partea tehnică, adică viteză, indexare și structura site-ului, ai nevoie de acces la cod și de ceva experiență. Un audit făcut de un specialist îți arată exact unde pierzi poziții."
      },
      {
        "q": "Care este diferența dintre SEO on-page și SEO off-page?",
        "a": "SEO on-page acoperă tot ce controlezi în interiorul site-ului: conținut, taguri, structură, viteză. Off-page înseamnă în principal linkurile primite de pe alte site-uri și semnalele de brand. Ai nevoie de ambele, dar on-page se face primul, pentru că linkurile către pagini slabe nu aduc rezultate."
      }
    ]
  },
  {
    "slug": "seo-off-page",
    "title": "SEO off-page: cum construiești autoritatea site-ului",
    "description": "Ghid de SEO off-page pentru afaceri din Moldova și România: backlink-uri, autoritate de domeniu și semnale externe, ca să urci în Google fără riscuri.",
    "category": "SEO",
    "date": "2026-07-06",
    "minutes": 5,
    "intro": [
      "Poți avea cel mai rapid site și cele mai bune texte, dar dacă niciun alt site nu vorbește despre tine, Google rămâne sceptic. Motorul de căutare nu se uită doar la ce spui tu despre afacerea ta, ci și la ce spun alții. Aici intervine SEO off-page: partea de optimizare care se întâmplă în afara paginilor tale.",
      "În acest ghid vezi ce înseamnă SEO extern, cum se măsoară autoritatea unui domeniu, ce face un backlink valoros și cum obții astfel de link-uri fără să rișți o penalizare. Exemplele sunt gândite pentru afaceri din Moldova și România, cu pași pe care îi poți începe săptămâna aceasta."
    ],
    "sections": [
      {
        "h": "Ce înseamnă SEO off-page, pe scurt",
        "p": [
          "SEO off-page, numit și SEO extern, cuprinde toate semnalele din afara site-ului care îi influențează pozițiile în Google. Cea mai mare parte o reprezintă backlink-urile, adică link-urile de pe alte site-uri către al tău. Intră aici și mențiunile de brand, recenziile și profilurile locale.",
          "Logica este simplă. Conținutul de pe site spune ce faci, semnalele externe confirmă că alții au încredere în tine. Când mai multe site-uri au conținut la fel de bun, această confirmare decide cine urcă pe primele poziții."
        ]
      },
      {
        "h": "Autoritate de domeniu și domain rating, explicate simplu",
        "p": [
          "Autoritatea de domeniu este o estimare a forței profilului tău de link-uri. Google nu publică un asemenea scor, dar unelte cunoscute calculează unul propriu: Domain Rating în Ahrefs, Domain Authority în Moz. Scara merge de la 0 la 100 și crește tot mai greu, deci saltul de la 40 la 50 cere mult mai multă muncă decât cel de la 10 la 20.",
          "Tratează domain rating ca pe un termometru, nu ca pe un scop în sine. Îl folosești ca să te compari cu concurenții direcți și ca să evaluezi site-urile de la care vrei link-uri. Un reper concret din piața locală: pentru davo.md, munca de SEO extern a dus site-ul la Domain Rating 50 în Ahrefs, cu 2.6K backlink-uri de pe 348 de domenii de referință."
        ]
      },
      {
        "h": "Ce face un backlink cu adevărat valoros",
        "p": [
          "Nu toate link-urile cântăresc la fel. Zece link-uri de pe site-uri relevante, cu trafic real, bat o sută de link-uri din directoare goale sau comentarii de blog. Înainte să investești timp sau bani într-un link, verifică-l pe câteva criterii clare:"
        ],
        "list": [
          "Site-ul are legătură tematică cu domeniul tău",
          "Are trafic organic real, nu doar un scor umflat",
          "Link-ul apare în conținut, nu în footer sau sidebar",
          "Link-ul este dofollow, ca să transmită autoritate",
          "Ancora sună natural, nu ca un cuvânt cheie forțat"
        ]
      },
      {
        "h": "Metode corecte de a obține backlink-uri",
        "p": [
          "Cea mai sigură bază este conținutul care merită citat: un ghid detaliat, un calculator util, o pagină cu prețuri transparente. La el adaugi muncă activă de link building, adică propuneri concrete trimise site-urilor potrivite.",
          "Pentru o afacere din Chișinău sau din România, cele mai accesibile surse sunt de obicei aproape de tine:"
        ],
        "list": [
          "Articole invitate pe bloguri și publicații din nișa ta",
          "Presa locală, când ai o noutate reală de anunțat",
          "Parteneri și furnizori care te pot menționa pe site",
          "Directoare locale de calitate, cu date complete",
          "Asociații profesionale din care faci parte"
        ]
      },
      {
        "h": "Semnale externe dincolo de link-uri",
        "p": [
          "SEO extern nu se rezumă la backlink-uri. Un profil Google Business completat, recenzii primite constant și mențiuni ale brandului în articole sau forumuri îi arată lui Google că afacerea există și e activă. Pentru căutările locale, gen servicii în Chișinău, aceste semnale pot cântări cât link-urile.",
          "Rețelele sociale nu transmit autoritate direct, dar amplifică restul. Un articol distribuit bine ajunge la oameni care au propriile site-uri și pot pune link către el. Consistența numelui, adresei și telefonului pe toate platformele întărește încrederea în datele tale."
        ]
      },
      {
        "h": "Greșeli care îți pot bloca site-ul",
        "p": [
          "Cea mai frecventă greșeală este cumpărarea de link-uri ieftine la grămadă: sute de link-uri din site-uri fără trafic, cu aceeași ancoră comercială. În cel mai bun caz Google le ignoră și pierzi banii. În cel mai rău caz primești o acțiune manuală și pozițiile se prăbușesc.",
          "Ferește-te și de schimburile masive de link-uri, de rețelele private de bloguri și de creșterile bruște fără nicio logică. Un profil sănătos crește treptat, din surse variate, cu ancore diverse. Verifică-ți lunar link-urile noi într-o unealtă de analiză și reacționează la ce pare suspect."
        ]
      }
    ],
    "faq": [
      {
        "q": "Care este diferența dintre SEO on-page și SEO off-page?",
        "a": "SEO on-page acoperă tot ce controlezi pe site: conținut, structură, viteză, link-uri interne. SEO off-page acoperă semnalele din afara site-ului: backlink-uri, mențiuni, recenzii, profiluri locale. Ai nevoie de ambele, pentru că fără bază on-page link-urile nu au ce să împingă în sus."
      },
      {
        "q": "În cât timp se văd rezultatele SEO extern?",
        "a": "De regulă în luni, nu în zile. Google trebuie să descopere link-urile noi, să le evalueze și să le dea greutate treptat. Planifică munca de link building pe cel puțin câteva luni și judecă progresul pe trend, nu pe fiecare săptămână în parte."
      },
      {
        "q": "Un domain rating mare garantează poziții bune în Google?",
        "a": "Nu. Domain rating este o metrică a unei unelte terțe, nu un factor folosit direct de Google. Un site cu scor mai mic, dar cu conținut mai relevant pentru căutare, poate depăși lejer un site cu scor mare. Folosește scorul comparativ, ca reper, nu ca promisiune."
      }
    ]
  },
  {
    "slug": "prima-pagina-google",
    "title": "Cum ajungi pe prima pagină în Google: pași concreți",
    "description": "Ghid practic pentru prima pagină Google: cum funcționează ranking-ul, ce optimizezi mai întâi și ce pași urmezi ca site-ul tău să atragă clienți constant.",
    "category": "SEO",
    "date": "2026-07-11",
    "minutes": 5,
    "intro": [
      "Dacă site-ul tău apare pe pagina a doua în Google, pentru majoritatea clienților el practic nu există. Puțini oameni trec de primele rezultate, iar concurența pentru pozițiile de sus este reală în orice domeniu, de la servicii în Chișinău până la magazine online din România. Vestea bună: poziția în Google nu este o loterie, ci rezultatul unor pași care pot fi verificați și repetați.",
      "În acest ghid vezi cum funcționează ranking-ul Google, ce optimizezi mai întâi și cum urci în Google pas cu pas: cuvinte cheie, conținut, partea tehnică, autoritate și SEO local. Fiecare secțiune se încheie cu ceva ce poți aplica pe site-ul tău chiar săptămâna aceasta."
    ],
    "sections": [
      {
        "h": "Cum decide Google cine ajunge pe prima pagină",
        "p": [
          "Google ordonează rezultatele după trei criterii mari: relevanța conținutului față de căutare, autoritatea site-ului și experiența pe care o oferă pagina. Niciunul nu funcționează singur. Un text excelent pe un site lent sau un site rapid fără conținut util rămân amândouă pe pozițiile de jos.",
          "Asta înseamnă că ranking-ul în Google se construiește pe mai multe planuri în paralel. Pașii de mai jos urmează exact această logică: întâi relevanța, apoi partea tehnică, apoi autoritatea."
        ]
      },
      {
        "h": "Alege cuvintele cheie după intenție, nu după volum",
        "p": [
          "Mulți proprietari de afaceri vor să apară pe termeni generali, de exemplu doar «mobilă» sau «avocat». Acolo concurența este uriașă, iar intenția utilizatorului este neclară. O căutare precisă, cum ar fi «mobilă la comandă Chișinău», aduce mai puțin trafic, dar aduce oameni gata să cumpere.",
          "Fă o listă cu felul în care clienții descriu problema lor, nu cu felul în care vorbești tu despre servicii. Verifică apoi ce apare acum în Google pe acele căutări: dacă vezi rezultate asemănătoare cu oferta ta, ești pe drumul cel bun."
        ]
      },
      {
        "h": "Optimizarea on-page: pagina trebuie să răspundă căutării",
        "p": [
          "Fiecare pagină importantă din site trebuie să țintească o singură căutare principală. Google se uită la titlu, la structura textului și la cât de complet acoperă pagina subiectul. Utilizatorul se uită dacă găsește răspunsul în primele secunde.",
          "Nu scrie pentru algoritm. Scrie pentru clientul care caută, iar algoritmul va ține pasul."
        ],
        "list": [
          "Titlul paginii conține cuvântul cheie principal",
          "Un singur H1 clar, apoi subtitluri logice",
          "Meta description care invită la click",
          "URL scurt și descriptiv",
          "Linkuri interne către paginile conexe",
          "Imagini comprimate, cu text alternativ"
        ]
      },
      {
        "h": "Partea tehnică: viteză, mobil, indexare",
        "p": [
          "Un site care se încarcă greu pierde vizitatori înainte ca poziția în Google să mai conteze. Testează viteza cu PageSpeed Insights și repară întâi imaginile mari și scripturile inutile. Verifică apoi cum arată site-ul pe telefon, pentru că de acolo vine cea mai mare parte a căutărilor.",
          "Conectează site-ul la Google Search Console. Este gratuit și îți arată pe ce căutări apari, ce poziție Google are fiecare pagină și ce erori de indexare îți blochează rezultatele."
        ]
      },
      {
        "h": "Autoritatea: backlinkuri care chiar contează",
        "p": [
          "Backlinkurile rămân unul dintre cele mai puternice semnale pentru ranking Google. Un link dintr-un articol relevant, de pe un site real, valorează mai mult decât zeci de linkuri din directoare fără trafic. Calitatea și contextul bat volumul.",
          "Rezultatele se văd în timp, nu peste noapte. De exemplu, în proiectul SEO pentru davo.md, landings.md a ajuns la Ahrefs DR 50 cu 2,6K backlinkuri din 348 de domenii de referință, construite treptat, nu dintr-o singură campanie."
        ]
      },
      {
        "h": "SEO local: apari acolo unde te caută clienții",
        "p": [
          "Pentru afaceri din Moldova și România, căutările locale sunt adesea cel mai scurt drum spre prima pagină Google. Creează și completează profilul Google Business Profile: adresă, program, fotografii, servicii. Cere recenzii de la clienții mulțumiți și răspunde la ele.",
          "Pe site, menționează natural orașele în care lucrezi și creează pagini separate pentru serviciu plus locație atunci când are sens. Datele de contact trebuie să fie identice peste tot: site, profil Google, rețele sociale."
        ]
      },
      {
        "h": "Măsoară, ajustează, repetă",
        "p": [
          "Pozițiile în Google se mișcă permanent, deci verifică-le lunar, nu zilnic. Urmărește în Search Console căutările pe care ești între pozițiile 11 și 20: acele pagini sunt cel mai aproape de prima pagină și cresc cel mai repede după o actualizare bună.",
          "Împrospătează conținutul care stagnează, adaugă răspunsuri la întrebările noi ale clienților și continuă să obții linkuri relevante. Cum urci în Google nu este un secret, este o rutină ținută constant."
        ]
      }
    ],
    "faq": [
      {
        "q": "În cât timp ajung pe prima pagină în Google?",
        "a": "Depinde de concurența pe cuvintele cheie alese și de starea actuală a site-ului. Pentru căutări locale sau de nișă, primele rezultate pot apărea după câteva luni de lucru constant. Pentru termeni foarte concurați, procesul durează mai mult și cere conținut solid și backlinkuri de calitate."
      },
      {
        "q": "Pot urca în Google fără să plătesc reclame?",
        "a": "Da, poziția organică nu depinde de bugetul de publicitate. Reclamele Google Ads aduc vizibilitate imediată, dar nu îmbunătățesc ranking-ul organic. Cele două funcționează bine împreună: reclamele aduc clienți acum, iar SEO construiește trafic stabil pe termen lung."
      },
      {
        "q": "Ce fac dacă poziția în Google a scăzut brusc?",
        "a": "Verifică întâi Search Console pentru erori de indexare sau acțiuni manuale. Apoi vezi dacă scăderea coincide cu o actualizare de algoritm sau cu modificări recente pe site. De multe ori problema este tehnică și se rezolvă repede după ce este identificată."
      }
    ]
  },
  {
    "slug": "viteza-site-core-web-vitals",
    "title": "Viteza site-ului și Core Web Vitals: de ce pierzi clienți",
    "description": "Viteza site-ului decide dacă vizitatorii rămân sau pleacă. Afli ce sunt Core Web Vitals, cum le măsori și ce optimizări aduc mai mulți clienți din Google.",
    "category": "Web",
    "date": "2026-07-16",
    "minutes": 5,
    "intro": [
      "Apeși pe un rezultat din Google, ecranul rămâne alb câteva secunde și te întorci la căutare. Exact așa pierd clienți multe afaceri din Moldova și România, fără nicio plângere și fără niciun semnal în rapoarte. Un site lent nu doar irită: costă cereri de ofertă, apeluri și poziții în Google.",
      "În acest articol explicăm pe înțelesul oricui ce sunt Core Web Vitals, cum măsori corect viteza site-ului cu PageSpeed Insights și ce optimizări aduc cel mai mare câștig. La final vei ști exact ce să ceri echipei tehnice sau agenției cu care lucrezi."
    ],
    "sections": [
      {
        "h": "Un site lent pierde clienți înainte de prima discuție",
        "p": [
          "Cei mai mulți vizitatori intră de pe telefon, adesea pe rețea mobilă, nu pe Wi-Fi stabil de birou. Dacă pagina întârzie, omul apasă înapoi și alege alt rezultat din listă. Tu nu afli niciodată, vezi doar că cererile scad.",
          "Durerea se dublează când plătești reclame. Fiecare clic costă bani, iar o pagină lentă pierde o parte din vizitatori înainte să vadă oferta. De aceea optimizarea vitezei este adesea cea mai ieftină metodă de a crește conversiile, înaintea oricărui buget suplimentar de promovare."
        ]
      },
      {
        "h": "Core Web Vitals, explicate pe înțeles",
        "p": [
          "Core Web Vitals sunt trei indicatori prin care Google măsoară experiența reală a vizitatorilor pe paginile tale. Nu sunt teorie pentru programatori, fiecare descrie ceva ce simte orice om cu telefonul în mână.",
          "Pragurile publicate de Google pentru calificativul bun: LCP sub 2,5 secunde, INP sub 200 de milisecunde, CLS sub 0,1. Dacă paginile tale trec aceste praguri pe mobil, ești deja înaintea multor concurenți."
        ],
        "list": [
          "LCP: cât de repede apare conținutul principal al paginii",
          "INP: cât de repede răspunde pagina la clicuri și tastări",
          "CLS: cât de mult se mișcă elementele în timpul încărcării"
        ]
      },
      {
        "h": "Cum influențează viteza pozițiile în Google",
        "p": [
          "Google a confirmat că experiența paginii, inclusiv Core Web Vitals, este folosită ca semnal de clasare. Semnalul nu mută singur un site de pe pagina a cincea pe prima, dar la conținut comparabil departajează.",
          "Efectul indirect este adesea mai mare decât cel direct. Vizitatorii care se întorc imediat la rezultate, paginile parcurse greu de roboți la indexare, recomandările pe care nu le primești pentru că nimeni nu trimite mai departe un site greoi: toate se adună în timp. Viteza nu înlocuiește munca de SEO, dar o susține."
        ]
      },
      {
        "h": "Cum măsori corect viteza site-ului",
        "p": [
          "Deschide PageSpeed Insights și introdu adresa paginii, nu doar domeniul. Uită-te întâi la datele utilizatorilor reali din ultimele 28 de zile, apoi la scorul de laborator. Scorul este o simulare utilă pentru diagnostic, datele reale arată ce trăiesc vizitatorii tăi.",
          "Testează varianta de mobil și verifică paginile care aduc bani: prima pagină, paginile de servicii, fișele de produs. Un scor bun pe homepage nu garantează nimic pentru pagina prin care clientul trimite comanda."
        ]
      },
      {
        "h": "Cauzele frecvente și reparațiile cu impact",
        "p": [
          "În audituri revin aceleași probleme, iar cele mai multe se rezolvă fără a rescrie site-ul de la zero.",
          "Începe cu imaginile: convertește-le în WebP sau AVIF, redimensionează-le la mărimea afișată și activează încărcarea amânată pentru cele de sub primul ecran. Apoi pornește cache-ul și compresia, amână scripturile necritice și șterge pluginurile nefolosite. Rezervă spațiu fix pentru imagini și bannere, așa dispare săritura de layout care strică CLS."
        ],
        "list": [
          "Imagini uriașe, urcate direct din telefon sau de la fotograf",
          "Teme și pluginuri care încarcă scripturi pe toate paginile",
          "Găzduire lentă, cu serverul departe de vizitatori",
          "Fonturi și scripturi externe care blochează afișarea",
          "Lipsa cache-ului, pagina se generează la fiecare vizită"
        ]
      },
      {
        "h": "Când optimizezi și când reconstruiești",
        "p": [
          "Dacă site-ul stă pe o temă veche, cu zeci de pluginuri și scoruri slabe peste tot, optimizarea devine cârpeală. Fiecare oră de lucru câștigă puțin, iar cauza rămâne în fundație.",
          "În astfel de cazuri, un site nou construit corect de la început iese adesea mai ieftin decât luni de reparații. La landings.md, un site pornește de la 350 EUR, cu viteza tratată din construcție, nu ca reparație ulterioară. Pentru o firmă din Chișinău sau din București, calculul e simplu: costul lucrării față de clienții pierduți în fiecare lună."
        ]
      }
    ],
    "faq": [
      {
        "q": "Ce scor PageSpeed trebuie să am ca să fiu în siguranță?",
        "a": "Scorul de laborator este un instrument de diagnostic, nu un obiectiv în sine. Contează ca datele utilizatorilor reali să treacă pragurile Core Web Vitals pe mobil. Nu plăti pentru vânătoarea scorului 100, banii aceia aduc mai mult investiți în conținut."
      },
      {
        "q": "În cât timp se văd rezultatele optimizării vitezei?",
        "a": "Vizitatorii simt diferența imediat după publicarea modificărilor. În PageSpeed Insights, datele utilizatorilor reali se actualizează pe o fereastră de 28 de zile, deci verdictul final îl vezi după aproximativ o lună. Urmărește în paralel rata de conversie, acolo apare efectul care contează."
      },
      {
        "q": "Viteza site-ului contează și pentru reclamele plătite?",
        "a": "Da, poate chiar mai mult decât pentru SEO. O pagină lentă pierde o parte din clicurile plătite înainte ca oferta să fie văzută, deci costul real pe client crește. Orice campanie de Google Ads sau Meta merită o pagină de destinație rapidă."
      }
    ]
  },
  {
    "slug": "seo-local-google-business",
    "title": "SEO local și Google Business Profile: ghid pentru hartă",
    "description": "Ghid practic de SEO local: cum îți configurezi Google Business Profile ca afacerea ta să apară pe hartă și să primești mai mulți clienți din zonă.",
    "category": "SEO",
    "date": "2026-07-20",
    "minutes": 4,
    "intro": [
      "Când cineva caută un service auto aproape de el sau o cafenea în Botanica, Google arată mai întâi harta. Trei afaceri apar în caseta locală, restul rămân mai jos, unde puțini mai ajung. Dacă profilul tău nu este acolo, clientul sună la concurență, chiar dacă ești la o stradă distanță.",
      "În acest ghid vezi cum funcționează SEO local, cum configurezi corect Google Business Profile și ce semnale folosește Google când decide cine apare pe hartă. Pașii sunt practici și îi poți aplica singur, fie că ai o afacere în Chișinău, fie în orice oraș din România."
    ],
    "sections": [
      {
        "h": "Ce este SEO local și cum alege Google cine apare pe hartă",
        "p": [
          "SEO local înseamnă optimizarea prezenței tale online pentru căutări cu intenție geografică: oameni care caută un produs sau un serviciu lângă ei. Rezultatele apar în caseta cu harta și în Google Maps, iar afacerea ta concurează doar cu firmele din zonă, nu cu tot internetul.",
          "Google folosește trei criterii principale când ordonează rezultatele locale."
        ],
        "list": [
          "Relevanță: cât de bine se potrivește profilul cu ce a căutat omul",
          "Distanță: cât de aproape ești de locul din care se face căutarea",
          "Notorietate: recenzii, mențiuni, linkuri și autoritatea site-ului"
        ]
      },
      {
        "h": "Revendică și verifică profilul Google Business Profile",
        "p": [
          "Primul pas este să cauți afacerea pe Google Maps. Dacă apare deja, revendică profilul din contul tău Google. Dacă nu apare, creează unul nou din business.google.com, cu numele real al firmei, adresa exactă și un număr de telefon la care chiar răspunde cineva.",
          "Google cere apoi o verificare, de obicei printr-un clip video în care arăți sediul, firma de la intrare și echipamentul de lucru. Fără verificare, profilul nu apare public, deci nu sări peste acest pas."
        ]
      },
      {
        "h": "Completează profilul ca un client, nu ca un formular",
        "p": [
          "Categoria principală este cea mai importantă setare din profil. Alege categoria care descrie exact ce faci, de exemplu Salon de înfrumusețare, nu una generică. Adaugă apoi categorii secundare pentru serviciile conexe.",
          "Scrie o descriere clară, în limbaj normal, în care spui ce faci, pentru cine și în ce zonă. Completează serviciile cu prețuri unde se poate, programul real, inclusiv de sărbători, și atributele relevante: parcare, plată cu cardul, acces pentru cărucioare."
        ]
      },
      {
        "h": "Recenziile: semnalul pe care îl vede toată lumea",
        "p": [
          "Recenziile influențează și poziția pe hartă, și decizia clientului. Cere o recenzie imediat după o experiență bună, prin mesaj sau printr-un cod QR la casă. Linkul direct de recenzie din Google Business Profile face tot procesul de zece secunde.",
          "Răspunde la toate recenziile, inclusiv la cele negative, calm și concret. Nu cumpăra niciodată recenzii false: Google le detectează tot mai bine, iar un profil suspendat se recuperează greu."
        ]
      },
      {
        "h": "Fotografii, postări și întrebări: ține profilul viu",
        "p": [
          "Un profil activ transmite Google și clienților că afacerea funcționează. Urcă fotografii reale cu spațiul, echipa și produsele, nu imagini de stoc. Adaugă poze noi lunar, nu doar la lansare.",
          "Folosește postările pentru oferte, produse noi sau anunțuri de program. Verifică și secțiunea de întrebări și răspunsuri: oricine poate răspunde acolo în locul tău, iar informațiile greșite costă clienți."
        ]
      },
      {
        "h": "Site-ul tău susține afacerea în Google Maps",
        "p": [
          "Profilul și site-ul lucrează împreună. Creează pagini dedicate pentru fiecare serviciu și oraș important, cu adresa și telefonul vizibile în subsol, identice cu cele din profil. Orice nepotrivire de nume, adresă sau telefon derutează algoritmul.",
          "Autoritatea domeniului contează și în rezultatele locale. Linkurile din presa locală, directoarele de firme și partenerii din zonă întăresc profilul. În proiectul davo.md, la care lucrăm la landings.md, profilul de linkuri a ajuns la DR 50 în Ahrefs, cu 2.6K backlinkuri din 348 de domenii, iar autoritatea asta susține și pozițiile din pachetul local."
        ]
      },
      {
        "h": "Greșeli care te țin departe de hartă",
        "p": [
          "Cele mai multe profiluri nu au nevoie de trucuri, ci de curățenie. Verifică lista de mai jos înainte să investești în orice altceva."
        ],
        "list": [
          "Nume de profil umflat cu cuvinte-cheie, riscă suspendarea",
          "Adresă sau telefon diferite pe site față de profil",
          "Categorie principală greșită sau prea generică",
          "Program neactualizat, mai ales de sărbători",
          "Recenzii lăsate fără răspuns luni întregi"
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât durează până apar rezultate în SEO local?",
        "a": "Un profil nou verificat poate apărea pe hartă în câteva zile, dar pozițiile bune vin în timp. Pentru zone cu concurență mare, cum e centrul Chișinăului sau al unui oraș mare din România, calculează câteva luni de muncă constantă. Recenziile și completarea profilului aduc de obicei primele îmbunătățiri vizibile."
      },
      {
        "q": "Pot administra singur Google Business Profile?",
        "a": "Da, interfața este gratuită și accesibilă oricui are un cont Google. Configurarea inițială, pozele și recenziile le poți gestiona fără ajutor. O agenție devine utilă când concurența este puternică și e nevoie de optimizare pe site, conținut local și linkuri."
      },
      {
        "q": "Ce fac dacă afacerea mea apare greșit pe Google Maps?",
        "a": "Revendică mai întâi profilul, pentru că doar așa poți controla informațiile. După verificare, corectează adresa, pinul de pe hartă, programul și telefonul direct din panoul de administrare. Modificările apar de obicei în câteva zile."
      }
    ]
  },
  {
    "slug": "cercetarea-cuvintelor-cheie",
    "title": "Cercetarea cuvintelor cheie: cum afli ce caută clienții",
    "description": "Ghid practic de cercetare a cuvintelor cheie pentru afaceri din Moldova și România: unelte, volum de căutare și intenție, ca să atragi clienți care cumpără.",
    "category": "SEO",
    "date": "2026-07-25",
    "minutes": 4,
    "intro": [
      "Poți avea cel mai bun serviciu din oraș și totuși să nu apari în Google, pentru că paginile tale folosesc alte cuvinte decât cele pe care le tastează clienții. Un atelier scrie pe site „soluții de mobilier personalizat\", dar oamenii caută „mobilă la comandă Chișinău\". Diferența pare mică. În trafic, este uriașă.",
      "În acest ghid vezi cum funcționează cercetarea cuvintelor cheie pas cu pas: de unde iei ideile, cum citești volumul de căutare, cum recunoști intenția din spatele unei căutări și cum transformi lista finală în pagini care aduc clienți, nu doar vizite."
    ],
    "sections": [
      {
        "h": "Ce este cercetarea cuvintelor cheie și de ce contează",
        "p": [
          "Cercetarea cuvintelor cheie, sau keyword research, este procesul prin care afli exact ce expresii tastează oamenii în Google când caută produse și servicii ca ale tale. Nu este o listă făcută din intuiție. Este o listă bazată pe căutări reale.",
          "Miza este simplă: fiecare pagină de pe site poate ținti o căutare concretă. Dacă țintești căutări pe care nu le face nimeni, pagina rămâne invizibilă. Dacă țintești căutările potrivite, site-ul devine un canal constant de clienți."
        ]
      },
      {
        "h": "Intenția de căutare: ce vrea de fapt omul care tastează",
        "p": [
          "Două căutări pot conține aceleași cuvinte și intenții complet diferite. „ce este un CRM\" vine de la cineva care se informează. „preț implementare CRM\" vine de la cineva aproape de cumpărare. Pagina trebuie să răspundă intenției, nu doar cuvântului.",
          "O regulă practică: paginile de servicii țintesc căutări comerciale, articolele de blog țintesc căutări informaționale. Dacă le amesteci pe aceeași pagină, Google nu înțelege ce să afișeze și de multe ori nu afișează nimic."
        ]
      },
      {
        "h": "De unde aduni primele idei de cuvinte cheie",
        "p": [
          "Nu ai nevoie de unelte scumpe ca să începi. Cele mai bune idei vin din surse pe care le ai deja la îndemână.",
          "Notează tot într-un tabel simplu: expresia, sursa și tipul de intenție. La final vei avea zeci sau sute de variante. Abia apoi are sens filtrarea."
        ],
        "list": [
          "Întrebările pe care ți le pun clienții la telefon",
          "Sugestiile Google din bara de căutare",
          "Secțiunea de căutări asociate din josul paginii de rezultate",
          "Google Search Console, dacă site-ul are deja trafic",
          "Planificatorul de cuvinte cheie din Google Ads"
        ]
      },
      {
        "h": "Volumul de căutare: cum citești cifrele corect",
        "p": [
          "Volumul de căutare arată de câte ori pe lună este căutată o expresie. Este util pentru priorități, dar are limite. Pe piețe mici, cum este Republica Moldova, multe expresii bune apar cu volum zero sau foarte mic, deși aduc clienți lună de lună.",
          "Nu elimina o expresie doar pentru că cifra pare mică. Câteva căutări pe lună pentru „contabilitate pentru SRL Chișinău\" pot valora mai mult decât un val de căutări generice fără intenție de cumpărare. Compară volumul cu intenția, nu volumele între ele."
        ]
      },
      {
        "h": "Long tail: expresii lungi, clienți mai buni",
        "p": [
          "Expresiile din trei sau mai multe cuvinte se numesc long tail. Au volum mic, concurență mică și intenție clară. „avocat\" este aproape imposibil de câștigat cu un site nou. „avocat dreptul muncii Chișinău\" este realist și aduce exact clientul potrivit.",
          "Pentru un site nou, regula sănătoasă este simplă: majoritatea paginilor țintesc expresii long tail, doar câteva atacă termeni largi. Pe măsură ce site-ul câștigă autoritate, urci treptat spre căutări mai competitive. Un exemplu din practica noastră la landings.md: pentru davo.md, munca de SEO susținută în timp a ridicat site-ul la un Ahrefs DR 50, cu 2.6K backlinkuri din 348 de domenii, iar acum poate concura și pe termeni grei."
        ]
      },
      {
        "h": "Cum transformi lista în pagini care aduc clienți",
        "p": [
          "Grupează expresiile pe teme. Toate variantele cu același sens țintesc o singură pagină, nu zece pagini aproape identice. „creare site Chișinău\" și „dezvoltare site web Chișinău\" cer aceeași pagină de serviciu.",
          "Apoi fă maparea: o temă, o pagină, un titlu clar cu expresia principală în el. După publicare, verifică periodic în Search Console ce poziții ai câștigat și unde merită conținut nou. Cercetarea cuvintelor cheie nu se face o singură dată, se repetă pe măsură ce piața și căutările se schimbă."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât durează până văd rezultate după cercetarea cuvintelor cheie?",
        "a": "Cercetarea în sine durează câteva zile pentru un site obișnuit. Rezultatele în trafic apar de regulă în câteva luni de la publicarea paginilor optimizate, în funcție de concurență și de autoritatea site-ului."
      },
      {
        "q": "Am nevoie de unelte plătite pentru keyword research?",
        "a": "Nu la început. Sugestiile Google, Search Console și Planificatorul din Google Ads acoperă nevoile unui site mic sau mediu. Uneltele plătite devin utile când vrei date detaliate despre concurență sau lucrezi pe mai multe piețe."
      },
      {
        "q": "Ce fac dacă volumul de căutare pentru nișa mea pare zero?",
        "a": "Pe piețe mici, uneltele rotunjesc volumele reduse la zero, dar căutările există. Pornește de la sugestiile Google și de la întrebările reale ale clienților, apoi publică pagini pentru acele expresii. În câteva luni, Search Console îți arată pentru ce căutări apari deja."
      }
    ]
  },
  {
    "slug": "blog-content-marketing",
    "title": "Content marketing: cum aduce blogul clienți pe termen lung",
    "description": "Ghid practic de content marketing pentru afaceri din Moldova și România: cum scrii articole SEO care aduc trafic și transformă cititorii în clienți.",
    "category": "SEO",
    "date": "2026-07-30",
    "minutes": 5,
    "intro": [
      "Un articol bun scris astăzi poate aduce clienți și peste doi ani. Aceasta este diferența dintre content marketing și publicitate: reclama se oprește când se termină bugetul, conținutul rămâne pe site și lucrează în continuare. Pentru o afacere din Chișinău sau din București, un blog bine gândit este una dintre puținele investiții de marketing care se acumulează în timp.",
      "În acest ghid vezi cum funcționează un blog pentru afaceri în practică: cum alegi subiectele, cum scrii articole SEO care se citesc ușor, cum le distribui și cum măsori rezultatele. Fără teorie abstractă, doar pași pe care îi poți aplica de mâine."
    ],
    "sections": [
      {
        "h": "Ce este content marketing și de ce funcționează",
        "p": [
          "Content marketing înseamnă să publici materiale utile care răspund la întrebările clienților înainte ca ei să fie gata să cumpere. Un service auto scrie despre cum verifici istoricul unei mașini second hand. Un contabil explică ce impozite plătește un SRL nou înființat. Cititorul primește valoare, iar afacerea primește încredere.",
          "Mecanismul este simplu. Omul caută pe Google o problemă, găsește articolul tău, îl citește și reține cine l-a ajutat. Când ajunge să aibă nevoie de serviciul respectiv, numele tău este deja pe lista scurtă."
        ]
      },
      {
        "h": "Blogul este un activ, nu o obligație",
        "p": [
          "Mulți antreprenori tratează blogul ca pe o corvoadă: publică trei articole, nu văd rezultate într-o lună și renunță. Privit corect, un blog pentru afaceri este un activ, la fel ca un utilaj sau un spațiu comercial. Fiecare articol indexat de Google este o pagină care poate aduce vizitatori în fiecare zi, fără cost suplimentar.",
          "Compară cu reclama plătită: acolo plătești fiecare click, iar când oprești campania, traficul dispare. Cele două funcționează bine împreună, dar doar conținutul rămâne al tău."
        ]
      },
      {
        "h": "Cum alegi subiectele: pornește de la întrebările clienților",
        "p": [
          "Cele mai bune subiecte nu vin din inspirație, ci din discuțiile reale cu clienții. Notează ce te întreabă oamenii la telefon, pe Instagram sau în timpul ofertării. Fiecare întrebare care se repetă este un articol.",
          "Verifică apoi dacă subiectul are căutări. Scrie termenul în Google și uită-te la sugestii și la paginile de pe prima poziție. Dacă apar articole, există cerere de informație. Dacă apar doar pagini de produs, oamenii vor probabil să cumpere direct, nu să citească."
        ],
        "list": [
          "Întrebări primite la telefon sau în mesaje",
          "Sugestiile din bara de căutare Google",
          "Obiecțiile auzite în procesul de vânzare",
          "Recenziile și comentariile din domeniul tău"
        ]
      },
      {
        "h": "Cum scrii articole SEO care chiar se citesc",
        "p": [
          "Un articol SEO bun este scris pentru om și optimizat pentru Google, în această ordine. Alege un singur subiect per articol și un cuvânt cheie principal. Pune-l în titlu, în primul paragraf și în câteva subtitluri, natural, fără repetiții forțate.",
          "Structura contează la fel de mult ca textul. Paragrafe scurte, subtitluri clare, liste acolo unde ajută. Un cititor pe telefon decide în câteva secunde dacă rămâne pe pagină, așa că răspunsul la întrebarea lui trebuie să apară devreme, nu în ultimul paragraf."
        ],
        "list": [
          "Un subiect, un cuvânt cheie principal",
          "Titlu care promite un răspuns concret",
          "Subtitluri la fiecare două sau trei paragrafe",
          "Exemple reale, nu generalități"
        ]
      },
      {
        "h": "Distribuția: articolul nu se promovează singur",
        "p": [
          "Publicarea este doar jumătate din treabă. Trimite articolul pe paginile de social media ale firmei, în newsletter dacă ai unul, și folosește-l în vânzări: un link util trimis unui client interesat valorează mai mult decât zece mesaje de follow up.",
          "Pe termen lung, autoritatea domeniului decide cât de sus urcă articolele. Backlink-urile, adică linkurile din alte site-uri către al tău, rămân unul dintre cele mai puternice semnale. Un exemplu real din practica noastră: la davo.md, munca de SEO susținută de conținut a dus domeniul la Ahrefs DR 50, cu 2.6K backlink-uri din 348 de domenii."
        ]
      },
      {
        "h": "Ritmul contează mai mult decât volumul",
        "p": [
          "Un articol bun pe lună, timp de un an, bate zece articole publicate într-o săptămână urmate de tăcere. Google apreciază constanța, iar cititorii la fel.",
          "Fă un plan simplu: alege 12 subiecte din lista de întrebări, pune-le într-un calendar și blochează o oră pe săptămână pentru scris. Un plan modest pe care îl respecți valorează mai mult decât o strategie ambițioasă abandonată în februarie."
        ]
      },
      {
        "h": "Cum măsori rezultatele și când apar",
        "p": [
          "Content marketing nu dă rezultate în prima săptămână, deci pornește cu așteptări corecte. Primele semne apar de regulă după câteva luni de publicare constantă: impresii în Google Search Console, apoi clickuri, apoi cereri de ofertă.",
          "Urmărește trei lucruri simple: pozițiile pentru cuvintele cheie alese, traficul organic pe fiecare articol și acțiunile de pe pagină, cum ar fi formularele trimise sau apelurile. Un articol care aduce trafic dar zero cereri se repară printr-un îndemn clar la acțiune și linkuri către pagina de servicii."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât durează până când un blog aduce clienți?",
        "a": "De regulă, primele rezultate vizibile în trafic apar după câteva luni de publicare constantă, în funcție de concurența din domeniu. Cererile de ofertă vin după ce articolele urcă pe prima pagină pentru căutări cu intenție comercială. Tratează blogul ca pe o investiție pe 12 luni, nu pe 30 de zile."
      },
      {
        "q": "Câte articole trebuie să public pe lună?",
        "a": "Mai important decât numărul este ritmul constant și calitatea fiecărui text. Un articol bun pe lună, documentat și util, este suficient pentru început. Crește frecvența doar dacă poți păstra același nivel."
      },
      {
        "q": "Scriu singur sau apelez la un specialist?",
        "a": "Dacă ai timp și îți cunoști bine domeniul, poți scrie singur, mai ales la început. Un specialist ajută la partea tehnică: cercetarea cuvintelor cheie, structură, optimizare și backlink-uri. Multe afaceri combină variantele: proprietarul oferă informația brută, iar specialistul o transformă în articol optimizat."
      }
    ]
  },
  {
    "slug": "lansare-magazin-online",
    "title": "Cum lansezi un magazin online: de la catalog la vânzări",
    "description": "Ghid practic de creare magazin online în Moldova: platformă, catalog, plăți, livrare și primele comenzi. Pași concreți ca să vinzi online mai repede.",
    "category": "Web",
    "date": "2026-08-04",
    "minutes": 5,
    "intro": [
      "Mulți antreprenori din Chișinău amână lansarea unui magazin online pentru că pare complicat: platformă, plăți, livrare, marketing. În realitate, procesul are pași clari, iar majoritatea greșelilor nu vin din lipsa banilor, ci din ordinea în care sunt făcute lucrurile.",
      "În acest ghid vezi drumul de la idee la primele vânzări: cum alegi platforma, cum pregătești catalogul, cum conectezi plățile și livrarea, ce pagini contează cu adevărat și de unde aduci primii clienți. Exemplele sunt gândite pentru piața din Moldova și România."
    ],
    "sections": [
      {
        "h": "Alege platforma după buget și volum",
        "p": [
          "Pentru creare magazin online ai trei drumuri: o platformă SaaS cu abonament lunar, o soluție open source precum WooCommerce sau PrestaShop, sau un magazin dezvoltat la comandă. Pentru un catalog de până la câteva sute de produse, primele două variante acoperă tot ce ai nevoie. Dezvoltarea la comandă are sens abia când ai procese pe care nicio platformă standard nu le suportă.",
          "Bugetul de start nu trebuie să fie uriaș. Ca reper, la landings.md un site pornește de la 350 EUR, iar costul unui magazin crește odată cu numărul de integrări cerute. Regula simplă: nu plăti de la început pentru funcții pe care nu le vei folosi în primul an."
        ]
      },
      {
        "h": "Pregătește catalogul înainte de design",
        "p": [
          "Cea mai frecventă întârziere la lansare nu este tehnică, ci lipsa conținutului. Dezvoltatorul termină magazinul, apoi așteaptă săptămâni după poze și descrieri. Pregătește materialele în paralel cu dezvoltarea, nu după."
        ],
        "list": [
          "Denumiri clare, cu cuvintele pe care le caută clienții",
          "Fotografii proprii, minim două pentru fiecare produs",
          "Descrieri scurte: dimensiuni, materiale, termen de livrare",
          "Prețuri finale, cu toate taxele incluse",
          "Stocuri reale, sincronizate cu depozitul"
        ]
      },
      {
        "h": "Conectează plățile și stabilește livrarea",
        "p": [
          "În Moldova, mulți clienți plătesc încă ramburs, la primirea coletului. Oferă totuși și plata cu cardul: banca sau un procesator local îți dă un modul gata de integrat, iar o comandă plătită online se anulează mai greu decât una promisă la telefon.",
          "La livrare, decide de la început zonele acoperite și tarifele. Afișează costul transportului înainte de checkout, într-un tabel simplu. Clientul vrea să știe suma totală înainte să introducă datele cardului, altfel abandonează coșul exact la final."
        ]
      },
      {
        "h": "Pagini care vând: produs, coș, checkout",
        "p": [
          "Pagina de produs face vânzarea, restul site-ului doar aduce oameni spre ea. Pune prețul, butonul de comandă și termenul de livrare vizibile fără scroll. Răspunde direct la obiecțiile frecvente: cum fac retur, ce garanție am, cum pot plăti.",
          "La checkout cere doar datele necesare livrării. Fiecare câmp în plus este un motiv de abandon. Permite comanda fără cont: contul poate fi creat după prima cumpărătură, nu înaintea ei."
        ]
      },
      {
        "h": "Adu primii vizitatori: SEO și reclame",
        "p": [
          "Un proiect de ecommerce fără trafic este doar un catalog frumos. SEO pentru un magazin online în Moldova începe cu paginile de categorie: titluri clare, descrieri unice, adrese scurte. Rezultatele apar în luni, nu în zile, deci pornește optimizarea din prima săptămână, nu după lansare.",
          "Pentru vânzări rapide, reclamele plătite sunt mai predictibile. Începe cu un buget mic pe produsele cu marjă bună, măsoară costul pe comandă și oprește ce nu funcționează. Instalează analitica înainte de prima campanie, altfel cheltui fără să știi ce aduce înapoi."
        ]
      },
      {
        "h": "Primele comenzi: măsoară și corectează",
        "p": [
          "Primele vânzări îți arată unde scârțâie procesul. Urmărește trei lucruri: de unde vin comenzile, în ce pas abandonează vizitatorii coșul și cât te costă un client nou. Trei cifre simple spun mai mult decât zece rapoarte.",
          "Sună primii clienți și întreabă cum a fost experiența, de la comandă la colet. În această etapă, feedbackul direct valorează mai mult decât orice statistică. Corectează ce apare, apoi crește bugetul de promovare treptat, nu dintr-o dată."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât durează crearea unui magazin online?",
        "a": "Un magazin pe o platformă standard, cu un catalog deja pregătit, se lansează de regulă în câteva săptămâni. Termenul se lungește cel mai des din cauza conținutului lipsă: poze, descrieri, prețuri. Pregătește catalogul în paralel cu dezvoltarea și câștigi timp."
      },
      {
        "q": "Pot vinde și în România cu un magazin din Moldova?",
        "a": "Tehnic, nimic nu te oprește: adaugi livrare prin curieri care acoperă ambele piețe și afișezi prețurile în moneda potrivită. Verifică însă condițiile fiscale și vamale pentru volumul tău. Pentru situații specifice, discută cu un contabil sau un consultant."
      },
      {
        "q": "Mai am nevoie de SEO dacă rulez deja reclame?",
        "a": "Da, pentru că reclamele se opresc odată cu bugetul, iar SEO aduce trafic constant pe termen lung. Cele două funcționează bine împreună: reclamele testează rapid ce produse și mesaje merg, iar SEO consolidează pozițiile pe cuvintele care aduc vânzări."
      }
    ]
  },
  {
    "slug": "landing-page-care-converteste",
    "title": "Landing page care convertește: structură și greșeli",
    "description": "Cum construiești un landing page care convertește: structură, mesaj și greșelile care îți scad rata de conversie. Vinzi mai mult din același trafic.",
    "category": "Web",
    "date": "2026-08-09",
    "minutes": 4,
    "intro": [
      "Plătești reclame, oamenii intră pe pagină, se uită câteva secunde și pleacă. Fără mesaj, fără apel, fără comandă. De cele mai multe ori problema nu este traficul, ci pagina pe care ajunge acel trafic. Un landing page bine construit transformă aceiași vizitatori în cereri reale de ofertă.",
      "În acest articol vezi cum arată structura unei pagini de vânzare care funcționează, cum formulezi mesajul ca să fie citit până la capăt și care sunt greșelile care îți scad rata de conversie fără să îți dai seama. Totul aplicat, cu exemple pentru afaceri din Moldova și România."
    ],
    "sections": [
      {
        "h": "Un landing page are un singur scop",
        "p": [
          "Un site de prezentare vorbește despre tot: istoric, echipă, servicii, blog. Un landing page face un singur lucru: convinge vizitatorul să facă o acțiune, de obicei să lase o cerere de ofertă sau să sune. Această diferență schimbă tot felul în care construiești pagina.",
          "Exemplu simplu: o firmă de termopane din Chișinău rulează reclame pe Google. Dacă trimite oamenii pe pagina principală, vizitatorul trebuie să caute singur informația. Dacă îi trimite pe o pagină dedicată ferestrelor, cu prețuri orientative și formular pentru măsurare gratuită, decizia devine ușoară."
        ]
      },
      {
        "h": "Structura care ține vizitatorul pe pagină",
        "p": [
          "O pagină de vânzare bună se citește de sus în jos ca un argument. Fiecare secțiune răspunde la o întrebare pe care vizitatorul o are exact în acel moment. Ordinea contează mai mult decât designul.",
          "Nu trebuie să inventezi nimic. Ia întrebările pe care ți le pun clienții la telefon și răspunde la ele pe pagină, în ordinea în care apar."
        ],
        "list": [
          "Titlu cu beneficiul principal, nu cu numele firmei",
          "Subtitlu care explică pentru cine este oferta",
          "3-5 beneficii concrete, nu caracteristici tehnice",
          "Dovadă socială: recenzii și poze din proiecte reale",
          "Oferta clară, cu preț sau interval de preț",
          "Buton de acțiune repetat după fiecare secțiune importantă"
        ]
      },
      {
        "h": "Mesajul: scrie despre client, nu despre firmă",
        "p": [
          "Cele mai slabe pagini încep cu fraze despre firmă: experiență, pasiune, echipă dedicată. Vizitatorul nu caută o firmă, caută o rezolvare. Primul ecran trebuie să spună ce primește el, în cât timp și cu ce garanție.",
          "Compară două titluri. Suntem lideri în ferestre PVC sună gol. Ferestre montate în 5 zile, cu garanție 10 ani, spune exact ce contează. Folosește cuvintele clienților, nu limbajul intern al industriei."
        ]
      },
      {
        "h": "Dovada: motivul pentru care te-ar crede cineva",
        "p": [
          "Orice promisiune de pe pagină ridică o întrebare tăcută: de unde știu că este adevărat. Aici intră recenziile din Google, pozele din lucrări reale, numele clienților care acceptă să fie menționați. Dovada reală bate orice text de marketing.",
          "Regula de aur: nu inventa nimic. O recenzie reală, cu nume și detalii, convinge mai mult decât zece fraze generice despre calitate. Dacă abia ai lansat afacerea, oferă o garanție puternică în locul recenziilor."
        ]
      },
      {
        "h": "Oferta și formularul: unde se decid vânzările",
        "p": [
          "Multe pagini pierd clientul chiar la final. Oferta este vagă, prețul lipsește complet, iar formularul cere șapte câmpuri. Fiecare câmp în plus este un motiv de abandon.",
          "Cere doar ce îți trebuie ca să suni înapoi: nume și telefon, eventual localitatea. Pentru piața din Moldova, adaugă și un buton de WhatsApp sau Viber, mulți clienți preferă să scrie decât să completeze formulare."
        ]
      },
      {
        "h": "Greșeli care îți scad rata de conversie",
        "p": [
          "Cele mai multe pagini nu eșuează dintr-un motiv spectaculos, ci din câteva greșeli banale care se adună.",
          "Verifică pagina de pe propriul telefon, pe date mobile, nu pe wifi de birou. Dacă se încarcă greu sau butonul nu se vede, repari întâi asta, apoi restul."
        ],
        "list": [
          "Meniu complet care duce vizitatorul în alte pagini",
          "Titlu vag, de tip Bine ați venit",
          "Pagina se încarcă greu pe telefon",
          "Niciun preț și niciun reper de preț",
          "Butonul de acțiune apare o singură dată, la final",
          "Textul vorbește despre firmă, nu despre client"
        ]
      },
      {
        "h": "Măsoară și îmbunătățește pas cu pas",
        "p": [
          "Rata de conversie este procentul de vizitatori care fac acțiunea dorită pe pagină. Nu o compara cu cifre de pe internet, compară pagina ta de azi cu pagina ta de luna trecută. Instalează un sistem simplu de analiză și urmărește cererile primite, nu doar vizitele.",
          "Schimbă un singur element o dată: titlul, oferta sau formularul. Dacă schimbi tot deodată, nu mai știi ce a funcționat. Îmbunătățirile mici, făcute constant, aduc în timp mai multe vânzări din același buget de reclamă."
        ]
      }
    ],
    "faq": [
      {
        "q": "Prin ce diferă un landing page de un site de prezentare?",
        "a": "Site-ul de prezentare acoperă toată activitatea firmei și are multe pagini și linkuri. Landing page-ul are un singur scop și o singură acțiune, de obicei o cerere de ofertă. De aceea funcționează mai bine pentru reclame plătite."
      },
      {
        "q": "Ce rată de conversie este considerată bună?",
        "a": "Nu există un prag universal, cifra depinde de domeniu, de preț și de sursa traficului. Mai util este să îți măsori propria rată lună de lună și să o crești prin teste. O pagină care aduce constant cereri profitabile este o pagină bună."
      },
      {
        "q": "Cât costă un landing page profesionist?",
        "a": "Depinde de complexitate, de texte și de integrări. Ca reper, la landings.md un site pornește de la 350 EUR, deci o pagină de vânzare rămâne o investiție accesibilă pentru o afacere mică. Important este ca pagina să își recupereze costul din primele vânzări."
      }
    ]
  },
  {
    "slug": "date-structurate-schema",
    "title": "Date structurate și schema.org: cum te înțelege Google",
    "description": "Ghid practic de date structurate și schema.org: ce markup JSON-LD adaugi pe site și cum obții rich results care aduc mai multe clickuri din Google.",
    "category": "SEO",
    "date": "2026-08-13",
    "minutes": 5,
    "intro": [
      "Google citește site-ul tău ca pe un text obișnuit. Vede cuvinte și linkuri, dar nu știe sigur dacă pagina descrie un produs, o firmă sau un articol de blog. Datele structurate rezolvă exact această problemă: îi spui motorului de căutare, într-un format pe care îl înțelege garantat, cine ești, ce vinzi și cât costă.",
      "În acest ghid vezi ce sunt datele structurate, cum funcționează vocabularul schema.org și formatul JSON-LD, ce tipuri de markup merită implementate pentru o afacere din Moldova sau România și cum verifici că totul funcționează. Fără teorie inutilă, doar pași concreți pe care îi poți aplica pe site-ul tău."
    ],
    "sections": [
      {
        "h": "Ce sunt datele structurate și de ce contează",
        "p": [
          "Datele structurate sunt un fragment de cod adăugat în pagină care descrie conținutul într-un format standardizat. Vizitatorii nu îl văd niciodată. Îl citesc doar motoarele de căutare, care îl folosesc ca să înțeleagă exact despre ce este pagina.",
          "Beneficiul vizibil sunt rich results: rezultate îmbogățite în Google cu stele de rating, prețuri, întrebări frecvente sau imagini. Un astfel de rezultat ocupă mai mult spațiu pe ecran și iese în evidență față de un link simplu. Pentru aceeași poziție în pagina de rezultate, primești mai multă atenție."
        ]
      },
      {
        "h": "Schema.org, vocabularul comun al motoarelor de căutare",
        "p": [
          "Schema.org este un vocabular creat în comun de marile motoare de căutare, ca să existe un singur standard de descriere a conținutului. Conține sute de tipuri: Organization, LocalBusiness, Product, Article, Event și multe altele. Fiecare tip are proprietăți proprii, de exemplu un produs are preț, valută și disponibilitate.",
          "Regula de bază e simplă: alegi tipul care descrie cel mai precis pagina. O pagină de contact primește markup de Organization sau LocalBusiness, o fișă de produs primește Product, un articol de blog primește Article. Nu inventezi date, doar traduci în format standard ceea ce există deja pe pagină."
        ]
      },
      {
        "h": "JSON-LD, formatul recomandat de Google",
        "p": [
          "Există trei moduri de a adăuga date structurate: Microdata, RDFa și JSON-LD. Google recomandă JSON-LD și are motive bune. Este un simplu bloc de script pe care îl pui în codul paginii, separat de HTML-ul vizibil, deci nu afectează designul și e ușor de modificat.",
          "Un bloc JSON-LD conține trei elemente cheie: contextul, adică schema.org, tipul, de exemplu LocalBusiness, și proprietățile, cum ar fi numele firmei, adresa și programul. Un dezvoltator îl scrie în câteva minute, iar pluginurile SEO din WordPress îl generează automat pentru paginile standard."
        ]
      },
      {
        "h": "Ce tipuri de markup au sens pentru afacerea ta",
        "p": [
          "Nu ai nevoie de tot vocabularul schema.org. Pentru majoritatea afacerilor mici și medii, câteva tipuri acoperă tot ce contează.",
          "Dacă ai recenzii reale de la clienți, AggregateRating poate afișa stele în rezultate. Atenție însă: Google are reguli stricte aici și ignoră stelele fabricate sau autoacordate pe propria firmă."
        ],
        "list": [
          "LocalBusiness: adresă, program și telefon, ideal pentru un salon, un service sau un cabinet din Chișinău",
          "Product cu Offer: preț, valută și stoc pentru fiecare fișă de produs din magazinul online",
          "FAQPage: întrebările frecvente pot apărea direct sub rezultatul tău din Google",
          "Article: autor și dată de publicare pentru articolele de blog",
          "BreadcrumbList: traseul de navigare, afișat în locul unui URL lung"
        ]
      },
      {
        "h": "Implementarea pas cu pas",
        "p": [
          "Procesul este același indiferent de platformă. Diferă doar unealta cu care generezi codul.",
          "Pe WordPress, pluginurile SEO populare generează automat markup de bază pentru articole și pagini. Pentru un magazin online sau o firmă cu mai multe locații, merită un markup scris manual, adaptat la datele reale ale afacerii."
        ],
        "list": [
          "Alege paginile importante: prima pagină, fișele de produs, articolele de blog",
          "Stabilește tipul schema.org potrivit pentru fiecare",
          "Generează blocul JSON-LD manual, cu un generator online sau cu un plugin SEO",
          "Adaugă scriptul în secțiunea head a paginii",
          "Testează fiecare pagină înainte de publicare"
        ]
      },
      {
        "h": "Cum verifici că Google te înțelege",
        "p": [
          "Google oferă gratuit Rich Results Test: introduci adresa paginii și vezi pentru ce tipuri de rezultate îmbogățite este eligibilă și ce erori există. Pentru validarea generală a sintaxei există Schema Markup Validator, întreținut de comunitatea schema.org.",
          "După implementare, urmărește rapoartele din Google Search Console. Acolo vezi câte pagini au markup valid, care au avertismente și cum evoluează afișările în timp. Important: markupul corect face pagina eligibilă pentru rich results, dar Google decide singur dacă și când le afișează."
        ]
      },
      {
        "h": "Greșeli care anulează tot efortul",
        "p": [
          "Cea mai gravă greșeală este markupul care minte: descrii în cod un rating sau un preț care nu există pe pagină. Google tratează asta ca spam și poate ajunge să ignore complet datele structurate ale site-ului.",
          "Datele structurate nu sunt un truc de ranking, sunt un canal de comunicare cu Google. Folosite corect, îți fac rezultatele mai vizibile și aduc clickuri în plus, fără să schimbi nimic din designul site-ului."
        ],
        "list": [
          "Date contradictorii: alt preț în markup decât pe pagină",
          "JSON-LD copiat de pe alt site, cu numele și adresa vechiului proprietar",
          "Stele de rating autoacordate, fără recenzii reale",
          "Markup adăugat pe pagini subțiri, fără conținutul promis în cod"
        ]
      }
    ],
    "faq": [
      {
        "q": "Datele structurate îmbunătățesc direct pozițiile în Google?",
        "a": "Nu direct. Ele ajută Google să înțeleagă pagina și o fac eligibilă pentru rich results, care cresc rata de click. Mai multe clickuri și un conținut bine înțeles ajută indirect întreaga strategie SEO."
      },
      {
        "q": "Am nevoie de programator ca să adaug JSON-LD?",
        "a": "Nu neapărat. Pe WordPress, pluginurile SEO generează automat markup de bază pentru articole și pagini. Pentru tipuri mai complexe, cum ar fi Product sau LocalBusiness cu mai multe locații, ajutorul unui specialist scutește timp și erori."
      },
      {
        "q": "În cât timp apar rich results după implementare?",
        "a": "După ce Google reindexează paginile, de regulă de la câteva zile la câteva săptămâni. Afișarea nu este garantată nici cu markup perfect, decizia finală aparține Google. Urmărește evoluția în raportul de îmbunătățiri din Search Console."
      }
    ]
  },
  {
    "slug": "greseli-seo-frecvente",
    "title": "Greșeli SEO frecvente care îți blochează site-ul",
    "description": "Cele mai frecvente greșeli SEO care îți țin site-ul pe loc: conținut duplicat, viteză, linkuri. Afli cum le repari pas cu pas și urci în Google.",
    "category": "SEO",
    "date": "2026-08-18",
    "minutes": 5,
    "intro": [
      "Publici articole, site-ul arată bine, dar pozițiile în Google nu se mișcă. De cele mai multe ori nu e vorba de o penalizare Google, ci de câteva greșeli banale care se adună și trag totul în jos: pagini duplicate, titluri identice, un site lent, linkuri sparte.",
      "În acest articol trecem prin cele mai frecvente greșeli SEO pe care le vedem pe site-urile firmelor din Moldova și România, de la conținut duplicat până la backlinkuri toxice. Pentru fiecare primești și soluția: ce verifici, cu ce unelte gratuite și în ce ordine repari."
    ],
    "sections": [
      {
        "h": "Conținut duplicat: aceeași pagină, mai multe adrese",
        "p": [
          "Conținutul duplicat apare rar din rea intenție. De obicei e o problemă tehnică: aceeași pagină se încarcă și cu www și fără, și pe http și pe https, cu și fără bară la final. Pentru Google, fiecare variantă e o pagină separată, iar semnalele se împart între ele.",
          "Repari simplu: alegi o singură versiune oficială, pui redirecționări 301 de pe toate celelalte și adaugi tag-ul canonical pe fiecare pagină. La magazinele online, paginile de filtre trebuie să trimită prin canonical spre categoria de bază."
        ],
        "list": [
          "Versiunea cu www și cea fără, active în paralel",
          "http și https servite simultan",
          "Parametri de filtrare indexați la magazine online",
          "Descrieri de produs copiate de la furnizor",
          "Subdomenii de test lăsate indexabile"
        ]
      },
      {
        "h": "Titluri și meta descrieri identice pe tot site-ul",
        "p": [
          "Title tag-ul rămâne unul dintre cele mai puternice semnale on-page. Totuși, multe site-uri de firme din Chișinău sau București au același titlu pe toate paginile: numele companiei și atât. Google nu are de unde să știe care pagină răspunde la ce căutare.",
          "Scrie pentru fiecare pagină importantă un titlu unic, cu serviciul și orașul unde are sens, de exemplu: Reparații frigidere la domiciliu în Chișinău. Meta descrierea nu influențează direct poziția, dar decide dacă omul dă click pe tine sau pe rezultatul de sub tine."
        ]
      },
      {
        "h": "Site lent, mai ales pe telefon",
        "p": [
          "O mare parte din vizitatori vin de pe telefon, adesea pe conexiuni mobile modeste. Dacă pagina se încarcă greu, oamenii pleacă înainte să vadă oferta, iar Google înregistrează exact acest comportament prin Core Web Vitals.",
          "Testează site-ul cu PageSpeed Insights și rezolvă întâi ce e mare: imagini necomprimate, scripturi care blochează încărcarea, hosting slab. Convertirea imaginilor în WebP și încărcarea lor întârziată rezolvă des jumătate din problemă."
        ]
      },
      {
        "h": "Linkuri interne haotice și pagini 404",
        "p": [
          "Google descoperă paginile prin linkuri. Dacă o pagină de serviciu nu primește niciun link intern, stă izolată și se indexează greu, oricât de bun ar fi textul din ea.",
          "Regula practică: orice pagină importantă trebuie să fie accesibilă în maximum trei clickuri din homepage. Leagă articolele de blog de paginile de servicii pe care le susțin, repară sau redirecționează linkurile sparte și verifică lunar raportul de indexare din Search Console."
        ]
      },
      {
        "h": "Backlinkuri toxice și penalizarea Google",
        "p": [
          "Penalizarea Google manuală e mai rară decât se crede, dar există: vine de la scheme de linkuri, texte generate în masă fără valoare sau tehnici de mascare a conținutului. Sute de linkuri din directoare spam nu te ajută, în cel mai bun caz sunt ignorate.",
          "Contează sursa și contextul, nu volumul brut. Un exemplu concret: campania SEO făcută de landings.md pentru davo.md a ajuns la Ahrefs DR 50, cu 2.6K backlinkuri din 348 de domenii de referință, construite treptat, din surse relevante. Ritmul natural și diversitatea domeniilor cântăresc mai mult decât orice vârf brusc.",
          "Dacă ai primit o acțiune manuală, o vezi în Search Console. Elimină sau dezavuează linkurile problematice, apoi trimite o cerere de reexaminare cu explicații oneste."
        ]
      },
      {
        "h": "SEO fără date și fără răbdare",
        "p": [
          "Multe decizii se iau după impresii: mi se pare că nu merge, hai să schimbăm tot. Search Console e gratuit și îți arată exact pe ce cuvinte apari, ce pagini sunt indexate și dacă există acțiuni manuale.",
          "Instalează Search Console și un sistem de analiză a traficului din prima zi. Apoi dă timp: modificările tehnice se văd în câteva săptămâni, autoritatea se construiește în luni. Să schimbi strategia la fiecare trei săptămâni e, în sine, una dintre cele mai costisitoare greșeli SEO."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cum verific dacă site-ul meu are o penalizare Google?",
        "a": "Intră în Search Console, la secțiunea Acțiuni manuale: dacă e goală, nu ai o penalizare clasică. Cele mai multe scăderi vin de la actualizări de algoritm sau probleme tehnice, nu de la penalizări. Compară data scăderii cu actualizările anunțate de Google înainte să tragi concluzii."
      },
      {
        "q": "Conținutul duplicat îmi poate afecta tot site-ul?",
        "a": "De regulă Google nu penalizează, ci alege singur o versiune și le ignoră pe celelalte, iar semnalele se diluează. Problema devine serioasă la magazinele cu sute de produse cu descrieri copiate de la furnizor. Rezolvi cu redirecționări 301, tag-uri canonical și descrieri scrise de tine."
      },
      {
        "q": "În cât timp se văd rezultatele după ce repar greșelile?",
        "a": "Corecțiile tehnice, cum ar fi redirecționările sau viteza, se reflectă de obicei în câteva săptămâni, după ce Google recitește paginile. Conținutul nou și backlinkurile au nevoie de mai multe luni ca să producă efect. Urmărește evoluția în Search Console și judecă pe perioade de minim trei luni."
      }
    ]
  },
  {
    "slug": "seo-tehnic-indexare",
    "title": "SEO tehnic: ghid de indexare, sitemap XML și robots.txt",
    "description": "Ghid practic de SEO tehnic: cum verifici indexarea în Google, cum configurezi sitemap XML și robots.txt, ca site-ul tău să apară corect în căutări.",
    "category": "SEO",
    "date": "2026-08-23",
    "minutes": 5,
    "intro": [
      "Poți avea cel mai bun produs și cel mai frumos site, dar dacă Google nu îl poate citi și indexa, pentru clienții care caută online nu exiști. SEO tehnic este fundația nevăzută a oricărei strategii de promovare: partea care decide dacă paginile tale ajung sau nu în rezultatele căutării.",
      "În acest ghid vezi cum funcționează indexarea în Google, la ce folosesc sitemap XML și robots.txt, ce verifici în Google Search Console și care sunt erorile care blochează cel mai des site-urile din Moldova și România. Totul explicat pe înțelesul unui antreprenor, nu al unui programator."
    ],
    "sections": [
      {
        "h": "Ce înseamnă SEO tehnic, pe scurt",
        "p": [
          "SEO are trei piloni: conținutul, autoritatea dată de linkuri și partea tehnică. SEO tehnic acoperă tot ce ajută motoarele de căutare să acceseze, să înțeleagă și să indexeze site-ul: structura, viteza, sitemap-ul, robots.txt, tagurile canonice și securitatea conexiunii.",
          "Gândește-te la el ca la fundația unei case. Nu o vede nimeni, dar dacă e strâmbă, tot ce construiești deasupra se clatină. Poți scrie cele mai bune texte, degeaba, dacă Google nu le poate citi."
        ]
      },
      {
        "h": "Cum funcționează indexarea în Google",
        "p": [
          "Procesul are trei etape. Googlebot descoperă paginile prin linkuri și sitemap (crawling), le analizează și le salvează în indexul său (indexare), apoi le ordonează în rezultate (ranking). Dacă o pagină nu trece de primele două etape, nu are cum să apară în căutări, indiferent cât de bună este.",
          "Verificarea de bază este simplă. Scrie în Google site:domeniul-tau.md și vezi ce pagini apar. Pentru detalii exacte, deschide raportul Pages din Google Search Console: acolo vezi ce este indexat, ce este exclus și din ce motiv."
        ]
      },
      {
        "h": "Sitemap XML: harta site-ului pentru Google",
        "p": [
          "Sitemap-ul XML este un fișier care listează paginile importante ale site-ului, de obicei la adresa domeniul-tau.md/sitemap.xml. El nu garantează indexarea, dar ajută Google să descopere rapid paginile noi și modificările, mai ales pe site-urile mari sau pe cele cu puține linkuri interne.",
          "Majoritatea platformelor moderne, de la WordPress la soluții custom, generează sitemap-ul automat. Treaba ta este să verifici că există și să îl trimiți o singură dată în Google Search Console, la secțiunea Sitemaps."
        ],
        "list": [
          "Include doar pagini indexabile, cu răspuns 200",
          "Exclude paginile de coș, login și filtrele de căutare",
          "Actualizează-l automat la fiecare pagină nouă",
          "Ține-l sub 50.000 de adrese per fișier",
          "Trimite-l în Search Console și urmărește statusul"
        ]
      },
      {
        "h": "Robots.txt: ce blochezi și ce lași liber",
        "p": [
          "Robots.txt este un fișier text simplu, aflat la domeniul-tau.md/robots.txt, care spune crawlerelor ce zone ale site-ului pot accesa. Se folosește pentru a bloca secțiuni fără valoare în căutări: pagini de administrare, rezultate interne de căutare, versiuni de test.",
          "Atenție la o capcană clasică: linia Disallow: / blochează tot site-ul. Apare des pe site-uri lansate recent, rămasă din perioada de dezvoltare. Și o nuanță importantă: robots.txt oprește accesul, nu indexarea. Dacă vrei ca o pagină să dispară din Google, folosește tagul noindex, nu robots.txt."
        ]
      },
      {
        "h": "Restul fundației: HTTPS, viteză și versiunea mobilă",
        "p": [
          "Indexarea curată nu ajunge dacă restul fundației scârțâie. Google evaluează site-ul în primul rând în versiunea mobilă, deci tot conținutul trebuie să fie vizibil și pe telefon. Certificatul HTTPS este obligatoriu: fără el, browserele afișează avertismente care sperie clienții.",
          "Viteza contează dublu: pentru poziții și pentru vânzări. Un site care se încarcă greu pierde vizitatori înainte ca ei să vadă oferta. Testează paginile principale cu PageSpeed Insights și rezolvă întâi imaginile mari și scripturile inutile."
        ]
      },
      {
        "h": "Erori frecvente de indexare și cum le repari",
        "p": [
          "În audituri apar aceleași probleme iar și iar, indiferent că site-ul este din Chișinău sau din Cluj. Vestea bună: majoritatea se repară în câteva ore, nu în luni.",
          "Ordinea de lucru: deschide raportul Pages din Search Console, ia pe rând motivele de excludere și rezolvă-le de la cel mai frecvent la cel mai rar. După fiecare corecție, cere reindexarea paginii cu Request Indexing."
        ],
        "list": [
          "Tag noindex uitat pe pagini importante",
          "Robots.txt care blochează CSS, imagini sau tot site-ul",
          "Pagini duplicate fără tag canonic",
          "Linkuri interne către pagini 404",
          "Redirecturi în lanț care obosesc crawlerul"
        ]
      },
      {
        "h": "Când merită să chemi un specialist",
        "p": [
          "Multe verificări le poți face singur, cu Search Console și puțină răbdare. Dacă site-ul are însă sute de pagini, un magazin online sau migrări în istoric, un audit tehnic făcut de cineva cu experiență economisește luni de căutări oarbe.",
          "Fundația tehnică amplifică restul muncii de SEO. La davo.md, un proiect la care lucrăm în studioul nostru din Chișinău, autoritatea a ajuns la DR 50 în Ahrefs, dar niciun backlink nu ar fi contat dacă paginile nu erau corect indexate. Întâi fundația, apoi promovarea."
        ]
      }
    ],
    "faq": [
      {
        "q": "Cât durează până Google indexează un site nou?",
        "a": "De la câteva zile la câteva săptămâni, în funcție de cât de ușor descoperă Google paginile. Trimiterea sitemap-ului XML în Search Console și câteva linkuri din surse externe accelerează procesul. Poți cere manual indexarea paginilor importante, direct din Search Console."
      },
      {
        "q": "Site-ul meu apare pe Google, mai am nevoie de SEO tehnic?",
        "a": "Da, pentru că indexarea parțială este o problemă frecventă: site-ul apare, dar o parte din pagini lipsesc din index. Verifică raportul Pages din Search Console măcar o dată pe lună. Prevenirea costă mult mai puțin decât recuperarea pozițiilor pierdute."
      },
      {
        "q": "Pot face SEO tehnic fără programator?",
        "a": "Verificările de bază, da: sitemap, robots.txt, raportul de indexare, viteza. Pentru corecții care țin de cod, cum ar fi redirecturile sau tagurile canonice, ai nevoie de acces tehnic sau de cineva care lucrează constant cu site-ul. Un audit tehnic o dată pe an este un punct de plecare bun."
      }
    ]
  },
  {
    "slug": "cat-dureaza-seo",
    "title": "Cât durează SEO: rezultate realiste, lună cu lună",
    "description": "Cât durează SEO până apar rezultate reale? Un calendar lună cu lună, cu semnale de progres și greșeli de evitat, ca să investești cu așteptări corecte.",
    "category": "SEO",
    "date": "2026-08-28",
    "minutes": 5,
    "intro": [
      "Cât durează SEO până vezi clienți noi? Întrebarea apare în aproape fiecare discuție cu proprietarii de afaceri din Moldova și România. Răspunsul scurt: primele semnale apar de regulă după 3 sau 4 luni, iar rezultatele care se simt în vânzări vin între lunile 6 și 12. Răspunsul lung depinde de site, de concurență și de cât de constant se lucrează.",
      "În acest articol parcurgem un calendar realist, lună cu lună. Vei ști ce se întâmplă în fiecare etapă, ce semnale arată că strategia funcționează și când e momentul să pui întrebări echipei cu care lucrezi."
    ],
    "sections": [
      {
        "h": "De ce SEO nu dă rezultate peste noapte",
        "p": [
          "Google nu clasează un site imediat după ce l-ai optimizat. Motorul de căutare trebuie să acceseze paginile, să le indexeze și să le compare cu cele ale concurenților care lucrează la SEO de ani de zile. Acest proces de acumulare a încrederii cere timp, indiferent de buget.",
          "Există și o parte bună. Tocmai pentru că rezultatele vin greu, ele dispar la fel de greu. O poziție câștigată corect în Google aduce clienți luni sau ani la rând, spre deosebire de reclame, care se opresc odată cu bugetul."
        ]
      },
      {
        "h": "Lunile 1 și 2: fundația tehnică și cercetarea",
        "p": [
          "Primele două luni nu aduc trafic nou, și asta e normal. E perioada în care se repară site-ul și se construiește planul. Fără această etapă, orice conținut publicat mai târziu stă pe o fundație instabilă.",
          "Semnalul bun în această etapă: Google indexează paginile corectate, iar erorile din Search Console scad de la o săptămână la alta."
        ],
        "list": [
          "audit tehnic și corectarea erorilor de indexare",
          "cercetarea cuvintelor cheie și a intenției de căutare",
          "structura site-ului și a paginilor importante",
          "optimizarea titlurilor, descrierilor și textelor existente",
          "configurarea Search Console și a raportării"
        ]
      },
      {
        "h": "Lunile 3 și 4: primele semnale în date",
        "p": [
          "Acum apar primele mișcări reale. Afișările în Google cresc, site-ul intră în top 20 sau top 50 pentru tot mai multe căutări, iar cuvintele cheie lungi și specifice ajung deja în top 10. Traficul rămâne modest, dar direcția devine vizibilă.",
          "Aici renunță multe afaceri, exact înainte ca munca să înceapă să plătească. Dacă afișările și pozițiile cresc constant, strategia funcționează. Traficul urmează pozițiile, nu invers."
        ]
      },
      {
        "h": "Lunile 5 și 6: trafic care se simte în vânzări",
        "p": [
          "Între lunile 5 și 6, cuvintele cheie principale se apropie de prima pagină, iar traficul organic devine o sursă constantă de vizite. Apar primele cereri de ofertă venite din Google, nu doar din recomandări. Într-o nișă locală, de exemplu un service auto sau un cabinet stomatologic din Chișinău, acest prag vine de regulă mai repede decât într-o piață națională aglomerată.",
          "Tot acum merită revizuit planul inițial. Datele din primele luni arată ce pagini aduc clienți reali, iar efortul se mută spre ce funcționează."
        ]
      },
      {
        "h": "După luna 6: efectul compus al SEO pe termen lung",
        "p": [
          "SEO pe termen lung funcționează ca o dobândă compusă. Fiecare articol publicat și fiecare backlink câștigat se adaugă peste cele vechi, iar site-ul urcă tot mai ușor pentru cuvinte tot mai competitive. După luna 6, creșterea devine de obicei mai rapidă decât la început, pentru că autoritatea acumulată lucrează în favoarea ta.",
          "Autoritatea se construiește exact așa, în timp. În proiectul SEO pentru davo.md, profilul de linkuri a ajuns la Ahrefs DR 50, cu 2.6K backlinkuri din 348 de domenii de referință. Un asemenea profil nu apare într-o lună, ci prin muncă lunară, susținută."
        ]
      },
      {
        "h": "Ce accelerează și ce încetinește rezultatele",
        "p": [
          "Termenele de mai sus sunt repere, nu garanții. Două site-uri cu același buget pot avansa foarte diferit, în funcție de punctul de plecare și de piață.",
          "Regula practică: cu cât concurența e mai puternică, cu atât contează mai mult consistența. Un site care publică și câștigă linkuri în fiecare lună depășește în timp unul care lucrează în salturi."
        ],
        "list": [
          "vechimea și istoricul domeniului",
          "nivelul concurenței din nișă",
          "starea tehnică a site-ului la start",
          "ritmul de publicare a conținutului",
          "calitatea backlinkurilor câștigate"
        ]
      }
    ],
    "faq": [
      {
        "q": "Pot vedea rezultate SEO în prima lună?",
        "a": "Rareori. Dacă site-ul avea probleme tehnice grave, corectarea lor poate aduce o creștere rapidă, dar e o excepție. Prima lună pune fundația, iar semnalele reale apar de regulă din luna a treia."
      },
      {
        "q": "Cât durează SEO pentru un site complet nou?",
        "a": "Mai mult decât pentru un site cu istoric, pentru că domeniul pornește fără conținut indexat și fără backlinkuri. Un interval realist pentru primele rezultate vizibile este de 6 până la 9 luni. Vestea bună: cuvintele cheie locale, mai puțin competitive, pot urca mai repede."
      },
      {
        "q": "Ce se întâmplă dacă opresc SEO după primele rezultate?",
        "a": "Pozițiile câștigate rezistă o perioadă, pentru că autoritatea acumulată nu dispare peste noapte. Totuși, concurenții continuă să publice și să câștige linkuri, iar în câteva luni site-ul începe să coboare. De aceea SEO se tratează ca un proces continuu, nu ca un proiect cu final."
      }
    ]
  }
];
