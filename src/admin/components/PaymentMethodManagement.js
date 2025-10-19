import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMethod, setEditMethod] = useState(null);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/payment-methods/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMethods(response.data.data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const formData = {
      name: document.querySelector('[name="name"]').value,
      type: document.querySelector('[name="type"]').value,
      icon: document.querySelector('[name="icon"]').value,
      enabled: document.querySelector('[name="enabled"]').value === 'true'
    };

    try {
      if (editMethod) {
        await axios.put(`http://localhost:5000/api/payment-methods/${editMethod._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Payment method updated!');
      } else {
        await axios.post('http://localhost:5000/api/payment-methods', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Payment method added!');
      }
      setShowModal(false);
      setEditMethod(null);
      fetchMethods();
    } catch (error) {
      alert(error.response?.data?.error?.message || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payment method?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/payment-methods/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Deleted successfully!');
        fetchMethods();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Payment Methods</h2>
        <button className="btn btn-warning" onClick={() => { setEditMethod(null); setShowModal(true); }}>
          <i className="fas fa-plus me-2"></i>Add Payment Method
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Icon</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((method) => (
                  <tr key={method._id}>
                    <td className="fw-bold">{method.name}</td>
                    <td><span className="badge bg-primary">{method.type}</span></td>
                    <td><i className={method.icon}></i></td>
                    <td>
                      <span className={`badge ${method.enabled ? 'bg-success' : 'bg-danger'}`}>
                        {method.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditMethod(method); setShowModal(true); }}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(method._id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editMethod ? 'Edit' : 'Add'} Payment Method</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" defaultValue={editMethod?.name} placeholder="Credit/Debit Card" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="type" defaultValue={editMethod?.type}>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="wallet">Wallet</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="emi">EMI</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Icon (FontAwesome class)</label>
                  <input type="text" className="form-control" name="icon" defaultValue={editMethod?.icon} placeholder="fas fa-credit-card" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="enabled" defaultValue={editMethod?.enabled}>
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-warning" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodManagement;
