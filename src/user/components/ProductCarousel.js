import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCarousel = ({ products, title, autoPlay = true }) => {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / itemsPerView));
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, products.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / itemsPerView));
  const prev = () => setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / itemsPerView)) % Math.ceil(products.length / itemsPerView));

  const visibleProducts = products.slice(currentIndex * itemsPerView, (currentIndex + 1) * itemsPerView);

  return (
    <div className="product-carousel">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-dark">{title}</h3>
        <div>
          <button className="btn btn-outline-warning btn-sm me-2" onClick={prev}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="btn btn-outline-warning btn-sm" onClick={next}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="row g-3">
        {visibleProducts.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-sm-6">
            <div className="card h-100 border-0 shadow-sm product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} className="card-img-top" alt={product.name} style={{height: '180px', objectFit: 'cover'}} />
              </Link>
              {product.badge && (
                <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">{product.badge}</span>
              )}
              <div className="card-body p-3">
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <h6 className="card-title text-dark mb-2" style={{fontSize: '0.9rem', height: '40px', overflow: 'hidden'}}>{product.name}</h6>
                </Link>
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-warning text-dark me-2">{product.rating} ★</span>
                  <small className="text-muted">({product.reviews})</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <span className="fw-bold text-warning fs-6">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-muted text-decoration-line-through ms-2 small">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button 
                  className="btn btn-warning btn-sm w-100 fw-bold"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
