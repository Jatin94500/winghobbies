const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  image: {
    type: String,
    required: true
  },
  images: [String],
  category: {
    type: String,
    required: true,
    enum: ['planes', 'drones', 'cars', 'helicopters', 'controllers', 'parts', 'batteries', 'motors']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  badge: String,
  features: [String],
  highlights: [String],
  specifications: {
    type: Map,
    of: String
  },
  warranty: {
    period: String,
    covered: String,
    notCovered: String
  },
  services: [String],
  seller: {
    name: { type: String, default: 'Wing Hobbies Official' },
    rating: { type: Number, default: 4.5 },
    yearsInBusiness: { type: Number, default: 5 }
  },
  videoUrl: String,
  whatsInBox: [String],
  productUrl: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
