function sanitizeText(value, maxLength) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function validateLead(body) {
  const businessName = sanitizeText(body?.businessName, 120);
  const email = sanitizeText(body?.email, 254).toLowerCase();
  const phone = String(body?.phone || "").replace(/\D/g, "");
  if (!businessName) return { error: "Business name is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Invalid email address" };
  if (phone.length !== 10) return { error: "Invalid phone number" };
  return { value: { businessName, email, phone } };
}

module.exports = { validateLead };
