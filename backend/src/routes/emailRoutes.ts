import { Router } from "express";
import {
  createInvoice,
  sendInvoiceEmail,
  sendAlertEmail,
  sendTicketEmail,
} from "../controllers/emailController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/createInvoice",authMiddleware,createInvoice);
router.post("/invoice", authMiddleware, sendInvoiceEmail);
router.post("/alert", authMiddleware, sendAlertEmail);
router.post("/ticket", authMiddleware, sendTicketEmail);

export default router;
