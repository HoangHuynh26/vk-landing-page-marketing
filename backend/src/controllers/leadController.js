const { validateLead } = require("../utils/validation");
const { forwardLeadToMake } = require("../utils/makeService");

async function createLead(req, res, next) {
  const result = validateLead(req.body);
  if (result.error)
    return res.status(400).json({ success: false, message: result.error });

  // Silently drop spam submissions caught by the honeypot
  if (result.isSpam) {
    console.warn("Spam lead silently discarded via honeypot trap");
    return res
      .status(200)
      .json({ success: true, message: "Lead submitted successfully" });
  }

  try {
    await forwardLeadToMake(result.value);

    // Mask PII for privacy compliance (Privacy Act 1988 / GDPR)
    const maskedEmail = result.value.email.replace(/^(.)(.*)(@.*)$/, "$1***$3");
    const maskedPhone =
      result.value.phone.length >= 6
        ? result.value.phone.slice(0, 3) + "****" + result.value.phone.slice(-3)
        : "****";

    console.info("Lead accepted", {
      companyName: result.value.companyName,
      email: maskedEmail,
      phone: maskedPhone,
      language: result.value.language,
    });
    return res
      .status(200)
      .json({ success: true, message: "Lead submitted successfully" });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createLead };
