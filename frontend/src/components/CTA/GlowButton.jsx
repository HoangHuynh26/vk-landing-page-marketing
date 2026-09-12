import { useRef } from "react";
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
  const btnRef = useRef(null);
  const posRef = useRef({ tx: 0, ty: 0 });
  const rafRef = useRef(null);

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    } else {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("open-lead-form"));
    }
  };

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const btn = btnRef.current;
    if (!btn) return;

    const clientX = event.clientX;
    const clientY = event.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = btn.getBoundingClientRect();
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;
      if (halfWidth === 0 || halfHeight === 0) return;

      // Invariant origin center: remove current translation so center doesn't run away
      const originCenterX = rect.left - posRef.current.tx + halfWidth;
      const originCenterY = rect.top - posRef.current.ty + halfHeight;

      const deltaX = clientX - originCenterX;
      const deltaY = clientY - originCenterY;

      const normX = Math.max(-1, Math.min(1, deltaX / halfWidth));
      const normY = Math.max(-1, Math.min(1, deltaY / halfHeight));

      const maxDistX = variant === "hero" ? 28 : variant === "nav" ? 16 : 24;
      const maxDistY = variant === "hero" ? 18 : variant === "nav" ? 12 : 16;

      const tx = normX * maxDistX;
      const ty = normY * maxDistY;

      posRef.current = { tx, ty };

      btn.classList.add("is-magnetic");
      btn.style.setProperty("--tx", `${tx.toFixed(2)}px`);
      btn.style.setProperty("--ty", `${ty.toFixed(2)}px`);
      btn.style.setProperty("--cx", `${(normX * 10).toFixed(2)}px`);
      btn.style.setProperty("--cy", `${(normY * 6).toFixed(2)}px`);
      btn.style.setProperty("--rx", `${(-normY * 6).toFixed(2)}deg`);
      btn.style.setProperty("--ry", `${(normX * 6).toFixed(2)}deg`);
    });
  };

  const handlePointerLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const btn = btnRef.current;
    if (!btn) return;
    posRef.current = { tx: 0, ty: 0 };
    btn.classList.remove("is-magnetic");
    btn.style.setProperty("--tx", "0px");
    btn.style.setProperty("--ty", "0px");
    btn.style.setProperty("--cx", "0px");
    btn.style.setProperty("--cy", "0px");
    btn.style.setProperty("--rx", "0deg");
    btn.style.setProperty("--ry", "0deg");
  };

  const variantClass =
    variant === "hero"
      ? "glow-btn--hero"
      : variant === "nav"
        ? "glow-btn--nav"
        : "";

  return (
    <button
      ref={btnRef}
      type="button"
      className={`glow-btn ${variantClass} ${className}`.trim()}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
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
