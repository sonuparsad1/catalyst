import nodemailer from "nodemailer";
import env from "../config/env.js";

const createTransporter = () => {
  if (!env.mailHost || !env.mailUser || !env.mailPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.mailHost,
    port: env.mailPort,
    secure: env.mailPort === 465,
    auth: {
      user: env.mailUser,
      pass: env.mailPass,
    },
  });
};

const transporter = createTransporter();

const sendMail = async ({ to, subject, html, text }) => {
  if (!env.mailEnabled || !transporter) {
    return { delivered: false };
  }

  await transporter.sendMail({
    from: env.mailFrom,
    to,
    subject,
    html,
    text,
  });

  return { delivered: true };
};

export { sendMail };
