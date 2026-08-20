export async function submitLead(payload) {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/leads`,
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
