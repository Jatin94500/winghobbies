import React from 'react';

const CouponManagement = () => {

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Coupon Management</h2>
        <button className="btn btn-warning" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus me-2"></i>
          Create Coupon
        </button>
      </div>

      <div className="text-center py-5">
        <i className="fas fa-ticket-alt display-1 text-muted mb-4"></i>
        <h4 className="text-muted">Coupon Management Coming Soon</h4>
        <p className="text-muted">This feature will allow you to create and manage discount coupons for your store.</p>
      </div>
    </div>
  );
};

export default CouponManagement;