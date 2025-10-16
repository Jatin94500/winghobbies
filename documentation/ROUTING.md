# Routing Documentation

## Overview

Wing Hobbies uses React Router DOM v6 for client-side routing. The application follows a Single Page Application (SPA) architecture with declarative routing.

## Router Configuration

**Location**: `src/App.js`

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes */}
      </Routes>
    </Router>
  );
}
```

## Route Structure

### Public Routes

Routes accessible to all users without authentication.

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page with featured products |
| `/products` | Products | Product listing with filters |
| `/product/:id` | ProductPage | Product detail page |
| `/contact` | ContactPage | Contact form and information |
| `/faq` | FAQPage | Frequently asked questions |
| `/about` | AboutPage | Company information |
| `/shipping` | ShippingPolicyPage | Shipping and return policy |
| `/compare` | ComparePage | Product comparison tool |
| `/login` | LoginPage | User login form |
| `/register` | RegisterPage | User registration form |
| `/*` | NotFoundPage | 404 error page |

### Protected Routes

Routes requiring user authentication.

| Path | Component | Description |
|------|-----------|-------------|
| `/profile` | ProfilePage | User profile management |
| `/orders` | OrdersPage | Order history |
| `/order/:id` | OrderDetailPage | Single order details |
| `/wishlist` | WishlistPage | Saved products |
| `/cart` | CartPage | Shopping cart (accessible but prompts login) |
| `/checkout` | CheckoutPage | Checkout form (requires auth) |

## Route Implementation

### Basic Route

```javascript
<Route path="/products" element={<Products />} />
```

### Dynamic Route

```javascript
<Route path="/product/:id" element={<ProductPage />} />
```

**Access params in component**:
```javascript
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  // Use id to fetch product
}
```

### Protected Route

```javascript
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
```

**ProtectedRoute component**:
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

### Catch-All Route (404)

```javascript
<Route path="/*" element={<NotFoundPage />} />
```

## Navigation

### Link Component

Use `Link` for internal navigation:

```javascript
import { Link } from 'react-router-dom';

<Link to="/products">Products</Link>
<Link to={`/product/${product.id}`}>View Details</Link>
```

### NavLink Component

Use `NavLink` for navigation with active state:

```javascript
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/products" 
  className={({ isActive }) => isActive ? 'active' : ''}
>
  Products
</NavLink>
```

### Programmatic Navigation

Use `useNavigate` hook:

```javascript
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/products');
  };
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <button onClick={handleClick}>Go to Products</button>
  );
}
```

## Query Parameters

### Reading Query Params

```javascript
import { useSearchParams } from 'react-router-dom';

function Products() {
  const [searchParams] = useSearchParams();
  
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  
  // URL: /products?search=plane&category=beginner
  // search = "plane"
  // category = "beginner"
}
```

### Setting Query Params

```javascript
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  
  const handleSearch = (query) => {
    navigate(`/products?search=${query}`);
  };
}
```

### Multiple Query Params

```javascript
const params = new URLSearchParams({
  search: 'plane',
  category: 'beginner',
  sort: 'price-low'
});

navigate(`/products?${params.toString()}`);
// Result: /products?search=plane&category=beginner&sort=price-low
```

## Route Guards

### Authentication Guard

```javascript
const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};
```

**Usage**:
```javascript
<Route 
  path="/profile" 
  element={
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  } 
/>
```

### Redirect After Login

```javascript
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const handleLogin = () => {
    // Login logic
    navigate(from, { replace: true });
  };
}
```

## Nested Routes

### Parent Route

```javascript
<Route path="/account" element={<AccountLayout />}>
  <Route index element={<AccountDashboard />} />
  <Route path="profile" element={<ProfilePage />} />
  <Route path="orders" element={<OrdersPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>
```

### Layout Component

```javascript
import { Outlet } from 'react-router-dom';

function AccountLayout() {
  return (
    <div>
      <AccountSidebar />
      <div className="content">
        <Outlet /> {/* Child routes render here */}
      </div>
    </div>
  );
}
```

## Route Metadata

### Page Titles

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} - Wing Hobbies`;
  }, [title]);
}

// Usage in component
function ProductPage() {
  usePageTitle('Products');
  // ...
}
```

### Route-based Titles

```javascript
const routes = {
  '/': 'Home',
  '/products': 'Products',
  '/about': 'About Us',
  '/contact': 'Contact'
};

function App() {
  const location = useLocation();
  
  useEffect(() => {
    const title = routes[location.pathname] || '404';
    document.title = `${title} - Wing Hobbies`;
  }, [location]);
}
```

## Scroll Behavior

### Scroll to Top on Route Change

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Add to App.js
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Routes */}
      </Routes>
    </Router>
  );
}
```

### Scroll to Element

```javascript
import { useLocation } from 'react-router-dom';

function Component() {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);
}

// Navigate with hash
<Link to="/products#featured">Featured Products</Link>
```

## Route Transitions

### Basic Transition

```javascript
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          {/* Routes */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
```

**CSS**:
```css
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
```

## Lazy Loading Routes

### Code Splitting

```javascript
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

const Products = lazy(() => import('./pages/Products'));
const ProductPage = lazy(() => import('./pages/ProductPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

## Route Configuration Object

### Centralized Routes

```javascript
const routes = [
  {
    path: '/',
    element: <Home />,
    title: 'Home'
  },
  {
    path: '/products',
    element: <Products />,
    title: 'Products'
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
    title: 'Product Details'
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    title: 'Profile',
    protected: true
  }
];

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>{route.element}</ProtectedRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
```

## Breadcrumbs

### Implementation

```javascript
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return isLast ? (
            <li key={name} className="breadcrumb-item active">
              {name}
            </li>
          ) : (
            <li key={name} className="breadcrumb-item">
              <Link to={routeTo}>{name}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

## Route Analytics

### Track Page Views

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);
}

// Usage in App.js
function App() {
  usePageTracking();
  // ...
}
```

## Best Practices

### 1. Use Absolute Paths

```javascript
// ✅ Good
<Link to="/products">Products</Link>

// ❌ Bad
<Link to="products">Products</Link>
```

### 2. Use Link for Internal Navigation

```javascript
// ✅ Good
<Link to="/products">Products</Link>

// ❌ Bad
<a href="/products">Products</a>
```

### 3. Handle 404 Routes

```javascript
<Routes>
  {/* Other routes */}
  <Route path="/*" element={<NotFoundPage />} />
</Routes>
```

### 4. Preserve Query Params

```javascript
const navigate = useNavigate();
const [searchParams] = useSearchParams();

const handleFilter = (filter) => {
  const params = new URLSearchParams(searchParams);
  params.set('filter', filter);
  navigate(`/products?${params.toString()}`);
};
```

### 5. Use Replace for Redirects

```javascript
// Prevents back button issues
<Navigate to="/login" replace />
navigate('/login', { replace: true });
```

## Troubleshooting

### Routes Not Working

1. Check route order (specific before generic)
2. Verify exact path spelling
3. Ensure Router wraps Routes
4. Check for typos in path

### 404 on Refresh

Configure server for SPA:

**Nginx**:
```nginx
location / {
    try_files $uri /index.html;
}
```

**Vercel** (vercel.json):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Protected Routes Not Working

1. Verify AuthContext is wrapping Router
2. Check user state in AuthContext
3. Ensure ProtectedRoute component is correct
4. Test authentication flow

## Future Enhancements

- Route-based code splitting
- Route prefetching
- Route-level error boundaries
- Advanced route guards
- Route-based data loading
- Parallel routes
- Route animations
