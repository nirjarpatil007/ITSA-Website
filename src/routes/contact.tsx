import { createFileRoute } from "@tanstack/react-router";

import { Marquee } from "@/components/fx/marquee";
import { Magnetic, Reveal, SplitWords } from "@/components/fx/motion-primitives";
import { PageHeader } from "@/components/site/page-header";
import { itsa } from "@/data/itsa";

const title = "Contact ITSA — IT Department, PCCoE Pune";
const description =
  "Reach the Information Technology Students' Association at PCCoE Pune: department email, phone, address and faculty coordinators.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contact,
});

const channels = [
  { label: "Email", value: itsa.contact.email, href: `mailto:${itsa.contact.email}` },
  {
    label: "Phone",
    value: itsa.contact.phone,
    href: `tel:${itsa.contact.phone.replace(/\s/g, "")}`,
  },
  { label: "Address", value: itsa.contact.address, href: null },
] as const;

function Contact() {
  return (
    <>
      <PageHeader
        index="06"
        kicker="Get in touch"
        title="Talk to the association."
        lede="Questions about an event, a collaboration, or joining a team? Reach the department directly."
      />

      <section className="mx-auto grid max-w-[1600px] gap-px bg-border px-0 py-0 lg:grid-cols-2">
        {/* Channels */}
        <div className="bg-background px-5 py-16 sm:px-8">
          <p className="label-mono">Channels</p>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {channels.map((c) => (
              <div key={c.label} className="py-6">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.label}
                </dt>
                <dd className="mt-2">
                  {c.href ? (
                    <Magnetic>
                      <a
                        href={c.href}
                        className="font-display text-2xl font-extrabold tracking-tight text-primary underline-offset-8 hover:underline sm:text-3xl"
                      >
                        {c.value}
                      </a>
                    </Magnetic>
                  ) : (
                    <span className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {c.value}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Faculty */}
        <div className="bg-surface px-5 py-16 sm:px-8">
          <p className="label-mono">Faculty coordinators</p>
          <div className="mt-8 space-y-4">
            {itsa.leadership.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.07}>
                <div className="ink-card flex items-baseline justify-between gap-4 p-6 hover:-translate-y-1 hover:offset-shadow">
                  <p className="font-display text-xl font-extrabold tracking-tight">{l.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    {l.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <SplitWords
            text="Information Technology Department, PCCoE, Pune."
            className="mt-12 display-md max-w-[16ch]"
          />
        </div>
      </section>

      <Marquee
        className="border-y border-foreground/20 bg-foreground py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-background"
        speed={30}
        items={["Say hello", "Collaborate", "Sponsor an event", "Join a team"]}
      />
    </>
  );
}
