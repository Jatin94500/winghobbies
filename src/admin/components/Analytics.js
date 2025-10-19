import React from 'react';

const Analytics = () => {
  const salesData = [
    { month: 'Jan', sales: 12500, orders: 45 },
    { month: 'Feb', sales: 15800, orders: 58 },
    { month: 'Mar', sales: 18200, orders: 67 },
    { month: 'Apr', sales: 21500, orders: 78 },
    { month: 'May', sales: 19800, orders: 72 },
    { month: 'Jun', sales: 23400, orders: 85 }
  ];

  const topProducts = [
    { name: 'RC Plane Falcon X1', sales: 145, revenue: 43455 },
    { name: 'Transmitter TX-500', sales: 98, revenue: 8820 },
    { name: 'Brushless Motor', sales: 234, revenue: 10760 }
  ];

  return (
    <div>
      <h2 className="fw-bold mb-4">Analytics & Reports</h2>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Revenue</h6>
              <h3 className="fw-bold text-success">$111,200</h3>
              <small className="text-success"><i className="fas fa-arrow-up"></i> 12.5% from last month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Orders</h6>
              <h3 className="fw-bold text-primary">405</h3>
              <small className="text-success"><i className="fas fa-arrow-up"></i> 8.2% from last month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Avg Order Value</h6>
              <h3 className="fw-bold text-warning">$274.57</h3>
              <small className="text-danger"><i className="fas fa-arrow-down"></i> 2.1% from last month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Conversion Rate</h6>
              <h3 className="fw-bold text-info">3.2%</h3>
              <small className="text-success"><i className="fas fa-arrow-up"></i> 0.5% from last month</small>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-bold">Sales Overview</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Sales</th>
                      <th>Orders</th>
                      <th>Avg Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((data, index) => (
                      <tr key={index}>
                        <td className="fw-bold">{data.month}</td>
                        <td className="text-success">${data.sales.toLocaleString()}</td>
                        <td>{data.orders}</td>
                        <td>${(data.sales / data.orders).toFixed(2)}</td>
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
              {topProducts.map((product, index) => (
                <div key={index} className="mb-3 pb-3 border-bottom">
                  <h6 className="mb-1">{product.name}</h6>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">{product.sales} sales</small>
                    <small className="text-success fw-bold">${product.revenue.toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export Reports */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-bold">Export Reports</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <button className="btn btn-outline-success w-100">
                <i className="fas fa-file-excel me-2"></i>
                Sales Report (Excel)
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-danger w-100">
                <i className="fas fa-file-pdf me-2"></i>
                Revenue Report (PDF)
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-primary w-100">
                <i className="fas fa-chart-bar me-2"></i>
                Analytics Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;