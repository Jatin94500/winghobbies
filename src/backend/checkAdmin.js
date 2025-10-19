require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = await User.findOne({ email: 'admin@winghobbies.com' });
    
    if (!admin) {
      console.log('Admin not found');
      process.exit(0);
    }

    console.log('Admin found:');
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('Name:', admin.name);

    if (admin.role !== 'admin') {
      console.log('\nUpdating role to admin...');
      admin.role = 'admin';
      await admin.save();
      console.log('Role updated successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAdmin();
