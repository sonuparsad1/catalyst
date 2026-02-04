import fs from "fs/promises";
import path from "path";

const logDir = path.resolve("logs");
const logFile = path.join(logDir, "audit.log");

const writeAuditLog = async (entry) => {
  await fs.mkdir(logDir, { recursive: true });
  await fs.appendFile(logFile, `${entry}\n`, "utf8");
};

const auditMiddleware = (req, res, next) => {
  res.on("finish", () => {
    const user = req.user || {};
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      userId: user.id || user._id || null,
      role: user.role || null,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
    writeAuditLog(entry).catch(() => null);
  });
  next();
};

export default auditMiddleware;
