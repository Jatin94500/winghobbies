const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const { protect, authorize } = require('../auth');

// Get active banners (Public)
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const banners = await Banner.find({
      enabled: true,
      $or: [
        { startDate: { $exists: false } },
        { startDate: { $lte: now } }
      ],
      $or: [
        { endDate: { $exists: false } },
        { endDate: { $gte: now } }
      ]
    }).sort({ order: 1 });
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Get all banners (Admin)
router.get('/all', protect, authorize('admin'), async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1 });
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Create banner (Admin)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Update banner (Admin)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: banner });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Delete banner (Admin)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Banner deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
