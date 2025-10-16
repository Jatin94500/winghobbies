import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 product-card">
      <div className="position-relative">
        <img 
          src={product.image || '/api/placeholder/300/200'} 
          className="card-img-top" 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <button 
          className={`btn btn-sm position-absolute top-0 end-0 m-2 ${isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-light'}`}
          onClick={handleWishlistToggle}
        >
          <i className="fas fa-heart"></i>
        </button>
        <span className="badge bg-success position-absolute top-0 start-0 m-2">Premium</span>
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-muted small flex-grow-1">{product.description}</p>
        
        <div className="mb-2">
          <div className="d-flex align-items-center mb-1">
            <span className="badge bg-success me-2">4.5 ★</span>
            <small className="text-muted">(128 reviews)</small>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="h5 text-primary mb-0">${product.price}</span>
            <small className="text-muted text-decoration-line-through ms-2">${(product.price * 1.2).toFixed(2)}</small>
          </div>
          <small className="text-success fw-bold">20% OFF</small>
        </div>
        
        <button 
          className="btn btn-primary w-100"
          onClick={handleAddToCart}
        >
          <i className="fas fa-cart-plus me-1"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;