import { useState } from "react";
import { submitLead } from "../../api/leads";
import "./LeadForm.css";
import { useLanguage } from "../../i18n/LanguageContext";

const initialForm = { businessName: "", email: "", phone: "" };

export default function LeadForm() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
    if (status !== "idle") setStatus("typing");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const businessName = form.businessName.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.replace(/\D/g, "");
    if (!businessName) {
      setStatus("validation");
      setMessage(t("form.missingBusiness"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("validation");
      setMessage(t("form.invalidEmail"));
      return;
    }
    if (phone.length !== 10) {
      setStatus("validation");
      setMessage(t("form.invalidPhone"));
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      await submitLead({ businessName, email, phone, language });
      setStatus("success");
      setMessage(t("form.success"));
      setForm(initialForm);
    } catch {
      setStatus("failure");
      setMessage(t("form.failure"));
    }
  }

  return (
    <form
      className="lead-form"
      id="lead-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="businessName">
        {t("form.businessName")}
        <input
          id="businessName"
          name="businessName"
          value={form.businessName}
          onChange={updateField}
          placeholder={t("form.businessPlaceholder")}
          autoComplete="organization"
          required
        />
      </label>
      <label htmlFor="email">
        {t("form.email")}
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={updateField}
          placeholder={t("form.emailPlaceholder")}
          type="email"
          autoComplete="email"
          required
        />
      </label>
      <label htmlFor="phone">
        {t("form.phone")}
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={updateField}
          placeholder={t("form.phonePlaceholder")}
          inputMode="numeric"
          type="tel"
          autoComplete="tel"
          maxLength="10"
          required
        />
      </label>
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? t("form.submitting") : t("form.submit")}
      </button>
      {message && (
        <p
          className={`form-message form-message-${status}`}
          role={
            status === "failure" || status === "validation" ? "alert" : "status"
          }
        >
          {message}
        </p>
      )}
      {status === "success" && (
        <div className="success-modal-backdrop" role="presentation">
          <div
            className="success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-success-title"
          >
            <h2 id="lead-success-title">✓</h2>
            <p>{message}</p>
            <button type="button" onClick={() => setStatus("idle")}>
              OK
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
