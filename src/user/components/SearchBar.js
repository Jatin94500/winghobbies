import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../../utils/api';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      if (response.data.success) {
        const productsData = response.data.data;
        const productsList = productsData.products || productsData || [];
        setProducts(productsList);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <div className="position-relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="d-flex">
        <div className="input-group">
          <input 
            className="form-control" 
            type="search" 
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
            style={{ width: '300px' }}
          />
          <button className="btn btn-warning" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="position-absolute w-100 bg-white shadow-lg rounded-bottom mt-1" style={{ zIndex: 1050, maxHeight: '400px', overflowY: 'auto' }}>
          {suggestions.map((product) => (
            <div
              key={product._id}
              className="d-flex align-items-center p-3 border-bottom search-suggestion"
              onClick={() => handleSuggestionClick(product._id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={product.images?.[0] || 'https://via.placeholder.com/50'} 
                alt={product.name}
                className="rounded me-3"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-1 text-dark">{product.name}</h6>
                <small className="text-muted">{product.category}</small>
              </div>
              <span className="text-warning fw-bold">₹{product.price?.toLocaleString()}</span>
            </div>
          ))}
          <div className="p-2 text-center">
            <button 
              className="btn btn-sm btn-link text-primary"
              onClick={handleSearch}
            >
              View all results for "{searchQuery}"
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;