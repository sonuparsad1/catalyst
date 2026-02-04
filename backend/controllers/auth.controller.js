import {
  getProfile,
  loginUser,
  registerUser,
} from "../services/auth.service.js";

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const result = await getProfile(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const logout = (_req, res) => {
  res.json({ message: "Logged out" });
};

export { login, logout, me, register };
