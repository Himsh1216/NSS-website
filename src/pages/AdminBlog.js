import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const AdminBlog = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    summary: '',
    content: '',
    image: '',
    imageAlt: ''
  });

  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('adminToken');
    if (stored) {
      verifyToken(stored);
    }
  }, []);

  const verifyToken = (tok) => {
    fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + tok }
    }).then(res => {
      if (res.ok) {
        setAuthed(true);
        setToken(tok);
        localStorage.setItem('adminToken', tok);
        setError('');
      } else {
        setError('Unauthorized');
        setAuthed(false);
        setToken('');
        localStorage.removeItem('adminToken');
      }
    }).catch(() => {
      setError('Network error');
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (credentialResponse) => {
    verifyToken(credentialResponse.credential);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tok = localStorage.getItem('adminToken') || token;
    fetch('/api/blog-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tok },
      body: JSON.stringify(form)
    }).then(res => {
      if (res.ok) {
        setForm({ title: '', date: '', summary: '', content: '', image: '', imageAlt: '' });
        alert('Post added');
      } else {
        alert('Failed to add post');
      }
    });
  };

  if (!authed) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Admin Login</h1>
        <div style={{ maxWidth: '400px' }}>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => setError('Login Failed')} />
          {error && <div className="text-danger mt-3">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Add Blog Post</h1>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" placeholder="Title" required />
        </div>
        <div className="mb-3">
          <input type="text" name="date" value={form.date} onChange={handleChange} className="form-control" placeholder="Date" required />
        </div>
        <div className="mb-3">
          <input type="text" name="summary" value={form.summary} onChange={handleChange} className="form-control" placeholder="Summary" required />
        </div>
        <div className="mb-3">
          <textarea name="content" value={form.content} onChange={handleChange} className="form-control" placeholder="Content" rows="6" required />
        </div>
        <div className="mb-3">
          <input type="text" name="image" value={form.image} onChange={handleChange} className="form-control" placeholder="Image URL" />
        </div>
        <div className="mb-3">
          <input type="text" name="imageAlt" value={form.imageAlt} onChange={handleChange} className="form-control" placeholder="Image Alt Text" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AdminBlog;
