import React, { useState } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.' },
        { q: 'Do you offer free shipping?', a: 'Yes! Free shipping on orders above ₹999. Orders below this amount have a ₹99 shipping charge.' },
        { q: 'Can I track my order?', a: 'Absolutely! Once your order ships, you will receive a tracking number via email and SMS.' },
        { q: 'Do you ship internationally?', a: 'Currently, we only ship within India. International shipping coming soon!' }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        { q: 'What is your return policy?', a: 'We offer a 7-day replacement policy for defective or damaged products.' },
        { q: 'How do I return a product?', a: 'Contact our support team with your order number. We will arrange a pickup and process your return.' },
        { q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days after we receive the returned item.' },
        { q: 'Can I exchange a product?', a: 'Yes, exchanges are available for the same product or equivalent value items.' }
      ]
    },
    {
      category: 'Products',
      questions: [
        { q: 'Are your products genuine?', a: 'Yes, all our products are 100% genuine with manufacturer warranty.' },
        { q: 'Do you provide warranty?', a: 'All products come with a 6-month manufacturer warranty.' },
        { q: 'Can I get spare parts?', a: 'Yes, we stock spare parts for all our RC models. Contact support for availability.' },
        { q: 'Do you offer product assembly?', a: 'Most products come pre-assembled. Assembly guides are included for DIY kits.' }
      ]
    },
    {
      category: 'Payment',
      questions: [
        { q: 'What payment methods do you accept?', a: 'We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery.' },
        { q: 'Is it safe to use my card?', a: 'Yes, all transactions are secured with SSL encryption and PCI DSS compliance.' },
        { q: 'Can I pay in installments?', a: 'Yes, EMI options are available on orders above ₹5,000.' },
        { q: 'Do you offer Cash on Delivery?', a: 'Yes, COD is available for orders up to ₹10,000.' }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3">Frequently Asked <span className="text-warning">Questions</span></h1>
          <p className="text-muted">Find answers to common questions about our products and services</p>
        </div>

        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-5">
            <h3 className="fw-bold mb-4">
              <i className="fas fa-question-circle text-warning me-2"></i>
              {section.category}
            </h3>
            <div className="accordion">
              {section.questions.map((faq, qIndex) => {
                const globalIndex = `${sectionIndex}-${qIndex}`;
                const isActive = activeIndex === globalIndex;
                return (
                  <div key={qIndex} className="card border-0 shadow-sm mb-3">
                    <div 
                      className="card-header bg-white border-0 cursor-pointer"
                      onClick={() => toggleAccordion(globalIndex)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 fw-semibold">{faq.q}</h6>
                        <i className={`fas fa-chevron-${isActive ? 'up' : 'down'} text-warning`}></i>
                      </div>
                    </div>
                    {isActive && (
                      <div className="card-body border-top">
                        <p className="text-muted mb-0">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="card border-0 shadow-sm bg-dark text-white text-center p-5 mt-5">
          <h4 className="fw-bold mb-3">Still have questions?</h4>
          <p className="mb-4">Can't find the answer you're looking for? Our support team is here to help.</p>
          <a href="/contact" className="btn btn-warning fw-bold">
            <i className="fas fa-envelope me-2"></i>Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
