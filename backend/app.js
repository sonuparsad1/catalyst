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
app.set("trust proxy", 1);

const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://catalystsociety.vercel.app",
  "https://catalyst-mvbin20ec-sonu-parsads-projects.vercel.app",
]);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, false);
    }

    return callback(null, allowedOrigins.has(origin));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

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
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/registrations", registrationsRoutes);

app.use(errorMiddleware);

export default app;
