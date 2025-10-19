import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AlertModal from '../components/AlertModal';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setAlert({ show: true, type: 'success', message: 'Password reset link sent to your email!' });
      setEmail('');
    } catch (error) {
      setAlert({ show: true, type: 'error', message: error.response?.data?.error?.message || 'Failed to send reset link' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-lock fa-3x text-warning mb-3"></i>
                <h2 className="fw-bold">Forgot Password?</h2>
                <p className="text-muted">Enter your email to reset password</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mb-3" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
                <div className="text-center">
                  <Link to="/login" className="text-decoration-none">Back to Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AlertModal show={alert.show} type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
    </div>
  );
};

export default ForgotPassword;
