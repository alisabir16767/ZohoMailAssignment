import { Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import path from "path";

export const sendInvoice = async (req: Request, res: Response) => {
  await sendEmail({
    to: req.body.email,
    subject: "Your Invoice",
    html: "<h3>Attached is your invoice</h3>",
    attachments: [{ filename: "invoice.pdf", path: path.join(__dirname, "../../files/invoice.pdf") }],
  });
  res.json({ msg: "Invoice sent" });
};

export const sendAlert = async (req: Request, res: Response) => {
  await sendEmail({
    to: req.body.email,
    subject: "Security Alert",
    html: `<h3>New login detected at ${new Date().toLocaleString()}</h3>`,
  });
  res.json({ msg: "Alert sent" });
};

export const sendTicket = async (req: Request, res: Response) => {
  await sendEmail({
    to: req.body.email,
    subject: "Your Event Ticket",
    html: "<h3>Here is your ticket</h3>",
    attachments: [{ filename: "ticket.pdf", path: path.join(__dirname, "../../files/ticket.pdf") }],
  });
  res.json({ msg: "Ticket sent" });
};
