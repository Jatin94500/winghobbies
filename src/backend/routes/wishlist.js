const express = require('express');
const router = express.Router();
const { protect } = require('../auth');
const User = require('../models/User');

// @route   GET /api/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const wishlist = user.wishlist || [];
    res.json({ success: true, data: wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// @route   POST /api/wishlist
// @desc    Add item to wishlist
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user.wishlist) user.wishlist = [];
    
    const exists = user.wishlist.find(item => item.toString() === productId);
    
    if (!exists) {
      user.wishlist.push(productId);
      await user.save();
    }
    
    res.json({ success: true, message: 'Added to wishlist', data: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// @route   DELETE /api/wishlist/:productId
// @desc    Remove item from wishlist
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user.wishlist) {
      user.wishlist = user.wishlist.filter(item => item.toString() !== req.params.productId);
      await user.save();
    }
    
    res.json({ success: true, message: 'Removed from wishlist', data: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// @route   DELETE /api/wishlist
// @desc    Clear wishlist
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = [];
    await user.save();
    res.json({ success: true, message: 'Wishlist cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
