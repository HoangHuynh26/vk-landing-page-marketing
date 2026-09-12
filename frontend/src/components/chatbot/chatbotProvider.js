const responseKeys = [
  // Greetings
  {
    terms: [
      "chào",
      "xin chào",
      "hello",
      "hi",
      "alo",
      "helo",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "greetings",
    ],
    key: "greeting",
  },
  // Contact details (phone, email, hotline, address)
  {
    terms: [
      "số điện thoại",
      "sđt",
      "sdt",
      "điện thoại",
      "hotline",
      "email",
      "mail",
      "liên hệ",
      "địa chỉ",
      "gọi",
      "zalo",
      "phone",
      "telephone",
      "mobile",
      "call",
      "contact",
      "address",
      "reach",
    ],
    key: "contact",
  },
  // Problems / Difficulties
  {
    terms: [
      "vấn đề",
      "khó khăn",
      "khó",
      "ít khách",
      "vắng khách",
      "không có khách",
      "quảng cáo không hiệu quả",
      "ế",
      "áp lực",
      "đốt tiền",
      "trục trặc",
      "thất bại",
      "không hiệu quả",
      "problem",
      "difficulty",
      "difficult",
      "struggle",
      "struggling",
      "issue",
      "trouble",
      "slow",
      "low booking",
      "wasting money",
      "ineffective",
    ],
    key: "problem",
  },
  // Pricing
  {
    terms: ["giá", "chi phí", "price", "pricing", "cost", "fee", "báo giá", "tiền"],
    key: "pricing",
  },
  // Services
  {
    terms: ["dịch vụ", "marketing", "service", "hỗ trợ gì", "làm gì", "what do you do"],
    key: "service",
  },
  // Free assessment
  {
    terms: ["miễn phí", "free", "đánh giá", "assessment", "audit"],
    key: "free",
  },
  // 60-day Guarantee
  {
    terms: ["60 ngày", "cam kết", "hoàn tiền", "guarantee", "refund"],
    key: "guarantee",
  },
  // Locations
  {
    terms: [
      "khu vực",
      "australia",
      "location",
      "địa điểm",
      "perth",
      "mandurah",
      "sydney",
      "melbourne",
      "brisbane",
      "ở đâu",
      "tây úc",
      "wa",
    ],
    key: "locations",
  },
  // Appointment / Consultation
  {
    terms: ["đặt lịch", "appointment", "tư vấn", "consultation", "hẹn", "book"],
    key: "appointment",
  },
  // Technology
  {
    terms: ["công nghệ", "technology", "tool", "phần mềm", "app", "hệ thống", "tech"],
    key: "technology",
  },
];

export function getBotResponse(question, answers) {
  if (!question || typeof question !== "string") {
    return {
      text: answers?.fallback || "",
      isFallback: true,
      key: "fallback",
    };
  }

  const normalized = question.toLowerCase().trim();
  const match = responseKeys.find((item) =>
    item.terms.some((term) => normalized.includes(term)),
  );

  if (match && answers && answers[match.key]) {
    return {
      text: answers[match.key],
      isFallback: false,
      key: match.key,
    };
  }

  return {
    text: answers?.fallback || "",
    isFallback: true,
    key: "fallback",
  };
}
