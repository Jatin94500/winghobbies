# Payment Methods Setup

## ✅ What's Been Created

### Backend:
- `models/PaymentMethod.js` - Database model for payment methods
- `routes/payment-methods.js` - API routes for managing payment methods
- `seedPaymentMethods.js` - Script to add default payment methods

### Admin Panel:
- `admin/components/PaymentMethodManagement.js` - Admin UI to manage payment methods
- Added "Payment Methods" menu item in sidebar
- Route: `/admin/payment-methods`

### Checkout Page:
- Updated to fetch payment methods from database
- Shows all enabled payment methods as cards
- Supports: Card, UPI, Net Banking, Wallets, COD, EMI
- Dynamic forms based on selected payment type

## 🚀 Setup Instructions

### Step 1: Add Default Payment Methods
Run this command in `src/backend` folder:
```bash
node seedPaymentMethods.js
```

This will add 6 default payment methods:
- Credit/Debit Card
- UPI
- Net Banking
- Wallets
- Cash on Delivery
- EMI

### Step 2: Restart Backend Server
```bash
cd src/backend
node server.js
```

### Step 3: Access Admin Panel
1. Login to admin: http://localhost:3001/admin
2. Go to "Payment Methods" in sidebar
3. Enable/disable payment methods
4. Add custom payment methods

## 📋 Features

### Admin Can:
- ✅ Add new payment methods
- ✅ Edit existing methods
- ✅ Enable/disable methods
- ✅ Set custom icons (FontAwesome)
- ✅ Choose payment type (card, upi, netbanking, wallet, cod, emi)

### Checkout Page Shows:
- ✅ Only enabled payment methods
- ✅ Visual cards with icons
- ✅ Dynamic forms based on payment type
- ✅ Card details form for card payments
- ✅ UPI ID input for UPI
- ✅ Bank selection for net banking
- ✅ Wallet selection for wallets
- ✅ COD confirmation message
- ✅ EMI plan selection with calculated amounts

## 🎨 Payment Types & Forms

### Card
- Card Number
- Cardholder Name
- Expiry Date
- CVV

### UPI
- UPI ID input

### Net Banking
- Bank dropdown (HDFC, ICICI, SBI, Axis)

### Wallet
- Wallet dropdown (Paytm, PhonePe, Google Pay, Amazon Pay)

### COD
- Confirmation message

### EMI
- EMI plan dropdown (3, 6, 9, 12 months)
- Shows monthly amount

## 🔧 API Endpoints

### Public:
- `GET /api/payment-methods` - Get all enabled payment methods

### Admin Only:
- `GET /api/payment-methods/all` - Get all payment methods
- `POST /api/payment-methods` - Create new payment method
- `PUT /api/payment-methods/:id` - Update payment method
- `DELETE /api/payment-methods/:id` - Delete payment method

## 📝 Example: Add Custom Payment Method

In Admin Panel:
1. Click "Add Payment Method"
2. Name: "PayPal"
3. Type: "wallet"
4. Icon: "fab fa-paypal"
5. Status: Enabled
6. Save

Now PayPal will appear on checkout page!

## ✨ All Done!
Your checkout now has multiple payment options managed by admin.
