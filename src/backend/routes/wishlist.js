const express = require('express');
const router = express.Router();
const { protect } = require('../auth');

// In-memory wishlist storage
const wishlists = new Map();

// @route   GET /api/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/', protect, (req, res) => {
  const wishlist = wishlists.get(req.user._id.toString()) || [];
  res.json({ success: true, data: wishlist });
});

// @route   POST /api/wishlist
// @desc    Add item to wishlist
// @access  Private
router.post('/', protect, (req, res) => {
  const { productId, name, price, image } = req.body;
  const userId = req.user._id.toString();
  
  let wishlist = wishlists.get(userId) || [];
  const exists = wishlist.find(item => item.productId === productId);
  
  if (!exists) {
    wishlist.push({ productId, name, price, image, addedAt: new Date() });
    wishlists.set(userId, wishlist);
  }
  
  res.json({ success: true, message: 'Added to wishlist', data: wishlist });
});

// @route   DELETE /api/wishlist/:productId
// @desc    Remove item from wishlist
// @access  Private
router.delete('/:productId', protect, (req, res) => {
  const userId = req.user._id.toString();
  let wishlist = wishlists.get(userId) || [];
  
  wishlist = wishlist.filter(item => item.productId !== req.params.productId);
  wishlists.set(userId, wishlist);
  
  res.json({ success: true, message: 'Removed from wishlist', data: wishlist });
});

module.exports = router;
