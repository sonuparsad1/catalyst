import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import env from "./config/env.js";
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import ticketsRoutes from "./routes/tickets.routes.js";
import scanRoutes from "./routes/scan.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import dbGuard from "./middleware/dbGuard.middleware.js";

const app = express();
app.set("trust proxy", 1);

app.use(corsMiddleware);

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

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
app.use("/api/v1/tickets", dbGuard, ticketsRoutes);
app.use("/api/v1/scan", dbGuard, scanRoutes);

app.use(errorMiddleware);

export default app;
