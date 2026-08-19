TASK12 — CHATBOT + AUTOMATIC INACTIVITY MESSAGE

Read AI/*.md.

Implement chatbot in bottom-right corner.

After exactly 15 seconds of inactivity, display:

"Chào bạn! Em thấy anh/chị đang xem landing, có thắc mắc gì em hỗ trợ ngay ạ."

Behavior:
- start inactivity timer
- reset timer when user interacts
- do not spam
- do not repeatedly trigger
- allow close/minimize
- responsive
- keyboard accessible
- mobile compatible

Automatic answers:
Support common intents such as:
- pricing
- marketing service
- free assessment
- 60-day guarantee
- supported locations
- appointment
- technology questions
- contact

If the question cannot be answered:
return a safe fallback inviting the user to contact the team.

Do not invent business policies.

Integrate the chosen chatbot provider only according to the existing architecture.

If no external chatbot is configured:
create a clean provider abstraction so it can be integrated later.

Do not expose secret keys in React.

Respect privacy and reduced motion.

DO NOT COMMIT.
DO NOT PUSH.