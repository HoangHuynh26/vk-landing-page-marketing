import { useLanguage } from "../../i18n/LanguageContext";
import "./PainSolution.css";

const cardImages = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85&fm=webp",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85&fm=webp",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85&fm=webp",
];

const cardMeta = [
  {
    tagVi: "CHIẾN DỊCH QUẢNG CÁO TẬP TRUNG",
    tagEn: "HYPERLOCAL TARGETED ADS",
    badgeVi: "Google & Meta Ads · Tối ưu chuyển đổi",
    badgeEn: "Google & Meta Ads · High Conversion",
    color: "#0f766e",
    accentLight: "rgba(15, 118, 110, 0.08)",
    borderAccent: "rgba(15, 118, 110, 0.22)",
  },
  {
    tagVi: "THƯƠNG HIỆU & GIỮ CHÂN KHÁCH VIP",
    tagEn: "BRAND IDENTITY & VIP RETENTION",
    badgeVi: "Định vị 5 sao · Khách tự giới thiệu",
    badgeEn: "5-Star Reputation · VIP Referrals",
    color: "#c9974e",
    accentLight: "rgba(201, 151, 78, 0.09)",
    borderAccent: "rgba(201, 151, 78, 0.25)",
  },
  {
    tagVi: "HỆ THỐNG VẬN HÀNH TỰ ĐỘNG",
    tagEn: "AUTOMATED CRM & APPOINTMENTS",
    badgeVi: "Giải phóng 5–7 giờ/tuần · Chốt lịch 24/7",
    badgeEn: "Save 5–7h/week · 24/7 Booking Bot",
    color: "#d97757",
    accentLight: "rgba(217, 119, 87, 0.09)",
    borderAccent: "rgba(217, 119, 87, 0.24)",
  },
];

const cardIcons = [
  // 1: Megaphone / Ads & Marketing Performance
  <svg key="megaphone" viewBox="0 0 28 28" fill="none" className="pain-svg pain-svg--ads">
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
  <svg key="sparkles" viewBox="0 0 28 28" fill="none" className="pain-svg pain-svg--salon">
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
  <svg key="clock" viewBox="0 0 28 28" fill="none" className="pain-svg pain-svg--time">
    <defs>
      <linearGradient id="pain-grad-time" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
      </linearGradient>
    </defs>
    <circle cx="13" cy="14.5" r="10.5" fill="url(#pain-grad-time)" stroke="currentColor" strokeWidth="1.8" />
    <path d="M13 8.5V14.5L17 16.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
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
  <svg viewBox="0 0 20 20" fill="none" className="pain-solution-badge-svg">
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
  <svg viewBox="0 0 20 20" fill="none" className="pain-solution-badge-svg">
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

export default function PainSolution() {
  const { t, language } = useLanguage();
  const cards = t("pain.cards") || [];
  const isEn = language === "en";

  return (
    <section className="pain-solution page-shell" aria-labelledby="pain-title">
      <div className="pain-section-header">
        {t("pain.eyebrow") && (
          <p className="eyebrow dark-eyebrow pain-eyebrow">
            {t("pain.eyebrow")}
          </p>
        )}
        <h2 id="pain-title">
          {t("pain.title")}
          <br />
          <em>{t("pain.emphasis")}</em>
        </h2>
      </div>

      {/* Stacking Cards on Scroll Container */}
      <div className="pain-stack-container">
        {cards.map((card, index) => {
          const meta = cardMeta[index] || cardMeta[0];
          const tag = isEn ? meta.tagEn : meta.tagVi;

          return (
            <article
              key={`${card.title}-${index}`}
              className={`pain-stack-card pain-stack-card--${index}`}
              style={{
                "--card-index": index,
                "--card-color": meta.color,
                "--card-light": meta.accentLight,
                "--card-border": meta.borderAccent,
              }}
            >
              {/* Colorful Top Accent Line */}
              <div className="pain-stack-accent-bar" style={{ background: meta.color }} />

              <div className="pain-stack-card-inner">
                {/* Left: Content & Solutions */}
                <div className="pain-stack-content-col">
                  {/* Category & Icon Header */}
                  <div className="pain-stack-header-row">
                    <div className="pain-stack-tag-wrap">
                      <span className="pain-stack-num" style={{ color: meta.color }}>
                        0{index + 1}
                      </span>
                      <span
                        className="pain-stack-tag"
                        style={{
                          color: meta.color,
                          background: meta.accentLight,
                          borderColor: meta.borderAccent,
                        }}
                      >
                        {tag}
                      </span>
                    </div>

                    <div className={`pain-card-icon-wrap pain-card-icon-wrap--${index}`}>
                      <div className="pain-card-icon-glow" aria-hidden="true" />
                      <span className={`pain-card-icon pain-card-icon--${index}`} aria-hidden="true">
                        {cardIcons[index]}
                      </span>
                    </div>
                  </div>

                  <h3 className="pain-stack-card-title">{card.title}</h3>

                  {/* Pain Point Quote Box */}
                  <div className="pain-stack-pain-box">
                    <div className="pain-stack-pain-header">
                      <svg viewBox="0 0 20 20" width="15" height="15" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{isEn ? "THE REAL CHALLENGE" : "VẤN ĐỀ THỰC TẾ"}</span>
                    </div>
                    <p className="pain-stack-pain-text">“{card.pain}”</p>
                  </div>

                  {/* Our Solution Heading */}
                  <div className="pain-stack-solution-header">
                    <span className="pain-stack-solution-badge" style={{ color: meta.color }}>
                      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{t("pain.solutionHeading") || (isEn ? "Our Solutions" : "Giải pháp của chúng tôi")}</span>
                    </span>
                  </div>

                  {/* Dual Solutions Grid */}
                  <div className="pain-stack-solutions-grid">
                    {/* Online Solution */}
                    <div className="pain-stack-solution-card online">
                      <div className="solution-badge-pill online">
                        <span className="solution-badge-icon" aria-hidden="true">{onlineIcon}</span>
                        <strong>{t("nav.online") || "Online"}</strong>
                      </div>
                      <p className="solution-desc-text">{card.online}</p>
                    </div>

                    {/* Offline Solution */}
                    <div className="pain-stack-solution-card offline">
                      <div className="solution-badge-pill offline">
                        <span className="solution-badge-icon" aria-hidden="true">{offlineIcon}</span>
                        <strong>{t("nav.offline") || "Offline"}</strong>
                      </div>
                      <p className="solution-desc-text">{card.offline}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Rich Visual Graphic */}
                <div className="pain-stack-visual-col">
                  <div className="pain-stack-image-frame">
                    <img
                      src={cardImages[index]}
                      alt={card.title}
                      loading="lazy"
                      className="pain-stack-img"
                    />
                    <div className="pain-stack-img-overlay" />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
