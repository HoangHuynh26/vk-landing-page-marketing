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
  ["nav.contact", "#contact"],
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
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      // Check if user is at the top of the page
      if (currentScrollY < 120) {
        setActiveSection((prev) => (prev !== "#top" ? "#top" : prev));
        ticking = false;
        return;
      }

      // When scrolled near/at the bottom of the page, keep the last item (#contact) active
      const scrollBottom = window.innerHeight + currentScrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 120) {
        setActiveSection((prev) => (prev !== "#contact" ? "#contact" : prev));
        ticking = false;
        return;
      }

      // Scroll spy logic: detect currently active section
      const sectionOrder = [
        { id: "contact", hash: "#contact" },
        { id: "faq", hash: "#faq" },
        { id: "testimonials", hash: "#testimonials" },
        { id: "case-studies", hash: "#case-studies" },
        { id: "strategy", hash: "#strategy" },
      ];

      const viewLine = currentScrollY + Math.min(280, window.innerHeight * 0.4);
      let newActive = null;

      for (const sec of sectionOrder) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + currentScrollY;
          const height = el.offsetHeight;
          if (viewLine >= top && viewLine < top + height) {
            newActive = sec.hash;
            break;
          }
        }
      }

      if (!newActive) {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          const contactTop = contactEl.getBoundingClientRect().top + currentScrollY;
          if (viewLine >= contactTop) {
            newActive = "#contact";
          }
        }
      }

      if (newActive) {
        setActiveSection((prev) => (prev !== newActive ? newActive : prev));
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();

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

  const handleNavClick = (event, path) => {
    setOpen(false);
    if (!path.startsWith("#")) return;

    event.preventDefault();
    if (path === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        window.history.pushState(null, "", " ");
      } catch (e) {}
      return;
    }

    const targetId = path.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      const navbarHeight = 72;
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;
      const targetHeight = target.offsetHeight;
      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - navbarHeight;

      let scrollTarget;
      // If the target section fits nicely within viewport (like Testimonials), center it vertically!
      if (targetHeight < availableHeight) {
        const extraSpace = (availableHeight - targetHeight) / 2;
        scrollTarget = targetTop - navbarHeight - extraSpace;
      } else {
        // If it's a tall section, place with comfortable breathing room below navbar
        scrollTarget = targetTop - navbarHeight - 20;
      }

      window.scrollTo({
        top: Math.max(0, Math.round(scrollTarget)),
        behavior: "smooth",
      });

      try {
        window.history.pushState(null, "", path);
      } catch (e) {}
    }
  };

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}
    >
      <nav className="nav-shell" aria-label="Main navigation">
        {/* Frame 1 (Left): Brand Pill (Logo + Company Name) */}
        <a
          className="brand nav-pill nav-pill--brand"
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          aria-label={t("nav.homeLabel")}
        >
          <img
            className="brand-logo"
            src="/logo.png"
            alt="VK Digital Hub"
            width="38"
            height="38"
          />
          <span className="brand-name">
            <span className="brand-name-vk">VK</span>
            <span className="brand-name-sub">Digital Hub</span>
          </span>
        </a>

        {/* Frame 2 (Center): Navigation Menu Pill */}
        <div id="main-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
          <div className="nav-links nav-pill nav-pill--links">
            {links.map(([label, path]) => (
              <a
                key={path}
                href={path}
                className={activeSection === path ? "is-active" : ""}
                onClick={(e) => handleNavClick(e, path)}
              >
                {t(label)}
              </a>
            ))}
          </div>
          <div className="nav-mobile-cta">
            <GlowButton className="nav-cta" variant="nav" onClick={() => setOpen(false)}>
              {t("nav.ctaMobile") || t("nav.ctaNav") || t("nav.cta")}
            </GlowButton>
          </div>
        </div>

        {/* Frame 3 (Right): Actions Pill (Language Switcher + CTA) */}
        <div className="nav-header-actions nav-pill nav-pill--actions">
          {languageButton}
          <div className="nav-desktop-cta">
            <GlowButton className="nav-cta" variant="nav">
              {t("nav.ctaNav") || t("nav.cta")}
            </GlowButton>
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
