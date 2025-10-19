const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../auth');

// @route   GET /api/recommendations/user
// @desc    Get personalized recommendations
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).limit(5);
    const purchasedCategories = [...new Set(orders.flatMap(o => o.items.map(i => i.category)))];
    
    const recommendations = await Product.find({
      category: { $in: purchasedCategories },
      stock: { $gt: 0 }
    }).limit(10).sort({ rating: -1 });

    res.json({ success: true, data: recommendations });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// @route   GET /api/recommendations/product/:id
// @desc    Get similar products
// @access  Public
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found' } });
    }

    const similar = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      stock: { $gt: 0 }
    }).limit(8).sort({ rating: -1 });

    res.json({ success: true, data: similar });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
