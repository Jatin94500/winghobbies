const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'cod', 'emi']
  },
  icon: String,
  enabled: {
    type: Boolean,
    default: true
  },
  details: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
