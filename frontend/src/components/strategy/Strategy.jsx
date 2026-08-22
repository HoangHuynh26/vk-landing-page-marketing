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
      { threshold: [0.3, 0.6, 0.85], rootMargin: "-18% 0px -48%" },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, [language, steps.length]);

  return (
    <section className="strategy-section" aria-labelledby="strategy-title">
      <div className="page-shell strategy-layout">
        <div className="strategy-story-column">
          <div className="strategy-copy">
            <p style={{fontSize: "20px", }} className="eyebrow yellow-eyebrow">{t("strategy.eyebrow")}</p>
            <h2 id="strategy-title">
              {t("strategy.title")} <em>{t("strategy.emphasis")}</em>
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
                <div className="step-marker">
                  <span>{step.number}</span>
                </div>
                <div className="step-content">
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
            <div className="strategy-visual-label">Your growth, in motion</div>
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
            <div className="strategy-progress" aria-hidden="true">
              {steps.map((step, index) => (
                <span className={activeStep === index ? "is-active" : ""} key={step.number} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
