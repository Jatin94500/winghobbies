import React from 'react';

const PortraitBanner = () => {
  const bannerAds = [
    {
      id: 1,
      title: "New Arrivals",
      subtitle: "Latest RC Models",
      image: "/api/placeholder/300/400",
      link: "/products?filter=new",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Special Offer",
      subtitle: "Up to 40% OFF",
      image: "/api/placeholder/300/400",
      link: "/products?filter=sale",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    }
  ];

  return (
    <div className="portrait-banner-container">
      {bannerAds.map((ad) => (
        <div key={ad.id} className="portrait-banner-item mb-4">
          <a href={ad.link} className="text-decoration-none">
            <div 
              className="portrait-banner-card position-relative overflow-hidden rounded-3 shadow-sm"
              style={{ 
                height: '400px',
                background: ad.bgColor,
                backgroundImage: `url(${ad.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="position-absolute w-100 h-100" style={{ background: 'rgba(0,0,0,0.4)' }}></div>
              <div className="position-absolute bottom-0 start-0 p-4 text-white">
                <h5 className="fw-bold mb-1">{ad.title}</h5>
                <p className="mb-2 small">{ad.subtitle}</p>
                <span className="btn btn-warning btn-sm">
                  Shop Now <i className="fas fa-arrow-right ms-1"></i>
                </span>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default PortraitBanner;