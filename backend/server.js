import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;

if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
} else {
  console.warn("MONGO_URI is not set; skipping MongoDB connection.");
}

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    platform: "Catalyst Society",
    backend: "Running",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
