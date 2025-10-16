import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import Toast from '../components/Toast';
import ProductReviews from '../components/ProductReviews';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-exclamation-triangle display-1 text-warning mb-4"></i>
        <h2 className="fw-bold mb-3">Product Not Found</h2>
        <Link to="/products" className="btn btn-warning fw-bold">Browse Products</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setToast({ message: `${quantity} item(s) added to cart!`, type: 'success' });
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products" className="text-decoration-none">Products</Link></li>
            <li className="breadcrumb-item active">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="row g-4 mb-5">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="position-relative">
                {product.badge && (
                  <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3 z-1">
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 end-0 m-3 z-1">
                    {product.discount}% OFF
                  </span>
                )}
                <img 
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.name}
                  style={{height: '400px', objectFit: 'cover'}}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h1 className="fw-bold mb-3">{product.name}</h1>
                
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success text-white px-2 py-1 rounded me-2">
                    <small>{product.rating} <i className="fas fa-star"></i></small>
                  </div>
                  <span className="text-muted">({product.reviews} reviews)</span>
                </div>

                <div className="mb-4">
                  <h2 className="text-warning fw-bold mb-2">
                    ₹{product.price.toLocaleString()}
                  </h2>
                  {product.originalPrice && (
                    <div>
                      <span className="text-muted text-decoration-line-through me-2">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-success fw-bold">
                        Save ₹{(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {product.freeDelivery && (
                  <div className="alert alert-success mb-4">
                    <i className="fas fa-shipping-fast me-2"></i>
                    <strong>Free Delivery</strong> on this product
                  </div>
                )}

                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Description</h5>
                  <p className="text-muted">{product.description}</p>
                </div>

                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Quantity</h5>
                  <div className="input-group" style={{maxWidth: '150px'}}>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input 
                      type="text" 
                      className="form-control text-center" 
                      value={quantity}
                      readOnly
                    />
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex mb-3">
                  <button 
                    className="btn btn-warning btn-lg fw-bold flex-fill"
                    onClick={handleAddToCart}
                  >
                    <i className="fas fa-cart-plus me-2"></i>Add to Cart
                  </button>
                  <button 
                    className="btn btn-dark btn-lg fw-bold flex-fill"
                    onClick={handleBuyNow}
                  >
                    <i className="fas fa-bolt me-2"></i>Buy Now
                  </button>
                </div>
                <button 
                  className={`btn ${isInWishlist(product.id) ? 'btn-danger' : 'btn-outline-danger'} w-100`}
                  onClick={() => {
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                      setToast({ message: 'Removed from wishlist', type: 'success' });
                    } else {
                      addToWishlist(product);
                      setToast({ message: 'Added to wishlist!', type: 'success' });
                    }
                  }}
                >
                  <i className={`fas fa-heart me-2`}></i>
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0 fw-bold">
              <i className="fas fa-info-circle me-2 text-warning"></i>Product Specifications
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Category:</td>
                      <td className="text-muted text-capitalize">{product.category}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Product ID:</td>
                      <td className="text-muted">WH-{product.id.toString().padStart(4, '0')}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Availability:</td>
                      <td><span className="badge bg-success">In Stock</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Warranty:</td>
                      <td className="text-muted">6 Months</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Return Policy:</td>
                      <td className="text-muted">7 Days Replacement</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Brand:</td>
                      <td className="text-muted">Wing Hobbies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <ProductReviews productId={product.id} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <h3 className="fw-bold mb-4">
              <span className="text-warning">Related</span> Products
            </h3>
            <div className="row g-4">
              {relatedProducts.map((item) => (
                <div key={item.id} className="col-6 col-md-3">
                  <div className="card border-0 shadow-sm h-100">
                    <Link to={`/product/${item.id}`}>
                      <img 
                        src={item.image} 
                        className="card-img-top" 
                        alt={item.name}
                        style={{height: '200px', objectFit: 'cover'}}
                      />
                    </Link>
                    <div className="card-body">
                      <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                        <h6 className="card-title" style={{minHeight: '40px', fontSize: '0.9rem'}}>
                          {item.name}
                        </h6>
                      </Link>
                      <h5 className="text-warning fw-bold">₹{item.price.toLocaleString()}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProductPage;
