import mongoose from "mongoose";
import app from "./app.js";
import env from "./config/env.js";

const startServer = () => {
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

if (env.useDb) {
  if (!env.mongoUri) {
    console.warn("MONGO_URI is not set; skipping MongoDB connection.");
    startServer();
  } else {
    mongoose
      .connect(env.mongoUri)
      .then(() => {
        console.log("Connected to MongoDB");
        startServer();
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        startServer();
      });
  }
} else {
  console.log("MongoDB disabled (USE_DB=false)");
  startServer();
}
