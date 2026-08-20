import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Reveal } from "@/components/fx/motion-primitives";
import { PageHeader } from "@/components/site/page-header";
import { clubs } from "@/data/clubs";

const title = "Clubs & Chapters — IEEE, MLSC, GDGC | ITSA PCCoE";
const description =
  "The six wings operating under ITSA at PCCoE Pune: IEEE Student Branch, MLSC, GDGC, NSS and the ITSA core body, with their domains and activities.";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Clubs,
});

function Clubs() {
  const [open, setOpen] = useState<string>(clubs[0]?.id ?? "");

  return (
    <>
      <PageHeader
        index="02"
        kicker="Ecosystem"
        title="Wings of the association."
        lede="Each chapter runs its own calendar, but shares one department, one committee structure and one goal."
        meta={[{ label: "Chapters", value: String(clubs.length) }]}
      />

      {/* ACCORDION DIRECTORY */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8">
        <div className="border-t border-foreground/20">
          {clubs.map((c, i) => {
            const isOpen = open === c.id;
            return (
              <div key={c.id} className="border-b border-foreground/20">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : c.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-7 text-left"
                >
                  <span className="font-mono text-[10px] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-[clamp(1.8rem,5.5vw,4.2rem)] font-extrabold leading-none tracking-tighter transition-all duration-500 ${
                      isOpen ? "text-primary" : "group-hover:text-outline"
                    }`}
                  >
                    {c.short}
                  </span>
                  <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                    {c.domain}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[1.3fr_1fr]">
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.2em] text-primary">
                            {c.code}
                          </p>
                          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                            {c.description}
                          </p>
                          <p className="mt-6 font-display text-xl font-bold">{c.name}</p>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <p className="label-mono text-[9px]">Activities</p>
                            <ul className="mt-3 space-y-2">
                              {c.activities.map((a) => (
                                <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                                  <span className="mt-2 h-px w-5 shrink-0 bg-primary" />
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="ink-card p-4">
                              <p className="label-mono text-[9px]">Faculty</p>
                              <p className="mt-2 text-sm">{c.facultyCoordinator}</p>
                            </div>
                            <div className="ink-card p-4">
                              <p className="label-mono text-[9px]">Student lead</p>
                              <p className="mt-2 text-sm">{c.studentCoordinator}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
        <Reveal>
          <p className="max-w-3xl border-l-[6px] border-primary pl-5 text-sm text-muted-foreground">
            Fields marked as placeholders are awaiting official confirmation from the department;
            everything else is published information.
          </p>
        </Reveal>
      </section>
    </>
  );
}
