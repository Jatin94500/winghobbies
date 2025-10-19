const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { protect } = require('../auth');

// Get all coupons (admin)
router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: { message: 'Not authorized' } });
    }
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Validate coupon
router.post('/validate', protect, async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });
    
    if (!coupon) {
      return res.status(404).json({ success: false, error: { message: 'Invalid coupon code' } });
    }
    
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return res.status(400).json({ success: false, error: { message: 'Coupon expired' } });
    }
    
    if (cartTotal < coupon.minPurchase) {
      return res.status(400).json({ success: false, error: { message: `Minimum purchase of ₹${coupon.minPurchase} required` } });
    }
    
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, error: { message: 'Coupon usage limit reached' } });
    }
    
    let discount = coupon.type === 'percentage' ? (cartTotal * coupon.value / 100) : coupon.value;
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
    
    res.json({ success: true, data: { discount, code: coupon.code } });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Create coupon (admin)
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: { message: 'Not authorized' } });
    }
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Update coupon (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: { message: 'Not authorized' } });
    }
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Delete coupon (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: { message: 'Not authorized' } });
    }
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
