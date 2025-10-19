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

    // Send order confirmation email (optional)
    try {
      const { sendEmail, emailTemplates } = require('../config/email');
      if (emailTemplates && emailTemplates.orderConfirmation) {
        await sendEmail({
          to: req.user.email,
          subject: `Order Confirmation - ${order.orderId}`,
          html: emailTemplates.orderConfirmation(order)
        });
      }
    } catch (err) {
      console.log('Email not configured:', err.message);
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
