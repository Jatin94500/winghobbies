# Wing Hobbies - RC Ecommerce Website

## 🚀 Project Overview
Wing Hobbies is a modern, fully-functional ecommerce website for RC (Remote Control) models, drones, and accessories. Built with React, Bootstrap, and Framer Motion, it features a complete shopping experience with cart management, checkout, and responsive design.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse 12+ RC products with images, ratings, and pricing
- **Product Details**: Detailed product pages with specifications and related products
- **Search & Filter**: Search products by name, filter by category, sort by price/rating/discount
- **Shopping Cart**: Add/remove items, update quantities, view cart total
- **Checkout**: Complete checkout form with personal info, shipping address, and payment options
- **Toast Notifications**: Non-blocking notifications for all user actions

### 🎨 Design & UI
- **Wing Hobbies Theme**: Dark backgrounds (#212529) with yellow accents (#ffc107)
- **Bootstrap Framework**: Responsive grid system and components
- **Smooth Animations**: Hover effects, transitions, and fade-in animations
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices
- **Professional Layout**: Clean cards with shadows, badges, and icons

### 📄 Pages
1. **Home** (`/`) - Banner, featured products, offers, categories, mega sale, footer
2. **Products** (`/products`) - Full product listing with filters and sorting
3. **Product Detail** (`/product/:id`) - Individual product page with specs
4. **Cart** (`/cart`) - Shopping cart with order summary
5. **Checkout** (`/checkout`) - Checkout form with payment options

## 🛠️ Tech Stack
- **Frontend**: React 18
- **Styling**: Bootstrap 5, Custom CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Font Awesome

## 📁 Project Structure
```
rc-ecommerce/
├── src/
│   ├── user/
│   │   ├── components/
│   │   │   ├── Navbar.js          # Navigation with cart badge
│   │   │   ├── Footer.js          # Footer component
│   │   │   ├── Toast.js           # Toast notification component
│   │   │   └── [11 other components]
│   │   ├── pages/
│   │   │   ├── Home.js            # Home page
│   │   │   ├── Products.js        # Product listing
│   │   │   ├── ProductPage.js     # Product detail
│   │   │   ├── CartPage.js        # Shopping cart
│   │   │   └── CheckoutPage.js    # Checkout
│   │   ├── context/
│   │   │   └── CartContext.js     # Cart state management
│   │   ├── data/
│   │   │   └── products.js        # Product data (12 products)
│   │   └── styles/
│   │       └── globals.css        # Global styles
│   ├── App.js                     # Main app with routes
│   ├── index.js                   # Entry point
│   └── index.css                  # Main CSS with animations
├── public/
│   └── index.html
├── THEME_GUIDE.md                 # Brand guidelines
└── package.json
```

## 🎨 Brand Identity

### Colors
- **Primary Dark**: `#212529` - Backgrounds, headers
- **Primary Yellow**: `#ffc107` - Accents, CTAs, highlights
- **Light Background**: `#f8f9fa` - Page backgrounds
- **Success**: `#198754` - Free delivery, success messages
- **Danger**: `#dc3545` - Discount badges, errors

### Typography
- **Font**: System fonts (Bootstrap default)
- **Headings**: Bold (fw-bold)
- **Body**: Regular weight

### Components
- **Cards**: `border-0 shadow-sm` - Clean, modern look
- **Buttons**: `btn-warning fw-bold` - Yellow CTAs
- **Headers**: `bg-dark text-white` - Dark headers with yellow icons
- **Badges**: `bg-warning text-dark` or `bg-danger` - Product badges

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation
```bash
# Navigate to project directory
cd rc-ecommerce

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📦 Key Dependencies
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "bootstrap": "^5.x",
  "framer-motion": "^10.x"
}
```

## 🔧 Configuration

### Product Data
Edit `src/user/data/products.js` to add/modify products:
```javascript
{
  id: 1,
  name: "Product Name",
  price: 12499,
  originalPrice: 15999,
  discount: 22,
  rating: 4.3,
  reviews: 156,
  image: "image-url",
  badge: "Bestseller",
  category: "planes",
  freeDelivery: true,
  description: "Product description"
}
```

### Shipping Rules
Edit `src/user/pages/CartPage.js` and `CheckoutPage.js`:
```javascript
const shipping = subtotal > 999 ? 0 : 99; // Free shipping above ₹999
```

## 🎯 Features in Detail

### Cart Management
- Add products from any page
- Update quantities with +/- buttons
- Remove items individually
- Persistent cart state across pages
- Real-time total calculation
- Free shipping indicator

### Checkout Process
1. Personal information (name, email, phone)
2. Shipping address (address, city, state, pincode)
3. Payment method (COD or Online)
4. Order summary sidebar
5. Order confirmation with toast notification

### Product Filtering
- **Search**: Real-time search by product name
- **Category Filter**: Filter by 8 categories (planes, drones, cars, etc.)
- **Sort Options**:
  - Featured (default)
  - Price: Low to High
  - Price: High to Low
  - Top Rated
  - Best Discount

### Toast Notifications
- Success: Green background
- Error: Red background
- Warning: Yellow background
- Auto-dismiss after 3 seconds
- Manual close button
- Non-blocking UI

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 992px+ (lg)
- **Tablet**: 768px-991px (md)
- **Mobile**: <768px (sm)

### Grid System
- **Products**: 4 cols (lg), 3 cols (md), 2 cols (sm)
- **Categories**: 4 cols (lg), 3 cols (md), 2 cols (sm)
- **Cart**: 2 cols (lg), 1 col (md/sm)

## 🎨 Customization Guide

### Change Brand Colors
Edit `src/index.css`:
```css
/* Replace #ffc107 with your brand color */
.btn-warning { background-color: #YOUR_COLOR; }
.text-warning { color: #YOUR_COLOR; }
```

### Add New Products
1. Add product object to `src/user/data/products.js`
2. Use Picsum or real images
3. Set category, price, rating, etc.

### Modify Shipping Logic
Edit `CartPage.js` and `CheckoutPage.js`:
```javascript
const shipping = subtotal > YOUR_THRESHOLD ? 0 : YOUR_FEE;
```

## 🐛 Known Issues
- None currently

## 🔮 Future Enhancements
- User authentication
- Product reviews and ratings
- Wishlist functionality
- Order history
- Payment gateway integration
- Admin dashboard
- Real-time inventory management
- Email notifications

## 📄 Documentation Files
- `THEME_GUIDE.md` - Complete brand and styling guide
- `PROJECT_SUMMARY.md` - This file
- `FILES_TO_DELETE.md` - Cleanup documentation

## 👨‍💻 Development Notes

### Code Organization
- Components are modular and reusable
- Context API for global state (cart)
- Consistent naming conventions
- Bootstrap classes for styling
- Custom CSS for animations

### Best Practices
- Responsive design first
- Accessibility considerations
- Performance optimized
- Clean code structure
- Commented where necessary

## 📞 Support
For issues or questions, refer to the documentation files or review the code comments.

## 📝 License
This project is for educational/portfolio purposes.

---

**Built with ❤️ for RC enthusiasts**
