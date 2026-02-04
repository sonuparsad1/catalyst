import dotenv from "dotenv";

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 5001,
  useDb: process.env.USE_DB === "true",
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30m",
};

export default env;
