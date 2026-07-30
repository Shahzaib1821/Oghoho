import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import bookCover from "@/assets/book-cover.png";
import florals from "@/assets/florals-hero.png";
import sprig from "@/assets/sprig.png";
import bloom from "@/assets/bloom.png";
import author from "@/assets/author.jpg";
import texture from "@/assets/texture-1.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- helpers ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/* ---------- nav ---------- */
function Nav() {
  const y = useScrollY();
  const scrolled = y > 20;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md" : ""
        }`}
      style={{ backgroundColor: scrolled ? "color-mix(in oklab, var(--background) 82%, transparent)" : "transparent" }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <a href="#top" className="font-editorial text-3xl tracking-tight text-foreground">
          Behold <span className="italic text-terracotta">the</span> Hand
        </a>
        <nav className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.24em] text-muted-foreground md:flex">
          <a href="#top" className="transition hover:text-foreground">Home</a>
          <a href="#author" className="transition hover:text-foreground">About the Author</a>
          <a href="#book" className="transition hover:text-foreground">The Book</a>
          <a href="#reviews" className="transition hover:text-foreground">Reviews</a>
          <a href="#contact" className="transition hover:text-foreground">Contact</a>
        </nav>
        <a
          href="#book"
          className="text-[11px] uppercase tracking-[0.24em] text-terracotta"
        >
          <span className="border-b border-terracotta pb-1">Buy the Book</span>
        </a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  const y = useScrollY();
  return (
    <section id="top" className="paper relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-40">
      {/* floating florals */}
      <img
        src={florals}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 top-16 hidden w-[62%] max-w-[820px] opacity-95 md:block anim-drift"
        style={{ transform: `translateY(${y * -0.08}px)` }}
      />
      <img
        src={sprig}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-14 bottom-6 w-40 opacity-50 md:w-56 anim-float"
        style={{ transform: `translateY(${y * 0.06}px)` }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
        backgroundSize: "22px 22px",
      }} />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-7">
          <p className="eyebrow anim-fade-up">A Memoir of Faith, Resilience &amp; the Guiding Hand of God</p>
          <h1 className="font-editorial anim-fade-up mt-8 text-[13vw] leading-[0.95] text-foreground md:text-[7.2vw] lg:text-[6.2rem]" style={{ animationDelay: "120ms" }}>
            <span className="text-terracotta">&ldquo;</span>What was
            <br />
            meant to bury<br />
            you was <em className="italic text-teal font-light">actually</em>
            <br />
            meant to <span className="italic">plant</span> you.<span className="text-terracotta">&rdquo;</span>
          </h1>
          <p className="anim-fade-up mt-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "260ms" }}>
            From the red clay soil of Benin City to a new beginning across the Atlantic,
            Oghogho J Chiazor&rsquo;s story is proof that no delay, no dysfunction, and no
            detour is wasted in the Hand of God. Behold the Hand is a raw, honest, and
            deeply spiritual memoir for every dreamer who refuses to be defined by where
            they started.
          </p>
          <div className="anim-fade-up mt-12 flex flex-wrap items-center gap-8" style={{ animationDelay: "380ms" }}>
            <a
              href="#book"
              className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-background transition hover:bg-terracotta"
            >
              Get Your Copy
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#author-intro"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-foreground"
            >
              <span className="gold-rule" />
              Read Oghogho&rsquo;s Story
            </a>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div
            className="relative mx-auto mt-6 aspect-[3/4] w-[75%] max-w-md md:w-full"
            style={{ perspective: "1400px" }}
          >
            <div
              className="anim-float relative h-full w-full"
              style={{
                transform: `rotateY(-14deg) rotateX(4deg) translateY(${y * -0.03}px)`,
                transformStyle: "preserve-3d",
                filter: "drop-shadow(40px 60px 60px rgba(42,41,40,0.28))",
              }}
            >
              <img
                src={bookCover}
                alt="Behold the Hand — book cover"
                className="h-full w-full object-cover"
                style={{
                  boxShadow: "inset 8px 0 12px -8px rgba(0,0,0,0.35), 0 30px 60px -20px rgba(42,41,40,0.35)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-2"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.25), transparent)" }}
              />
              <div
                aria-hidden
                className="absolute inset-y-0 left-2 w-[3px]"
                style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }}
              />
            </div>
          </div>
          <p className="mt-10 text-center text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            First Edition · Hardcover · 2026
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- marquee ---------- */
function Marquee() {
  const words = ["Faith", "Resilience", "Surrender", "Purpose", "Divine Guidance", "Grace", "Becoming"];
  const loop = [...words, ...words];
  return (
    <section className="border-y border-border overflow-hidden py-6" style={{ background: "var(--surface)" }}>
      <div className="anim-marquee flex w-max gap-16 whitespace-nowrap">
        {loop.map((w, i) => (
          <span key={i} className="font-editorial flex shrink-0 items-center gap-16 text-3xl italic text-foreground/70 md:text-4xl">
            {w}
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- author intro ---------- */
function AuthorIntro() {
  useReveal();
  return (
    <section id="author-intro" className="relative py-32 md:py-44">
      <img src={sprig} alt="" aria-hidden className="anim-float pointer-events-none absolute right-4 top-16 w-24 opacity-40 md:w-40" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="reveal md:col-span-5">
          <div className="relative overflow-hidden">
            <img
              src={author}
              alt="Oghogho J Chiazor, author"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 -80px 120px -60px rgba(42,41,40,0.4)" }} />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Oghogho J Chiazor · Author of Behold the Hand
          </p>
        </div>
        <div className="reveal md:col-span-7 md:pl-8">
          <p className="eyebrow">About the Book</p>
          <h2 className="font-editorial mt-6 text-4xl text-foreground md:text-6xl">
            A Story of <em className="italic text-terracotta">Survival, Surrender</em> &amp; Becoming.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/80 md:text-xl md:leading-[1.7]">
            <p>
              Behold the Hand is the intimate, unflinching memoir of a woman shaped by an
              unseen Hand guiding her even in the moments she could not recognise it herself.
            </p>
            <p>
              Born into a home marked by hardship, harassment, and instability, Oghogho grew up
              selling farm produce before sunrise, learning early that survival was not optional.
              She endured what many would call a dysfunctional family, faced predators disguised
              as protectors, and watched friends around her settle for less than they were
              destined for. Yet through it all, a quiet, persistent whisper of possibility kept
              her moving forward.
            </p>
            <p className="text-muted-foreground">
              This book traces that journey from the markets of Benin City, through university
              struggles, workplace harassment, failed relationships, and the long, faith-tested
              wait for marriage — all the way to a bold migration across borders in search of a
              better life for her family.
            </p>
            <p className="font-editorial italic text-terracotta">
              &ldquo;You will know the truth, and the truth will set you free.&rdquo; — John 8:32
            </p>
          </div>
          <a href="#excerpt" className="mt-10 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground">
            Read a Free Excerpt
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- journey chapters ---------- */
const chapters = [
  {
    n: "I",
    title: "When You Begin to Detect…",
    quote: "",
    body: "Childhood, innocence, and the first cracks of dysfunction.",
  },
  {
    n: "II",
    title: "Clinging or Settling",
    quote: "",
    body: "Navigating survival, ambition, and difficult choices.",
  },
  {
    n: "III",
    title: "To Abandon or Surrender?",
    quote: "",
    body: "Understanding the difference between the two.",
  },
  {
    n: "IV",
    title: "Have You Obeyed?",
    quote: "",
    body: "The cost and clarity that come with obedience.",
  },
  {
    n: "V",
    title: "Enter Resilience and Strategy",
    quote: "",
    body: "Focus as persistence, not perfection.",
  },
  {
    n: "VI",
    title: "Wisdom of Detours",
    quote: "",
    body: "Finding purpose in delay and redirection.",
  },
  {
    n: "VII",
    title: "Faith in the Divine Silence from God",
    quote: "",
    body: "Trusting God when heaven feels quiet.",
  },
  {
    n: "VIII",
    title: "Migration for Purpose",
    quote: "",
    body: "Crossing borders, starting over, and trusting the process.",
  },
  {
    n: "Bonus",
    title: "How to Overcome Delay and Sustain Your Wins",
    quote: "",
    body: "A bonus chapter equipping you to hold on to what you've fought for.",
  },
];

function Journey() {
  useReveal();
  return (
    <section id="journey" className="relative overflow-hidden py-32 md:py-48" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Inside the Book</p>
          <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-7xl">
            A chapter journey through surrender, resilience, and the guiding Hand of God.
          </h2>
        </div>

        <div className="mt-24 space-y-32 md:space-y-28">
          {chapters.map((c, i) => (
            <article
              key={c.n}
              className={`reveal grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""
                }`}
            >
              <div className="md:col-span-5">
                <p className="font-editorial text-[8rem] leading-none text-terracotta/25 md:text-[12rem]">
                  {c.n}
                </p>
              </div>
              <div className="md:col-span-7">
                <p className="text-[11px] uppercase tracking-[0.32em] text-teal">Chapter {c.n}</p>
                <h3 className="font-editorial mt-4 text-4xl text-foreground md:text-5xl">{c.title}</h3>
                {c.quote ? (
                  <blockquote className="font-editorial mt-8 border-l-2 border-gold pl-6 text-2xl italic leading-snug text-foreground md:text-3xl">
                    “{c.quote}”
                  </blockquote>
                ) : null}
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="reveal mt-24 text-center">
          <a href="#book" className="inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground">
            Get the Full Book
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- quote break ---------- */
function QuoteBreak() {
  useReveal();
  return (
    <section id="excerpt" className="relative overflow-hidden py-40 md:py-56">
      <img src={florals} alt="" aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-[55%] max-w-[720px] opacity-30 anim-drift" />
      <img src={sprig} alt="" aria-hidden className="pointer-events-none absolute -left-16 bottom-10 w-40 opacity-30 anim-float md:w-56" />
      <div className="reveal relative mx-auto max-w-5xl px-6 text-center md:px-12">
        <span className="gold-rule" />
        <p className="mt-6 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">An Excerpt From the Book</p>
        <blockquote className="font-editorial mt-10 text-[8vw] leading-[1.05] text-foreground md:text-[4rem]">
          <span className="text-terracotta">&ldquo;</span>Life often hands us experiences we did not sign up for —
          broken homes, abuse, rejection, abandonment, and seasons of hardship — but you are
          not a <em className="italic text-teal">victim</em> of your past. You are on a journey
          of <em className="italic text-terracotta">becoming</em>.<span className="text-terracotta">&rdquo;</span>
        </blockquote>
        <p className="font-editorial mt-10 max-w-3xl mx-auto text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
          &ldquo;Just when I thought I would collapse, the Hand appeared. Not a physical hand I
          could touch, but a guiding, unseen Hand that brought the right people, the right
          opportunities, and the daily bread I needed to keep walking.&rdquo;
        </p>
        <a href="#book" className="mt-12 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.32em] text-foreground">
          Read More Inside the Book
        </a>
      </div>
    </section>
  );
}

/* ---------- themes ---------- */
const themes = [
  { n: "01", title: "The Unstable Home", body: "Anyone who grew up in a dysfunctional or unstable family." },
  { n: "02", title: "The Delay", body: "Those who feel forgotten, delayed, or overlooked at pivotal moments in life." },
  { n: "03", title: "The Deeper Faith", body: "Readers seeking a deeper, more intentional relationship with God." },
  { n: "04", title: "The New Beginning", body: "Immigrants and dreamers navigating the uncertainty of starting over in a new country." },
  { n: "05", title: "The Healing", body: "Anyone healing from rejection, harassment, or broken trust." },
  { n: "06", title: "The Silence", body: "Believers wrestling with unanswered prayers and divine silence." },
];

function Themes() {
  useReveal();
  return (
    <section id="themes" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Who This Book Is For</p>
            <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-6xl">
              If you&rsquo;ve ever wondered whether your story is too <em className="italic text-terracotta">broken</em> to be redeemed, this book was written for you.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Behold the Hand speaks directly to hearts still waiting for their turn.
          </p>
        </div>

        <div className="hairline mt-16" />
        <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
          {themes.map((t) => (
            <li key={t.n} className="reveal group grid grid-cols-12 gap-6 py-8 transition md:py-12">
              <span className="col-span-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:col-span-1">
                {t.n}
              </span>
              <h3 className="font-editorial col-span-10 text-3xl text-foreground transition-colors group-hover:text-terracotta md:col-span-4 md:text-5xl">
                {t.title}
              </h3>
              <p className="col-span-12 text-base leading-relaxed text-muted-foreground md:col-span-6 md:text-lg">
                {t.body}
              </p>
              <span className="col-span-12 hidden text-right text-terracotta transition group-hover:translate-x-2 md:col-span-1 md:block">
                →
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- book showcase ---------- */
function Book() {
  const y = useScrollY();
  useReveal();
  return (
    <section id="book" className="relative overflow-hidden py-32 md:py-48" style={{ background: "var(--surface)" }}>
      <img src={bloom} alt="" aria-hidden className="pointer-events-none absolute -left-12 bottom-0 w-64 opacity-70 md:w-96 anim-float" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-20 px-6 md:grid-cols-12 md:px-12">
        <div className="reveal relative md:col-span-6">
          <div className="relative mx-auto aspect-[3/4] w-[80%] max-w-md" style={{ perspective: "1600px" }}>
            <div
              className="relative h-full w-full anim-float"
              style={{
                transform: `rotateY(12deg) rotateX(-2deg) translateY(${(y - 2000) * -0.02}px)`,
                transformStyle: "preserve-3d",
                filter: "drop-shadow(-40px 60px 70px rgba(42,41,40,0.32))",
              }}
            >
              <img src={bookCover} alt="Behold the Hand hardcover" className="h-full w-full object-cover" loading="lazy" />
              <div aria-hidden className="absolute inset-y-0 right-0 w-2" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.28), transparent)" }} />
            </div>
          </div>
        </div>
        <div className="reveal md:col-span-6">
          <p className="eyebrow">The Book</p>
          <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-7xl">
            Behold <em className="italic text-terracotta">the</em> Hand
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            A Story of Survival, Surrender & Becoming
            Behold the Hand is the intimate, unflinching memoir of a woman shaped by an unseen Hand guiding her even in the moments she could not recognise it herself.
            Born into a home marked by hardship, harassment, and instability, Oghogho grew up selling farm produce before sunrise, learning early that survival was not optional. She endured what many would call a dysfunctional family, faced predators disguised as protectors, and watched friends around her settle for less than they were destined for. Yet through it all, a quiet, persistent whisper of possibility kept her moving forward.
            This book traces that journey from the markets of Benin City, through university struggles, workplace harassment, failed relationships, and the long, faith-tested wait for marriage all the way to a bold migration across borders in search of a better life for her family.
            Told with humour, vulnerability, and deep spiritual insight, Behold the Hand is more than a memoir. It is a companion for anyone who has ever felt rejected, delayed, neglected, or unseen and a reminder that every season of waiting is preparation, not punishment.

          </p>

          <dl className="mt-10 grid grid-cols-2 gap-y-6 text-sm">
            {[
              ["Format", "Hardcover · 240pp"],
              ["Publisher", "Independent"],
              ["Language", "English"],
              ["Release", "2026"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{k}</dt>
                <dd className="font-editorial mt-2 text-xl text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground">
            Your story isn&rsquo;t over. Whatever delay, dysfunction, or disappointment you
            carry, Behold the Hand is an invitation to trust the process, surrender the
            pain, and believe that the same Hand that guided Oghogho is guiding you too.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#" className="inline-flex items-center gap-3 bg-terracotta px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-primary-foreground transition hover:bg-foreground">
              Buy Behold the Hand Now
            </a>
            <a href="#" className="inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-foreground transition hover:border-foreground">
              Order eBook
            </a>
          </div>
          <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Available at Amazon · Barnes &amp; Noble · Independent Bookstores
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- reviews ---------- */
const reviews = [
  { q: "A raw, honest, and spiritually rich memoir that reminds you delay is not denial.", a: "Early Reader" },
  { q: "Oghogho writes with a rare kind of honesty. You feel every hardship, and every moment the Hand of God shows up.", a: "Early Reader" },
  { q: "This book will meet you exactly where you are — in the waiting, the doubt, and the becoming.", a: "Early Reader" },
];

function Reviews() {
  useReveal();
  return (
    <section id="reviews" className="py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Reader Reflections</p>
          <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-6xl">
            Words from early readers.
          </h2>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
          {reviews.map((r, i) => (
            <figure key={i} className="reveal relative">
              <span className="font-editorial absolute -top-10 left-0 text-8xl leading-none text-terracotta/40">“</span>
              <blockquote className="font-editorial relative text-2xl leading-snug text-foreground md:text-[1.7rem]">
                {r.q}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="gold-rule" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{r.a}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="reveal mt-16 text-center">
          <a href="#contact" className="inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground">
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- author full ---------- */
function AuthorSection() {
  useReveal();
  return (
    <section id="author" className="relative overflow-hidden py-32 md:py-48" style={{ background: "var(--surface)" }}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="reveal md:col-span-5">
          <div className="relative overflow-hidden">
            <img src={author} alt="Oghogho J Chiazor" className="aspect-[4/5] w-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="reveal md:col-span-7 md:pl-8">
          <p className="eyebrow">Meet the Author</p>
          <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-7xl">
            Oghogho J <em className="italic text-terracotta">Chiazor</em>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl md:leading-[1.7]">
            Oghogho J Chiazor is an author, HR strategist, and community leader whose life
            has been shaped by resilience, faith, and an unwavering belief that every detour
            has a divine purpose.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            She holds a Postgraduate Degree in Human Resources from the prestigious York
            University and a BSc in Management, with over ten years of experience in Human
            Resources, organisational development, and strategic leadership. She is the
            founder of Enco Logistics and Consulting Ltd.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Beyond her professional accomplishments, Oghogho is the convener of the Light
            Triumphant Prayer Group, a community devoted to love for God, service to
            humanity, and spreading light wherever its members go. Through this platform,
            she has counselled many, led outreach initiatives supporting widows and
            orphanages, and organised programmes providing hot meals for children in
            under-resourced communities.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Drawing from a childhood shaped by hardship in Benin City, Nigeria, to building
            a new life abroad with her husband and children, Oghogho writes with the
            conviction that no one&rsquo;s story ends in the pit they started from. She
            believes that being a victim only sets you back and that every painful chapter
            can be rewritten into a testimony of purpose.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Behold the Hand is her debut book, born out of years of obedience to a calling
            she almost left unfinished until she surrendered to the same Hand that had
            guided her all along.
          </p>

          <div className="mt-12 grid max-w-lg grid-cols-2 gap-y-8 text-sm">
            {[
              ["Home", "Benin City, Nigeria → Abroad"],
              ["Writes on", "Faith · Resilience · Purpose"],
              ["Founder of", "Enco Logistics & Consulting Ltd"],
              ["Convener of", "Light Triumphant Prayer Group"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{k}</dt>
                <dd className="font-editorial mt-2 text-lg text-foreground">{v}</dd>
              </div>
            ))}
          </div>
          <a href="#contact" className="mt-12 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground">
            Connect with Oghogho
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- social grid ---------- */
function Social() {
  useReveal();
  const tiles = [
    { kind: "quote", text: "Picture a toddler learning to walk — wobbling, stumbling, tumbling to the ground, yet always steadied by a parent's hand.", tint: "terracotta" as const },
    { kind: "image", src: florals },
    { kind: "quote", text: "That is how God deals with us. Every time we fall, His hand pulls us up again.", tint: "teal" as const },
    { kind: "image", src: texture },
    { kind: "quote", text: "“Even there your hand will guide me, your right hand will hold me fast.” — Psalm 139:10", tint: "gold" as const },
    { kind: "image", src: bloom },
  ];
  return (
    <section className="py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="reveal mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">The Symbol Behind the Story</p>
            <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-6xl">
              Why the Hand.
            </h2>
          </div>
          <a href="#book" className="text-[11px] uppercase tracking-[0.28em] text-foreground">
            <span className="border-b border-foreground/40 pb-1">Read the Full Story</span>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {tiles.map((t, i) => (
            <div key={i} className="reveal aspect-square overflow-hidden">
              {t.kind === "image" ? (
                <img src={t.src as string} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" loading="lazy" />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center p-6 md:p-10"
                  style={{
                    background:
                      t.tint === "terracotta" ? "var(--terracotta)" :
                        t.tint === "teal" ? "var(--teal)" : "var(--gold)",
                  }}
                >
                  <p className="font-editorial text-center text-2xl leading-tight text-background md:text-4xl">
                    “{t.text}”
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  useReveal();
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="paper relative overflow-hidden py-32 md:py-48">
      <img src={sprig} alt="" aria-hidden className="anim-float pointer-events-none absolute -left-8 top-16 w-40 opacity-40 md:w-56" />
      <img src={bloom} alt="" aria-hidden className="anim-float pointer-events-none absolute -right-8 bottom-0 w-56 opacity-60 md:w-80" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-20 px-6 md:grid-cols-12 md:px-12">
        <div className="reveal md:col-span-5">
          <p className="eyebrow">Get in Touch</p>
          <h2 className="font-editorial mt-8 text-5xl leading-[1.02] text-foreground md:text-7xl">
            Write to the <em className="italic text-terracotta">author.</em>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            For speaking engagements, media inquiries, book clubs, or partnership
            opportunities, reach out below.
          </p>
          <a
            href="mailto:hello@oghoghochiazor.com"
            className="font-editorial mt-10 inline-block text-2xl italic text-terracotta transition hover:text-foreground md:text-3xl"
          >
            hello@oghoghochiazor.com
          </a>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Sign up to receive updates on new releases, reflections from Oghogho, prayer
            resources, and behind-the-scenes stories from the writing of Behold the Hand.
            No spam — only encouragement, updates, and grace.
          </p>
          <div className="mt-10 flex items-center gap-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            <a href="#" className="transition hover:text-foreground">Instagram</a>
            <span className="text-gold">◆</span>
            <a href="#" className="transition hover:text-foreground">Facebook</a>
            <span className="text-gold">◆</span>
            <a href="#" className="transition hover:text-foreground">LinkedIn</a>
            <span className="text-gold">◆</span>
            <a href="#" className="transition hover:text-foreground">YouTube</a>
          </div>
        </div>

        <form
          className="reveal md:col-span-7 md:pl-10"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="flex h-full min-h-[320px] flex-col items-start justify-center border-t border-border pt-10">
              <p className="eyebrow">Received</p>
              <p className="font-editorial mt-6 text-4xl leading-tight text-foreground md:text-5xl">
                Thank you. <em className="italic text-terracotta">Your note has landed softly.</em>
              </p>
              <p className="mt-6 text-muted-foreground">A personal reply will follow within a few days.</p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Your Name</span>
                  <input
                    required
                    type="text"
                    className="font-editorial mt-3 w-full border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Email</span>
                  <input
                    required
                    type="email"
                    className="font-editorial mt-3 w-full border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Reason</span>
                <select
                  className="font-editorial mt-3 w-full appearance-none border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
                  defaultValue="hello"
                >
                  <option value="hello">Simply to say hello</option>
                  <option value="interview">Interview or feature</option>
                  <option value="speaking">Speaking invitation</option>
                  <option value="retreat">Retreat or gathering</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Your Message</span>
                <textarea
                  required
                  rows={4}
                  className="font-editorial mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-2xl leading-snug text-foreground outline-none transition focus:border-terracotta"
                />
              </label>
              <div className="flex items-center justify-between pt-2">
                <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                  Your words are read personally. No lists. No noise.
                </p>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-background transition hover:bg-terracotta"
                >
                  Send Message
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-16" style={{ background: "var(--surface)" }}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="font-editorial text-3xl text-foreground">
            Behold <em className="italic text-terracotta">the</em> Hand
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A memoir of faith, resilience &amp; the guiding Hand of God — by Oghogho J Chiazor.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Read</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li><a href="#top" className="hover:text-terracotta">Home</a></li>
              <li><a href="#book" className="hover:text-terracotta">The Book</a></li>
              <li><a href="#reviews" className="hover:text-terracotta">Reviews</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Meet</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li><a href="#author" className="hover:text-terracotta">About the Author</a></li>
              <li><a href="#contact" className="hover:text-terracotta">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Follow</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li><a href="#" className="hover:text-terracotta">Instagram</a></li>
              <li><a href="#" className="hover:text-terracotta">Facebook</a></li>
              <li><a href="#" className="hover:text-terracotta">LinkedIn</a></li>
              <li><a href="#" className="hover:text-terracotta">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-start justify-between gap-4 px-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:flex-row md:items-center md:px-12">
        <p>© {new Date().getFullYear()} Oghogho J Chiazor. All rights reserved.</p>
        <p>Site built for Oghoghochiazor.com</p>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */
function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Marquee />
      <AuthorIntro />
      <Journey />
      <QuoteBreak />
      <Themes />
      <Book />
      <Reviews />
      <AuthorSection />
      <Social />
      <Contact />
      <Footer />
    </main>
  );
}
