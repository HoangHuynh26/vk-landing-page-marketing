import { useState } from "react";
import "./FAQ.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function FAQ({ items, compact = false }) {
  const { t } = useLanguage();
  const localizedItems = items || t("faq.items");
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className={`faq-list ${compact ? "faq-list-compact" : ""}`}>
      {localizedItems.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        return (
          <article
            className={`faq-item ${isOpen ? "is-open" : ""}`}
            key={item.question}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <span className="faq-chevron" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              className="faq-answer"
              role="region"
              aria-hidden={!isOpen}
            >
              <p style={{fontSize:"17px"}}>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
