const express = require("express");
const cors = require("cors");
const leadRouter = require("./router/leadRouter");

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const requestLog = new Map();

app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "10kb" }));

app.use("/api/leads", (req, res, next) => {
  const key = req.ip || "unknown";
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
