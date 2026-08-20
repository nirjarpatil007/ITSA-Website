import { useEffect, useState } from "react";

/**
 * Desktop-only cursor accent: a soft ember ring that trails the native pointer.
 * The native cursor stays visible so clicking and text selection feel normal.
 */
export function CursorFX() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let hx = x;
    let hy = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      setHot(Boolean(target?.closest("a, button, [data-cursor='hot']")));
    };

    const loop = () => {
      const halo = document.getElementById("cursor-halo");
      hx += (x - hx) * 0.18;
      hy += (y - hy) * 0.18;
      if (halo) halo.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        id="cursor-halo"
        className="fixed left-0 top-0 rounded-full transition-[width,height,opacity] duration-300"
        style={{
          width: hot ? 64 : 28,
          height: hot ? 64 : 28,
          opacity: hot ? 1 : 0.6,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--ember) 22%, transparent), transparent 70%)",
          border: "1px solid color-mix(in oklch, var(--ember) 40%, transparent)",
        }}
      />
    </div>
  );
}
