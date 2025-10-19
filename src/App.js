import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './user/context/CartContext';
import { AuthProvider } from './user/context/AuthContext';
import { WishlistProvider } from './user/context/WishlistContext';
import { RecentlyViewedProvider } from './user/context/RecentlyViewedContext';
import Navbar from './user/components/Navbar';
import Footer from './user/components/Footer';
import Home from './user/pages/Home';
import Products from './user/pages/Products';
import CartPage from './user/pages/CartPage';
import Login from './user/pages/Login';
import Register from './user/pages/Register';
import Profile from './user/pages/Profile';
import ProductDetail from './user/pages/ProductDetail';
import Checkout from './user/pages/Checkout';
import Contact from './user/pages/Contact';
import About from './user/pages/About';
import FAQ from './user/pages/FAQ';
import OrdersPage from './user/pages/OrdersPage';
import OrderDetailPage from './user/pages/OrderDetailPage';
import WishlistPage from './user/pages/WishlistPage';
import ComparePage from './user/pages/ComparePage';
import ShippingPolicyPage from './user/pages/ShippingPolicyPage';
import ChatWidget from './user/components/ChatWidget';
import NotFoundPage from './user/pages/NotFoundPage';
import AuthSuccess from './user/pages/AuthSuccess';
import AdminDashboard from './admin/components/Dashboard';
import ProductManagement from './admin/components/ProductManagement';
import OrderManagement from './admin/components/OrderManagement';
import CategoryManagement from './admin/components/CategoryManagement';
import BannerManagement from './admin/components/BannerManagement';
import UserManagement from './admin/components/UserManagement';
import CouponManagement from './admin/components/CouponManagement';
import Analytics from './admin/components/Analytics';
import ReviewManagement from './admin/components/ReviewManagement';
import Settings from './admin/components/Settings';
import HomePageDesigner from './admin/components/HomePageDesigner';
import PaymentMethodManagement from './admin/components/PaymentMethodManagement';
import TodaysDeals from './admin/components/TodaysDeals';
import TrendingProducts from './admin/components/TrendingProducts';
import AdminSidebar from './admin/components/Sidebar';
import AdminNavbar from './admin/components/AdminNavbar';
import AdminLogin from './admin/components/AdminLogin';
import AdminProtectedRoute from './admin/components/ProtectedRoute';
import ProtectedRoute from './user/components/ProtectedRoute';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <div className="d-flex">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-grow-1" style={{ marginLeft: '0' }}>
        <style>{`
          @media (min-width: 992px) {
            .admin-content { margin-left: 250px !important; }
          }
        `}</style>
        <AdminNavbar onToggleSidebar={() => setMobileOpen(true)} />
        <div className="admin-content p-3 p-md-4" style={{ minHeight: 'calc(100vh - 60px)', background: '#f8f9fa' }}>
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="homepage" element={<HomePageDesigner />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="todays-deals" element={<TodaysDeals />} />
            <Route path="trending" element={<TrendingProducts />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="banners" element={<BannerManagement />} />
            <Route path="coupons" element={<CouponManagement />} />
            <Route path="payment-methods" element={<PaymentMethodManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <RecentlyViewedProvider>
        <WishlistProvider>
          <CartProvider>
          <Router>
            <Routes>
              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>} />
              
              {/* User Routes */}
              <Route path="*" element={
                <div className="app d-flex flex-column min-vh-100">
                  <Navbar />
                  <main className="flex-grow-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/auth/success" element={<AuthSuccess />} />
                      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
                      <Route path="/order/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/compare" element={<ComparePage />} />
                      <Route path="/shipping" element={<ShippingPolicyPage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <ChatWidget />
                  <Footer />
                </div>
              } />
            </Routes>
          </Router>
          </CartProvider>
        </WishlistProvider>
      </RecentlyViewedProvider>
    </AuthProvider>
  );
}

export default App;
