# Wing Hobbies - RC Ecommerce Platform

## 🚀 Project Overview
Full-stack MERN ecommerce platform for RC (Remote Control) hobby products with admin panel, payment integration ready, and industry-standard security measures.

## 📋 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Bootstrap 5** - Responsive design
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js & Express** - Server framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Passport.js** - OAuth (Google)
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

### Security
- **Helmet** - HTTP headers security
- **Express Rate Limit** - DDoS protection
- **Express Validator** - Input sanitization
- **CORS** - Cross-origin resource sharing
- **JWT** - Secure token-based auth

## 🏗️ Architecture

```
rc-ecommerce/
├── src/
│   ├── admin/           # Admin panel
│   │   └── components/  # Dashboard, Product/Order management
│   ├── user/            # Customer-facing app
│   │   ├── pages/       # Home, Products, Cart, Checkout
│   │   ├── components/  # Navbar, Footer, ProductCard
│   │   └── context/     # Auth, Cart, Wishlist contexts
│   ├── backend/         # Express API
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   ├── config/      # DB, Email, OAuth config
│   │   └── validation.js # Input validation
│   └── utils/           # API client, helpers
```

## 🔐 Security Features

### 1. Authentication & Authorization
- JWT token-based authentication
- Role-based access control (User/Admin)
- Password hashing with bcrypt (10 rounds)
- Google OAuth 2.0 integration
- Session management

### 2. API Security
- **Rate Limiting**: 100 requests/15min per IP
- **Auth Rate Limiting**: 5 login attempts/15min
- **Helmet.js**: Security headers (XSS, clickjacking protection)
- **CORS**: Restricted to frontend origin
- **Input Validation**: Express-validator on all inputs
- **Request Size Limit**: 10MB max payload

### 3. Data Protection
- MongoDB injection prevention (Mongoose sanitization)
- XSS protection (input sanitization)
- SQL injection N/A (NoSQL database)
- Sensitive data not logged
- Environment variables for secrets

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed),
  phone: String (Indian format),
  role: Enum ['user', 'admin'],
  avatar: String (URL),
  address: Object,
  googleId: String,
  timestamps: true
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String,
  price: Number (required),
  originalPrice: Number,
  discount: Number,
  category: Enum (11 categories),
  image: String (required),
  images: [String],
  stock: Number,
  inStock: Boolean,
  rating: Number,
  reviews: Number,
  timestamps: true
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: User),
  orderId: String (auto-generated),
  items: [{product, name, price, quantity, image}],
  shipping: {name, address, city, state, pincode, phone},
  payment: {method, status, transactionId},
  summary: {subtotal, shipping, discount, total},
  status: Enum ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
  timeline: [{status, date}],
  timestamps: true
}
```

### Review Model
```javascript
{
  product: ObjectId (ref: Product),
  user: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  timestamps: true
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/users/count` - Get total users

### Products
- `GET /api/products` - Get all products (filters, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders / all orders (Admin)
- `GET /api/orders/:orderId` - Get order details
- `PUT /api/orders/:orderId/status` - Update status (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Cart & Wishlist
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- Similar endpoints for wishlist

## 🎨 Features

### Customer Features
✅ User registration & login (Email + Google OAuth)
✅ Browse products with filters (category, price, rating)
✅ Search functionality
✅ Product details with reviews
✅ Shopping cart management
✅ Wishlist
✅ Checkout process (3-step)
✅ Order tracking
✅ Profile management
✅ Responsive design (mobile + desktop)

### Admin Features
✅ Admin login with role verification
✅ Dashboard with real-time stats
✅ Product management (CRUD)
✅ Order management with status updates
✅ User management
✅ Home page designer (visual customization)
✅ Export orders (Excel/PDF)
✅ Mobile-optimized admin panel

## 🚦 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Gmail account (for SMTP)
- Google Cloud Console (for OAuth)

### Installation

1. **Clone repository**
```bash
git clone <repository-url>
cd rc-ecommerce
```

2. **Install dependencies**
```bash
# Frontend
npm install

# Backend
cd src/backend
npm install
```

3. **Environment Setup**
Create `src/backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/winghobbies
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
FRONTEND_URL=http://localhost:3001

# Email (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

4. **Create Admin User**
```bash
cd src/backend
node createAdmin.js
```
Default credentials: admin@winghobbies.com / admin123

5. **Run Application**
```bash
# Frontend (from root)
npm start

# Backend (from src/backend)
npm run dev
```

Access:
- Frontend: http://localhost:3001
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3001/admin/login

## 📈 Performance Optimizations

1. **Database Indexing**
   - User email (unique index)
   - Product category
   - Order user reference

2. **API Optimization**
   - Pagination on list endpoints
   - Selective field population
   - Query result caching (ready for Redis)

3. **Frontend Optimization**
   - Lazy loading components
   - Image optimization
   - Debounced search
   - Context API for state management

## 🔄 Future Enhancements

### Payment Integration (Ready)
- Razorpay integration structure in place
- Order model supports payment tracking
- Checkout flow complete

### Additional Features
- [ ] Email notifications (order updates)
- [ ] Invoice generation (PDF)
- [ ] Advanced analytics dashboard
- [ ] Inventory management
- [ ] Coupon/discount system
- [ ] Product recommendations
- [ ] Live chat support
- [ ] Multi-language support

## 📊 Industry Standards Compliance

### Code Quality
- ✅ Modular architecture
- ✅ RESTful API design
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Consistent naming conventions
- ✅ Comments and documentation

### Security
- ✅ OWASP Top 10 compliance
- ✅ Rate limiting
- ✅ Input sanitization
- ✅ Secure headers (Helmet)
- ✅ Password hashing
- ✅ JWT authentication
- ✅ Role-based access control

### Scalability
- ✅ MongoDB Atlas (auto-scaling)
- ✅ Stateless API design
- ✅ Horizontal scaling ready
- ✅ CDN ready for static assets
- ✅ Load balancer compatible

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**MongoDB connection failed**
- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure network connectivity

**Admin login fails**
- Run `node checkAdmin.js` to verify admin user
- Check role field is set to 'admin'
- Clear browser localStorage

## 📝 License
MIT License - Free for personal and commercial use

## 👥 Support
For issues and questions, contact: winghobbieslko@gmail.com

---
**Built with ❤️ for RC Hobby Enthusiasts**
