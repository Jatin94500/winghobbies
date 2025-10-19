require('dotenv').config();
const mongoose = require('mongoose');
const PaymentMethod = require('./models/PaymentMethod');

const defaultMethods = [
  { name: 'Credit/Debit Card', type: 'card', icon: 'fas fa-credit-card', enabled: true },
  { name: 'UPI', type: 'upi', icon: 'fab fa-google-pay', enabled: true },
  { name: 'Net Banking', type: 'netbanking', icon: 'fas fa-university', enabled: true },
  { name: 'Wallets', type: 'wallet', icon: 'fas fa-wallet', enabled: true },
  { name: 'Cash on Delivery', type: 'cod', icon: 'fas fa-money-bill-wave', enabled: true },
  { name: 'EMI', type: 'emi', icon: 'fas fa-calendar-alt', enabled: true }
];

async function seedPaymentMethods() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await PaymentMethod.deleteMany({});
    console.log('🗑️  Cleared existing payment methods');

    await PaymentMethod.insertMany(defaultMethods);
    console.log('✅ Added default payment methods');

    console.log('\n📋 Payment Methods:');
    defaultMethods.forEach(m => console.log(`  - ${m.name} (${m.type})`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedPaymentMethods();
