import React, { useState, useEffect } from 'react';

const AdminBlog = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    summary: '',
    content: '',
    image: '',
    imageAlt: ''
  });

  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('adminPw');
    if (stored) {
      verifyPassword(stored);
    }
  }, []);

  const verifyPassword = (pw) => {
    fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'x-admin-password': pw }
    }).then(res => {
      if (res.ok) {
        setAuthed(true);
        localStorage.setItem('adminPw', pw);
        setError('');
      } else {
        setError('Incorrect password');
        setAuthed(false);
        localStorage.removeItem('adminPw');
      }
    }).catch(() => {
      setError('Network error');
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    verifyPassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pw = localStorage.getItem('adminPw') || '';
    fetch('/api/blog-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
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
        <form onSubmit={handleLogin} className="mb-5" style={{maxWidth: '400px'}}>
          <div className="mb-3">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
          </div>
          {error && <div className="text-danger mb-3">{error}</div>}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
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
