import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Marquee } from "@/components/fx/marquee";
import { Counter, Magnetic, Reveal, SplitWords } from "@/components/fx/motion-primitives";
import { clubs } from "@/data/clubs";
import { itsa } from "@/data/itsa";
import eventsData from "@/data/events.json";

const title = "ITSA — Information Technology Students' Association, PCCoE Pune";
const description =
  "The digital headquarters of ITSA, PCCoE Pune: events, clubs, teams and achievements of the Information Technology Students' Association.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.25]);

  const latest = eventsData.slice(0, 4);

  return (
    <>
      {/* HERO — asymmetric editorial slab */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden pt-24">
        <div aria-hidden className="grid-paper pointer-events-none absolute inset-0" />

        <motion.div style={{ y: shift, opacity: fade }} className="relative">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/20 pb-3">
              <p className="label-mono">Est. Department of Information Technology</p>
              <p className="label-mono">PCCoE · Pune · India</p>
            </div>

            <div className="grid gap-8 pt-8 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <SplitWords as="h1" text="Information Technology" className="display-xl" />
                <div className="relative">
                  <SplitWords
                    as="h1"
                    text="Students' Association"
                    delay={0.18}
                    className="display-xl text-outline"
                  />
                </div>
                <motion.div
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="mt-6 h-[6px] w-full bg-acid"
                />
              </div>

              <Reveal delay={0.3} className="flex flex-col justify-end">
                <p className="text-lg leading-relaxed text-muted-foreground">{itsa.tagline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic>
                    <Link
                      to="/events"
                      className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-background"
                    >
                      Explore events
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link
                      to="/teams"
                      className="inline-flex items-center gap-3 border border-foreground/30 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-foreground"
                    >
                      Meet the teams
                    </Link>
                  </Magnetic>
                </div>

                <div className="mt-10 border-l-[6px] border-primary pl-4">
                  <p className="label-mono">Next up</p>
                  <p className="mt-2 font-display text-3xl font-extrabold tracking-tight">
                    {itsa.highlight.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-primary">{itsa.highlight.date}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{itsa.highlight.detail}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <Marquee
            className="mt-14 border-y border-foreground/20 bg-foreground py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-background"
            speed={34}
            items={[
              "18+ events",
              "66 active members",
              "14 specialised teams",
              "IEEE · MLSC · GDGC · NSS",
              "$5000 IEEE grant",
            ]}
          />
        </motion.div>
      </section>

      {/* STATS — big numeral band */}
      <section className="border-b border-foreground/20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {itsa.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="group bg-background px-6 py-12">
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="block font-display text-6xl font-extrabold tracking-tighter text-primary"
              />
              <p className="label-mono mt-4">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <p className="label-mono">01 — Who we are</p>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              Student-run · Faculty-guided
            </p>
          </div>
          <div>
            <SplitWords
              text="A student-run engine for technology, research and responsibility."
              className="display-md"
            />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {itsa.intro}
            </p>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {itsa.mission.slice(0, 3).map((m, i) => (
                <Reveal key={m} delay={i * 0.06}>
                  <li className="flex items-baseline gap-5 py-4">
                    <span className="font-mono text-[10px] text-primary">M{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{m}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </section>

      {/* CLUB BENTO */}
      <section className="border-t border-foreground/20 bg-surface px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-mono">02 — The ecosystem</p>
              <h2 className="mt-4 display-md">Six wings, one association.</h2>
            </div>
            <Link
              to="/clubs"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
            >
              Enter the ecosystem →
            </Link>
          </div>

          <div className="mt-12 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
            {clubs.map((c, i) => (
              <Reveal
                key={c.id}
                delay={i * 0.05}
                className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <article className="ink-card group flex h-full flex-col justify-between p-7 hover:-translate-y-1 hover:offset-shadow-primary">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-primary">{c.code}</p>
                    <p
                      className={`mt-4 font-display font-extrabold tracking-tight ${i === 0 ? "text-5xl sm:text-7xl" : "text-3xl"}`}
                    >
                      {c.short}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{c.domain}</p>
                  </div>
                  <p
                    className={`mt-6 text-sm text-muted-foreground ${i === 0 ? "" : "line-clamp-3"}`}
                  >
                    {c.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST — horizontal filmstrip */}
      <section className="border-t border-foreground/20 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-mono">03 — Recent activity</p>
          <h2 className="mt-4 display-md">Latest from the department floor.</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {latest.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.07}>
                <Link to="/events" className="group block h-full">
                  <article className="ink-card h-full overflow-hidden hover:-translate-y-1 hover:offset-shadow">
                    {e.images?.[0] ? (
                      <div className="aspect-[4/3] overflow-hidden bg-surface-2">
                        <img
                          src={e.images[0]}
                          alt={e.name}
                          loading="lazy"
                          className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <p className="label-mono text-[9px]">{e.date}</p>
                      <p className="mt-3 font-display text-lg font-bold leading-tight">{e.name}</p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
