import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import env from "./config/env.js";
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import registrationsRoutes from "./routes/registrations.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import webhooksRoutes from "./routes/webhooks.routes.js";
import refundsRoutes from "./routes/refunds.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import dbGuard from "./middleware/dbGuard.middleware.js";

const app = express();
app.set("trust proxy", 1);

const defaultOrigins = [
  "http://localhost:5173",
  "https://catalystsociety.vercel.app",
  "https://catalyst-mvbin20ec-sonu-parsads-projects.vercel.app",
];

const allowedOrigins = new Set(
  env.corsOrigins.length > 0 ? env.corsOrigins : defaultOrigins
);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, false);
    }

    return callback(null, allowedOrigins.has(origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: env.corsAllowCredentials || true,
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(
  express.json({
    limit: "10kb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use("/", indexRoutes);

const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  keyGenerator: (req) => req.ip,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests", code: "RATE_LIMITED" },
});

app.use("/api/v1", apiLimiter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", dbGuard, usersRoutes);
app.use("/api/v1/events", dbGuard, eventsRoutes);
app.use("/api/v1/registrations", dbGuard, registrationsRoutes);
app.use("/api/v1/payments", dbGuard, paymentsRoutes);
app.use("/api/v1/webhooks", dbGuard, webhooksRoutes);
app.use("/api/v1/refunds", dbGuard, refundsRoutes);
app.use("/api/v1/analytics", dbGuard, analyticsRoutes);

app.use(errorMiddleware);

export default app;
