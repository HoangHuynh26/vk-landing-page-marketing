const { validateLead } = require("../utils/validation");
const { forwardLeadToMake } = require("../utils/makeService");

async function createLead(req, res, next) {
  const result = validateLead(req.body);
  if (result.error)
    return res.status(400).json({ success: false, message: result.error });
  try {
    await forwardLeadToMake(result.value);
    console.info("Lead accepted", {
      businessNameLength: result.value.businessName.length,
    });
    return res
      .status(200)
      .json({ success: true, message: "Lead submitted successfully" });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createLead };
