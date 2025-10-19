import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/categories/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const formData = {
      name: document.querySelector('[name="name"]').value,
      icon: document.querySelector('[name="icon"]').value,
      description: document.querySelector('[name="description"]').value,
      enabled: document.querySelector('[name="enabled"]').value === 'true'
    };

    try {
      if (editCategory) {
        await axios.put(`http://localhost:5000/api/categories/${editCategory._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Category updated!');
      } else {
        await axios.post('http://localhost:5000/api/categories', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Category created!');
      }
      setShowModal(false);
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.error?.message || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Deleted!');
        fetchCategories();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Category Management</h2>
        <button className="btn btn-warning" onClick={() => { setEditCategory(null); setShowModal(true); }}>
          <i className="fas fa-plus me-2"></i>Add Category
        </button>
      </div>

      <div className="row g-3">
        {loading ? (
          <div className="col-12 text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : categories.length === 0 ? (
          <div className="col-12 text-center py-5 text-muted">No categories yet</div>
        ) : categories.map((category) => (
          <div key={category._id} className="col-md-3 col-6">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <i className={`${category.icon || 'fas fa-tag'} fs-2 text-warning mb-2`}></i>
                <h6 className="mb-1">{category.name}</h6>
                <small className="text-muted d-block mb-2">{category.slug}</small>
                <span className={`badge ${category.enabled ? 'bg-success' : 'bg-secondary'} mb-2`}>
                  {category.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => { setEditCategory(category); setShowModal(true); }}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(category._id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editCategory ? 'Edit' : 'Add'} Category</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" defaultValue={editCategory?.name} placeholder="Drones" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Icon (FontAwesome)</label>
                  <input type="text" className="form-control" name="icon" defaultValue={editCategory?.icon} placeholder="fas fa-plane" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" defaultValue={editCategory?.description} rows="2"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="enabled" defaultValue={editCategory?.enabled}>
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-warning" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
