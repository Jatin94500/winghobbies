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
      console.log('Products response:', response.data);
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

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryParam && categoryParam !== 'all') {
      filtered = filtered.filter(product => product.category === categoryParam);
      setSelectedCategory(categoryParam);
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchParams, selectedCategory, priceRange, sortBy]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-warning">
              <h5 className="mb-0 fw-bold">
                <i className="fas fa-filter me-2"></i>Filters
              </h5>
            </div>
            <div className="card-body">
              {/* Category Filter */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Category</h6>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    id="cat-all"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                  />
                  <label className="form-check-label" htmlFor="cat-all">
                    All Products
                  </label>
                </div>
                {categories.map((cat) => (
                  <div key={cat._id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      id={`cat-${cat._id}`}
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                    />
                    <label className="form-check-label" htmlFor={`cat-${cat._id}`}>
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3">Price Range</h6>
                <div className="d-flex gap-2 mb-2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  />
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  />
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                />
                <small className="text-muted">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </small>
              </div>

              {/* Reset Filters */}
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 100000]);
                  setSortBy('default');
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-lg-9">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">
              {searchParams.get('search') 
                ? `Search results for "${searchParams.get('search')}"` 
                : 'All Products'}
              <span className="text-muted ms-2">({filteredProducts.length})</span>
            </h4>
            <select
              className="form-select w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Products */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="row g-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-search display-1 text-muted mb-3"></i>
              <h4 className="text-muted">No products found</h4>
              <p className="text-muted">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;