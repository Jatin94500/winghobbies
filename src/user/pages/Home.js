import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, categoryAPI, bannerAPI } from '../../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Toast from '../components/Toast';
import Sidebar from '../components/Sidebar';
import Banner from '../components/Banner';
import SkeletonCard from '../components/SkeletonCard';

const Home = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBanners();
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

  const fetchBanners = async () => {
    try {
      const response = await bannerAPI.getAll();
      if (response.data.success) {
        setBanners(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      console.log('Home products response:', response.data);
      if (response.data.success) {
        const productsData = response.data.data;
        const productsList = productsData.products || productsData || [];
        const productsArray = Array.isArray(productsList) ? productsList : [];
        setProducts(productsArray);
        setFeaturedProducts(productsArray.slice(0, 8));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div>
      {/* 1. Banner */}
      {banners.filter(b => b.position === 'hero').length > 0 ? (
        banners.filter(b => b.position === 'hero').slice(0, 1).map(banner => (
          <Banner 
            key={banner._id}
            image={banner.image}
            title={banner.title}
            subtitle={banner.subtitle}
            ctaText={banner.buttonText || 'Shop Now'}
            ctaLink={banner.link || '/products'}
          />
        ))
      ) : (
        <Banner 
          image="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=400&fit=crop"
          title='<span class="text-warning">Wing</span> Hobbies - Premium RC Models'
          subtitle="Discover the world of RC flying with professional grade models"
          ctaText="Shop Now"
          ctaLink="/products"
        />
      )}

      {/* 2. Products with Left Sidebar */}
      <section className="py-5 bg-white">
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
                ) : featuredProducts.length > 0 ? (
                  featuredProducts.map((product) => (
                  <div key={product._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="card h-100 border-0 shadow-sm">
                      <Link to={`/product/${product._id}`} className="text-decoration-none">
                        <img src={product.images?.[0] || 'https://via.placeholder.com/200'} className="card-img-top" alt={product.name} style={{height: '200px', objectFit: 'cover'}} />
                      </Link>
                      <div className="card-body">
                        <Link to={`/product/${product._id}`} className="text-decoration-none">
                          <h6 className="card-title text-dark">{product.name}</h6>
                        </Link>
                        <div className="d-flex align-items-center mb-2">
                          <span className="badge bg-warning text-dark me-2">{product.rating || 4.5} ★</span>
                          <small className="text-muted">({product.reviewCount || 0})</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="fw-bold text-warning fs-5">₹{product.price?.toLocaleString()}</span>
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
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">No products available. Add products from admin panel.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Middle Banners */}
      {banners.filter(b => b.position === 'middle').length > 0 && (
        <section className="py-5 bg-dark text-white">
          <div className="container">
            <h2 className="text-center fw-bold mb-5">
              <span className="text-warning">Special</span> Offers
            </h2>
            <div className="row g-4">
              {banners.filter(b => b.position === 'middle').slice(0, 3).map((banner) => (
                <div key={banner._id} className="col-md-4">
                  <Link to={banner.link || '/products'} className="text-decoration-none">
                    <div className="card bg-dark border-warning">
                      <img src={banner.image} className="card-img-top" alt={banner.title} style={{height: '200px', objectFit: 'cover'}} />
                      <div className="card-img-overlay d-flex flex-column justify-content-end">
                        <div className="bg-dark bg-opacity-75 p-3 rounded border border-warning">
                          <h4 className="text-warning fw-bold">{banner.title}</h4>
                          <h6 className="text-white">{banner.subtitle}</h6>
                          <p className="text-light mb-2">{banner.description}</p>
                          {banner.buttonText && (
                            <span className="btn btn-warning btn-sm fw-bold">{banner.buttonText}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category._id} className="col-lg-4 col-md-4 col-sm-6">
                      <Link to={`/products?category=${category.slug}`} className="text-decoration-none">
                        <div className="card h-100 border-0 shadow-sm">
                          {category.image ? (
                            <img src={category.image} className="card-img-top" alt={category.name} style={{height: '150px', objectFit: 'cover'}} />
                          ) : (
                            <div className="card-img-top d-flex align-items-center justify-content-center bg-light" style={{height: '150px'}}>
                              <i className={`${category.icon || 'fas fa-tag'} fa-3x text-warning`}></i>
                            </div>
                          )}
                          <div className="card-body text-center">
                            <h6 className="card-title text-dark fw-bold">{category.name}</h6>
                            <p className="text-warning fw-semibold">View Products</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">No categories available</p>
                  </div>
                )}
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
                    {products.filter(p => p.trending).slice(0, 3).map((product) => (
                      <div key={product._id} className="position-relative mb-2 border-bottom pb-2">
                        <div className="d-flex align-items-center">
                          <Link to={`/product/${product._id}`}>
                            <img 
                              src={product.images?.[0] || 'https://via.placeholder.com/50'} 
                              alt={product.name} 
                              className="rounded" 
                              style={{width: '60px', height: '60px', objectFit: 'cover'}} 
                            />
                          </Link>
                          <div className="ms-2 flex-grow-1">
                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                              <p className="mb-0 small text-dark fw-semibold" style={{fontSize: '0.8rem', lineHeight: '1.2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                {product.name}
                              </p>
                            </Link>
                            <div className="d-flex align-items-center mb-1">
                              <span className="badge bg-warning text-dark me-1" style={{fontSize: '0.65rem'}}>
                                {product.rating || 4.5} ★
                              </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="text-warning fw-bold" style={{fontSize: '0.9rem'}}>₹{product.price?.toLocaleString()}</span>
                              <div className="d-flex gap-1">
                                <button 
                                  className="btn btn-sm btn-warning" 
                                  style={{fontSize: '0.7rem', padding: '0.15rem 0.4rem'}}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product);
                                    setToast({ message: 'Added to cart!', type: 'success' });
                                  }}
                                  title="Add to Cart"
                                >
                                  <i className="fas fa-cart-plus"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-outline-danger" 
                                  style={{fontSize: '0.7rem', padding: '0.15rem 0.4rem'}}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addToWishlist(product);
                                  }}
                                  title="Add to Wishlist"
                                >
                                  <i className="fas fa-heart"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

      {/* 5. Bottom Banners */}
      {banners.filter(b => b.position === 'bottom').length > 0 && (
        <section className="py-5 bg-warning">
          <div className="container">
            {banners.filter(b => b.position === 'bottom').slice(0, 1).map(banner => (
              <div key={banner._id} className="row align-items-center">
                <div className="col-md-6">
                  <img src={banner.image} className="img-fluid rounded shadow" alt={banner.title} />
                </div>
                <div className="col-md-6 text-dark">
                  <h2 className="display-4 fw-bold">{banner.title}</h2>
                  <h3 className="text-dark">{banner.subtitle}</h3>
                  <p className="lead">{banner.description}</p>
                  <Link to={banner.link || '/products'} className="btn btn-dark btn-lg fw-bold">
                    {banner.buttonText || 'Shop Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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
