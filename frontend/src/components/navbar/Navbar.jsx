import { useEffect, useState } from "react";
import GlowButton from "../CTA/GlowButton";
import "./Navbar.css";
import { useLanguage } from "../../i18n/LanguageContext";

const links = [
  ["nav.home", "#top"],
  ["nav.caseStudies", "#case-studies"],
  ["nav.faq", "#faq"],
  ["nav.about", "#strategy"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 24);
  const { language, setLanguage, t } = useLanguage();
  const nextLanguage = language === "vi" ? "en" : "vi";

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : ""}`}
    >
      <nav className="nav-shell" aria-label="Main navigation">
        <a
          className="brand"
          href="#top"
          onClick={() => setOpen(false)}
          aria-label={t("nav.homeLabel")}
        >
          <img
            className="brand-logo"
            src="/logo.png"
            alt="VK Digital Hub"
            width="42"
            height="42"
          />
          <span className="brand-name">
            VK Digital Hub
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">
            {open ? t("nav.close") : t("nav.open")}
          </span>
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <div id="main-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
          <div className="nav-links">
            {links.map(([label, path]) => (
              <a key={path} href={path} onClick={() => setOpen(false)}>
                {t(label)}
              </a>
            ))}
          </div>
          <div className="nav-actions">
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
            <GlowButton className="nav-cta" />
          </div>
        </div>
      </nav>
    </header>
  );
}
