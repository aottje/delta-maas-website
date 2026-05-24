"use client";

import { useEffect, useState } from "react";

type Woning = {
  titel: string;
  locatie: string;
  prijs: string;
  details: string;
  rendement: string;
  img: string;
  tekst: string;
};

const woningen: Woning[] = [
  {
    titel: "Wilhelminapier 325",
    locatie: "Rotterdam",
    prijs: "€ 625.000 k.k.",
    details: "120 m² · 3 kamers · 2e verdieping",
    rendement: "4,8% indicatief",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    tekst: "Modern appartement op een toplocatie aan de Maas, geschikt voor eigen bewoning of verhuurstrategie.",
  },
  {
    titel: "Maaskade 88B",
    locatie: "Rotterdam",
    prijs: "€ 475.000 k.k.",
    details: "95 m² · 3 kamers · 4e verdieping",
    rendement: "5,1% indicatief",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    tekst: "Licht en ruim appartement met sterke verhuurbaarheid en een representatieve afwerking.",
  },
  {
    titel: "Boompjes 215",
    locatie: "Rotterdam",
    prijs: "€ 550.000 k.k.",
    details: "110 m² · 4 kamers · 6e verdieping",
    rendement: "4,6% indicatief",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    tekst: "Representatief object met uitzicht op de skyline en uitstekende bereikbaarheid.",
  },
  {
    titel: "Wijnhaven 45D",
    locatie: "Rotterdam",
    prijs: "€ 395.000 k.k.",
    details: "85 m² · 2 kamers · 3e verdieping",
    rendement: "5,3% indicatief",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    tekst: "Compact en hoogwaardig appartement in een populair gebied voor expats en jonge professionals.",
  },
  {
    titel: "Parklaan Residence",
    locatie: "Rotterdam",
    prijs: "€ 795.000 k.k.",
    details: "145 m² · 4 kamers · parkeerplaats",
    rendement: "Premium segment",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    tekst: "Luxe woonobject met hoogwaardige uitstraling en langetermijnwaarde.",
  },
  {
    titel: "Kralingen Beleggingspand",
    locatie: "Rotterdam",
    prijs: "€ 1.250.000 k.k.",
    details: "4 units · volledig verhuurd · rendement",
    rendement: "5,7% indicatief",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    tekst: "Volledig verhuurd beleggingspand met stabiele cashflow in een gewilde wijk.",
  },
  {
    titel: "Lloydpier Loft",
    locatie: "Rotterdam",
    prijs: "€ 685.000 k.k.",
    details: "132 m² · 3 kamers · waterzicht",
    rendement: "4,9% indicatief",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    tekst: "Ruime loft met waterzicht en moderne industriële uitstraling.",
  },
  {
    titel: "Off-market Portefeuille",
    locatie: "Zuid-Holland",
    prijs: "Op aanvraag",
    details: "12 woningen · discreet · investeerders",
    rendement: "Op aanvraag",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    tekst: "Discrete portefeuille voor serieuze investeerders. Documentatie beschikbaar na kennismaking.",
  },
];

export default function Home() {
  const [pagina, setPagina] = useState<"home" | "aanbod">("home");
  const [selectedWoning, setSelectedWoning] = useState<Woning | null>(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pagina !== "home" || !pendingScroll) return;

    const timer = window.setTimeout(() => {
      if (pendingScroll === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const section = document.getElementById(pendingScroll);
        if (section) {
          const offset = 125;
          const top = section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
      setPendingScroll(null);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pagina, pendingScroll]);

  const goHome = () => {
    setMobileOpen(false);
    setSelectedWoning(null);
    setPendingScroll("top");
    setPagina("home");
  };

  const goSection = (id: string) => {
    setMobileOpen(false);
    setSelectedWoning(null);
    setPendingScroll(id);
    setPagina("home");
  };

  const goAanbod = () => {
    setMobileOpen(false);
    setSelectedWoning(null);
    setPagina("aanbod");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const openContactForWoning = () => {
    setSelectedWoning(null);
    setPendingScroll("contact");
    setPagina("home");
  };

  const Header = () => {
    const isWhite = scrolled || pagina !== "home" || mobileOpen;

    return (
      <header className={`fixed left-0 top-0 z-[9999] w-full transition ${isWhite ? "bg-white shadow-lg" : "bg-transparent"}`}>
        <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between px-5 py-4 md:px-8 lg:px-14 2xl:px-20">
          <button type="button" onClick={goHome} className="relative z-[10001] flex h-[82px] w-[170px] cursor-pointer items-center md:h-[118px] md:w-[260px]" aria-label="Ga naar home">
            <img src="/logo.png" alt="Delta & Maas Vastgoed" className="pointer-events-none h-[120px] w-auto object-contain drop-shadow-xl md:h-[175px]" />
          </button>

          <nav className={`hidden items-center text-[17px] font-extrabold uppercase tracking-[0.09em] ${isWhite ? "text-[#071426]" : "text-white"} xl:flex`}>
            <button type="button" onClick={() => goSection("diensten")} className="border-r border-current/20 px-9 py-4 hover:text-[#d6a751]">Diensten</button>
            <button type="button" onClick={goAanbod} className="border-r border-current/20 px-9 py-4 hover:text-[#d6a751]">Projecten</button>
            <button type="button" onClick={goAanbod} className="border-r border-current/20 px-9 py-4 hover:text-[#d6a751]">Off-market</button>
            <button type="button" onClick={() => goSection("over")} className="border-r border-current/20 px-9 py-4 hover:text-[#d6a751]">Over ons</button>
            <button type="button" onClick={() => goSection("contact")} className="px-9 py-4 hover:text-[#d6a751]">Contact</button>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button type="button" onClick={() => goSection("contact")} className="rounded-md bg-[#d6a751] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#c9973f]">
              Neem contact op →
            </button>
          </div>

          <button type="button" onClick={() => setMobileOpen((v) => !v)} className={`z-[10001] rounded-md border px-4 py-3 text-sm font-bold uppercase xl:hidden ${isWhite ? "border-[#071426]/20 text-[#071426]" : "border-white/40 text-white"}`}>
            Menu
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 text-[#071426] shadow-xl xl:hidden">
            <div className="grid gap-3 text-left text-sm font-extrabold uppercase tracking-[0.12em]">
              <button type="button" onClick={() => goSection("diensten")} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Diensten</button>
              <button type="button" onClick={goAanbod} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Projecten</button>
              <button type="button" onClick={goAanbod} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Off-market</button>
              <button type="button" onClick={() => goSection("over")} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Over ons</button>
              <button type="button" onClick={() => goSection("contact")} className="rounded-lg bg-[#d6a751] px-4 py-4 text-left text-white">Contact</button>
            </div>
          </div>
        )}
      </header>
    );
  };

  const WoningCard = ({ woning }: { woning: Woning }) => (
    <button type="button" onClick={() => setSelectedWoning(woning)} className="group overflow-hidden rounded-xl bg-white text-left text-[#071426] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="h-[230px] overflow-hidden">
        <img src={woning.img} alt={woning.titel} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d6a751]">{woning.locatie}</p>
        <h3 className="mt-2 text-[22px] font-extrabold">{woning.titel}</h3>
        <p className="mt-4 text-sm text-slate-500">⌂ {woning.details}</p>
        <p className="mt-2 text-sm text-slate-500">↗ {woning.rendement}</p>
        <p className="mt-6 text-2xl font-extrabold">{woning.prijs}</p>
        <p className="mt-5 text-sm font-extrabold uppercase tracking-wide">Meer info →</p>
      </div>
    </button>
  );

  const ContactSection = () => (
    <section id="contact" className="bg-[#071426] px-5 py-24 text-white md:px-8 lg:px-14 2xl:px-20">
      <div className="mx-auto grid w-full max-w-[1760px] gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Contact</p>
          <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">Laten we kennismaken.</h2>
          <p className="mt-6 max-w-md text-lg leading-9 text-slate-300">Heeft u een vraag, wilt u samenwerken of meer informatie ontvangen? Wij staan voor u klaar.</p>
          <div className="mt-8 space-y-4 text-slate-200">
            <p>📍 Rotterdam, Nederland</p>
            <p>📞 010 - 123 45 67</p>
            <p>✉️ info@deltaenmaas.nl</p>
          </div>
        </div>

        <form action="https://formsubmit.co/info@deltaenmaas.nl" method="POST" className="rounded-xl bg-white/10 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur md:p-8">
          <input type="hidden" name="_subject" value="Nieuw bericht via Delta & Maas website" />
          <input type="hidden" name="_captcha" value="false" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="naam" required className="rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="Uw naam" />
            <input name="email" type="email" required className="rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="E-mailadres" />
            <input name="telefoon" className="rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="Telefoonnummer" />
            <select name="onderwerp" className="rounded-md border border-white/20 bg-[#071426] px-5 py-4 text-slate-300 outline-none focus:border-[#d6a751]">
              <option>Onderwerp</option>
              <option>Projectbemiddeling</option>
              <option>Vastgoedacquisitie</option>
              <option>Off-market vastgoed</option>
            </select>
          </div>
          <textarea name="bericht" required className="mt-4 min-h-40 w-full rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="Uw bericht" />
          <button type="submit" className="mt-5 rounded-md bg-[#d6a751] px-9 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c9973f]">Verstuur bericht →</button>
        </form>
      </div>

      <footer className="mx-auto mt-16 w-full max-w-[1760px] border-t border-white/10 pt-12">
        <div className="grid gap-10 py-6 md:grid-cols-4">
          <div>
            <img src="/logo.png" alt="Delta & Maas Vastgoed" className="h-28 w-auto object-contain md:h-36" />
            <p className="mt-6 text-base leading-8 text-slate-300">Wij creëren vastgoedwaarde door visie, strategie en uitvoering te combineren.</p>
          </div>
          <div><h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-[#d6a751]">Navigatie</h4><div className="grid gap-2 text-base text-slate-300"><button onClick={() => goSection("diensten")} className="text-left">Diensten</button><button onClick={goAanbod} className="text-left">Projecten</button><button onClick={goAanbod} className="text-left">Off-market</button><button onClick={() => goSection("over")} className="text-left">Over ons</button><button onClick={() => goSection("contact")} className="text-left">Contact</button></div></div>
          <div><h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-[#d6a751]">Diensten</h4><p className="text-base leading-8 text-slate-300">Projectbemiddeling<br />Vastgoedacquisitie<br />Ontwikkeling<br />Off-market vastgoed</p></div>
          <div><h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-[#d6a751]">Contact</h4><p className="text-base leading-8 text-slate-300">info@deltaenmaas.nl<br />Rotterdam, Nederland<br />010 - 123 45 67</p></div>
        </div>
      </footer>
    </section>
  );

  const Whatsapp = () => (
    <>
      {whatsappOpen && (
        <div className="fixed bottom-28 right-5 z-[9998] w-[calc(100%-40px)] max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 md:right-8">
          <div className="bg-[#071426] p-5 text-white">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Delta & Maas" className="h-16 w-16 rounded bg-white object-contain p-1" />
              <div><h3 className="font-serif text-2xl font-bold">Delta & Maas</h3><p className="text-sm text-slate-300">Direct contact via WhatsApp</p></div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm leading-6 text-slate-600">Heeft u een vraag over vastgoedacquisitie, projectbemiddeling of off-market aanbod? Start direct een WhatsApp gesprek.</p>
            <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 font-bold text-white shadow-lg">Open WhatsApp →</a>
            <button type="button" onClick={() => setWhatsappOpen(false)} className="mt-3 w-full text-sm font-semibold text-slate-500 hover:text-[#071426]">Sluiten</button>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setWhatsappOpen(!whatsappOpen)} className="fixed bottom-6 right-5 z-[9997] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition hover:scale-105 md:bottom-8 md:right-8" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" className="h-9 w-9 fill-white" aria-hidden="true"><path d="M16.04 3C9.43 3 4.05 8.36 4.05 14.96c0 2.11.55 4.17 1.6 5.98L4 29l8.27-1.62a12.02 12.02 0 0 0 5.77 1.47h.01c6.61 0 11.99-5.36 11.99-11.96C30.04 8.36 22.65 3 16.04 3Zm0 23.84h-.01c-1.82 0-3.6-.49-5.15-1.42l-.37-.22-4.9.96.98-4.77-.24-.39a9.87 9.87 0 0 1-1.52-5.04c0-5.49 4.49-9.95 10.01-9.95 2.67 0 5.18 1.04 7.07 2.92a9.87 9.87 0 0 1 2.94 7.03c0 5.49-4.49 9.95-10.01 9.95Zm5.49-7.45c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" /></svg>
      </button>
    </>
  );

  if (pagina === "aanbod") {
    return (
      <main className="min-h-screen bg-[#f7f8fb] text-[#071426]">
        <Header />
        <section className="px-5 pb-24 pt-40 md:px-8 lg:px-14 lg:pt-48 2xl:px-20">
          <div className="mx-auto w-full max-w-[1760px]">
            <button type="button" onClick={goHome} className="mb-8 rounded-md bg-white px-5 py-3 font-bold text-[#d6a751] shadow-sm hover:bg-[#071426] hover:text-white">← Terug naar home</button>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Volledig aanbod</p>
            <h1 className="font-serif text-4xl font-bold md:text-7xl">Beschikbare vastgoedkansen.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">Een uitgebreider overzicht van geselecteerde woningen, beleggingsobjecten en off-market kansen.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button type="button" onClick={() => goSection("contact")} className="rounded-md bg-[#071426] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#d6a751]">Contact opnemen →</button>
              <button type="button" onClick={goHome} className="rounded-md border border-[#071426]/20 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#071426]">Naar homepage</button>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">{woningen.map((woning) => <WoningCard key={woning.titel} woning={woning} />)}</div>
          </div>
        </section>
        {selectedWoning && <DetailModal woning={selectedWoning} onClose={() => setSelectedWoning(null)} onContact={openContactForWoning} />}
        <Whatsapp />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#071426]">
      <Header />

      <section id="home" className="relative min-h-[840px] overflow-hidden bg-[#071426] text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/erasmusbrug.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/75 via-[#071426]/35 to-[#071426]/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/15 via-transparent to-[#071426]/25" />
        <div className="absolute inset-y-0 left-0 w-[55%] bg-[radial-gradient(circle_at_25%_55%,rgba(255,255,255,0.46),rgba(255,255,255,0.16)_34%,rgba(255,255,255,0)_66%)]" />
        <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-[1760px] flex-col justify-center px-5 pb-20 pt-40 md:px-8 lg:px-14 2xl:px-20">
          <div className="max-w-[760px] animate-[fadeIn_0.9s_ease-out]">
            <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Delta & Maas Vastgoed</p>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[82px]">Vastgoedkansen zien. <br />Waarde <span className="text-[#d6a751]">creëren.</span></h1>
            <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-white/95">Delta & Maas Vastgoed identificeert, ontwikkelt en realiseert vastgoedprojecten met maximaal rendement en duurzame waarde.</p>
            <div className="mt-10 flex flex-wrap gap-5">
              <button type="button" onClick={() => goSection("diensten")} className="rounded-md bg-[#d6a751] px-9 py-5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#c9973f]">Onze diensten →</button>
              <button type="button" onClick={goAanbod} className="rounded-md border border-white/70 bg-[#071426]/25 px-9 py-5 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-[#071426]">Off-market aanbod →</button>
            </div>
          </div>
        </div>
      </section>

      <section id="diensten" className="bg-white px-5 py-20 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto grid w-full max-w-[1760px] gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[["◎", "Projectbemiddeling", "Wij verbinden vraag en aanbod in de vastgoedmarkt."], ["▥", "Vastgoedacquisitie", "Wij vinden de juiste locaties met maximale potentie."], ["↗", "Ontwikkeling", "Van concept tot realisatie: wij creëren waarde."], ["⚿", "Off-market vastgoed", "Exclusieve kansen buiten de openbare markt."]].map(([icon, title, text]) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white px-8 py-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 text-6xl leading-none text-[#d6a751]">{icon}</div>
              <h3 className="text-xl font-extrabold text-[#071426]">{title}</h3>
              <p className="mx-auto mt-4 max-w-xs text-base leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="woningen" className="bg-[#071426] px-5 py-24 text-white md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto w-full max-w-[1760px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div><p className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Actueel aanbod</p><h2 className="font-serif text-4xl leading-tight md:text-5xl">Bekijk onze geselecteerde woningen.</h2></div>
            <button type="button" onClick={goAanbod} className="w-fit rounded-md border border-[#d6a751] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-[#d6a751] transition hover:bg-[#d6a751] hover:text-[#071426]">Bekijk alle woningen →</button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">{woningen.slice(0, 4).map((woning) => <WoningCard key={woning.titel} woning={woning} />)}</div>
        </div>
      </section>

      <section id="over" className="bg-[#f7f8fb] px-5 py-24 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto grid w-full max-w-[1760px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Delta & Maas Vastgoed</p>
            <h2 className="font-serif text-4xl font-bold leading-tight text-[#071426] md:text-5xl">Ervaring, netwerk en resultaat.</h2>
            <p className="mt-6 text-lg leading-9 text-slate-600">Met een sterk netwerk, diepgaande marktkennis en een scherp oog voor kansen realiseren wij duurzame waarde voor investeerders, ontwikkelaars en partners.</p>
            <button type="button" onClick={() => goSection("contact")} className="mt-8 inline-block rounded-md bg-[#071426] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-[#d6a751] transition hover:bg-[#132844]">Meer over ons →</button>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg"><img src="/rotterdam-skyline.jpg" alt="Rotterdam skyline" className="h-[360px] w-full object-cover md:h-[420px]" /></div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-[1760px]">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Vertrouwen</p>
          <h2 className="font-serif text-4xl font-bold text-[#071426]">Wat onze relaties zeggen.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {["Professioneel, discreet en altijd helder in communicatie.", "Een sterk netwerk en snel schakelen. Precies wat wij zochten.", "Betrouwbare begeleiding bij een complexe vastgoedkans."].map((q, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-[#f7f8fb] p-8 shadow-sm"><p className="font-serif text-5xl text-[#d6a751]">“</p><p className="mt-2 text-lg leading-8 text-slate-700">{q}</p><p className="mt-6 font-bold text-[#071426]">— Relatie Delta & Maas</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-5 py-20 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-[1760px]">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Regio</p>
          <h2 className="font-serif text-4xl font-bold text-[#071426]">Actief in Rotterdam en omgeving.</h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><iframe title="Rotterdam kaart" src="https://www.openstreetmap.org/export/embed.html?bbox=4.35%2C51.86%2C4.58%2C51.98&layer=mapnik" className="h-[480px] w-full md:h-[600px]" /></div>
        </div>
      </section>

      <ContactSection />
      {selectedWoning && <DetailModal woning={selectedWoning} onClose={() => setSelectedWoning(null)} onContact={openContactForWoning} />}
      <Whatsapp />
    </main>
  );
}

function DetailModal({ woning, onClose, onContact }: { woning: Woning; onClose: () => void; onContact: () => void }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white shadow-2xl">
        <div className="relative h-[300px] md:h-[360px]">
          <img src={woning.img} alt={woning.titel} className="h-full w-full object-cover" />
          <button type="button" onClick={onClose} className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 font-bold text-[#071426] shadow">Sluiten</button>
        </div>
        <div className="p-6 md:p-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#d6a751]">{woning.locatie}</p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[#071426] md:text-5xl">{woning.titel}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{woning.tekst}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-[#f7f8fb] p-5"><p className="font-bold">Prijs</p><p className="mt-2 text-[#d6a751]">{woning.prijs}</p></div>
            <div className="rounded-xl bg-[#f7f8fb] p-5"><p className="font-bold">Details</p><p className="mt-2 text-slate-600">{woning.details}</p></div>
            <div className="rounded-xl bg-[#f7f8fb] p-5"><p className="font-bold">Rendement</p><p className="mt-2 text-slate-600">{woning.rendement}</p></div>
          </div>
          <button type="button" onClick={onContact} className="mt-8 rounded-md bg-[#071426] px-8 py-4 font-bold text-[#d6a751]">Informatie aanvragen →</button>
        </div>
      </div>
    </div>
  );
}
