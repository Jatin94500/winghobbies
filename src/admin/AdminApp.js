import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import CategoryManagement from './components/CategoryManagement';
import BannerManagement from './components/BannerManagement';
import UserManagement from './components/UserManagement';
import PaymentMethodManagement from './components/PaymentMethodManagement';

const AdminApp = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
          <AdminNavbar />
          <div className="p-4" style={{ minHeight: 'calc(100vh - 60px)', background: '#f8f9fa' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/categories" element={<CategoryManagement />} />
              <Route path="/admin/banners" element={<BannerManagement />} />
              <Route path="/admin/payment-methods" element={<PaymentMethodManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AdminApp;