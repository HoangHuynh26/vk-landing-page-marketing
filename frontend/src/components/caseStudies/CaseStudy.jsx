import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./CaseStudy.css";

function CaseStudyCard({ study }) {
  const { t } = useLanguage();
  return (
    <article className={`case-study case-study--${study.id}`}>
      <div className="case-heading">
        <p className="eyebrow dark-eyebrow">{t("caseStudy.eyebrow")}</p>
        <h2>{t("caseStudy.title")}</h2>
      </div>
      <img
        className="case-study-image"
        src="/logo512.png"
        alt="VK Digital Hub"
        width="512"
        height="512"
        loading="lazy"
      />
      <div className="case-metrics">
        <div>
          <span>{t("caseStudy.beforeLabel")}</span>
          <strong>{study.beforeValue}</strong>
          <p>{t("caseStudy.before")}</p>
        </div>
        <div className="metric-arrow" aria-label={t("caseStudy.arrow")}>
          →
        </div>
        <div className="after-metric">
          <span>{t("caseStudy.afterLabel")}</span>
          <strong>{study.afterValue}</strong>
          <p>{t("caseStudy.after")}</p>
        </div>
      </div>
      <blockquote>
        “{t("caseStudy.testimonial")}"<cite>— {t("caseStudy.author")}</cite>
      </blockquote>
    </article>
  );
}

export default function CaseStudy({ study, studies }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselStudies = studies || (study ? [ ] : []);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % carouselStudies.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [carouselStudies.length, isPaused]);

  if (carouselStudies.length <= 1) {
    return <CaseStudyCard study={carouselStudies[0]} />;
  }

  return (
    <section
      className="case-study-carousel"
      aria-label="Case studies"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="case-study-carousel-stage" aria-live="polite">
        <CaseStudyCard
          key={carouselStudies[activeIndex].id}
          study={carouselStudies[activeIndex]}
        />
      </div>
      <div className="case-study-carousel-controls">
        <button type="button" onClick={() => setActiveIndex((index) => (index === 0 ? carouselStudies.length - 1 : index - 1))} aria-label="Previous case study">←</button>
        <div className="case-study-dots" aria-label="Choose a case study">
          {carouselStudies.map((item, index) => (
            <button type="button" className={index === activeIndex ? "is-active" : ""} key={item.id} onClick={() => setActiveIndex(index)} aria-label={`Show case study ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} />
          ))}
        </div>
        <button type="button" onClick={() => setActiveIndex((index) => (index + 1) % carouselStudies.length)} aria-label="Next case study">→</button>
      </div>
    </section>
  );
}
