const express = require('express');
const router = express.Router();
const PaymentMethod = require('../models/PaymentMethod');
const { protect, authorize } = require('../auth');

// Get all enabled payment methods (Public)
router.get('/', async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ enabled: true });
    res.json({ success: true, data: methods });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Get all payment methods (Admin)
router.get('/all', protect, authorize('admin'), async (req, res) => {
  try {
    const methods = await PaymentMethod.find();
    res.json({ success: true, data: methods });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Create payment method (Admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const method = await PaymentMethod.create(req.body);
    res.status(201).json({ success: true, data: method });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Update payment method (Admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const method = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: method });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Delete payment method (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await PaymentMethod.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Payment method deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
