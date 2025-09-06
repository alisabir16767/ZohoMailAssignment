// src/lib/validators.ts
import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export const CreateInvoiceSchema = z.object({
  userId: z.string().min(1, "User ID required"),
  amount: z.coerce.number().positive("Amount must be > 0"),
  items: z.string().min(1, "Comma separated items"),
});

export const SendInvoiceEmailSchema = z.object({
  userId: z.string().min(1),
  invoiceId: z.string().min(1),
});

export const SendAlertEmailSchema = z.object({
  userId: z.string().min(1),
  alertType: z.string().min(1),
  message: z.string().min(1),
});

export const SendTicketEmailSchema = z.object({
  userId: z.string().min(1),
  ticketId: z.string().min(1),
});
