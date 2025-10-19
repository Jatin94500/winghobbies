import React, { useState } from 'react';

const OrderActions = ({ order, onUpdate }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [returnComments, setReturnComments] = useState('');
  const [loading, setLoading] = useState(false);

  const canCancel = ['pending', 'processing'].includes(order.status);
  const canReturn = order.status === 'delivered';

  const handleCancel = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/${order.orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        alert('Order cancelled successfully');
        onUpdate();
        setShowCancelModal(false);
      } else {
        alert(data.error?.message || 'Failed to cancel order');
      }
    } catch (error) {
      alert('Error cancelling order');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!returnReason) {
      alert('Please select a reason');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/orders/${order.orderId}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: returnReason, comments: returnComments })
      });
      const data = await response.json();
      if (data.success) {
        alert('Return request submitted successfully');
        onUpdate();
        setShowReturnModal(false);
      } else {
        alert(data.error?.message || 'Failed to submit return request');
      }
    } catch (error) {
      alert('Error submitting return request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {canCancel && (
        <button className="btn btn-danger btn-sm" onClick={() => setShowCancelModal(true)}>
          <i className="fas fa-times me-1"></i>Cancel Order
        </button>
      )}
      {canReturn && (
        <button className="btn btn-warning btn-sm" onClick={() => setShowReturnModal(true)}>
          <i className="fas fa-undo me-1"></i>Return Order
        </button>
      )}

      {/* Cancel Modal */}
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
                <p className="text-muted">Order ID: {order.orderId}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>No</button>
                <button className="btn btn-danger" onClick={handleCancel} disabled={loading}>
                  {loading ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Return Order</h5>
                <button className="btn-close" onClick={() => setShowReturnModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Reason for Return</label>
                  <select className="form-select" value={returnReason} onChange={(e) => setReturnReason(e.target.value)}>
                    <option value="">Select reason</option>
                    <option value="defective">Defective Product</option>
                    <option value="wrong">Wrong Product</option>
                    <option value="damaged">Damaged</option>
                    <option value="notasexpected">Not as Expected</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Comments (Optional)</label>
                  <textarea className="form-control" rows="3" value={returnComments} onChange={(e) => setReturnComments(e.target.value)}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowReturnModal(false)}>Cancel</button>
                <button className="btn btn-warning" onClick={handleReturn} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Return Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderActions;
