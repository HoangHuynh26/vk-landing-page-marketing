import "./Footer.css";
import { useLanguage } from "../../i18n/LanguageContext";

const links = [
  ["nav.home", "#top"],
  ["nav.about", "#strategy"],
  ["nav.caseStudies", "#case-studies"],
  ["nav.testimonials", "#testimonials"],
  ["nav.faq", "#faq"],
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/vkdigitalhub",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#top" aria-label={t("nav.homeLabel")}>
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

        <div className="footer-contact">
          <h2>{t("footer.contact")}</h2>
          <div className="footer-contact-list">
            <a
              href={`tel:${t("footer.phonePlaceholder")}`}
              className="footer-contact-item"
            >
              <span className="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <div className="footer-contact-text">
                <small>{t("footer.phoneLabel")}</small>
                <span>{t("footer.phonePlaceholder")}</span>
              </div>
            </a>

            <a
              href={`mailto:${t("footer.emailPlaceholder")}`}
              className="footer-contact-item"
            >
              <span className="footer-contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
              </span>
              <div className="footer-contact-text">
                <small>{t("footer.emailLabel")}</small>
                <span>{t("footer.emailPlaceholder")}</span>
              </div>
            </a>
          </div>
        </div>

        <div className="footer-social">
          <h2>{t("footer.followUs") || "Follow Us"}</h2>
          <div className="footer-social-icons">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={social.name}
              >
                <span className="footer-social-icon">{social.icon}</span>
                <span className="footer-social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>{t("footer.copyright")}</span>
      </div>
    </footer>
  );
}
