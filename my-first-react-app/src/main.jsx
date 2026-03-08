import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext.jsx"; // Import ThemeProvider
import App from "./App.jsx";
import MovieDetails from "./MovieDetails.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Trending from "./pages/Trending.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import "./index.css";

// NavLink component to highlight active tab
const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`hover:underline transition-colors duration-200 ${
        isActive ? "text-yellow-400 font-bold" : "text-white hover:text-yellow-200"
      }`}
    >
      {children}
    </Link>
  );
};

// Navigation component
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              Movie Finder
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/trending">Trending</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-yellow-200 focus:outline-none focus:text-yellow-200 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? "max-h-64 opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-700 rounded-b-lg">
            <div className="block px-3 py-2">
              <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
            </div>
            <div className="block px-3 py-2">
              <NavLink to="/trending" onClick={closeMobileMenu}>Trending</NavLink>
            </div>
            <div className="block px-3 py-2">
              <NavLink to="/blog" onClick={closeMobileMenu}>Blog</NavLink>
            </div>
            <div className="block px-3 py-2">
              <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
            </div>
            <div className="block px-3 py-2">
              <NavLink to="/contact" onClick={closeMobileMenu}>Contact Us</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);