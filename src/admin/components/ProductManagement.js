import React, { useState, useEffect } from 'react';
import { productAPI, uploadAPI } from '../../utils/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [priceCalc, setPriceCalc] = useState({ original: 0, discount: 0, sale: 0 });

  const calculateSalePrice = (original, discount) => {
    const originalPrice = parseFloat(original) || 0;
    const discountPercent = parseFloat(discount) || 0;
    const salePrice = originalPrice - (originalPrice * discountPercent / 100);
    return Math.round(salePrice);
  };

  const handlePriceChange = () => {
    const original = document.querySelector('[name="originalPrice"]')?.value || 0;
    const discount = document.querySelector('[name="discount"]')?.value || 0;
    const salePrice = calculateSalePrice(original, discount);
    
    const priceInput = document.querySelector('[name="price"]');
    if (priceInput && original > 0) {
      priceInput.value = salePrice;
    }
    setPriceCalc({ original, discount, sale: salePrice });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      console.log('Fetched products:', response.data);
      if (response.data.success) {
        const productsData = response.data.data;
        const productsList = productsData.products || productsData || [];
        setProducts(Array.isArray(productsList) ? productsList : []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const response = await uploadAPI.multiple(files);
      console.log('Upload response:', response.data);
      if (response.data.success) {
        setProductImages([...productImages, ...response.data.urls]);
        alert('Images uploaded successfully!');
      } else {
        alert(response.data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.response?.data?.message || 'Failed to upload images. Check console for details.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setProductImages(product.images || []);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login as admin first');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Delete error:', error);
        console.error('Error response:', error.response?.data);
        alert(error.response?.data?.error?.message || 'Failed to delete product');
      }
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login as admin first');
      return;
    }

    const originalPrice = parseFloat(document.querySelector('[name="originalPrice"]').value) || 0;
    const discount = parseFloat(document.querySelector('[name="discount"]').value) || 0;
    const price = parseFloat(document.querySelector('[name="price"]').value);

    const highlights = document.querySelector('[name="highlights"]').value.split('\n').filter(h => h.trim());
    const whatsInBox = document.querySelector('[name="whatsInBox"]').value.split('\n').filter(w => w.trim());
    const services = document.querySelector('[name="services"]').value.split('\n').filter(s => s.trim());

    const formData = {
      name: document.querySelector('[name="name"]').value,
      category: document.querySelector('[name="category"]').value.toLowerCase(),
      price: price,
      originalPrice: originalPrice > 0 ? originalPrice : undefined,
      discount: discount,
      stock: parseInt(document.querySelector('[name="stock"]').value) || 0,
      description: document.querySelector('[name="description"]').value,
      image: productImages[0] || editProduct?.image || 'https://via.placeholder.com/400',
      images: productImages.length > 0 ? productImages : editProduct?.images || [],
      inStock: document.querySelector('[name="inStock"]').value === 'true',
      featured: document.querySelector('[name="featured"]').value === 'true',
      trending: document.querySelector('[name="trending"]').value === 'true',
      highlights: highlights.length > 0 ? highlights : undefined,
      whatsInBox: whatsInBox.length > 0 ? whatsInBox : undefined,
      services: services.length > 0 ? services : undefined,
      warranty: {
        period: document.querySelector('[name="warrantyPeriod"]').value || '1 Year',
        covered: document.querySelector('[name="warrantyCovered"]').value || 'Manufacturing Defects',
        notCovered: document.querySelector('[name="warrantyNotCovered"]').value || 'Physical Damage'
      },
      videoUrl: document.querySelector('[name="videoUrl"]').value || undefined,
      seller: {
        name: document.querySelector('[name="sellerName"]').value || 'Wing Hobbies Official',
        rating: 4.5,
        yearsInBusiness: 5
      }
    };

    try {
      console.log('Token:', token);
      console.log('Saving product:', formData);
      if (editProduct) {
        await productAPI.update(editProduct._id, formData);
        alert('Product updated successfully!');
      } else {
        const response = await productAPI.create(formData);
        console.log('Create response:', response.data);
        alert('Product created successfully!');
      }
      setShowModal(false);
      setEditProduct(null);
      setProductImages([]);
      await fetchProducts();
    } catch (error) {
      console.error('Save error:', error);
      console.error('Error response:', error.response?.data);
      alert(error.response?.data?.error?.message || 'Failed to save product. Check console.');
    }
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 className="fw-bold mb-0">Product Management</h2>
        <button className="btn btn-warning" onClick={() => { setEditProduct(null); setShowModal(true); }}>
          <i className="fas fa-plus me-2"></i>
          <span className="d-none d-sm-inline">Add New Product</span>
          <span className="d-inline d-sm-none">Add</span>
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="text-center py-4">Loading products...</td></tr>
                ) : products.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-4">No products found. Add your first product!</td></tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="fw-bold">#{product._id?.slice(-6)}</td>
                      <td>
                        <img 
                          src={product.images?.[0] || 'https://via.placeholder.com/50'} 
                          alt={product.name}
                          className="rounded"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        <span className="badge bg-primary">{product.category}</span>
                      </td>
                      <td className="fw-bold text-success">₹{product.price}</td>
                      <td>
                        <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(product)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(product._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {editProduct ? 'Edit Product' : 'Add New Product'}
                </h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Product Name</label>
                      <input type="text" className="form-control" defaultValue={editProduct?.name} name="name" required />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Category</label>
                      <select className="form-select" defaultValue={editProduct?.category} name="category" required>
                        <option value="planes">Planes</option>
                        <option value="helicopters">Helicopters</option>
                        <option value="drones">Drones</option>
                        <option value="cars">Cars</option>
                        <option value="controllers">Controllers</option>
                        <option value="parts">Parts</option>
                        <option value="batteries">Batteries</option>
                        <option value="motors">Motors</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label">Original Price (₹)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        defaultValue={editProduct?.originalPrice} 
                        name="originalPrice" 
                        placeholder="e.g. 15000"
                        onChange={handlePriceChange}
                      />
                      <small className="text-muted">MRP/List price</small>
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label">Sale Price (₹)</label>
                      <input type="number" className="form-control" defaultValue={editProduct?.price} name="price" required />
                      <small className="text-muted">Current price</small>
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label">Discount (%)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        defaultValue={editProduct?.discount || 0} 
                        name="discount" 
                        min="0" 
                        max="100"
                        onChange={handlePriceChange}
                      />
                      <small className="text-muted">Auto-calculates price</small>
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label">Stock Quantity</label>
                      <input type="number" className="form-control" defaultValue={editProduct?.stock || 0} name="stock" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Stock Status</label>
                      <select className="form-select" defaultValue={editProduct?.inStock} name="inStock" required>
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Featured (Today's Deals)</label>
                      <select className="form-select" defaultValue={editProduct?.featured} name="featured">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Trending (Trending Now)</label>
                      <select className="form-select" defaultValue={editProduct?.trending} name="trending">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" defaultValue={editProduct?.description} name="description" required></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Highlights (one per line)</label>
                      <textarea className="form-control" rows="3" defaultValue={editProduct?.highlights?.join('\n')} name="highlights" placeholder="Premium Quality Build\nEasy to Assemble\nDurable Materials"></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">What's in the Box (one per line)</label>
                      <textarea className="form-control" rows="3" defaultValue={editProduct?.whatsInBox?.join('\n')} name="whatsInBox" placeholder="1x Product\n1x Remote Controller\n1x Battery"></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Services (one per line)</label>
                      <textarea className="form-control" rows="2" defaultValue={editProduct?.services?.join('\n')} name="services" placeholder="Cash on Delivery\n7 Days Return\n1 Year Warranty"></textarea>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Warranty Period</label>
                      <input type="text" className="form-control" defaultValue={editProduct?.warranty?.period} name="warrantyPeriod" placeholder="1 Year" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Warranty Covered</label>
                      <input type="text" className="form-control" defaultValue={editProduct?.warranty?.covered} name="warrantyCovered" placeholder="Manufacturing Defects" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Not Covered</label>
                      <input type="text" className="form-control" defaultValue={editProduct?.warranty?.notCovered} name="warrantyNotCovered" placeholder="Physical Damage" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Video URL (YouTube/Vimeo)</label>
                      <input type="url" className="form-control" defaultValue={editProduct?.videoUrl} name="videoUrl" placeholder="https://youtube.com/watch?v=..." />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Seller Name</label>
                      <input type="text" className="form-control" defaultValue={editProduct?.seller?.name} name="sellerName" placeholder="Wing Hobbies Official" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Product Images</label>
                      <input 
                        type="file" 
                        className="form-control mb-3" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        name="images"
                      />
                      {uploading && <p className="text-info">Uploading images...</p>}
                      <div className="row g-2">
                        {productImages.map((img, index) => (
                          <div key={index} className="col-6 col-md-3 position-relative">
                            <img src={img} alt="Product" className="img-fluid rounded" />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                              onClick={() => removeImage(index)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-warning" onClick={handleSave} disabled={uploading}>
                  {uploading ? 'Uploading...' : editProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;