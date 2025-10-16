import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ message: 'Order placed successfully!', type: 'success' });
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-shopping-cart display-1 text-warning mb-4"></i>
        <h2 className="fw-bold mb-3">Your Cart is Empty</h2>
        <Link to="/" className="btn btn-warning btn-lg fw-bold">Continue Shopping</Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-light py-5">
      <div className="container">
        <h1 className="fw-bold mb-4">
          <span className="text-warning">Secure</span> Checkout
        </h1>

        <div className="row g-4">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Personal Info */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-user me-2 text-warning"></i>Personal Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Full Name *</label>
                      <input 
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Phone *</label>
                      <input 
                        type="tel"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Email *</label>
                      <input 
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-map-marker-alt me-2 text-warning"></i>Shipping Address
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Address *</label>
                      <textarea 
                        name="address"
                        className="form-control"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">City *</label>
                      <input 
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">State *</label>
                      <input 
                        type="text"
                        name="state"
                        className="form-control"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Pincode *</label>
                      <input 
                        type="text"
                        name="pincode"
                        className="form-control"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-dark text-white">
                  <h5 className="mb-0 fw-bold">
                    <i className="fas fa-credit-card me-2 text-warning"></i>Payment Method
                  </h5>
                </div>
                <div className="card-body">
                  <div className="form-check mb-3">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="paymentMethod" 
                      id="cod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="cod">
                      <i className="fas fa-money-bill-wave text-success me-2"></i>Cash on Delivery
                    </label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="paymentMethod" 
                      id="online"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-semibold" htmlFor="online">
                      <i className="fas fa-credit-card text-primary me-2"></i>Online Payment
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-warning btn-lg fw-bold w-100 py-3">
                <i className="fas fa-check-circle me-2"></i>Place Order - ₹{total.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card border-warning border-2 shadow-sm sticky-top" style={{top: '100px'}}>
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-shopping-bag me-2 text-warning"></i>Order Summary
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3" style={{maxHeight: '300px', overflowY: 'auto'}}>
                  {cartItems.map((item) => (
                    <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="rounded me-3"
                        style={{width: '60px', height: '60px', objectFit: 'cover'}}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1 small">{item.name}</h6>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span className="fw-bold text-warning">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    <span className="fw-bold">₹{shipping}</span>
                  )}
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="fw-bold">Total</h5>
                  <h5 className="fw-bold text-warning">₹{total.toLocaleString()}</h5>
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

export default CheckoutPage;
