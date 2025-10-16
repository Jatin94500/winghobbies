import React, { useState } from 'react';
import Toast from '../components/Toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ message: 'Message sent successfully! We will get back to you soon.', type: 'success' });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3">Contact <span className="text-warning">Us</span></h1>
            <p className="text-muted">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Send us a Message</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Name *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email *</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Subject *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Message *</label>
                        <textarea 
                          className="form-control" 
                          rows="5" 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-warning fw-bold px-5">
                          <i className="fas fa-paper-plane me-2"></i>Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">Contact Information</h5>
                  <div className="mb-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-warning text-dark rounded-circle p-3 me-3">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Address</h6>
                        <p className="text-muted mb-0">123 RC Street, Hobby City<br/>Lucknow, Uttar Pradesh 226001</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-warning text-dark rounded-circle p-3 me-3">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Phone</h6>
                        <p className="text-muted mb-0">+91 7985079854<br/>+91 9889816016</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-warning text-dark rounded-circle p-3 me-3">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Email</h6>
                        <p className="text-muted mb-0">support@Winghobbies.com<br/>sales@Winghobbies.com</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="bg-warning text-dark rounded-circle p-3 me-3">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Working Hours</h6>
                        <p className="text-muted mb-0">Mon - Sat: 9:00 AM - 8:00 PM<br/>Sunday: 10:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm bg-dark text-white">
                <div className="card-body p-4 text-center">
                  <h5 className="fw-bold mb-3">Follow Us</h5>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="#" className="btn btn-warning btn-sm rounded-circle" style={{width: '40px', height: '40px'}}>
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="btn btn-warning btn-sm rounded-circle" style={{width: '40px', height: '40px'}}>
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="btn btn-warning btn-sm rounded-circle" style={{width: '40px', height: '40px'}}>
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="btn btn-warning btn-sm rounded-circle" style={{width: '40px', height: '40px'}}>
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body p-0">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.20573097566!2d80.94251274999999!3d26.848692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1760602740230!5m2!1sen!2sin"
                width="100%" 
                height="400" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wing Hobbies Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
