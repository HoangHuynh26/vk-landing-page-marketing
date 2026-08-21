import { useEffect, useRef, useState } from "react";

export default function LazyLoad({ children, className = "", force = false }) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(force);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {force || shouldRender ? children : <div className="lazy-section-placeholder" aria-hidden="true" />}
    </div>
  );
}
