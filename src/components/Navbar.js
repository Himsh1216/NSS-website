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

  // Handle logo change based on screen size
  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 768) { // Mobile breakpoint
        setLogoSrc('/Navbar_photos/National-Service-Scheme-S.png');
      } else {
        setLogoSrc('/Navbar_photos/National-Service-Scheme-M.png');
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
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            {[
              { path: '/', label: 'Home' },
              { path: '/team', label: 'Team' },
              { path: '/about', label: 'About' },
              { path: '/blog', label: 'Blog' }, // Updated blog link to internal page
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
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
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
