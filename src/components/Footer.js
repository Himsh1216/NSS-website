import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for the footer

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* NSS Address Section */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>
              <strong>Address:</strong><br />
              NSS Office, Indian Institute of Technology Bhubaneswar,<br />
              Arugul, Jatni, Khordha, Odisha - 752050, India
            </p>
          </div>

          {/* Email Section */}
          <div className="col-md-4">
            <h5>Email</h5>
            <p>
              <a href="mailto:nss@iitbbs.ac.in" className="text-white">nss@iitbbs.ac.in</a>
            </p>
          </div>

          {/* Phone Number Section */}
          <div className="col-md-4">
            <h5>Phone</h5>
            <p>
              <a href="tel:+91-1234567890" className="text-white">+91 1234567890</a>
            </p>
          </div>

          {/* Google Drive Upload Section */}
          <div className="col-md-4">
            <h5>Upload Photos</h5>
            <p>
              <a 
                href="https://drive.google.com/drive/u/1/folders/1xgWFDWiDJzItQ1enP9rZ7zDFZ2ISo96E" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white"
              >
                Upload Events Photos Here
              </a>
            </p>
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="row justify-content-center pt-4">
          <div className="col-md-6 text-center">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
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
