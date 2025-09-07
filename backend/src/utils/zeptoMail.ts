import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.ZEPTO_SMTP_HOST || "smtp.zeptomail.in",
  port: Number(process.env.ZEPTO_SMTP_PORT) || 587,
  secure: false, 
  auth: {
    user: process.env.ZEPTO_SMTP_USER || "emailapikey",
    pass: process.env.ZEPTO_SMTP_PASS || "",
  },
  tls: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
  family: 4, 
} as SMTPTransport.Options);

interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: { filename: string; content: Buffer }[];
}

export const sendEmailSMTP = async (data: EmailData) => {
  try {
    const mailOptions = {
      from: process.env.ZEPTO_FROM_EMAIL || '"Example Team" <noreply@smallbus.in>',
      to: data.to,
      subject: data.subject,
      html: data.body,
      attachments: data.attachments?.map(att => ({
        filename: att.filename,
        content: att.content,
      })),
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    };
  } catch (err: any) {
    console.error("SMTP send error:", err.message);
    throw new Error(err.message);
  }
};

export const sendInvoiceMail = sendEmailSMTP;
export const sendAlertMail = sendEmailSMTP;
export const sendTicketMail = sendEmailSMTP;
