import dotenv from "dotenv";
dotenv.config();

export const zeptoConfig = {
  host: process.env.ZEPTO_SMTP_HOST || "smtp.zeptomail.in",
  port: Number(process.env.ZEPTO_SMTP_PORT) || 587,
  user: process.env.ZEPTO_SMTP_USER || "emailapikey",
  pass: process.env.ZEPTO_SMTP_PASS || "",
  fromEmail: process.env.ZEPTO_FROM_EMAIL || '"Example Team" <noreply@smallbus.in>',
};
