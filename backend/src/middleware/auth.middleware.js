import env from "../config/env.js";
import { verifyAccessToken } from "../utils/jwt.js";

const parseCookies = (cookieHeader) =>
  cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((acc, cookie) => {
      const [key, ...valueParts] = cookie.split("=");
      acc[key] = decodeURIComponent(valueParts.join("="));
      return acc;
    }, {});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  const cookieHeader = req.headers.cookie || "";
  const cookies = cookieHeader ? parseCookies(cookieHeader) : {};
  const token = bearerToken || cookies[env.cookieName] || null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized", code: "UNAUTHORIZED" });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", code: "UNAUTHORIZED" });
  }
};

export default authMiddleware;
