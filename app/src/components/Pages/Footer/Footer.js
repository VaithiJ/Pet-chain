import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <div className="footer-container"> {/* Use className instead of style */}
      <p className="footer-text">© 2023 SecureKloud. All rights reserved.</p>
    </div>
  );
}

export default Footer;
