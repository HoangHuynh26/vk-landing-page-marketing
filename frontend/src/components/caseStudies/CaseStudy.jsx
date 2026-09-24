import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { caseStudies as defaultStudies } from "./caseStudyData";
import "./CaseStudy.css";

export default function CaseStudy({ studies = defaultStudies }) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(studies[0]?.id || "perth-fashion-nails");

  const activeStudy = studies.find((s) => s.id === selectedId) || studies[0];
  const translated = t(`caseStudy.studies.${activeStudy.id}`) || {};

  return (
    <section
      className="case-study-showcase"
      aria-label={t("caseStudy.eyebrow") || "Case Studies"}
    >
      <div className="case-study-header">
        <span className="case-study-eyebrow">{t("caseStudy.eyebrow")}</span>
        <h2 className="case-study-title">{t("caseStudy.title")}</h2>
        <p className="case-study-subtitle">{t("caseStudy.subtitle")}</p>
      </div>

      {/* Salon tabs */}
      <div className="case-study-tabs" role="tablist" aria-label="Select case study">
        {studies.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isSelected}
              className={`case-study-tab-btn ${isSelected ? "is-selected" : ""}`}
              onClick={() => setSelectedId(item.id)}
            >
              <span className="case-tab-city">{item.city}</span>
              <strong className="case-tab-name">{item.name}</strong>
              <span className="case-tab-badge">{item.growth}</span>
            </button>
          );
        })}
      </div>

      {/* Active Case Study Feature Card */}
      <div className="case-study-featured-card">
        <div className="case-featured-image-col">
          <img
            src={activeStudy.image}
            alt={activeStudy.name}
            className="case-featured-img"
            loading="lazy"
            decoding="async"
          />
          <div className="case-featured-overlay">
            <span className="case-featured-city-tag">{activeStudy.city}</span>
            <span className="case-featured-growth-tag">{activeStudy.highlight}</span>
          </div>
        </div>

        <div className="case-featured-content-col">
          <div className="case-featured-meta">
            <span className="case-featured-category">{activeStudy.category}</span>
            <h3 className="case-featured-heading">{translated.title || activeStudy.name}</h3>
            <p className="case-featured-sub">{translated.subTitle}</p>
          </div>

          {/* Before & After comparison grid */}
          <div className="case-comparison-grid">
            <div className="case-metric-box case-metric-before">
              <span className="case-metric-tag">{t("caseStudy.beforeLabel")}</span>
              <div className="case-metric-num-wrap">
                <span className="case-metric-num">{activeStudy.beforeValue}</span>
                <span className="case-metric-unit">{activeStudy.unit}</span>
              </div>
              <p className="case-metric-detail">{translated.before}</p>
            </div>

            <div className="case-metric-arrow-divider" aria-hidden="true">
              ➔
            </div>

            <div className="case-metric-box case-metric-after">
              <span className="case-metric-tag case-tag-gold">{t("caseStudy.afterLabel")}</span>
              <div className="case-metric-num-wrap">
                <span className="case-metric-num case-num-primary">{activeStudy.afterValue}</span>
                <span className="case-metric-unit">{activeStudy.unit}</span>
              </div>
              <p className="case-metric-detail">{translated.after}</p>
            </div>
          </div>

          {/* Testimonial Quote */}
          {translated.testimonial && (
            <div className="case-client-quote">
              <div className="case-quote-icon" aria-hidden="true">“</div>
              <p className="case-quote-text">{translated.testimonial}</p>
              <cite className="case-quote-author">— {translated.author}</cite>
            </div>
          )}

          {/* Real tags */}
          <div className="case-tags-list">
            {activeStudy.tags?.map((tag) => (
              <span key={tag} className="case-tag-pill">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
