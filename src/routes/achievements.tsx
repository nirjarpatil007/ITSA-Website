import { createFileRoute } from "@tanstack/react-router";

import { Counter, Reveal, SplitWords } from "@/components/fx/motion-primitives";
import { PageHeader } from "@/components/site/page-header";
import achievementsData from "@/data/achievements.json";
import { itsa } from "@/data/itsa";

type Achievement = {
  id: number;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image?: string | null;
};

const achievements = achievementsData as unknown as Achievement[];

const title = "Achievements — Awards, Grants & Wins | ITSA PCCoE Pune";
const description =
  "Recognition earned by the IT Department at PCCoE Pune: the IEEE $5000 grant, sports championships and competition wins.";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Achievements,
});

function Achievements() {
  return (
    <>
      <PageHeader
        index="05"
        kicker="Hall of record"
        title="What the department has won."
        lede="Grants, championships and competition results earned by ITSA students and teams."
        meta={itsa.achievementStats.map((s) => ({
          label: s.label,
          value: `${s.value}${s.suffix}`,
        }))}
      />

      {/* NUMERALS */}
      <section className="border-b border-foreground/20 bg-foreground text-background">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 sm:grid-cols-4">
          {itsa.achievementStats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="border-r border-background/20 px-6 py-12 last:border-r-0"
            >
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="block font-display text-5xl font-extrabold tracking-tighter"
              />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.06}>
              <article className="ink-card flex h-full flex-col p-8 hover:-translate-y-1 hover:offset-shadow-primary">
                <div className="flex items-start justify-between gap-4">
                  <span aria-hidden className="text-4xl">
                    {a.emoji}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <SplitWords text={a.title} as="h2" className="mt-6 display-md" />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  {a.subtitle}
                </p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{a.description}</p>

                {a.highlights?.length ? (
                  <ul className="mt-6 space-y-2 border-t border-border pt-5">
                    {a.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-2 h-px w-5 shrink-0 bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {a.image ? (
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="mt-6 aspect-[16/9] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
