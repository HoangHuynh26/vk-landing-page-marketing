const responseKeys = [
  { terms: ["giá", "chi phí", "price", "pricing"], key: "pricing" },
  { terms: ["dịch vụ", "marketing", "service"], key: "service" },
  { terms: ["miễn phí", "free", "đánh giá"], key: "free" },
  { terms: ["60 ngày", "cam kết", "hoàn tiền", "guarantee"], key: "guarantee" },
  { terms: ["khu vực", "australia", "location", "địa điểm"], key: "locations" },
  {
    terms: ["đặt lịch", "appointment", "liên hệ", "contact", "gọi"],
    key: "contact",
  },
  { terms: ["công nghệ", "technology", "tool"], key: "technology" },
];

export function getBotResponse(question, answers) {
  const normalized = question.toLowerCase();
  const match = responseKeys.find((item) =>
    item.terms.some((term) => normalized.includes(term)),
  );
  return answers[match?.key || "fallback"];
}
