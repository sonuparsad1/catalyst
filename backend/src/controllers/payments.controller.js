import {
  createPaymentOrder,
  listPaymentsForUser,
  listPaymentsForAdmin,
  listInvoicesForUser,
  getInvoicePdf,
} from "../services/payment.service.js";

const createOrder = async (req, res, next) => {
  try {
    const result = await createPaymentOrder({
      userId: req.user.id,
      eventId: req.body.eventId,
      idempotencyKey: req.headers["idempotency-key"],
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const listPayments = async (req, res, next) => {
  try {
    const result = await listPaymentsForUser(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const listAdminPayments = async (_req, res, next) => {
  try {
    const result = await listPaymentsForAdmin();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const listInvoices = async (req, res, next) => {
  try {
    const result = await listInvoicesForUser(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const downloadInvoice = async (req, res, next) => {
  try {
    const { buffer, mime, filename } = await getInvoicePdf(
      req.user.id,
      req.params.id
    );
    res.setHeader("Content-Type", mime);
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export { createOrder, listPayments, listAdminPayments, listInvoices, downloadInvoice };
