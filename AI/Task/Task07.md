TASK07 — FAQ + CTA + LEAD FORM

Read AI/*.md.

FAQ:
Implement all 5 provided questions and answers.

Interaction:
- accordion
- smooth expand/collapse
- accessible keyboard controls
- aria-expanded
- only one open at a time if compatible with the design
- responsive

FAQ ending:
"Vẫn còn băn khoăn? Chat ngay với chúng tôi hoặc bấm nút bên dưới để nhận ưu đãi."

CTA:
"NHẬN BẢN ĐÁNH GIÁ MARKETING MIỄN PHÍ"

FORM:
Fields:
- Business Name
- Phone Number

Phone:
- exactly 10 digits
- normalize input
- validate frontend
- backend remains source of truth

States:
- idle
- typing
- submitting
- success
- failure
- validation error

Submit:
POST /api/leads

Do not expose backend secrets.

Success:
Show clear successful submission notification.

Failure:
Show clear error notification.

Prevent double submission.

Make form reusable for future pages.

Test:
- valid number
- invalid number
- missing business name
- server error
- success response
- mobile keyboard behavior
- accessibility
- responsive layout

DO NOT COMMIT.
DO NOT PUSH.