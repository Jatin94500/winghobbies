import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section bg-dark text-white py-5" style={{ minHeight: '600px' }}>
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-lg-6">
            <h1 className="display-2 fw-bold mb-4">
              Premium <span className="text-warning">RC Models</span>
            </h1>
            <p className="lead mb-4 fs-4">
              Discover the world's finest remote control aircraft, drones, and vehicles. 
              Professional grade quality for enthusiasts and professionals.
            </p>
            <div className="d-flex gap-3 mb-4">
              <Link to="/products" className="btn btn-warning btn-lg px-4 py-3">
                <i className="fas fa-shopping-cart me-2"></i>
                Shop Now
              </Link>
              <Link to="/categories" className="btn btn-outline-light btn-lg px-4 py-3">
                <i className="fas fa-list me-2"></i>
                Browse Categories
              </Link>
            </div>
            <div className="row text-center mt-5">
              <div className="col-4">
                <h3 className="text-warning">500+</h3>
                <p className="mb-0">Premium Models</p>
              </div>
              <div className="col-4">
                <h3 className="text-warning">50K+</h3>
                <p className="mb-0">Happy Customers</p>
              </div>
              <div className="col-4">
                <h3 className="text-warning">24/7</h3>
                <p className="mb-0">Expert Support</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <div className="position-relative">
              <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '400px', height: '400px', opacity: '0.1' }}>
              </div>
              <div className="position-absolute top-50 start-50 translate-middle">
                <i className="fas fa-plane display-1 text-warning" style={{ fontSize: '8rem' }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;