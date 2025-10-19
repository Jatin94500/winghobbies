import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AlertModal from './AlertModal';

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/reviews/product/${productId}`);
      const data = await response.json();
      if (data.success) setReviews(data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setAlert({ show: true, type: 'warning', message: 'Please login to write a review' });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, rating, title, comment })
      });

      const data = await response.json();
      if (data.success) {
        setTitle('');
        setComment('');
        setRating(5);
        fetchReviews();
        setAlert({ show: true, type: 'success', message: 'Review submitted successfully!' });
      } else {
        setAlert({ show: true, type: 'error', message: data.error?.message || 'Failed to submit review' });
      }
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Error submitting review' });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}></i>
    ));
  };

  return (
    <div className="mt-5">
      <h4 className="mb-4">Customer Reviews</h4>

      {/* Write Review */}
      {user && (
        <div className="card mb-4">
          <div className="card-body">
            <h5>Write a Review</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fas fa-star fa-2x me-2 ${star <= rating ? 'text-warning' : 'text-muted'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setRating(star)}
                    ></i>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-warning" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-muted">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-1">{review.user?.name || 'Anonymous'}</h6>
                  <div className="mb-2">{renderStars(review.rating)}</div>
                  <h6 className="fw-bold">{review.title}</h6>
                  <p className="mb-0">{review.comment}</p>
                </div>
                <small className="text-muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))
      )}
      
      <AlertModal 
        show={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </div>
  );
};

export default ProductReviews;
