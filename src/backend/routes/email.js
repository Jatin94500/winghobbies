const express = require('express');
const { sendEmail } = require('../config/email');
const router = express.Router();

// Test email endpoint
router.post('/test', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ffc107;">Wing Hobbies</h2>
        <p>${message}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This is a test email from Wing Hobbies</p>
      </div>
    `;

    const result = await sendEmail(to, subject, html);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send order confirmation
router.post('/order-confirmation', async (req, res) => {
  try {
    const { to, orderNumber, items, total } = req.body;

    const itemsList = items.map(item => 
      `<li>${item.name} x ${item.quantity} - ₹${item.price}</li>`
    ).join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #ffc107;">Order Confirmation</h2>
        <p>Thank you for your order!</p>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <h3>Order Details:</h3>
        <ul>${itemsList}</ul>
        <p style="font-size: 18px;"><strong>Total: ₹${total}</strong></p>
        <hr>
        <p style="color: #666;">We'll send you another email when your order ships.</p>
        <p style="color: #666;">Thank you for shopping with Wing Hobbies!</p>
      </div>
    `;

    const result = await sendEmail(to, `Order Confirmation - ${orderNumber}`, html);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send welcome email
router.post('/welcome', async (req, res) => {
  try {
    const { to, name } = req.body;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #ffc107;">Welcome to Wing Hobbies!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for joining Wing Hobbies - your one-stop shop for premium RC models!</p>
        <p>Start exploring our collection of RC planes, helicopters, cars, and more.</p>
        <a href="http://localhost:3000/products" style="display: inline-block; background: #ffc107; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Shop Now</a>
        <p>Happy flying!</p>
        <p>- The Wing Hobbies Team</p>
      </div>
    `;

    const result = await sendEmail(to, 'Welcome to Wing Hobbies!', html);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
