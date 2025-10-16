import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import products, { categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Toast from '../components/Toast';
import SkeletonCard from '../components/SkeletonCard';

const Products = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = searchParams.get('search');
    const category = searchParams.get('category');
    if (query) setSearch(query);
    if (category) setSelectedCategory(category);
    
    // Simulate loading
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  }, [searchParams]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [toast, setToast] = useState(null);

  // Filter products
  let filtered = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    filtered = [...filtered].sort((a, b) => b.discount - a.discount);
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2">
            <span className="text-warning">All</span> Products
          </h1>
          <p className="text-muted">Discover our complete collection of RC models and accessories</p>
        </div>

        {/* Search & Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-6">
                <div className="input-group">
                  <span className="input-group-text bg-dark text-warning border-0">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <select 
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-lg-3">
                <select 
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>
            </div>
            <div className="row g-3 mt-2">
              <div className="col-12">
                <label className="form-label fw-semibold">Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</label>
                <div className="d-flex gap-3 align-items-center">
                  <input 
                    type="range" 
                    className="form-range flex-grow-1" 
                    min="0" 
                    max="50000" 
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  />
                  <div className="btn-group" role="group">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setPriceRange([0, 5000])}>Under 5K</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setPriceRange([5000, 15000])}>5K-15K</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setPriceRange([15000, 50000])}>Above 15K</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="text-muted mb-0">
            <strong>{filtered.length}</strong> products found
          </p>
          <div className="d-flex gap-2">
            <Link to="/compare" className="btn btn-sm btn-outline-warning">
              <i className="fas fa-balance-scale me-1"></i>Compare Products
            </Link>
            {(search || selectedCategory !== 'all' || priceRange[1] !== 50000) && (
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => { setSearch(''); setSelectedCategory('all'); setPriceRange([0, 50000]); }}
              >
                <i className="fas fa-times me-1"></i>Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="row g-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-search display-1 text-muted mb-3"></i>
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <div className="card border-0 shadow-sm h-100 product-card">
                  {product.badge && (
                    <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 z-1">
                      {product.badge}
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="badge bg-danger position-absolute top-0 end-0 m-2 z-1">
                      {product.discount}% OFF
                    </span>
                  )}
                  <button
                    className="btn btn-sm btn-light position-absolute top-0 start-0 m-2 z-1"
                    onClick={(e) => {
                      e.preventDefault();
                      addToWishlist(product);
                      setToast({ message: 'Added to wishlist!', type: 'success' });
                    }}
                  >
                    <i className={`fas fa-heart ${isInWishlist(product.id) ? 'text-danger' : ''}`}></i>
                  </button>
                  <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <img 
                      src={product.image} 
                      className="card-img-top" 
                      alt={product.name}
                      style={{height: '200px', objectFit: 'cover'}}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column">
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
                    <div className="mb-2">
                      <h5 className="text-warning fw-bold mb-0">₹{product.price.toLocaleString()}</h5>
                      {product.originalPrice && (
                        <small className="text-muted text-decoration-line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </small>
                      )}
                    </div>
                    {product.freeDelivery && (
                      <small className="text-success mb-2">
                        <i className="fas fa-shipping-fast me-1"></i>Free Delivery
                      </small>
                    )}
                    <button 
                      className="btn btn-warning btn-sm fw-bold mt-auto"
                      onClick={() => {
                        addToCart(product);
                        setToast({ message: 'Added to cart!', type: 'success' });
                      }}
                    >
                      <i className="fas fa-cart-plus me-1"></i>Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Products;