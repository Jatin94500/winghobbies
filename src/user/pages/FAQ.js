import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping is 2-3 business days.' },
    { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all products in original condition.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship to most countries worldwide. Shipping costs vary by location.' },
    { q: 'Are your products covered by warranty?', a: 'Yes, all products come with manufacturer warranty. Duration varies by product.' },
    { q: 'How can I track my order?', a: 'You will receive a tracking number via email once your order ships.' }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Frequently Asked Questions</h1>
        <p className="lead text-muted">Find answers to common questions</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          {faqs.map((faq, index) => (
            <div key={index} className="card mb-3 border-0 shadow-sm">
              <div 
                className="card-header bg-white cursor-pointer" 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">{faq.q}</h6>
                  <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
                </div>
              </div>
              {activeIndex === index && (
                <div className="card-body">
                  <p className="text-muted mb-0">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">Still have questions?</p>
        <a href="/contact" className="btn btn-warning">Contact Us</a>
      </div>
    </div>
  );
};

export default FAQ;