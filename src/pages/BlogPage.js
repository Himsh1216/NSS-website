import React, { useState } from 'react';
import { Calendar, Eye, ArrowRight, MapPin, Clock, Search, Filter, X, Users, Target } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { blogPosts } from './blogPosts';

const NSSBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || post.date.includes(selectedYear);
    return matchesSearch && matchesYear;
  });

  return (
    <div className="team-page py-5">
      <div className="container">
        {/* Header Section */}
        <header className="text-center mb-5">
          <h1 className="display-4 mb-3">NSS Events</h1>
          <p className="lead text-muted">Discover our journey of service and impact</p>
        </header>

        {/* Search and Filter */}
        <div className="row mb-4">
          <div className="col-md-8 mb-3 mb-md-0">
            <div className="position-relative">
              <Search className="position-absolute top-50 translate-middle-y" style={{ left: '15px' }} />
              <input
                type="text"
                placeholder="Search events..."
                className="form-control form-control-lg ps-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select form-select-lg"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {[2025, 2024, 2021, 2020, 2019].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="row">
          {filteredPosts.map((post, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card team-card h-100 shadow hover-lift">
                <div className="position-relative">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="card-img-top team-image"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-img-overlay gradient-overlay d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-end">
                      <span className="badge bg-light text-primary">
                        {post.stats.type}
                      </span>
                    </div>
                    <div className="text-white p-3">
                      <h5 className="card-title mb-1 fw-bold">{post.title}</h5>
                      <p className="card-text small mb-2 d-flex align-items-center">
                        <Calendar size={14} className="me-1" />
                        {post.date}
                      </p>
                      <p className="card-text small line-clamp-2">{post.summary}</p>
                      <button
                        className="btn btn-light btn-sm mt-2"
                        onClick={() => setSelectedPost(post)}
                      >
                        Read Full Story
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <div className={`modal fade ${selectedPost ? 'show' : ''}`} 
             style={{ display: selectedPost ? 'block' : 'none' }}
             tabIndex="-1"
             onClick={() => setSelectedPost(null)}>
          <div className="modal-dialog modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedPost?.title}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedPost(null)}></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedPost?.image}
                  alt={selectedPost?.imageAlt}
                  className="img-fluid rounded mb-4"
                />
                
                <div className="d-flex gap-3 mb-4">
                  <div className="d-flex align-items-center text-muted">
                    <Calendar size={16} className="me-2" />
                    {selectedPost?.date}
                  </div>
                  {selectedPost?.stats.participants && (
                    <div className="d-flex align-items-center text-muted">
                      <Users size={16} className="me-2" />
                      {selectedPost?.stats.participants} Participants
                    </div>
                  )}
                </div>

                <div className="prose">
                  {selectedPost?.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>

                {selectedPost?.team && (
                  <div className="mt-4">
                    <h4>Team Members</h4>
                    <ul className="list-unstyled">
                      {selectedPost.team.map((member, idx) => (
                        <li key={idx} className="mb-2">{member}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS Styles */}
        <style>
          {`
            .team-card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              overflow: hidden;
              border: none;
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
            }
            
            .team-card:hover .team-image {
              transform: scale(1.05);
            }

            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .modal {
              background-color: rgba(0,0,0,0.5);
            }

            .modal-content {
              border-radius: 15px;
              border: none;
            }

            .modal.show {
              display: block;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default NSSBlog;
