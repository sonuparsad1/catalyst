import dotenv from "dotenv";

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5001,
  useDb: process.env.USE_DB === "true",
  mongoUri: process.env.MONGO_URI || "",
  corsOrigins: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  corsAllowCredentials: process.env.CORS_ALLOW_CREDENTIALS === "true",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30m",
  enableRefreshTokens: process.env.ENABLE_REFRESH_TOKENS === "true",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  cookieName: process.env.COOKIE_NAME || "accessToken",
  cookieSecure: process.env.COOKIE_SECURE === "true",
  cookieDomain: process.env.COOKIE_DOMAIN || "",
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,
  qrSecret: process.env.QR_SECRET || "",
};

export default env;
