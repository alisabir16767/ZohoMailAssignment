// controllers/emailController.ts
import { Request, Response } from "express";
import User from "../models/User";
import Invoice from "../models/Invoice";
import Ticket from "../models/Ticket";
import EmailLog from "../models/EmailLog";
import { sendInvoiceMail, sendAlertMail, sendTicketMail } from "../utils/zeptoMail";
import { generateTicketPDF } from "../utils/pdfGenerator";


export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { userId, amount, items } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const invoice = await Invoice.create({
      user: userId,
      amount,
      items,
    });

    res.status(201).json({
      msg: "Invoice created successfully",
      invoice,
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
export const sendInvoiceEmail = async (req: Request, res: Response) => {
  try {
    const { userId, invoiceId } = req.body;

    const user = await User.findById(userId);
    const invoice = await Invoice.findById(invoiceId);

    if (!user || !invoice) {
      return res.status(404).json({ msg: "User or Invoice not found" });
    }

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
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};


export const sendAlertEmail = async (req: Request, res: Response) => {
  try {
    const { userId, alertType, message } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const emailData = {
      to: user.email,
      subject: `Alert: ${alertType}`,
      body: `<p>${message}</p>`,
    };

    const response = await sendAlertMail(emailData);

    await EmailLog.create({
      userId,
      to: emailData.to,
      subject: emailData.subject,
      body: emailData.body,
      type: "alert",
      status: response.accepted.length > 0 ? "sent" : "failed",
      smtpResponse: response.response,
      sentAt: new Date(),
    });

    res.status(200).json({ msg: "Alert email sent successfully", response });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};


export const createTicket = async (req: Request, res: Response) => {
  try {
    const { userId, subject, message, eventName, eventDate } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const ticket = await Ticket.create({
      user: userId,
      subject,
      message,
      eventName,
      eventDate,
    });

    res.status(201).json({
      msg: "Ticket created successfully",
      ticket,
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export const sendTicketEmail = async (req: Request, res: Response) => {
  try {
    const { userId, ticketId } = req.body;

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
      attachments: [
        { filename: `Ticket-${ticket._id}.pdf`, content: pdfBuffer },
      ],
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
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

