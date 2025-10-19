import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onToggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm" style={{ height: '60px' }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary d-lg-none" onClick={onToggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <span className="navbar-text">
            <i className="fas fa-user-shield me-2 d-none d-md-inline"></i>
            <span className="d-none d-sm-inline">Admin Panel</span>
            <span className="d-inline d-sm-none">Admin</span>
          </span>
        </div>
        <div className="d-flex align-items-center gap-2 gap-md-3">
          <Link to="/" className="btn btn-sm btn-outline-primary">
            <i className="fas fa-home"></i>
            <span className="d-none d-md-inline ms-1">View Site</span>
          </Link>
          <div className="dropdown">
            <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
              <i className="fas fa-user-circle"></i>
              <span className="d-none d-md-inline ms-1">Admin</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/admin/settings"><i className="fas fa-cog me-2"></i>Settings</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;