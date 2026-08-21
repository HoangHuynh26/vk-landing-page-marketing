async function forwardLeadToMake(lead) {
  const webhookUrl = process.env.Webhook_URL;
  if (!webhookUrl) return { configured: false };
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!response.ok) throw new Error(`Make webhook returned ${response.status}`);
  return { configured: true };
}

module.exports = { forwardLeadToMake };
