import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./PainSolution.css";

const cardImages = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
];

function PainCardContent({ card, t }) {
  return (
    <>
      <div className="pain-heading">
        <h3>{card.title}</h3>
      </div>
      <div className="pain-details">
        <p className="pain-text">{card.pain}</p>
        <div className="pain-solution-block">
          <b>{t("nav.online")}</b>
          <p>{card.online}</p>
        </div>
        <div className="pain-solution-block">
          <b>{t("nav.offline")}</b>
          <p>{card.offline}</p>
        </div>
      </div>
    </>
  );
}

function PainCard({ card, index, image, isExpanded, onToggle, t }) {
  return (
    <button
      type="button"
      className={`pain-item pain-item--${index}${isExpanded ? " is-expanded" : ""}`}
      aria-expanded={isExpanded}
      aria-controls={`pain-content-${index}`}
      aria-label={`${card.title}. ${isExpanded ? "Collapse" : "Expand"}`}
      onClick={onToggle}
    >
      <div className="pain-cover" aria-hidden="true">
        <img src={image} alt="" loading="lazy" />
      </div>
      <div id={`pain-content-${index}`} className="pain-card-content">
        <span className="pain-number">0{index + 1}</span>
        <PainCardContent card={card} t={t} />
      </div>
    </button>
  );
}

export default function PainSolution() {
  const { t } = useLanguage();
  const cards = t("pain.cards");
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="pain-solution page-shell" aria-labelledby="pain-title">
      <h2 id="pain-title">
        {t("pain.title")}
        <br />
        <em>{t("pain.emphasis")}</em>
      </h2>
      <div className="pain-grid">
        {cards.map((card, index) => (
          <PainCard
            key={card.title}
            card={card}
            index={index}
            image={cardImages[index]}
            isExpanded={activeIndex === index}
            onToggle={() =>
              setActiveIndex((current) =>
                current === index ? null : index
              )
            }
            t={t}
          />
        ))}
      </div>
    </section>
  );
}
