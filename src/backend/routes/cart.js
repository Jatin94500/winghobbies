const express = require('express');
const router = express.Router();
const { protect } = require('../auth');
const User = require('../models/User');

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const cart = user.cart || { items: [], total: 0 };
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId, quantity = 1, name, price, image } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user.cart) user.cart = { items: [], total: 0 };
    
    const existingItem = user.cart.items.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.items.push({ productId, name, price, image, quantity });
    }
    
    user.cart.total = user.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await user.save();
    
    res.json({ success: true, message: 'Item added to cart', data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// @route   PUT /api/cart
// @desc    Update cart item quantity
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user.cart) {
      return res.status(404).json({ success: false, error: { message: 'Cart not found' } });
    }
    
    const item = user.cart.items.find(item => 
      item._id?.toString() === productId || item.productId?.toString() === productId
    );
    if (item) {
      item.quantity = quantity;
      user.cart.total = user.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await user.save();
    }
    
    res.json({ success: true, data: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productIdToRemove = req.params.productId;
    
    console.log('Deleting product:', productIdToRemove);
    console.log('Cart before:', user.cart?.items?.length);
    
    if (user.cart && user.cart.items) {
      // Log all productIds
      user.cart.items.forEach((item, idx) => {
        console.log(`Item ${idx}: productId=${item.productId?.toString()}, _id=${item._id?.toString()}`);
      });
      
      // Remove the item (check both _id and productId)
      user.cart.items = user.cart.items.filter(item => {
        const itemId = item._id?.toString();
        const itemProductId = item.productId?.toString();
        const match = itemId === productIdToRemove || itemProductId === productIdToRemove;
        console.log(`Comparing ${itemProductId} === ${productIdToRemove}: ${match}`);
        return !match; // Keep items that DON'T match
      });
      
      console.log('Cart after:', user.cart.items.length);
      
      user.cart.total = user.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await user.save();
    }
    
    res.json({ success: true, data: user.cart || { items: [], total: 0 } });
  } catch (error) {
    console.error('Cart delete error:', error);
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = { items: [], total: 0 };
    await user.save();
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
