import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";

const links = [
  { to: "/", label: "Index" },
  { to: "/about", label: "About" },
  { to: "/clubs", label: "Clubs" },
  { to: "/teams", label: "Teams" },
  { to: "/events", label: "Events" },
  { to: "/achievements", label: "Wins" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-background/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid size-8 place-items-center bg-foreground font-mono text-[10px] font-bold text-background transition-transform duration-300 group-hover:rotate-90">
              IT
            </span>
            <span className="leading-none">
              <span className="block font-display text-base font-extrabold tracking-tight">
                ITSA
              </span>
              <span className="label-mono block text-[8px]">PCCoE · Pune</span>
            </span>
          </Link>

          <nav className="hidden items-center lg:flex">
            {links.map((l, i) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group relative block overflow-hidden px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
                >
                  <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-right scale-x-0 bg-foreground transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 bottom-1 h-[3px] bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span
                    className={active ? "text-foreground" : "text-muted-foreground"}
                    aria-hidden={false}
                  >
                    <span className="mr-1 text-[9px] opacity-50">0{i + 1}</span>
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex size-9 flex-col items-center justify-center gap-1.5 border border-foreground/25 bg-surface lg:hidden"
            >
              <span
                className={`h-px w-4 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
            className="grain fixed inset-0 -z-10 bg-background px-5 pb-10 pt-24 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className="border-b border-border"
                >
                  <Link
                    to={l.to}
                    className="flex items-baseline justify-between py-4 font-display text-4xl font-extrabold tracking-tight"
                  >
                    {l.label}
                    <span className="label-mono">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
