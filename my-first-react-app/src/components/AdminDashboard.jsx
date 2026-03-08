import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminBlogList from './AdminBlogList.jsx';
import AdminBlogEditor from './AdminBlogEditor.jsx';

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Replace 'your-secret-password' with your actual password
    if (password === '#pswrdVre&&4589') {
      setAuthenticated(true);
      navigate('/admin/blogs');
    } else {
      alert('Incorrect password!');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-black"
            placeholder="Enter password"
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <Routes>
        <Route path="blogs" element={<AdminBlogList />} />
        <Route path="edit/:id" element={<AdminBlogEditor />} />
        <Route path="*" element={<Navigate to="blogs" />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;