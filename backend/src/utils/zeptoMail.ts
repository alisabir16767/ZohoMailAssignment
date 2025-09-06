// utils/zeptoMail.ts
import axios from "axios";

const ZEPTO_API_URL = "https://mail.zoho.com/api/accounts/YOUR_ACCOUNT_ID/messages";
const API_KEY = process.env.ZEPTO_API_KEY; // store in .env

interface EmailData {
  to: string;
  subject: string;
  body: string;
  attachments?: { filename: string; content: Buffer }[];
}

// Generic send email function
export const sendEmail = async (data: EmailData) => {
  try {
    const payload: any = {
      fromAddress: "your_email@yourdomain.com",
      toAddress: data.to,
      subject: data.subject,
      content: data.body,
    };

    if (data.attachments) {
      payload.attachments = data.attachments.map(att => ({
        name: att.filename,
        content: att.content.toString("base64"),
      }));
    }

    const response = await axios.post(ZEPTO_API_URL, payload, {
      headers: {
        Authorization: `Zoho-oauthtoken ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Exported functions for clarity
export const sendInvoiceMail = sendEmail;
export const sendAlertMail = sendEmail;
export const sendTicketMail = sendEmail;
