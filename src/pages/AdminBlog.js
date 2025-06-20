import React, { useState } from 'react';

const AdminBlog = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    summary: '',
    content: '',
    image: '',
    imageAlt: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/blog-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({ title: '', date: '', summary: '', content: '', image: '', imageAlt: '' });
      alert('Post added');
    });
  };

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
