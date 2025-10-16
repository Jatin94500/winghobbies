# Data Models Documentation

## Product Model

**Location**: `src/user/data/products.js`

### Structure

```javascript
{
  id: number,                    // Unique identifier
  name: string,                  // Product name
  price: number,                 // Price in INR
  originalPrice: number,         // Original price before discount
  discount: number,              // Discount percentage (0-100)
  image: string,                 // Product image URL
  category: string,              // Category slug
  rating: number,                // Average rating (0-5)
  reviews: number,               // Number of reviews
  inStock: boolean,              // Availability status
  badge: string | null,          // Badge text (e.g., "Best Seller")
  description: string,           // Product description
  features: string[],            // Array of feature strings
  specifications: object,        // Technical specifications
  productUrl: string             // External retailer URL
}
```

### Example

```javascript
{
  id: 1,
  name: "WLtoys XK A280 P-51 Mustang 2.4G 3CH RC Airplane",
  price: 2999,
  originalPrice: 3999,
  discount: 25,
  image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
  category: "beginner-planes",
  rating: 4.5,
  reviews: 128,
  inStock: true,
  badge: "Best Seller",
  description: "Ready-to-fly RC airplane perfect for beginners...",
  features: [
    "2.4GHz remote control",
    "3-channel control",
    "Durable EPP foam construction"
  ],
  specifications: {
    "Wingpan": "280mm",
    "Length": "245mm",
    "Weight": "25g",
    "Battery": "3.7V 150mAh",
    "Flight Time": "8-10 minutes",
    "Control Distance": "80-100m"
  },
  productUrl: "https://www.bharathobby.com/products/wltoys-xk-a280"
}
```

## Category Model

**Location**: `src/user/data/products.js`

### Structure

```javascript
{
  id: number,           // Unique identifier
  name: string,         // Display name
  slug: string,         // URL-friendly identifier
  icon: string,         // Font Awesome icon class
  description: string   // Category description
}
```

### Example

```javascript
{
  id: 1,
  name: "Beginner Planes",
  slug: "beginner-planes",
  icon: "fa-plane",
  description: "Easy-to-fly RC planes for beginners"
}
```

### Available Categories

1. **Beginner Planes** - Entry-level RC airplanes
2. **Advanced Models** - High-performance aircraft
3. **Spare Parts** - Replacement components
4. **Accessories** - Controllers, batteries, tools

## Review Model

**Location**: `src/user/data/reviews.js`

### Structure

```javascript
{
  id: number,              // Unique identifier
  productId: number,       // Associated product ID
  userId: number,          // User who wrote review
  userName: string,        // User's display name
  userAvatar: string,      // User's avatar URL
  rating: number,          // Rating (1-5)
  title: string,           // Review title
  comment: string,         // Review text
  date: string,            // ISO date string
  verified: boolean,       // Verified purchase
  helpful: number          // Helpful votes count
}
```

### Example

```javascript
{
  id: 1,
  productId: 1,
  userId: 101,
  userName: "Rajesh Kumar",
  userAvatar: "https://i.pravatar.cc/150?img=1",
  rating: 5,
  title: "Perfect for beginners!",
  comment: "This is my first RC plane and it's amazing...",
  date: "2025-01-15",
  verified: true,
  helpful: 24
}
```

### Review Functions

**getProductReviews(productId)**
- Returns: Array of reviews for product
- Sorted by date (newest first)

**getAverageRating(productId)**
- Returns: Average rating (0-5)
- Rounded to 1 decimal place

**getRatingDistribution(productId)**
- Returns: Object with star distribution
```javascript
{
  5: 45,  // 45% gave 5 stars
  4: 30,  // 30% gave 4 stars
  3: 15,  // 15% gave 3 stars
  2: 7,   // 7% gave 2 stars
  1: 3    // 3% gave 1 star
}
```

## Voucher Model

**Location**: `src/user/data/vouchers.js`

### Structure

```javascript
{
  code: string,              // Voucher code (uppercase)
  type: string,              // 'percentage' | 'fixed' | 'shipping'
  value: number,             // Discount value
  minOrder: number,          // Minimum order amount
  description: string,       // Voucher description
  expiryDate: string,        // ISO date string
  active: boolean            // Voucher status
}
```

### Example

```javascript
{
  code: "WELCOME10",
  type: "percentage",
  value: 10,
  minOrder: 1000,
  description: "10% off on your first order",
  expiryDate: "2025-12-31",
  active: true
}
```

### Available Vouchers

1. **WELCOME10** - 10% off on orders ≥ ₹1,000
2. **FLAT500** - ₹500 off on orders ≥ ₹5,000
3. **MEGA20** - 20% off on orders ≥ ₹10,000
4. **FREESHIP** - Free shipping on all orders

### Voucher Functions

**validateVoucher(code, orderTotal)**
- Validates voucher code
- Checks minimum order amount
- Checks expiry date
- Returns: Object with validation result

```javascript
{
  valid: boolean,
  discount: number,
  message: string
}
```

## User Model

**Location**: `src/user/context/AuthContext.js`

### Structure

```javascript
{
  id: number,              // Unique identifier
  name: string,            // Full name
  email: string,           // Email address
  phone: string,           // Phone number
  avatar: string,          // Avatar URL
  address: object,         // Shipping address
  createdAt: string        // Account creation date
}
```

### Example

```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  avatar: "https://i.pravatar.cc/150?img=1",
  address: {
    street: "123 Main Street",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226001",
    country: "India"
  },
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

## Cart Item Model

**Location**: `src/user/context/CartContext.js`

### Structure

```javascript
{
  id: number,              // Product ID
  name: string,            // Product name
  price: number,           // Unit price
  image: string,           // Product image
  quantity: number,        // Quantity in cart
  inStock: boolean         // Availability
}
```

### Example

```javascript
{
  id: 1,
  name: "WLtoys XK A280 P-51 Mustang",
  price: 2999,
  image: "https://images.unsplash.com/...",
  quantity: 2,
  inStock: true
}
```

## Order Model

**Location**: `src/user/pages/OrdersPage.js`

### Structure

```javascript
{
  id: string,              // Order ID (e.g., "ORD-001")
  date: string,            // Order date (ISO string)
  status: string,          // Order status
  total: number,           // Total amount
  items: array,            // Array of cart items
  shipping: object,        // Shipping details
  payment: object          // Payment details
}
```

### Order Status Values

- `pending` - Order placed, awaiting processing
- `processing` - Order being prepared
- `shipped` - Order dispatched
- `delivered` - Order delivered
- `cancelled` - Order cancelled

### Example

```javascript
{
  id: "ORD-001",
  date: "2025-01-15T10:30:00.000Z",
  status: "delivered",
  total: 8997,
  items: [
    {
      id: 1,
      name: "WLtoys XK A280",
      price: 2999,
      quantity: 3,
      image: "https://..."
    }
  ],
  shipping: {
    name: "John Doe",
    address: "123 Main Street",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226001",
    phone: "9876543210"
  },
  payment: {
    method: "cod",
    status: "paid",
    transactionId: "TXN123456"
  }
}
```

## Wishlist Item Model

**Location**: `src/user/context/WishlistContext.js`

### Structure

Same as Product Model - stores complete product object.

```javascript
{
  id: number,
  name: string,
  price: number,
  image: string,
  // ... all product fields
}
```

## Recently Viewed Model

**Location**: `src/user/context/RecentlyViewedContext.js`

### Structure

Same as Product Model - stores complete product object.

Maximum 10 items, newest first.

## Contact Form Model

**Location**: `src/user/pages/ContactPage.js`

### Structure

```javascript
{
  name: string,            // Full name
  email: string,           // Email address
  phone: string,           // Phone number
  subject: string,         // Message subject
  message: string          // Message content
}
```

### Example

```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  subject: "Product Inquiry",
  message: "I would like to know more about..."
}
```

## Checkout Form Model

**Location**: `src/user/pages/CheckoutPage.js`

### Structure

```javascript
{
  // Personal Information
  name: string,
  email: string,
  phone: string,
  
  // Shipping Address
  address: string,
  city: string,
  state: string,
  pincode: string,
  
  // Payment
  paymentMethod: string,   // 'cod' | 'card' | 'upi'
  
  // Optional
  voucherCode: string,
  notes: string
}
```

### Example

```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  address: "123 Main Street, Gomti Nagar",
  city: "Lucknow",
  state: "Uttar Pradesh",
  pincode: "226010",
  paymentMethod: "cod",
  voucherCode: "WELCOME10",
  notes: "Please call before delivery"
}
```

## Data Validation

### Product Validation

```javascript
const isValidProduct = (product) => {
  return (
    product.id &&
    product.name &&
    product.price > 0 &&
    product.category &&
    product.image
  );
};
```

### Email Validation

```javascript
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

### Phone Validation

```javascript
const isValidPhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};
```

### Pincode Validation

```javascript
const isValidPincode = (pincode) => {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pincode);
};
```

## Data Transformations

### Calculate Discounted Price

```javascript
const getDiscountedPrice = (originalPrice, discount) => {
  return originalPrice - (originalPrice * discount / 100);
};
```

### Format Currency

```javascript
const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
```

### Format Date

```javascript
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

### Calculate Cart Total

```javascript
const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};
```

### Calculate Shipping

```javascript
const calculateShipping = (cartTotal) => {
  return cartTotal >= 999 ? 0 : 99;
};
```

## Mock Data Generation

### Generate Random User

```javascript
const generateUser = (id) => ({
  id,
  name: `User ${id}`,
  email: `user${id}@example.com`,
  avatar: `https://i.pravatar.cc/150?img=${id}`
});
```

### Generate Random Review

```javascript
const generateReview = (productId, userId) => ({
  id: Date.now(),
  productId,
  userId,
  userName: `User ${userId}`,
  userAvatar: `https://i.pravatar.cc/150?img=${userId}`,
  rating: Math.floor(Math.random() * 5) + 1,
  title: "Great product!",
  comment: "Lorem ipsum dolor sit amet...",
  date: new Date().toISOString(),
  verified: Math.random() > 0.5,
  helpful: Math.floor(Math.random() * 50)
});
```

## Future Enhancements

### Backend Integration

Replace mock data with API calls:

```javascript
// Fetch products
const fetchProducts = async () => {
  const response = await fetch('/api/products');
  return response.json();
};

// Create order
const createOrder = async (orderData) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return response.json();
};
```

### Database Schema

Recommended MongoDB schema:

```javascript
// Product Schema
{
  _id: ObjectId,
  name: String,
  price: Number,
  category: ObjectId,
  images: [String],
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}

// User Schema
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  profile: Object,
  createdAt: Date
}

// Order Schema
{
  _id: ObjectId,
  userId: ObjectId,
  items: [Object],
  total: Number,
  status: String,
  createdAt: Date
}
```
