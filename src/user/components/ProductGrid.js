import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title, viewAllLink }) => {
  return (
    <section className="product-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className="view-all-btn">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </a>
        )}
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
