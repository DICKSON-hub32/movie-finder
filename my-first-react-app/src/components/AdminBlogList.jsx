import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend.moviefinder-teckish.com/api/blogs/all")
      .then((res) => setBlogs(res.data))
      .catch((err) => alert("Error fetching blogs: " + err.message));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`https://backend.moviefinder-teckish.com/api/blogs/${id}`)
        .then(() => setBlogs(blogs.filter((blog) => blog._id !== id)))
        .catch((err) => alert("Error deleting blog: " + err.message));
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">All Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-400">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 bg-white shadow-lg rounded-xl border hover:scale-[1.02] transition-all duration-300"
            >
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={`Thumbnail for ${blog.title} - Admin blog post`}
                  className="w-full aspect-[4/3] object-cover rounded-lg mb-2"
                />
              )}
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Date Created: {new Date(blog.createdAt).toLocaleString()}
              </p>
              <div className="space-x-2">
                <Link
                  to={`/admin/edit/${blog._id}`}
                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Edit
                </Link>
                <Link
                  to={`/blog/${blog.slug || blog._id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;
