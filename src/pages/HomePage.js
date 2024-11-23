import React, { useState, useEffect } from "react";
import { Calendar, Users, Award, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';  // We'll create this next

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

  const eventReports = [
    {
      date: "08 September 2024",
      title: "International Literacy Day",
      description: 'The NSS Wing of IIT Bhubaneswar celebrated International Literacy Day by organizing a quiz program titled "Awareness Arena" with over 100 students participating.',
      image: "/events_photos/International_literacy_day.png",
      overlayClass: "bg-primary",
    },
    {
      date: "09 - 15 August 2024",
      title: "Har Ghar Tiranga Campaign",
      description: 'As part of the Independence Day celebrations, the members of the Institute participated in the "Har Ghar Tiranga" campaign to showcase patriotism.',
      image: "/events_photos/Har_Ghar_Tiranga.png",
      overlayClass: "bg-info",
    },
    {
      date: '10 August 2024',
      title: 'CPR Workshop',
      description: 'A workshop on Cardiopulmonary Resuscitation (CPR) was organized by IIT Bhubaneswar and KIMS Hospital to train students and staff on basic life support techniques.',
      image: process.env.PUBLIC_URL + '/events_photos/CPR_workshop.png',
      overlayClass: 'overlay-green',
      fullDescription: 'Full details of the Har Ghar Tiranga Campaign go here.',
    },
    {
      date: '06 July 2024',
      title: 'Plantation Drive at GHR',
      description: 'The NSS team organized a plantation drive at GHR, focusing on promoting environmental awareness through tree planting activities.',
      image: process.env.PUBLIC_URL + '/events_photos/Plantation_Drive_conducted_on_6th_July2024_at_GHR.png',
      overlayClass: 'overlay-orange',
      fullDescription: 'Full details of the Har Ghar Tiranga Campaign go here.',
    },
    {
      date: '24 August 2024',
      title: 'Plantation Drive at LHL',
      description: 'A plantation drive was conducted at LHL, part of NSS activities promoting a greener environment in the campus area.',
      image: process.env.PUBLIC_URL + '/events_photos/Plantation_Drive_conducted_on_24th_August2024_at_LHL.png',
      overlayClass: 'overlay-blue-dark',
      fullDescription: 'Full details of the Har Ghar Tiranga Campaign go here.',
    },
    {
      date: '12 - 15 August 2024',
      title: 'Nasha Mukt Bharat Abhiyaan',
      description: 'IIT Bhubaneswar joined the nationwide Nasha Mukt Bharat Abhiyaan, administering a pledge for a "Drug-Free India" with the active participation of students and staff.',
      image: process.env.PUBLIC_URL + '/events_photos/Nasha_mukti_abhiyan.png',
      overlayClass: 'overlay-green-dark',
      fullDescription: 'Full details of the Har Ghar Tiranga Campaign go here.',
    },

  ];

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
  }, []);

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
  
      const response = await fetch('http://localhost:5000/api/send-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: '24me01040@iitbbs.ac.in', // Replace with the admin's email
          subject: 'New NSS Volunteer Registration',
          content: emailContent,
        }),
      });
  
      if (response.ok) {
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
      } else {
        throw new Error('Failed to send registration');
      }
    } catch (error) {
      alert('There was an error submitting your registration. Please try again.');
      console.error('Registration error:', error);
    }
  };
  

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <section className="position-relative vh-100">
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
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />
            <div className="hero-overlay" />
            <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100 px-4">
              <h1 className="display-3 fw-bold mb-4">{image.caption}</h1>
              <p className="lead mb-4">{image.subCaption}</p>
              <button 
                className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
                onClick={() => setShowRegistrationForm(true)}
              >
                Join NSS Today
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Previous sections remain the same */}
      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <Users className="text-primary mb-3" size={48} />
                  <h3 className="display-5 fw-bold">{stats.volunteers}+</h3>
                  <p className="text-muted">Active Volunteers</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <Calendar className="text-primary mb-3" size={48} />
                  <h3 className="display-5 fw-bold">{stats.events}+</h3>
                  <p className="text-muted">Events This Year</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center p-4">
                <div className="card-body">
                  <Award className="text-primary mb-3" size={48} />
                  <h3 className="display-5 fw-bold">{stats.hours}+</h3>
                  <p className="text-muted">Volunteer Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center max-width-3xl mx-auto">
            <h2 className="display-4 fw-bold mb-4">About NSS IIT BBS</h2>
            <p className="lead text-muted mb-5">
              The NSS Club of IIT Bhubaneswar is dedicated to fostering social responsibility 
              and community engagement among students. Through various initiatives and programs, 
              we work towards creating positive change in society while developing leadership 
              skills and civic consciousness in our volunteers.
            </p>
            <button className="btn btn-primary btn-lg px-5 py-3 rounded-pill">
              Learn More 
              <ArrowRight className="ms-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="display-4 fw-bold text-center mb-5">Recent Events</h2>
          <div className="row g-4">
            {eventReports.map((event, index) => (
              <div className="col-md-4" key={index}>
                <div 
                  className="card h-100 border-0 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="position-relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="card-img"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                    <div className={`card-img-overlay d-flex flex-column justify-content-end ${event.overlayClass}`} 
                         style={{ opacity: 0.9 }}>
                      <div className="text-white">
                        <small className="d-inline-block mb-2">{event.date}</small>
                        <h3 className="h4 fw-bold">{event.title}</h3>
                        <p className="small">{event.description}</p>
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
              <div className="modal-body p-0">
                <div className="event-image-container">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="event-image"
                  />
                </div>
                <div className="p-4">
                  <div className="d-flex align-items-center text-muted mb-3">
                    <Calendar size={20} className="me-2" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <p className="text-muted">{selectedEvent.description}</p>
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