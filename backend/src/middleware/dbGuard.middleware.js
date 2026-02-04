import { ServiceState, getServiceState } from "../config/serviceState.js";

const dbGuard = (_req, res, next) => {
  const state = getServiceState();
  if (state !== ServiceState.READY) {
    const code = state === ServiceState.DB_DISABLED ? "DB_DISABLED" : "DEGRADED";
    return res
      .status(503)
      .json({ message: "Service temporarily unavailable", code });
  }

  return next();
};

export default dbGuard;
