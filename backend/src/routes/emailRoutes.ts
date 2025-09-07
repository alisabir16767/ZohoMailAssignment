import { Router } from "express";
import { 
  createInvoice, 
  sendInvoiceEmail, 
  sendAlertEmail, 
  sendTicketEmail, 
  createTicket 
} from "../controllers/emailController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/invoice", authMiddleware, createInvoice);
router.post("/invoice/send", authMiddleware, sendInvoiceEmail);

router.post("/alert", authMiddleware, sendAlertEmail);

router.post("/ticket", authMiddleware, createTicket);
router.post("/ticket/send", authMiddleware, sendTicketEmail);

export default router;
