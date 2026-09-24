import { useEffect, useState } from "react";
import GlowButton from "../CTA/GlowButton";
import "./Navbar.css";
import { useLanguage } from "../../i18n/LanguageContext";

const links = [
  ["nav.home", "#top"],
  ["nav.about", "#strategy"],
  ["nav.caseStudies", "#case-studies"],
  ["nav.testimonials", "#testimonials"],
  ["nav.faq", "#faq"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 24);
  const [activeSection, setActiveSection] = useState("#top");
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

      // Scroll spy logic: detect currently active section
      const sectionOrder = [
        { id: "faq", hash: "#faq" },
        { id: "testimonials", hash: "#testimonials" },
        { id: "case-studies", hash: "#case-studies" },
        { id: "strategy", hash: "#strategy" },
      ];

      const scrollPos = window.scrollY + 140;
      let found = false;

      for (const sec of sectionOrder) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.hash);
            found = true;
            break;
          }
        }
      }

      if (!found) {
        setActiveSection("#top");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const languageButton = (
    <button
      className="language-toggle"
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={`Switch language to ${nextLanguage.toUpperCase()}`}
    >
      <span className="language-current">{language.toUpperCase()}</span>
      <span className="language-arrow" aria-hidden="true">⇄</span>
      <span className="language-next">{nextLanguage.toUpperCase()}</span>
    </button>
  );

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

        {/* Centered navigation menu */}
        <div id="main-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
          <div className="nav-links">
            {links.map(([label, path]) => (
              <a
                key={path}
                href={path}
                className={activeSection === path ? "is-active" : ""}
                onClick={() => setOpen(false)}
              >
                {t(label)}
              </a>
            ))}
          </div>
          <div className="nav-mobile-cta">
            <GlowButton className="nav-cta" variant="nav" onClick={() => setOpen(false)} />
          </div>
        </div>

        {/* Header actions: Language switcher always outside next to button */}
        <div className="nav-header-actions">
          {languageButton}
          <div className="nav-desktop-cta">
            <GlowButton className="nav-cta" variant="nav" />
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? t("nav.close") : t("nav.open")}
          >
            <span className="sr-only">
              {open ? t("nav.close") : t("nav.open")}
            </span>
            <span aria-hidden="true" className="menu-toggle-icon">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
