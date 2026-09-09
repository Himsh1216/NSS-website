import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { facultyCoordinators, teamMentor } from '../data/team';

const PHOTO_HEIGHT = 300;

// Renders the member photo, or a neutral placeholder when there is no photo yet
// or the file is missing, so the page never depends on an external image service.
const MemberPhoto = ({ src, alt, className = '', style, placeholderStyle }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`placeholder-image d-flex align-items-center justify-content-center bg-light ${className}`}
        style={{ ...style, ...placeholderStyle }}
        role="img"
        aria-label={`${alt} (photo coming soon)`}
      >
        <UserCircle size={80} className="text-secondary" />
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} />;
};

const TeamMemberCard = ({ member }) => {
  const modalId = `modal-${member.id}`;
  const hasProfile = Boolean(member.description);

  return (
    <div className="col-md-4 mb-4 d-flex justify-content-center">
      <div className="card team-card h-100 shadow hover-lift w-100">
        <div className="position-relative">
          <MemberPhoto
            src={member.image}
            alt={member.name}
            className="card-img-top team-image"
            style={{ height: `${PHOTO_HEIGHT}px`, objectFit: 'cover' }}
            placeholderStyle={{ paddingBottom: '120px' }} // keep the icon above the caption overlay
          />
          <div className="card-img-overlay gradient-overlay d-flex flex-column justify-content-end">
            <div className="text-white p-3 text-center">
              <h5 className="card-title mb-1 fw-bold">{member.name}</h5>
              <p className="card-text small mb-0">{member.role}</p>
              {member.school && <p className="card-text small mb-0 opacity-75">{member.school}</p>}
              {hasProfile && (
                <button
                  type="button"
                  className="btn btn-sm btn-light mt-2"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                >
                  View Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {hasProfile && (
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}-title`} aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalId}-title`}>{member.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <MemberPhoto
                      src={member.image}
                      alt={member.name}
                      className="img-fluid rounded w-100"
                      placeholderStyle={{ minHeight: '200px' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <h4 className="mb-1">{member.role}</h4>
                    {member.school && <p className="text-secondary mb-3">{member.school}</p>}
                    <p className="text-muted mb-0">{member.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TeamSection = ({ title, members }) => (
  <section className="team-section mb-5">
    <div className="text-center">
      <h2 className="section-title h4 mb-4">{title}</h2>
    </div>
    <div className="row justify-content-center">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  </section>
);

const TeamPage = () => (
  <div className="team-page pb-5">
    <div className="container">
      <header className="text-center mb-5">
        <h1 className="display-4 mb-3">Our Team</h1>
        <p className="lead text-muted">Meet the dedicated individuals who make NSS IIT Bhubaneswar possible</p>
      </header>

      <TeamSection title="Faculty Leadership" members={facultyCoordinators} />
      <TeamSection title="Team Mentor" members={teamMentor} />
    </div>

    <style>
      {`
        .team-page {
          background-color: #f8f9fa;
          padding-top: 170px; /* clears the 140px fixed navbar */
        }

        .team-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          border: none;
          max-width: 350px;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }

        .gradient-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8));
          opacity: 0.95;
          transition: opacity 0.3s ease;
        }

        .team-card:hover .gradient-overlay {
          opacity: 1;
        }

        .team-image {
          transition: transform 0.3s ease;
          width: 100%;
          object-fit: cover;
        }

        .team-card:hover .team-image {
          transform: scale(1.05);
        }

        .section-title {
          position: relative;
          padding-bottom: 15px;
          color: #2c3e50;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: #007bff;
        }

        .placeholder-image {
          background-color: #f8f9fa;
          border-radius: 4px;
        }

        .modal-content {
          border-radius: 15px;
          border: none;
        }

        .modal-header {
          border-bottom: 1px solid rgba(0,0,0,0.1);
          background-color: #f8f9fa;
          border-radius: 15px 15px 0 0;
        }

        .modal-body {
          padding: 2rem;
        }

        .display-4 {
          color: #2c3e50;
          font-weight: 600;
        }

        .lead {
          color: #6c757d;
        }

        @media (max-width: 768px) {
          .team-card {
            margin-bottom: 1.5rem;
          }

          .modal-dialog {
            margin: 0.5rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .display-4 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .team-card {
            margin-bottom: 1rem;
          }

          .section-title {
            font-size: 1.25rem;
          }

          .display-4 {
            font-size: 2rem;
          }
        }
      `}
    </style>
  </div>
);

export default TeamPage;
