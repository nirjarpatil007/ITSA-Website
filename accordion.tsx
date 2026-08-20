import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; z: number };

/**
 * Lightweight canvas "IT network" field: depth-layered nodes that drift,
 * link to nearby neighbours and parallax toward the pointer.
 * Pauses off-screen and renders a static frame under reduced motion.
 */
export function ParticleField({ density = 0.00009 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.max(28, Math.round(w * h * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        z: 0.35 + Math.random() * 0.65,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx * n.z;
          n.y += n.vy * n.z;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        const ax = a.x + pointer.x * a.z * 26;
        const ay = a.y + pointer.y * a.z * 26;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const bx = b.x + pointer.x * b.z * 26;
          const by = b.y + pointer.y * b.z * 26;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 132) {
            ctx.strokeStyle = `oklch(0.74 0.185 52 / ${(1 - d / 132) * 0.2 * a.z})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `oklch(0.87 0.17 105 / ${0.16 + a.z * 0.4})`;
        ctx.beginPath();
        ctx.arc(ax, ay, a.z * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: MouseEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );

    build();
    draw();
    io.observe(canvas);
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onPointer, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onPointer);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
