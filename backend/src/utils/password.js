import bcrypt from "bcrypt";

const hashPassword = (password) => bcrypt.hash(password, 12);

const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export { comparePassword, hashPassword };
