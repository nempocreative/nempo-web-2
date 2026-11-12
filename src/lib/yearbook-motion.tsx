// Shared motion helpers for the year book pages.
// Everything runs client-side only: SSR and the first client render produce the
// same markup (hidden state), then IntersectionObserver reveals content.
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A positive bottom margin widens the observer root below the fold, so anything
// already on screen is always counted (a negative margin can strand content in
// the bottom strip of a page that cannot scroll any further).
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.01, rootMargin = "0px 0px 8% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || prefersReduced()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

/** Fade + slide a block in the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : `translate3d(${x}px,${y}px,0)`,
        transition: `opacity .75s ease ${delay}ms, transform .85s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Container that fades its direct children up in sequence once it is in view.
 * Pair with the `.yb-stagger` rules in src/styles.css and give each child an
 * inline `animationDelay` for the sequence step.
 */
export function useStagger<T extends HTMLElement = HTMLDivElement>(threshold = 0.01) {
  const { ref, inView } = useInView<T>(threshold);
  return { ref, className: `yb-stagger${inView ? " on" : ""}` };
}

/** Count from 0 to `target` once `active` turns true. */
export function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReduced() || typeof requestAnimationFrame === "undefined") {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

/** 0 → 1 reading progress of the whole document. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/* ───────── Luxe extras ───────── */

/** Pointer handlers for a 3D tilt + glare card (mouse only; touch is left alone). */
export function tiltHandlers(max = 8) {
  return {
    onPointerMove(e: ReactPointerEvent<HTMLElement>) {
      if (e.pointerType !== "mouse" || prefersReduced()) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${((px - 0.5) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - py) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.classList.add("is-tilting");
    },
    onPointerLeave(e: ReactPointerEvent<HTMLElement>) {
      const el = e.currentTarget;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    },
  };
}

/** Moves a soft spotlight (CSS vars --sx/--sy) with the mouse. */
export function spotlightHandler(e: ReactPointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--sx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
  el.style.setProperty("--sy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
}

/** Cover content drifts down, shrinks a little and fades as the reader scrolls away. */
export function useScrollFade<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      if (y > vh * 1.3) return;
      const p = Math.min(1, Math.max(0, y / vh));
      el.style.transform = `translate3d(0,${(y * 0.32).toFixed(1)}px,0) scale(${(1 - p * 0.07).toFixed(4)})`;
      el.style.opacity = Math.max(0, 1 - p * 1.15).toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

/** Id of the section currently crossing the middle of the screen. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const id of key.split("|")) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [key]);
  return active;
}

/** Deterministic floating gold dust (same markup on server and client). */
export function GoldDust({ count = 26, seed = 7, className = "" }: { count?: number; seed?: number; className?: string }) {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const dots = Array.from({ length: count }, (_, i) => ({
    x: (rnd() * 100).toFixed(2),
    y: (25 + rnd() * 80).toFixed(2),
    size: (2 + rnd() * 6).toFixed(1),
    dur: (9 + rnd() * 10).toFixed(2),
    delay: (rnd() * 18).toFixed(2),
    dx: Math.round((rnd() - 0.5) * 120),
    o: (0.35 + rnd() * 0.55).toFixed(2),
    dia: i % 4 === 0,
  }));
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((d, i) => (
        <span
          key={i}
          className={`yb-dust${d.dia ? " dia" : ""}`}
          style={
            {
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              "--d": `${d.dur}s`,
              "--dl": `-${d.delay}s`,
              "--dx": `${d.dx}px`,
              "--o": d.o,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
