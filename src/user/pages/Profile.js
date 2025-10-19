import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../../utils/api';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orders] = useState([
    { id: 'ORD001', date: '2024-01-15', total: 299.99, status: 'Delivered' },
    { id: 'ORD002', date: '2024-01-10', total: 89.99, status: 'Shipped' }
  ]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await authAPI.updateProfile(formData);
      if (response.data.success) {
        updateProfile(response.data.data);
        setMessage('Profile updated successfully!');
      }
    } catch (error) {
      setMessage(error.response?.data?.error?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <img 
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=000&color=ffc107'} 
                  alt="Profile" 
                  className="rounded-circle me-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover', border: '3px solid white' }}
                />
                <div className="text-white">
                  <h3 className="fw-bold mb-1">{user?.name || 'Guest User'}</h3>
                  <p className="mb-0 opacity-75">{user?.email || 'guest@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="list-group list-group-flush">
              <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'profile' ? 'active bg-warning text-dark' : ''}`} onClick={() => setActiveTab('profile')}>
                <i className="fas fa-user me-2"></i>Profile
              </button>
              <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'orders' ? 'active bg-warning text-dark' : ''}`} onClick={() => setActiveTab('orders')}>
                <i className="fas fa-shopping-bag me-2"></i>Orders
              </button>
              <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'addresses' ? 'active bg-warning text-dark' : ''}`} onClick={() => setActiveTab('addresses')}>
                <i className="fas fa-map-marker-alt me-2"></i>Addresses
              </button>
              <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'wishlist' ? 'active bg-warning text-dark' : ''}`} onClick={() => setActiveTab('wishlist')}>
                <i className="fas fa-heart me-2"></i>Wishlist
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {activeTab === 'profile' && (
                <div>
                  <h5 className="fw-bold mb-4">Profile Information</h5>
                  {message && (
                    <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                      {message}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name</label>
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
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email"
                          value={formData.email}
                          disabled
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
                        <label className="form-label">Avatar URL</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="avatar"
                          value={formData.avatar}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-warning mt-3" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h5 className="fw-bold mb-4">Order History</h5>
                  {orders.map(order => (
                    <div key={order.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="fw-bold mb-1">Order #{order.id}</h6>
                            <small className="text-muted">{order.date}</small>
                          </div>
                          <div className="text-end">
                            <p className="fw-bold mb-1">${order.total}</p>
                            <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-info'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h5 className="fw-bold mb-4">Saved Addresses</h5>
                  <button className="btn btn-warning mb-3">
                    <i className="fas fa-plus me-2"></i>Add New Address
                  </button>
                  <div className="card">
                    <div className="card-body">
                      <h6 className="fw-bold">Home</h6>
                      <p className="mb-0">123 Main Street</p>
                      <p className="mb-0">New York, NY 10001</p>
                      <p className="mb-0">United States</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h5 className="fw-bold mb-4">My Wishlist</h5>
                  <p className="text-muted">Your wishlist is empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;