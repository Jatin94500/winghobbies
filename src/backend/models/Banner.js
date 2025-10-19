const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  description: String,
  image: {
    type: String,
    required: true
  },
  link: String,
  buttonText: String,
  backgroundColor: {
    type: String,
    default: '#ffc107'
  },
  textColor: {
    type: String,
    default: '#000000'
  },
  position: {
    type: String,
    enum: ['hero', 'middle', 'bottom'],
    default: 'hero'
  },
  order: {
    type: Number,
    default: 0
  },
  enabled: {
    type: Boolean,
    default: true
  },
  startDate: Date,
  endDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);
