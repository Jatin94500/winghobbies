import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  const scrollbarStyle = {
    overflowY: 'auto',
    height: 'calc(100vh - 80px)',
    scrollbarWidth: 'thin',
    scrollbarColor: '#ffc107 #343a40'
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/admin/homepage', icon: 'fas fa-home', label: 'Home Page Designer' },
    { path: '/admin/products', icon: 'fas fa-box', label: 'Products' },
    { path: '/admin/todays-deals', icon: 'fas fa-fire', label: "Today's Deals" },
    { path: '/admin/trending', icon: 'fas fa-chart-line', label: 'Trending Products' },
    { path: '/admin/orders', icon: 'fas fa-shopping-cart', label: 'Orders' },
    { path: '/admin/categories', icon: 'fas fa-tags', label: 'Categories' },
    { path: '/admin/banners', icon: 'fas fa-image', label: 'Banners' },
    { path: '/admin/coupons', icon: 'fas fa-ticket-alt', label: 'Coupons' },
    { path: '/admin/payment-methods', icon: 'fas fa-credit-card', label: 'Payment Methods' },
    { path: '/admin/reviews', icon: 'fas fa-star', label: 'Reviews' },
    { path: '/admin/analytics', icon: 'fas fa-chart-line', label: 'Analytics' },
    { path: '/admin/users', icon: 'fas fa-users', label: 'Users' },
    { path: '/admin/settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-dark text-white position-fixed d-none d-lg-block" style={{ width: '250px', height: '100vh', zIndex: 1000 }}>
        <div className="p-4 border-bottom border-secondary">
          <h4 className="mb-0">
            <span className="text-warning">Wing</span> Admin
          </h4>
        </div>
        <nav className="p-3" style={scrollbarStyle}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`d-block text-decoration-none text-white p-3 rounded mb-2 ${
                location.pathname === item.path ? 'bg-warning text-dark' : ''
              }`}
              style={{ transition: 'all 0.3s' }}
            >
              <i className={`${item.icon} me-2`}></i>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`bg-dark text-white position-fixed d-lg-none ${mobileOpen ? '' : 'd-none'}`} style={{ width: '250px', height: '100vh', zIndex: 1050, top: 0, left: 0 }}>
        <div className="p-4 border-bottom border-secondary d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <span className="text-warning">Wing</span> Admin
          </h4>
          <button className="btn btn-sm btn-outline-light" onClick={() => setMobileOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="p-3" style={scrollbarStyle}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`d-block text-decoration-none text-white p-3 rounded mb-2 ${
                location.pathname === item.path ? 'bg-warning text-dark' : ''
              }`}
              style={{ transition: 'all 0.3s' }}
            >
              <i className={`${item.icon} me-2`}></i>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="position-fixed d-lg-none" 
          style={{ top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

    </>
  );
};

export default Sidebar;
