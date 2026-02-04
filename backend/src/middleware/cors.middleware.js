import env from "../config/env.js";

const defaultOrigins = [
  "http://localhost:5173",
  "https://catalystsociety.vercel.app",
  "https://catalyst-mvbin20ec-sonu-parsads-projects.vercel.app",
];

const allowedOrigins = new Set(
  env.corsOrigins.length > 0 ? env.corsOrigins : defaultOrigins
);

const isOriginAllowed = (origin) => Boolean(origin) && allowedOrigins.has(origin);

const applyCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (!isOriginAllowed(origin)) {
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
};

const corsMiddleware = (req, res, next) => {
  applyCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return next();
};

export { applyCorsHeaders };
export default corsMiddleware;
