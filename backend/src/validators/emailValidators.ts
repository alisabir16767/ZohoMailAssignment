// validators/emailValidators.ts
import { z } from "zod";

export const createInvoiceSchema = z.object({
  userId: z.string().nonempty(),
  amount: z.number().positive(),
  items: z.array(z.string().nonempty()),
});

export const sendInvoiceEmailSchema = z.object({
  userId: z.string().nonempty(),
  invoiceId: z.string().nonempty(),
});

export const sendAlertEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().nonempty(),
  body: z.string().nonempty(),
});

export const createTicketSchema = z.object({
  userId: z.string().nonempty(),
  subject: z.string().nonempty(),
  message: z.string().nonempty(),
  eventName: z.string().nonempty(),
  eventDate: z.string().nonempty(), 
});

export const sendTicketEmailSchema = z.object({
  userId: z.string().nonempty(),
  ticketId: z.string().nonempty(),
});
