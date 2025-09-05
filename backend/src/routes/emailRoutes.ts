import { Router } from "express";
import { sendInvoice, sendAlert, sendTicket } from "../controllers/emailController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/invoice", authMiddleware, sendInvoice);
router.post("/alert", authMiddleware, sendAlert);
router.post("/ticket", authMiddleware, sendTicket);

export default router;
