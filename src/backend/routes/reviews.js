const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { protect } = require('../auth');
const { validateReview } = require('../validation');

// @route   GET /api/reviews/product/:productId
// @desc    Get reviews for a product
// @access  Public
router.get('/product/:productId', async (req, res) => {
  try {
    const productReviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: productReviews });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post('/', protect, validateReview, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    
    const existingReview = await Review.findOne({ product: productId, user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ success: false, error: { message: 'You already reviewed this product' } });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      comment
    });

    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { 
      rating: avgRating.toFixed(1),
      reviews: reviews.length 
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!review) {
      return res.status(404).json({ success: false, error: { message: 'Review not found' } });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(review.product, { rating: avgRating.toFixed(1) });

    res.json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!review) {
      return res.status(404).json({ success: false, error: { message: 'Review not found' } });
    }

    const productId = review.product;
    await review.deleteOne();

    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    await Product.findByIdAndUpdate(productId, { 
      rating: avgRating.toFixed(1),
      reviews: reviews.length 
    });

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
