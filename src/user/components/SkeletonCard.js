import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="skeleton skeleton-img" style={{ height: '200px' }}></div>
      <div className="card-body">
        <div className="skeleton skeleton-text mb-2" style={{ width: '80%', height: '20px' }}></div>
        <div className="skeleton skeleton-text mb-2" style={{ width: '60%', height: '16px' }}></div>
        <div className="skeleton skeleton-text mb-3" style={{ width: '40%', height: '24px' }}></div>
        <div className="skeleton skeleton-button" style={{ width: '100%', height: '38px' }}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
