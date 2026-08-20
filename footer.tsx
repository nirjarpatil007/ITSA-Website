import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const LETTERS = ["I", "T", "S", "A"];

/**
 * Opening sequence: four ink slabs slide in, the wordmark locks, then the
 * panel splits and wipes away. Plays once per browser session.
 */
export function IntroSequence() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem("itsa-intro-v2") === "done") return;
    } catch {
      return;
    }
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("itsa-intro-v2", "done");
      } catch {
        /* ignore */
      }
      setShow(false);
    }, 2200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] grid grid-rows-2"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="grain relative overflow-hidden bg-foreground"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={l}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.09, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-display text-[clamp(4rem,20vw,15rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-background"
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grain relative overflow-hidden bg-foreground"
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute left-1/2 top-[max(4.5rem,14vh)] w-full -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-background/70"
            >
              Information Technology Students&apos; Association · PCCoE Pune
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute bottom-10 left-6 right-6 h-[3px] bg-acid"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
