import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserCircle } from 'lucide-react';


const TeamPage = () => {
  // Faculty Coordinator
  const coordinator = [
    {
      name: 'Prof. Rajesh Roshan Dash',
      role: 'Dean Student Affairs',
      image: '/Team_photos/Rajesh_Roshan_sir.jpeg',
      description: 'Dr. Rajesh Roshan Dash brings a wealth of academic and professional expertise to the position of Dean of Student Affairs. With a distinguished educational background, Dr. Rajesh Roshan Dash completed a Ph.D. in Civil Engineering with a specialization in Environmental Engineering from the prestigious Indian Institute of Technology (IIT) Roorkee in 2008. Prior to this, Dr. Rajesh Roshan Dash earned a Master of Engineering (M.E.) in Environmental Engineering from Motilal Nehru National Institute of Technology (MNNIT), Allahabad, in 2001 and a Bachelor of Engineering (B.E.) in Civil Engineering from Utkal University, Bhubaneswar, in 1998. Dr. Rajesh Roshan Dash is committed to fostering a vibrant, inclusive, and supportive environment for students, combining academic excellence with opportunities for personal growth and development. With a strong foundation in environmental engineering and civil engineering, Dr. Rajesh Roshan Dash integrates technical expertise with a vision for holistic student engagement, ensuring a well-rounded and fulfilling campus experience.'
    },
    { 
      name: 'Sivaiah Bathula Sir', 
      role: 'NSS Faculty Coordinator', 
      image: '/Team_photos/Sivaiah_Bathula_sir_photo.png',
      description: `Dr. Sivaiah Bathula is an Associate Professor at IIT Bhubaneswar, serving in the School of Minerals, Metallurgical and Materials Engineering. His research focuses on advanced materials and their applications in thermoelectrics, nanocomposites, and solid-state lighting. For more detailed information, visit his profile at IIT Bhubaneswar.`
    },
  ];

  // Team Mentor
  const teamMentor = [
    { 
      name: 'Chandra Sekhar Karri', 
      role: 'Team Mentor', 
      image: '/Team_photos/team_mentor.jpeg' 
    }
  ];

  // Cultural Team
  const cultCoordinators = [
    { 
      name: 'Ankita Patra', 
      role: 'NSS Cultural Team Coordinator', 
      image: '/Team_photos/NSS_cultural_team_photos/Ankita_Patra_photo.jpeg' 
    },
    { 
      name: 'Satyam', 
      role: 'NSS Cultural Team Coordinator', 
      image: '/Team_photos/NSS_cultural_team_photos/Satyam_photo.jpeg' 
    }
  ];

  const culturalTeams = {
    foodAndFinance: {
      title: "Food and Finance Team",
      members: [
        { name: 'Chansu', role: 'Team Leader', image: '/Team_photos/NSS_cultural_team_photos/Chansu_Parte_photo.jpeg' },
        { name: 'Abhishek Kumar Singh', role: 'Team Executive', image: '/Team_photos/NSS_cultural_team_photos/Abhishek_Singh_photo.jpeg' },
        { name: 'Uttam Modi', role: 'Team Executive', image: '/Team_photos/NSS_cultural_team_photos/Uttam.jpeg' }
      ]
    },
    crowdManagement: {
      title: "Crowd Management Team",
      members: [
        { name: 'Ripunjoy Kumar Pandey', role: 'Team Leader', image: '/Team_photos/NSS_cultural_team_photos/Ripunjoy_photo.JPG' },
        { name: 'Arunava', role: 'Team Executive', image: '' },
        { name: 'Sardhak Nandam', role: 'Team Executive', image: '' },
        { name: 'Suhas', role: 'Team Executive', image: '' }
      ]
    },
    anchoring: {
      title: "Anchoring Team",
      members: [
        { name: 'Vijeta Moond', role: 'Team Leader', image: '/Team_photos/NSS_cultural_team_photos/Vijeta_Moond_photo.jpeg' },
        { name: 'Nikhilesh', role: 'Team Executive', image: '/Team_photos/NSS_cultural_team_photos/Nikhilesh.jpeg' },
        { name: 'Rhutika', role: 'Team Executive', image: '/Team_photos/NSS_cultural_team_photos/Rhutika_Kshirsagar_photo.jpeg' }
      ]
    },
    examiners: {
      title: "Examining Team",
      members: [
        { name: 'Ankita Patra', role: 'Team Leader', image: '/Team_photos/NSS_cultural_team_photos/Ankita_Patra_photo.jpeg' },
        { name: 'Anish Medchalam', role: 'Team Executive', image: '/Team_photos/NSS_cultural_team_photos/Anish_Medchalam_photo.jpeg' },
        { name: 'Anjali', role: 'Team Executive', image: '/Team_photos/NSS_cultural_team_photos/Anjali_Sharma_photo.jpeg' }
      ]
    }
  };

  // Technical Team
  const techCoordinators = [
    { name: 'Nitya Singh', role: 'Technical Team Coordinator', image: '/Team_photos/NSS_tech_team_photos/Nitya_Singh_photo.jpeg' },
    { name: 'Himanshu Sharma', role: 'Technical Team Coordinator', image: '/Team_photos/NSS_tech_team_photos/Himanshu_photo.jpeg' }
  ];

  const technicalTeams = {
    design: {
      title: "Design Team",
      members: [
        { name: 'Omkar Anand Mishra', role: 'Team Leader', image: '/Team_photos/NSS_tech_team_photos/Design_team/Omkar_Anand_photo.jpeg' },
        { name: 'Sake Yuvasari', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Design_team/Suke_Yuvasari_photo.png' },
        { name: 'Pragnya', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Design_team/Pragnya_photo.jpeg' },
        { name: 'Bhumika', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Design_team/Bhumika_photo.jpeg' },
        { name: 'Pawan Sai', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Design_team/Pawan_Sai_photo.jpeg' }
      ]
    },
    photography: {
      title: "Photography Team",
      members: [
        { name: 'Khushboo Sangod', role: 'Team Leader', image: '/Team_photos/NSS_tech_team_photos/Photography_team/Khushboo_photo.jpeg' },
        { name: 'Vishal Prajapati', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Photography_team/Vishal_photo.jpeg' },
        { name: 'Nitish', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Photography_team/Nitish_Reddy_photo.jpeg' }
      ]
    },
    drafting: {
      title: "Drafting Team",
      members: [
        { name: 'Budhwant Somani', role: 'Team Leader', image: '/Team_photos/NSS_tech_team_photos/Drafting_team/Bhudwant_photo.jpeg' },
        { name: 'Pranjal Rout', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Drafting_team/Pranjal_Rout_photo.jpeg' },
        { name: 'Hari Kumar Saha', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Drafting_team/Hari_photo.jpg' },
      ]
    },
    blogging: {
      title: "Blogging Team",
      members: [
        { name: 'Prabhuparth Choudhar', role: 'Team Leader', image: '/Team_photos/NSS_tech_team_photos/Blogging_team/Prabhuparth_Choudhar_photo.jpeg' },
        { name: 'Shashank Vadekar', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Blogging_team/Shashank_photo.jpeg' },
        { name: 'Nirmala Chinta', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Blogging_team/Nirmala_photo.jpeg' },
        { name: 'Raam Sundaran', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Blogging_team/Raam_Sundaran_photo.jpeg' }
      ]
    },
    webManagement: {
      title: "Website Management Team",
      members: [
        { name: 'Prakhar Soni', role: 'Team Leader', image: '/Team_photos/NSS_tech_team_photos/Website_management_team/Prakhar_Soni_photo.jpeg' },
        { name: 'Aman Kumar Choudhary', role: 'Team Executive', image: '/Team_photos/NSS_tech_team_photos/Website_management_team/Aman_Choudary.jpg' },
      ]
    }
  };

  const TeamMemberCard = ({ member, isCoordinator = false }) => (
    <div className="col-md-4 mb-4 d-flex justify-content-center">
      <div className="card team-card h-100 shadow hover-lift w-100">
        <div className="position-relative">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name} 
              className="card-img-top team-image"
              style={{ height: '300px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
              }}
            />
          ) : (
            <div className="placeholder-image d-flex align-items-center justify-content-center bg-light" 
                 style={{ height: '300px' }}>
              <UserCircle size={64} className="text-secondary" />
            </div>
          )}
          <div className="card-img-overlay gradient-overlay d-flex flex-column justify-content-end">
            <div className="text-white p-3 text-center">
              <h5 className="card-title mb-1 fw-bold">{member.name}</h5>
              <p className="card-text small mb-0">{member.role}</p>
              {isCoordinator && member.description && (
                <button 
                  className="btn btn-sm btn-light mt-2" 
                  data-bs-toggle="modal" 
                  data-bs-target={`#modal-${member.name.replace(/\s+/g, '-')}`}
                >
                  View Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for coordinators */}
      {isCoordinator && member.description && (
        <div className="modal fade" id={`modal-${member.name.replace(/\s+/g, '-')}`} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{member.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <img src={member.image} alt={member.name} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-8">
                    <h4 className="mb-3">{member.role}</h4>
                    <p className="text-muted">{member.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Component for team section
  const TeamSection = ({ title, description, members, className = "" }) => (
    <div className={`team-section ${className} mb-5`}>
      <h3 className="section-title h4 mb-4 text-center">{title}</h3>
      {description && <p className="text-muted mb-4 text-center">{description}</p>}
      <div className="row justify-content-center">{members.map((member, index) => (
        <TeamMemberCard key={index} member={member} isCoordinator={title.includes('Coordinator')} />
      ))}</div>
    </div>
  );

  return (
    <div className="team-page py-5">
      <div className="container">
        {/* Header Section */}
        <header className="text-center mb-5">
          <h1 className="display-4 mb-3">Our Team</h1>
          <p className="lead text-muted">Meet the dedicated individuals who make NSS IIT Bhubaneswar possible</p>
        </header>

        {/* Faculty Coordinator */}
        <section className="mb-5">
          <TeamSection 
            title="Faculty Coordinators" 
            members={coordinator} 
            className="coordinator-section"
          />
        </section>

        {/* Team Mentor */}
        <section className="mb-5">
          <TeamSection 
            title="Team Mentor" 
            members={teamMentor} 
            className="mentor-section"
          />
        </section>
      {/* Technical Team */}
      <section className="mb-5">
          <h2 className="h3 mb-4 text-center">NSS Technical Team</h2>
          
        {/* Technical Team Coordinators */}
        <TeamSection 
          title="Technical Team Coordinators" 
          members={techCoordinators} 
          className="technical-coordinators"
        />

        {/* Technical Sub-teams */}
        {Object.values(technicalTeams).map((team, index) => (
          <TeamSection 
            key={index}
            title={team.title} 
            members={team.members} 
            className="technical-subteam"
          />
        ))}
      </section>

        {/* Cultural Team */}
        <section className="mb-5">
          <h2 className="h3 mb-4 text-center">NSS Cultural Team</h2>
          
          {/* Cultural Team Coordinators */}
          <TeamSection 
            title="Cultural Team Coordinators" 
            members={cultCoordinators} 
            className="cultural-coordinators"
          />

          {/* Cultural Sub-teams */}
          {Object.values(culturalTeams).map((team, index) => (
            <TeamSection 
              key={index}
              title={team.title} 
              members={team.members} 
              className="cultural-subteam"
            />
          ))}
        </section>
      </div>
      
      {/* CSS Styles */}
      <style>
        {`
          .team-page {
            background-color: #f8f9fa;
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
            height: 300px;
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
            margin: 0 auto;
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
            transition: background-color 0.3s ease;
          }

          .placeholder-image:hover {
            background-color: #e9ecef;
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
};

export default TeamPage;