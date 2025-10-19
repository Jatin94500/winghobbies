import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductSlider = ({ products, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="product-slider mb-5">
      <h3 className="fw-bold text-dark mb-4">{title}</h3>
      <div className="position-relative" style={{height: '400px', overflow: 'hidden', borderRadius: '15px'}}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`position-absolute w-100 h-100 transition-all ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transition: 'opacity 0.5s ease-in-out',
              opacity: index === currentSlide ? 1 : 0,
              pointerEvents: index === currentSlide ? 'auto' : 'none'
            }}
          >
            <div className="row h-100 bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
                <div className="text-white">
                  <span className="badge bg-warning text-dark mb-3">{product.badge || 'Featured'}</span>
                  <h2 className="fw-bold mb-3">{product.name}</h2>
                  <p className="mb-3">{product.description}</p>
                  <div className="d-flex align-items-center mb-4">
                    <h3 className="text-warning fw-bold mb-0">₹{product.price.toLocaleString()}</h3>
                    {product.originalPrice && (
                      <>
                        <span className="text-white text-decoration-line-through ms-3">₹{product.originalPrice.toLocaleString()}</span>
                        <span className="badge bg-danger ms-3">{product.discount}% OFF</span>
                      </>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`} className="btn btn-warning btn-lg fw-bold">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="img-fluid rounded shadow-lg"
                  style={{maxHeight: '350px', objectFit: 'cover'}}
                />
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
          <div className="d-flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={`rounded-circle border-0 ${index === currentSlide ? 'bg-warning' : 'bg-white'}`}
                style={{width: '12px', height: '12px', opacity: index === currentSlide ? 1 : 0.5}}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
