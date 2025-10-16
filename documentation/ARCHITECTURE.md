# System Architecture

## Overview

Wing Hobbies follows a component-based architecture using React with Context API for state management. The application is structured as a Single Page Application (SPA) with client-side routing.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
├─────────────────────────────────────────────────────────┤
│                    React Application                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │              App.js (Root Component)              │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │         Context Providers (State)           │ │  │
│  │  │  • AuthContext                              │ │  │
│  │  │  • CartContext                              │ │  │
│  │  │  • WishlistContext                          │ │  │
│  │  │  • RecentlyViewedContext                    │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │         React Router (Routing)              │ │  │
│  │  │  • Public Routes                            │ │  │
│  │  │  • Protected Routes                         │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │         Page Components                     │ │  │
│  │  │  • Home, Products, ProductPage              │ │  │
│  │  │  • Cart, Checkout, Profile                  │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │         Shared Components                   │ │  │
│  │  │  • Navbar, Footer, Sidebar                  │ │  │
│  │  │  • Toast, LoadingSpinner, ChatWidget        │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  localStorage (Persistence)              │
│  • User authentication data                             │
│  • Shopping cart items                                  │
│  • Wishlist items                                       │
│  • Recently viewed products                             │
└─────────────────────────────────────────────────────────┘
```

## Folder Structure

```
src/
├── user/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Sidebar.js
│   │   ├── Toast.js
│   │   ├── LoadingSpinner.js
│   │   ├── SkeletonCard.js
│   │   ├── ProductReviews.js
│   │   ├── ProductQuickView.js
│   │   ├── ShareButtons.js
│   │   └── ChatWidget.js
│   │
│   ├── pages/               # Page components
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductPage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── ProfilePage.js
│   │   ├── OrdersPage.js
│   │   ├── OrderDetailPage.js
│   │   ├── WishlistPage.js
│   │   ├── ContactPage.js
│   │   ├── FAQPage.js
│   │   ├── ComparePage.js
│   │   ├── ShippingPolicyPage.js
│   │   ├── AboutPage.js
│   │   └── NotFoundPage.js
│   │
│   ├── context/             # State management
│   │   ├── AuthContext.js
│   │   ├── CartContext.js
│   │   ├── WishlistContext.js
│   │   └── RecentlyViewedContext.js
│   │
│   └── data/                # Mock data & utilities
│       ├── products.js
│       ├── reviews.js
│       └── vouchers.js
│
├── App.js                   # Root component
├── index.js                 # Entry point
└── index.css                # Global styles
```

## Design Patterns

### 1. Component-Based Architecture

All UI elements are broken into reusable components:
- **Container Components**: Pages that manage state and logic
- **Presentational Components**: Pure UI components
- **Layout Components**: Navbar, Footer, Sidebar

### 2. Context API Pattern

Global state management using React Context:

```javascript
// Provider wraps the app
<AuthProvider>
  <CartProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </CartProvider>
</AuthProvider>

// Consumers use hooks
const { user, login } = useAuth();
const { cart, addToCart } = useCart();
```

### 3. Higher-Order Component (HOC)

Protected routes using HOC pattern:

```javascript
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
```

### 4. Compound Component Pattern

Complex components like ProductReviews use compound pattern:
- Rating summary
- Distribution chart
- Review form
- Reviews list

### 5. Custom Hooks

Reusable logic extracted into custom hooks:
- `useAuth()` - Authentication
- `useCart()` - Shopping cart
- `useWishlist()` - Wishlist
- `useRecentlyViewed()` - Browsing history

## State Management

### Context Providers

#### AuthContext
- **State**: user, isAuthenticated
- **Actions**: login, register, logout, updateProfile
- **Persistence**: localStorage

#### CartContext
- **State**: cart (array of items)
- **Actions**: addToCart, removeFromCart, updateQuantity, clearCart
- **Computed**: getCartTotal
- **Persistence**: localStorage

#### WishlistContext
- **State**: wishlist (array of products)
- **Actions**: addToWishlist, removeFromWishlist, clearWishlist
- **Computed**: isInWishlist
- **Persistence**: localStorage

#### RecentlyViewedContext
- **State**: recentlyViewed (last 10 products)
- **Actions**: addToRecentlyViewed
- **Persistence**: localStorage

## Routing Strategy

### Public Routes
- `/` - Home
- `/products` - Product listing
- `/product/:id` - Product detail
- `/contact` - Contact page
- `/faq` - FAQ
- `/about` - About us
- `/shipping` - Shipping policy
- `/compare` - Product comparison
- `/login` - Login
- `/register` - Register

### Protected Routes
- `/profile` - User profile
- `/orders` - Order history
- `/order/:id` - Order detail
- `/wishlist` - Wishlist
- `/cart` - Shopping cart (accessible but prompts login at checkout)
- `/checkout` - Checkout (requires authentication)

### Catch-All Route
- `/*` - 404 Not Found page

## Data Flow

### 1. User Authentication Flow

```
User Input → LoginPage → AuthContext.login() 
→ localStorage.setItem() → Update state → Redirect to profile
```

### 2. Add to Cart Flow

```
Product Page → Add to Cart Button → CartContext.addToCart() 
→ localStorage.setItem() → Update state → Show toast notification
```

### 3. Checkout Flow

```
Cart Page → Proceed to Checkout → Check authentication 
→ CheckoutPage → Form submission → Create order 
→ Clear cart → Redirect to orders
```

### 4. Product Search Flow

```
Navbar Search → Navigate to /products?search=query 
→ Products Page → useSearchParams() → Filter products → Display results
```

## Performance Optimizations

### 1. Code Splitting
- Lazy loading for route components
- Dynamic imports for heavy components

### 2. Memoization
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers

### 3. Loading States
- Skeleton screens for perceived performance
- Loading spinners for async operations
- Optimistic UI updates

### 4. Image Optimization
- Lazy loading images
- Responsive images
- Optimized image sizes

### 5. LocalStorage Caching
- Persist cart, wishlist, auth data
- Reduce re-renders
- Instant page loads

## Security Considerations

### 1. Authentication
- Client-side authentication (demo)
- Protected routes
- Session persistence

### 2. Input Validation
- Form validation
- XSS prevention
- SQL injection prevention (when backend added)

### 3. Data Sanitization
- Sanitize user inputs
- Escape HTML content
- Validate email formats

## Scalability

### Current Architecture
- Client-side only
- Mock data
- localStorage persistence

### Future Backend Integration

```
React Frontend ↔ REST API ↔ Backend Server ↔ Database
                    ↓
              Authentication
              Payment Gateway
              Email Service
```

### Recommended Backend Stack
- **Node.js + Express** - API server
- **MongoDB** - Database
- **JWT** - Authentication
- **Stripe/Razorpay** - Payment gateway
- **AWS S3** - Image storage
- **Redis** - Caching

## Testing Strategy

### Unit Tests
- Component rendering
- Context providers
- Utility functions

### Integration Tests
- User flows
- Form submissions
- Navigation

### E2E Tests
- Complete user journeys
- Checkout process
- Authentication flow

## Deployment Architecture

### Development
```
Local Machine → npm start → localhost:3000
```

### Production
```
Source Code → npm run build → Static Files 
→ CDN/Web Server → Users
```

### Recommended Hosting
- **Vercel** - Automatic deployments
- **Netlify** - CI/CD integration
- **AWS S3 + CloudFront** - Scalable hosting
- **Firebase Hosting** - Quick deployment
