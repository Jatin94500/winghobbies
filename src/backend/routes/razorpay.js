const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { protect } = require('../auth');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

// Create order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Verify payment
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
      .update(sign.toString())
      .digest('hex');
    
    if (razorpay_signature === expectedSign) {
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.status(400).json({ success: false, error: { message: 'Invalid signature' } });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
