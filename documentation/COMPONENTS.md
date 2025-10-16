# Components Documentation

## Layout Components

### Navbar
**Location**: `src/user/components/Navbar.js`

Navigation bar with search, cart, and user menu.

**Features**:
- Wing Hobbies logo (35px height)
- Search bar (desktop only in navbar, mobile in collapse menu)
- Categories dropdown
- Cart with badge counter
- User profile dropdown
- Mobile hamburger menu
- Auto-close on navigation

**Props**: None (uses Context)

**Usage**:
```jsx
<Navbar />
```

---

### Footer
**Location**: `src/user/components/Footer.js`

Dark footer with newsletter, links, and social media.

**Features**:
- Newsletter subscription form
- Quick links (About, Contact, FAQ, Shipping)
- Social media icons
- Payment method icons
- Copyright notice

**Props**: None

**Usage**:
```jsx
<Footer />
```

---

### Sidebar
**Location**: `src/user/components/Sidebar.js`

Left sidebar with promotional content.

**Features**:
- Flash sale banner
- Today's deals
- Free shipping promo
- Special offers
- Category quick links
- Sticky positioning (top: 80px)

**Props**: None

**Usage**:
```jsx
<Sidebar />
```

---

## UI Components

### Toast
**Location**: `src/user/components/Toast.js`

Notification toast for user feedback.

**Props**:
- `message` (string) - Toast message
- `type` (string) - 'success' | 'error' | 'warning'
- `onClose` (function) - Close callback

**Usage**:
```jsx
<Toast 
  message="Added to cart!" 
  type="success" 
  onClose={() => setToast(null)} 
/>
```

**Features**:
- Auto-dismiss after 3 seconds
- Top-center positioning
- Color-coded by type
- Smooth fade-in animation

---

### LoadingSpinner
**Location**: `src/user/components/LoadingSpinner.js`

Loading indicator for async operations.

**Props**:
- `fullScreen` (boolean) - Full screen overlay

**Usage**:
```jsx
<LoadingSpinner fullScreen={true} />
```

---

### SkeletonCard
**Location**: `src/user/components/SkeletonCard.js`

Skeleton loading card for product grid.

**Props**: None

**Usage**:
```jsx
{loading && [...Array(8)].map((_, i) => (
  <SkeletonCard key={i} />
))}
```

**Features**:
- Animated gradient background
- Matches product card dimensions
- Improves perceived performance

---

### ChatWidget
**Location**: `src/user/components/ChatWidget.js`

Live chat widget for customer support.

**Features**:
- Toggle button (bottom-right)
- Chat window (350px × 500px)
- Quick reply buttons
- Message history
- User/bot message styling

**Props**: None

**Usage**:
```jsx
<ChatWidget />
```

---

## Product Components

### ProductReviews
**Location**: `src/user/components/ProductReviews.js`

Product reviews section with rating summary.

**Props**:
- `productId` (number) - Product ID

**Usage**:
```jsx
<ProductReviews productId={product.id} />
```

**Features**:
- Average rating display
- Star distribution chart
- Write review form (authenticated users)
- Reviews list with avatars
- Verified purchase badges
- Helpful votes

---

### ProductQuickView
**Location**: `src/user/components/ProductQuickView.js`

Modal for quick product preview.

**Props**:
- `product` (object) - Product data
- `show` (boolean) - Modal visibility
- `onHide` (function) - Close callback

**Usage**:
```jsx
<ProductQuickView 
  product={product} 
  show={showModal} 
  onHide={() => setShowModal(false)} 
/>
```

**Features**:
- Product image
- Price and discount
- Add to cart/wishlist
- View full details link
- Bootstrap modal

---

### ShareButtons
**Location**: `src/user/components/ShareButtons.js`

Social sharing buttons for products.

**Props**:
- `url` (string) - URL to share
- `title` (string) - Share title

**Usage**:
```jsx
<ShareButtons 
  url={window.location.href} 
  title={product.name} 
/>
```

**Features**:
- Facebook share
- Twitter share
- WhatsApp share
- Telegram share
- Copy link to clipboard

---

## Page Components

### Home
**Location**: `src/user/pages/Home.js`

Landing page with featured products.

**Sections**:
- Hero banner
- Featured products (8 items)
- Special offers
- Categories grid
- Trending products
- Mega sale banner
- Why choose us

**Features**:
- Loading state with skeletons
- Clickable product cards
- Responsive grid layout

---

### Products
**Location**: `src/user/pages/Products.js`

Product listing with filters.

**Features**:
- Search input
- Category filter
- Sort options (price, rating, discount)
- Price range slider
- Quick filter buttons
- Results count
- Clear filters button
- Compare products link
- Loading state

**URL Params**:
- `?search=query` - Search filter
- `?category=slug` - Category filter

---

### ProductPage
**Location**: `src/user/pages/ProductPage.js`

Product detail page.

**Features**:
- Product image
- Price and discount
- Quantity selector
- Add to cart button
- Buy now button
- Wishlist toggle
- Specifications table
- Product reviews
- Related products
- Share buttons
- Recently viewed tracking

---

### CartPage
**Location**: `src/user/pages/CartPage.js`

Shopping cart page.

**Features**:
- Cart items table
- Quantity controls
- Remove item button
- Order summary
- Shipping calculation
- Proceed to checkout
- Continue shopping link

**Shipping Logic**:
- Free shipping: Orders ≥ ₹999
- Shipping charge: ₹99 for orders < ₹999

---

### CheckoutPage
**Location**: `src/user/pages/CheckoutPage.js`

Checkout form page.

**Features**:
- Personal information form
- Shipping address form
- Payment method selection
- Order summary sidebar
- Voucher code input
- Place order button
- Toast notifications

**Validation**:
- Required fields
- Email format
- Phone number format
- Pincode validation

---

### ProfilePage
**Location**: `src/user/pages/ProfilePage.js`

User profile management.

**Features**:
- Profile information display
- Edit profile form
- Avatar upload
- Update button
- Success notifications

---

### OrdersPage
**Location**: `src/user/pages/OrdersPage.js`

Order history listing.

**Features**:
- Orders table
- Order status badges
- View details link
- Order date and total
- Empty state message

---

### OrderDetailPage
**Location**: `src/user/pages/OrderDetailPage.js`

Single order details.

**Features**:
- Order information
- Items list
- Shipping address
- Payment method
- Order timeline
- Print invoice button

---

### WishlistPage
**Location**: `src/user/pages/WishlistPage.js`

Saved products wishlist.

**Features**:
- Wishlist items grid
- Remove from wishlist
- Add to cart
- View product link
- Empty state message

---

### ContactPage
**Location**: `src/user/pages/ContactPage.js`

Contact information and form.

**Features**:
- Contact form
- Address card (Lucknow)
- Phone numbers
- Email addresses
- Business hours
- Social media links
- Google Maps embed

---

### FAQPage
**Location**: `src/user/pages/FAQPage.js`

Frequently asked questions.

**Features**:
- Accordion sections
- 4 categories (Orders, Returns, Products, Payment)
- Search functionality
- Contact support CTA

---

### ComparePage
**Location**: `src/user/pages/ComparePage.js`

Product comparison tool.

**Features**:
- Select up to 3 products
- Specifications table
- Side-by-side comparison
- View details links
- Remove product button

---

### ShippingPolicyPage
**Location**: `src/user/pages/ShippingPolicyPage.js`

Shipping and return policy.

**Features**:
- Delivery timelines
- Shipping charges table
- Return policy (7 days)
- Refund process
- Contact information

---

### AboutPage
**Location**: `src/user/pages/AboutPage.js`

Company information.

**Features**:
- Company story
- Mission statement
- Core values (4 cards)
- Team members (4 people)
- Business statistics
- CTA buttons

---

### NotFoundPage
**Location**: `src/user/pages/NotFoundPage.js`

404 error page.

**Features**:
- RC plane icon
- Friendly error message
- Back to home button
- Browse products button
- Cute design

---

## Component Best Practices

### 1. Props Validation
Use PropTypes or TypeScript for type checking.

### 2. Destructuring
Destructure props and context values:
```jsx
const { user, login } = useAuth();
```

### 3. Event Handlers
Use arrow functions or useCallback:
```jsx
const handleClick = useCallback(() => {
  // logic
}, [dependencies]);
```

### 4. Conditional Rendering
Use ternary or logical operators:
```jsx
{loading ? <LoadingSpinner /> : <Content />}
{user && <ProfileMenu />}
```

### 5. Keys in Lists
Always provide unique keys:
```jsx
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

### 6. Accessibility
- Use semantic HTML
- Add ARIA labels
- Keyboard navigation
- Alt text for images

### 7. Performance
- Memoize expensive components
- Use React.memo for pure components
- Lazy load heavy components
- Optimize re-renders

### 8. Styling
- Use Bootstrap classes
- Custom CSS in index.css
- Inline styles for dynamic values
- Responsive design with breakpoints
