import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container-fluid px-3">
        {/* Left Logo */}
        <Link to="/" className="navbar-brand">
          <div className="logo-container">
            <img
              src="/Navbar_photos/IIT_BBS_logo.png"
              alt="IIT BBS Logo"
              className="navbar-logo"
            />
          </div>
        </Link>

        {/* Hamburger Menu */}
        <button
          className={`navbar-toggler ${isMenuOpen ? 'is-active' : ''}`}
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

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            {[
              { path: '/', label: 'Home' },
              { path: '/team', label: 'Team' },
              { path: '/about', label: 'About' },
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
            <li className="nav-item">
              <a
                href="https://ittbbs.nss/blog"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="external-link-icon"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span className="nav-line"></span>
              </a>
            </li>
          </ul>
        </div>

        {/* Right Logo */}
        <div className="navbar-brand">
          <div className="logo-container">
            <img
              src="/Navbar_photos/National-Service-Scheme-S.png"
              alt="NSS Logo"
              className="navbar-logo"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;