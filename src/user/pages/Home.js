import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import categories from '../data/categories';
import { specialOffers, megaSale } from '../data/offers';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import Sidebar from '../components/Sidebar';
import Banner from '../components/Banner';
import SkeletonCard from '../components/SkeletonCard';

const Home = () => {
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const featuredProducts = products.slice(0, 8);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div>
      {/* 1. Banner */}
      <Banner 
        image="https://picsum.photos/1200/400?random=40"
        title='<span class="text-warning">Wing</span> Hobbies - Premium RC Models'
        subtitle="Discover the world of RC flying with professional grade models"
        ctaText="Shop Now"
        ctaLink="/products"
      />

      {/* 2. Products with Left Sidebar */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {/* Left Sidebar - Ads & Offers */}
            <div className="col-lg-3">
              <Sidebar />
            </div>

            {/* Right Content - Products */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-dark">Featured Products</h2>
                <Link to="/products" className="btn btn-outline-warning">View All Products</Link>
              </div>
              <div className="row g-4">
                {loading ? (
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                      <SkeletonCard />
                    </div>
                  ))
                ) : (
                  featuredProducts.map((product) => (
                  <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <Link to={`/product/${product.id}`} className="text-decoration-none">
                        <img src={product.image} className="card-img-top" alt={product.name} style={{height: '200px', objectFit: 'cover'}} />
                      </Link>
                      <div className="card-body">
                        <Link to={`/product/${product.id}`} className="text-decoration-none">
                          <h6 className="card-title text-dark">{product.name}</h6>
                        </Link>
                        <div className="d-flex align-items-center mb-2">
                          <span className="badge bg-warning text-dark me-2">{product.rating} ★</span>
                          <small className="text-muted">({product.reviews})</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="fw-bold text-warning fs-5">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                        <button 
                          className="btn btn-warning w-100 fw-bold"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            setToast({ message: 'Added to cart!', type: 'success' });
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Offers with real pics */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">
            <span className="text-warning">Special</span> Offers
          </h2>
          <div className="row g-4">
            {specialOffers.map((offer) => (
              <div key={offer.id} className="col-md-4">
                <div className="card bg-dark border-warning">
                  <img src={offer.image} className="card-img-top" alt={offer.title} style={{height: '200px', objectFit: 'cover'}} />
                  <div className="card-img-overlay d-flex flex-column justify-content-end">
                    <div className="bg-dark bg-opacity-75 p-3 rounded border border-warning">
                      <h4 className="text-warning fw-bold">{offer.discount}</h4>
                      <h6 className="text-white">{offer.title}</h6>
                      <p className="text-light mb-2">{offer.desc}</p>
                      <button className="btn btn-warning btn-sm fw-bold">Shop Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Shop by categories with real pics */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-dark">
            Shop by <span className="text-warning">Category</span>
          </h2>
          <div className="row g-4">
            {/* Categories Grid */}
            <div className="col-lg-9">
              <div className="row g-4">
                {categories.map((category, index) => (
                  <div key={index} className="col-lg-4 col-md-4 col-sm-6">
                    <Link to={category.link} className="text-decoration-none">
                      <div className="card h-100 border-0 shadow-sm">
                        <img src={category.image} className="card-img-top" alt={category.name} style={{height: '150px', objectFit: 'cover'}} />
                        <div className="card-body text-center">
                          <h6 className="card-title text-dark fw-bold">{category.name}</h6>
                          <p className="text-warning fw-semibold">{category.count} Models</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Ads */}
            <div className="col-lg-3">
              <div className="sticky-top" style={{top: '80px', zIndex: 1}}>
                {/* Trending Products */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-header bg-warning text-dark">
                    <h6 className="mb-0 fw-bold">
                      <i className="fas fa-fire me-2"></i>Trending Now
                    </h6>
                  </div>
                  <div className="card-body p-2">
                    {products.slice(3, 6).map((product) => (
                      <Link key={product.id} to={`/product/${product.id}`} className="text-decoration-none">
                        <div className="d-flex align-items-center p-2 mb-2 border-bottom">
                          <img src={product.image} alt={product.name} className="rounded" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                          <div className="ms-2 flex-grow-1">
                            <p className="mb-0 small text-dark" style={{fontSize: '0.75rem'}}>{product.name.substring(0, 30)}...</p>
                            <span className="text-warning fw-bold small">₹{product.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Clearance Sale */}
                <div className="card border-0 shadow-sm mb-3 bg-primary text-white">
                  <div className="card-body text-center p-4">
                    <i className="fas fa-tags display-4 mb-3"></i>
                    <h5 className="fw-bold">CLEARANCE SALE</h5>
                    <h2 className="fw-bold mb-2">60% OFF</h2>
                    <p className="small mb-3">Last Few Items!</p>
                    <Link to="/products" className="btn btn-light btn-sm fw-bold">Shop Now</Link>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <h6 className="fw-bold mb-2">Newsletter</h6>
                    <p className="small text-muted mb-3">Get latest offers & updates</p>
                    <input type="email" className="form-control form-control-sm mb-2" placeholder="Your email" />
                    <button className="btn btn-warning btn-sm w-100 fw-bold">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Big discount offers */}
      <section className="py-5 bg-warning">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={megaSale.image} className="img-fluid rounded shadow" alt="Big Sale" />
            </div>
            <div className="col-md-6 text-dark">
              <h2 className="display-4 fw-bold">{megaSale.title}</h2>
              <h3 className="text-dark">{megaSale.discount}</h3>
              <p className="lead">{megaSale.description}</p>
              <ul className="list-unstyled">
                {megaSale.features.map((feature, index) => (
                  <li key={index} className="mb-2">✓ {feature}</li>
                ))}
              </ul>
              <Link to={megaSale.link} className="btn btn-dark btn-lg fw-bold">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ad of our website */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">
                Why Choose <span className="text-warning">Wing Hobbies</span>?
              </h2>
              <div className="row g-4">
                <div className="col-md-4">
                  <i className="fas fa-award display-4 text-warning mb-3"></i>
                  <h5>Premium Quality</h5>
                  <p>Only authentic RC models from top brands</p>
                </div>
                <div className="col-md-4">
                  <i className="fas fa-users display-4 text-warning mb-3"></i>
                  <h5>Expert Support</h5>
                  <p>RC enthusiasts helping RC enthusiasts</p>
                </div>
                <div className="col-md-4">
                  <i className="fas fa-rocket display-4 text-warning mb-3"></i>
                  <h5>Fast Delivery</h5>
                  <p>Quick shipping across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
    </>
  );
};

export default Home;
