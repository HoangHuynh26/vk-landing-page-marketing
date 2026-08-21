export async function submitLead(payload) {
  const apiUrl = process.env.REACT_APP_API_URL || "";
  const response = await fetch(
    `${apiUrl}/api/leads`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success)
    throw new Error(data.message || "Unable to submit request");
  return data;
}
