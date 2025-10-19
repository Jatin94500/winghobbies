const express = require('express');
const router = express.Router();
const StockAlert = require('../models/StockAlert');
const { protect } = require('../auth');

// Subscribe to stock alert
router.post('/', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    const existing = await StockAlert.findOne({ user: req.user._id, product: productId });
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'Already subscribed' } });
    }
    await StockAlert.create({ user: req.user._id, product: productId, email: req.user.email });
    res.json({ success: true, message: 'You will be notified when product is back in stock' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
