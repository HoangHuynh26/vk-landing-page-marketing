import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./PainSolution.css";

const cardImages = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85&fm=webp",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85&fm=webp",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85&fm=webp",
];

const cardIcons = [
  // 1: Megaphone / Ads & Marketing Performance
  <svg
    key="megaphone"
    viewBox="0 0 28 28"
    fill="none"
    className="pain-svg pain-svg--ads"
  >
    <defs>
      <linearGradient id="pain-grad-ads" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
      </linearGradient>
    </defs>
    <path
      d="M16 6L7 10H3.5C2.67 10 2 10.67 2 11.5V16.5C2 17.33 2.67 18 3.5 18H7L16 22V6Z"
      fill="url(#pain-grad-ads)"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M7 18V22.5C7 23.33 7.67 24 8.5 24H9.5C10.33 24 11 23.33 11 22.5V17"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M19.5 10C21.2 11.4 22 12.8 22 14C22 15.2 21.2 16.6 19.5 18"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      className="pain-wave pain-wave--1"
    />
    <path
      d="M23 7C25.5 9.2 26.5 11.5 26.5 14C26.5 16.5 25.5 18.8 23 21"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeDasharray="2 3"
      className="pain-wave pain-wave--2"
    />
    <circle cx="18" cy="5" r="1.4" fill="currentColor" />
  </svg>,

  // 2: Salon Branding / Luxury Sparkles & Diamond Presence
  <svg
    key="sparkles"
    viewBox="0 0 28 28"
    fill="none"
    className="pain-svg pain-svg--salon"
  >
    <defs>
      <linearGradient id="pain-grad-salon" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <path
      d="M14 2C14 8.5 17.5 12 24 14C17.5 16 14 19.5 14 26C14 19.5 10.5 16 4 14C10.5 12 14 8.5 14 2Z"
      fill="url(#pain-grad-salon)"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      className="pain-star-main"
    />
    <path
      d="M22 3L23 5.5L25.5 6.5L23 7.5L22 10L21 7.5L18.5 6.5L21 5.5L22 3Z"
      fill="currentColor"
      className="pain-star-sec"
    />
    <path
      d="M6 19L6.8 20.8L8.5 21.5L6.8 22.2L6 24L5.2 22.2L3.5 21.5L5.2 20.8L6 19Z"
      fill="currentColor"
      className="pain-star-micro"
    />
  </svg>,

  // 3: Marketing Automation / Smart Chronometer & Lightning Speed
  <svg
    key="clock"
    viewBox="0 0 28 28"
    fill="none"
    className="pain-svg pain-svg--time"
  >
    <defs>
      <linearGradient id="pain-grad-time" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
      </linearGradient>
    </defs>
    <circle
      cx="13"
      cy="14.5"
      r="10.5"
      fill="url(#pain-grad-time)"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M13 8.5V14.5L17 16.5"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L16 9.5H21L18 15.5L25 7.5H20L22 2Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinejoin="round"
      className="pain-bolt"
    />
    <circle cx="13" cy="14.5" r="1.4" fill="currentColor" />
  </svg>,
];

const onlineIcon = (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className="pain-solution-badge-svg"
  >
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M10 2.5C12 5.5 13.2 7.7 13.2 10C13.2 12.3 12 14.5 10 17.5C8 14.5 6.8 12.3 6.8 10C6.8 7.7 8 5.5 10 2.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M2.8 10H17.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="14" cy="5" r="1.6" fill="currentColor" />
  </svg>
);

const offlineIcon = (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    className="pain-solution-badge-svg"
  >
    <path
      d="M3 7.5L4.5 3.5H15.5L17 7.5V16C17 16.55 16.55 17 16 17H4C3.45 17 3 16.55 3 16V7.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M3 7.5C3 8.7 3.9 9.7 5.2 9.7C6.4 9.7 7.3 8.7 7.5 7.5C7.7 8.7 8.6 9.7 9.8 9.7C11.1 9.7 12 8.7 12.2 7.5C12.4 8.7 13.3 9.7 14.6 9.7C15.8 9.7 16.8 8.7 17 7.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path d="M8 17V12.5H12V17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

function PainCardContent({ card, t }) {
  return (
    <>
      <div className="pain-heading">
        <h3>{card.title}</h3>
      </div>
      <div className="pain-details">
        <p className="pain-text">{card.pain}</p>
        <div className="pain-solution-block">
          <div className="pain-solution-title pain-solution-title--online">
            <span className="pain-solution-icon" aria-hidden="true">
              {onlineIcon}
            </span>
            <b>{t("nav.online")}</b>
          </div>
          <p>{card.online}</p>
        </div>
        <div className="pain-solution-block">
          <div className="pain-solution-title pain-solution-title--offline">
            <span className="pain-solution-icon" aria-hidden="true">
              {offlineIcon}
            </span>
            <b>{t("nav.offline")}</b>
          </div>
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
        <div className="pain-card-header-row">
          <div className="pain-header-left">
            <span className="pain-number">0{index + 1}</span>
            <div className={`pain-card-icon-wrap pain-card-icon-wrap--${index}`}>
              <div className="pain-card-icon-glow" aria-hidden="true" />
              <span className={`pain-card-icon pain-card-icon--${index}`} aria-hidden="true">
                {cardIcons[index]}
              </span>
            </div>
          </div>
          <span className="pain-toggle-badge" aria-hidden="true">
            <svg
              className="pain-toggle-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" className="pain-toggle-vertical" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </div>
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
      {t("pain.eyebrow") && (
        <p
          style={{ fontSize: "20px", fontFamily: "SF Pro", color: "#0f766e" }}
          className="eyebrow dark-eyebrow"
        >
          {t("pain.eyebrow")}
        </p>
      )}
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
