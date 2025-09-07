import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { zeptoConfig } from "../config/zepto";

const transporter = nodemailer.createTransport({
  host: zeptoConfig.host,
  port: zeptoConfig.port,
  secure: false,
  auth: {
    user: zeptoConfig.user,
    pass: zeptoConfig.pass,
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
      from: zeptoConfig.fromEmail,
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
