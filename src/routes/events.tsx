import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SplitWords } from "@/components/fx/motion-primitives";
import { PageHeader } from "@/components/site/page-header";
import eventsData from "@/data/events.json";

type EventItem = {
  id: number;
  name: string;
  overview: string;
  date: string;
  images?: string[];
};

const events = eventsData as unknown as EventItem[];

const title = "Events — Competitions, Workshops & Drives | ITSA PCCoE";
const description =
  "Every ITSA event at PCCoE Pune: BRUTEFORGE, WebCrafter, AI expert sessions, higher-studies guidance, NSS drives and more.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <>
      <PageHeader
        index="04"
        kicker="Calendar"
        title="The record of the floor."
        lede="An event log of everything the association has run — competitions, workshops, sessions and community drives."
        meta={[
          { label: "Logged events", value: String(events.length) },
          { label: "Format", value: "Zigzag timeline" },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8">
        <div className="space-y-20">
          {events.map((e, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={e.id}>
                <article
                  className={`grid items-center gap-8 border-t border-foreground/20 pt-8 lg:grid-cols-2 ${
                    flip ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="group relative overflow-hidden bg-surface-2">
                    {e.images?.[0] ? (
                      <img
                        src={e.images[0]}
                        alt={e.name}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover grayscale transition-all duration-[900ms] group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="grid aspect-[16/10] w-full place-items-center font-display text-5xl font-extrabold text-outline">
                        ITSA
                      </div>
                    )}
                    <figcaption className="absolute bottom-0 left-0 bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
                      {e.date}
                    </figcaption>
                  </figure>

                  <div className={flip ? "lg:pr-8" : "lg:pl-8"}>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      LOG {String(i + 1).padStart(2, "0")}
                    </p>
                    <SplitWords text={e.name} className="mt-4 display-md" />
                    <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                      {e.overview}
                    </p>

                    {e.images && e.images.length > 1 ? (
                      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                        {e.images.slice(1, 6).map((src, si) => (
                          <img
                            key={`${e.id}-${si}`}
                            src={src}
                            alt=""
                            loading="lazy"
                            className="size-20 shrink-0 object-cover grayscale transition-all duration-500 hover:grayscale-0"
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
