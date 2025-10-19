const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: { message: 'Validation failed', errors: errors.array() }
    });
  }
  next();
};

exports.validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['planes', 'helicopters', 'drones', 'cars', 'controllers', 'parts', 'batteries', 'motors']),
  body('description').trim().notEmpty().withMessage('Description is required'),
  validate
];

exports.validateOrder = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('shipping.name').trim().notEmpty().withMessage('Shipping name is required'),
  body('shipping.address').trim().notEmpty().withMessage('Shipping address is required'),
  body('shipping.city').trim().notEmpty().withMessage('City is required'),
  body('shipping.pincode').optional().trim(),
  body('shipping.phone').trim().notEmpty().withMessage('Phone number is required'),
  body('payment.method').isIn(['cod', 'card', 'upi', 'netbanking', 'wallet', 'emi']).withMessage('Invalid payment method'),
  validate
];

exports.validateReview = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().isLength({ min: 10, max: 500 }).withMessage('Comment must be 10-500 characters'),
  validate
];

exports.validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().matches(/^[6-9]\d{9}$/).withMessage('Invalid phone number'),
  validate
];

exports.validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];
