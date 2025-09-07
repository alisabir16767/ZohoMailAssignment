import PDFDocument from "pdfkit";

export const generateTicketPDF = async (ticket: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      doc.fontSize(20).text("Event Ticket", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Ticket Subject: ${ticket.subject}`);
      doc.text(`Message: ${ticket.message}`);
      doc.text(`Status: ${ticket.status}`);
      doc.text(`Event Name: ${ticket.eventName}`);
      doc.text(`Event Date: ${ticket.eventDate ? ticket.eventDate.toDateString() : "N/A"}`);
      doc.text(`Created At: ${ticket.createdAt ? ticket.createdAt.toDateString() : "N/A"}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
