import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { Reveal, SplitWords } from "@/components/fx/motion-primitives";
import { PageHeader } from "@/components/site/page-header";
import { itsa, storyChapters } from "@/data/itsa";

const title = "About ITSA — Vision, Mission & Leadership | PCCoE Pune";
const description =
  "How the Information Technology Students' Association at PCCoE Pune is organised: vision, mission, president's goals and faculty leadership.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: About,
});

function About() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.9", "end 0.4"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <>
      <PageHeader
        index="01"
        kicker="About the association"
        title="A department, organised."
        lede={itsa.intro}
        meta={[
          { label: "Department", value: "Information Technology" },
          { label: "Institute", value: "PCCoE, Pune" },
          { label: "Teams", value: "14" },
          { label: "Members", value: "66" },
        ]}
      />

      {/* CHAPTERS — vertical progress spine */}
      <section ref={trackRef} className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[80px_1fr]">
          <div className="relative hidden lg:block">
            <div className="sticky top-32 h-[50vh] w-px bg-border">
              <motion.div
                style={{ scaleY: progress, transformOrigin: "top" }}
                className="h-full w-[3px] -translate-x-px bg-primary"
              />
            </div>
          </div>

          <div className="space-y-24">
            {storyChapters.map((c, i) => (
              <Reveal key={c.key} className="grid gap-6 md:grid-cols-[auto_1fr]">
                <span className="font-display text-6xl font-extrabold leading-none text-outline">
                  0{i + 1}
                </span>
                <div>
                  <p className="label-mono">{c.kicker}</p>
                  <SplitWords text={c.title} className="mt-4 display-md max-w-[22ch]" />
                  <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISION SLAB */}
      <section className="border-y border-foreground/20 bg-foreground px-5 py-24 text-background sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">Vision</p>
          <SplitWords text={itsa.vision} className="mt-6 max-w-[24ch] display-md" />
        </div>
      </section>

      {/* MISSION GRID */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <p className="label-mono">Mission</p>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {itsa.mission.map((m, i) => (
            <Reveal key={m} delay={i * 0.05} className="bg-background p-8">
              <span className="font-mono text-[10px] text-primary">M{i + 1}</span>
              <p className="mt-4 text-lg leading-snug">{m}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRESIDENT'S GOALS */}
      <section className="border-t border-foreground/20 bg-surface px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display-md">President's goals</h2>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {itsa.presidentGoals.map((g, i) => (
              <li key={g} className="group flex items-baseline gap-6 py-5 transition-colors">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
                  {g}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8">
        <p className="label-mono">Faculty leadership</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {itsa.leadership.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.07}>
              <article className="ink-card p-8 hover:-translate-y-1 hover:offset-shadow-primary">
                <p className="font-display text-2xl font-extrabold tracking-tight">{l.name}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {l.role}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
