import React, { useState, useEffect } from 'react';
import { requestNotificationPermission, onMessageListener } from '../../utils/notifications';

const NotificationPrompt = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const hasAsked = localStorage.getItem('notificationAsked');
    if (!hasAsked && 'Notification' in window) {
      setTimeout(() => setShow(true), 5000);
    }

    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body
        });
        setTimeout(() => setNotification(null), 5000);
      })
      .catch((err) => console.log('Notification error:', err));
  }, []);

  const handleEnable = async () => {
    await requestNotificationPermission();
    localStorage.setItem('notificationAsked', 'true');
    setShow(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('notificationAsked', 'true');
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 9999 }}>
          <div className="card shadow-lg border-warning" style={{ width: '300px' }}>
            <div className="card-body">
              <h6 className="fw-bold"><i className="fas fa-bell text-warning me-2"></i>Enable Notifications</h6>
              <p className="small mb-3">Get updates on orders, offers & new products!</p>
              <div className="d-flex gap-2">
                <button className="btn btn-warning btn-sm flex-grow-1" onClick={handleEnable}>
                  Enable
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={handleDismiss}>
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className="position-fixed top-0 end-0 m-3" style={{ zIndex: 9999 }}>
          <div className="card shadow-lg border-success" style={{ width: '300px' }}>
            <div className="card-body">
              <h6 className="fw-bold">{notification.title}</h6>
              <p className="small mb-0">{notification.body}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationPrompt;
