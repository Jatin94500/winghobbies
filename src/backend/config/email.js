const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async ({ to, subject, html, attachments }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    };
    if (attachments) {
      mailOptions.attachments = attachments;
    }
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

const emailTemplates = {
  orderConfirmation: (order) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ffc107; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .item { border-bottom: 1px solid #eee; padding: 10px 0; }
        .total { font-size: 20px; font-weight: bold; color: #ffc107; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
        </div>
        <div class="content">
          <p>Hi ${order.shipping.name},</p>
          <p>Thank you for your order! Your order has been confirmed.</p>
          
          <div class="order-details">
            <h3>Order ID: ${order.orderId}</h3>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.payment.method.toUpperCase()}</p>
            
            <h4>Items:</h4>
            ${order.items.map(item => `
              <div class="item">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}</p>
              </div>
            `).join('')}
            
            <div style="margin-top: 20px;">
              <p>Subtotal: ₹${order.summary.subtotal}</p>
              <p>Shipping: ₹${order.summary.shipping}</p>
              <p class="total">Total: ₹${order.summary.total}</p>
            </div>
            
            <h4>Shipping Address:</h4>
            <p>
              ${order.shipping.name}<br>
              ${order.shipping.address}<br>
              ${order.shipping.city}, ${order.shipping.state} ${order.shipping.pincode}<br>
              Phone: ${order.shipping.phone}
            </p>
          </div>
          
          <p>We'll send you a shipping confirmation email as soon as your order ships.</p>
        </div>
        <div class="footer">
          <p>Thank you for shopping with Wing Hobbies!</p>
          <p>Questions? Contact us at winghobbieslko@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `
};

module.exports = { sendEmail, transporter, emailTemplates };
