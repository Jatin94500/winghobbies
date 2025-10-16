import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://i.pravatar.cc/150?img=12', description: 'RC enthusiast with 15+ years experience' },
    { name: 'Priya Sharma', role: 'Operations Head', image: 'https://i.pravatar.cc/150?img=45', description: 'Expert in logistics and customer service' },
    { name: 'Amit Patel', role: 'Technical Lead', image: 'https://i.pravatar.cc/150?img=33', description: 'RC aircraft designer and pilot' },
    { name: 'Sneha Reddy', role: 'Marketing Manager', image: 'https://i.pravatar.cc/150?img=47', description: 'Digital marketing specialist' }
  ];

  return (
    <div className="bg-light py-5">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">About <span className="text-warning">Wing Hobbies</span></h1>
          <p className="lead text-muted">Your trusted partner in RC aviation since 2010</p>
        </div>

        {/* Story Section */}
        <div className="row g-4 mb-5">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-3"><i className="fas fa-book-open text-warning me-2"></i>Our Story</h3>
                <p className="text-muted">
                  Founded in 2010 in Lucknow, Wing Hobbies started as a small hobby shop with a big dream - to make RC aviation accessible to everyone in India. What began with just a handful of models has grown into one of India's leading RC aircraft retailers.
                </p>
                <p className="text-muted">
                  Today, we serve thousands of RC enthusiasts across the country, from beginners taking their first flight to experienced pilots seeking high-performance models. Our passion for RC aviation drives everything we do.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="fw-bold mb-3"><i className="fas fa-bullseye text-warning me-2"></i>Our Mission</h3>
                <p className="text-muted mb-3">
                  To inspire and enable RC aviation enthusiasts by providing:
                </p>
                <ul className="text-muted">
                  <li>High-quality RC aircraft and accessories</li>
                  <li>Expert guidance and technical support</li>
                  <li>Competitive pricing and fast delivery</li>
                  <li>A vibrant community of RC pilots</li>
                  <li>Educational resources and tutorials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body p-5">
            <h3 className="fw-bold text-center mb-4">Our Core Values</h3>
            <div className="row g-4">
              <div className="col-md-3 text-center">
                <div className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-award fs-2"></i>
                </div>
                <h5 className="fw-bold">Quality</h5>
                <p className="text-muted small">Only authentic products from trusted brands</p>
              </div>
              <div className="col-md-3 text-center">
                <div className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-users fs-2"></i>
                </div>
                <h5 className="fw-bold">Community</h5>
                <p className="text-muted small">Building a strong RC aviation community</p>
              </div>
              <div className="col-md-3 text-center">
                <div className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-headset fs-2"></i>
                </div>
                <h5 className="fw-bold">Support</h5>
                <p className="text-muted small">Expert guidance every step of the way</p>
              </div>
              <div className="col-md-3 text-center">
                <div className="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-rocket fs-2"></i>
                </div>
                <h5 className="fw-bold">Innovation</h5>
                <p className="text-muted small">Latest technology and models</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-5">
          <h3 className="fw-bold text-center mb-4">Meet Our Team</h3>
          <div className="row g-4">
            {team.map((member, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm text-center h-100">
                  <div className="card-body p-4">
                    <img src={member.image} alt={member.name} className="rounded-circle mb-3" width="100" height="100" style={{objectFit: 'cover'}} />
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-warning small mb-2">{member.role}</p>
                    <p className="text-muted small">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="card border-0 shadow-sm bg-dark text-white mb-5">
          <div className="card-body p-5">
            <div className="row text-center g-4">
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-warning">14+</h2>
                <p className="mb-0">Years in Business</p>
              </div>
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-warning">10K+</h2>
                <p className="mb-0">Happy Customers</p>
              </div>
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-warning">500+</h2>
                <p className="mb-0">Products</p>
              </div>
              <div className="col-md-3">
                <h2 className="display-4 fw-bold text-warning">98%</h2>
                <p className="mb-0">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="fw-bold mb-3">Ready to Start Your RC Journey?</h3>
          <p className="text-muted mb-4">Join thousands of satisfied customers and experience the thrill of RC aviation</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/products" className="btn btn-warning btn-lg fw-bold">
              <i className="fas fa-shopping-bag me-2"></i>Shop Now
            </Link>
            <Link to="/contact" className="btn btn-outline-dark btn-lg">
              <i className="fas fa-envelope me-2"></i>Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
