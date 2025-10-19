import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productAPI } from '../../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchSimilarProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getOne(id);
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await productAPI.getAll({ limit: 4 });
      if (response.data.success) {
        setSimilarProducts(response.data.data.products || response.data.data);
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  const checkPincode = () => {
    if (pincode.length === 6) {
      setDeliveryInfo({
        available: true,
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        charge: product.price > 500 ? 0 : 40
      });
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} at Wing Hobbies`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`
    };
    window.open(shareUrls[platform], '_blank');
  };

  if (loading) return <div className="container py-5 text-center"><div className="spinner-border text-warning"></div></div>;
  if (!product) return <div className="container py-5"><h3>Product not found</h3></div>;

  const images = product.images || [product.image];

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
          <li className="breadcrumb-item"><Link to={`/products?category=${product.category}`}>{product.category}</Link></li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Left: Images */}
        <div className="col-lg-5">
          <div style={{position: 'relative'}}>
            <div className="position-relative mb-3">
              <div className="card border-0 shadow-sm overflow-hidden">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name} 
                  className="card-img-top hover-zoom" 
                  style={{ height: '450px', objectFit: 'cover' }} 
                />
                {product.discount > 0 && (
                  <span className="position-absolute top-0 end-0 m-3 badge bg-danger fs-6">{product.discount}% OFF</span>
                )}
                {product.stock < 10 && product.stock > 0 && (
                  <span className="position-absolute top-0 start-0 m-3 badge bg-warning text-dark">Only {product.stock} left!</span>
                )}
              </div>
              <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
                <button className="btn btn-light btn-sm" onClick={() => handleShare('facebook')}><i className="fab fa-facebook"></i></button>
                <button className="btn btn-light btn-sm" onClick={() => handleShare('twitter')}><i className="fab fa-twitter"></i></button>
                <button className="btn btn-light btn-sm" onClick={() => handleShare('whatsapp')}><i className="fab fa-whatsapp"></i></button>
              </div>
            </div>
            <div className="row g-2">
              {images.map((img, idx) => (
                <div key={idx} className="col-3">
                  <img 
                    src={img} 
                    alt={`${product.name} ${idx + 1}`}
                    className={`img-fluid rounded cursor-pointer border ${selectedImage === idx ? 'border-warning border-3 shadow' : 'border-light'}`}
                    onClick={() => setSelectedImage(idx)}
                    style={{ cursor: 'pointer', height: '80px', objectFit: 'cover', transition: 'all 0.3s' }}
                  />
                </div>
              ))}
              {product.videoUrl && (
                <div className="col-3">
                  <div 
                    className="bg-dark text-white rounded d-flex align-items-center justify-content-center cursor-pointer border border-light"
                    style={{ cursor: 'pointer', height: '80px' }}
                    data-bs-toggle="modal"
                    data-bs-target="#videoModal"
                  >
                    <i className="fas fa-play-circle fs-2"></i>
                  </div>
                </div>
              )}
            </div>
            
            {/* Video Modal */}
            {product.videoUrl && (
              <div className="modal fade" id="videoModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Product Video</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body p-0">
                      <div className="ratio ratio-16x9">
                        <iframe 
                          src={product.videoUrl.replace('watch?v=', 'embed/')} 
                          title="Product Video" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="col-lg-7">
          {/* Title & Badges */}
          <div className="mb-2">
            <span className="badge bg-light text-dark border me-2">{product.category}</span>
            {product.stock > 0 ? (
              <span className="badge bg-success">In Stock</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
            <span className="badge bg-warning text-dark ms-2"><i className="fas fa-certificate me-1"></i>Assured Quality</span>
          </div>
          
          <h1 className="fw-bold mb-3">{product.name}</h1>
          
          {/* Rating */}
          <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
            <div className="bg-success text-white px-2 py-1 rounded me-2">
              <span className="fw-bold">{product.rating || 4.5}</span> <i className="fas fa-star"></i>
            </div>
            <span className="text-muted">{product.reviews || 128} Ratings & {Math.floor((product.reviews || 128) * 0.8)} Reviews</span>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <div className="d-flex align-items-baseline gap-3 mb-2">
              <h2 className="text-dark fw-bold mb-0">₹{product.price?.toLocaleString()}</h2>
              {product.originalPrice && (
                <>
                  <h5 className="text-muted text-decoration-line-through mb-0">₹{product.originalPrice.toLocaleString()}</h5>
                  <span className="badge bg-success fs-6">{product.discount}% off</span>
                </>
              )}
            </div>
            <small className="text-success fw-bold">+ ₹{Math.floor(product.price * 0.05)} SuperCoins</small>
            <br />
            <small className="text-muted">inclusive of all taxes</small>
          </div>

          {/* Offers */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h6 className="mb-0"><i className="fas fa-tags text-warning me-2"></i>Available Offers</h6>
            </div>
            <div className="card-body">
              <div className="mb-2"><i className="fas fa-percent text-success me-2"></i><strong>Bank Offer:</strong> 10% instant discount on HDFC Bank Credit Cards</div>
              <div className="mb-2"><i className="fas fa-percent text-success me-2"></i><strong>Bank Offer:</strong> 5% Cashback on Axis Bank Credit Card</div>
              <div className="mb-2"><i className="fas fa-gift text-success me-2"></i><strong>Special Offer:</strong> Get extra ₹500 off on orders above ₹5000</div>
              <div><i className="fas fa-exchange-alt text-success me-2"></i><strong>Exchange Offer:</strong> Up to ₹{Math.floor(product.price * 0.3)} off on exchange</div>
            </div>
          </div>

          {/* EMI Options */}
          <div className="alert alert-info mb-4">
            <i className="fas fa-credit-card me-2"></i>
            <strong>EMI starting from ₹{Math.floor(product.price / 6)}/month.</strong> <a href="#" className="alert-link">View Plans</a>
          </div>

          {/* Delivery Check */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3"><i className="fas fa-map-marker-alt text-danger me-2"></i>Delivery</h6>
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter Delivery Pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
                <button className="btn btn-outline-warning" onClick={checkPincode}>Check</button>
              </div>
              {deliveryInfo && (
                <div className="text-success">
                  <i className="fas fa-check-circle me-2"></i>
                  Delivery by <strong>{deliveryInfo.date}</strong> | 
                  {deliveryInfo.charge === 0 ? ' Free Delivery' : ` ₹${deliveryInfo.charge}`}
                </div>
              )}
            </div>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Highlights</h6>
              <ul className="list-unstyled">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>{highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Services */}
          {product.services && product.services.length > 0 && (
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Services</h6>
              <div className="row g-2">
                {product.services.map((service, idx) => (
                  <div key={idx} className="col-6">
                    <i className="fas fa-check text-success me-2"></i>{service}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seller Info */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-2">Seller</h6>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{product.seller?.name || 'Wing Hobbies Official'}</strong>
                  <div className="text-muted small">
                    <span className="badge bg-success me-2">{product.seller?.rating || 4.5}★</span>
                    {product.seller?.yearsInBusiness || 5} years in business
                  </div>
                </div>
                <button className="btn btn-sm btn-outline-primary">View Shop</button>
              </div>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="mb-4">
            <label className="form-label fw-bold">Quantity:</label>
            <div className="input-group mb-3" style={{ width: '150px' }}>
              <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <i className="fas fa-minus"></i>
              </button>
              <input type="text" className="form-control text-center fw-bold" value={quantity} readOnly />
              <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="d-flex gap-3 mb-4">
            <button 
              className="btn btn-warning btn-lg flex-grow-1" 
              onClick={() => addToCart({ ...product, quantity })}
              disabled={product.stock === 0}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              ADD TO CART
            </button>
            <button className="btn btn-danger btn-lg flex-grow-1" disabled={product.stock === 0}>
              <i className="fas fa-bolt me-2"></i>
              BUY NOW
            </button>
            <button className="btn btn-outline-secondary btn-lg">
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="row mt-5">
        <div className="col-12">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>
                Description
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'specifications' ? 'active' : ''}`} onClick={() => setActiveTab('specifications')}>
                Specifications
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
                Ratings & Reviews
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'qna' ? 'active' : ''}`} onClick={() => setActiveTab('qna')}>
                Questions & Answers
              </button>
            </li>
          </ul>

          <div className="tab-content p-4 border border-top-0 bg-white">
            {activeTab === 'description' && (
              <div>
                <h5 className="fw-bold mb-3">Product Description</h5>
                <p className="text-muted">
                  {showFullDesc ? (product.description || 'Experience the thrill of RC flying with this premium quality model. Perfect for both beginners and experienced pilots. This product features state-of-the-art technology combined with durable construction to ensure long-lasting performance. Whether you\'re just starting out or you\'re a seasoned enthusiast, this model offers the perfect balance of ease of use and advanced features.') : (product.description?.substring(0, 200) || 'Experience the thrill of RC flying with this premium quality model. Perfect for both beginners and experienced pilots...')}
                </p>
                {!showFullDesc && (
                  <button className="btn btn-link p-0 text-warning" onClick={() => setShowFullDesc(true)}>Read More</button>
                )}
                {showFullDesc && (
                  <button className="btn btn-link p-0 text-warning" onClick={() => setShowFullDesc(false)}>Show Less</button>
                )}
                <h6 className="fw-bold mt-4 mb-3">What's in the Box:</h6>
                {product.whatsInBox && product.whatsInBox.length > 0 ? (
                  <ul>
                    {product.whatsInBox.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                ) : (
                  <ul>
                    <li>1x {product.name}</li>
                    <li>1x Remote Controller</li>
                    <li>1x Rechargeable Battery</li>
                    <li>1x USB Charger</li>
                    <li>1x User Manual</li>
                  </ul>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h5 className="fw-bold mb-3">Specifications</h5>
                <h6 className="fw-bold mt-4 mb-3">General</h6>
                <table className="table table-bordered">
                  <tbody>
                    <tr><td className="fw-bold" style={{width: '30%'}}>Brand</td><td>Wing Hobbies</td></tr>
                    <tr><td className="fw-bold">Model Name</td><td>{product.name}</td></tr>
                    <tr><td className="fw-bold">Category</td><td>{product.category}</td></tr>
                    <tr><td className="fw-bold">Color</td><td>As per image</td></tr>
                  </tbody>
                </table>
                <h6 className="fw-bold mt-4 mb-3">Features</h6>
                <table className="table table-bordered">
                  <tbody>
                    <tr><td className="fw-bold" style={{width: '30%'}}>Material</td><td>High-grade plastic & metal</td></tr>
                    <tr><td className="fw-bold">Battery</td><td>Rechargeable Li-Po</td></tr>
                    <tr><td className="fw-bold">Control Range</td><td>Up to 100 meters</td></tr>
                    <tr><td className="fw-bold">Suitable For</td><td>Beginners & Professionals</td></tr>
                  </tbody>
                </table>
                {product.warranty && (
                  <>
                    <h6 className="fw-bold mt-4 mb-3">Warranty</h6>
                    <table className="table table-bordered">
                      <tbody>
                        <tr><td className="fw-bold" style={{width: '30%'}}>Warranty</td><td>{product.warranty.period || '1 Year Manufacturer Warranty'}</td></tr>
                        <tr><td className="fw-bold">Covered in Warranty</td><td>{product.warranty.covered || 'Manufacturing Defects'}</td></tr>
                        <tr><td className="fw-bold">Not Covered</td><td>{product.warranty.notCovered || 'Physical Damage'}</td></tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="text-center p-4 border rounded">
                      <h1 className="display-3 fw-bold mb-0">{product.rating || 4.5}<i className="fas fa-star text-warning fs-4"></i></h1>
                      <p className="text-muted mb-0">{product.reviews || 128} Ratings &<br/>{Math.floor((product.reviews || 128) * 0.8)} Reviews</p>
                    </div>
                  </div>
                  <div className="col-md-9">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="d-flex align-items-center mb-2">
                        <span className="me-2" style={{width: '60px'}}>{star} <i className="fas fa-star text-warning"></i></span>
                        <div className="progress flex-grow-1 me-2" style={{height: '10px'}}>
                          <div className="progress-bar bg-success" style={{width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%`}}></div>
                        </div>
                        <span className="text-muted" style={{width: '50px'}}>{star === 5 ? 90 : star === 4 ? 26 : star === 3 ? 9 : star === 2 ? 2 : 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <button className="btn btn-sm btn-outline-secondary me-2">All Reviews</button>
                  <button className="btn btn-sm btn-outline-secondary me-2">Positive</button>
                  <button className="btn btn-sm btn-outline-secondary me-2">Negative</button>
                  <button className="btn btn-sm btn-outline-secondary">Recent</button>
                </div>

                <hr />

                {[
                  { name: 'Rajesh Kumar', rating: 5, date: '2 days ago', review: 'Excellent product! Great quality and fast delivery. Highly recommended for RC enthusiasts.', helpful: 12 },
                  { name: 'Amit Sharma', rating: 4, date: '1 week ago', review: 'Good value for money. Build quality is solid. Minor assembly required but instructions are clear.', helpful: 8 },
                  { name: 'Priya Singh', rating: 5, date: '2 weeks ago', review: 'Amazing experience! My son loves it. Very durable and easy to control.', helpful: 15 }
                ].map((review, idx) => (
                  <div key={idx} className="mb-4 pb-4 border-bottom">
                    <div className="d-flex mb-2">
                      <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                        <span className="fw-bold">{review.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="mb-0">{review.name}</h6>
                            <div className="text-warning small">
                              {[...Array(review.rating)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                              {[...Array(5 - review.rating)].map((_, i) => <i key={i} className="far fa-star"></i>)}
                            </div>
                          </div>
                          <small className="text-muted">{review.date}</small>
                        </div>
                        <p className="mt-2 mb-2">{review.review}</p>
                        <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-thumbs-up me-1"></i>Helpful ({review.helpful})</button>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="btn btn-outline-warning">Load More Reviews</button>
              </div>
            )}

            {activeTab === 'qna' && (
              <div>
                <h5 className="fw-bold mb-4">Questions & Answers</h5>
                <div className="mb-4">
                  <button className="btn btn-warning">Ask a Question</button>
                </div>
                {[
                  { q: 'Is battery included?', a: 'Yes, rechargeable battery and charger are included in the box.', date: '3 days ago' },
                  { q: 'What is the warranty period?', a: '1 year manufacturer warranty against manufacturing defects.', date: '1 week ago' }
                ].map((qa, idx) => (
                  <div key={idx} className="mb-4 pb-4 border-bottom">
                    <div className="mb-2">
                      <strong>Q:</strong> {qa.q}
                      <small className="text-muted ms-2">- {qa.date}</small>
                    </div>
                    <div className="ms-4">
                      <strong>A:</strong> {qa.a}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-bold mb-4">Similar Products You Might Like</h4>
          <div className="row g-3">
            {similarProducts.slice(0, 4).map((item) => (
              <div key={item._id} className="col-6 col-md-3">
                <Link to={`/product/${item._id}`} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-lift">
                    <img src={item.images?.[0] || item.image} alt={item.name} className="card-img-top" style={{height: '200px', objectFit: 'cover'}} />
                    <div className="card-body">
                      <h6 className="card-title text-truncate">{item.name}</h6>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-dark">₹{item.price?.toLocaleString()}</span>
                        {item.originalPrice && (
                          <small className="text-muted text-decoration-line-through">₹{item.originalPrice.toLocaleString()}</small>
                        )}
                      </div>
                      <div className="text-warning small mt-1">
                        <i className="fas fa-star"></i> {item.rating || 4.5}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
