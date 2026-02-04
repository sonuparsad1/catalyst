import bcrypt from "bcrypt";
import env from "../config/env.js";

const withPepper = (password) => `${password}${env.passwordPepper}`;

const hashPassword = (password) => bcrypt.hash(withPepper(password), 12);

const comparePassword = (password, hash) =>
  bcrypt.compare(withPepper(password), hash);

export { comparePassword, hashPassword };
