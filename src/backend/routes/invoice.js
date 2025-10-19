const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
const { protect } = require('../auth');

// @route   GET /api/invoice/:orderId
// @desc    Generate and download invoice PDF
// @access  Private
router.get('/:orderId', protect, async (req, res) => {
  try {
    let query = { orderId: req.params.orderId };
    if (req.user.role !== 'admin') query.user = req.user._id;

    const order = await Order.findOne(query)
      .populate('items.product', 'name')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' }
      });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${order.orderId}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Header with company branding
    doc.fillColor('#FFC107')
       .rect(0, 0, doc.page.width, 100)
       .fill();

    doc.fillColor('#000000')
       .fontSize(28)
       .font('Helvetica-Bold')
       .text('WING HOBBIES', 50, 30, { align: 'center' });

    doc.fontSize(12)
       .font('Helvetica')
       .text('RC Models & Accessories', 50, 60, { align: 'center' })
       .text('Phone: +91 7985079854 | Email: support@winghobbies.com', 50, 75, { align: 'center' });

    // Invoice title
    doc.fillColor('#000000')
       .fontSize(24)
       .font('Helvetica-Bold')
       .text('TAX INVOICE', 50, 130);

    // Invoice details
    doc.fontSize(11)
       .font('Helvetica')
       .text(`Invoice No: ${order.orderId}`, 50, 165)
       .text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, 50, 182)
       .text(`Payment: ${order.payment?.method?.toUpperCase()}`, 50, 199)
       .text(`Status: ${order.status?.toUpperCase()}`, 50, 216);

    // Customer details
    doc.font('Helvetica-Bold')
       .text('BILL TO:', 350, 165);
    
    doc.font('Helvetica')
       .text(order.shipping?.name || 'N/A', 350, 182)
       .text(order.shipping?.address || '', 350, 199, { width: 200 })
       .text(`${order.shipping?.city || ''}, ${order.shipping?.state || ''}`, 350, 216)
       .text(`PIN: ${order.shipping?.pincode || 'N/A'}`, 350, 233)
       .text(`Phone: ${order.shipping?.phone || 'N/A'}`, 350, 250);

    // Table header
    const tableTop = 290;
    doc.font('Helvetica-Bold')
       .fillColor('#FFC107')
       .rect(50, tableTop, doc.page.width - 100, 25)
       .fill();

    doc.fillColor('#000000')
       .text('#', 60, tableTop + 7)
       .text('Product', 90, tableTop + 7)
       .text('Qty', 320, tableTop + 7)
       .text('Price', 380, tableTop + 7)
       .text('Total', 470, tableTop + 7);

    // Table rows
    let yPosition = tableTop + 35;
    doc.font('Helvetica');

    order.items.forEach((item, idx) => {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 50;
      }

      doc.text(idx + 1, 60, yPosition)
         .text(item.name, 90, yPosition, { width: 220 })
         .text(item.quantity, 320, yPosition)
         .text(`₹${item.price.toLocaleString()}`, 380, yPosition)
         .text(`₹${(item.price * item.quantity).toLocaleString()}`, 470, yPosition);

      yPosition += 25;
    });

    // Summary
    yPosition += 20;
    const summaryX = 380;

    doc.font('Helvetica')
       .text('Subtotal:', summaryX, yPosition)
       .text(`₹${order.summary?.subtotal?.toLocaleString() || '0'}`, 470, yPosition);

    yPosition += 20;
    doc.text('Shipping:', summaryX, yPosition)
       .text(order.summary?.shipping === 0 ? 'FREE' : `₹${order.summary?.shipping?.toLocaleString()}`, 470, yPosition);

    if (order.summary?.discount > 0) {
      yPosition += 20;
      doc.text('Discount:', summaryX, yPosition)
         .text(`-₹${order.summary?.discount?.toLocaleString()}`, 470, yPosition);
    }

    yPosition += 10;
    doc.moveTo(summaryX, yPosition)
       .lineTo(540, yPosition)
       .strokeColor('#FFC107')
       .lineWidth(2)
       .stroke();

    yPosition += 15;
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .text('TOTAL:', summaryX, yPosition)
       .text(`₹${order.summary?.total?.toLocaleString() || '0'}`, 470, yPosition);

    // Footer
    doc.fontSize(9)
       .font('Helvetica-Oblique')
       .fillColor('#666666')
       .text('Thank you for shopping with Wing Hobbies!', 50, 750, { align: 'center' })
       .text('For support, contact: support@winghobbies.com | +91 7985079854', 50, 765, { align: 'center' });

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Invoice generation error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to generate invoice' }
    });
  }
});

// @route   GET /api/invoice/:orderId/data
// @desc    Get invoice data as JSON
// @access  Private
router.get('/:orderId/data', protect, async (req, res) => {
  try {
    let query = { orderId: req.params.orderId };
    if (req.user.role !== 'admin') query.user = req.user._id;

    const order = await Order.findOne(query)
      .populate('items.product', 'name')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' }
      });
    }

    res.json({
      success: true,
      data: {
        invoiceNumber: order.orderId,
        date: order.createdAt,
        customer: {
          name: order.shipping?.name,
          email: order.user?.email,
          phone: order.shipping?.phone,
          address: {
            street: order.shipping?.address,
            city: order.shipping?.city,
            state: order.shipping?.state,
            pincode: order.shipping?.pincode
          }
        },
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        summary: {
          subtotal: order.summary?.subtotal,
          shipping: order.summary?.shipping,
          discount: order.summary?.discount,
          total: order.summary?.total
        },
        payment: {
          method: order.payment?.method,
          status: order.payment?.status
        },
        status: order.status
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
});

module.exports = router;
