import "./GlowButton.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function GlowButton({
  children,
  href = "#lead-form",
  className = "",
  variant = "default", // 'hero' | 'nav' | 'default'
  showIcon = true,
  onClick,
}) {
  const { t } = useLanguage();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    } else {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("open-lead-form"));
    }
  };

  const variantClass =
    variant === "hero"
      ? "glow-btn--hero"
      : variant === "nav"
        ? "glow-btn--nav"
        : "";

  return (
    <button
      type="button"
      className={`glow-btn ${variantClass} ${className}`.trim()}
      onClick={handleClick}
      aria-haspopup="dialog"
    >
      <span className="glow-btn-aura" aria-hidden="true" />
      <span className="glow-btn-beam" aria-hidden="true" />
      <span className="glow-btn-surface" aria-hidden="true" />
      <span className="glow-btn-content">
        <span className="glow-btn-text">{children || t("nav.cta")}</span>
        {showIcon && (
          <span className="glow-btn-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        )}
      </span>
    </button>
  );
}
