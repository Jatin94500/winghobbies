import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../../utils/api';
import { generateInvoice } from '../../utils/invoiceGenerator';
import AlertModal from '../components/AlertModal';

const orderStatuses = {
  pending: { label: 'Pending', color: 'warning', icon: 'fa-clock' },
  processing: { label: 'Processing', color: 'info', icon: 'fa-cog' },
  shipped: { label: 'Shipped', color: 'primary', icon: 'fa-shipping-fast' },
  delivered: { label: 'Delivered', color: 'success', icon: 'fa-check-circle' },
  cancelled: { label: 'Cancelled', color: 'danger', icon: 'fa-times-circle' }
};

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      console.log('Orders response:', response.data);
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="bg-light py-5" style={{minHeight: '80vh'}}>
      <div className="container">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <img src={user.avatar} alt={user.name} className="rounded-circle mb-3" width="100" height="100" />
                <h5 className="fw-bold mb-1">{user.name}</h5>
                <p className="text-muted small mb-0">{user.email}</p>
              </div>
            </div>

            <div className="card border-0 shadow-sm mt-3">
              <div className="list-group list-group-flush">
                <Link to="/profile" className="list-group-item list-group-item-action">
                  <i className="fas fa-user me-2"></i>My Profile
                </Link>
                <Link to="/orders" className="list-group-item list-group-item-action active bg-warning border-0">
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
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-shopping-bag me-2 text-warning"></i>My Orders
                </h5>
              </div>
              <div className="card-body p-4">
                {/* Filter Buttons */}
                <div className="btn-group w-100 mb-4" role="group">
                  <button 
                    className={`btn ${filter === 'all' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilter('all')}
                  >
                    All Orders
                  </button>
                  <button 
                    className={`btn ${filter === 'processing' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilter('processing')}
                  >
                    Processing
                  </button>
                  <button 
                    className={`btn ${filter === 'shipped' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilter('shipped')}
                  >
                    Shipped
                  </button>
                  <button 
                    className={`btn ${filter === 'delivered' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilter('delivered')}
                  >
                    Delivered
                  </button>
                </div>

                {/* Orders List */}
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-warning" role="status"></div>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-box-open display-1 text-muted mb-3"></i>
                    <h4 className="text-muted">No orders found</h4>
                    <Link to="/products" className="btn btn-warning mt-3">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div key={order._id || order.orderId} className="card border-0 shadow-sm mb-3">
                      <div className="card-body">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-6">
                            <h6 className="fw-bold mb-1">Order #{order.orderId}</h6>
                            <small className="text-muted">
                              <i className="fas fa-calendar me-1"></i>
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </small>
                          </div>
                          <div className="col-md-6 text-md-end">
                            <span className={`badge bg-${orderStatuses[order.status].color} px-3 py-2`}>
                              <i className={`fas ${orderStatuses[order.status].icon} me-1`}></i>
                              {orderStatuses[order.status].label}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        {order.items.map((item, idx) => (
                          <div key={item._id || `${order._id}-${idx}`} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                            <img 
                              src={item.image || 'https://via.placeholder.com/80'} 
                              alt={item.name} 
                              className="rounded me-3"
                              style={{width: '80px', height: '80px', objectFit: 'cover'}}
                            />
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{item.name}</h6>
                              <p className="text-muted mb-0 small">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-end">
                              <h6 className="text-warning fw-bold mb-0">₹{(item.price * item.quantity).toLocaleString()}</h6>
                            </div>
                          </div>
                        ))}

                        {/* Order Summary */}
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-1 small"><strong>Payment:</strong> {order.payment?.method?.toUpperCase()}</p>
                            <p className="mb-1 small"><strong>Shipping:</strong> {order.shipping?.city}</p>
                          </div>
                          <div className="col-md-6 text-md-end">
                            <h5 className="fw-bold text-dark mb-3">
                              Total: <span className="text-warning">₹{order.summary?.total?.toLocaleString()}</span>
                            </h5>
                            <Link 
                              to={`/order/${order.orderId}`} 
                              className="btn btn-outline-warning btn-sm me-2"
                            >
                              <i className="fas fa-eye me-1"></i>View Details
                            </Link>
                            <button 
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => generateInvoice(order, setAlert)}
                            >
                              <i className="fas fa-file-invoice me-1"></i>Invoice
                            </button>
                            {order.status === 'delivered' && (
                              <button className="btn btn-success btn-sm">
                                <i className="fas fa-redo me-1"></i>Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AlertModal 
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
};

export default OrdersPage;
