import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "itsa-theme";

/** Inline script string: applies the stored theme before first paint. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.classList.toggle("dark",t==="dark");}catch(e){}})();`;

export function ThemeToggle({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const dark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`group relative inline-flex h-9 w-[68px] items-center border border-foreground/25 bg-surface px-1 transition-colors hover:border-foreground/60 ${className ?? ""}`}
    >
      <motion.span
        aria-hidden
        layout
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 34 }}
        className="absolute h-7 w-7 bg-foreground"
        style={{ left: dark ? "calc(100% - 32px)" : "4px" }}
      />
      <span
        aria-hidden
        className={`relative z-10 grid h-7 w-7 place-items-center font-mono text-[10px] transition-colors ${dark ? "text-muted-foreground" : "text-background"}`}
      >
        ☀
      </span>
      <span
        aria-hidden
        className={`relative z-10 ml-auto grid h-7 w-7 place-items-center font-mono text-[10px] transition-colors ${dark ? "text-background" : "text-muted-foreground"}`}
      >
        ☾
      </span>
    </button>
  );
}
