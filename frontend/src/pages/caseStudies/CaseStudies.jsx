import { caseStudies } from "../../components/caseStudies/caseStudyData";
import GlowButton from "../../components/CTA/GlowButton";
import { lazy, Suspense } from "react";
import "./CaseStudies.css";
import { useLanguage } from "../../i18n/LanguageContext";

const CaseStudy = lazy(() => import("../../components/caseStudies/CaseStudy"));

export default function CaseStudies() {
  const { t } = useLanguage();
  return (
    <main className="case-studies-page">
      <section className="page-hero page-shell">
        <h1>
          {t("pages.caseStudies.title")}
          <br />
          <em>{t("pages.caseStudies.emphasis")}</em>
        </h1>
        <p>{t("pages.caseStudies.copy")}</p>
      </section>
      <section
        className="case-study-list page-shell"
        aria-labelledby="case-studies-title"
      >
        <h2 id="case-studies-title" className="sr-only">
          {t("pages.caseStudies.heading")}
        </h2>
        <Suspense fallback={null}>
          {caseStudies.map((study) => (
            <CaseStudy key={study.id} study={study} />
          ))}
        </Suspense>
      </section>
      <section className="page-cta">
        <div className="page-shell">
          <h2>{t("pages.caseStudies.cta")}</h2>
          <GlowButton />
        </div>
      </section>
    </main>
  );
}
