import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (order, showAlert) => {
  try {
    if (!order || !order.orderId || !order.items?.length) {
      if (showAlert) showAlert({ show: true, type: 'error', message: 'Invalid order data.' });
      return;
    }

    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // Brand Header
    doc.setFillColor(255, 193, 7);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("WING HOBBIES", 105, 18, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("RC Models & Accessories", 105, 25, { align: "center" });
    doc.text("Phone: +91 7985079854 | Email: support@winghobbies.com", 105, 31, { align: "center" });

    // Invoice Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("TAX INVOICE", 15, 48);

    // Left: Invoice Info
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const leftY = 56;
    doc.text(`Invoice No: ${order.orderId}`, 15, leftY);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`, 15, leftY + 6);
    doc.text(`Payment: ${order.payment?.method?.toUpperCase() || "N/A"}`, 15, leftY + 12);
    doc.text(`Status: ${order.status?.toUpperCase() || "N/A"}`, 15, leftY + 18);

    // Right: Customer Info
    const rightX = 120;
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", rightX, leftY);
    doc.setFont("helvetica", "normal");
    doc.text(order.shipping?.name || "N/A", rightX, leftY + 6);
    doc.text(order.shipping?.address || "", rightX, leftY + 12, { maxWidth: 75 });
    doc.text(`${order.shipping?.city || ""}, ${order.shipping?.state || ""}`, rightX, leftY + 18);
    doc.text(`PIN: ${order.shipping?.pincode || "N/A"}`, rightX, leftY + 24);
    doc.text(`Phone: ${order.shipping?.phone || "N/A"}`, rightX, leftY + 30);

    // Items Table
    const tableY = 95;
    const tableData = order.items.map((item, i) => [
      i + 1,
      item.name,
      item.quantity,
      `Rs. ${item.price.toLocaleString("en-IN")}`,
      `Rs. ${(item.price * item.quantity).toLocaleString("en-IN")}`,
    ]);

    autoTable(doc, {
      startY: tableY,
      head: [["#", "Product", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [255, 193, 7],
        textColor: [0, 0, 0],
        halign: "center",
        fontStyle: "bold",
      },
      styles: { fontSize: 9, cellPadding: 3, minCellHeight: 8, valign: 'middle' },
      columnStyles: {
        0: { halign: "center", cellWidth: 10 },
        1: { cellWidth: 90, cellPadding: { top: 2, right: 2, bottom: 2, left: 2 } },
        2: { halign: "center", cellWidth: 15 },
        3: { halign: "right", cellWidth: 30 },
        4: { halign: "right", cellWidth: 30 },
      },
      margin: { left: 15, right: 15 },
      tableWidth: "auto",
      rowPageBreak: 'auto',
      tableLineWidth: 0.1,
    });

    // Summary Box
    const finalY = (doc.lastAutoTable?.finalY || 160) + 10;
    const boxX = 115, boxW = 80, boxH = 35;
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(boxX, finalY - 5, boxW, boxH, 2, 2, "S");

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal:", boxX + 5, finalY + 2);
    doc.text(`Rs. ${order.summary?.subtotal?.toLocaleString("en-IN") || "0"}`, boxX + 70, finalY + 2, { align: "right" });

    doc.text("Shipping:", boxX + 5, finalY + 8);
    doc.text(order.summary?.shipping === 0 ? "FREE" : `Rs. ${order.summary?.shipping?.toLocaleString("en-IN")}`, boxX + 70, finalY + 8, { align: "right" });

    if (order.summary?.discount > 0) {
      doc.text("Discount:", boxX + 5, finalY + 14);
      doc.text(`-Rs. ${order.summary?.discount?.toLocaleString("en-IN")}`, boxX + 70, finalY + 14, { align: "right" });
    }

    // Total Highlight
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(255, 193, 7);
    doc.line(boxX + 5, finalY + 18, boxX + 70, finalY + 18);
    doc.text("TOTAL:", boxX + 5, finalY + 26);
    doc.text(`Rs. ${order.summary?.total?.toLocaleString("en-IN") || "0"}`, boxX + 70, finalY + 26, { align: "right" });

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for shopping with Wing Hobbies!", 105, 280, { align: "center" });
    doc.text("For support, contact: support@winghobbies.com | +91 7985079854", 105, 286, { align: "center" });

    // Save PDF
    doc.save(`Invoice-${order.orderId}.pdf`);
    if (showAlert) showAlert({ show: true, type: 'success', message: 'Invoice downloaded successfully!' });
  } catch (error) {
    console.error("Invoice generation error:", error);
    if (showAlert) showAlert({ show: true, type: 'error', message: 'Failed to generate invoice. Please try again.' });
  }
};

export const previewInvoice = (order, showAlert) => {
  try {
    if (!order || !order.orderId || !order.items?.length) {
      if (showAlert) showAlert({ show: true, type: 'error', message: 'Invalid order data.' });
      return null;
    }

    const doc = new jsPDF({ unit: "mm", format: "a4" });

    doc.setFillColor(255, 193, 7);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("WING HOBBIES", 105, 18, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("RC Models & Accessories", 105, 25, { align: "center" });
    doc.text("Phone: +91 7985079854 | Email: support@winghobbies.com", 105, 31, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("TAX INVOICE", 15, 48);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const leftY = 56;
    doc.text(`Invoice No: ${order.orderId}`, 15, leftY);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`, 15, leftY + 6);
    doc.text(`Payment: ${order.payment?.method?.toUpperCase() || "N/A"}`, 15, leftY + 12);
    doc.text(`Status: ${order.status?.toUpperCase() || "N/A"}`, 15, leftY + 18);

    const rightX = 120;
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", rightX, leftY);
    doc.setFont("helvetica", "normal");
    doc.text(order.shipping?.name || "N/A", rightX, leftY + 6);
    doc.text(order.shipping?.address || "", rightX, leftY + 12, { maxWidth: 75 });
    doc.text(`${order.shipping?.city || ""}, ${order.shipping?.state || ""}`, rightX, leftY + 18);
    doc.text(`PIN: ${order.shipping?.pincode || "N/A"}`, rightX, leftY + 24);
    doc.text(`Phone: ${order.shipping?.phone || "N/A"}`, rightX, leftY + 30);

    const tableY = 95;
    const tableData = order.items.map((item, i) => [
      i + 1,
      item.name,
      item.quantity,
      `Rs. ${item.price.toLocaleString("en-IN")}`,
      `Rs. ${(item.price * item.quantity).toLocaleString("en-IN")}`,
    ]);

    autoTable(doc, {
      startY: tableY,
      head: [["#", "Product", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [255, 193, 7],
        textColor: [0, 0, 0],
        halign: "center",
        fontStyle: "bold",
      },
      styles: { fontSize: 9, cellPadding: 3, minCellHeight: 8, valign: 'middle' },
      columnStyles: {
        0: { halign: "center", cellWidth: 10 },
        1: { cellWidth: 90, cellPadding: { top: 2, right: 2, bottom: 2, left: 2 } },
        2: { halign: "center", cellWidth: 15 },
        3: { halign: "right", cellWidth: 30 },
        4: { halign: "right", cellWidth: 30 },
      },
      margin: { left: 15, right: 15 },
      tableWidth: "auto",
      rowPageBreak: 'auto',
      tableLineWidth: 0.1,
    });

    const finalY = (doc.lastAutoTable?.finalY || 160) + 10;
    const boxX = 115, boxW = 80, boxH = 35;
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(boxX, finalY - 5, boxW, boxH, 2, 2, "S");

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal:", boxX + 5, finalY + 2);
    doc.text(`Rs. ${order.summary?.subtotal?.toLocaleString("en-IN") || "0"}`, boxX + 70, finalY + 2, { align: "right" });
    doc.text("Shipping:", boxX + 5, finalY + 8);
    doc.text(order.summary?.shipping === 0 ? "FREE" : `Rs. ${order.summary?.shipping?.toLocaleString("en-IN")}`, boxX + 70, finalY + 8, { align: "right" });

    if (order.summary?.discount > 0) {
      doc.text("Discount:", boxX + 5, finalY + 14);
      doc.text(`-Rs. ${order.summary?.discount?.toLocaleString("en-IN")}`, boxX + 70, finalY + 14, { align: "right" });
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(255, 193, 7);
    doc.line(boxX + 5, finalY + 18, boxX + 70, finalY + 18);
    doc.text("TOTAL:", boxX + 5, finalY + 26);
    doc.text(`Rs. ${order.summary?.total?.toLocaleString("en-IN") || "0"}`, boxX + 70, finalY + 26, { align: "right" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for shopping with Wing Hobbies!", 105, 280, { align: "center" });
    doc.text("For support, contact: support@winghobbies.com | +91 7985079854", 105, 286, { align: "center" });

    return doc.output('bloburl');
  } catch (error) {
    console.error("Invoice preview error:", error);
    if (showAlert) showAlert({ show: true, type: 'error', message: 'Failed to preview invoice. Please try again.' });
    return null;
  }
};
