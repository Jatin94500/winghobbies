const express = require('express');
const router = express.Router();
const { protect } = require('../auth');

// In-memory cart storage (replace with database later)
const carts = new Map();

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get('/', protect, (req, res) => {
  const cart = carts.get(req.user._id.toString()) || { items: [], total: 0 };
  res.json({ success: true, data: cart });
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', protect, (req, res) => {
  const { productId, quantity = 1, name, price, image } = req.body;
  const userId = req.user._id.toString();
  
  let cart = carts.get(userId) || { items: [], total: 0 };
  const existingItem = cart.items.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, image, quantity });
  }
  
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  carts.set(userId, cart);
  
  res.json({ success: true, message: 'Item added to cart', data: cart });
});

// @route   PUT /api/cart
// @desc    Update cart item quantity
// @access  Private
router.put('/', protect, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id.toString();
  
  let cart = carts.get(userId);
  if (!cart) {
    return res.status(404).json({ success: false, error: { message: 'Cart not found' } });
  }
  
  const item = cart.items.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts.set(userId, cart);
  }
  
  res.json({ success: true, data: cart });
});

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/:productId', protect, (req, res) => {
  const userId = req.user._id.toString();
  let cart = carts.get(userId);
  
  if (cart) {
    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts.set(userId, cart);
  }
  
  res.json({ success: true, data: cart });
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete('/', protect, (req, res) => {
  const userId = req.user._id.toString();
  carts.set(userId, { items: [], total: 0 });
  res.json({ success: true, message: 'Cart cleared' });
});

module.exports = router;
