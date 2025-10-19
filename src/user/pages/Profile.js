import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../../utils/api';
import { generateInvoice } from '../../utils/invoiceGenerator';
import AlertModal from '../components/AlertModal';

const orderStatuses = {
  pending: { label: 'Pending', color: 'warning', icon: 'fa-clock' },
  processing: { label: 'Processing', color: 'info', icon: 'fa-cog' },
  shipped: { label: 'Shipped', color: 'primary', icon: 'fa-shipping-fast' },
  delivered: { label: 'Delivered', color: 'success', icon: 'fa-check-circle' },
  cancelled: { label: 'Cancelled', color: 'danger', icon: 'fa-times-circle' }
};

const Profile = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

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

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

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

  if (authLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000&color=ffc107`} 
                  alt="Profile" 
                  className="rounded-circle me-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover', border: '3px solid white' }}
                />
                <div className="text-white">
                  <h3 className="fw-bold mb-1">{user.name}</h3>
                  <p className="mb-0 opacity-75">{user.email}</p>
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
                  
                  {/* Filter Buttons */}
                  <div className="btn-group w-100 mb-4" role="group">
                    <button 
                      className={`btn ${orderFilter === 'all' ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => setOrderFilter('all')}
                    >
                      All Orders
                    </button>
                    <button 
                      className={`btn ${orderFilter === 'processing' ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => setOrderFilter('processing')}
                    >
                      Processing
                    </button>
                    <button 
                      className={`btn ${orderFilter === 'shipped' ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => setOrderFilter('shipped')}
                    >
                      Shipped
                    </button>
                    <button 
                      className={`btn ${orderFilter === 'delivered' ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => setOrderFilter('delivered')}
                    >
                      Delivered
                    </button>
                  </div>

                  {loadingOrders ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-box-open display-1 text-muted mb-3"></i>
                      <h4 className="text-muted">No orders found</h4>
                      <Link to="/products" className="btn btn-warning mt-3">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    (orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)).map(order => (
                      <div key={order._id} className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                          <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                              <h6 className="fw-bold mb-1">Order #{order.orderId}</h6>
                              <small className="text-muted">
                                <i className="fas fa-calendar me-1"></i>
                                {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </small>
                            </div>
                            <div className="col-md-6 text-md-end">
                              <span className={`badge bg-${orderStatuses[order.status]?.color || 'secondary'} px-3 py-2`}>
                                <i className={`fas ${orderStatuses[order.status]?.icon || 'fa-circle'} me-1`}></i>
                                {orderStatuses[order.status]?.label || order.status}
                              </span>
                            </div>
                          </div>

                          {/* Order Items */}
                          {order.items?.map((item, idx) => (
                            <div key={item._id || `${order._id}-${idx}`} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                              <img 
                                src={item.image || 'https://via.placeholder.com/80'} 
                                alt={item.name} 
                                className="rounded me-3"
                                style={{width: '80px', height: '80px', objectFit: 'cover'}}
                              />
                              <div className="flex-grow-1">
                                <h6 className="mb-1">{item.name}</h6>
                                <p className="text-muted mb-0 small">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-end">
                                <h6 className="text-warning fw-bold mb-0">₹{(item.price * item.quantity).toLocaleString()}</h6>
                              </div>
                            </div>
                          ))}

                          {/* Order Summary */}
                          <div className="row">
                            <div className="col-md-6">
                              <p className="mb-1 small"><strong>Payment:</strong> {order.payment?.method?.toUpperCase()}</p>
                              <p className="mb-1 small"><strong>Shipping:</strong> {order.shipping?.city}</p>
                            </div>
                            <div className="col-md-6 text-md-end">
                              <h5 className="fw-bold text-dark mb-3">
                                Total: <span className="text-warning">₹{order.summary?.total?.toLocaleString()}</span>
                              </h5>
                              <Link 
                                to={`/order/${order.orderId}`} 
                                className="btn btn-outline-warning btn-sm me-2"
                              >
                                <i className="fas fa-eye me-1"></i>View Details
                              </Link>
                              <button 
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => generateInvoice(order, setAlert)}
                              >
                                <i className="fas fa-file-invoice me-1"></i>Invoice
                              </button>
                              {order.status === 'delivered' && (
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-redo me-1"></i>Reorder
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
      
      <AlertModal 
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
};

export default Profile;