import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./CaseStudy.css";

function getStudyContent(t, study) {
  const baseContent = t("caseStudy");
  const translatedStudy = t(`caseStudy.studies.${study.id}`);

  return translatedStudy && typeof translatedStudy === "object"
    ? { ...baseContent, ...translatedStudy }
    : baseContent;
}

function StudyContent({ study, content }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="case-heading">
        <h2>{content.title}</h2>
      </div>

      <div className="case-study-details">
        <div className="case-metrics">
          <div>
            <span style={{fontSize: "20px"}}>{t("caseStudy.beforeLabel")}</span>
            <strong>{study.beforeValue}</strong>
            <p style={{fontSize: "20px"}}>{content.before}</p>
          </div>
          <div className="metric-arrow" aria-hidden="true">→</div>
          <div className="after-metric">
            <span style={{fontSize: "20px"}}>{t("caseStudy.afterLabel")}</span>
            <strong>{study.afterValue}</strong>
            <p style={{fontSize: "20px"}}>{content.after}</p>
          </div>
        </div>

        <blockquote style={{fontSize: "20px"}}>
          “{content.testimonial}”
          <cite style={{fontSize: "20px"}}>— {content.author}</cite>
        </blockquote>
      </div>
    </>
  );
}

function CaseStudyCard({ study, content, image, isExpanded, onToggle }) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className={`case-study item case-study--${study.id}${isExpanded ? " is-expanded" : ""}`}
      data-layout-id={study.id}
      aria-expanded={isExpanded}
      aria-controls={`case-study-content-${study.id}`}
      aria-label={`${content.title}. ${t("caseStudy.openLabel") || "Expand case study"}`}
      onClick={onToggle}
    >
      <div className="case-study-cover" aria-hidden="true">
        <img src={image} alt="" loading="lazy" />
      </div>
      <div id={`case-study-content-${study.id}`} className="case-study-card-content">
        <StudyContent study={study} content={content} />
      </div>
    </button>
  );
}

export default function CaseStudy({ study, studies }) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(null);
  const caseStudies = (studies || (study ? [study] : [])).slice(0, 4);
  const studyImages = {
    "perth-a": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
    "melbourne-b": "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=85",
    "brisbane-c": "https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  if (caseStudies.length === 0) return null;

  return (
    <section
      className="case-study-grid"
      aria-label={t("caseStudy.ariaLabel") || "Case studies"}
    >
      <h2 className="case-study-grid-title">{t("caseStudy.eyebrow") || "Case Studies"}</h2>
      <div className="case-study-grid-list">
        {caseStudies.slice(0, 3).map((item) => (
          <CaseStudyCard
            key={item.id}
            study={item}
            content={getStudyContent(t, item)}
            image={studyImages[item.id]}
            isExpanded={activeId === item.id}
            onToggle={() => setActiveId((currentId) => (
              currentId === item.id ? null : item.id
            ))}
          />
        ))}
      </div>
    </section>
  );
}
