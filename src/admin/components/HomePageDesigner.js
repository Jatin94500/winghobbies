import React, { useState, useEffect } from 'react';
import { productAPI } from '../../utils/api';

const HomePageDesigner = () => {
  const [products, setProducts] = useState([]);
  const [config, setConfig] = useState({
    banner: {
      title: 'Wing Hobbies - Premium RC Models',
      subtitle: 'Discover the world of RC flying with professional grade models',
      image: 'https://picsum.photos/1200/400?random=40',
      buttonText: 'Shop Now'
    },
    featuredProducts: {
      enabled: true,
      title: 'Featured Products',
      count: 8,
      selectedProducts: []
    },
    specialOffers: {
      enabled: true,
      title: 'Special Offers',
      offers: [
        { title: 'RC Planes', discount: '30% OFF', image: 'https://picsum.photos/400/300?random=1' },
        { title: 'Drones', discount: '25% OFF', image: 'https://picsum.photos/400/300?random=2' },
        { title: 'RC Cars', discount: '20% OFF', image: 'https://picsum.photos/400/300?random=3' }
      ]
    },
    megaSale: {
      enabled: true,
      title: 'MEGA SALE',
      discount: 'UP TO 50% OFF',
      description: 'Limited time offer on selected RC models',
      image: 'https://picsum.photos/600/400?random=10'
    }
  });
  const [activeTab, setActiveTab] = useState('banner');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
    loadConfig();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const loadConfig = () => {
    const saved = localStorage.getItem('homePageConfig');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  };

  const saveConfig = () => {
    localStorage.setItem('homePageConfig', JSON.stringify(config));
    setMessage('Homepage design saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const updateBanner = (field, value) => {
    setConfig({ ...config, banner: { ...config.banner, [field]: value } });
  };

  const updateFeaturedProducts = (field, value) => {
    setConfig({ ...config, featuredProducts: { ...config.featuredProducts, [field]: value } });
  };

  const toggleProductSelection = (productId) => {
    const selected = config.featuredProducts.selectedProducts;
    const newSelected = selected.includes(productId)
      ? selected.filter(id => id !== productId)
      : [...selected, productId];
    updateFeaturedProducts('selectedProducts', newSelected);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Home Page Designer</h2>
        <button className="btn btn-success" onClick={saveConfig}>
          <i className="fas fa-save me-2"></i>Save Changes
        </button>
      </div>

      {message && (
        <div className="alert alert-success alert-dismissible fade show">
          {message}
        </div>
      )}

      <div className="row">
        {/* Tabs */}
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'banner' ? 'active' : ''}`}
              onClick={() => setActiveTab('banner')}
            >
              <i className="fas fa-image me-2"></i>Hero Banner
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'featured' ? 'active' : ''}`}
              onClick={() => setActiveTab('featured')}
            >
              <i className="fas fa-star me-2"></i>Featured Products
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveTab('offers')}
            >
              <i className="fas fa-tags me-2"></i>Special Offers
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeTab === 'megasale' ? 'active' : ''}`}
              onClick={() => setActiveTab('megasale')}
            >
              <i className="fas fa-fire me-2"></i>Mega Sale Banner
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              {/* Banner Settings */}
              {activeTab === 'banner' && (
                <div>
                  <h4 className="mb-4">Hero Banner Settings</h4>
                  <div className="mb-3">
                    <label className="form-label">Banner Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.banner.title}
                      onChange={(e) => updateBanner('title', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subtitle</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.banner.subtitle}
                      onChange={(e) => updateBanner('subtitle', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Banner Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.banner.image}
                      onChange={(e) => updateBanner('image', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Button Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.banner.buttonText}
                      onChange={(e) => updateBanner('buttonText', e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <h5>Preview:</h5>
                    <div className="border rounded p-3" style={{ backgroundImage: `url(${config.banner.image})`, backgroundSize: 'cover', minHeight: '200px' }}>
                      <div className="bg-dark bg-opacity-50 text-white p-4 rounded">
                        <h2>{config.banner.title}</h2>
                        <p>{config.banner.subtitle}</p>
                        <button className="btn btn-warning">{config.banner.buttonText}</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Featured Products */}
              {activeTab === 'featured' && (
                <div>
                  <h4 className="mb-4">Featured Products Section</h4>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={config.featuredProducts.enabled}
                      onChange={(e) => updateFeaturedProducts('enabled', e.target.checked)}
                    />
                    <label className="form-check-label">Show Featured Products Section</label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Section Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.featuredProducts.title}
                      onChange={(e) => updateFeaturedProducts('title', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Number of Products to Show</label>
                    <input
                      type="number"
                      className="form-control"
                      value={config.featuredProducts.count}
                      onChange={(e) => updateFeaturedProducts('count', parseInt(e.target.value))}
                      min="4"
                      max="12"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Featured Products (Optional - leave empty for automatic)</label>
                    <div className="row g-2 mt-2">
                      {products.slice(0, 12).map(product => (
                        <div key={product._id} className="col-md-4">
                          <div
                            className={`card ${config.featuredProducts.selectedProducts.includes(product._id) ? 'border-success' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleProductSelection(product._id)}
                          >
                            <img src={product.images?.[0]} className="card-img-top" alt={product.name} style={{ height: '100px', objectFit: 'cover' }} />
                            <div className="card-body p-2">
                              <small className="text-truncate d-block">{product.name}</small>
                              <small className="text-warning">₹{product.price}</small>
                              {config.featuredProducts.selectedProducts.includes(product._id) && (
                                <i className="fas fa-check-circle text-success float-end"></i>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Special Offers */}
              {activeTab === 'offers' && (
                <div>
                  <h4 className="mb-4">Special Offers Section</h4>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={config.specialOffers.enabled}
                      onChange={(e) => setConfig({ ...config, specialOffers: { ...config.specialOffers, enabled: e.target.checked } })}
                    />
                    <label className="form-check-label">Show Special Offers Section</label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Section Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.specialOffers.title}
                      onChange={(e) => setConfig({ ...config, specialOffers: { ...config.specialOffers, title: e.target.value } })}
                    />
                  </div>
                  {config.specialOffers.offers.map((offer, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <h6>Offer {index + 1}</h6>
                        <div className="row g-2">
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Title"
                              value={offer.title}
                              onChange={(e) => {
                                const newOffers = [...config.specialOffers.offers];
                                newOffers[index].title = e.target.value;
                                setConfig({ ...config, specialOffers: { ...config.specialOffers, offers: newOffers } });
                              }}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Discount"
                              value={offer.discount}
                              onChange={(e) => {
                                const newOffers = [...config.specialOffers.offers];
                                newOffers[index].discount = e.target.value;
                                setConfig({ ...config, specialOffers: { ...config.specialOffers, offers: newOffers } });
                              }}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Image URL"
                              value={offer.image}
                              onChange={(e) => {
                                const newOffers = [...config.specialOffers.offers];
                                newOffers[index].image = e.target.value;
                                setConfig({ ...config, specialOffers: { ...config.specialOffers, offers: newOffers } });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mega Sale */}
              {activeTab === 'megasale' && (
                <div>
                  <h4 className="mb-4">Mega Sale Banner</h4>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={config.megaSale.enabled}
                      onChange={(e) => setConfig({ ...config, megaSale: { ...config.megaSale, enabled: e.target.checked } })}
                    />
                    <label className="form-check-label">Show Mega Sale Banner</label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.megaSale.title}
                      onChange={(e) => setConfig({ ...config, megaSale: { ...config.megaSale, title: e.target.value } })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Discount Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.megaSale.discount}
                      onChange={(e) => setConfig({ ...config, megaSale: { ...config.megaSale, discount: e.target.value } })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={config.megaSale.description}
                      onChange={(e) => setConfig({ ...config, megaSale: { ...config.megaSale, description: e.target.value } })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Banner Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={config.megaSale.image}
                      onChange={(e) => setConfig({ ...config, megaSale: { ...config.megaSale, image: e.target.value } })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageDesigner;
