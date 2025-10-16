# Context API Documentation

## Overview

Wing Hobbies uses React Context API for global state management. Four context providers manage authentication, shopping cart, wishlist, and browsing history.

## Context Providers

### AuthContext

**Location**: `src/user/context/AuthContext.js`

Manages user authentication and profile data.

#### State

```javascript
{
  user: {
    id: number,
    name: string,
    email: string,
    phone: string,
    avatar: string
  } | null,
  isAuthenticated: boolean
}
```

#### Methods

**login(email, password)**
- Authenticates user
- Stores user data in localStorage
- Returns: boolean (success/failure)

```javascript
const { login } = useAuth();
const success = login('user@example.com', 'password');
```

**register(userData)**
- Creates new user account
- Stores user data in localStorage
- Returns: boolean (success/failure)

```javascript
const { register } = useAuth();
const success = register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  phone: '1234567890'
});
```

**logout()**
- Clears user session
- Removes data from localStorage
- Redirects to home

```javascript
const { logout } = useAuth();
logout();
```

**updateProfile(updates)**
- Updates user profile
- Persists to localStorage
- Returns: void

```javascript
const { updateProfile } = useAuth();
updateProfile({
  name: 'Jane Doe',
  phone: '9876543210'
});
```

#### Usage

```javascript
import { useAuth } from '../context/AuthContext';

function Component() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => login('email', 'pass')}>Login</button>
      )}
    </div>
  );
}
```

---

### CartContext

**Location**: `src/user/context/CartContext.js`

Manages shopping cart items and operations.

#### State

```javascript
{
  cart: [
    {
      id: number,
      name: string,
      price: number,
      image: string,
      quantity: number
    }
  ]
}
```

#### Methods

**addToCart(product)**
- Adds product to cart
- Increments quantity if already exists
- Persists to localStorage

```javascript
const { addToCart } = useCart();
addToCart(product);
```

**removeFromCart(productId)**
- Removes product from cart
- Updates localStorage

```javascript
const { removeFromCart } = useCart();
removeFromCart(productId);
```

**updateQuantity(productId, quantity)**
- Updates product quantity
- Removes if quantity is 0
- Persists to localStorage

```javascript
const { updateQuantity } = useCart();
updateQuantity(productId, 3);
```

**getCartTotal()**
- Calculates total cart value
- Returns: number

```javascript
const { getCartTotal } = useCart();
const total = getCartTotal();
```

**clearCart()**
- Empties cart
- Clears localStorage

```javascript
const { clearCart } = useCart();
clearCart();
```

#### Usage

```javascript
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart ({cart.length})
    </button>
  );
}
```

---

### WishlistContext

**Location**: `src/user/context/WishlistContext.js`

Manages user's wishlist items.

#### State

```javascript
{
  wishlist: [
    {
      id: number,
      name: string,
      price: number,
      image: string,
      // ... other product fields
    }
  ]
}
```

#### Methods

**addToWishlist(product)**
- Adds product to wishlist
- Prevents duplicates
- Persists to localStorage

```javascript
const { addToWishlist } = useWishlist();
addToWishlist(product);
```

**removeFromWishlist(productId)**
- Removes product from wishlist
- Updates localStorage

```javascript
const { removeFromWishlist } = useWishlist();
removeFromWishlist(productId);
```

**isInWishlist(productId)**
- Checks if product is in wishlist
- Returns: boolean

```javascript
const { isInWishlist } = useWishlist();
const inWishlist = isInWishlist(productId);
```

**clearWishlist()**
- Empties wishlist
- Clears localStorage

```javascript
const { clearWishlist } = useWishlist();
clearWishlist();
```

#### Usage

```javascript
import { useWishlist } from '../context/WishlistContext';

function WishlistButton({ product }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
  const handleToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <button onClick={handleToggle}>
      <i className={`fas fa-heart ${inWishlist ? 'text-danger' : ''}`} />
    </button>
  );
}
```

---

### RecentlyViewedContext

**Location**: `src/user/context/RecentlyViewedContext.js`

Tracks user's browsing history.

#### State

```javascript
{
  recentlyViewed: [
    {
      id: number,
      name: string,
      price: number,
      image: string,
      // ... other product fields
    }
  ] // Max 10 items
}
```

#### Methods

**addToRecentlyViewed(product)**
- Adds product to history
- Removes duplicates
- Keeps last 10 items
- Persists to localStorage

```javascript
const { addToRecentlyViewed } = useRecentlyViewed();
addToRecentlyViewed(product);
```

#### Usage

```javascript
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

function ProductPage() {
  const { addToRecentlyViewed, recentlyViewed } = useRecentlyViewed();
  
  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product.id]);
  
  return (
    <div>
      <h3>Recently Viewed</h3>
      {recentlyViewed.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
```

---

## Provider Setup

### App.js Structure

```javascript
import { AuthProvider } from './user/context/AuthContext';
import { CartProvider } from './user/context/CartContext';
import { WishlistProvider } from './user/context/WishlistContext';
import { RecentlyViewedProvider } from './user/context/RecentlyViewedContext';

function App() {
  return (
    <AuthProvider>
      <RecentlyViewedProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              {/* Routes */}
            </Router>
          </CartProvider>
        </WishlistProvider>
      </RecentlyViewedProvider>
    </AuthProvider>
  );
}
```

### Provider Order

1. **AuthProvider** - Outermost (authentication needed by all)
2. **RecentlyViewedProvider** - Browsing history
3. **WishlistProvider** - Wishlist functionality
4. **CartProvider** - Shopping cart (innermost)

---

## LocalStorage Persistence

### Storage Keys

- `Winghobbies_user` - User authentication data
- `Winghobbies_cart` - Shopping cart items
- `Winghobbies_wishlist` - Wishlist items
- `Winghobbies_recentlyViewed` - Browsing history

### Data Format

```javascript
// User
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "avatar": "https://..."
}

// Cart
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 2999,
    "image": "https://...",
    "quantity": 2
  }
]

// Wishlist
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 2999,
    "image": "https://...",
    // ... full product object
  }
]

// Recently Viewed
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 2999,
    "image": "https://...",
    // ... full product object
  }
]
```

---

## Best Practices

### 1. Use Custom Hooks

Always use the provided hooks instead of useContext directly:

```javascript
// ✅ Good
const { user } = useAuth();

// ❌ Bad
const { user } = useContext(AuthContext);
```

### 2. Destructure Only What You Need

```javascript
// ✅ Good
const { addToCart } = useCart();

// ❌ Bad (unnecessary re-renders)
const cartContext = useCart();
```

### 3. Handle Loading States

```javascript
const { user } = useAuth();

if (!user) {
  return <LoadingSpinner />;
}
```

### 4. Error Handling

```javascript
const { login } = useAuth();

const handleLogin = async () => {
  try {
    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials');
    }
  } catch (error) {
    setError('Login failed');
  }
};
```

### 5. Memoization

Use useMemo for expensive computations:

```javascript
const { cart } = useCart();

const cartTotal = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}, [cart]);
```

### 6. Avoid Prop Drilling

Use context instead of passing props through multiple levels:

```javascript
// ✅ Good
function DeepComponent() {
  const { user } = useAuth();
  return <div>{user.name}</div>;
}

// ❌ Bad
<Parent user={user}>
  <Child user={user}>
    <GrandChild user={user} />
  </Child>
</Parent>
```

---

## Testing Context

### Mock Provider

```javascript
import { AuthProvider } from '../context/AuthContext';

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com'
};

function TestWrapper({ children }) {
  return (
    <AuthProvider value={{ user: mockUser }}>
      {children}
    </AuthProvider>
  );
}
```

### Test Component

```javascript
import { render } from '@testing-library/react';

test('displays user name', () => {
  const { getByText } = render(
    <TestWrapper>
      <UserProfile />
    </TestWrapper>
  );
  
  expect(getByText('Test User')).toBeInTheDocument();
});
```

---

## Future Enhancements

### 1. Backend Integration

Replace localStorage with API calls:

```javascript
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  setUser(data.user);
};
```

### 2. Redux Migration

For larger applications, consider Redux:

```javascript
// Redux slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // logic
    }
  }
});
```

### 3. Real-time Updates

Use WebSockets for live cart sync:

```javascript
useEffect(() => {
  const socket = io('ws://server');
  socket.on('cart-update', (data) => {
    setCart(data);
  });
}, []);
```
