import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top py-2" style={{zIndex: 1030}}>
      <div className="container-fluid px-3">
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center" style={{fontSize: '1.25rem'}}>
          <img src="/assets/logo1.svg" alt="Wing Hobbies" height="35" className="me-2" />
          <span className="text-warning">Wing</span> Hobbies
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Mobile Search */}
          <form className="d-lg-none my-2" onSubmit={handleSearch}>
            <div className="input-group input-group-sm">
              <input 
                className="form-control" 
                type="search" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-warning" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/" onClick={closeNavbar}>Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle px-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: 'pointer'}}>
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/products" onClick={closeNavbar}>All Products</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/products?category=planes" onClick={closeNavbar}>RC Planes</Link></li>
                <li><Link className="dropdown-item" to="/products?category=drones" onClick={closeNavbar}>Drones</Link></li>
                <li><Link className="dropdown-item" to="/products?category=cars" onClick={closeNavbar}>RC Cars</Link></li>
                <li><Link className="dropdown-item" to="/products?category=helicopters" onClick={closeNavbar}>Helicopters</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/products" onClick={closeNavbar}>Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about" onClick={closeNavbar}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/faq" onClick={closeNavbar}>FAQ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/contact" onClick={closeNavbar}>Contact</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-2">
            <form className="d-none d-lg-flex" onSubmit={handleSearch} style={{minWidth: '250px'}}>
              <div className="input-group input-group-sm">
                <input 
                  className="form-control" 
                  type="search" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-warning" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
            
            <Link to="/cart" className="btn btn-outline-warning btn-sm position-relative" onClick={closeNavbar}>
              <i className="fas fa-shopping-cart"></i>
              <span className="d-none d-md-inline ms-1">Cart</span>
              {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem'}}>
                  {itemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-warning btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={user.avatar} alt={user.name} className="rounded-circle me-1" width="20" height="20" />
                  <span className="d-none d-md-inline">{user.name.split(' ')[0]}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" style={{right: 0, left: 'auto'}}>
                  <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user me-2"></i>My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders"><i className="fas fa-shopping-bag me-2"></i>My Orders</Link></li>
                  <li><Link className="dropdown-item" to="/wishlist"><i className="fas fa-heart me-2"></i>Wishlist</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item text-danger" to="/profile"><i className="fas fa-sign-out-alt me-2"></i>Logout</Link></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-light btn-sm" onClick={closeNavbar}>
                <i className="fas fa-user"></i>
                <span className="d-none d-md-inline ms-1">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;