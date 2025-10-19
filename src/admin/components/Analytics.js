import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertModal from '../../user/components/AlertModal';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [dbStats, setDbStats] = useState(null);
  const [storageStats, setStorageStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [dashboardRes, dbRes, storageRes, userRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics/dashboard', { headers }).catch(() => null),
        axios.get('http://localhost:5000/api/analytics/database', { headers }).catch(() => null),
        axios.get('http://localhost:5000/api/analytics/storage', { headers }).catch(() => null),
        axios.get('http://localhost:5000/api/analytics/users', { headers }).catch(() => null)
      ]);

      if (dashboardRes?.data?.data) {
        setAnalytics(dashboardRes.data.data);
      } else {
        setAnalytics({
          summary: { totalRevenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0, avgOrderValue: 0 },
          revenueByMonth: [],
          topProducts: [],
          ordersByStatus: []
        });
      }
      
      if (dbRes?.data?.data) {
        setDbStats(dbRes.data.data);
      } else {
        setDbStats({
          database: 'N/A',
          collections: 0,
          dataSize: '0 MB',
          storageSize: '0 MB',
          indexes: 0,
          indexSize: '0 MB',
          collectionStats: []
        });
      }
      
      if (storageRes?.data?.data) {
        setStorageStats(storageRes.data.data);
      } else {
        setStorageStats({
          totalImages: 0,
          totalSizeMB: '0',
          totalSizeGB: '0',
          estimatedMonthlyCost: '0.00',
          estimatedYearlyCost: '0.00',
          productsWithImages: 0,
          avgImagesPerProduct: '0',
          pricing: null,
          bucketInfo: null
        });
      }
      
      if (userRes?.data?.data) {
        setUserStats(userRes.data.data);
      } else {
        setUserStats({
          activeUsers: 0,
          usersByMonth: []
        });
      }
    } catch (error) {
      console.error('Analytics error:', error);
      setAlert({ show: true, type: 'error', message: error.response?.data?.error?.message || 'Failed to load analytics' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>;
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Analytics & Reports</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'database' ? 'active' : ''}`} onClick={() => setActiveTab('database')}>Database</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'storage' ? 'active' : ''}`} onClick={() => setActiveTab('storage')}>Storage</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        </li>
      </ul>

      {activeTab === 'dashboard' && analytics && (
        <>
          {/* Summary Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Total Revenue</h6>
                  <h3 className="fw-bold text-success">₹{analytics.summary.totalRevenue.toLocaleString()}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Total Orders</h6>
                  <h3 className="fw-bold text-primary">{analytics.summary.totalOrders}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Avg Order Value</h6>
                  <h3 className="fw-bold text-warning">₹{analytics.summary.avgOrderValue.toFixed(2)}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Total Products</h6>
                  <h3 className="fw-bold text-info">{analytics.summary.totalProducts}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0 fw-bold">Revenue by Month</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Revenue</th>
                          <th>Orders</th>
                          <th>Avg Order</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.revenueByMonth.length === 0 ? (
                          <tr><td colSpan="4" className="text-center py-3 text-muted">No data available</td></tr>
                        ) : analytics.revenueByMonth.map((data, index) => (
                          <tr key={index}>
                            <td className="fw-bold">{data._id}</td>
                            <td className="text-success">₹{data.revenue.toLocaleString()}</td>
                            <td>{data.orders}</td>
                            <td>₹{(data.revenue / data.orders).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0 fw-bold">Top Products</h5>
                </div>
                <div className="card-body">
                  {analytics.topProducts.length === 0 ? (
                    <p className="text-muted text-center py-3">No data available</p>
                  ) : analytics.topProducts.map((product, index) => (
                    <div key={index} className="mb-3 pb-3 border-bottom">
                      <h6 className="mb-1">{product._id}</h6>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">{product.sales} sales</small>
                        <small className="text-success fw-bold">₹{product.revenue.toLocaleString()}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card shadow-sm mt-3">
                <div className="card-header bg-white">
                  <h5 className="mb-0 fw-bold">Orders by Status</h5>
                </div>
                <div className="card-body">
                  {analytics.ordersByStatus.length === 0 ? (
                    <p className="text-muted text-center py-3">No orders yet</p>
                  ) : analytics.ordersByStatus.map((status, index) => (
                    <div key={index} className="d-flex justify-content-between mb-2">
                      <span className="text-capitalize">{status._id}</span>
                      <span className="badge bg-primary">{status.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'database' && dbStats && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Database</h6>
                <h4 className="fw-bold">{dbStats.database}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Collections</h6>
                <h4 className="fw-bold">{dbStats.collections}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Data Size</h6>
                <h4 className="fw-bold">{dbStats.dataSize}</h4>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Collection Statistics</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Collection</th>
                        <th>Documents</th>
                        <th>Size</th>
                        <th>Avg Doc Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbStats.collectionStats.length === 0 ? (
                        <tr><td colSpan="4" className="text-center py-3 text-muted">No collections found</td></tr>
                      ) : dbStats.collectionStats.map((col, index) => (
                        <tr key={index}>
                          <td className="fw-bold">{col.name}</td>
                          <td>{col.count}</td>
                          <td>{col.size}</td>
                          <td>{col.avgObjSize}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'storage' && storageStats && (
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Total Images</h6>
                <h4 className="fw-bold">{storageStats.totalImages}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Storage Size</h6>
                <h4 className="fw-bold">{storageStats.totalSizeGB || storageStats.estimatedSize} GB</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Monthly Cost</h6>
                <h4 className="fw-bold text-warning">${storageStats.estimatedMonthlyCost || '0.00'}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Yearly Cost</h6>
                <h4 className="fw-bold text-danger">${storageStats.estimatedYearlyCost || '0.00'}</h4>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Storage Details</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Products with Images:</span>
                  <strong>{storageStats.productsWithImages}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Avg Images per Product:</span>
                  <strong>{storageStats.avgImagesPerProduct || '0'}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Size (MB):</span>
                  <strong>{storageStats.totalSizeMB || '0'} MB</strong>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Google Cloud Storage Pricing</h5>
              </div>
              <div className="card-body">
                {storageStats.pricing ? (
                  <>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Price per GB:</span>
                      <strong>{storageStats.pricing.perGB}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Storage Class:</span>
                      <strong>{storageStats.pricing.storageClass}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Region:</span>
                      <strong>{storageStats.pricing.region}</strong>
                    </div>
                  </>
                ) : (
                  <p className="text-muted mb-0">Pricing info not available</p>
                )}
              </div>
            </div>
          </div>
          
          {storageStats.bucketInfo && (
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0 fw-bold">Bucket Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <small className="text-muted">Bucket Name</small>
                      <p className="fw-bold">{storageStats.bucketInfo.name}</p>
                    </div>
                    <div className="col-md-3">
                      <small className="text-muted">Location</small>
                      <p className="fw-bold">{storageStats.bucketInfo.location}</p>
                    </div>
                    <div className="col-md-3">
                      <small className="text-muted">Storage Class</small>
                      <p className="fw-bold">{storageStats.bucketInfo.storageClass}</p>
                    </div>
                    <div className="col-md-3">
                      <small className="text-muted">Created</small>
                      <p className="fw-bold">{new Date(storageStats.bucketInfo.created).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && userStats && (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Active Users</h6>
                <h4 className="fw-bold">{userStats.activeUsers}</h4>
                <small className="text-muted">Users who placed orders</small>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">User Registrations by Month</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>New Users</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userStats.usersByMonth.length === 0 ? (
                        <tr><td colSpan="2" className="text-center py-3 text-muted">No data available</td></tr>
                      ) : userStats.usersByMonth.map((data, index) => (
                        <tr key={index}>
                          <td className="fw-bold">{data._id}</td>
                          <td>{data.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Analytics;