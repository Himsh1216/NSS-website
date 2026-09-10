import React, { useState, useEffect } from 'react';
import { Calendar, Search, Users } from 'lucide-react';

// Shown for posts without a usable photo: the branded share image served from public/.
const EVENT_PLACEHOLDER = '/og-image.png';

const postImage = (image) => (image && !image.includes('/api/placeholder') ? image : EVENT_PLACEHOLDER);

const showFallbackImage = (e) => {
  e.target.onerror = null;
  e.target.src = EVENT_PLACEHOLDER;
};

const NSSBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/blog-posts')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (data && typeof data === 'object' && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.warn('Unexpected API response format:', data);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch blog posts:', error);
        setPosts([]);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (post.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || (post.date || '').includes(selectedYear);
    return matchesSearch && matchesYear;
  });

  return (
    <div className="team-page pb-5">
      <div className="container">
        {/* Header Section */}
        <header className="text-center mb-5">
          <h1 className="display-4 mb-3">NSS Blog</h1>
          <p className="lead text-muted">Discover our journey of service and impact</p>
        </header>

        {/* Search and Filter */}
        <div className="row mb-4">
          <div className="col-md-8 mb-3 mb-md-0">
            <div className="position-relative">
              <Search className="position-absolute top-50 translate-middle-y" style={{ left: '15px' }} />
              <input
                type="text"
                placeholder="Search blog posts..."
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
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="col-12 text-center py-5">
              <div className="text-muted">
                <Calendar size={48} className="mb-3 opacity-50" />
                <h4>No blog posts found</h4>
                <p>Blog posts will appear here when available.</p>
              </div>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
            <div key={post.id || `post-${index}`} className="col-md-6 col-lg-4 mb-4">
              <div className="card team-card h-100 shadow hover-lift">
                <div className="position-relative">
                  <img
                    src={postImage(post.image)}
                    alt={post.imageAlt || post.title}
                    className="card-img-top team-image"
                    style={{ height: '300px', objectFit: 'cover' }}
                    onError={showFallbackImage}
                  />
                  <div className="card-img-overlay gradient-overlay d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-end">
                      <span className="badge bg-light text-primary">
                        {post.stats?.type || 'Event'}
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
          ))
          )}
        </div>

        {/* Modal */}
        {selectedPost && (
          <>
            <div className="modal-backdrop fade show" onClick={() => setSelectedPost(null)}></div>
            <div className="modal fade show" 
                 style={{ display: 'block' }}
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="blogModalTitle"
                 aria-hidden="false"
                 onClick={() => setSelectedPost(null)}>
              <div className="modal-dialog modal-lg" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                  <div className="modal-header border-0 pb-0">
                    <h5 id="blogModalTitle" className="modal-title fw-bold">{selectedPost?.title}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedPost(null)}></button>
                  </div>
                  <div className="modal-body p-4">
                    <img
                      src={postImage(selectedPost?.image)}
                      alt={selectedPost?.imageAlt || selectedPost?.title}
                      className="img-fluid rounded mb-4"
                      onError={showFallbackImage}
                    />
                    
                    <div className="d-flex gap-3 mb-4">
                      <div className="d-flex align-items-center text-muted">
                        <Calendar size={16} className="me-2" />
                        {selectedPost?.date}
                      </div>
                      {selectedPost?.stats?.participants > 0 && (
                        <div className="d-flex align-items-center text-muted">
                          <Users size={16} className="me-2" />
                          {selectedPost?.stats.participants} Participants
                        </div>
                      )}
                    </div>

                    <div className="prose">
                      {selectedPost?.content.split(/\n\s*\n|\?\s/).filter(p => p.trim()).map((paragraph, idx) => (
                        <p key={idx} className="mb-4">{paragraph.trim()}</p>
                      ))}
                    </div>

                    {selectedPost?.team && selectedPost.team.length > 0 && (
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
          </>
        )}
        
        {/* CSS Styles */}
        <style>
          {`
            .team-page {
              padding-top: 170px; /* clears the 140px fixed navbar */
            }

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

            .modal-backdrop {
              background-color: rgba(0,0,0,0.5);
            }

            .modal-content {
              border-radius: 15px;
              border: none;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            }

            .modal-header {
              padding: 1.5rem 1.5rem 0 1.5rem;
            }

            .modal-body {
              padding: 1.5rem !important;
              max-height: 70vh;
              overflow-y: auto;
            }

            .modal-body::-webkit-scrollbar {
              width: 6px;
            }

            .modal-body::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
            }

            .modal-body::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 3px;
            }

            .modal-body::-webkit-scrollbar-thumb:hover {
              background: #a8a8a8;
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
