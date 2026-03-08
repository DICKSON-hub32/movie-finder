import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminBlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://backend.moviefinder-teckish.com/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => alert('Error fetching blog: ' + err.message));
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    axios.put(`https://backend.moviefinder-teckish.com/api/blogs/${id}`, blog)
      .then(() => alert('✅ Blog updated!'))
      .catch(err => alert('❌ Error saving: ' + err.message));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axios.delete(`https://backend.moviefinder-teckish.com/api/blogs/${id}`)
        .then(() => navigate('/admin/blogs'))
        .catch(err => alert('Error deleting blog: ' + err.message));
    }
  };

  if (!blog) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Edit Blog</h2>
        <button
          onClick={() => navigate('/admin/blogs')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg space-y-6">
        <input
          name="title"
          value={blog.title || ''}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="summary"
          value={blog.summary || ''}
          onChange={handleChange}
          placeholder="Summary"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="article"
          value={blog.article || ''}
          onChange={handleChange}
          placeholder="Article"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="advice"
          value={blog.advice || ''}
          onChange={handleChange}
          placeholder="Advice"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="imageUrl"
          value={blog.imageUrl || ''}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="author"
          value={blog.author || ''}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="authorImage"
          value={blog.authorImage || ''}
          onChange={handleChange}
          placeholder="Author Image URL"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-4">
          <button
            onClick={saveChanges}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            💾 Save
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditor;