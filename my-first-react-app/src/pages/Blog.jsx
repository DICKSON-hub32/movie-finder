import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Feedback from "../sections/Feedback";
import Footer from "../sections/Footer";
import axios from "axios";

const Blog = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  useEffect(() => {
    axios
      .get("https://backend.moviefinder-teckish.com/api/blogs/all")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.error("Failed to fetch blogs:", err));

    axios
      .get("https://backend.moviefinder-teckish.com/api/news/latest-movie-news")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Failed to fetch news:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const truncateSummary = (text) => {
    if (!text) return "No summary available.";
    const words = text.split(" ");
    return words.length > 6 ? words.slice(0, 6).join(" ") + "..." : text;
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Helmet>
        <title>Movie News & Updates | Latest Blog Posts</title>
        <meta
          name="description"
          content="Explore the latest movie news, trending blog posts, and updates on your favorite films. Stay informed with our featured content."
        />
        <meta
          name="keywords"
          content="movie news, blog posts, film updates, trending movies, cinema"
        />
        <link rel="canonical" href="https://moviefinder-teckish.com/blog" />
        <meta
          property="og:title"
          content="Movie News & Updates | Latest Blog Posts"
        />
        <meta
          property="og:description"
          content="Explore the latest movie news, trending blog posts, and updates on your favorite films."
        />
        <meta
          property="og:url"
          content="https://moviefinder-teckish.com/blog"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Movie News & Updates | Latest Blog Posts"
        />
        <meta
          name="twitter:description"
          content="Explore the latest movie news, trending blog posts, and updates on your favorite films."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-3xl font-bold text-center flex-1   'text-white' : 'text-black'}`}
            >
              Movie News & Updates
            </h1>
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
              aria-label={`Switch to   'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button> */}
          </div>
          <section className="mt-6 text-center max-w-4xl mx-auto px-4">
            <p className={`text-lg   text-gray-300`}>
              Welcome to the Blog page of Movie Finder, where you can discover a
              world of cinematic treasures through our ultimate guide to
              trending films and beyond. This section is dedicated to delivering
              in-depth reviews, insightful articles, and the latest industry
              news, all crafted to enhance your movie-watching experience. As a
              hub for movie enthusiasts, our blog offers a rich tapestry of
              content that explores the art and business of filmmaking.
            </p>
            <p className={`text-lg mt-4   text-gray-300`}>
              Dive into a wealth of knowledge with Movie Finder’s blog,
              featuring personalized recommendations and detailed analyses of
              trending films that cater to every taste. Our posts cover a wide
              range of topics, from movie reviews to industry trends, ensuring
              you stay informed and entertained. This page is your go-to
              resource for thought-provoking content that deepens your
              appreciation for the cinematic world.
            </p>
            <p className={`text-lg mt-4   text-gray-300`}>
              Explore the latest updates and expert perspectives on Movie
              Finder’s Blog page, where each article is designed to enhance your
              movie-watching experience with fresh insights. From breaking
              industry news to comprehensive guides on upcoming releases, our
              content is optimized to keep you engaged with the evolving
              landscape of cinema. Visit regularly to uncover new posts that
              celebrate the magic of movies and inspire your next viewing
              choice.
            </p>
          </section>
          {/* <div className="bg-gray-700 p-3 rounded-lg text-center mb-6">
            <p className="text-gray-200 font-semibold">Advertisement</p>
            <div
              className="bg-gray-600 h-24 flex items-center justify-center mt-2"
              style={{ maxWidth: "728px", margin: "0 auto" }}
            >
              <p className="text-gray-300">Google Ad Placeholder (728x90)</p>
            </div>
          </div> */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog) => (
                      <article
                        key={blog._id}
                        className="p-3 bg-white shadow-lg rounded-xl border hover:scale-[1.02] transition-all duration-300"
                      >
                        <Link to={`/blog/${blog.slug || blog._id}`}>
                          <h3
                            className={`text-lg font-semibold   text-blue-700 hover:underline`}
                          >
                            {blog.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(blog.createdAt).toLocaleString()}
                        </p>
                        {blog.imageUrl && (
                          <img
                            src={blog.imageUrl}
                            alt={`Thumbnail for ${blog.title} - Movie blog post`}
                            className="mt-2 w-full aspect-[4/3] object-cover rounded-lg"
                          />
                        )}
                        <p className={`text-sm mt-2   text-gray-700`}>
                          {truncateSummary(blog.summary)}
                        </p>
                      </article>
                    ))
                  ) : (
                    <p className="text-gray-400">
                      No featured posts available.
                    </p>
                  )}
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 gap-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-lg font-semibold text-white">
                    {currentPage}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </section>
              <div></div>
              {/* <div className="bg-gray-700 p-3 rounded-lg text-center mb-6 hidden md:block">
                <p className="text-gray-200 font-semibold">Advertisement</p>
                <div
                  className="bg-gray-600 h-32 flex items-center justify-center mt-2"
                  style={{ maxWidth: "300px", margin: "0 auto" }}
                >
                  <p className="text-gray-300">Google Ad Placeholder (300x250)</p>
                </div>
              </div> */}
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  🎬 Latest Movie News
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {articles.map((article, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white shadow-lg rounded-2xl border hover:scale-[1.02] transition-all duration-300"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3
                          className={`text-xl font-semibold   text-blue-700 hover:underline`}
                        >
                          {article.title}
                        </h3>
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(article.publishedAt).toLocaleString()}
                      </p>
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={`Thumbnail for ${article.title} - Movie news`}
                          className="mt-3 h-48 w-full object-cover rounded-xl"
                        />
                      )}
                      <p className={`mt-3   text-gray-700`}>
                        {article.description || "No description available."}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <aside className="lg:w-1/3">
              <div className="sticky top-4 mt-12">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    More Articles
                  </h3>
                  <ul className="space-y-3">
                    {blogs.slice(-3).map((blog) => (
                      <li key={blog._id}>
                        <Link
                          to={`/blog/${blog.slug || blog._id}`}
                          className="text-blue-400 hover:underline text-sm"
                        >
                          {blog.title}
                        </Link>
                        <p className="text-xs text-gray-400">
                          {new Date(blog.createdAt).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div></div>
                {/* <div className="bg-gray-700 p-3 rounded-lg text-center mb-6">
                  <p className="text-gray-200 font-semibold">Advertisement</p>
                  <div
                    className="bg-gray-600 h-48 flex items-center justify-center mt-2"
                    style={{ maxWidth: "300px", margin: "0 auto" }}
                  >
                    <p className="text-gray-300">Google Ad Placeholder (300x250)</p>
                  </div>
                </div> */}
              </div>
            </aside>
          </div>
        </main>
        <Feedback />
        <Footer />
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-white shadow-lg transition-all duration-300 z-50 ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Return to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Blog;
