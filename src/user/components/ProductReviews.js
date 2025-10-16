import React, { useState } from 'react';
import { getProductReviews, getAverageRating, getRatingDistribution } from '../data/reviews';
import { useAuth } from '../context/AuthContext';

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews] = useState(getProductReviews(productId));
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const avgRating = getAverageRating(productId);
  const distribution = getRatingDistribution(productId);
  const totalReviews = reviews.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Review submitted successfully!');
    setComment('');
    setRating(5);
    setShowForm(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}></i>
    ));
  };

  return (
    <div className="mt-5">
      <h3 className="mb-4">Customer Reviews</h3>
      
      {/* Rating Summary */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4 text-center border-end">
              <h1 className="display-3 mb-0">{avgRating}</h1>
              <div className="mb-2">{renderStars(Math.round(avgRating))}</div>
              <p className="text-muted mb-0">{totalReviews} reviews</p>
            </div>
            <div className="col-md-8">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="d-flex align-items-center mb-2">
                  <span className="me-2" style={{ width: '60px' }}>{star} <i className="fas fa-star text-warning"></i></span>
                  <div className="progress flex-grow-1" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-warning" 
                      style={{ width: `${totalReviews ? (distribution[star] / totalReviews) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="ms-2 text-muted" style={{ width: '40px' }}>{distribution[star]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      {user && !showForm && (
        <button className="btn btn-warning fw-bold mb-4" onClick={() => setShowForm(true)}>
          <i className="fas fa-edit me-2"></i>Write a Review
        </button>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h5 className="mb-3">Write Your Review</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div>
                  {[1, 2, 3, 4, 5].map(star => (
                    <i 
                      key={star}
                      className={`fas fa-star fs-4 me-1 cursor-pointer ${star <= rating ? 'text-warning' : 'text-muted'}`}
                      onClick={() => setRating(star)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Your Review</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Share your experience with this product..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-warning fw-bold me-2">Submit Review</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-comments fs-1 mb-3 d-block"></i>
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="card border-0 shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex align-items-start">
                  <img 
                    src={review.avatar} 
                    alt={review.user} 
                    className="rounded-circle me-3"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-0">
                          {review.user}
                          {review.verified && (
                            <span className="badge bg-success ms-2" style={{ fontSize: '0.7rem' }}>
                              <i className="fas fa-check-circle me-1"></i>Verified Purchase
                            </span>
                          )}
                        </h6>
                        <small className="text-muted">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                      </div>
                      <div>{renderStars(review.rating)}</div>
                    </div>
                    <p className="mb-0">{review.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
