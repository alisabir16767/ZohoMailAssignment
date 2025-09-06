// utils/pdfGenerator.ts
import PDFDocument from "pdfkit";
import { ITicket } from "../models/Ticket";

export const generateTicketPDF = async (ticket: ITicket): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks: any[] = [];

      doc.on("data", chunk => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      doc.fontSize(20).text("Event Ticket", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Ticket Subject: ${ticket.subject}`);
      doc.text(`Message: ${ticket.message}`);
      doc.text(`Status: ${ticket.status}`);
      doc.text(`Created At: ${ticket.createdAt?.toDateString() || "N/A"}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
