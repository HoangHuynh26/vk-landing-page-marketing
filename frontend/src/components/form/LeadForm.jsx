import { useState } from "react";
import { submitLead } from "../../api/leads";
import "./LeadForm.css";
import { useLanguage } from "../../i18n/LanguageContext";

const initialForm = {
  fullName: "",
  companyName: "",
  address: "",
  email: "",
  phone: "",
  message: "",
};

export default function LeadForm({ onClose, onSuccess }) {
  const { language, t } = useLanguage();
  const label = (path, fallback) => {
    const value = t(path);
    return value === path ? fallback : value;
  };

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    if (status !== "idle") setStatus("typing");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const fullName = form.fullName.trim();
    const companyName = form.companyName.trim();
    const address = form.address.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const messageText = form.message.trim();

    if (!fullName) {
      setStatus("validation");
      setMessage(label("form.missingName", "Please enter your full name."));
      return;
    }
    if (!companyName) {
      setStatus("validation");
      setMessage(
        label(
          "form.missingCompany",
          "Please enter your company or business name.",
        ),
      );
      return;
    }
    if (!address) {
      setStatus("validation");
      setMessage(label("form.missingAddress", "Please enter your address."));
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("validation");
      setMessage(
        label("form.invalidEmail", "Please enter a valid email address."),
      );
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 8 || cleanPhone.length > 15) {
      setStatus("validation");
      setMessage(
        label("form.invalidPhone", "Please enter a valid phone number."),
      );
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      await submitLead({
        fullName,
        companyName,
        businessName: companyName,
        address,
        email,
        phone: cleanPhone,
        message: messageText,
        language,
      });
      setForm(initialForm);
      setStatus("idle");
      setMessage("");
      if (onSuccess) {
        onSuccess();
      } else {
        onClose?.();
      }
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: {
            id: Date.now(),
            type: "success",
            title: label("form.successTitle", "Gửi yêu cầu thành công!"),
            message: label(
              "form.success",
              "Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất.",
            ),
            duration: 7000,
            autoReturnHome: true,
          },
        }),
      );
    } catch {
      setStatus("failure");
      const errorMsg = label(
        "form.failure",
        "We could not submit your request. Please try again later.",
      );
      setMessage(errorMsg);
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: {
            id: Date.now(),
            type: "error",
            title: label("form.errorTitle", "Gửi yêu cầu thất bại"),
            message: errorMsg,
            duration: 5000,
          },
        }),
      );
    }
  }

  return (
    <form
      className="lead-form"
      id="lead-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="fullName">
        {label("form.fullName", "Full name")}
        <input
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={updateField}
          placeholder={label(
            "form.fullNamePlaceholder",
            "Enter your full name",
          )}
          autoComplete="name"
          required
        />
      </label>

      <label htmlFor="companyName">
        {label("form.companyName", "Company name")}
        <input
          id="companyName"
          name="companyName"
          value={form.companyName}
          onChange={updateField}
          placeholder={label(
            "form.companyNamePlaceholder",
            "Enter your business/company name",
          )}
          autoComplete="organization"
          required
        />
      </label>

      <label htmlFor="address" className="field-full">
        {label("form.address", "Address")}
        <input
          id="address"
          name="address"
          value={form.address}
          onChange={updateField}
          placeholder={label(
            "form.addressPlaceholder",
            "Enter your business address",
          )}
          autoComplete="street-address"
          required
        />
      </label>

      <label htmlFor="email">
        {label("form.email", "Email")}
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={updateField}
          placeholder={label(
            "form.emailPlaceholder",
            "Enter your email address",
          )}
          autoComplete="email"
          required
        />
      </label>

      <label htmlFor="phone">
        {label("form.phone", "Phone number")}
        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={updateField}
          placeholder={label(
            "form.phonePlaceholder",
            "Enter your phone number",
          )}
          autoComplete="tel"
          required
        />
      </label>

      <label htmlFor="message" className="field-full">
        {label("form.message", "Message")}
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={updateField}
          placeholder={label(
            "form.messagePlaceholder",
            "How can we help your business?",
          )}
          rows="3"
        />
      </label>

      <button
        type="submit"
        className="lead-form-submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? label("form.submitting", "Submitting...") : label("form.submit", "Submit")}
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
    </form>
  );
}
