import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertModal from '../../user/components/AlertModal';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: 'success', message: '' });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/coupons', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCoupons(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const formData = {
      code: document.querySelector('[name="code"]').value,
      type: document.querySelector('[name="type"]').value,
      value: parseFloat(document.querySelector('[name="value"]').value),
      minPurchase: parseFloat(document.querySelector('[name="minPurchase"]').value) || 0,
      maxDiscount: parseFloat(document.querySelector('[name="maxDiscount"]').value) || undefined,
      usageLimit: parseInt(document.querySelector('[name="usageLimit"]').value) || undefined,
      validFrom: document.querySelector('[name="validFrom"]').value,
      validUntil: document.querySelector('[name="validUntil"]').value,
      active: document.querySelector('[name="active"]').value === 'true'
    };

    try {
      if (editCoupon) {
        await axios.put(`http://localhost:5000/api/coupons/${editCoupon._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlert({ show: true, type: 'success', message: 'Coupon updated!' });
      } else {
        await axios.post('http://localhost:5000/api/coupons', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlert({ show: true, type: 'success', message: 'Coupon created!' });
      }
      setShowModal(false);
      setEditCoupon(null);
      fetchCoupons();
    } catch (error) {
      setAlert({ show: true, type: 'error', message: error.response?.data?.error?.message || 'Failed to save' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/coupons/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlert({ show: true, type: 'success', message: 'Coupon deleted!' });
        fetchCoupons();
      } catch (error) {
        setAlert({ show: true, type: 'error', message: 'Failed to delete' });
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Coupon Management</h2>
        <button className="btn btn-warning" onClick={() => { setEditCoupon(null); setShowModal(true); }}>
          <i className="fas fa-plus me-2"></i>Create Coupon
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Code</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Min Purchase</th>
                  <th>Usage</th>
                  <th>Valid Until</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" className="text-center py-4">Loading...</td></tr>
                ) : coupons.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-4">No coupons found</td></tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr key={coupon._id}>
                      <td className="fw-bold">{coupon.code}</td>
                      <td><span className="badge bg-info">{coupon.type}</span></td>
                      <td>{coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}</td>
                      <td>₹{coupon.minPurchase}</td>
                      <td>{coupon.usedCount}/{coupon.usageLimit || '∞'}</td>
                      <td>{new Date(coupon.validUntil).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${coupon.active ? 'bg-success' : 'bg-secondary'}`}>
                          {coupon.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditCoupon(coupon); setShowModal(true); }}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(coupon._id)}>
                          <i className="fas fa-trash"></i>
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

      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editCoupon ? 'Edit' : 'Create'} Coupon</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Coupon Code</label>
                  <input type="text" className="form-control" name="code" defaultValue={editCoupon?.code} placeholder="SAVE20" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Type</label>
                    <select className="form-select" name="type" defaultValue={editCoupon?.type}>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Value</label>
                    <input type="number" className="form-control" name="value" defaultValue={editCoupon?.value} placeholder="20" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Min Purchase (₹)</label>
                    <input type="number" className="form-control" name="minPurchase" defaultValue={editCoupon?.minPurchase} placeholder="0" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Max Discount (₹)</label>
                    <input type="number" className="form-control" name="maxDiscount" defaultValue={editCoupon?.maxDiscount} placeholder="Optional" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Usage Limit</label>
                  <input type="number" className="form-control" name="usageLimit" defaultValue={editCoupon?.usageLimit} placeholder="Unlimited" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Valid From</label>
                    <input type="date" className="form-control" name="validFrom" defaultValue={editCoupon?.validFrom?.split('T')[0]} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Valid Until</label>
                    <input type="date" className="form-control" name="validUntil" defaultValue={editCoupon?.validUntil?.split('T')[0]} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="active" defaultValue={editCoupon?.active}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
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
      <AlertModal show={alert.show} type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
    </div>
  );
};

export default CouponManagement;