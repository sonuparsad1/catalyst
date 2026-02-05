import env from "../config/env.js";
import { applyCorsHeaders } from "./cors.middleware.js";

const errorMiddleware = (err, req, res, _next) => {
  applyCorsHeaders(req, res);

  const status = Number.isInteger(err.status) ? err.status : 500;
  const code = err.code || (status === 500 ? "INTERNAL_ERROR" : "REQUEST_FAILED");
  const message =
    status === 500 && env.nodeEnv === "production"
      ? "Internal server error"
      : err.message || "Request failed";

  return res.status(status).json({ message, code, status });
};

export default errorMiddleware;
