const EXACT_ALLOWED_ORIGINS = new Set(["https://catalystsociety.vercel.app"]);

const isVercelOrigin = (origin) =>
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

const isOriginAllowed = (origin) =>
  Boolean(origin) &&
  (EXACT_ALLOWED_ORIGINS.has(origin) || isVercelOrigin(origin));

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
