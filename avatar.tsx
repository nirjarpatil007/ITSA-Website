import { motion, useReducedMotion } from "motion/react";

import { SplitWords } from "@/components/fx/motion-primitives";

/**
 * Shared editorial masthead. Each page passes its own index number and
 * metadata row so the tabs read as separate publications.
 */
export function PageHeader({
  index,
  kicker,
  title,
  lede,
  meta,
}: {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  meta?: { label: string; value: string }[];
}) {
  const reduced = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-foreground/20 px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36">
      <div aria-hidden className="grid-paper pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-none text-primary">
            {index}
          </span>
          <span className="label-mono">{kicker}</span>
        </div>

        <SplitWords as="h1" text={title} className="mt-6 max-w-[18ch] display-lg" />

        {lede ? (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            {lede}
          </motion.p>
        ) : null}

        {meta?.length ? (
          <dl className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="bg-background px-4 py-4">
                <dt className="label-mono text-[9px]">{m.label}</dt>
                <dd className="mt-2 font-display text-xl font-bold">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </header>
  );
}
