import React, { useState, useEffect } from "react";
import { Calendar, Users, Award, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

const HomePage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({ volunteers: 0, events: 0, hours: 0 });
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occupation: '',
    address: '',
    reason: '',
    interests: [],
    experience: '',
    availability: '',
    preferredActivities: []
  });

  const heroImages = [
    {
      src: "/Hero_section_home_photos/main_building.jpg",
      alt: "Main Building",
      caption: "Welcome to NSS IIT BBS",
      subCaption: "NOT ME BUT YOU",
    },
    {
      src: "/Hero_section_home_photos/Main_gate_photo.jpg",
      alt: "Campus View",
      caption: "Committed to Social Service",
      subCaption: "Join our efforts to make a positive impact!",
    },
    {
      src: "/Hero_section_home_photos/Volunteers.jpeg",
      alt: "Volunteers",
      caption: "Be the Change",
      subCaption: "Volunteer with NSS and help shape the future.",
    },
  ];

  const heroHighlights = [
    'Community Outreach',
    'Leadership in Action',
    'Sustainable Impact'
  ];

  const [eventReports, setEventReports] = useState([]);

  useEffect(() => {
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => setEventReports(data.slice(0, 6)))
      .catch(() => {
        // Fallback events when API is not available
        setEventReports([
          {
            id: 1,
            title: "Tree Plantation Drive",
            date: "2024-03-15",
            image: "/Initiatives_photos/Environmental_photo.jpeg",
            summary: "NSS volunteers planted 200+ trees in collaboration with local communities"
          },
          {
            id: 2,
            title: "Health Awareness Camp",
            date: "2024-03-10",
            image: "/Initiatives_photos/Health_photo.jpeg",
            summary: "Free health checkups and awareness sessions conducted in nearby villages"
          },
          {
            id: 3,
            title: "Village Development Program",
            date: "2024-03-05",
            image: "/Initiatives_photos/Village_adoption_photo.jpeg",
            summary: "Educational workshops and infrastructure development in adopted villages"
          },
          {
            id: 4,
            title: "Youth Empowerment Workshop",
            date: "2024-02-28",
            image: "/Initiatives_photos/Youth_empowerment.jpeg",
            summary: "Leadership development and skill building sessions for local youth"
          },
          {
            id: 5,
            title: "Entrepreneurship Conclave",
            date: "2024-02-20",
            image: "/Initiatives_photos/Entreprenuership_photo.jpeg",
            summary: "Supporting rural entrepreneurship through mentorship and resources"
          },
          {
            id: 6,
            title: "Community Cleanliness Drive",
            date: "2024-02-15",
            image: "/Initiatives_photos/Environmental_photo.jpeg",
            summary: "Large-scale cleanliness initiative involving 100+ volunteers"
          }
        ]);
      });
  }, []);

  const volunteerActivities = [
    "Teaching and Education",
    "Environmental Conservation",
    "Healthcare Awareness",
    "Community Development",
    "Disaster Relief",
    "Social Awareness Campaigns",
    "Rural Development",
    "Technical Skill Training"
  ];

  useEffect(() => {
    const animateValue = (start, end, duration, setter) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setter(Math.floor(progress * (end - start) + start));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 200, 2000, (value) =>
      setStats((prev) => ({ ...prev, volunteers: value }))
    );
    animateValue(0, 24, 2000, (value) =>
      setStats((prev) => ({ ...prev, events: value }))
    );
    animateValue(0, 1000, 2000, (value) =>
      setStats((prev) => ({ ...prev, hours: value }))
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [eventReports]); // Re-run when events are loaded

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleActivityChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferredActivities: checked 
        ? [...prev.preferredActivities, value]
        : prev.preferredActivities.filter(activity => activity !== value)
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    console.log('Starting form submission...'); // Debug log

    // Enhanced validation
    if (!formData.name || !formData.email || !formData.phone || !formData.occupation || !formData.reason || !formData.availability) {
      throw new Error('Please fill in all required fields');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      throw new Error('Please enter a valid 10-digit phone number');
    }

    const emailContent = `
      New NSS Volunteer Registration:
      
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Occupation: ${formData.occupation}
      Address: ${formData.address}
      
      Reason for Joining: ${formData.reason}
      
      Previous Experience: ${formData.experience}
      Availability: ${formData.availability}
      Preferred Activities: ${formData.preferredActivities.join(', ')}
    `;

    console.log('Sending request to:', '/api/send-registration'); // Debug log

    const response = await fetch('/api/send-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: '24me01040@iitbbs.ac.in',
        subject: 'New NSS Volunteer Registration',
        content: emailContent,
      }),
    });

    console.log('Response status:', response.status); // Debug log
    
    const data = await response.json();
    console.log('Response data:', data); // Debug log

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send registration');
    }

    // Handle success
    alert('Thank you for registering! We will contact you soon.');
    setShowRegistrationForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      occupation: '',
      address: '',
      reason: '',
      interests: [],
      experience: '',
      availability: '',
      preferredActivities: [],
    });

  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // More informative error message to user
    if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      alert('Network error: Please check your internet connection and try again.');
    } else {
      alert(`Registration error: ${error.message}. Please try again or contact support.`);
    }
  }
};

  return (
    <div className="min-vh-100">
      {/* Enhanced Hero Section */}
      <section className="hero-section position-relative vh-100">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`position-absolute w-100 h-100 transition-opacity ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.7s ease-in-out" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="hero-image w-100 h-100"
              style={{ objectFit: "cover" }}
            />
            <div className="hero-overlay" />
            <div className="hero-content position-absolute top-50 start-50 translate-middle text-center text-white w-100 px-4">
              <h1 className="hero-title">{image.caption}</h1>
              <p className="hero-subtitle">{image.subCaption}</p>
              <button
                className="hero-cta-button btn text-white pulse-on-hover"
                onClick={() => setShowRegistrationForm(true)}
              >
                Join NSS Today
              </button>
              <div className="hero-highlights">
                {heroHighlights.map((highlight) => (
                  <span className="hero-pill" key={highlight}>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Enhanced Stats Section */}
      <section className="stats-section">
        <div className="stats-backdrop" aria-hidden="true">
          <span className="stats-glow stats-glow-one" />
          <span className="stats-glow stats-glow-two" />
          <span className="stats-grid" />
        </div>
        <div className="container position-relative">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="stats-card h-100 text-center fade-in-up">
                <Users className="stats-icon floating" size={48} />
                <span className="stats-number">{stats.volunteers}+</span>
                <p className="stats-label">Active Volunteers</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card h-100 text-center fade-in-up">
                <Calendar className="stats-icon floating" size={48} />
                <span className="stats-number">{stats.events}+</span>
                <p className="stats-label">Events This Year</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card h-100 text-center fade-in-up">
                <Award className="stats-icon floating" size={48} />
                <span className="stats-number">{stats.hours}+</span>
                <p className="stats-label">Volunteer Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content fade-in-up">
            <h2 className="about-title">About NSS IIT BBS</h2>
            <p className="about-text">
              The NSS Club of IIT Bhubaneswar is dedicated to fostering social responsibility
              and community engagement among students. Through various initiatives and programs,
              we work towards creating positive change in society while developing leadership
              skills and civic consciousness in our volunteers.
            </p>
            <Link to="/About" className="about-cta btn text-white pulse-on-hover">
              Learn More
              <ArrowRight className="ms-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Events Section */}
      <section className="events-section">
        <div className="container">
          <h2 className="section-title fade-in-up">Recent Events</h2>
          <div className="row g-4">
            {eventReports.map((event, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="event-card h-100 cursor-pointer fade-in-up"
                  onClick={() => setSelectedEvent(event)}
                  style={{ cursor: 'pointer', animationDelay: `${index * 0.1}s` }}
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image w-100"
                    />
                    <div className="event-overlay card-img-overlay d-flex flex-column justify-content-end">
                      <div className="text-white">
                        <small className="d-inline-block mb-2 opacity-75">{event.date}</small>
                        <h3 className="h4 fw-bold mb-2">{event.title}</h3>
                        <p className="small opacity-90">{event.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div 
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowRegistrationForm(false)}
        >
          <div 
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title h4">Join NSS IIT BBS</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowRegistrationForm(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Occupation *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Reason for Joining NSS *</label>
                      <textarea
                        className="form-control"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        rows="3"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Previous Volunteering Experience</label>
                      <textarea
                        className="form-control"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        rows="2"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Availability *</label>
                      <select
                        className="form-select"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select your availability</option>
                        <option value="weekends">Weekends Only</option>
                        <option value="weekdays">Weekdays Only</option>
                        <option value="both">Both Weekdays and Weekends</option>
                        <option value="flexible">Flexible Schedule</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Preferred Activities</label>
                      <div className="row g-2">
                        {volunteerActivities.map((activity) => (
                          <div className="col-md-6" key={activity}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={activity}
                                id={activity.replace(/\s+/g, '')}
                                checked={formData.preferredActivities.includes(activity)}
                                onChange={handleActivityChange}
                              />
                              <label 
                                className="form-check-label" 
                                htmlFor={activity.replace(/\s+/g, '')}
                              >
                                {activity}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setShowRegistrationForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit Registration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Event Modal */}
      {selectedEvent && (
        <div 
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title h4">{selectedEvent.title}</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setSelectedEvent(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="event-image-container mb-3" style={{ margin: '-1.5rem -1.5rem 1rem -1.5rem' }}>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="event-image"
                  />
                </div>
                <div>
                  <div className="d-flex align-items-center text-muted mb-3">
                    <Calendar size={20} className="me-2" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <p className="text-muted mb-0">{selectedEvent.summary}</p>
                </div>
              </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
