import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.ZEPTO_SMTP_HOST,
  port: Number(process.env.ZEPTO_SMTP_PORT) || 587,
  secure: false, // false for TLS (587)
  auth: {
    user: process.env.ZEPTO_SMTP_USER,
    pass: process.env.ZEPTO_SMTP_PASS,
  },
  family: 4, // force IPv4
} as SMTPTransport.Options); // <-- cast to SMTPTransport.Options

interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: { filename: string; content: Buffer }[];
}

export const sendEmailSMTP = async (data: EmailData) => {
  try {
    const mailOptions = {
      from: process.env.ZEPTO_FROM_EMAIL,
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
