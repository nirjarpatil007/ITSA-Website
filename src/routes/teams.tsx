import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/fx/motion-primitives";
import { PageHeader } from "@/components/site/page-header";
import teamsData from "@/data/teams.json";

type Member = {
  id: number;
  post?: string;
  position?: string;
  name: string;
  year?: string | null;
  email?: string | null;
  linkedin?: string | null;
  github?: string | null;
  photo?: string | null;
};

type Team = {
  id: number;
  name: string;
  description: string;
  lead?: Member | Member[];
  coLead?: Member | Member[];
  members?: Member[];
};

const teams = teamsData as unknown as Team[];

function toArray(value: Member | Member[] | undefined): Member[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/** Leads, co-leads and members flattened into one ordered roster. */
function roster(team: Team | undefined): Member[] {
  if (!team) return [];
  return [...toArray(team.lead), ...toArray(team.coLead), ...(team.members ?? [])];
}

const title = "Teams — 14 Committees of ITSA | PCCoE Pune";
const description =
  "The people behind ITSA at PCCoE Pune: core team, technical, webmasters, publicity, sports, NSS and every other committee.";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Teams,
});

function Teams() {
  const [active, setActive] = useState<number>(teams[0]?.id ?? 1);
  const team = useMemo(() => teams.find((t) => t.id === active) ?? teams[0], [active]);
  const people = roster(team);
  const total = teams.reduce((n, t) => n + roster(t).length, 0);

  return (
    <>
      <PageHeader
        index="03"
        kicker="People"
        title="Fourteen teams, one association."
        lede="Every committee that keeps the ITSA calendar running, with the students who lead it."
        meta={[
          { label: "Teams", value: String(teams.length) },
          { label: "Members", value: String(total) },
        ]}
      />

      <section className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[280px_1fr]">
        {/* Sticky index rail */}
        <nav aria-label="Teams" className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-mono">Index</p>
          <ul className="mt-4 max-h-[60vh] space-y-px overflow-y-auto pr-1">
            {teams.map((t, i) => {
              const on = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`relative flex w-full items-baseline gap-3 px-3 py-2 text-left font-display text-base font-bold tracking-tight transition-colors ${
                      on ? "text-background" : "hover:text-primary"
                    }`}
                  >
                    {on ? (
                      <motion.span
                        layoutId="team-pill"
                        className="absolute inset-0 -z-10 bg-primary"
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                      />
                    ) : null}
                    <span className="font-mono text-[10px] opacity-70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Poster grid */}
        <div>
          {team ? (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="display-md">{team.name}</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">{team.description}</p>

              <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
                {people.map((m, i) => (
                  <MemberCard key={m.id} member={m} index={i} />
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [broken, setBroken] = useState(false);
  const initials = member.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <Reveal delay={Math.min(index * 0.04, 0.3)} className="group bg-background">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
          {member.photo && !broken ? (
            <img
              src={member.photo}
              alt={member.name}
              loading="lazy"
              onError={() => setBroken(true)}
              className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
            />
          ) : (
            <div className="flex size-full items-center justify-center font-display text-6xl font-extrabold text-outline">
              {initials}
            </div>
          )}
          <span className="absolute left-0 top-0 bg-primary px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-primary-foreground">
            {member.post ?? member.position}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="font-display text-xl font-extrabold leading-tight tracking-tight">
            {member.name}
          </p>
          {member.year ? <p className="mt-1 font-mono text-[10px]">{member.year}</p> : null}
          <div className="mt-4 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
            ) : null}
            {member.github ? (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary underline-offset-4 hover:underline"
              >
                GitHub
              </a>
            ) : null}
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="text-muted-foreground underline-offset-4 hover:underline"
              >
                Email
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
