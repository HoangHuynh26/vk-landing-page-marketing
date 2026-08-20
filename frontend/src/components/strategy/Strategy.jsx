import "./Strategy.css";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

const stepImages = ["/fill-form.jpg", "/analyze.jpg", "/deploy.jpg"];

export default function Strategy() {
  const { language, t } = useLanguage();
  const steps = t("strategy.steps");
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStep(Number(visible.target.dataset.step));
      },
      { threshold: [0.25, 0.55, 0.8], rootMargin: "-20% 0px -35%" },
    );
    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, [language, steps.length]);

  return (
    <section className="strategy-section" aria-labelledby="strategy-title">
      <div className="page-shell strategy-layout">
        <div className="strategy-story-column">
          <div className="strategy-copy">
            <p style={{fontSize:"20px", fontFamily: "SF Pro"}} className="eyebrow dark-eyebrow">{t("strategy.eyebrow")}</p>
            <h2 id="strategy-title">
              {t("strategy.title")}
              <br />
              <em>{t("strategy.emphasis")}</em>
            </h2>
          </div>
          <div className="steps-list">
            {steps.map((step, index) => (
              <article
                className={`step ${activeStep === index ? "is-active" : ""}`}
                data-step={index}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                key={step.number}
              >
                <span className="step-icon">{step.icon}</span>
                <div>
                  <h2>{step.number}</h2>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <img
                    className="step-mobile-image"
                    src={stepImages[index]}
                    alt={step.title}
                    width="512"
                    height="512"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="strategy-visual-column">
          <div className="strategy-visual-panel" aria-live="polite">
            {steps.map((step, index) => (
              <img
                className={activeStep === index ? "is-active" : ""}
                key={step.number}
                src={stepImages[index]}
                alt={step.title}
                width="512"
                height="512"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
