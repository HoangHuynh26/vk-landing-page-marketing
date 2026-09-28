async function forwardLeadToMake(lead) {
  const webhookUrl = process.env.Webhook_URL || process.env.WEBHOOK_URL;
  if (!webhookUrl) return { configured: false };
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
  const data = await response.json().catch(() => null);
  if (data && data.success === false) {
    throw new Error(data.error || data.message || "Webhook processing failed");
  }
  return { configured: true, data };
}

module.exports = { forwardLeadToMake };

