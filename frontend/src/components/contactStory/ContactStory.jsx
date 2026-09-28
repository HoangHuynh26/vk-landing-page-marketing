import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./ContactStory.css";

export default function ContactStory() {
  const { t } = useLanguage();
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openForm = (e) => {
    e?.preventDefault();
    window.dispatchEvent(new CustomEvent("open-lead-form"));
  };

  const messages = t("contactStory.messages") || [];

  return (
    <section
      ref={containerRef}
      className="contact-story-section"
      id="contact-assessment"
      aria-label={t("contactStory.title") || "Contact and Free Assessment Conversation"}
    >
      <div className="contact-story-header">
        <h2 className="contact-story-title">
          {t("contactStory.title")}
        </h2>
      </div>

      {/* iOS Chat Mockup */}
      <div className={`contact-ios-frame ${inView ? "is-revealed" : ""}`}>
        {/* Phone / Chat Header */}
        <div className="contact-ios-header">
          <div className="contact-ios-brand-lockup">
            <div className="contact-ios-avatar-wrap">
              <img
                src="/logo.png"
                alt="VK Digital Hub"
                className="contact-ios-avatar"
                width="38"
                height="38"
              />
              <span className="contact-ios-online-dot" aria-hidden="true" />
            </div>
            <div className="contact-ios-header-text">
              <strong className="contact-ios-brand-name">
                VK Digital Hub <span className="contact-ios-verified">✓</span>
              </strong>
              <small className="contact-ios-status">
                {t("contactStory.role")}
              </small>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="contact-ios-body">
          {messages.map((msg, index) => {
            const isMe = msg.sender === "me";
            const delayStyle = {
              animationDelay: `${0.15 + index * 0.35}s`,
            };

            return (
              <div
                key={msg.id}
                className={`contact-ios-row ${isMe ? "is-me" : "is-them"} ${inView ? "animate-bubble" : ""
                  }`}
                style={delayStyle}
              >
                <div className="contact-ios-bubble-wrap">
                  <div className={`contact-ios-bubble ${isMe ? "bubble-me" : "bubble-them"}`}>
                    <p className="contact-ios-bubble-text">{msg.text}</p>
                  </div>
                  <span className="contact-ios-time">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          <div
            className={`contact-ios-row is-me ${inView ? "animate-bubble" : ""}`}
            style={{ animationDelay: "1.7s" }}
          >
            <div className="contact-ios-bubble bubble-me bubble-typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        </div>

        {/* CTA & Contact Details Action Box */}
        <div
          className={`contact-ios-action-box ${inView ? "animate-action" : ""}`}
          style={{ animationDelay: "1.9s" }}
        >
          <div className="contact-ios-action-header">
            <p className="contact-ios-action-prompt">
              {t("contactStory.actionPrompt")}
            </p>
          </div>

          <div className="contact-ios-btn-row">
            <button
              type="button"
              className="contact-ios-cta-btn"
              onClick={openForm}
            >
              <span className="contact-ios-cta-icon" aria-hidden="true">📋</span>
              <span className="contact-ios-cta-label">
                {t("contactStory.ctaBtn")}
              </span>
              <span className="contact-ios-cta-arrow" aria-hidden="true">➔</span>
            </button>
          </div>

          {/* Direct phone & email row */}
          <div className="contact-ios-direct-links">
            <a href="tel:+61431679731" className="contact-direct-chip">
              <span className="direct-chip-icon" aria-hidden="true">📞</span>
              <span>{t("contactStory.hotlineLabel")}: <strong>+61 431 679 731</strong></span>
            </a>
            <span className="contact-direct-divider">·</span>
            <a href="mailto:admin@vkdigitalhub.com.au" className="contact-direct-chip">
              <span className="direct-chip-icon" aria-hidden="true">✉️</span>
              <span>{t("contactStory.emailLabel")}: <strong>admin@vkdigitalhub.com.au</strong></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
