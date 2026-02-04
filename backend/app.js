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
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin:
      env.corsOrigins.length > 0
        ? (origin, callback) => {
            if (!origin || env.corsOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error("Not allowed by CORS"));
            }
          }
        : false,
    credentials: env.corsAllowCredentials,
  })
);
app.use(express.json({ limit: "10kb" }));

app.use("/", indexRoutes);

const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests", code: "RATE_LIMITED" },
});

app.use("/api/v1", apiLimiter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/registrations", registrationsRoutes);

app.use(errorMiddleware);

export default app;
