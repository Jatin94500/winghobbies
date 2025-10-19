import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { uploadAPI } from '../../utils/api';

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/banners/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBanners(response.data.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadAPI.single(file);
      if (response.data.success) {
        setImageUrl(response.data.url);
        alert('Image uploaded!');
      }
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const formData = {
      title: document.querySelector('[name="title"]').value,
      subtitle: document.querySelector('[name="subtitle"]').value,
      description: document.querySelector('[name="description"]').value,
      image: imageUrl || editBanner?.image,
      link: document.querySelector('[name="link"]').value,
      buttonText: document.querySelector('[name="buttonText"]').value,
      backgroundColor: document.querySelector('[name="backgroundColor"]').value,
      textColor: document.querySelector('[name="textColor"]').value,
      position: document.querySelector('[name="position"]').value,
      order: parseInt(document.querySelector('[name="order"]').value) || 0,
      enabled: document.querySelector('[name="enabled"]').value === 'true'
    };

    try {
      if (editBanner) {
        await axios.put(`http://localhost:5000/api/banners/${editBanner._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Banner updated!');
      } else {
        await axios.post('http://localhost:5000/api/banners', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Banner created!');
      }
      setShowModal(false);
      setEditBanner(null);
      setImageUrl('');
      fetchBanners();
    } catch (error) {
      alert(error.response?.data?.error?.message || 'Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this banner?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/banners/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Deleted!');
        fetchBanners();
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Banner Management</h2>
        <button className="btn btn-warning" onClick={() => { setEditBanner(null); setImageUrl(''); setShowModal(true); }}>
          <i className="fas fa-plus me-2"></i>Add Banner
        </button>
      </div>

      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5"><div className="spinner-border text-warning"></div></div>
        ) : banners.length === 0 ? (
          <div className="col-12 text-center py-5 text-muted">No banners yet</div>
        ) : banners.map((banner) => (
          <div key={banner._id} className="col-md-6">
            <div className="card shadow-sm">
              <div className="position-relative" style={{ height: '200px', background: banner.backgroundColor }}>
                <img src={banner.image} alt={banner.title} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.3)', color: banner.textColor }}>
                  <div className="text-center">
                    <h3>{banner.title}</h3>
                    <p>{banner.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className={`badge ${banner.enabled ? 'bg-success' : 'bg-secondary'}`}>
                    {banner.enabled ? 'Active' : 'Inactive'}
                  </span>
                  <span className="badge bg-info">{banner.position}</span>
                </div>
                <p className="text-muted small mb-2">{banner.description}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary flex-grow-1" onClick={() => { setEditBanner(banner); setImageUrl(banner.image); setShowModal(true); }}>
                    <i className="fas fa-edit me-1"></i>Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(banner._id)}>
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
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editBanner ? 'Edit' : 'Add'} Banner</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" defaultValue={editBanner?.title} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Subtitle</label>
                    <input type="text" className="form-control" name="subtitle" defaultValue={editBanner?.subtitle} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" defaultValue={editBanner?.description} rows="2"></textarea>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Banner Image</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    {uploading && <small className="text-info">Uploading...</small>}
                    {imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mt-2 rounded" style={{ maxHeight: '150px' }} />}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Link URL</label>
                    <input type="url" className="form-control" name="link" defaultValue={editBanner?.link} placeholder="/products" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Button Text</label>
                    <input type="text" className="form-control" name="buttonText" defaultValue={editBanner?.buttonText} placeholder="Shop Now" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Background Color</label>
                    <input type="color" className="form-control" name="backgroundColor" defaultValue={editBanner?.backgroundColor || '#ffc107'} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Text Color</label>
                    <input type="color" className="form-control" name="textColor" defaultValue={editBanner?.textColor || '#000000'} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Position</label>
                    <select className="form-select" name="position" defaultValue={editBanner?.position}>
                      <option value="hero">Hero</option>
                      <option value="middle">Middle</option>
                      <option value="bottom">Bottom</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Display Order</label>
                    <input type="number" className="form-control" name="order" defaultValue={editBanner?.order || 0} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="enabled" defaultValue={editBanner?.enabled}>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-warning" onClick={handleSave} disabled={uploading}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;
