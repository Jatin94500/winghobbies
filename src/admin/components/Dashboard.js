import React, { useState, useEffect } from 'react';
import { productAPI, orderAPI } from '../../utils/api';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Products', value: 0, icon: 'fas fa-box', color: 'primary' },
    { title: 'Total Orders', value: 0, icon: 'fas fa-shopping-cart', color: 'success' },
    { title: 'Total Users', value: 0, icon: 'fas fa-users', color: 'info' },
    { title: 'Revenue', value: '₹0', icon: 'fas fa-rupee-sign', color: 'warning' }
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const productsRes = await productAPI.getAll();
      const productsData = productsRes.data.success ? productsRes.data.data : [];
      const products = Array.isArray(productsData.products) ? productsData.products : Array.isArray(productsData) ? productsData : [];
      
      // Fetch orders
      const ordersRes = await orderAPI.getAll().catch(() => ({ data: { data: [] } }));
      const orders = Array.isArray(ordersRes.data.data) ? ordersRes.data.data : [];
      
      // Fetch users count
      const usersRes = await api.get('/auth/users/count').catch(() => ({ data: { count: 0 } }));
      const usersCount = usersRes.data.count || 0;
      
      // Calculate revenue
      const revenue = Array.isArray(orders) ? orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0;
      
      // Calculate category distribution
      const categoryCount = {};
      if (Array.isArray(products)) {
        products.forEach(p => {
          categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
        });
      }
      const total = products.length || 1;
      const categoryData = Object.entries(categoryCount).map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        percentage: Math.round((count / total) * 100)
      })).slice(0, 5);
      
      setStats([
        { title: 'Total Products', value: products.length, icon: 'fas fa-box', color: 'primary' },
        { title: 'Total Orders', value: orders.length, icon: 'fas fa-shopping-cart', color: 'success' },
        { title: 'Total Users', value: usersCount, icon: 'fas fa-users', color: 'info' },
        { title: 'Revenue', value: `₹${revenue.toLocaleString()}`, icon: 'fas fa-rupee-sign', color: 'warning' }
      ]);
      
      setRecentOrders(orders.slice(0, 5));
      setCategories(categoryData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-3 mb-md-4 fw-bold">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="row g-3 g-md-4 mb-3 mb-md-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-6 col-xl-3">
            <div className={`card border-0 shadow-sm border-start border-${stat.color} border-4`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted mb-1">{stat.title}</p>
                    <h3 className="mb-0 fw-bold">{stat.value}</h3>
                  </div>
                  <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded`}>
                    <i className={`${stat.icon} fs-2 text-${stat.color}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="row g-3 g-md-4 mb-3 mb-md-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-bold">Sales Overview</h5>
            </div>
            <div className="card-body">
              <div className="text-center py-5 text-muted">
                <i className="fas fa-chart-line display-1 mb-3"></i>
                <p>Sales chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-bold">Top Categories</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                </div>
              ) : categories.length === 0 ? (
                <p className="text-muted text-center">No products yet</p>
              ) : (
                categories.map((cat, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{cat.name}</span>
                      <span className="fw-bold">{cat.percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className={`progress-bar bg-${['primary', 'success', 'warning', 'info', 'danger'][idx % 5]}`} style={{ width: `${cat.percentage}%` }}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-bold">Recent Orders</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-4">Loading orders...</td></tr>
                ) : recentOrders.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-4">No orders yet</td></tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="fw-bold">#{order._id?.slice(-6)}</td>
                      <td>{order.user?.name || 'Guest'}</td>
                      <td>{order.items?.[0]?.name || 'N/A'}</td>
                      <td className="fw-bold text-success">₹{order.total?.toLocaleString()}</td>
                      <td>
                        <span className={`badge bg-${
                          order.status === 'delivered' ? 'success' : 
                          order.status === 'shipped' ? 'info' : 'warning'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;