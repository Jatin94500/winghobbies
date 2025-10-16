import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockOrders, orderStatuses } from '../data/orders';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }

  const order = mockOrders.find(o => o.id === id);

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
    <div className="bg-light py-5" style={{minHeight: '80vh'}}>
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/orders">My Orders</Link></li>
            <li className="breadcrumb-item active">Order #{order.id}</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Order Details */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-receipt me-2 text-warning"></i>Order #{order.id}
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
                      {new Date(order.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2"><strong>Payment Method:</strong></p>
                    <p className="text-muted">{order.payment}</p>
                  </div>
                </div>

                {order.tracking && (
                  <div className="alert alert-info mb-4">
                    <i className="fas fa-shipping-fast me-2"></i>
                    <strong>Tracking Number:</strong> {order.tracking}
                  </div>
                )}

                <h6 className="fw-bold mb-3">Order Items</h6>
                {order.items.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
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
                      <p className="text-muted small mb-0">{order.date}</p>
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
                  <span className="fw-bold">₹{(order.total - order.shipping).toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  {order.shipping === 0 ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    <span className="fw-bold">₹{order.shipping}</span>
                  )}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold">Total</h6>
                  <h6 className="fw-bold text-warning">₹{order.total.toLocaleString()}</h6>
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
                <p className="mb-0">{order.address}</p>
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <Link to="/orders" className="btn btn-outline-warning">
                <i className="fas fa-arrow-left me-2"></i>Back to Orders
              </Link>
              {order.status === 'delivered' && (
                <button className="btn btn-warning fw-bold">
                  <i className="fas fa-redo me-2"></i>Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
