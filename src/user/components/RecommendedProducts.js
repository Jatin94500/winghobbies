import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RecommendedProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/recommendations/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  if (!user || products.length === 0) return null;

  return (
    <div className="my-5">
      <h4 className="fw-bold mb-4">Recommended For You</h4>
      <div className="row g-3">
        {products.slice(0, 4).map((product) => (
          <div key={product._id} className="col-6 col-md-3">
            <Link to={`/product/${product._id}`} className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm">
                <img src={product.images?.[0] || product.image} alt={product.name} className="card-img-top" style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h6 className="card-title text-truncate">{product.name}</h6>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold text-dark">₹{product.price?.toLocaleString()}</span>
                  </div>
                  <div className="text-warning small mt-1">
                    <i className="fas fa-star"></i> {product.rating || 4.5}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
