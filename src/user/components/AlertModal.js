import React, { useEffect } from 'react';

const AlertModal = ({ show, type = 'success', title, message, onClose, autoClose = false, duration = 3000 }) => {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, duration, onClose]);

  if (!show) return null;

  const icons = {
    success: { icon: 'fa-check-circle', color: 'success' },
    error: { icon: 'fa-exclamation-circle', color: 'danger' },
    warning: { icon: 'fa-exclamation-triangle', color: 'warning' },
    info: { icon: 'fa-info-circle', color: 'info' }
  };

  const { icon, color } = icons[type] || icons.info;

  return (
    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999}} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-body text-center p-4">
            <i className={`fas ${icon} text-${color} mb-3`} style={{fontSize: '3rem'}}></i>
            {title && <h5 className="fw-bold mb-2">{title}</h5>}
            <p className="mb-0">{message}</p>
          </div>
          <div className="modal-footer border-0 justify-content-center">
            <button className={`btn btn-${color}`} onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
