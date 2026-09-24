import { useEffect, useRef, useState } from "react";

export default function LazyLoad({
  children,
  className = "",
  force = false,
  id,
}) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(force);

  useEffect(() => {
    if (force || shouldRender) return;

    const container = containerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [force, shouldRender]);

  return (
    <div
      ref={containerRef}
      className={className}
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
