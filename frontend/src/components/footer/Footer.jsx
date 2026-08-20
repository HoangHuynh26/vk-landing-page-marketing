import GlowButton from "../CTA/GlowButton";
import "./Footer.css";
import { useLanguage } from "../../i18n/LanguageContext";

const links = [
  ["nav.home", "/"],
  ["nav.caseStudies", "/case-studies"],
  ["nav.faq", "/faq"],
  ["nav.about", "/about"],
];

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();
  const nextLanguage = language === "vi" ? "en" : "vi";
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <a className="brand" href="/" aria-label={t("nav.homeLabel")}>
            <img
              className="brand-logo"
              src="/logo.png"
              alt="VK Digital Hub"
              width="42"
              height="42"
            />
            <span className="brand-name-x">
              VK Digital Hub
            </span>
          </a>
          <p>{t("footer.positioning")}</p>
        </div>
        <div>
          <h2>{t("footer.explore")}</h2>
          <nav aria-label={t("footer.explore")}>
            {links.map(([label, path]) => (
              <a key={path} href={path}>
                {t(label)}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-action">
          <h2>{t("footer.action")}</h2>
          <div className="footer-controls">
            <button
              className="language-toggle"
              type="button"
              onClick={() => setLanguage(nextLanguage)}
              aria-label={`Switch language to ${nextLanguage.toUpperCase()}`}
            >
              <span className="language-current">{language.toUpperCase()}</span>
              <span aria-hidden="true">→</span>
              <span>{nextLanguage.toUpperCase()}</span>
            </button>
            <GlowButton />
          </div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>{t("footer.copyright")}</span>
        <span>{t("footer.built")}</span>
      </div>
    </footer>
  );
}
