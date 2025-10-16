import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const ComparePage = () => {
  const [selectedProducts, setSelectedProducts] = useState([null, null, null]);

  const handleSelectProduct = (index, productId) => {
    const newSelected = [...selectedProducts];
    newSelected[index] = products.find(p => p.id === parseInt(productId)) || null;
    setSelectedProducts(newSelected);
  };

  const specs = [
    { label: 'Price', key: 'price', format: (val) => `₹${val?.toLocaleString()}` },
    { label: 'Category', key: 'category', format: (val) => val },
    { label: 'Rating', key: 'rating', format: (val) => `${val} ★` },
    { label: 'Reviews', key: 'reviews', format: (val) => val },
    { label: 'Discount', key: 'discount', format: (val) => `${val}%` },
    { label: 'Free Delivery', key: 'freeDelivery', format: (val) => val ? 'Yes' : 'No' }
  ];

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Compare <span className="text-warning">Products</span></h1>
          <p className="text-muted">Select up to 3 products to compare side by side</p>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="bg-dark text-white">
                  <tr>
                    <th style={{width: '200px'}}>Specification</th>
                    {[0, 1, 2].map(index => (
                      <th key={index} className="text-center">
                        <select 
                          className="form-select"
                          value={selectedProducts[index]?.id || ''}
                          onChange={(e) => handleSelectProduct(index, e.target.value)}
                        >
                          <option value="">Select Product {index + 1}</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold bg-light">Product Image</td>
                    {selectedProducts.map((product, index) => (
                      <td key={index} className="text-center">
                        {product ? (
                          <img src={product.image} alt={product.name} style={{height: '150px', objectFit: 'cover'}} className="img-fluid" />
                        ) : (
                          <div className="text-muted py-5">No product selected</div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-bold bg-light">Product Name</td>
                    {selectedProducts.map((product, index) => (
                      <td key={index} className="text-center">
                        {product ? (
                          <Link to={`/product/${product.id}`} className="text-decoration-none fw-semibold">
                            {product.name}
                          </Link>
                        ) : '-'}
                      </td>
                    ))}
                  </tr>
                  {specs.map((spec, specIndex) => (
                    <tr key={specIndex}>
                      <td className="fw-bold bg-light">{spec.label}</td>
                      {selectedProducts.map((product, index) => (
                        <td key={index} className="text-center">
                          {product ? spec.format(product[spec.key]) : '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="fw-bold bg-light">Description</td>
                    {selectedProducts.map((product, index) => (
                      <td key={index}>
                        {product ? product.description : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-bold bg-light">Action</td>
                    {selectedProducts.map((product, index) => (
                      <td key={index} className="text-center">
                        {product && (
                          <Link to={`/product/${product.id}`} className="btn btn-warning fw-bold">
                            View Details
                          </Link>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/products" className="btn btn-outline-dark">
            <i className="fas fa-arrow-left me-2"></i>Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
