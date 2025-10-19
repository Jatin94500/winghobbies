import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5">Contact Us</h2>
      
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <i className="fas fa-map-marker-alt display-4 text-warning mb-3"></i>
              <h5 className="fw-bold">Visit Us</h5>
              <p className="text-muted">123 RC Street, Hobby City, HC 12345</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <i className="fas fa-phone display-4 text-warning mb-3"></i>
              <h5 className="fw-bold">Call Us</h5>
              <p className="text-muted">+1 (234) 567-8900</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <i className="fas fa-envelope display-4 text-warning mb-3"></i>
              <h5 className="fw-bold">Email Us</h5>
              <p className="text-muted">info@winghobbies.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Send us a Message</h4>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Subject</label>
                    <input type="text" className="form-control" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-warning mt-3 px-5">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;