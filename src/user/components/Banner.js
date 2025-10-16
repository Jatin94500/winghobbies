import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ image, title, subtitle, ctaText, ctaLink }) => {
  return (
    <section className="position-relative">
      <div className="container-fluid p-0">
        <img src={image} alt="Banner" className="w-100" style={{height: '400px', objectFit: 'cover'}} />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center">
          <div className="container text-white">
            <h1 className="display-4 fw-bold" dangerouslySetInnerHTML={{ __html: title }}></h1>
            <p className="lead">{subtitle}</p>
            <Link to={ctaLink} className="btn btn-warning btn-lg fw-bold">{ctaText}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
