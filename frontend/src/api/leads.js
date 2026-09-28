export async function submitLead(payload) {
  let apiUrl = process.env.REACT_APP_API_URL;

  // In local development, ensure requests route to the backend Express server on port 5000
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    if (!apiUrl || apiUrl.includes(":3000") || apiUrl.includes(":3001")) {
      apiUrl = "http://localhost:5000";
    }
  }

  const baseUrl = apiUrl ? apiUrl.replace(/\/+$/, "") : "";
  const endpoint = `${baseUrl}/api/leads`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success)
    throw new Error(data.message || "Unable to submit request");
  return data;
}
