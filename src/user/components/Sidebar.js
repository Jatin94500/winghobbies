import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Sidebar = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetchFeaturedProducts();
    const interval = setInterval(fetchFeaturedProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productAPI.getAll();
      if (response.data.success) {
        const productsData = response.data.data;
        const productsList = productsData.products || productsData || [];
        const featured = productsList.filter(p => p.featured === true).slice(0, 3);
        setFeaturedProducts(featured);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts([]);
    }
  };
  return (
    <div className="sticky-top" style={{top: '80px', zIndex: 1}}>
      {/* Flash Sale Ad */}
      <div className="card border-0 shadow-sm mb-3 bg-danger text-white">
        <div className="card-body text-center p-4">
          <i className="fas fa-bolt display-4 mb-3"></i>
          <h5 className="fw-bold">Flash Sale</h5>
          <h2 className="fw-bold mb-2">50% OFF</h2>
          <p className="small mb-3">Limited Time Only!</p>
          <Link to="/products" className="btn btn-light btn-sm fw-bold">Shop Now</Link>
        </div>
      </div>

      {/* Today's Deals */}
      {featuredProducts.length > 0 && (
        <div className="card border-0 shadow-sm mb-3">
          <div className="card-header bg-dark text-white">
            <h6 className="mb-0 fw-bold">
              <i className="fas fa-fire text-warning me-2"></i>Today's Deals
            </h6>
          </div>
          <div className="card-body p-2">
            {featuredProducts.map((product) => (
              <div key={product._id} className="position-relative mb-2 border-bottom pb-2" style={{cursor: 'pointer'}}>
                <div className="d-flex align-items-center">
                  <Link to={`/product/${product._id}`}>
                    <img 
                      src={product.images?.[0] || 'https://via.placeholder.com/50'} 
                      alt={product.name} 
                      className="rounded" 
                      style={{width: '60px', height: '60px', objectFit: 'cover'}} 
                    />
                  </Link>
                  <div className="ms-2 flex-grow-1">
                    <Link to={`/product/${product._id}`} className="text-decoration-none">
                      <p className="mb-0 small text-dark fw-semibold" style={{fontSize: '0.8rem', lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                        {product.name}
                      </p>
                    </Link>
                    <div className="d-flex align-items-center mb-1">
                      <span className="badge bg-warning text-dark me-1" style={{fontSize: '0.65rem'}}>
                        {product.rating || 4.5} ★
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-warning fw-bold" style={{fontSize: '0.9rem'}}>₹{product.price?.toLocaleString()}</span>
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-sm btn-warning" 
                          style={{fontSize: '0.7rem', padding: '0.15rem 0.4rem'}}
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          title="Add to Cart"
                        >
                          <i className="fas fa-cart-plus"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          style={{fontSize: '0.7rem', padding: '0.15rem 0.4rem'}}
                          onClick={(e) => {
                            e.preventDefault();
                            addToWishlist(product);
                          }}
                          title="Add to Wishlist"
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free Shipping Banner */}
      <div className="card border-0 shadow-sm mb-3 bg-success text-white">
        <div className="card-body text-center p-3">
          <i className="fas fa-shipping-fast display-5 mb-2"></i>
          <h6 className="fw-bold mb-1">Free Shipping</h6>
          <p className="small mb-0">On orders above ₹500</p>
        </div>
      </div>

      {/* Special Offer */}
      <div className="card border-warning border-2 shadow-sm mb-3">
        <div className="card-body text-center p-3">
          <span className="badge bg-warning text-dark mb-2">SPECIAL OFFER</span>
          <h6 className="fw-bold mb-2">New Customer Discount</h6>
          <p className="small text-muted mb-2">Get 10% off on first order</p>
          <p className="small fw-bold text-warning mb-0">Use: WELCOME10</p>
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
