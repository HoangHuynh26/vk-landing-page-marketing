Define security requirements for the project.

Include:

1. Environment variables
2. .env protection
3. .gitignore
4. Secrets management
5. Make webhook protection
6. API security
7. CORS
8. Rate limiting
9. Request size limits
10. Input validation
11. Input sanitization
12. Phone number validation
13. Error handling
14. Production error response
15. Logging
16. Privacy
17. Customer data handling
18. Google Sheets data handling
19. Chatbot privacy
20. Live notification privacy
21. XSS prevention
22. CSRF considerations
23. Injection prevention
24. HTTPS
25. Dependency security
26. Security headers where appropriate
27. Avoiding secret exposure in frontend
28. Git security
29. Deployment security

Explicit rules:

NEVER:
- commit .env
- expose secret keys in React
- expose Make webhook secrets in browser code
- log sensitive customer information unnecessarily
- fabricate real customer activity in production notifications

Document practical implementation expectations, not theoretical security jargon.