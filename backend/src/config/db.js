import mongoose from "mongoose";
import env from "./env.js";

const dbState = {
  enabled: false,
  connected: false,
};

const connectDb = async () => {
  if (!env.useDb) {
    dbState.enabled = false;
    dbState.connected = false;
    return dbState;
  }

  dbState.enabled = true;

  if (!env.mongoUri) {
    console.warn("MONGO_URI is not set; skipping MongoDB connection.");
    dbState.connected = false;
    return dbState;
  }

  try {
    await mongoose.connect(env.mongoUri);
    dbState.connected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    dbState.connected = false;
    console.error("MongoDB connection error:", error);
  }

  return dbState;
};

export { connectDb, dbState };
