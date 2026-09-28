const express = require("express");
const cors = require("cors");
const leadRouter = require("./router/leadRouter");

const app = express();
const port = Number(process.env.PORT) || 5000;
const configuredOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const allowedOrigins = [
  ...configuredOrigin.split(",").map((s) => s.trim()),
  "http://localhost:3001",
  "http://127.0.0.1:3000",
];
const requestLog = new Map();

app.set("trust proxy", 1);
app.disable("x-powered-by");

// Standard security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/+$/, "");
      if (allowedOrigins.includes(normalized)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
  }),
);
app.use(express.json({ limit: "10kb" }));

app.use("/api/leads", (req, res, next) => {
  const forwarded = req.headers["x-forwarded-for"];
  const key = (forwarded ? String(forwarded).split(",")[0].trim() : req.ip) || "unknown";
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter(
    (timestamp) => now - timestamp < 60_000,
  );
  if (recent.length >= 10)
    return res
      .status(429)
      .json({ success: false, message: "Too many requests" });
  recent.push(now);
  requestLog.set(key, recent);

  // Periodic pruning to prevent memory leak
  if (requestLog.size > 1000) {
    for (const [ipKey, timestamps] of requestLog.entries()) {
      if (timestamps.every((t) => now - t >= 60_000)) {
        requestLog.delete(ipKey);
      }
    }
  }

  return next();
});

app.get("/health", (req, res) => res.json({ success: true, status: "ok" }));
app.use("/api", leadRouter);
app.use((error, req, res, next) => {
  console.error("Request failed", { path: req.path, message: error.message });
  const status = error.type === "entity.parse.failed" ? 400 : 500;
  return res.status(status).json({
    success: false,
    message: status === 400 ? "Malformed request" : "Unable to submit request",
  });
});

if (require.main === module)
  app.listen(port, () => console.info(`API listening on port ${port}`));

module.exports = app;
