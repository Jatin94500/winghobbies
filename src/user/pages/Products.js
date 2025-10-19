import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI, categoryAPI } from '../../utils/api';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [stockFilter, setStockFilter] = useState('all');
  const [minDiscount, setMinDiscount] = useState(0);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showTrending, setShowTrending] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      if (response.data.success) {
        const productsData = response.data.data;
        const productsList = productsData.products || productsData || [];
        const productsArray = Array.isArray(productsList) ? productsList : [];
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...products];
    const searchQuery = searchParams.get('search');
    const categoryParam = searchParams.get('category');

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryParam && categoryParam !== 'all') {
      filtered = filtered.filter(product => product.category === categoryParam);
      setSelectedCategory(categoryParam);
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (minRating > 0) {
      filtered = filtered.filter(product => (product.rating || 0) >= minRating);
    }

    if (stockFilter === 'instock') {
      filtered = filtered.filter(product => product.inStock && product.stock > 0);
    } else if (stockFilter === 'outofstock') {
      filtered = filtered.filter(product => !product.inStock || product.stock === 0);
    }

    if (minDiscount > 0) {
      filtered = filtered.filter(product => (product.discount || 0) >= minDiscount);
    }

    if (showFeatured) {
      filtered = filtered.filter(product => product.featured === true);
    }

    if (showTrending) {
      filtered = filtered.filter(product => product.trending === true);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchParams, selectedCategory, priceRange, sortBy, minRating, stockFilter, minDiscount, showFeatured, showTrending, products]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 100000]);
    setSortBy('default');
    setMinRating(0);
    setStockFilter('all');
    setMinDiscount(0);
    setShowFeatured(false);
    setShowTrending(false);
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container-fluid">
        <div className="row g-4">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm sticky-top" style={{top: '80px'}}>
              <div className="card-header bg-warning">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-filter me-2"></i>Filters
                </h5>
              </div>
              <div className="card-body" style={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}>
                {/* Category */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Category</h6>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="radio" name="category" id="cat-all" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} />
                    <label className="form-check-label" htmlFor="cat-all">All Products</label>
                  </div>
                  {categories.map((cat) => (
                    <div key={cat._id} className="form-check mb-2">
                      <input className="form-check-input" type="radio" name="category" id={`cat-${cat._id}`} checked={selectedCategory === cat.slug} onChange={() => setSelectedCategory(cat.slug)} />
                      <label className="form-check-label" htmlFor={`cat-${cat._id}`}>{cat.name}</label>
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Price Range</h6>
                  <div className="d-flex gap-2 mb-2">
                    <input type="number" className="form-control form-control-sm" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} />
                    <input type="number" className="form-control form-control-sm" placeholder="Max" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} />
                  </div>
                  <input type="range" className="form-range" min="0" max="100000" step="1000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} />
                  <small className="text-muted">₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</small>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Minimum Rating</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {[0, 1, 2, 3, 4, 5].map(rating => (
                      <button key={rating} className={`btn btn-sm ${minRating === rating ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setMinRating(rating)}>
                        {rating === 0 ? 'All' : `${rating}★`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Availability</h6>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="radio" name="stock" id="stock-all" checked={stockFilter === 'all'} onChange={() => setStockFilter('all')} />
                    <label className="form-check-label" htmlFor="stock-all">All Products</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="radio" name="stock" id="stock-in" checked={stockFilter === 'instock'} onChange={() => setStockFilter('instock')} />
                    <label className="form-check-label" htmlFor="stock-in"><span className="badge bg-success">In Stock</span></label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="radio" name="stock" id="stock-out" checked={stockFilter === 'outofstock'} onChange={() => setStockFilter('outofstock')} />
                    <label className="form-check-label" htmlFor="stock-out"><span className="badge bg-danger">Out of Stock</span></label>
                  </div>
                </div>

                {/* Discount */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Minimum Discount</h6>
                  <select className="form-select" value={minDiscount} onChange={(e) => setMinDiscount(+e.target.value)}>
                    <option value="0">All Discounts</option>
                    <option value="10">10% or more</option>
                    <option value="20">20% or more</option>
                    <option value="30">30% or more</option>
                    <option value="40">40% or more</option>
                    <option value="50">50% or more</option>
                  </select>
                </div>

                {/* Special */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Special</h6>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="featured" checked={showFeatured} onChange={(e) => setShowFeatured(e.target.checked)} />
                    <label className="form-check-label" htmlFor="featured"><i className="fas fa-fire text-warning me-2"></i>Today's Deals</label>
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="trending" checked={showTrending} onChange={(e) => setShowTrending(e.target.checked)} />
                    <label className="form-check-label" htmlFor="trending"><i className="fas fa-chart-line text-danger me-2"></i>Trending</label>
                  </div>
                </div>

                {/* Reset */}
                <button className="btn btn-outline-danger w-100 fw-bold" onClick={clearFilters}>
                  <i className="fas fa-times-circle me-2"></i>Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {/* Header */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <h3 className="fw-bold mb-1">
                      <i className="fas fa-shopping-bag text-warning me-2"></i>
                      {searchParams.get('search') ? 'Search Results' : 'All Products'}
                    </h3>
                    <p className="text-muted mb-0">
                      <i className="fas fa-box me-1"></i>
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-md-end gap-2">
                      <label className="text-muted small mb-0 d-none d-md-block">Sort:</label>
                      <select className="form-select form-select-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{maxWidth: '200px'}}>
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating: High to Low</option>
                        <option value="discount">Discount: High to Low</option>
                        <option value="newest">Newest First</option>
                        <option value="name">Name: A to Z</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <div className="spinner-border text-warning mb-3" style={{width: '3rem', height: '3rem'}}></div>
                  <h5 className="text-muted">Loading products...</h5>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="row g-4">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="col-xl-3 col-lg-4 col-md-6">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <i className="fas fa-box-open display-1 text-muted mb-4"></i>
                  <h3 className="fw-bold mb-3">No Products Found</h3>
                  <p className="text-muted mb-4">Try adjusting your filters</p>
                  <button className="btn btn-warning fw-bold" onClick={clearFilters}>
                    <i className="fas fa-redo me-2"></i>Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
