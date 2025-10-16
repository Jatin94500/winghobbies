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
import ProductPage from './user/pages/ProductPage';
import CartPage from './user/pages/CartPage';
import CheckoutPage from './user/pages/CheckoutPage';
import LoginPage from './user/pages/LoginPage';
import RegisterPage from './user/pages/RegisterPage';
import ProfilePage from './user/pages/ProfilePage';
import OrdersPage from './user/pages/OrdersPage';
import OrderDetailPage from './user/pages/OrderDetailPage';
import WishlistPage from './user/pages/WishlistPage';
import ContactPage from './user/pages/ContactPage';
import FAQPage from './user/pages/FAQPage';
import ComparePage from './user/pages/ComparePage';
import ShippingPolicyPage from './user/pages/ShippingPolicyPage';
import ChatWidget from './user/components/ChatWidget';
import AboutPage from './user/pages/AboutPage';
import NotFoundPage from './user/pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <RecentlyViewedProvider>
        <WishlistProvider>
          <CartProvider>
          <Router>
          <div className="app d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/order/:id" element={<OrderDetailPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/shipping" element={<ShippingPolicyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <ChatWidget />
            <Footer />
          </div>
          </Router>
          </CartProvider>
        </WishlistProvider>
      </RecentlyViewedProvider>
    </AuthProvider>
  );
}

export default App;
