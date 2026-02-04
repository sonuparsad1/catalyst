import {
  requestRefund,
  listRefundsForUser,
  listRefundsForAdmin,
  processRefund,
} from "../services/payment.service.js";

const createRefund = async (req, res, next) => {
  try {
    const result = await requestRefund({
      userId: req.user.id,
      paymentId: req.body.paymentId,
      reason: req.body.reason,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const listRefunds = async (req, res, next) => {
  try {
    const result = await listRefundsForUser(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const listRefundsAdmin = async (_req, res, next) => {
  try {
    const result = await listRefundsForAdmin();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const processRefundRequest = async (req, res, next) => {
  try {
    const result = await processRefund({
      refundId: req.params.id,
      adminId: req.user.id,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { createRefund, listRefunds, listRefundsAdmin, processRefundRequest };
