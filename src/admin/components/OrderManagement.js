import React, { useState, useEffect } from 'react';
import { orderAPI } from '../../utils/api';
import AlertModal from '../../user/components/AlertModal';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      setAlert({ show: true, type: 'success', message: 'Order status updated successfully!' });
      fetchOrders();
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Failed to update order status' });
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'pending': 'warning',
      'processing': 'info',
      'shipped': 'primary',
      'delivered': 'success',
      'cancelled': 'danger'
    };
    return colors[status] || 'secondary';
  };

  const filteredOrders = orders.filter(order => {
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchSearch = !searchQuery || 
      order.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const orderDate = new Date(order.createdAt);
    const matchStartDate = !startDate || orderDate >= new Date(startDate);
    const matchEndDate = !endDate || orderDate <= new Date(endDate + 'T23:59:59');
    const matchProduct = !productFilter || order.items?.some(item => 
      item.name?.toLowerCase().includes(productFilter.toLowerCase())
    );
    return matchStatus && matchSearch && matchStartDate && matchEndDate && matchProduct;
  });

  const uniqueProducts = [...new Set(orders.flatMap(o => o.items?.map(i => i.name) || []))];

  const exportToExcel = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Status'];
    let html = '<table border="1"><thead><tr>';
    headers.forEach(header => {
      html += `<th>${header}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    filteredOrders.forEach(order => {
      html += '<tr>';
      html += `<td>${order.orderId}</td>`;
      html += `<td>${order.user?.name || 'N/A'}</td>`;
      html += `<td>${order.user?.email || 'N/A'}</td>`;
      html += `<td>${new Date(order.createdAt).toLocaleDateString()}</td>`;
      html += `<td>₹${order.summary?.total?.toLocaleString()}</td>`;
      html += `<td>${order.status}</td>`;
      html += '</tr>';
    });
    html += '</tbody></table>';
    
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Orders Report</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 20px; }');
    printWindow.document.write('h1 { color: #333; }');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
    printWindow.document.write('th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }');
    printWindow.document.write('th { background-color: #ffc107; color: #000; font-weight: bold; }');
    printWindow.document.write('tr:nth-child(even) { background-color: #f9f9f9; }');
    printWindow.document.write('.summary { margin-top: 20px; font-weight: bold; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1>Wing Hobbies - Orders Report</h1>');
    printWindow.document.write('<p>Generated on: ' + new Date().toLocaleString() + '</p>');
    printWindow.document.write('<p>Total Orders: ' + filteredOrders.length + '</p>');
    printWindow.document.write('<table>');
    printWindow.document.write('<thead><tr>');
    printWindow.document.write('<th>Order ID</th><th>Customer</th><th>Email</th><th>Date</th><th>Total</th><th>Status</th>');
    printWindow.document.write('</tr></thead><tbody>');
    
    let totalRevenue = 0;
    filteredOrders.forEach(order => {
      totalRevenue += order.summary?.total || 0;
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${order.orderId}</td>`);
      printWindow.document.write(`<td>${order.user?.name || 'N/A'}</td>`);
      printWindow.document.write(`<td>${order.user?.email || 'N/A'}</td>`);
      printWindow.document.write(`<td>${new Date(order.createdAt).toLocaleDateString()}</td>`);
      printWindow.document.write(`<td>₹${order.summary?.total?.toLocaleString()}</td>`);
      printWindow.document.write(`<td>${order.status}</td>`);
      printWindow.document.write('</tr>');
    });
    
    printWindow.document.write('</tbody></table>');
    printWindow.document.write(`<div class="summary">Total Revenue: ₹${totalRevenue.toLocaleString()}</div>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const importOrders = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        
        if (!Array.isArray(importedData)) {
          setAlert({ show: true, type: 'error', message: 'Invalid format. Expected array of orders.' });
          return;
        }

        // Validate and import orders
        const token = localStorage.getItem('token');
        let successCount = 0;
        let errorCount = 0;

        for (const orderData of importedData) {
          try {
            await orderAPI.create(orderData);
            successCount++;
          } catch (err) {
            errorCount++;
            console.error('Failed to import order:', err);
          }
        }

        if (successCount > 0) {
          setAlert({ 
            show: true, 
            type: 'success', 
            message: `Imported ${successCount} orders successfully!${errorCount > 0 ? ` (${errorCount} failed)` : ''}` 
          });
          fetchOrders();
        } else {
          setAlert({ show: true, type: 'error', message: 'Failed to import orders.' });
        }
      } catch (error) {
        setAlert({ show: true, type: 'error', message: 'Invalid JSON file format.' });
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const exportOrdersJSON = () => {
    const dataStr = JSON.stringify(filteredOrders, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">Order Management</h2>
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={exportToExcel}>
              <i className="fas fa-file-excel me-2"></i>Excel
            </button>
            <button className="btn btn-danger" onClick={exportToPDF}>
              <i className="fas fa-file-pdf me-2"></i>PDF
            </button>
            <button className="btn btn-info" onClick={exportOrdersJSON}>
              <i className="fas fa-file-code me-2"></i>JSON
            </button>
            <label className="btn btn-primary mb-0" title="Import orders from JSON file">
              <i className="fas fa-upload me-2"></i>Import
              <input type="file" accept=".json" onChange={importOrders} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
        
        {/* Filters */}
        <div className="card border-0 shadow-sm mb-3" style={{background: 'linear-gradient(135deg, #fff9e6 0%, #ffffff 100%)'}}>
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-filter text-warning fs-5 me-2"></i>
              <h6 className="mb-0 fw-bold">Filter Orders</h6>
            </div>
            <div className="row g-3">
              <div className="col-md-2">
                <label className="form-label small fw-semibold"><i className="fas fa-search text-warning me-1"></i>Search</label>
                <input 
                  type="text" 
                  className="form-control border-warning" 
                  placeholder="Order ID, Name, Email" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold"><i className="fas fa-box text-warning me-1"></i>Product</label>
                <input 
                  type="text" 
                  className="form-control border-warning" 
                  placeholder="Product name" 
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  list="products-list"
                />
                <datalist id="products-list">
                  {uniqueProducts.map((product, idx) => (
                    <option key={idx} value={product} />
                  ))}
                </datalist>
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold"><i className="fas fa-tag text-warning me-1"></i>Status</label>
                <select className="form-select border-warning" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="processing">⚙️ Processing</option>
                  <option value="shipped">🚚 Shipped</option>
                  <option value="delivered">✅ Delivered</option>
                  <option value="cancelled">❌ Cancelled</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold"><i className="fas fa-calendar text-warning me-1"></i>Start Date</label>
                <input 
                  type="date" 
                  className="form-control border-warning" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-semibold"><i className="fas fa-calendar-check text-warning me-1"></i>End Date</label>
                <input 
                  type="date" 
                  className="form-control border-warning" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label small">&nbsp;</label>
                <button 
                  className="btn btn-outline-warning w-100 fw-semibold" 
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setStartDate('');
                    setEndDate('');
                    setProductFilter('');
                  }}
                >
                  <i className="fas fa-redo me-2"></i>Clear
                </button>
              </div>
            </div>
            <div className="mt-3 p-2 bg-white rounded border border-warning">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted"><i className="fas fa-info-circle text-warning me-1"></i>Showing <strong className="text-warning">{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders</small>
                {(searchQuery || statusFilter !== 'all' || startDate || endDate || productFilter) && (
                  <span className="badge bg-warning text-dark"><i className="fas fa-filter me-1"></i>Filters Active</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-4">Loading orders...</td></tr>
                ) : filteredOrders.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-4">No orders found</td></tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="fw-bold">#{order.orderId}</td>
                      <td>{order.user?.name || 'N/A'}</td>
                      <td>
                        <small>
                          {order.items?.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="text-truncate" style={{maxWidth: '150px'}}>
                              {item.name} (x{item.quantity})
                            </div>
                          ))}
                          {order.items?.length > 2 && (
                            <span className="badge bg-secondary">+{order.items.length - 2} more</span>
                          )}
                        </small>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="fw-bold text-success">₹{order.summary?.total?.toLocaleString()}</td>
                      <td>
                        <select 
                          className={`form-select form-select-sm badge bg-${getStatusBadge(order.status)}`}
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
                          style={{ width: 'auto', border: 'none' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => window.open(`/order/${order.orderId}`, '_blank')}>
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
      <AlertModal show={alert.show} type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
    </div>
  );
};

export default OrderManagement;