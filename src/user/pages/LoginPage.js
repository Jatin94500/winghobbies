import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData.email, formData.password);
    if (result.success) {
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5" style={{minHeight: '80vh'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold">Welcome Back!</h2>
                    <p className="text-muted">Login to your Wing Hobbies account</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
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

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="remember" />
                        <label className="form-check-label" htmlFor="remember">
                          Remember me
                        </label>
                      </div>
                      <Link to="/forgot-password" className="text-warning text-decoration-none">
                        Forgot Password?
                      </Link>
                    </div>

                    <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mb-3">
                      <i className="fas fa-sign-in-alt me-2"></i>Login
                    </button>

                    <div className="text-center">
                      <span className="text-muted">Don't have an account? </span>
                      <Link to="/register" className="text-warning fw-bold text-decoration-none">
                        Register Now
                      </Link>
                    </div>
                  </form>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-3">Or login with</p>
                    <div className="d-flex gap-2 justify-content-center">
                      <button className="btn btn-outline-dark flex-fill">
                        <i className="fab fa-google me-2"></i>Google
                      </button>
                      <button className="btn btn-outline-primary flex-fill">
                        <i className="fab fa-facebook me-2"></i>Facebook
                      </button>
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

export default LoginPage;
