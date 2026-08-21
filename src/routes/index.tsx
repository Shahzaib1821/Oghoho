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
          <p className="eyebrow anim-fade-up">A Story of Faith, Resilience and a Guiding Hand</p>
          <h1 className="font-editorial anim-fade-up mt-8 text-[13vw] leading-[0.95] text-foreground md:text-[7.2vw] lg:text-[6.2rem]" style={{ animationDelay: "120ms" }}>
            Behold <em className="italic text-terracotta">the</em> Hand
          </h1>
          <p className="font-editorial anim-fade-up mt-6 max-w-lg text-2xl italic leading-snug text-foreground md:text-3xl" style={{ animationDelay: "190ms" }}>
            What was meant to bury you was actually meant to plant you.
          </p>
          <p className="anim-fade-up mt-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "260ms" }}>
            From Benin to a purposeful new beginning, this story proves that no delay or detour is wasted in the Hand. It serves as a reminder to every dreamer that where you start is only the first page, and should never define where you finish.
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
              Read Her Story
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
              src={bookCover}
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
            A Story of Survival, Surrender &amp; Becoming
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/80 md:text-xl md:leading-[1.7]">
            <p>
              Behold the Hand is the unflinching story of a woman shaped by an unseen Hand guiding her even when she couldn't recognise it.
            </p>
            <p>
              Born into struggle and instability, she sold farm produce before sunrise, learning early that survival wasn't optional. She endured a dysfunctional family and predators disguised as protectors, yet a whisper of possibility kept her moving forward through university struggles, workplace harassment, and a faith tested wait for marriage, to a bold migration to a new chapter. A companion for anyone who has felt rejected or unseen, and a reminder that waiting is preparation, not punishment.
            </p>
            <p className="font-editorial italic text-terracotta">
              Even there shall thy hand lead me, and thy right hand shall hold me. Psalm 139:10
            </p>
            <p className="text-muted-foreground">
              Inside: releasing a victim mentality, learning to recognise a voice within the silence, and reflection prompts each chapter.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a href="#excerpt" className="inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground">
              Read a Free Excerpt
            </a>
            <a href="#book" className="inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground">
              Order Your Copy Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- journey chapters ---------- */
const chapters = [
  {
    n: "I",
    title: "When You Begin to Detect.",
    quote: "",
    body: "",
  },
  {
    n: "II",
    title: "Clinging or Settling",
    quote: "",
    body: "",
  },
  {
    n: "III",
    title: "To Abandon or Surrender?",
    quote: "",
    body: "",
  },
  {
    n: "IV",
    title: "Have You Obeyed?",
    quote: "",
    body: "",
  },
  {
    n: "V",
    title: "Focus and Audacity",
    quote: "",
    body: "",
  },
  {
    n: "VI",
    title: "Wisdom of Detours",
    quote: "",
    body: "",
  },
  {
    n: "VII",
    title: "Faith in the Divine Silence",
    quote: "",
    body: "",
  },
  {
    n: "VIII",
    title: "Migration for Purpose",
    quote: "",
    body: "",
  },
  {
    n: "Bonus",
    title: "How I Learnt to Overcome Delay.",
    quote: "",
    body: "",
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
            Inside the Book — Chapter Journey
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
        <p className="mt-6 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">An Excerpt</p>
        <blockquote className="font-editorial mt-10 text-[8vw] leading-[1.05] text-foreground md:text-[4rem]">
          &ldquo;You are not a victim of your past. You are on a journey of becoming everything you endured was meant to prepare you for impact.&rdquo;
        </blockquote>
        <p className="font-editorial mt-10 max-w-3xl mx-auto text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
          &ldquo;Just when I thought I would collapse, the Hand appeared unseen, yet bringing the right people and provision I needed to keep walking.&rdquo;
        </p>
        <a href="#book" className="mt-12 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.32em] text-foreground">
          Read More Inside the Book
        </a>
      </div>
    </section>
  );
}

/* ---------- themes ---------- */
function Themes() {
  useReveal();
  return (
    <section id="themes" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Who This Book Is For</p>
          <p className="font-editorial mt-6 text-3xl leading-snug text-foreground md:text-4xl">
            Anyone from a dysfunctional family, feeling forgotten, waiting for clarity, starting something new or all over in a new country, or wrestling with unanswered prayer.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            If you've wondered whether your story is too broken to be redeemed, this book was written for you.
          </p>
        </div>
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
          <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-7xl">
            Your Story Isn&rsquo;t Over
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Whatever delay you carry, believe the same Hand that guided her is guiding you too.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#" className="inline-flex items-center gap-3 bg-terracotta px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-primary-foreground transition hover:bg-foreground">
              Buy Behold the Hand Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- reviews ---------- */
const reviews = [
  { q: "A raw, honest story that reminds you delay is not denial.", a: "Early Reader" },
  { q: "This book will meet you in the waiting, the doubt, and the becoming.", a: "Early Reader" },
];

function Reviews() {
  useReveal();
  return (
    <section id="reviews" className="py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Reader Reflections</p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
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
          <h2 className="font-editorial mt-6 text-5xl text-foreground md:text-7xl">
            Meet Oghogho J <em className="italic text-terracotta">Chiazor</em>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl md:leading-[1.7]">
            Oghogho J Chiazor holds a Postgraduate Degree in Human Resources from the prestigious York University and a BSc in Management. With over ten years of experience in Human Resources, she has built a strong track record in people management, organisational development, and strategic leadership. She is also the founder of Enco Logistics and Consulting Ltd.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Oghogho is the convener of Light Triumphant Prayer Community, an initiative and community centred on love for God, service to humanity, and spreading light everywhere people go. Through this platform, she has counselled many, initiated several outreach programmes supporting widows and orphanages, while also providing hot lunches for children in impoverished communities.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            As someone who loves music, travelling, art, and community service to the underprivileged, she realised that for others to truly experience and understand her, her thoughts about the world and her life needed to live somewhere lasting. Behold the Hand is her first debut into writing for purpose and liberation.
          </p>
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
  return (
    <section id="why-the-hand" className="py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Why the Hand?</p>
          <p className="font-editorial mt-6 text-3xl leading-snug text-foreground md:text-4xl">
            The book turns on the symbol of “The Hand”  guidance, strength, comfort. Picture a toddler learning to walk, always steadied by a parent's hand.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            “Teaching them to observe all things that I have commanded you, and lo, I am with you always, even to the end of the age. Amen.” — Matthew 28:20
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- stay connected ---------- */
function StayConnected() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="newsletter" className="py-32 md:py-48" style={{ background: "var(--surface)" }}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Stay Connected</p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
            Join the Journey sign up for release updates and reflections from Oghogho.
          </p>
          {submitted ? (
            <p className="font-editorial mt-8 text-2xl text-foreground">
              Thank you. <em className="italic text-terracotta">You're on the list.</em>
            </p>
          ) : (
            <form className="mt-8 flex flex-col gap-4 md:flex-row" onSubmit={async (e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              try {
                await fetch('api/submit.php', { method: 'POST', body: data });
              } catch (err) {
                console.error(err);
              }
              setSubmitted(true);
            }}>
              <input type="hidden" name="form" value="newsletter" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="flex-1 border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-background transition hover:bg-terracotta"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- community ---------- */
function Outreach() {
  return (
    <section id="outreach" className="py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal max-w-3xl">
          <p className="eyebrow">Community & Outreach</p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
            Through Light Triumphant Prayer Community, she continues the mission behind the book by building a community of people who love God and humanity and are committed to being God's light in the world. The community supports widows, children, and other initiatives that serve under-resourced communities.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-forground/80 md:text-xl">
            In addition, we have a book club centered on reading, learning, and meaningful discussion, with the goal of encouraging the personal, spiritual, and overall growth and exposure of every community member.
          </p>
          <a href="#" className="mt-8 inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-[0.28em] text-foreground">
            Learn About the Outreach
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- pre-order ---------- */
function PreOrder() {
  useReveal();
  const [sent, setSent] = useState(false);
  return (
    <section id="preorder" className="paper relative py-32 md:py-48">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pre-Order</p>
          <h2 className="font-editorial mt-6 text-4xl text-foreground md:text-5xl">
            Reserve your copy.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80 md:text-xl">
            Be the first to receive Behold the Hand when it releases. Add your name and email below.
          </p>
          {sent ? (
            <div className="mt-10">
              <p className="eyebrow">Received</p>
              <p className="font-editorial mt-4 text-2xl text-foreground">
                Thank you. <em className="italic text-terracotta">You're on the pre-order list.</em>
              </p>
            </div>
          ) : (
            <form
              className="mt-10 space-y-10 text-left"
              onSubmit={async (e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                try {
                  await fetch('api/submit.php', { method: 'POST', body: data });
                } catch (err) {
                  console.error(err);
                }
                setSent(true);
              }}
            >
              <input type="hidden" name="form" value="preorder" />
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Name</span>
                  <input
                    required
                    name="name"
                    type="text"
                    className="font-editorial mt-3 w-full border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Email</span>
                  <input
                    required
                    name="email"
                    type="email"
                    className="font-editorial mt-3 w-full border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
                  />
                </label>
              </div>
              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-background transition hover:bg-terracotta"
                >
                  Add Me to the Pre-Order List
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </form>
          )}
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
          <p className="eyebrow">Contact</p>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            For speaking engagements or partnerships, reach out below.
          </p>
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            Follow Oghogho:
          </p>
          <div className="mt-4 flex items-center gap-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
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
          onSubmit={async (e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            try {
              await fetch('api/submit.php', { method: 'POST', body: data });
            } catch (err) {
              console.error(err);
            }
            setSent(true);
          }}
        >
          <input type="hidden" name="form" value="contact" />
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
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Name</span>
                  <input
                    required
                    name="name"
                    type="text"
                    className="font-editorial mt-3 w-full border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Email</span>
                  <input
                    required
                    name="email"
                    type="email"
                    className="font-editorial mt-3 w-full border-b border-border bg-transparent pb-3 text-2xl text-foreground outline-none transition focus:border-terracotta"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Message</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="font-editorial mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-2xl leading-snug text-foreground outline-none transition focus:border-terracotta"
                />
              </label>
              <div className="flex items-center justify-end pt-2">
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
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <p className="font-editorial text-3xl text-foreground">
          Behold the Hand — by Oghogho J Chiazor
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm text-foreground">
          <a href="#top" className="hover:text-terracotta">Home</a>
          <a href="#author" className="hover:text-terracotta">About</a>
          <a href="#book" className="hover:text-terracotta">The Book</a>
          <a href="#reviews" className="hover:text-terracotta">Reviews</a>
          <a href="#contact" className="hover:text-terracotta">Contact</a>
          <a href="#" className="hover:text-terracotta">Privacy Policy</a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-start justify-between gap-4 px-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground md:flex-row md:items-center md:px-12">
        <p>© 2026 Oghogho J Chiazor. All rights reserved.</p>

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
      <AuthorIntro />
      <Journey />
      <QuoteBreak />
      <Themes />
      <Book />
      <PreOrder />
      <Reviews />
      <AuthorSection />
      <Social />
      <StayConnected />
      <Outreach />
      <Contact />
      <Footer />
    </main>
  );
}
// Pipeline through ssh key 