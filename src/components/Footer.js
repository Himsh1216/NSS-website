import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for the footer

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
      <div className="row">
        {/* NSS Address Section */}
        <div className="col-md-3">
          <h5>Contact Us</h5>
          <p>
            <strong>Address:</strong><br />
            NSS Office, Indian Institute of Technology Bhubaneswar,<br />
            Arugul, Jatni, Khordha, Odisha - 752050, India
          </p>
        </div>

        {/* Email Section */}
        <div className="col-md-3">
          <h5>Email</h5>
          <p>
            <a href="mailto:coordinator.nss@iitbbs.ac.in" className="text-white">coordinator.nss@iitbbs.ac.in</a>
          </p>
        </div>

        {/* NSS History Section */}
        <div className="col-md-3">
          <h5>NSS History</h5>
          <p>
            <a href="https://nss.gov.in/about-us-0" target="_blank" rel="noopener noreferrer" className="text-white">View NSS History</a>
          </p>
        </div>

        {/* Phone Number Section */}
        <div className="col-md-3">
          <h5>Phone</h5>
          <p>
            <a href="tel:0674-713-6945" className="text-white">0674-713-6945</a>
          </p>
        </div>
      </div>

        {/* Social Media Icons Section */}
        <div className="row justify-content-center pt-4">
          <div className="col-md-6 text-center">
            <a href="https://www.facebook.com/NSSIITBhubaneswar/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://www.instagram.com/explore/locations/1087982591342163/nss-iit-bhubaneswar/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center pt-4">
          <p>&copy; {new Date().getFullYear()} NSS IIT Bhubaneswar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
