import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();



  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product._id}`} className="text-decoration-none">
      <div className="card h-100 shadow-sm border-0 product-card">
        <div className="position-relative">
          <img 
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/300x200'} 
            className="card-img-top" 
            alt={product.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <button 
            className={`btn btn-sm position-absolute top-0 end-0 m-2 ${isInWishlist(product._id) ? 'btn-danger' : 'btn-outline-light'}`}
            onClick={handleWishlistToggle}
          >
            <i className="fas fa-heart"></i>
          </button>
          {product.discount > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-0 m-2 fs-6">
              <i className="fas fa-tag me-1"></i>{product.discount}% OFF
            </span>
          )}
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate text-dark">{product.name}</h5>
          <p className="card-text text-muted small flex-grow-1">{product.description?.substring(0, 60)}...</p>
          
          <div className="mb-2">
            <div className="d-flex align-items-center mb-1">
              <span className="badge bg-warning text-dark me-2">{product.rating || 0} ★</span>
              <small className="text-muted">({product.reviews || 0} reviews)</small>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="h5 text-warning mb-0">₹{product.price?.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <small className="text-muted text-decoration-line-through">₹{product.originalPrice.toLocaleString()}</small>
                  <span className="badge bg-success">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <button 
            className="btn btn-warning w-100"
            onClick={handleAddToCartClick}
          >
            <i className="fas fa-cart-plus me-1"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;