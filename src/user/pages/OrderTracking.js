import React, { useState } from 'react';
import axios from 'axios';
import AlertModal from '../components/AlertModal';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  const trackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(data.data);
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Order not found' });
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Track Your Order</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <form onSubmit={trackOrder}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                  <button className="btn btn-warning" type="submit" disabled={loading}>
                    {loading ? 'Tracking...' : 'Track'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {order && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Order #{order.orderId}</h5>
                <div className="mb-4">
                  {statusSteps.map((status, index) => (
                    <div key={status} className="d-flex align-items-center mb-3">
                      <div className={`rounded-circle ${index <= currentStep ? 'bg-success' : 'bg-secondary'}`} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className={`fas ${index <= currentStep ? 'fa-check' : 'fa-circle'} text-white`}></i>
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-0 text-capitalize">{status}</h6>
                        {order.timeline?.find(t => t.status === status) && (
                          <small className="text-muted">
                            {new Date(order.timeline.find(t => t.status === status).date).toLocaleString()}
                          </small>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-top pt-3">
                  <p><strong>Shipping Address:</strong> {order.shipping?.address}, {order.shipping?.city}</p>
                  <p><strong>Total:</strong> ₹{order.summary?.total?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <AlertModal show={alert.show} type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
    </div>
  );
};

export default OrderTracking;
