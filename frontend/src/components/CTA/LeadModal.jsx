import { useEffect, useRef, useState } from "react";
import LeadForm from "../form/LeadForm";
import { useLanguage } from "../../i18n/LanguageContext";
import "./LeadCTA.css";

export default function LeadModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-lead-form", handleOpen);
    window.addEventListener("close-lead-form", handleClose);

    return () => {
      window.removeEventListener("open-lead-form", handleOpen);
      window.removeEventListener("close-lead-form", handleClose);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="lead-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
      >
        <button
          ref={closeButtonRef}
          className="lead-modal-close"
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label={t("form.close") || "Close"}
        >
          ×
        </button>
        <div className="lead-modal-header">
          <p className="eyebrow lead-modal-eyebrow">
            {t("cta.eyebrow")}
          </p>
          <h2 id="lead-modal-title">
            {t("cta.title")}
          </h2>
          <p className="lead-modal-copy">
            {t("cta.copy")}
          </p>
        </div>
        <LeadForm
          onClose={() => setIsOpen(false)}
          onSuccess={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
