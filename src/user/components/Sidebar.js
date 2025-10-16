import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import { sidebarOffers } from '../data/offers';

const Sidebar = () => {
  return (
    <div className="sticky-top" style={{top: '80px', zIndex: 1}}>
      {/* Flash Sale Ad */}
      <div className="card border-0 shadow-sm mb-3 bg-danger text-white">
        <div className="card-body text-center p-4">
          <i className="fas fa-bolt display-4 mb-3"></i>
          <h5 className="fw-bold">{sidebarOffers.flashSale.title}</h5>
          <h2 className="fw-bold mb-2">{sidebarOffers.flashSale.discount}</h2>
          <p className="small mb-3">{sidebarOffers.flashSale.subtitle}</p>
          <Link to={sidebarOffers.flashSale.link} className="btn btn-light btn-sm fw-bold">Shop Now</Link>
        </div>
      </div>

      {/* Today's Deals */}
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-header bg-dark text-white">
          <h6 className="mb-0 fw-bold">
            <i className="fas fa-fire text-warning me-2"></i>Today's Deals
          </h6>
        </div>
        <div className="card-body p-2">
          {products.slice(0, 3).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="text-decoration-none">
              <div className="d-flex align-items-center p-2 mb-2 border-bottom">
                <img src={product.image} alt={product.name} className="rounded" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                <div className="ms-2 flex-grow-1">
                  <p className="mb-0 small text-dark" style={{fontSize: '0.75rem'}}>{product.name.substring(0, 30)}...</p>
                  <span className="text-warning fw-bold small">₹{product.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Free Shipping Banner */}
      <div className="card border-0 shadow-sm mb-3 bg-success text-white">
        <div className="card-body text-center p-3">
          <i className="fas fa-shipping-fast display-5 mb-2"></i>
          <h6 className="fw-bold mb-1">{sidebarOffers.freeShipping.title}</h6>
          <p className="small mb-0">{sidebarOffers.freeShipping.subtitle}</p>
        </div>
      </div>

      {/* Special Offer */}
      <div className="card border-warning border-2 shadow-sm mb-3">
        <div className="card-body text-center p-3">
          <span className="badge bg-warning text-dark mb-2">SPECIAL OFFER</span>
          <h6 className="fw-bold mb-2">{sidebarOffers.newCustomer.title}</h6>
          <p className="small text-muted mb-2">{sidebarOffers.newCustomer.subtitle}</p>
          <p className="small fw-bold text-warning mb-0">Use: {sidebarOffers.newCustomer.code}</p>
        </div>
      </div>

      {/* Categories Quick Links */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-dark text-white">
          <h6 className="mb-0 fw-bold">
            <i className="fas fa-list text-warning me-2"></i>Categories
          </h6>
        </div>
        <div className="card-body p-2">
          <Link to="/products" className="d-block p-2 text-decoration-none text-dark border-bottom">
            <i className="fas fa-plane text-warning me-2"></i>RC Planes
          </Link>
          <Link to="/products" className="d-block p-2 text-decoration-none text-dark border-bottom">
            <i className="fas fa-helicopter text-warning me-2"></i>Drones
          </Link>
          <Link to="/products" className="d-block p-2 text-decoration-none text-dark border-bottom">
            <i className="fas fa-car text-warning me-2"></i>RC Cars
          </Link>
          <Link to="/products" className="d-block p-2 text-decoration-none text-dark">
            <i className="fas fa-cog text-warning me-2"></i>Parts & Accessories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
