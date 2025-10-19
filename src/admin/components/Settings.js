import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div>
      <h2 className="fw-bold mb-4">Settings</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <i className="fas fa-cog me-2"></i>
              General
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              <i className="fas fa-credit-card me-2"></i>
              Payment
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              <i className="fas fa-shipping-fast me-2"></i>
              Shipping
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'email' ? 'active' : ''}`}
              onClick={() => setActiveTab('email')}
            >
              <i className="fas fa-envelope me-2"></i>
              Email
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'cache' ? 'active' : ''}`}
              onClick={() => setActiveTab('cache')}
            >
              <i className="fas fa-trash me-2"></i>
              Clear Cache
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card shadow-sm">
            <div className="card-body">
              {activeTab === 'general' && (
                <div>
                  <h5 className="fw-bold mb-4">General Settings</h5>
                  <div className="mb-3">
                    <label className="form-label">Store Name</label>
                    <input type="text" className="form-control" defaultValue="Wings Hobbies" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Store Email</label>
                    <input type="email" className="form-control" defaultValue="info@winghobbies.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Store Phone</label>
                    <input type="tel" className="form-control" defaultValue="+1 234 567 8900" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Currency</label>
                    <select className="form-select">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                  <button className="btn btn-warning">Save Changes</button>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h5 className="fw-bold mb-4">Payment Settings</h5>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="paypal" defaultChecked />
                    <label className="form-check-label" htmlFor="paypal">
                      Enable PayPal
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="stripe" defaultChecked />
                    <label className="form-check-label" htmlFor="stripe">
                      Enable Stripe
                    </label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="cod" />
                    <label className="form-check-label" htmlFor="cod">
                      Enable Cash on Delivery
                    </label>
                  </div>
                  <button className="btn btn-warning">Save Changes</button>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h5 className="fw-bold mb-4">Shipping Settings</h5>
                  <div className="mb-3">
                    <label className="form-label">Free Shipping Threshold</label>
                    <input type="number" className="form-control" defaultValue="99" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Standard Shipping Cost</label>
                    <input type="number" className="form-control" defaultValue="10" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Express Shipping Cost</label>
                    <input type="number" className="form-control" defaultValue="25" />
                  </div>
                  <button className="btn btn-warning">Save Changes</button>
                </div>
              )}

              {activeTab === 'email' && (
                <div>
                  <h5 className="fw-bold mb-4">Email Settings</h5>
                  <div className="mb-3">
                    <label className="form-label">SMTP Host</label>
                    <input type="text" className="form-control" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">SMTP Port</label>
                    <input type="number" className="form-control" defaultValue="587" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">SMTP Username</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">SMTP Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <button className="btn btn-warning">Save Changes</button>
                </div>
              )}

              {activeTab === 'cache' && (
                <div>
                  <h5 className="fw-bold mb-4">Clear Cache & Storage</h5>
                  <div className="alert alert-warning">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    This will clear all locally stored data including login sessions, cart items, and preferences.
                  </div>
                  <button 
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm('Are you sure? This will log you out and clear all local data.')) {
                        localStorage.clear();
                        sessionStorage.clear();
                        alert('Cache cleared successfully!');
                        window.location.href = '/admin/login';
                      }
                    }}
                  >
                    <i className="fas fa-trash me-2"></i>
                    Clear All Local Storage
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;