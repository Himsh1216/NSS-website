import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const About = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(new Set());

  const heroBackgroundImage = '/NSS_about_photo.jpg';

  const initiatives = [
    {
      image: "/Initiatives_photos/Village_adoption_photo.jpeg",
      title: "Village Adoption and Development",
      description: "IIT Bhubaneswar has adopted villages under NSS and Unnat Bharat Abhiyan for healthcare, education, and sustainability.",
      overlayClass: "bg-primary",
      icon: "🏘️",
    },
    {
      image: "/Initiatives_photos/Entreprenuership_photo.jpeg",
      title: "Entrepreneurship and Rural Development",
      description: "NSS supports rural development and entrepreneurship through conclaves and community engagement.",
      overlayClass: "bg-info",
      icon: "💼",
    },
    {
      image: "/Initiatives_photos/Environmental_photo.jpeg",
      title: "Environmental Initiatives",
      description: "NSS volunteers conduct tree plantation drives, promoting ecological balance and sustainability.",
      overlayClass: "bg-success",
      icon: "🌱",
    },
    {
      image: "/Initiatives_photos/Health_photo.jpeg",
      title: "Health and Hygiene Awareness",
      description: "Health camps and hygiene awareness programs are regularly organized in collaboration with medical teams.",
      overlayClass: "bg-warning",
      icon: "🏥",
    },
    {
      image: "/Initiatives_photos/Youth_empowerment.jpeg",
      title: "Youth Empowerment",
      description: "NSS empowers students in leadership roles, with activities like blood donation camps and cleanliness drives.",
      overlayClass: "bg-danger",
      icon: "💪",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".initiative-card");
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 100) {
          setVisibleCards(prev => new Set([...prev, index]));
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Impact Numbers Data
  const impactData = [
    {
      number: 5,
      label: 'Villages Adopted',
      color: 'primary',
      duration: 1500
    },
    {
      number: 1000,
      suffix: '+',
      label: 'Trees Planted',
      color: 'success',
      duration: 2000
    },
    {
      number: 50,
      suffix: '+',
      label: 'Annual Events',
      color: 'info',
      duration: 1500
    },
    {
      number: 5000,
      suffix: '+',
      label: 'Lives Impacted',
      color: 'warning',
      duration: 2500
    }
  ];

  // Counter Component
  const CountUpNumber = ({ endNumber, duration, suffix, color, label }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [ref, inView] = useInView({
      threshold: 0.3,
      triggerOnce: true
    });

    useEffect(() => {
      if (inView && !countRef.current) {
        const start = Date.now();
        const end = start + duration;

        countRef.current = requestAnimationFrame(function animate() {
          const now = Date.now();
          const progress = Math.min((now - start) / duration, 1);
          
          setCount(Math.floor(progress * endNumber));

          if (progress < 1) {
            countRef.current = requestAnimationFrame(animate);
          }
        });

        return () => {
          if (countRef.current) {
            cancelAnimationFrame(countRef.current);
          }
        };
      }
    }, [inView, endNumber, duration]);

    return (
      <div className="col-md-3" ref={ref}>
        <div className={`impact-card p-4 ${inView ? 'animate-in' : ''}`}>
          <h3 className={`display-4 fw-bold text-${color} mb-2`}>
            {count}{suffix}
          </h3>
          <p className="text-muted mb-0">{label}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section 
        className="hero-section position-relative d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${heroBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '70vh',
          minHeight: '500px'
        }}
      >
        <div className="text-center">
          <h1 className="display-3 fw-bold mb-4">About NSS IIT Bhubaneswar</h1>
          <p className="lead fs-4 mb-0">Committed to Social Responsibility, Community Service, and Leadership</p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-4">Our Mission</h2>
              <p className="lead text-muted">
                The National Service Scheme at IIT Bhubaneswar strives to instill social welfare in students 
                and to provide service to society without bias. Our goal is to develop student personality 
                through community service, while ensuring that the knowledge they gain in the classroom 
                benefits the common people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Initiatives Section */}
      <section className="initiatives-section py-5">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5">Key Initiatives</h2>
          
          <div className="row g-4">
            {initiatives.map((initiative, index) => (
              <div className="col-md-6" key={index}>
                <div 
                  className={`initiative-card card h-100 border-0 shadow-sm overflow-hidden ${
                    visibleCards.has(index) ? 'visible' : ''
                  }`}
                >
                  <div className="position-relative">
                    <img
                      src={initiative.image}
                      className="card-img-top"
                      alt={initiative.title}
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                    <div 
                      className={`card-img-overlay d-flex flex-column justify-content-center text-white text-center`}
                      style={{ 
                        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))`,
                        opacity: 0.9 
                      }}
                    >
                      <div className="icon mb-3 display-4">{initiative.icon}</div>
                      <h3 className="fw-bold mb-3">{initiative.title}</h3>
                      <p className="mb-4">{initiative.description}</p>
                      <button
                        className="btn btn-outline-light rounded-pill px-4 mx-auto"
                        onClick={() => navigate('/blog')}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers Section */}
      <section className="impact-section py-5 bg-light">
        <div className="container">
          <div className="row text-center g-4">
            {impactData.map((item, index) => (
              <CountUpNumber
                key={index}
                endNumber={item.number}
                suffix={item.suffix}
                label={item.label}
                color={item.color}
                duration={item.duration}
              />
            ))}
          </div>
        </div>
      </section>

      <style>
        {`
          .initiative-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
          }

          .initiative-card.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .initiative-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }

          .card-img-overlay {
            transition: all 0.3s ease;
          }

          .initiative-card:hover .card-img-overlay {
            opacity: 1 !important;
          }

          .initiatives-section {
            overflow-x: hidden;
          }

          /* Impact Numbers Styles */
          .impact-section {
            overflow: hidden;
          }

          .impact-card {
            transform: translateY(30px);
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 10px;
          }

          .impact-card.animate-in {
            transform: translateY(0);
            opacity: 1;
          }

          .impact-card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
          }

          /* Staggered animation for impact cards */
          .impact-card:nth-child(1) { transition-delay: 0s; }
          .impact-card:nth-child(2) { transition-delay: 0.1s; }
          .impact-card:nth-child(3) { transition-delay: 0.2s; }
          .impact-card:nth-child(4) { transition-delay: 0.3s; }

          @media (max-width: 768px) {
            .impact-card {
              margin: 5px;
            }
            
            .impact-card h3 {
              font-size: 2.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default About;