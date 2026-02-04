import crypto from "crypto";
import env from "../config/env.js";
import AppError from "../utils/appError.js";

const ensureSecret = () => {
  if (!env.qrSecret) {
    throw new AppError("QR secret not configured", 500, "QR_SECRET_MISSING");
  }
};

const base64UrlEncode = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const base64UrlDecode = (value) => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + "=".repeat(padLength), "base64").toString();
};

const signPayload = (ticketId, eventId) => {
  ensureSecret();
  return crypto
    .createHmac("sha256", env.qrSecret)
    .update(`${ticketId}${eventId}`)
    .digest("hex");
};

const createQrData = (ticketId, eventId) => {
  const payload = {
    tid: ticketId,
    eid: eventId,
    sig: signPayload(ticketId, eventId),
  };

  const encoded = base64UrlEncode(JSON.stringify(payload));
  return { payload, encoded };
};

const verifyQrData = (encoded) => {
  ensureSecret();
  let parsed;
  try {
    parsed = JSON.parse(base64UrlDecode(encoded));
  } catch (error) {
    throw new AppError("Invalid QR payload", 400, "INVALID_QR");
  }

  if (!parsed?.tid || !parsed?.eid || !parsed?.sig) {
    throw new AppError("Invalid QR payload", 400, "INVALID_QR");
  }

  const expected = signPayload(parsed.tid, parsed.eid);
  if (expected !== parsed.sig) {
    throw new AppError("Signature mismatch", 400, "QR_SIGNATURE_INVALID");
  }

  return { ticketId: parsed.tid, eventId: parsed.eid };
};

export { createQrData, verifyQrData };
