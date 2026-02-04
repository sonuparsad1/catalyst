import Stripe from "stripe";
import env from "../config/env.js";
import AppError from "../utils/appError.js";
import Event from "../models/Event.js";
import Payment from "../models/Payment.model.js";
import Registration from "../models/Registration.js";
import Invoice from "../models/Invoice.model.js";
import Refund from "../models/Refund.model.js";
import User from "../models/User.model.js";
import { generateInvoiceNumber, generateInvoicePdf } from "./invoice.service.js";
import { sendMail } from "./mail.service.js";

const stripe = env.stripeSecretKey
  ? new Stripe(env.stripeSecretKey, { apiVersion: "2024-06-20" })
  : null;

const ensureDatabaseEnabled = () => {
  if (!env.useDb) {
    throw new AppError("Database not enabled", 503, "DB_DISABLED");
  }
};

const ensureStripeEnabled = () => {
  if (!stripe) {
    throw new AppError("Payments unavailable", 503, "PAYMENT_DISABLED");
  }
};

const appendPaymentAudit = async (paymentId, entry) => {
  await Payment.updateOne(
    { _id: paymentId },
    { $push: { auditLog: { ...entry, createdAt: new Date() } } }
  );
};

const appendRefundAudit = async (refundId, entry) => {
  await Refund.updateOne(
    { _id: refundId },
    { $push: { auditLog: { ...entry, createdAt: new Date() } } }
  );
};

const createPaymentOrder = async ({ userId, eventId, idempotencyKey }) => {
  ensureDatabaseEnabled();
  ensureStripeEnabled();

  const event = await Event.findById(eventId);
  if (!event || !event.isPublished) {
    throw new AppError("Event not found", 404, "EVENT_NOT_FOUND");
  }

  if (event.ticketPrice <= 0) {
    throw new AppError("Event is free", 400, "EVENT_FREE");
  }

  if (idempotencyKey) {
    const existingPayment = await Payment.findOne({ idempotencyKey, user: userId });
    if (existingPayment?.providerPaymentIntentId) {
      const intent = await stripe.paymentIntents.retrieve(
        existingPayment.providerPaymentIntentId
      );
      return {
        paymentId: existingPayment.id,
        clientSecret: intent.client_secret,
        amount: existingPayment.amount,
        currency: existingPayment.currency,
        status: existingPayment.status,
      };
    }
  }

  let registration = await Registration.findOne({ user: userId, event: event.id });
  if (registration && registration.paymentStatus === "paid") {
    throw new AppError("Already registered", 409, "ALREADY_REGISTERED");
  }

  if (!registration) {
    registration = await Registration.create({
      user: userId,
      event: event.id,
      status: "pending",
      paymentStatus: "pending",
      isActive: false,
    });
  } else {
    registration.status = "pending";
    registration.paymentStatus = "pending";
    registration.isActive = false;
    await registration.save();
  }

  const amount = Math.round(event.ticketPrice * 100);
  const currency = event.currency || env.paymentCurrency;

  const intent = await stripe.paymentIntents.create(
    {
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        eventId: event.id,
        userId,
        registrationId: registration.id,
      },
    },
    idempotencyKey ? { idempotencyKey } : undefined
  );

  const payment = await Payment.create({
    user: userId,
    event: event.id,
    registration: registration.id,
    amount,
    currency,
    providerPaymentIntentId: intent.id,
    status: "pending",
    idempotencyKey,
    metadata: {
      eventTitle: event.title,
    },
  });

  registration.payment = payment.id;
  await registration.save();

  await appendPaymentAudit(payment.id, {
    action: "payment_intent_created",
    actor: userId,
    metadata: { providerPaymentIntentId: intent.id },
  });

  return {
    paymentId: payment.id,
    clientSecret: intent.client_secret,
    amount,
    currency,
    status: payment.status,
    event: {
      id: event.id,
      title: event.title,
    },
  };
};

const listPaymentsForUser = async (userId) => {
  ensureDatabaseEnabled();

  const payments = await Payment.find({ user: userId })
    .populate("event", "title startsAt location")
    .sort({ createdAt: -1 });

  return payments.map((payment) => ({
    id: payment.id,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    createdAt: payment.createdAt,
    event: payment.event
      ? {
          id: payment.event.id,
          title: payment.event.title,
          startsAt: payment.event.startsAt,
          location: payment.event.location,
        }
      : null,
  }));
};

const listPaymentsForAdmin = async () => {
  ensureDatabaseEnabled();

  const payments = await Payment.find()
    .populate("event", "title")
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(200);

  return payments.map((payment) => ({
    id: payment.id,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    createdAt: payment.createdAt,
    user: payment.user
      ? { id: payment.user.id, name: payment.user.name, email: payment.user.email }
      : null,
    event: payment.event ? { id: payment.event.id, title: payment.event.title } : null,
  }));
};

const listInvoicesForUser = async (userId) => {
  ensureDatabaseEnabled();

  const invoices = await Invoice.find({ user: userId })
    .populate("event", "title")
    .sort({ issuedAt: -1 });

  return invoices.map((invoice) => ({
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    amount: invoice.amount,
    currency: invoice.currency,
    status: invoice.status,
    issuedAt: invoice.issuedAt,
    event: invoice.event ? { id: invoice.event.id, title: invoice.event.title } : null,
  }));
};

const getInvoicePdf = async (userId, invoiceId) => {
  ensureDatabaseEnabled();

  const invoice = await Invoice.findOne({ _id: invoiceId, user: userId });
  if (!invoice || !invoice.pdfBuffer) {
    throw new AppError("Invoice not found", 404, "INVOICE_NOT_FOUND");
  }

  return {
    buffer: invoice.pdfBuffer,
    mime: invoice.pdfMime,
    filename: `${invoice.invoiceNumber}.pdf`,
  };
};

const recordWebhookEvent = async (paymentId, eventId) => {
  const result = await Payment.updateOne(
    { _id: paymentId, webhookEvents: { $ne: eventId } },
    { $addToSet: { webhookEvents: eventId } }
  );
  return result.modifiedCount > 0;
};

const handleStripeWebhook = async ({ signature, rawBody }) => {
  ensureDatabaseEnabled();
  ensureStripeEnabled();

  if (!env.stripeWebhookSecret) {
    throw new AppError("Webhook secret missing", 500, "WEBHOOK_SECRET_MISSING");
  }

  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    env.stripeWebhookSecret
  );

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const payment = await Payment.findOne({ providerPaymentIntentId: intent.id });
    if (!payment) {
      return { received: true };
    }

    const isNew = await recordWebhookEvent(payment.id, event.id);
    if (!isNew) {
      return { received: true };
    }

    payment.status = "succeeded";
    payment.providerChargeId = intent.latest_charge;
    await payment.save();

    await appendPaymentAudit(payment.id, {
      action: "payment_succeeded",
      actor: "webhook",
      metadata: { eventId: event.id },
    });

    const registration = await Registration.findById(payment.registration);
    if (registration) {
      registration.paymentStatus = "paid";
      registration.status = "registered";
      registration.isActive = true;
      await registration.save();
    }

    const existingInvoice = await Invoice.findOne({ payment: payment.id });
    if (!existingInvoice) {
      const user = await User.findById(payment.user);
      const eventDoc = await Event.findById(payment.event);
      const invoiceNumber = generateInvoiceNumber();
      const pdfBuffer = await generateInvoicePdf({
        invoiceNumber,
        customerName: user?.name || "Member",
        eventTitle: eventDoc?.title || "Event",
        amount: payment.amount,
        currency: payment.currency,
      });

      const invoice = await Invoice.create({
        payment: payment.id,
        user: payment.user,
        event: payment.event,
        amount: payment.amount,
        currency: payment.currency,
        invoiceNumber,
        pdfBuffer,
        pdfMime: "application/pdf",
      });

      if (user?.email) {
        await sendMail({
          to: user.email,
          subject: "Your Catalyst Society ticket is confirmed",
          text: `Your ticket is confirmed for ${eventDoc?.title || "the event"}.`,
          html: `<p>Your ticket is confirmed for <strong>${eventDoc?.title || "the event"}</strong>.</p>`,
        });
        await sendMail({
          to: user.email,
          subject: "Your invoice is ready",
          text: `Invoice ${invoice.invoiceNumber} has been issued.`,
          html: `<p>Invoice <strong>${invoice.invoiceNumber}</strong> has been issued.</p>`,
        });
      }
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object;
    const payment = await Payment.findOne({ providerPaymentIntentId: intent.id });
    if (!payment) {
      return { received: true };
    }

    const isNew = await recordWebhookEvent(payment.id, event.id);
    if (!isNew) {
      return { received: true };
    }

    payment.status = "failed";
    await payment.save();

    await appendPaymentAudit(payment.id, {
      action: "payment_failed",
      actor: "webhook",
      metadata: { eventId: event.id },
    });

    const registration = await Registration.findById(payment.registration);
    if (registration) {
      registration.paymentStatus = "failed";
      registration.status = "cancelled";
      registration.isActive = false;
      await registration.save();
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object;
    const payment = await Payment.findOne({ providerChargeId: charge.id });
    if (!payment) {
      return { received: true };
    }

    const isNew = await recordWebhookEvent(payment.id, event.id);
    if (!isNew) {
      return { received: true };
    }

    payment.status = "refunded";
    await payment.save();

    const registration = await Registration.findById(payment.registration);
    if (registration) {
      registration.paymentStatus = "refunded";
      registration.isActive = false;
      await registration.save();
    }

    await Invoice.updateOne({ payment: payment.id }, { status: "refunded" });
  }

  return { received: true };
};

const requestRefund = async ({ userId, paymentId, reason }) => {
  ensureDatabaseEnabled();

  const payment = await Payment.findOne({ _id: paymentId, user: userId });
  if (!payment) {
    throw new AppError("Payment not found", 404, "PAYMENT_NOT_FOUND");
  }

  if (payment.status !== "succeeded") {
    throw new AppError("Refund not allowed", 400, "REFUND_NOT_ALLOWED");
  }

  const existing = await Refund.findOne({ payment: payment.id, status: { $ne: "failed" } });
  if (existing) {
    throw new AppError("Refund already requested", 409, "REFUND_EXISTS");
  }

  const refund = await Refund.create({
    payment: payment.id,
    user: payment.user,
    amount: payment.amount,
    currency: payment.currency,
    reason,
    status: "requested",
  });

  await appendRefundAudit(refund.id, {
    action: "refund_requested",
    actor: userId,
    metadata: { paymentId: payment.id },
  });

  return {
    id: refund.id,
    status: refund.status,
    amount: refund.amount,
    currency: refund.currency,
  };
};

const listRefundsForUser = async (userId) => {
  ensureDatabaseEnabled();

  const refunds = await Refund.find({ user: userId })
    .populate("payment", "status")
    .sort({ createdAt: -1 });

  return refunds.map((refund) => ({
    id: refund.id,
    status: refund.status,
    amount: refund.amount,
    currency: refund.currency,
    reason: refund.reason,
    requestedAt: refund.requestedAt,
    paymentStatus: refund.payment?.status,
  }));
};

const listRefundsForAdmin = async () => {
  ensureDatabaseEnabled();

  const refunds = await Refund.find()
    .populate("payment", "status")
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(200);

  return refunds.map((refund) => ({
    id: refund.id,
    status: refund.status,
    amount: refund.amount,
    currency: refund.currency,
    reason: refund.reason,
    requestedAt: refund.requestedAt,
    user: refund.user
      ? { id: refund.user.id, name: refund.user.name, email: refund.user.email }
      : null,
    paymentStatus: refund.payment?.status,
  }));
};

const processRefund = async ({ refundId, adminId }) => {
  ensureDatabaseEnabled();
  ensureStripeEnabled();

  const refund = await Refund.findById(refundId).populate("payment");
  if (!refund || !refund.payment) {
    throw new AppError("Refund not found", 404, "REFUND_NOT_FOUND");
  }

  if (refund.status !== "requested") {
    throw new AppError("Refund already processed", 409, "REFUND_PROCESSED");
  }

  refund.status = "processing";
  await refund.save();

  const stripeRefund = await stripe.refunds.create({
    payment_intent: refund.payment.providerPaymentIntentId,
    amount: refund.amount,
  });

  refund.status = "succeeded";
  refund.providerRefundId = stripeRefund.id;
  refund.processedAt = new Date();
  await refund.save();

  await appendRefundAudit(refund.id, {
    action: "refund_processed",
    actor: adminId,
    metadata: { providerRefundId: stripeRefund.id },
  });

  await Payment.updateOne({ _id: refund.payment.id }, { status: "refunded" });
  await Registration.updateOne(
    { _id: refund.payment.registration },
    { paymentStatus: "refunded", isActive: false }
  );
  await Invoice.updateOne({ payment: refund.payment.id }, { status: "refunded" });

  const user = await User.findById(refund.user);
  if (user?.email) {
    await sendMail({
      to: user.email,
      subject: "Your refund has been processed",
      text: "Your refund request has been completed.",
      html: "<p>Your refund request has been completed.</p>",
    });
  }

  return {
    id: refund.id,
    status: refund.status,
    amount: refund.amount,
    currency: refund.currency,
  };
};

const getAnalytics = async () => {
  ensureDatabaseEnabled();

  const [payments, refunds, activeTickets] = await Promise.all([
    Payment.aggregate([
      { $match: { status: "succeeded" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
          totalPayments: { $sum: 1 },
        },
      },
    ]),
    Refund.aggregate([
      { $match: { status: "succeeded" } },
      { $group: { _id: null, totalRefunds: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]),
    Registration.countDocuments({ isActive: true }),
  ]);

  const paymentSummary = payments[0] || { totalRevenue: 0, totalPayments: 0 };
  const refundSummary = refunds[0] || { totalRefunds: 0, count: 0 };

  return {
    totalRevenue: paymentSummary.totalRevenue,
    totalPayments: paymentSummary.totalPayments,
    totalRefunds: refundSummary.totalRefunds,
    refundCount: refundSummary.count,
    activeTickets,
  };
};

export {
  createPaymentOrder,
  listPaymentsForUser,
  listPaymentsForAdmin,
  listInvoicesForUser,
  getInvoicePdf,
  handleStripeWebhook,
  requestRefund,
  listRefundsForUser,
  listRefundsForAdmin,
  processRefund,
  getAnalytics,
};
