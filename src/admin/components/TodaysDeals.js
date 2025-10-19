import React, { useState, useEffect } from 'react';
import { productAPI } from '../../utils/api';

const TodaysDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (productId, currentStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login as admin first');
      return;
    }

    try {
      await productAPI.update(productId, { featured: !currentStatus });
      alert(currentStatus ? 'Removed from Today\'s Deals!' : 'Added to Today\'s Deals!');
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.error?.message || 'Failed to update product');
    }
  };

  const featuredProducts = products.filter(p => p.featured);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="fw-bold">
            <i className="fas fa-fire text-warning me-2"></i>Today's Deals Management
          </h2>
          <p className="text-muted">Manage featured products that appear in the sidebar "Today's Deals" section</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-fire fa-3x text-warning mb-3"></i>
              <h3 className="fw-bold">{featuredProducts.length}</h3>
              <p className="text-muted mb-0">Featured Products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">All Products</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th className="text-center">Featured Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img 
                        src={product.images?.[0] || product.image} 
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="rounded"
                      />
                    </td>
                    <td>
                      <div className="fw-bold">{product.name}</div>
                    </td>
                    <td>₹{product.price?.toLocaleString()}</td>
                    <td>
                      <span className="badge bg-secondary">{product.category}</span>
                    </td>
                    <td>
                      <span className={`badge ${product.inStock ? 'bg-success' : 'bg-danger'}`}>
                        {product.inStock ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="text-center">
                      {product.featured ? (
                        <span className="badge bg-warning text-dark">
                          <i className="fas fa-fire me-1"></i>Featured
                        </span>
                      ) : (
                        <span className="badge bg-light text-dark">Not Featured</span>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className={`btn btn-sm ${product.featured ? 'btn-outline-danger' : 'btn-warning'}`}
                        onClick={() => toggleFeatured(product._id, product.featured)}
                      >
                        {product.featured ? (
                          <>
                            <i className="fas fa-times me-1"></i>Remove
                          </>
                        ) : (
                          <>
                            <i className="fas fa-plus me-1"></i>Add to Deals
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysDeals;
