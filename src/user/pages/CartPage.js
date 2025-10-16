import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-shopping-cart display-1 text-warning mb-4"></i>
        <h2 className="fw-bold mb-3">Your Cart is Empty</h2>
        <p className="text-muted mb-4">Add some RC models to get started!</p>
        <Link to="/" className="btn btn-warning btn-lg fw-bold">
          <i className="fas fa-arrow-left me-2"></i>Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="bg-light py-5">
      <div className="container">
        <h1 className="fw-bold mb-4">
          Shopping <span className="text-warning">Cart</span>
        </h1>
        
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th className="py-3">Product</th>
                        <th className="py-3">Price</th>
                        <th className="py-3">Quantity</th>
                        <th className="py-3">Total</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="rounded me-3"
                                style={{width: '80px', height: '80px', objectFit: 'cover'}}
                              />
                              <div>
                                <h6 className="mb-1 fw-bold">{item.name}</h6>
                                <small className="text-muted">Model #{item.id}</small>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 align-middle">
                            <span className="fw-bold text-warning">₹{item.price.toLocaleString()}</span>
                          </td>
                          <td className="py-3 align-middle">
                            <div className="input-group" style={{width: '130px'}}>
                              <button 
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <input 
                                type="text" 
                                className="form-control form-control-sm text-center fw-bold"
                                value={item.quantity}
                                readOnly
                              />
                              <button 
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="py-3 align-middle">
                            <span className="fw-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </td>
                          <td className="py-3 align-middle">
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Link to="/" className="btn btn-outline-dark">
                <i className="fas fa-arrow-left me-2"></i>Continue Shopping
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-warning border-2 shadow-sm sticky-top" style={{top: '100px'}}>
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-receipt me-2 text-warning"></i>Order Summary
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="fw-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    <span className="fw-bold">₹{shipping}</span>
                  )}
                </div>
                {subtotal < 999 && (
                  <div className="alert alert-warning py-2 px-3 small">
                    <i className="fas fa-info-circle me-1"></i>
                    Add ₹{(999 - subtotal).toLocaleString()} more for FREE shipping!
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="fw-bold">Total</h5>
                  <h5 className="fw-bold text-warning">₹{total.toLocaleString()}</h5>
                </div>
                <Link to="/checkout" className="btn btn-warning w-100 fw-bold py-3">
                  <i className="fas fa-lock me-2"></i>Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
