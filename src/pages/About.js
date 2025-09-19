import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import './About.css';

const About = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [impactNumbers, setImpactNumbers] = useState({});

  const heroBackgroundImage = '/NSS_about_photo.jpg';
  const heroHighlights = [
    'Community-Centric Projects',
    'Leadership & Service Learning',
    'Sustainable Rural Impact'
  ];

  const initiatives = [
    {
      image: "/Initiatives_photos/Village_adoption_photo.jpeg",
      title: "Village Adoption and Development",
      description: "IIT Bhubaneswar has adopted villages under NSS and Unnat Bharat Abhiyan for healthcare, education, and sustainability. We work closely with local communities to implement sustainable development programs.",
      icon: "🏘️",
    },
    {
      image: "/Initiatives_photos/Entreprenuership_photo.jpeg",
      title: "Entrepreneurship and Rural Development",
      description: "NSS supports rural development and entrepreneurship through conclaves and community engagement. We provide skill development programs and support local businesses.",
      icon: "💼",
    },
    {
      image: "/Initiatives_photos/Environmental_photo.jpeg",
      title: "Environmental Initiatives",
      description: "NSS volunteers conduct tree plantation drives, promoting ecological balance and sustainability. Our environmental programs focus on conservation and awareness.",
      icon: "🌱",
    },
    {
      image: "/Initiatives_photos/Health_photo.jpeg",
      title: "Health and Hygiene Awareness",
      description: "Health camps and hygiene awareness programs are regularly organized in collaboration with medical teams. We focus on preventive healthcare and community wellness.",
      icon: "🏥",
    },
    {
      image: "/Initiatives_photos/Youth_empowerment.jpeg",
      title: "Youth Empowerment",
      description: "NSS empowers students in leadership roles, with activities like blood donation camps and cleanliness drives. We develop the next generation of social leaders.",
      icon: "💪",
    },
  ];

  // Counter Animation Hook
  const useCountUp = (endValue, duration) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (!isVisible) return;

      const startValue = 0;
      const increment = endValue / (duration / 50);
      let current = startValue;

      const timer = setInterval(() => {
        current += increment;
        if (current >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);

      return () => clearInterval(timer);
    }, [endValue, duration, isVisible]);

    return [count, setIsVisible];
  };

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Trigger number animations if it's an impact card
          if (entry.target.classList.contains('impact-card')) {
            const index = parseInt(entry.target.dataset.index);
            setImpactNumbers(prev => ({
              ...prev,
              [index]: true
            }));
          }

          // Trigger initiative card animations
          if (entry.target.classList.contains('initiative-card')) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => new Set([...prev, index]));
          }
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .impact-card, .initiative-card');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Impact Numbers Data
  const impactData = [
    {
      number: 5,
      label: 'Villages Adopted',
      color: 'primary',
      duration: 1500,
      icon: '🏡',
      description: 'Long-term partnerships with adopted villages for holistic growth.'
    },
    {
      number: 1000,
      suffix: '+',
      label: 'Trees Planted',
      color: 'success',
      duration: 2000,
      icon: '🌳',
      description: 'Sustainable plantation drives led by dedicated volunteers.'
    },
    {
      number: 50,
      suffix: '+',
      label: 'Annual Events',
      color: 'info',
      duration: 1500,
      icon: '📅',
      description: 'Workshops, health camps, drives and awareness programs each year.'
    },
    {
      number: 5000,
      suffix: '+',
      label: 'Lives Impacted',
      color: 'warning',
      duration: 2500,
      icon: '🤝',
      description: 'Beneficiaries reached through our community and campus initiatives.'
    }
  ];

  // Counter Component
  const CountUpNumber = ({ endNumber, duration, suffix = '', color, label, index, icon, description }) => {
    const [count, setIsVisible] = useCountUp(endNumber, duration);

    const shouldAnimate = impactNumbers[index];

    useEffect(() => {
      if (shouldAnimate) {
        setIsVisible(true);
      }
    }, [shouldAnimate, setIsVisible]);

    return (
      <div className={`impact-card ${color}`} data-index={index}>
        <div className="impact-card-backdrop" aria-hidden="true" />
        {icon && (
          <div className="impact-icon" aria-hidden="true">{icon}</div>
        )}
        <div className="impact-number">
          {count}{suffix}
        </div>
        <div className="impact-label">{label}</div>
        {description && (
          <p className="impact-description">{description}</p>
        )}
      </div>
    );
  };

  return (
    <div className="about-page">
      {/* Enhanced Hero Section */}
      <section className="about-hero">
        <img
          src={heroBackgroundImage}
          alt="NSS IIT Bhubaneswar"
          className="about-hero-image"
        />
        <div className="about-hero-content">
          <h1 className="about-hero-title">About NSS IIT Bhubaneswar</h1>
          <p className="about-hero-subtitle">NOT ME BUT YOU</p>
          <p className="about-hero-description">
            Committed to Social Responsibility, Community Service, and Leadership Development.
            We believe in creating positive change through dedicated service to society.
          </p>
        </div>
        <div className="about-hero-highlights">
          {heroHighlights.map((highlight) => (
            <span className="about-hero-badge" key={highlight}>
              {highlight}
            </span>
          ))}
        </div>
        <div className="scroll-indicator">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Enhanced Impact Stats Section */}
      <section className="impact-stats-section">
        <div className="impact-stats-backdrop" aria-hidden="true">
          <span className="impact-backdrop-glow glow-one" />
          <span className="impact-backdrop-glow glow-two" />
          <span className="impact-backdrop-ring" />
        </div>
        <div className="container position-relative">
          <h2 className="impact-stats-title fade-in-up">Our Impact</h2>
          <div className="row g-4">
            {impactData.map((item, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <CountUpNumber
                  endNumber={item.number}
                  duration={item.duration}
                  suffix={item.suffix}
                  color={item.color}
                  label={item.label}
                  index={index}
                  icon={item.icon}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-content">
            <h2 className="mission-vision-title fade-in-up">Mission & Vision</h2>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="mission-card fade-in-left">
                  <h3 className="mission-title">Our Mission</h3>
                  <p className="mission-text">
                    To instill social welfare consciousness in students and provide selfless service
                    to society. We aim to develop student personality through community service while
                    ensuring that classroom knowledge benefits the common people and creates lasting
                    social impact.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vision-card fade-in-right">
                  <h3 className="vision-title">Our Vision</h3>
                  <p className="vision-text">
                    To be a catalyst for positive social change by empowering young minds to become
                    responsible citizens. We envision a society where every individual contributes
                    to community development and works towards building a better, more equitable world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Initiatives Section */}
      <section className="initiatives-section">
        <div className="container">
          <h2 className="initiatives-title fade-in-up">Key Initiatives</h2>
          <div className="row g-4">
            {initiatives.map((initiative, index) => (
              <div className="col-lg-6" key={index}>
                <div
                  className={`initiative-card ${visibleCards.has(index) ? 'visible' : ''}`}
                  data-index={index}
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={initiative.image}
                      className="initiative-image"
                      alt={initiative.title}
                    />
                  </div>
                  <div className="initiative-content">
                    <div className="initiative-icon">{initiative.icon}</div>
                    <h3 className="initiative-title">{initiative.title}</h3>
                    <p className="initiative-description">{initiative.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5" style={{
        background: 'linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)',
        color: 'white'
      }}>
        <div className="container text-center">
          <div className="fade-in-up">
            <h2 className="display-5 fw-bold mb-4">Join Our Mission</h2>
            <p className="lead mb-4">
              Be part of something bigger. Join NSS and make a difference in your community.
            </p>
            <button
              className="btn btn-light btn-lg px-5 py-3"
              style={{
                borderRadius: '50px',
                fontWeight: '600',
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
              }}
            >
              Get Involved Today
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;