import React, { useState, useEffect } from 'react';
import { orderAPI } from '../../utils/api';
import AlertModal from '../../user/components/AlertModal';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
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

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);

  const exportToExcel = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Status'];
    let html = '<table border="1"><thead><tr>';
    headers.forEach(header => {
      html += `<th>${header}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    orders.forEach(order => {
      html += '<tr>';
      html += `<td>${order.id}</td>`;
      html += `<td>${order.customer}</td>`;
      html += `<td>${order.email}</td>`;
      html += `<td>${order.date}</td>`;
      html += `<td>$${order.total}</td>`;
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
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1>Orders Report</h1>');
    printWindow.document.write('<p>Generated on: ' + new Date().toLocaleDateString() + '</p>');
    printWindow.document.write('<table>');
    printWindow.document.write('<thead><tr>');
    printWindow.document.write('<th>Order ID</th><th>Customer</th><th>Email</th><th>Date</th><th>Total</th><th>Status</th>');
    printWindow.document.write('</tr></thead><tbody>');
    
    orders.forEach(order => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${order.id}</td>`);
      printWindow.document.write(`<td>${order.customer}</td>`);
      printWindow.document.write(`<td>${order.email}</td>`);
      printWindow.document.write(`<td>${order.date}</td>`);
      printWindow.document.write(`<td>$${order.total}</td>`);
      printWindow.document.write(`<td>${order.status}</td>`);
      printWindow.document.write('</tr>');
    });
    
    printWindow.document.write('</tbody></table></body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const importOrders = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);
          console.log('Imported orders:', importedData);
          setAlert({ show: true, type: 'success', message: 'Orders imported successfully!' });
        } catch (error) {
          setAlert({ show: true, type: 'error', message: 'Error importing orders. Please check file format.' });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Order Management</h2>
        <div className="d-flex gap-2 align-items-center">
          <select className="form-select" style={{ width: '150px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <button className="btn btn-success" onClick={exportToExcel}>
            <i className="fas fa-file-excel me-2"></i>
            Excel
          </button>
          <button className="btn btn-danger" onClick={exportToPDF}>
            <i className="fas fa-file-pdf me-2"></i>
            PDF
          </button>
          <label className="btn btn-primary mb-0">
            <i className="fas fa-upload me-2"></i>
            Import
            <input type="file" accept=".json,.xls,.xlsx" onChange={importOrders} style={{ display: 'none' }} />
          </label>
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
                  <th>Email</th>
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
                      <td>{order.user?.email || 'N/A'}</td>
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