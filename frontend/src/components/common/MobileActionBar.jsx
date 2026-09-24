import { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./MobileActionBar.css";

export default function MobileActionBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isMobileScreen = window.innerWidth <= 768;
      const isScrolled = window.scrollY > 280;
      const isMenuOpen = document.body.classList.contains("menu-open");
      const isModalOpen = document.querySelector(".lead-modal.is-open") !== null;
      setVisible(isMobileScreen && isScrolled && !isMenuOpen && !isModalOpen);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("open-lead-form", handleScroll, { passive: true });
    window.addEventListener("close-lead-form", handleScroll, { passive: true });
    handleScroll();

    // Observe ONLY class attribute on body (for menu-open), no subtree to avoid loops
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("open-lead-form", handleScroll);
      window.removeEventListener("close-lead-form", handleScroll);
      observer.disconnect();
    };
  }, []);

  const openForm = (e) => {
    e?.preventDefault();
    window.dispatchEvent(new CustomEvent("open-lead-form"));
  };

  return (
    <aside
      className={`mobile-action-bar ${visible ? "is-visible" : ""}`}
      aria-label="Quick action navigation"
    >
      <div className="mobile-action-inner">
        {/* Direct Call Button */}
        <a
          href="tel:+61431679731"
          className="mobile-action-phone-btn"
          aria-label="Call +61 431 679 731"
        >
          <span className="mobile-phone-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </span>
          <span className="mobile-phone-label">{t("nav.mobileCall") || "Call"}</span>
        </a>

        {/* Main CTA Button: Free Assessment */}
        <button
          type="button"
          className="mobile-action-cta-btn"
          onClick={openForm}
        >
          <span className="mobile-cta-badge" aria-hidden="true">{t("nav.freeBadge") || "FREE"}</span>
          <span className="mobile-cta-text">
            {t("nav.ctaMobile") || "Get Free Assessment"}
          </span>
          <span className="mobile-cta-arrow" aria-hidden="true">➔</span>
        </button>
      </div>
    </aside>
  );
}
