import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.ZEPTO_API_KEY,
  },
});

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: { filename: string; path: string }[];
}

export const sendEmail = async ({ to, subject, html, attachments }: MailOptions) => {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
    attachments,
  });
};
