import type { ReactNode } from "react";

/**
 * Infinite horizontal ticker. Children are duplicated so the CSS animation
 * can loop seamlessly at -50%.
 */
export function Marquee({
  items,
  className,
  separator = "◆",
  reverse = false,
  speed = 26,
}: {
  items: ReactNode[];
  className?: string;
  separator?: string;
  reverse?: boolean;
  speed?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8 pr-8">
            {item}
            <span aria-hidden className="text-[0.6em] opacity-60">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
