import TrustBar from "../../components/trustbar/TrustBar";
import GlowButton from "../../components/CTA/GlowButton";
import { lazy, Suspense } from "react";
import "./About.css";
import { useLanguage } from "../../i18n/LanguageContext";

const Strategy = lazy(() => import("../../components/strategy/Strategy"));

export default function About() {
  const { t } = useLanguage();
  const page = t("pages.about");
  return (
    <main className="about-page">
      <section className="about-hero page-shell">
        <p className="eyebrow dark-eyebrow">{page.eyebrow}</p>
        <h1>
          {page.title}
          <br />
          <em>{page.emphasis}</em>
        </h1>
        <p>{page.copy}</p>
        <GlowButton />
      </section>
      <section className="about-mission page-shell">
        <div>
          <p className="eyebrow dark-eyebrow">{page.missionEyebrow}</p>
          <h2>{page.mission}</h2>
        </div>
        <p>{page.missionCopy}</p>
      </section>
      <section className="about-services">
        <div className="page-shell">
          <p className="eyebrow">{page.servicesEyebrow}</p>
          <h2>
            {page.servicesTitle}
            <br />
            <em>{page.servicesEmphasis}</em>
          </h2>
          <img
            className="about-visual"
            src="/logo512.png"
            alt="VK Digital Hub"
            width="512"
            height="512"
            loading="lazy"
          />
          <div className="service-grid">
            {page.services.map((service, index) => (
              <article key={service.title}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-trust page-shell">
        <p className="eyebrow dark-eyebrow">{page.trustEyebrow}</p>
        <h2>
          {page.trustTitle}
          <br />
          <em>{page.trustEmphasis}</em>
        </h2>
        <TrustBar />
      </section>
      <Suspense fallback={null}>
        <Strategy />
      </Suspense>
      <section className="about-cta">
        <div className="page-shell">
          <p className="eyebrow">{page.ctaEyebrow}</p>
          <h2>{page.cta}</h2>
          <GlowButton />
        </div>
      </section>
    </main>
  );
}
