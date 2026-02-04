import { getAnalytics } from "../services/payment.service.js";

const dashboard = async (_req, res, next) => {
  try {
    const result = await getAnalytics();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { dashboard };
