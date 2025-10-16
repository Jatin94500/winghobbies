import React from 'react';

const ShippingPolicyPage = () => {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Shipping & Delivery <span className="text-warning">Policy</span></h1>
          <p className="text-muted">Last updated: January 2025</p>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-5">
            <h4 className="fw-bold mb-3"><i className="fas fa-shipping-fast text-warning me-2"></i>Shipping Information</h4>
            <p>At Wing Hobbies, we strive to deliver your RC models and accessories as quickly and safely as possible.</p>
            
            <h5 className="fw-bold mt-4 mb-3">Delivery Timeline</h5>
            <ul>
              <li><strong>Standard Shipping:</strong> 3-5 business days</li>
              <li><strong>Express Shipping:</strong> 1-2 business days</li>
              <li><strong>Same Day Delivery:</strong> Available in select cities (order before 12 PM)</li>
            </ul>

            <h5 className="fw-bold mt-4 mb-3">Shipping Charges</h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Order Value</th>
                    <th>Standard Shipping</th>
                    <th>Express Shipping</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Below ₹999</td>
                    <td>₹99</td>
                    <td>₹199</td>
                  </tr>
                  <tr>
                    <td>₹999 and above</td>
                    <td className="text-success fw-bold">FREE</td>
                    <td>₹150</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="fw-bold mt-4 mb-3">Order Tracking</h5>
            <p>Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order in real-time through our website or the courier partner's website.</p>

            <h5 className="fw-bold mt-4 mb-3">Delivery Areas</h5>
            <p>We currently deliver to all serviceable pin codes across India. International shipping is not available at this time.</p>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-5">
            <h4 className="fw-bold mb-3"><i className="fas fa-undo text-warning me-2"></i>Return & Refund Policy</h4>
            
            <h5 className="fw-bold mt-4 mb-3">7-Day Replacement Policy</h5>
            <p>We offer a 7-day replacement policy for defective or damaged products. To be eligible for a return:</p>
            <ul>
              <li>Product must be unused and in original packaging</li>
              <li>All accessories and manuals must be included</li>
              <li>Request must be made within 7 days of delivery</li>
            </ul>

            <h5 className="fw-bold mt-4 mb-3">Non-Returnable Items</h5>
            <ul>
              <li>Products damaged due to misuse or mishandling</li>
              <li>Items without original packaging or tags</li>
              <li>Clearance or sale items (unless defective)</li>
            </ul>

            <h5 className="fw-bold mt-4 mb-3">Refund Process</h5>
            <p>Once we receive and inspect the returned item, we will process your refund within 5-7 business days. The refund will be credited to your original payment method.</p>

            <h5 className="fw-bold mt-4 mb-3">How to Return</h5>
            <ol>
              <li>Contact our support team at support@Winghobbies.com</li>
              <li>Provide your order number and reason for return</li>
              <li>We will arrange a pickup from your address</li>
              <li>Pack the item securely in original packaging</li>
            </ol>
          </div>
        </div>

        <div className="alert alert-warning mt-4">
          <i className="fas fa-info-circle me-2"></i>
          <strong>Need Help?</strong> Contact our customer support at +91 7985079854 or email support@Winghobbies.com
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
