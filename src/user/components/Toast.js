import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-warning';
  const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';

  return (
    <div 
      className="position-fixed top-0 start-50 translate-middle-x mt-3 animate__animated animate__fadeInDown"
      style={{ zIndex: 9999, minWidth: '300px' }}
    >
      <div className={`alert ${bgColor} text-white shadow-lg d-flex align-items-center justify-content-between mb-0`}>
        <div>
          <i className={`fas ${icon} me-2`}></i>
          <strong>{message}</strong>
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Toast;
