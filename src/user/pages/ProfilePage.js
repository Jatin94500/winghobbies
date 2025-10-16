import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    setToast({ message: 'Logged out successfully!', type: 'success' });
    setTimeout(() => navigate('/'), 1500);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setToast({ message: 'Profile updated successfully!', type: 'success' });
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5" style={{minHeight: '80vh'}}>
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <img src={user.avatar} alt={user.name} className="rounded-circle mb-3" width="100" height="100" />
                  <h5 className="fw-bold mb-1">{user.name}</h5>
                  <p className="text-muted small mb-3">{user.email}</p>
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm w-100">
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </button>
                </div>
              </div>

              <div className="card border-0 shadow-sm mt-3">
                <div className="list-group list-group-flush">
                  <Link to="/profile" className="list-group-item list-group-item-action active bg-warning border-0">
                    <i className="fas fa-user me-2"></i>My Profile
                  </Link>
                  <Link to="/orders" className="list-group-item list-group-item-action">
                    <i className="fas fa-shopping-bag me-2"></i>My Orders
                  </Link>
                  <Link to="/wishlist" className="list-group-item list-group-item-action">
                    <i className="fas fa-heart me-2"></i>Wishlist
                  </Link>
                  <Link to="/addresses" className="list-group-item list-group-item-action">
                    <i className="fas fa-map-marker-alt me-2"></i>Addresses
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-9">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-user-circle me-2 text-warning"></i>Profile Information
                  </h5>
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-warning btn-sm">
                      <i className="fas fa-edit me-1"></i>Edit
                    </button>
                  )}
                </div>
                <div className="card-body p-4">
                  {!isEditing ? (
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="text-muted small">Full Name</label>
                        <p className="fw-semibold">{user.name}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Email Address</label>
                        <p className="fw-semibold">{user.email}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Phone Number</label>
                        <p className="fw-semibold">{user.phone}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Member Since</label>
                        <p className="fw-semibold">January 2025</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdate}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Phone Number</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <button type="submit" className="btn btn-warning fw-bold me-2">
                          <i className="fas fa-save me-2"></i>Save Changes
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline-secondary">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="row g-3 mt-3">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm bg-warning">
                    <div className="card-body text-center">
                      <i className="fas fa-shopping-bag display-4 mb-2"></i>
                      <h3 className="fw-bold mb-0">12</h3>
                      <p className="mb-0">Total Orders</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm bg-success text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-heart display-4 mb-2"></i>
                      <h3 className="fw-bold mb-0">8</h3>
                      <p className="mb-0">Wishlist Items</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm bg-primary text-white">
                    <div className="card-body text-center">
                      <i className="fas fa-star display-4 mb-2"></i>
                      <h3 className="fw-bold mb-0">5</h3>
                      <p className="mb-0">Reviews Given</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
