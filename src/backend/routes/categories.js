const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect, authorize } = require('../auth');

// Get all categories (Public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ enabled: true });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Get all categories including disabled (Admin)
router.get('/all', protect, authorize('admin'), async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Create category (Admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const category = await Category.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Update category (Admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = req.body.name.toLowerCase().replace(/\s+/g, '-');
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Delete category (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
