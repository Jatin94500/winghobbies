import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';

const WishlistPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ message: 'Added to cart!', type: 'success' });
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    setToast({ message: 'Removed from wishlist', type: 'success' });
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5" style={{minHeight: '80vh'}}>
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <img src={user.avatar} alt={user.name} className="rounded-circle mb-3" width="100" height="100" />
                  <h5 className="fw-bold mb-1">{user.name}</h5>
                  <p className="text-muted small mb-0">{user.email}</p>
                </div>
              </div>

              <div className="card border-0 shadow-sm mt-3">
                <div className="list-group list-group-flush">
                  <Link to="/profile" className="list-group-item list-group-item-action">
                    <i className="fas fa-user me-2"></i>My Profile
                  </Link>
                  <Link to="/orders" className="list-group-item list-group-item-action">
                    <i className="fas fa-shopping-bag me-2"></i>My Orders
                  </Link>
                  <Link to="/wishlist" className="list-group-item list-group-item-action active bg-warning border-0">
                    <i className="fas fa-heart me-2"></i>Wishlist
                  </Link>
                  <Link to="/addresses" className="list-group-item list-group-item-action">
                    <i className="fas fa-map-marker-alt me-2"></i>Addresses
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-9">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-heart me-2 text-warning"></i>My Wishlist ({wishlistItems.length})
                  </h5>
                </div>
                <div className="card-body p-4">
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-heart-broken display-1 text-muted mb-3"></i>
                      <h4 className="text-muted mb-3">Your wishlist is empty</h4>
                      <p className="text-muted mb-4">Add products you love to your wishlist</p>
                      <Link to="/products" className="btn btn-warning fw-bold">
                        <i className="fas fa-shopping-bag me-2"></i>Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {wishlistItems.map((product) => (
                        <div key={product.id} className="col-md-6 col-lg-4">
                          <div className="card h-100 border-0 shadow-sm position-relative">
                            <button
                              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                              onClick={() => handleRemove(product.id)}
                              style={{zIndex: 10}}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                            <Link to={`/product/${product.id}`}>
                              <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.name}
                                style={{height: '200px', objectFit: 'cover'}}
                              />
                            </Link>
                            <div className="card-body">
                              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                                <h6 className="card-title mb-2" style={{minHeight: '40px', fontSize: '0.9rem'}}>
                                  {product.name}
                                </h6>
                              </Link>
                              <div className="mb-2">
                                <span className="text-warning me-1">
                                  {'★'.repeat(Math.floor(product.rating))}
                                  {'☆'.repeat(5 - Math.floor(product.rating))}
                                </span>
                                <small className="text-muted">({product.reviews})</small>
                              </div>
                              <div className="mb-3">
                                <h5 className="text-warning fw-bold mb-0">₹{product.price.toLocaleString()}</h5>
                                {product.originalPrice && (
                                  <small className="text-muted text-decoration-line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </small>
                                )}
                              </div>
                              <button
                                className="btn btn-warning w-100 fw-bold"
                                onClick={() => handleAddToCart(product)}
                              >
                                <i className="fas fa-cart-plus me-2"></i>Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {wishlistItems.length > 0 && (
                <div className="card border-0 shadow-sm mt-4">
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h6 className="fw-bold mb-2">Share Your Wishlist</h6>
                        <p className="text-muted small mb-0">Share your wishlist with friends and family</p>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <button className="btn btn-outline-warning me-2">
                          <i className="fas fa-share-alt me-1"></i>Share
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => {
                          if (window.confirm('Clear all items from wishlist?')) {
                            wishlistItems.forEach(item => removeFromWishlist(item.id));
                            setToast({ message: 'Wishlist cleared', type: 'success' });
                          }
                        }}>
                          <i className="fas fa-trash me-1"></i>Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
