import express from "express";
import cors from "cors";
import helmet from "helmet";
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.use(errorMiddleware);

export default app;
