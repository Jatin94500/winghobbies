import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-2 me-4 d-flex align-items-center">
          <img src="/assets/logo1.svg" alt="Wing Hobbies" height="40" className="me-2" />
          <span className="text-warning">Wing</span> Hobbies
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fw-semibold" href="#" role="button" data-bs-toggle="dropdown">
                Airplanes
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/airplanes/electric">Electric</Link></li>
                <li><Link className="dropdown-item" to="/category/airplanes/nitro-gas">Nitro / Gas</Link></li>
                <li><Link className="dropdown-item" to="/category/airplanes/turbine">Turbine</Link></li>
                <li><Link className="dropdown-item" to="/category/airplanes/accessories">Accessories</Link></li>
                <li><Link className="dropdown-item" to="/category/airplanes/propellers">Propellers</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/category/helicopters">Heli/Drones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/category/cars-bikes">Cars/Bikes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/category/boats">Boats</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle fw-semibold" href="#" role="button" data-bs-toggle="dropdown">
                More
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/category/engines">Engines</Link></li>
                <li><Link className="dropdown-item" to="/category/motors-escs">Motors/ESCs/Acc.</Link></li>
                <li><Link className="dropdown-item" to="/category/batteries-chargers">Batteries/Chargers</Link></li>
                <li><Link className="dropdown-item" to="/category/radios-servos">Radios/Servos</Link></li>
                <li><Link className="dropdown-item" to="/category/accessories-materials">Accessories/Materials</Link></li>
                <li><Link className="dropdown-item" to="/category/connectors-wires">Connectors & Wires</Link></li>
                <li><Link className="dropdown-item" to="/category/propellers">Propellers</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/specials">⭐ Specials</Link></li>
                <li><Link className="dropdown-item" to="/new-products">🆕 New Products</Link></li>
                <li><Link className="dropdown-item" to="/featured">🏆 Featured</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/products">All Products</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <div className="me-3 d-none d-lg-block">
              <SearchBar />
            </div>
            
            <Link to="/cart" className="btn btn-outline-warning position-relative me-2">
              <i className="fas fa-shopping-cart"></i>
              <span className="d-none d-md-inline ms-1">Cart</span>
              {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  <img src={user.avatar || 'https://ui-avatars.com/api/?name=User&background=ffc107&color=000'} alt="User" className="rounded-circle me-1" style={{ width: '24px', height: '24px' }} />
                  <span className="d-none d-md-inline">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile"><i className="fas fa-user me-2"></i>Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders"><i className="fas fa-shopping-bag me-2"></i>Orders</Link></li>
                  <li><Link className="dropdown-item" to="/wishlist"><i className="fas fa-heart me-2"></i>Wishlist</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-light">
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