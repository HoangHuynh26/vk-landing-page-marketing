import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const btnRef = useRef(null);
  const posRef = useRef({ tx: 0, ty: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      const originCenterX = rect.left - posRef.current.tx + halfWidth;
      const originCenterY = rect.top - posRef.current.ty + halfHeight;

      const deltaX = clientX - originCenterX;
      const deltaY = clientY - originCenterY;

      const normX = Math.max(-1, Math.min(1, deltaX / halfWidth));
      const normY = Math.max(-1, Math.min(1, deltaY / halfHeight));

      const tx = normX * 12;
      const ty = normY * 12;

      posRef.current = { tx, ty };

      btn.classList.add("is-magnetic");
      btn.style.setProperty("--tx", `${tx.toFixed(2)}px`);
      btn.style.setProperty("--ty", `${ty.toFixed(2)}px`);
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
  };

  const scrollToFirstSection = () => {
    const firstSection = document.getElementById("top") || document.querySelector(".hero");
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const label = t("nav.backToTop") || "Return to top";

  return (
    <button
      ref={btnRef}
      type="button"
      className={`scroll-to-top ${isVisible ? "is-visible" : ""}`}
      onClick={scrollToFirstSection}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={label}
      title={label}
    >
      <svg
        className="scroll-to-top-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
