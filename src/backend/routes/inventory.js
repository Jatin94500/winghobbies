const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../auth');

// @route   GET /api/inventory/low-stock
// @desc    Get low stock products
// @access  Private/Admin
router.get('/low-stock', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: { message: 'Not authorized' } });
    }

    const threshold = req.query.threshold || 10;
    const products = await Product.find({ stock: { $lte: threshold, $gt: 0 } }).sort({ stock: 1 });

    res.json({ success: true, data: products, count: products.length });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// @route   PUT /api/inventory/:id/stock
// @desc    Update product stock
// @access  Private/Admin
router.put('/:id/stock', protect, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: { message: 'Not authorized' } });
    }

    const { stock, action } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found' } });
    }

    if (action === 'add') {
      product.stock += stock;
    } else if (action === 'subtract') {
      product.stock = Math.max(0, product.stock - stock);
    } else {
      product.stock = stock;
    }

    await product.save();

    res.json({ success: true, message: 'Stock updated', data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
