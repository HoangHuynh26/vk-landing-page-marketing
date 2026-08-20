import { useEffect, useRef, useState } from "react";
import "./TrustBar.css";
import { useLanguage } from "../../i18n/LanguageContext";

function Counter({ value, suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / 1000, 1);
          setCount(
            Number((value * (1 - Math.pow(1 - progress, 3))).toFixed(decimals)),
          );
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, decimals]);
  return (
    <strong ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </strong>
  );
}

export default function TrustBar() {
  const { t } = useLanguage();
  return (
    <section className="trustbar page-shell" aria-label="Trust indicators">
      <div className="trustbar-rating">
        <span className="stars" aria-label="5 stars">
          ★★★★★
        </span>
        <div>
          <Counter value={4.9} suffix="/5" decimals={1} />{" "}
          <small>{t("trust.rating")}</small>
        </div>
      </div>
      <div className="trustbar-support">
        <p>{t("trust.support")}</p>
      </div>
      <div className="trust-badges">
        <span className="secure-badge">
          <i aria-hidden="true" />
          {t("trust.sslSecure")}
        </span>
        <span>{t("trust.visa")}</span>
        <span>{t("trust.mastercard")}</span>
      </div>
    </section>
  );
}
