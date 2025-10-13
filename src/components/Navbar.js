import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/Navbar_photos/National-Service-Scheme-L.png');
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle logo change based on screen size
  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 768) { // Mobile breakpoint
        setLogoSrc('/Navbar_photos/National-Service-Scheme-S.png');
      } else {
        setLogoSrc('/Navbar_photos/National-Service-Scheme-S.png');
      }
    };

    // Set initial logo based on screen size
    updateLogo();

    // Listen for window resize events
    window.addEventListener('resize', updateLogo);
    return () => window.removeEventListener('resize', updateLogo);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container-fluid px-3">
        {/* Left Logo with Heading */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="logo-container">
            <img
              src={logoSrc}
              alt="NSS Logo"
              className="navbar-logo"
            />
          </div>
          <h1 className="ms-2 mb-0 h5">NSS IIT Bhubaneswar</h1>
        </Link>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {[
              { path: '/', label: 'Home' },
              { path: '/team', label: 'Team' },
              { path: '/about', label: 'About' },
              { path: '/blog', label: 'Blog' }
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span className="nav-line"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger Menu moved to the right */}
        <button
          className={`navbar-toggler ms-auto ${isMenuOpen ? 'is-active' : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <div className="hamburger-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
