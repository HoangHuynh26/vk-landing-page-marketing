import { useEffect, useRef, useState } from "react";
import "./LazyLoad.css";

export default function LazyLoad({
  children,
  className = "",
  force = false,
  id,
}) {
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(force);

  useEffect(() => {
    if (force || isRevealed) return;

    const container = containerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px 50px 0px",
        threshold: 0.02,
      },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [force, isRevealed]);

  return (
    <div
      ref={containerRef}
      className={`${className} lazy-reveal-wrapper`}
      id={id}
    >
      <div
        className={`lazy-reveal-inner ${
          isRevealed ? "is-revealed" : "is-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
