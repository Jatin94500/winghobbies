import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match!', type: 'error' });
      return;
    }
    const result = register(formData.name, formData.email, formData.password, formData.phone);
    if (result.success) {
      setToast({ message: 'Registration successful!', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5" style={{minHeight: '80vh'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">Create Account</h2>
                    <p className="text-muted">Join Wing Hobbies today!</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-check mb-4">
                      <input className="form-check-input" type="checkbox" id="terms" required />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <Link to="/terms" className="text-warning">Terms & Conditions</Link>
                      </label>
                    </div>

                    <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mb-3">
                      <i className="fas fa-user-plus me-2"></i>Create Account
                    </button>

                    <div className="text-center">
                      <span className="text-muted">Already have an account? </span>
                      <Link to="/login" className="text-warning fw-bold text-decoration-none">
                        Login Here
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
