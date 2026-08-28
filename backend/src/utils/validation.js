function sanitizeText(value, maxLength) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

function validateLead(body) {
  const fullName = sanitizeText(body?.fullName, 120);
  const companyName = sanitizeText(
    body?.companyName || body?.businessName,
    150,
  );
  const address = sanitizeText(body?.address, 250);
  const email = sanitizeText(body?.email, 254).toLowerCase();
  const phone = String(body?.phone || "").replace(/\D/g, "");
  const message = sanitizeText(body?.message, 2000);
  const language =
    body?.language === "en" ? "en" : body?.language === "vi" ? "vi" : "vi";

  if (!fullName) return { error: "Full name is required" };
  if (!companyName) return { error: "Company name is required" };
  if (!address) return { error: "Address is required" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email address" };
  }
  if (!phone || phone.length < 8 || phone.length > 15) {
    return { error: "Invalid phone number" };
  }

  return {
    value: {
      fullName,
      companyName,
      businessName: companyName,
      address,
      email,
      phone,
      message,
      language,
      submittedAt: new Date().toISOString(),
    },
  };
}

module.exports = { validateLead };
