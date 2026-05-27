"use client";

import { useEffect, useRef, useState } from "react";

type Page = "home" | "aanbod" | "blogs" | "blog";
type Status = "idle" | "sending" | "success" | "error";

type Property = {
  title: string;
  location: string;
  image: string;
};

type Blog = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  intro: string;
  keywords: string;
  image: string;
  body: string[];
};

const ACCESS_KEY = "01241262-f2ac-4884-8f2b-dd675ed041d8";

const properties: Property[] = [
  {
    title: "Coming soon",
    location: "Rotterdam Centrum",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Coming soon",
    location: "Kralingen",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Coming soon",
    location: "Kop van Zuid",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Coming soon",
    location: "Schiedam",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Coming soon",
    location: "Delfshaven",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Coming soon",
    location: "Zuid-Holland",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop",
  },
];

const blogs: Blog[] = [
  {
    slug: "vastgoed-investeren-rotterdam",
    title: "Vastgoed investeren in Rotterdam: waar liggen de kansen?",
    category: "Investeren",
    readTime: "4 min",
    intro:
      "Rotterdam blijft een van de interessantste vastgoedmarkten van Nederland. De combinatie van groei, bereikbaarheid en gebiedsontwikkeling maakt de stad aantrekkelijk voor investeerders.",
    keywords:
      "vastgoed Rotterdam, vastgoed investeren Rotterdam, beleggingspand Rotterdam, vastgoedkansen Rotterdam, Delta & Maas Vastgoed",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1400&auto=format&fit=crop",
    body: [
      "Rotterdam ontwikkelt zich al jaren als stad waar wonen, werken en investeren samenkomen. Voor vastgoedinvesteerders is vooral de combinatie van gebiedsontwikkeling, huurvraag en zakelijke groei interessant.",
      "Wijken rondom het centrum, de Maas en goed bereikbare OV-locaties blijven populair. Ook gebieden met transformatiepotentie kunnen interessant zijn voor partijen die verder kijken dan het huidige straatbeeld.",
      "Delta & Maas Vastgoed kijkt niet alleen naar stenen, maar naar locatiekwaliteit, toekomstige waardeontwikkeling en de juiste strategie per object.",
    ],
  },
  {
    slug: "beleggingspand-kopen-zuid-holland",
    title: "Beleggingspand kopen in Zuid-Holland: belangrijke aandachtspunten",
    category: "Beleggingsobjecten",
    readTime: "5 min",
    intro:
      "Een goed beleggingspand vraagt om meer dan een aantrekkelijk rendement. Locatie, verhuurbaarheid, onderhoud en exitstrategie bepalen de echte waarde.",
    keywords:
      "beleggingspand kopen, beleggingspand Zuid-Holland, vastgoed rendement, vastgoed acquisitie, vastgoed belegging",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1400&auto=format&fit=crop",
    body: [
      "Bij het kopen van een beleggingspand is het belangrijk om niet alleen naar het bruto rendement te kijken. Een sterk object heeft een goede ligging, stabiele huurvraag en realistische onderhoudskosten.",
      "Zuid-Holland kent meerdere sterke vastgoedregio’s, waaronder Rotterdam, Den Haag, Schiedam, Delft en omliggende groeigemeenten. De juiste keuze hangt af van doelstelling, risicoprofiel en tijdshorizon.",
      "Een professionele vastgoedpartner kan helpen om kansen vroegtijdig te herkennen en risico’s beter in kaart te brengen.",
    ],
  },
  {
    slug: "vastgoedwaarde-creeren",
    title: "Vastgoedwaarde creëren: van kans naar strategie",
    category: "Strategie",
    readTime: "4 min",
    intro:
      "Waarde creëren in vastgoed begint met visie. Door marktkennis, timing en uitvoering te combineren ontstaat ruimte voor groei.",
    keywords:
      "vastgoedwaarde creëren, vastgoedstrategie, projectbemiddeling vastgoed, vastgoedontwikkeling, vastgoed met visie",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
    body: [
      "Vastgoedwaarde ontstaat niet vanzelf. Het begint met het herkennen van potentie: ligging, doelgroep, staat van onderhoud, vergunningen en toekomstige marktontwikkeling.",
      "Een object kan interessant zijn door herpositionering, renovatie, splitsing, verhuurstrategie of verkoopmoment. De juiste strategie maakt hierin het verschil.",
      "Delta & Maas Vastgoed werkt vanuit een heldere visie: kansen herkennen, waarde creëren en zorgvuldig begeleiden richting resultaat.",
    ],
  },
  {
    slug: "projectbemiddeling-vastgoed",
    title: "Projectbemiddeling in vastgoed: waarom het netwerk telt",
    category: "Projectbemiddeling",
    readTime: "3 min",
    intro:
      "In vastgoed is toegang tot het juiste netwerk vaak doorslaggevend. Projectbemiddeling verbindt kansen, investeerders en ontwikkelaars.",
    keywords:
      "projectbemiddeling vastgoed, vastgoed netwerk, vastgoed projecten Rotterdam, vastgoed partner, vastgoed kansen",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    body: [
      "Niet elke vastgoedkans bereikt de open markt. Juist daarom is een sterk netwerk belangrijk. Projectbemiddeling zorgt ervoor dat vraag en aanbod efficiënt bij elkaar komen.",
      "Voor ontwikkelaars, beleggers en vastgoedeigenaren kan een goede bemiddelaar zorgen voor snelheid, discretie en betere aansluiting tussen partijen.",
      "Delta & Maas Vastgoed richt zich op professionele begeleiding, duidelijke communicatie en zorgvuldig opgebouwde relaties.",
    ],
  },
];

const services = [
  {
    icon: "◎",
    title: "Projectbemiddeling",
    text: "Wij verbinden vraag en aanbod in de vastgoedmarkt.",
  },
  {
    icon: "▥",
    title: "Vastgoedacquisitie",
    text: "Wij vinden de juiste locaties met maximale potentie.",
  },
  {
    icon: "→",
    title: "Ontwikkeling",
    text: "Van concept tot realisatie: wij creëren waarde.",
  },
  {
    icon: "⚿",
    title: "Beleggingsobjecten",
    text: "Exclusieve vastgoedkansen met potentie.",
  },
];

export default function Home() {
  const [page, setPage] = useState<Page>(() => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "");
    if (hash === "aanbod" || hash === "blogs") return hash;
    return "home";
  });
  const [activeBlog, setActiveBlog] = useState<Blog>(blogs[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<Status>("idle");
  const propertyCarouselRef = useRef<HTMLDivElement | null>(null);
  const blogCarouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "aanbod" || hash === "blogs") {
        setPage(hash);
        setMobileOpen(false);
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
      } else {
        setPage("home");
        setMobileOpen(false);
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (page !== "home" || !pendingScroll) return;

    const timer = window.setTimeout(() => {
      if (pendingScroll === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const section = document.getElementById(pendingScroll);
        if (section) {
          const offset = 125;
          const top =
            section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
      setPendingScroll(null);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [page, pendingScroll]);

  const autoSlide = (ref: React.RefObject<HTMLDivElement | null>) => {
    const el = ref.current;
    if (!el) return;

    const cardWidth = el.clientWidth * 0.86;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (el.scrollLeft >= maxScroll - 20) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (page === "home" || page === "aanbod") autoSlide(propertyCarouselRef);
      if (page === "home" || page === "blogs") autoSlide(blogCarouselRef);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [page]);

  const updateBrowserPage = (nextPage: Page, hash: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({ page: nextPage }, "", hash);
    }
    setPage(nextPage);
  };

  const goHome = () => {
    setMobileOpen(false);
    setPendingScroll("top");
    if (typeof window !== "undefined") {
      window.history.pushState({ page: "home" }, "", window.location.pathname);
    }
    setPage("home");
  };

  const goSection = (id: string) => {
    setMobileOpen(false);
    setPendingScroll(id);
    setPage("home");
  };

  const goAanbod = () => {
    setMobileOpen(false);
    updateBrowserPage("aanbod", "#aanbod");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
  };

  const goBlogs = () => {
    setMobileOpen(false);
    updateBrowserPage("blogs", "#blogs");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
  };

  const openBlog = (blog: Blog) => {
    setActiveBlog(blog);
    setMobileOpen(false);
    updateBrowserPage("blog", `#blog-${blog.slug}`);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "Nieuw bericht via Delta & Maas website");
    formData.append("from_name", "Delta & Maas Vastgoed website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Formulier niet verzonden");

      setContactStatus("success");
      e.currentTarget.reset();
    } catch {
      setContactStatus("error");
    }
  };

  const Header = () => {
    const isWhite = scrolled || page !== "home" || mobileOpen;

    return (
      <header
        className={`fixed left-0 top-0 z-[9999] w-full transition duration-300 ${
          isWhite ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between px-5 py-4 md:px-8 lg:px-14 2xl:px-20">
          <button
            type="button"
            onClick={goHome}
            className="relative z-[10001] flex h-[74px] w-[150px] cursor-pointer items-center md:h-[105px] md:w-[235px]"
            aria-label="Ga naar home"
          >
            <img
              src="/logo.png"
              alt="Delta & Maas Vastgoed"
              className="pointer-events-none h-[92px] w-auto object-contain drop-shadow-xl md:h-[150px]"
            />
          </button>

          <nav
            className={`hidden items-center text-[16px] font-extrabold uppercase tracking-[0.09em] ${
              isWhite ? "text-[#071426]" : "text-white"
            } xl:flex`}
          >
            <button type="button" onClick={() => goSection("diensten")} className="border-r border-current/20 px-8 py-4 hover:text-[#d6a751]">
              Diensten
            </button>
            <button type="button" onClick={goAanbod} className="border-r border-current/20 px-8 py-4 hover:text-[#d6a751]">
              Aanbod
            </button>
            <button type="button" onClick={goBlogs} className="border-r border-current/20 px-8 py-4 hover:text-[#d6a751]">
              Blogs
            </button>
            <button type="button" onClick={() => goSection("over")} className="border-r border-current/20 px-8 py-4 hover:text-[#d6a751]">
              Over ons
            </button>
            <button type="button" onClick={() => goSection("contact")} className="px-8 py-4 hover:text-[#d6a751]">
              Contact
            </button>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button type="button" onClick={() => goSection("contact")} className="rounded-md bg-[#d6a751] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#c9973f]">
              Neem contact op →
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`z-[10001] rounded-md border px-4 py-3 text-sm font-bold uppercase xl:hidden ${
              isWhite
                ? "border-[#071426]/20 text-[#071426]"
                : "border-white/40 text-white"
            }`}
          >
            {mobileOpen ? "Sluit" : "Menu"}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 text-[#071426] shadow-xl xl:hidden">
            <div className="grid gap-3 text-left text-sm font-extrabold uppercase tracking-[0.12em]">
              <button type="button" onClick={() => goSection("diensten")} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Diensten</button>
              <button type="button" onClick={goAanbod} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Aanbod</button>
              <button type="button" onClick={goBlogs} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Blogs</button>
              <button type="button" onClick={() => goSection("over")} className="rounded-lg bg-slate-50 px-4 py-4 text-left">Over ons</button>
              <button type="button" onClick={() => goSection("contact")} className="rounded-lg bg-[#d6a751] px-4 py-4 text-left text-white">Contact</button>
            </div>
          </div>
        )}
      </header>
    );
  };

  const PropertyCard = ({ item }: { item: Property }) => (
    <article className="group min-w-[86%] snap-start overflow-hidden rounded-2xl bg-white text-left text-[#071426] shadow-xl ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl md:min-w-0">
      <div className="relative h-[245px] overflow-hidden bg-[#071426]">
        <img
          src={item.image}
          alt={`${item.title} ${item.location}`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/85 via-[#071426]/20 to-transparent" />
        <div className="absolute bottom-5 left-5 rounded-full bg-[#d6a751] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white">
          Binnenkort
        </div>
      </div>
      <div className="p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d6a751]">
          {item.location}
        </p>
        <h3 className="mt-2 text-3xl font-extrabold">{item.title}</h3>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Nieuwe vastgoedkans wordt binnenkort toegevoegd.
        </p>
      </div>
    </article>
  );

  const ContactSection = () => (
    <section id="contact" className="bg-[#071426] px-5 py-24 text-white md:px-8 lg:px-14 2xl:px-20">
      <div className="mx-auto grid w-full max-w-[1760px] gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Contact</p>
          <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">Laten we kennismaken.</h2>
          <p className="mt-6 max-w-md text-lg leading-9 text-slate-300">
            Heeft u een vraag, wilt u samenwerken of meer informatie ontvangen? Laat uw gegevens achter en wij nemen zorgvuldig contact met u op.
          </p>
          <div className="mt-8 space-y-4 text-slate-200">
            <p>📍 Rotterdam, Nederland</p>
            <p>✉️ info@deltaenmaas.nl</p>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#d6a751]">Professionele contactflow</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Uw aanvraag wordt discreet behandeld. Binnen één werkdag ontvangt u een inhoudelijke reactie of voorstel voor kennismaking.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white/10 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur md:p-8">
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" required className="rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="Uw naam" />
            <input name="email" type="email" required className="rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="E-mailadres" />
            <input name="phone" className="rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="Telefoonnummer" />
            <select name="topic" className="rounded-md border border-white/20 bg-[#071426] px-5 py-4 text-slate-300 outline-none focus:border-[#d6a751]" defaultValue="">
              <option value="" disabled>Onderwerp</option>
              <option>Projectbemiddeling</option>
              <option>Vastgoedacquisitie</option>
              <option>Beleggingsobjecten</option>
              <option>Samenwerking</option>
            </select>
          </div>

          <textarea name="message" required className="mt-4 min-h-40 w-full rounded-md border border-white/20 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-300 focus:border-[#d6a751]" placeholder="Uw bericht" />

          <button type="submit" disabled={contactStatus === "sending"} className="mt-5 rounded-md bg-[#d6a751] px-9 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c9973f] disabled:cursor-not-allowed disabled:opacity-70">
            {contactStatus === "sending" ? "Verzenden..." : "Verstuur bericht →"}
          </button>

          {contactStatus === "success" && (
            <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm font-semibold text-emerald-200">
              ✓ Bericht succesvol verzonden. We nemen zo snel mogelijk contact met u op.
            </div>
          )}

          {contactStatus === "error" && (
            <div className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-sm font-semibold text-red-200">
              Er ging iets mis. Mail ons direct via info@deltaenmaas.nl.
            </div>
          )}
        </form>
      </div>

    </section>
  );

  const Footer = () => (
    <footer className="mx-auto mt-16 w-full max-w-[1760px] border-t border-white/10 pt-12">
      <div className="grid gap-10 py-6 md:grid-cols-4">
        <div>
          <img src="/logo.png" alt="Delta & Maas Vastgoed" className="h-28 w-auto object-contain md:h-36" loading="lazy" />
          <p className="mt-6 text-base leading-8 text-slate-300">Vastgoed met visie. Wij creëren waarde door strategie, marktkennis en uitvoering samen te brengen.</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-[#d6a751]">Navigatie</h4>
          <div className="grid gap-2 text-base text-slate-300">
            <button onClick={() => goSection("diensten")} className="text-left">Diensten</button>
            <button onClick={goAanbod} className="text-left">Aanbod</button>
            <button onClick={goBlogs} className="text-left">Blogs</button>
            <button onClick={() => goSection("over")} className="text-left">Over ons</button>
            <button onClick={() => goSection("contact")} className="text-left">Contact</button>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-[#d6a751]">Diensten</h4>
          <p className="text-base leading-8 text-slate-300">Projectbemiddeling<br />Vastgoedacquisitie<br />Ontwikkeling<br />Beleggingsobjecten</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.14em] text-[#d6a751]">Contact</h4>
          <p className="text-base leading-8 text-slate-300">info@deltaenmaas.nl<br />Rotterdam, Nederland</p>
        </div>
      </div>
    </footer>
  );

  const Whatsapp = () => (
    <>
      {whatsappOpen && (
        <div className="fixed bottom-28 right-5 z-[9998] w-[calc(100%-40px)] max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 md:right-8">
          <div className="bg-[#071426] p-5 text-white">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Delta & Maas" className="h-16 w-16 rounded bg-white object-contain p-1" loading="lazy" />
              <div>
                <h3 className="font-serif text-2xl font-bold">Delta & Maas</h3>
                <p className="text-sm text-slate-300">Direct contact via WhatsApp</p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm leading-6 text-slate-600">Heeft u een vraag over vastgoedacquisitie, projectbemiddeling of vastgoedkansen? Start direct een WhatsApp gesprek.</p>
            <a href="https://wa.me/31612345678" target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 font-bold text-white shadow-lg">
              Open WhatsApp →
            </a>
            <button type="button" onClick={() => setWhatsappOpen(false)} className="mt-3 w-full text-sm font-semibold text-slate-500 hover:text-[#071426]">
              Sluiten
            </button>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setWhatsappOpen(!whatsappOpen)} className="fixed bottom-6 right-5 z-[9997] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition hover:scale-105 md:bottom-8 md:right-8" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" className="h-9 w-9 fill-white" aria-hidden="true">
          <path d="M16.04 3C9.43 3 4.05 8.36 4.05 14.96c0 2.11.55 4.17 1.6 5.98L4 29l8.27-1.62a12.02 12.02 0 0 0 5.77 1.47h.01c6.61 0 11.99-5.36 11.99-11.96C30.04 8.36 22.65 3 16.04 3Zm0 23.84h-.01c-1.82 0-3.6-.49-5.15-1.42l-.37-.22-4.9.96.98-4.77-.24-.39a9.87 9.87 0 0 1-1.52-5.04c0-5.49 4.49-9.95 10.01-9.95 2.67 0 5.18 1.04 7.07 2.92a9.87 9.87 0 0 1 2.94 7.03c0 5.49-4.49 9.95-10.01 9.95Zm5.49-7.45c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </button>
    </>
  );

  const BlogCard = ({ blog }: { blog: Blog }) => (
    <article className="min-w-[86%] snap-start overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl md:min-w-0">
      <div className="relative h-56 overflow-hidden bg-[#071426]">
        <img src={blog.image} alt={blog.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/50 to-transparent" />
      </div>
      <div className="p-7">
        <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#d6a751]">
          <span>{blog.category}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
        <h3 className="mt-4 font-serif text-3xl font-bold leading-tight text-[#071426]">{blog.title}</h3>
        <p className="mt-4 text-base leading-7 text-slate-600">{blog.intro}</p>
        <button type="button" onClick={() => openBlog(blog)} className="mt-6 rounded-md bg-[#071426] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#d6a751]">
          Lees blog →
        </button>
      </div>
    </article>
  );

  if (page === "aanbod") {
    return (
      <main className="min-h-screen bg-[#f7f8fb] text-[#071426]">
        <Header />
        <section className="px-5 pb-24 pt-40 md:px-8 lg:px-14 lg:pt-48 2xl:px-20">
          <div className="mx-auto w-full max-w-[1760px]">
            <button type="button" onClick={goHome} className="mb-8 rounded-md bg-white px-5 py-3 font-bold text-[#d6a751] shadow-sm hover:bg-[#071426] hover:text-white">
              ← Terug naar home
            </button>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Aanbod</p>
            <h1 className="font-serif text-4xl font-bold md:text-7xl">Beschikbare vastgoedkansen.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Ons aanbod wordt zorgvuldig samengesteld. Binnenkort verschijnen hier geselecteerde woningen, beleggingsobjecten en vastgoedkansen.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button type="button" onClick={() => goSection("contact")} className="rounded-md bg-[#071426] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#d6a751]">
                Interesse doorgeven →
              </button>
              <button type="button" onClick={goBlogs} className="rounded-md border border-[#071426]/20 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#071426]">
                Lees onze blogs
              </button>
            </div>

            <div ref={propertyCarouselRef} className="mt-12 flex snap-x gap-6 overflow-x-auto scroll-smooth pb-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
              {properties.map((item, index) => (
                <PropertyCard key={`${item.location}-${index}`} item={item} />
              ))}
            </div>
          </div>
        </section>
        <Whatsapp />
      </main>
    );
  }

  if (page === "blogs") {
    return (
      <main className="min-h-screen bg-[#f7f8fb] text-[#071426]">
        <Header />
        <section className="px-5 pb-24 pt-40 md:px-8 lg:px-14 lg:pt-48 2xl:px-20">
          <div className="mx-auto w-full max-w-[1760px]">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Kennisbank</p>
            <h1 className="font-serif text-4xl font-bold md:text-7xl">Blogs over vastgoed, investeren en Rotterdam.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Artikelen gericht op vindbaarheid, autoriteit en waardevolle informatie voor investeerders, eigenaren en partners.
            </p>
            <div ref={blogCarouselRef} className="mt-12 flex snap-x gap-6 overflow-x-auto scroll-smooth pb-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </div>
        </section>
        <Whatsapp />
      </main>
    );
  }

  if (page === "blog") {
    return (
      <main className="min-h-screen bg-white text-[#071426]">
        <Header />
        <article className="px-5 pb-24 pt-40 md:px-8 lg:px-14 lg:pt-48 2xl:px-20">
          <div className="mx-auto max-w-5xl">
            <button type="button" onClick={goBlogs} className="mb-8 rounded-md bg-[#f7f8fb] px-5 py-3 font-bold text-[#d6a751] shadow-sm">
              ← Terug naar blogs
            </button>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">{activeBlog.category} • {activeBlog.readTime}</p>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-7xl">{activeBlog.title}</h1>
            <p className="mt-6 text-xl leading-9 text-slate-600">{activeBlog.intro}</p>
            <img src={activeBlog.image} alt={activeBlog.title} className="mt-10 h-[360px] w-full rounded-2xl object-cover shadow-xl md:h-[520px]" loading="lazy" />
            <div className="mt-10 rounded-2xl bg-[#f7f8fb] p-6 text-sm leading-7 text-slate-600">
              <strong>SEO zoekwoorden:</strong> {activeBlog.keywords}
            </div>
            <div className="mt-10 space-y-7 text-lg leading-9 text-slate-700">
              {activeBlog.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 rounded-2xl bg-[#071426] p-8 text-white">
              <h2 className="font-serif text-3xl font-bold">Vastgoedkans bespreken?</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Heeft u interesse in vastgoedacquisitie, projectbemiddeling of beleggingsobjecten? Delta & Maas Vastgoed denkt graag mee.
              </p>
              <button type="button" onClick={() => goSection("contact")} className="mt-6 rounded-md bg-[#d6a751] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white">
                Contact opnemen →
              </button>
            </div>
          </div>
        </article>
        <Whatsapp />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#071426]">
      <Header />

      <section id="home" className="relative min-h-[840px] overflow-hidden bg-[#071426] text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/erasmusbrug.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/78 via-[#071426]/42 to-[#071426]/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/15 via-transparent to-[#071426]/25" />
        <div className="absolute inset-y-0 left-0 hidden w-[55%] bg-[radial-gradient(circle_at_25%_55%,rgba(255,255,255,0.32),rgba(255,255,255,0.10)_34%,rgba(255,255,255,0)_66%)] md:block" />

        <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-[1760px] flex-col justify-center px-5 pb-20 pt-40 md:px-8 lg:px-14 2xl:px-20">
          <div className="max-w-[760px] animate-[fadeIn_0.9s_ease-out]">
            <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Delta & Maas Vastgoed</p>
            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[82px]">
              Vastgoed met <span className="text-[#d6a751]">visie</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-white/95">
              Delta & Maas Vastgoed identificeert, ontwikkelt en realiseert vastgoedprojecten met maximaal rendement en duurzame waarde.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <button type="button" onClick={() => goSection("diensten")} className="rounded-md bg-[#d6a751] px-9 py-5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#c9973f]">
                Onze diensten →
              </button>
              <button type="button" onClick={goAanbod} className="rounded-md border border-white/70 bg-[#071426]/25 px-9 py-5 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-[#071426]">
                Bekijk aanbod →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="diensten" className="bg-white px-5 py-20 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto grid w-full max-w-[1760px] grid-cols-2 gap-5 xl:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="min-h-[210px] rounded-xl border border-slate-200 bg-white px-5 py-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:px-8">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d6a751]/10 text-3xl leading-none text-[#d6a751]">
                {service.icon}
              </div>
              <h3 className="text-lg font-extrabold text-[#071426] md:text-xl">{service.title}</h3>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-slate-600 md:text-base">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="woningen" className="bg-[#071426] px-5 py-24 text-white md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto w-full max-w-[1760px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Actueel aanbod</p>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">Binnenkort beschikbaar.</h2>
            </div>
            <button type="button" onClick={goAanbod} className="w-fit rounded-md border border-[#d6a751] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-[#d6a751] transition hover:bg-[#d6a751] hover:text-[#071426]">
              Bekijk aanbod →
            </button>
          </div>

          <div ref={propertyCarouselRef} className="flex snap-x gap-6 overflow-x-auto scroll-smooth pb-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
            {properties.slice(0, 3).map((item, index) => (
              <PropertyCard key={`${item.location}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="over" className="bg-[#f7f8fb] px-5 py-24 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto grid w-full max-w-[1760px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Delta & Maas Vastgoed</p>
            <h2 className="font-serif text-4xl font-bold leading-tight text-[#071426] md:text-5xl">Ervaring, netwerk en resultaat.</h2>
            <p className="mt-6 text-lg leading-9 text-slate-600">
              Met een sterk netwerk, diepgaande marktkennis en een scherp oog voor kansen realiseren wij duurzame waarde voor investeerders, ontwikkelaars en partners.
            </p>
            <button type="button" onClick={() => goSection("contact")} className="mt-8 inline-block rounded-md bg-[#071426] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-[#d6a751] transition hover:bg-[#132844]">
              Meer over ons →
            </button>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img src="/rotterdam-skyline.jpg" alt="Rotterdam skyline" className="h-[360px] w-full object-cover md:h-[420px]" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Kennisbank</p>
              <h2 className="font-serif text-4xl font-bold text-[#071426]">Laatste vastgoedblogs.</h2>
            </div>
            <button type="button" onClick={goBlogs} className="w-fit rounded-md bg-[#071426] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#d6a751]">
              Alle blogs →
            </button>
          </div>
          <div ref={blogCarouselRef} className="flex snap-x gap-6 overflow-x-auto scroll-smooth pb-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      <section className="bg-[#f7f8fb] px-5 py-20 md:px-8 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-[1760px]">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.25em] text-[#d6a751]">Regio</p>
          <h2 className="font-serif text-4xl font-bold text-[#071426]">Actief in Rotterdam en omgeving.</h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <iframe title="Rotterdam kaart" src="https://www.openstreetmap.org/export/embed.html?bbox=4.35%2C51.86%2C4.58%2C51.98&layer=mapnik" className="h-[420px] w-full md:h-[560px]" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-5 pb-12 text-white md:px-8 lg:px-14 2xl:px-20">
        <Footer />
      </section>

      <Whatsapp />
    </main>
  );
}
