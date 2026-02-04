import jwt from "jsonwebtoken";
import env from "../config/env.js";
import AppError from "../utils/appError.js";

const ensureJwtSecret = () => {
  if (!env.jwtSecret) {
    throw new AppError("Service unavailable", 503, "JWT_UNAVAILABLE");
  }
};

const ensureRefreshSecret = () => {
  if (!env.jwtRefreshSecret) {
    throw new AppError("Service unavailable", 503, "REFRESH_UNAVAILABLE");
  }
};

const signAccessToken = (payload) => {
  ensureJwtSecret();
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

const signRefreshToken = (payload) => {
  if (!env.enableRefreshTokens) {
    return null;
  }
  ensureRefreshSecret();
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
  });
};

const verifyRefreshToken = (token) => {
  ensureRefreshSecret();
  return jwt.verify(token, env.jwtRefreshSecret);
};

export { signAccessToken, signRefreshToken, verifyRefreshToken };
