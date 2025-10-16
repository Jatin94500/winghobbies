import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="mb-4">
              <i className="fas fa-plane-slash display-1 text-warning mb-3" style={{fontSize: '8rem'}}></i>
            </div>
            <h1 className="display-1 fw-bold text-dark mb-3">404</h1>
            <h2 className="fw-bold mb-3">Oops! Page Not Found</h2>
            <p className="text-muted mb-4 lead">
              Looks like this RC plane flew off course! The page you're looking for doesn't exist.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/" className="btn btn-warning btn-lg fw-bold">
                <i className="fas fa-home me-2"></i>Back to Home
              </Link>
              <Link to="/products" className="btn btn-outline-dark btn-lg">
                <i className="fas fa-shopping-bag me-2"></i>Browse Products
              </Link>
            </div>
            <div className="mt-5">
              <p className="text-muted small">
                Need help? <Link to="/contact" className="text-warning">Contact our support team</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
