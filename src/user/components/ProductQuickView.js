import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductQuickView = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  return (
    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={onClose}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Quick View</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="col-md-6">
                <img src={product.image} alt={product.name} className="img-fluid rounded" />
                {product.badge && (
                  <span className="badge bg-warning text-dark mt-2">{product.badge}</span>
                )}
              </div>
              <div className="col-md-6">
                <h4 className="fw-bold mb-3">{product.name}</h4>
                <div className="mb-3">
                  <span className="text-warning me-2">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </span>
                  <small className="text-muted">({product.reviews} reviews)</small>
                </div>
                <div className="mb-3">
                  <h3 className="text-warning fw-bold mb-0">₹{product.price.toLocaleString()}</h3>
                  {product.originalPrice && (
                    <div>
                      <span className="text-muted text-decoration-line-through me-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="badge bg-danger">{product.discount}% OFF</span>
                    </div>
                  )}
                </div>
                <p className="text-muted mb-4">{product.description}</p>
                {product.freeDelivery && (
                  <div className="alert alert-success mb-3">
                    <i className="fas fa-shipping-fast me-2"></i>Free Delivery
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-warning btn-lg fw-bold"
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                  >
                    <i className="fas fa-cart-plus me-2"></i>Add to Cart
                  </button>
                  <button 
                    className={`btn ${isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => addToWishlist(product)}
                  >
                    <i className="fas fa-heart me-2"></i>
                    {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                  <Link to={`/product/${product.id}`} className="btn btn-outline-dark" onClick={onClose}>
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
