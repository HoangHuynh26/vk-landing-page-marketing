import GlowButton from "../../components/CTA/GlowButton";
import { lazy, Suspense } from "react";
import "./FAQPage.css";
import { useLanguage } from "../../i18n/LanguageContext";

const FAQ = lazy(() => import("../../components/FAQ/FAQ"));

export default function FAQPage() {
  const { t } = useLanguage();
  return (
    <main className="faq-page">
      <section className="page-hero page-shell">
        <h1>
          {t("pages.faq.title")}
          {t("pages.faq.emphasis") && (
            <>
              <br />
              <em>{t("pages.faq.emphasis")}</em>
            </>
          )}
        </h1>
        <p>{t("pages.faq.copy")}</p>
      </section>
      <section
        className="faq-page-content page-shell"
        aria-labelledby="faq-page-title"
      >
        <h2 id="faq-page-title" className="sr-only">
          {t("pages.faq.heading")}
        </h2>
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
        <img
          className="faq-visual"
          src="/logo192.png"
          alt="VK Digital Hub"
          width="192"
          height="192"
          loading="lazy"
        />
      </section>
      <section className="page-cta">
        <div className="page-shell">
          <div>
            <p className="eyebrow">{t("pages.faq.prompt")}</p>
            <h2>{t("pages.faq.cta")}</h2>
          </div>
          <GlowButton />
        </div>
      </section>
    </main>
  );
}
