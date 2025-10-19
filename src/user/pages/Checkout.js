import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../../utils/api';
import axios from 'axios';
import AlertModal from '../components/AlertModal';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [formData, setFormData] = useState({
    email: '', name: '', phone: '', address: '', city: '', zip: '', country: '',
    cardNumber: '', cardName: '', expiry: '', cvv: ''
  });
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

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

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('http://localhost:5000/api/coupons/validate', 
        { code: couponCode, cartTotal: getCartTotal() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppliedCoupon(data.data);
      setDiscount(data.data.discount);
      setAlert({ show: true, type: 'success', message: `Coupon applied! You saved ₹${data.data.discount}` });
    } catch (error) {
      setAlert({ show: true, type: 'error', message: error.response?.data?.error?.message || 'Invalid coupon' });
    } finally {
      setApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode('');
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData) => {
    const res = await loadRazorpay();
    if (!res) {
      setAlert({ show: true, type: 'error', message: 'Razorpay SDK failed to load' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('http://localhost:5000/api/razorpay/create-order', 
        { amount: getCartTotal() - discount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: 'rzp_test_dummy',
        amount: data.data.amount,
        currency: 'INR',
        name: 'Wing Hobbies',
        description: 'Order Payment',
        order_id: data.data.id,
        handler: async (response) => {
          try {
            await axios.post('http://localhost:5000/api/razorpay/verify-payment', response, {
              headers: { Authorization: `Bearer ${token}` }
            });
            orderData.payment.status = 'paid';
            const orderResponse = await orderAPI.create(orderData);
            if (orderResponse.data.success) {
              await clearCart();
              window.location.href = '/orders';
            }
          } catch (error) {
            setAlert({ show: true, type: 'error', message: 'Payment verification failed' });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#ffc107' }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Payment failed' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const orderData = {
          items: cartItems.map(item => ({
            product: item.productId || item._id || item.id,
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
            pincode: formData.zip || '000000',
            phone: formData.phone
          },
          payment: {
            method: selectedPayment,
            status: 'pending'
          },
          summary: {
            subtotal: parseFloat(getCartTotal()),
            shipping: 0,
            discount: discount,
            total: parseFloat(getCartTotal()) - discount
          },
          voucherCode: appliedCoupon?.code
        };

        console.log('Order data:', orderData);
        
        if (selectedPayment === 'card' || selectedPayment === 'upi' || selectedPayment === 'netbanking') {
          await handleRazorpayPayment(orderData);
        } else {
          const response = await orderAPI.create(orderData);
          if (response.data.success) {
            await clearCart();
            window.location.href = '/orders';
          }
        }
      } catch (error) {
        console.error('Order error:', error.response?.data);
        setAlert({ show: true, type: 'error', message: error.response?.data?.error?.message || error.response?.data?.error?.errors?.[0]?.msg || 'Failed to place order' });
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
                <div key={item._id || item.id || item.productId} className="d-flex justify-content-between mb-2">
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
              {discount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              
              {/* Coupon Code */}
              <div className="mb-3">
                <label className="form-label small">Have a coupon?</label>
                {appliedCoupon ? (
                  <div className="input-group">
                    <input type="text" className="form-control" value={appliedCoupon.code} disabled />
                    <button className="btn btn-outline-danger" onClick={removeCoupon}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <button className="btn btn-warning" onClick={applyCoupon} disabled={applyingCoupon}>
                      {applyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                )}
              </div>
              
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span className="text-warning">₹{(getCartTotal() - discount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertModal show={alert.show} type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
    </div>
  );
};

export default Checkout;