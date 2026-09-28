import ContactStory from "../contactStory/ContactStory";
import GlowButton from "./GlowButton";
import FAQ from "../FAQ/FAQ";
import "./LeadCTA.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function LeadCTA() {
  const { t } = useLanguage();

  const openForm = (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("open-lead-form"));
  };

  return (
    <>
      <div className="faq-section-wrapper">
        <section
          className="faq-section page-shell"
          id="faq"
          aria-labelledby="faq-home-title"
        >
          <div className="section-heading">
            <h1
              style={{ fontSize: "45px", color: "#0f766e" }}
              className="eyebrow dark-eyebrow"
            >
              {t("faq.eyebrow")}
            </h1>
            <h1 id="faq-home-title">
              {t("faq.emphasis") && (
                <>
                  <br />
                  <em>{t("faq.emphasis")}</em>
                </>
              )}
            </h1>
          </div>
          <FAQ />
        </section>
      </div>

      {/* Interactive Story Contact & Free Assessment Section under FAQ */}
      <div className="contact-story-wrapper" id="contact">
        <ContactStory />
      </div>

      <section
        className="lead-cta"
        id="lead-cta"
        aria-labelledby="lead-title"
      >
        <div className="page-shell">
          <p
            style={{ fontSize: "20px" }}
            className="eyebrow"
          >
            {t("cta.eyebrow")}
          </p>
          <h2 id="lead-title">{t("cta.title")}</h2>
          <p>{t("cta.copy")}</p>
          <GlowButton onClick={openForm} href="#lead-form" />
        </div>
      </section>
    </>
  );
}
