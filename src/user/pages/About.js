import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">About <span className="text-warning">Wings Hobbies</span></h1>
        <p className="lead text-muted">Your trusted partner in RC aviation and hobbies</p>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <img src="/api/placeholder/600/400" alt="About Us" className="img-fluid rounded shadow" />
        </div>
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">Our Story</h2>
          <p className="text-muted">
            Founded in 2010, Wings Hobbies has been serving RC enthusiasts with premium quality products and exceptional service. 
            We started as a small hobby shop and have grown into one of the leading online retailers for RC aircraft, drones, and accessories.
          </p>
          <p className="text-muted">
            Our passion for RC aviation drives us to source only the best products from trusted manufacturers worldwide. 
            We believe in quality, innovation, and customer satisfaction.
          </p>
        </div>
      </div>

      <div className="row text-center mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4">
            <i className="fas fa-award display-3 text-warning mb-3"></i>
            <h4 className="fw-bold">10+ Years</h4>
            <p className="text-muted">Industry Experience</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4">
            <i className="fas fa-users display-3 text-warning mb-3"></i>
            <h4 className="fw-bold">50,000+</h4>
            <p className="text-muted">Happy Customers</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4">
            <i className="fas fa-box display-3 text-warning mb-3"></i>
            <h4 className="fw-bold">5,000+</h4>
            <p className="text-muted">Products Available</p>
          </div>
        </div>
      </div>

      <div className="bg-light rounded p-5 text-center">
        <h3 className="fw-bold mb-3">Our Mission</h3>
        <p className="lead text-muted mb-0">
          To provide RC enthusiasts with the highest quality products, expert guidance, and exceptional customer service, 
          making the hobby accessible and enjoyable for everyone.
        </p>
      </div>
    </div>
  );
};

export default About;