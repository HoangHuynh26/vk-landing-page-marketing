import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { caseStudies as defaultStudies } from "./caseStudyData";
import "./CaseStudy.css";

export default function CaseStudy({ studies = defaultStudies }) {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState(studies[0]?.id || "perth-fashion-nails");
  const [isPaused, setIsPaused] = useState(false);

  // Giới hạn hiển thị và chạy tối đa 3 tab đầu tiên
  const maxTabs = 3;
  const displayStudies = studies?.slice(0, maxTabs) || [];

  // Tự động chuyển tab sau mỗi 10 giây (1 -> 2 -> 3 -> 1)
  useEffect(() => {
    if (!displayStudies || displayStudies.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setSelectedId((currentId) => {
        const currentIndex = displayStudies.findIndex((s) => s.id === currentId);
        // Nếu không tìm thấy hoặc đang ở cuối (tab 3, index 2) -> quay về index 0
        const nextIndex = (currentIndex + 1) % displayStudies.length;
        return displayStudies[nextIndex]?.id || displayStudies[0]?.id;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [displayStudies.length, isPaused]); // Đã loại bỏ selectedId để timer không bị re-create mỗi lần đổi tab

  const activeStudy = displayStudies.find((s) => s.id === selectedId) || displayStudies[0];
  const translated = t(`caseStudy.studies.${activeStudy?.id}`) || {};
  const isEn = language === "en";

  const unit = translated.unit || (isEn ? (activeStudy?.unitEn || activeStudy?.unit) : activeStudy?.unit);
  const category = translated.category || (isEn ? (activeStudy?.categoryEn || activeStudy?.category) : activeStudy?.category);
  const tags = translated.tags || (isEn ? (activeStudy?.tagsEn || activeStudy?.tags) : (activeStudy?.tags || activeStudy?.tagsEn));

  if (!activeStudy) return null;

  return (
    <section
      className={`case-study-showcase ${isPaused ? "is-paused" : ""}`}
      aria-label={t("caseStudy.eyebrow") || "Case Studies"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="case-study-header">
        <h2 className="case-study-title">{t("caseStudy.title")}</h2>
        <p className="case-study-subtitle">{t("caseStudy.subtitle")}</p>
      </div>

      {/* Salon tabs - Giới hạn 3 tab */}
      <div className="case-study-tabs" role="tablist" aria-label="Select case study">
        {displayStudies.map((item) => {
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
              {isSelected && <span className="case-tab-progress-bar" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {/* Active Case Study Feature Card */}
      <div className="case-study-featured-card" key={activeStudy.id}>
        <div className="case-featured-image-col">
          <img
            src={activeStudy.image}
            alt={activeStudy.name}
            className="case-featured-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="case-featured-content-col">
          <div className="case-featured-meta">
            <span className="case-featured-category">{category}</span>
            <h3 className="case-featured-heading">{translated.title || activeStudy.name}</h3>
            <p className="case-featured-sub">{translated.subTitle}</p>
          </div>

          {/* Before & After comparison grid */}
          <div className="case-comparison-grid">
            <div className="case-metric-box case-metric-before">
              <span className="case-metric-tag">{t("caseStudy.beforeLabel")}</span>
              <div className="case-metric-num-wrap">
                <span className="case-metric-num">{activeStudy.beforeValue}</span>
                <span className="case-metric-unit">{unit}</span>
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
                <span className="case-metric-unit">{unit}</span>
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
            {tags?.map((tag) => (
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