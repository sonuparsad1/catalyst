import mongoose from "mongoose";
import env from "./env.js";
import { ServiceState, setServiceState } from "./serviceState.js";

const dbState = {
  enabled: false,
  connected: false,
};

const connectDb = async () => {
  if (!env.useDb) {
    dbState.enabled = false;
    dbState.connected = false;
    setServiceState(ServiceState.DB_DISABLED);
    return dbState;
  }

  dbState.enabled = true;

  if (!env.mongoUri) {
    console.warn("MONGO_URI is not set; skipping MongoDB connection.");
    dbState.connected = false;
    setServiceState(ServiceState.DB_DISABLED);
    return dbState;
  }

  try {
    await mongoose.connect(env.mongoUri);
    dbState.connected = true;
    setServiceState(ServiceState.READY);
    console.log("Connected to MongoDB");
  } catch (error) {
    dbState.connected = false;
    setServiceState(ServiceState.DEGRADED);
    console.error("MongoDB connection error:", error);
  }

  return dbState;
};

export { connectDb, dbState };
