import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Review Management</h2>
        <div className="d-flex gap-2">
          <select className="form-select" style={{ width: '150px' }}>
            <option>All Reviews</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-warning"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="col-12 text-center py-5 text-muted">
            <i className="fas fa-star display-1 mb-3"></i>
            <p>No reviews yet</p>
          </div>
        ) : reviews.map((review) => (
          <div key={review.id} className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1 fw-bold">{review.product?.name || 'Product'}</h6>
                    <small className="text-muted">by {review.user?.name || 'Anonymous'}</small>
                  </div>
                  <span className={`badge ${review.status === 'Approved' ? 'bg-success' : 'bg-warning'}`}>
                    {review.status}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="fs-5">{renderStars(review.rating)}</span>
                </div>
                <p className="text-muted mb-3">{review.comment}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-success">
                      <i className="fas fa-check"></i> Approve
                    </button>
                    <button className="btn btn-outline-danger">
                      <i className="fas fa-times"></i> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewManagement;