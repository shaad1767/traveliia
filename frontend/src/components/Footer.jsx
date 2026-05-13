import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          
          <div className="footer-section">
            <h3>Travelia</h3>
            <p>Find your perfect stay anywhere in the world.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Hotels</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@travelia.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Travelia. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;