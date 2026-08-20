import LeadForm from "../form/LeadForm";
import GlowButton from "./GlowButton";
import { lazy, Suspense } from "react";
import "./LeadCTA.css";
import { useLanguage } from "../../i18n/LanguageContext";

const FAQ = lazy(() => import("../FAQ/FAQ"));

export default function LeadCTA() {
  const { t } = useLanguage();
  return (
    <>
      <section
        className="faq-section page-shell"
        aria-labelledby="faq-home-title"
      >
        <div className="section-heading">
          <h1 style={{fontSize: "45px", fontFamily: "SF Pro"}} className="eyebrow dark-eyebrow">{t("faq.eyebrow")}</h1>
          <h1 id="faq-home-title">
            {t("faq.emphasis") && (
              <>
                <br />
                <em>{t("faq.emphasis")}</em>
              </>
            )}
          </h1>
        </div>
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
        <p className="faq-ending">{t("faq.ending")}</p>
        <GlowButton />
      </section>
      <section className="lead-cta" aria-labelledby="lead-title">
        <div className="page-shell">
          <p className="eyebrow">{t("cta.eyebrow")}</p>
          <h2 id="lead-title">{t("cta.title")}</h2>
          <p>{t("cta.copy")}</p>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
