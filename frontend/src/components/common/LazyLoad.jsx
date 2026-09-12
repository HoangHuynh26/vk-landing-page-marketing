import { useEffect, useRef, useState } from "react";

export default function LazyLoad({
  children,
  className = "",
  force = false,
  id,
}) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(force);
  const [phase, setPhase] = useState(force ? "done" : "idle");
  // phases: idle → pre-reveal → revealed → done

  useEffect(() => {
    if (force) {
      setShouldRender(true);
      setPhase("done");
      return undefined;
    }

    if (shouldRender) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      setPhase("done");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [force, shouldRender]);

  // Phase 1: content rendered → apply pre-reveal (opacity:0, translateY)
  // Phase 2: next frame → apply revealed (transition to visible)
  // Phase 3: after transition ends → remove transform entirely (phase "done")
  useEffect(() => {
    if (!shouldRender || phase !== "idle") return;
    setPhase("pre-reveal");
  }, [shouldRender, phase]);

  useEffect(() => {
    if (phase !== "pre-reveal") return;
    const raf = requestAnimationFrame(() => {
      setPhase("revealed");
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // After transition completes, clear all transform/opacity styles
  // so they don't interfere with position:sticky inside children
  useEffect(() => {
    if (phase !== "revealed") return;
    const el = containerRef.current;
    if (!el) return;
    const onEnd = () => setPhase("done");
    el.addEventListener("transitionend", onEnd, { once: true });
    // Safety fallback in case transitionend doesn't fire
    const fallback = setTimeout(onEnd, 700);
    return () => {
      el.removeEventListener("transitionend", onEnd);
      clearTimeout(fallback);
    };
  }, [phase]);

  const phaseClass =
    phase === "pre-reveal"
      ? "lazy-pre-reveal"
      : phase === "revealed"
      ? "lazy-revealed"
      : "";

  return (
    <div
      ref={containerRef}
      className={`${className} ${phaseClass}`.trim()}
      id={id}
    >
      {force || shouldRender ? (
        children
      ) : (
        <div className="lazy-section-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
