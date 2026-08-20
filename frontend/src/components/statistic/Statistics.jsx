import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./Statistics.css";

function AnimatedStat({ item }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    let frameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reduceMotion) {
          setCount(item.value);
          observer.disconnect();
          return;
        }

        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / 1600, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 4);

          setCount(Math.round(item.value * easedProgress));

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };

        frameId = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [item.value]);
  return (
    <article className={`statistic-item ${isVisible ? "is-visible" : ""}`}>
      <strong ref={ref}>
        {count}
        {item.suffix}
      </strong>
      <span>{item.label}</span>
    </article>
  );
}

export default function Statistics() {
  const { t } = useLanguage();
  return (
    <section
      className="statistics page-shell"
      aria-labelledby="statistics-title"
    >
      <div className="statistics-grid">
        {t("stats.items").map((item) => (
          <AnimatedStat item={item} key={item.label} />
        ))}
      </div>
    </section>
  );
}
