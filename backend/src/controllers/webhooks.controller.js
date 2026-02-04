import { handleStripeWebhook } from "../services/payment.service.js";

const stripeWebhook = async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const result = await handleStripeWebhook({
      signature,
      rawBody: req.rawBody,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { stripeWebhook };
