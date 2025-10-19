import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../../utils/api';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [formData, setFormData] = useState({
    email: '', name: '', phone: '', address: '', city: '', zip: '', country: '',
    cardNumber: '', cardName: '', expiry: '', cvv: ''
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payment-methods');
      setPaymentMethods(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedPayment(response.data.data[0].type);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const orderData = {
          items: cartItems.map(item => ({
            product: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          shipping: {
            name: formData.name,
            address: formData.address,
            city: formData.city,
            state: formData.country,
            pincode: formData.zip,
            phone: formData.phone
          },
          payment: {
            method: selectedPayment,
            status: 'pending'
          },
          summary: {
            subtotal: parseFloat(getCartTotal()),
            shipping: 0,
            discount: 0,
            total: parseFloat(getCartTotal())
          }
        };

        const response = await orderAPI.create(orderData);
        if (response.data.success) {
          alert(`Order placed successfully! Order ID: ${response.data.data.orderId}`);
          navigate('/orders');
        }
      } catch (error) {
        alert(error.response?.data?.error?.message || 'Failed to place order');
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Checkout</h2>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex mb-4">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex-grow-1 text-center">
                    <div className={`badge ${step >= s ? 'bg-warning' : 'bg-secondary'} rounded-circle p-3 mb-2`}>
                      {s}
                    </div>
                    <p className="small mb-0">{s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <h5 className="fw-bold mb-3">Shipping Information</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">ZIP Code</label>
                        <input type="text" className="form-control" name="zip" value={formData.zip} onChange={handleChange} required />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Country</label>
                        <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h5 className="fw-bold mb-3">Select Payment Method</h5>
                    <div className="row g-3 mb-4">
                      {paymentMethods.map((method) => (
                        <div key={method._id} className="col-md-6">
                          <div 
                            className={`card cursor-pointer ${selectedPayment === method.type ? 'border-warning border-3' : ''}`}
                            onClick={() => setSelectedPayment(method.type)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="card-body text-center">
                              <i className={`${method.icon} fs-2 mb-2`}></i>
                              <h6 className="mb-0">{method.name}</h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedPayment === 'card' && (
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label">Card Number</label>
                          <input type="text" className="form-control" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleChange} />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Cardholder Name</label>
                          <input type="text" className="form-control" name="cardName" value={formData.cardName} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Expiry Date</label>
                          <input type="text" className="form-control" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">CVV</label>
                          <input type="text" className="form-control" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} />
                        </div>
                      </div>
                    )}

                    {selectedPayment === 'upi' && (
                      <div>
                        <label className="form-label">UPI ID</label>
                        <input type="text" className="form-control" placeholder="yourname@upi" />
                      </div>
                    )}

                    {selectedPayment === 'netbanking' && (
                      <div>
                        <label className="form-label">Select Bank</label>
                        <select className="form-select">
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>SBI</option>
                          <option>Axis Bank</option>
                        </select>
                      </div>
                    )}

                    {selectedPayment === 'wallet' && (
                      <div>
                        <label className="form-label">Select Wallet</label>
                        <select className="form-select">
                          <option>Paytm</option>
                          <option>PhonePe</option>
                          <option>Google Pay</option>
                          <option>Amazon Pay</option>
                        </select>
                      </div>
                    )}

                    {selectedPayment === 'cod' && (
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        Pay cash when your order is delivered to your doorstep.
                      </div>
                    )}

                    {selectedPayment === 'emi' && (
                      <div>
                        <label className="form-label">Select EMI Plan</label>
                        <select className="form-select">
                          <option>3 Months - No Cost EMI</option>
                          <option>6 Months - ₹{Math.floor(getCartTotal() / 6)}/month</option>
                          <option>9 Months - ₹{Math.floor(getCartTotal() / 9)}/month</option>
                          <option>12 Months - ₹{Math.floor(getCartTotal() / 12)}/month</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h5 className="fw-bold mb-3">Review Order</h5>
                    <div className="mb-3">
                      <h6>Shipping To:</h6>
                      <p className="mb-0">{formData.name}</p>
                      <p className="mb-0">{formData.address}, {formData.city}</p>
                      <p className="mb-0">{formData.zip}, {formData.country}</p>
                    </div>
                    <div>
                      <h6>Payment Method:</h6>
                      <p className="mb-0 text-capitalize">{selectedPayment}</p>
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2 mt-4">
                  {step > 1 && (
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                      Back
                    </button>
                  )}
                  <button type="submit" className="btn btn-warning flex-grow-1">
                    {step === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-warning">
              <h5 className="mb-0 fw-bold">Order Summary</h5>
            </div>
            <div className="card-body">
              {cartItems.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span className="text-warning">₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;