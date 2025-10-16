import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3">
              <span className="text-primary">Wing</span> Hobbies
            </h5>
            <p className="text-muted">
              Your trusted destination for premium RC models, drones, and accessories. 
              Quality guaranteed with expert support.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white fs-5"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white fs-5"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white fs-5"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white fs-5"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li><Link to="/category/planes" className="text-muted text-decoration-none">RC Planes</Link></li>
              <li><Link to="/category/drones" className="text-muted text-decoration-none">Drones</Link></li>
              <li><Link to="/category/cars" className="text-muted text-decoration-none">RC Cars</Link></li>
              <li><Link to="/category/controllers" className="text-muted text-decoration-none">Controllers</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><Link to="/faq" className="text-muted text-decoration-none">FAQs</Link></li>
              <li><Link to="/shipping" className="text-muted text-decoration-none">Shipping Policy</Link></li>
              <li><Link to="/compare" className="text-muted text-decoration-none">Compare Products</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3">Newsletter</h6>
            <p className="text-muted">Subscribe for exclusive deals and new arrivals</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); e.target.reset(); }}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              © 2025 Wing Hobbies. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-muted text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;