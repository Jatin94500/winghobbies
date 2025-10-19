const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const { protect } = require('../auth');
const { validateOrder } = require('../validation');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, validateOrder, async (req, res) => {
  try {
    const { items, shipping, payment, summary, voucherCode } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      shipping,
      payment,
      summary,
      voucherCode,
      timeline: [{ status: 'pending' }]
    });

    // Increment coupon usage
    if (voucherCode) {
      const Coupon = require('../models/Coupon');
      await Coupon.findOneAndUpdate(
        { code: voucherCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      );
    }

    // Clear user cart after order
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.cart = { items: [], total: 0 };
        await user.save();
      }
    } catch (err) {
      console.log('Cart clear error:', err.message);
    }

    // Send order confirmation email with invoice
    try {
      const { sendEmail, emailTemplates } = require('../config/email');
      const PDFDocument = require('pdfkit');
      
      // Generate invoice PDF
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];
      
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', async () => {
        const pdfBuffer = Buffer.concat(chunks);
        
        if (emailTemplates && emailTemplates.orderConfirmation) {
          await sendEmail({
            to: req.user.email,
            subject: `Order Confirmation - ${order.orderId}`,
            html: emailTemplates.orderConfirmation(order),
            attachments: [{
              filename: `Invoice-${order.orderId}.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf'
            }]
          });
        }
      });
      
      // Generate PDF content
      doc.fillColor('#ffc107').rect(0, 0, doc.page.width, 80).fill();
      doc.fillColor('#000').fontSize(24).font('Helvetica-Bold').text('WING HOBBIES', 0, 30, { align: 'center' });
      doc.fontSize(10).font('Helvetica').text('RC Models & Accessories', 0, 55, { align: 'center' });
      doc.moveDown(2);
      doc.fontSize(16).font('Helvetica-Bold').text('TAX INVOICE', 50, 100);
      doc.fontSize(10).font('Helvetica');
      doc.text(`Invoice No: ${order.orderId}`, 50, 130);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, 50, 145);
      doc.text(`Payment: ${order.payment?.method?.toUpperCase() || 'N/A'}`, 50, 160);
      doc.font('Helvetica-Bold').text('BILL TO:', 350, 130);
      doc.font('Helvetica');
      doc.text(order.shipping?.name || 'N/A', 350, 145);
      doc.text(order.shipping?.address || '', 350, 160, { width: 200 });
      doc.text(`${order.shipping?.city}, ${order.shipping?.state}`, 350, 175);
      doc.text(`PIN: ${order.shipping?.pincode}`, 350, 190);
      const tableTop = 240;
      doc.font('Helvetica-Bold');
      doc.text('#', 50, tableTop);
      doc.text('Product', 80, tableTop);
      doc.text('Qty', 350, tableTop);
      doc.text('Price', 400, tableTop);
      doc.text('Total', 480, tableTop);
      doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
      doc.font('Helvetica');
      let y = tableTop + 25;
      order.items.forEach((item, i) => {
        doc.text(i + 1, 50, y);
        doc.text(item.name, 80, y, { width: 250 });
        doc.text(item.quantity, 350, y);
        doc.text(`Rs. ${item.price.toLocaleString('en-IN')}`, 400, y);
        doc.text(`Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}`, 480, y);
        y += 25;
      });
      y += 20;
      doc.moveTo(350, y).lineTo(550, y).stroke();
      y += 15;
      doc.text('Subtotal:', 350, y);
      doc.text(`Rs. ${order.summary?.subtotal?.toLocaleString('en-IN')}`, 480, y);
      y += 20;
      doc.text('Shipping:', 350, y);
      doc.text(order.summary?.shipping === 0 ? 'FREE' : `Rs. ${order.summary?.shipping?.toLocaleString('en-IN')}`, 480, y);
      y += 20;
      doc.font('Helvetica-Bold').fontSize(12);
      doc.text('TOTAL:', 350, y);
      doc.text(`Rs. ${order.summary?.total?.toLocaleString('en-IN')}`, 480, y);
      doc.fontSize(8).font('Helvetica').fillColor('#666');
      doc.text('Thank you for shopping with Wing Hobbies!', 0, 700, { align: 'center' });
      doc.end();
    } catch (err) {
      console.log('Email/Invoice error:', err.message);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order.orderId,
        total: order.summary.total,
        status: order.status
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// @route   GET /api/orders
// @desc    Get user orders or all orders (admin)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let query = req.user.role === 'admin' ? {} : { user: req.user._id };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('items.product', 'name image')
      .populate('user', 'name email');

    const count = await Order.countDocuments(query);

    res.json({
      success: true,
      data: orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// @route   PUT /api/orders/:orderId/cancel
// @desc    Cancel order
// @access  Private
router.put('/:orderId/cancel', protect, async (req, res) => {
  try {
    console.log('Cancel route hit for orderId:', req.params.orderId);
    
    let query = { orderId: req.params.orderId };
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    const order = await Order.findOne(query);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' }
      });
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: { message: `Cannot cancel order with status: ${order.status}` }
      });
    }

    order.status = 'cancelled';
    order.timeline.push({ status: 'cancelled', date: new Date() });
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(400).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// @route   POST /api/orders/:orderId/return
// @desc    Request return/refund
// @access  Private
router.post('/:orderId/return', protect, async (req, res) => {
  try {
    const { reason, comments } = req.body;
    let query = { orderId: req.params.orderId, user: req.user._id };

    const order = await Order.findOne(query);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' }
      });
    }

    if (order.status !== 'delivered') {
      return res.status(400).json({
        success: false,
        error: { message: 'Only delivered orders can be returned' }
      });
    }

    const daysSinceDelivery = Math.floor((Date.now() - order.updatedAt) / (1000 * 60 * 60 * 24));
    if (daysSinceDelivery > 7) {
      return res.status(400).json({
        success: false,
        error: { message: 'Return period expired (7 days)' }
      });
    }

    order.returnRequest = {
      status: 'pending',
      reason,
      comments,
      requestedAt: new Date()
    };
    await order.save();

    res.json({
      success: true,
      message: 'Return request submitted successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// @route   PUT /api/orders/:orderId/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:orderId/status', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: { message: 'Not authorized' }
      });
    }

    const { status } = req.body;
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' }
      });
    }

    order.status = status;
    order.timeline.push({ status, date: new Date() });
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message }
    });
  }
});

// @route   GET /api/orders/:orderId
// @desc    Get order details
// @access  Private
router.get('/:orderId', protect, async (req, res) => {
  try {
    let query = { orderId: req.params.orderId };
    if (req.user.role !== 'admin') query.user = req.user._id;

    const order = await Order.findOne(query)
      .populate('items.product', 'name image price')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' }
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: error.message }
    });
  }
});

module.exports = router;
