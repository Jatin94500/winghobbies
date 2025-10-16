import React from 'react';

const ShareButtons = ({ product }) => {
  const url = window.location.href;
  const text = `Check out ${product.name} at Wing Hobbies!`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <span className="text-muted small me-2">Share:</span>
      <button className="btn btn-sm btn-outline-primary" onClick={() => handleShare('facebook')} title="Share on Facebook">
        <i className="fab fa-facebook-f"></i>
      </button>
      <button className="btn btn-sm btn-outline-info" onClick={() => handleShare('twitter')} title="Share on Twitter">
        <i className="fab fa-twitter"></i>
      </button>
      <button className="btn btn-sm btn-outline-success" onClick={() => handleShare('whatsapp')} title="Share on WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </button>
      <button className="btn btn-sm btn-outline-primary" onClick={() => handleShare('telegram')} title="Share on Telegram">
        <i className="fab fa-telegram"></i>
      </button>
      <button className="btn btn-sm btn-outline-secondary" onClick={handleCopyLink} title="Copy Link">
        <i className="fas fa-link"></i>
      </button>
    </div>
  );
};

export default ShareButtons;
