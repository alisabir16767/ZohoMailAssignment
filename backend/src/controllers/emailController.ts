import { Request, Response } from "express";
import User from "../models/User";
import Invoice from "../models/Invoice";
import Ticket from "../models/Ticket";
import EmailLog from "../models/EmailLog";
import { sendInvoiceMail, sendAlertMail, sendTicketMail } from "../utils/zeptoMail";
import { generateTicketPDF } from "../utils/pdfGenerator";
import { wrapAsync } from "../utils/wrapAsync";
import {
  createInvoiceSchema,
  sendInvoiceEmailSchema,
  sendAlertEmailSchema,
  createTicketSchema,
  sendTicketEmailSchema,
} from "../validators/emailValidators";


export const createInvoice = wrapAsync(async (req: Request, res: Response) => {
  const { userId, amount, items } = createInvoiceSchema.parse(req.body);
console.log(req.body);
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const invoice = await Invoice.create({ user: userId, amount, items });
  console.log(invoice);
  res.status(201).json({ msg: "Invoice created successfully", invoice });
});



export const sendInvoiceEmail = wrapAsync(async (req: Request, res: Response) => {
  const { userId, invoiceId } = sendInvoiceEmailSchema.parse(req.body);

  const user = await User.findById(userId);
  const invoice = await Invoice.findById(invoiceId);
  if (!user || !invoice) return res.status(404).json({ msg: "User or Invoice not found" });

  const emailData = {
    to: user.email,
    subject: `Your Invoice #${invoice._id}`,
    body: `<h1>Invoice Details</h1>
           <p>Amount: ${invoice.amount}</p>
           <p>Items: ${invoice.items.join(", ")}</p>`,
  };

  const response = await sendInvoiceMail(emailData);

  await EmailLog.create({
    to: emailData.to,
    subject: emailData.subject,
    body: emailData.body,
    status: response.accepted.length > 0 ? "sent" : "failed",
    error: response.response || null,
  });

  res.status(200).json({ msg: "Invoice email sent successfully", response });
});



export const sendAlertEmail = wrapAsync(async (req: Request, res: Response) => {
  const { to, subject, body } = sendAlertEmailSchema.parse(req.body);

  const emailData = { to, subject, body };
  const response = await sendAlertMail(emailData);

  await EmailLog.create({
    to,
    subject,
    body,
    status: response.accepted.length > 0 ? "sent" : "failed",
    error: response.response || null,
  });

  res.status(200).json({ msg: "Alert email sent successfully", response });
});

export const createTicket = wrapAsync(async (req: Request, res: Response) => {
  const { userId, subject, message, eventName, eventDate } = createTicketSchema.parse(req.body);

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const ticket = await Ticket.create({ user: userId, subject, message, eventName, eventDate });
  res.status(201).json({ msg: "Ticket created successfully", ticket });
});

export const sendTicketEmail = wrapAsync(async (req: Request, res: Response) => {
  const { userId, ticketId } = sendTicketEmailSchema.parse(req.body);

  const user = await User.findById(userId);
  const ticket = await Ticket.findById(ticketId);
  if (!user || !ticket) return res.status(404).json({ msg: "User or Ticket not found" });

  const pdfBuffer = await generateTicketPDF(ticket);
  const emailData = {
    to: user.email,
    subject: `Your Ticket #${ticket._id}`,
    body: `<h1>Event Ticket</h1>
           <p>Event: ${ticket.eventName}</p>
           <p>Date: ${ticket.eventDate}</p>`,
    attachments: [{ filename: `Ticket-${ticket._id}.pdf`, content: pdfBuffer }],
  };

  const response = await sendTicketMail(emailData);

  await EmailLog.create({
    to: emailData.to,
    subject: emailData.subject,
    body: emailData.body,
    status: response.accepted.length > 0 ? "sent" : "failed",
    error: response.response || null,
  });

  res.status(200).json({ msg: "Ticket email sent successfully", response });
});
