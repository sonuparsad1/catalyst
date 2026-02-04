import env from "../config/env.js";
import User from "../models/User.model.js";
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

const authMiddleware = async (req, res, next) => {
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
    const user = await User.findById(payload.sub).select(
      "_id name email role tokenVersion"
    );
    if (!user || user.tokenVersion !== payload.ver) {
      return res
        .status(401)
        .json({ message: "Unauthorized", code: "UNAUTHORIZED" });
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", code: "UNAUTHORIZED" });
  }
};

export default authMiddleware;
