import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";

const ROUTE_KEYS: Record<string, string> = {
  "/": "index",
  "/about": "about",
  "/clubs": "clubs",
  "/teams": "teams",
  "/events": "events",
  "/achievements": "achievements",
  "/contact": "contact",
};

/** Ink-slab wipe between routes plus per-route accent identity. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();
  const key = ROUTE_KEYS[pathname] ?? "index";

  useEffect(() => {
    document.documentElement.dataset["route"] = key;
  }, [key]);

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          style={{ transformOrigin: "top" }}
          className="pointer-events-none fixed inset-0 z-[120] bg-primary"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
