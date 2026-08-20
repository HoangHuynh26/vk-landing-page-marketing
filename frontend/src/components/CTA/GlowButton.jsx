import "./GlowButton.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function GlowButton({
  children,
  href = "#lead-form",
  className = "",
}) {
  const { t } = useLanguage();
  return (
    <a className={`glow-btn ${className}`} href={href}>
      <span>{children || t("nav.cta")}</span>
    </a>
  );
}
