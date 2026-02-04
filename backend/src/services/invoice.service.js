import PDFDocument from "pdfkit";

const generateInvoiceNumber = () => {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CS-${stamp}-${rand}`;
};

const generateInvoicePdf = ({ invoiceNumber, customerName, eventTitle, amount, currency }) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  doc.fontSize(20).text("Catalyst Society Invoice", { align: "left" });
  doc.moveDown(1);
  doc.fontSize(12).text(`Invoice: ${invoiceNumber}`);
  doc.text(`Billed to: ${customerName}`);
  doc.text(`Event: ${eventTitle}`);
  doc.text(`Amount: ${(amount / 100).toFixed(2)} ${currency}`);
  doc.moveDown(2);
  doc.fontSize(10).text("Thank you for supporting Catalyst Society.");
  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
};

export { generateInvoiceNumber, generateInvoicePdf };
