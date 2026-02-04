import jwt from "jsonwebtoken";
import env from "../config/env.js";

const ensureSecret = (secret, code) => {
  if (!secret) {
    const error = new Error("Service unavailable");
    error.status = 500;
    error.code = code;
    throw error;
  }
};

const signAccessToken = (payload) => {
  ensureSecret(env.jwtSecret, "JWT_UNAVAILABLE");
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

const verifyAccessToken = (token) => {
  ensureSecret(env.jwtSecret, "JWT_UNAVAILABLE");
  return jwt.verify(token, env.jwtSecret);
};

const signRefreshToken = (payload) => {
  if (!env.enableRefreshTokens) {
    return null;
  }
  ensureSecret(env.jwtRefreshSecret, "REFRESH_UNAVAILABLE");
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
  });
};

const verifyRefreshToken = (token) => {
  ensureSecret(env.jwtRefreshSecret, "REFRESH_UNAVAILABLE");
  return jwt.verify(token, env.jwtRefreshSecret);
};

export {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
