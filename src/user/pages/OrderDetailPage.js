import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../../utils/api';
import { generateInvoice, previewInvoice } from '../../utils/invoiceGenerator';
import AlertModal from '../components/AlertModal';

const orderStatuses = {
  pending: { label: 'Pending', color: 'warning', icon: 'fa-clock' },
  processing: { label: 'Processing', color: 'info', icon: 'fa-cog' },
  shipped: { label: 'Shipped', color: 'primary', icon: 'fa-shipping-fast' },
  delivered: { label: 'Delivered', color: 'success', icon: 'fa-check-circle' },
  cancelled: { label: 'Cancelled', color: 'danger', icon: 'fa-times-circle' }
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrder();
  }, [id, user, navigate]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getOne(id);
      if (response.data.success) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    setCancelling(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/${order.orderId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setAlert({ show: true, type: 'success', title: 'Success!', message: 'Order cancelled successfully' });
        fetchOrder();
        setShowCancelModal(false);
      } else {
        setAlert({ show: true, type: 'error', title: 'Error', message: data.error?.message || 'Failed to cancel order' });
      }
    } catch (error) {
      setAlert({ show: true, type: 'error', title: 'Error', message: 'Error cancelling order' });
    } finally {
      setCancelling(false);
    }
  };

  const canCancel = order && ['pending', 'processing'].includes(order.status);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-exclamation-triangle display-1 text-warning mb-4"></i>
        <h2 className="fw-bold mb-3">Order Not Found</h2>
        <Link to="/orders" className="btn btn-warning fw-bold">Back to Orders</Link>
      </div>
    );
  }

  const statusInfo = orderStatuses[order.status];

  return (
    <>
    <div className="bg-light py-5" style={{minHeight: '80vh'}}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/orders">My Orders</Link></li>
            <li className="breadcrumb-item active">Order #{order.orderId}</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Order Details */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-receipt me-2 text-warning"></i>Order #{order.orderId}
                </h5>
                <span className={`badge bg-${statusInfo.color} px-3 py-2`}>
                  <i className={`fas ${statusInfo.icon} me-1`}></i>
                  {statusInfo.label}
                </span>
              </div>
              <div className="card-body p-4">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Order Date:</strong></p>
                    <p className="text-muted">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Payment Method:</strong></p>
                    <p className="text-muted">{order.payment?.method?.toUpperCase()}</p>
                  </div>
                </div>

                {order.tracking && (
                  <div className="alert alert-info mb-4">
                    <i className="fas fa-shipping-fast me-2"></i>
                    <strong>Tracking Number:</strong> {order.tracking}
                  </div>
                )}

                <h6 className="fw-bold mb-3">Order Items</h6>
                {order.items.map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="rounded me-3"
                      style={{width: '100px', height: '100px', objectFit: 'cover'}}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-2">{item.name}</h6>
                      <p className="text-muted mb-1 small">Quantity: {item.quantity}</p>
                      <p className="text-muted mb-0 small">Price: ₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="text-end">
                      <h5 className="text-warning fw-bold mb-0">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-history me-2 text-warning"></i>Order Timeline
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker bg-success"></div>
                    <div className="timeline-content">
                      <h6 className="fw-bold">Order Placed</h6>
                      <p className="text-muted small mb-0">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {order.status !== 'cancelled' && (
                    <>
                      <div className={`timeline-item ${order.status === 'processing' ? 'active' : ''}`}>
                        <div className={`timeline-marker ${order.status !== 'processing' ? 'bg-success' : 'bg-warning'}`}></div>
                        <div className="timeline-content">
                          <h6 className="fw-bold">Processing</h6>
                          <p className="text-muted small mb-0">Order is being prepared</p>
                        </div>
                      </div>
                      <div className={`timeline-item ${order.status === 'shipped' ? 'active' : ''}`}>
                        <div className={`timeline-marker ${order.status === 'delivered' ? 'bg-success' : order.status === 'shipped' ? 'bg-warning' : 'bg-secondary'}`}></div>
                        <div className="timeline-content">
                          <h6 className="fw-bold">Shipped</h6>
                          <p className="text-muted small mb-0">Order is on the way</p>
                        </div>
                      </div>
                      <div className={`timeline-item ${order.status === 'delivered' ? 'active' : ''}`}>
                        <div className={`timeline-marker ${order.status === 'delivered' ? 'bg-success' : 'bg-secondary'}`}></div>
                        <div className="timeline-content">
                          <h6 className="fw-bold">Delivered</h6>
                          <p className="text-muted small mb-0">Order delivered successfully</p>
                        </div>
                      </div>
                    </>
                  )}
                  {order.status === 'cancelled' && (
                    <div className="timeline-item active">
                      <div className="timeline-marker bg-danger"></div>
                      <div className="timeline-content">
                        <h6 className="fw-bold">Cancelled</h6>
                        <p className="text-muted small mb-0">Order was cancelled</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-warning">
                <h6 className="mb-0 fw-bold">Order Summary</h6>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-bold">₹{order.summary?.subtotal?.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  {order.summary?.shipping === 0 ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    <span className="fw-bold">₹{order.summary?.shipping}</span>
                  )}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold">Total</h6>
                  <h6 className="fw-bold text-warning">₹{order.summary?.total?.toLocaleString()}</h6>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-header bg-dark text-white">
                <h6 className="mb-0 fw-bold">
                  <i className="fas fa-map-marker-alt me-2 text-warning"></i>Shipping Address
                </h6>
              </div>
              <div className="card-body">
                <p className="mb-1"><strong>{order.shipping?.name}</strong></p>
                <p className="mb-1">{order.shipping?.address}</p>
                <p className="mb-1">{order.shipping?.city}, {order.shipping?.state} {order.shipping?.pincode}</p>
                <p className="mb-0">Phone: {order.shipping?.phone}</p>
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <button 
                className="btn btn-warning fw-bold"
                onClick={() => generateInvoice(order, setAlert)}
              >
                <i className="fas fa-download me-2"></i>Download Invoice
              </button>
              <button 
                className="btn btn-outline-warning"
                onClick={() => {
                  const url = previewInvoice(order, setAlert);
                  if (url) window.open(url, '_blank');
                }}
              >
                <i className="fas fa-eye me-2"></i>Preview Invoice
              </button>
              {canCancel && (
                <button 
                  className="btn btn-danger fw-bold"
                  onClick={() => setShowCancelModal(true)}
                >
                  <i className="fas fa-times me-2"></i>Cancel Order
                </button>
              )}
              <Link to="/orders" className="btn btn-outline-secondary">
                <i className="fas fa-arrow-left me-2"></i>Back to Orders
              </Link>
              {order.status === 'delivered' && (
                <button className="btn btn-success fw-bold">
                  <i className="fas fa-redo me-2"></i>Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Cancel Confirmation Modal */}
    {showCancelModal && (
      <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cancel Order</h5>
              <button className="btn-close" onClick={() => setShowCancelModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel this order?</p>
              <div className="alert alert-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                <strong>Order ID:</strong> {order.orderId}<br/>
                <strong>Total Amount:</strong> ₹{order.summary?.total?.toLocaleString()}
              </div>
              <p className="text-muted small">This action cannot be undone. Your refund will be processed within 5-7 business days.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>No, Keep Order</button>
              <button className="btn btn-danger" onClick={handleCancelOrder} disabled={cancelling}>
                {cancelling ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Cancelling...</>
                ) : (
                  <><i className="fas fa-times me-2"></i>Yes, Cancel Order</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    
    {/* Alert Modal */}
    <AlertModal 
      show={alert.show}
      type={alert.type}
      title={alert.title}
      message={alert.message}
      onClose={() => setAlert({ ...alert, show: false })}
    />
    </>
  );
};

export default OrderDetailPage;
