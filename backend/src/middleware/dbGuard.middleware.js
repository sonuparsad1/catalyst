import env from "../config/env.js";

const dbGuard = (_req, res, next) => {
  if (!env.useDb) {
    return res
      .status(503)
      .json({ message: "Database not enabled", code: "DB_DISABLED" });
  }

  return next();
};

export default dbGuard;
