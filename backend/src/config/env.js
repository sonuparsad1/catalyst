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
  passwordPepper: process.env.PASSWORD_PEPPER || "",
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  paymentCurrency: (process.env.PAYMENT_CURRENCY || "INR").toUpperCase(),
  mailEnabled: process.env.MAIL_ENABLED === "true",
  mailHost: process.env.MAIL_HOST || "",
  mailPort: Number(process.env.MAIL_PORT) || 587,
  mailUser: process.env.MAIL_USER || "",
  mailPass: process.env.MAIL_PASS || "",
  mailFrom: process.env.MAIL_FROM || "no-reply@catalystsociety.com",
  dashboardBaseUrl: process.env.DASHBOARD_BASE_URL || "",
  qrSecret: process.env.QR_SECRET || "",
};

export default env;
