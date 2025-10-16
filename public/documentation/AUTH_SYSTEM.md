# Authentication System Documentation

## 🔐 Overview
Complete user authentication system with Login, Register, and Profile management.

## 📁 Files Created

### Context
- `src/user/context/AuthContext.js` - Authentication state management

### Pages
- `src/user/pages/LoginPage.js` - User login page
- `src/user/pages/RegisterPage.js` - User registration page
- `src/user/pages/ProfilePage.js` - User profile management

### Updated Files
- `src/App.js` - Added AuthProvider and new routes
- `src/user/components/Navbar.js` - Shows user info when logged in

## 🎯 Features

### Login Page (`/login`)
- Email and password login
- Remember me checkbox
- Forgot password link
- Social login buttons (Google, Facebook)
- Redirect to register page
- Toast notifications

### Register Page (`/register`)
- Full name, email, phone, password fields
- Password confirmation
- Terms & conditions checkbox
- Redirect to login page
- Form validation

### Profile Page (`/profile`)
- View profile information
- Edit profile (name, email, phone)
- User avatar display
- Sidebar navigation
- Quick stats (orders, wishlist, reviews)
- Logout functionality

## 🔧 How It Works

### AuthContext
```javascript
const { user, login, register, logout, updateProfile } = useAuth();
```

**Methods:**
- `login(email, password)` - Login user
- `register(name, email, password, phone)` - Register new user
- `logout()` - Logout user
- `updateProfile(data)` - Update user profile
- `user` - Current user object or null

### User Object Structure
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  avatar: "https://ui-avatars.com/api/?name=John+Doe"
}
```

## 🚀 Usage

### Check if User is Logged In
```javascript
import { useAuth } from './user/context/AuthContext';

const MyComponent = () => {
  const { user } = useAuth();
  
  if (user) {
    return <p>Welcome, {user.name}!</p>;
  }
  return <p>Please login</p>;
};
```

### Login User
```javascript
const { login } = useAuth();

const handleLogin = () => {
  const result = login('user@example.com', 'password123');
  if (result.success) {
    // Redirect or show success message
  }
};
```

### Logout User
```javascript
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate('/');
};
```

### Protected Routes (Future Enhancement)
```javascript
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Usage
<Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
```

## 🎨 UI Components

### Navbar Integration
- Shows "Login" button when logged out
- Shows user avatar and dropdown when logged in
- Dropdown includes: Profile, Orders, Wishlist, Logout

### Profile Sidebar
- User avatar and info
- Navigation links:
  - My Profile (active)
  - My Orders
  - Wishlist
  - Addresses
- Logout button

## 💾 Data Storage

Currently using **localStorage** for persistence:
- Key: `user`
- Value: JSON stringified user object
- Persists across page refreshes

## 🔄 Future Enhancements

### Backend Integration
Replace mock functions with actual API calls:

```javascript
const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### JWT Token Management
- Store JWT token in localStorage
- Add token to API request headers
- Implement token refresh logic
- Handle token expiration

### Password Reset
- Forgot password page
- Email verification
- Reset password page
- OTP verification

### Email Verification
- Send verification email on register
- Verify email page
- Resend verification email

### Social Login
- Google OAuth integration
- Facebook OAuth integration
- Apple Sign In

### Security Enhancements
- Password strength indicator
- Two-factor authentication (2FA)
- Session management
- CSRF protection
- Rate limiting

## 🧪 Testing

### Test Credentials
Any email/password combination works (mock authentication):
- Email: `test@example.com`
- Password: `password123`

### Test Flow
1. Go to `/register` and create account
2. Redirected to home page (logged in)
3. Click user avatar in navbar
4. Go to profile page
5. Edit profile information
6. Logout

## 📝 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | User login |
| `/register` | RegisterPage | User registration |
| `/profile` | ProfilePage | User profile |
| `/orders` | (Future) | Order history |
| `/wishlist` | (Future) | User wishlist |
| `/addresses` | (Future) | Saved addresses |

## 🎯 Next Steps

1. **Backend API Integration**
   - Create Express.js backend
   - MongoDB/PostgreSQL database
   - JWT authentication
   - Password hashing (bcrypt)

2. **Protected Routes**
   - Implement route guards
   - Redirect to login if not authenticated

3. **Order History Page**
   - Display user orders
   - Order details
   - Track order status

4. **Wishlist Page**
   - Add/remove items
   - Move to cart
   - Share wishlist

5. **Address Management**
   - Add/edit/delete addresses
   - Set default address
   - Use in checkout

## 🐛 Known Issues
- Mock authentication (no real backend)
- No password validation
- No email verification
- No session timeout

## 📞 Support
Refer to code comments in AuthContext.js for implementation details.
