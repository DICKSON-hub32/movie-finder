import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTheme } from "../ThemeContext.jsx";
import Feedback from "../sections/Feedback";
import Footer from "../sections/Footer";
import axios from "axios";

const BlogPost = () => {
  const { theme, toggleTheme } = useTheme();
  console.log("Theme:", theme); // Debug theme state
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend.moviefinder-teckish.com/api/blogs/all`);
        const allBlogs = response.data;
        console.log("All blogs:", allBlogs);
        console.log("Looking for ID:", id);
        const foundBlog = allBlogs.find((b) => b._id === id);
        if (foundBlog) {
          setBlog(foundBlog);
          axios.post(`https://backend.moviefinder-teckish.com/api/blogs/view/${id}`);
        } else {
          setError("Blog not found");
        }
        setBlogs(allBlogs);
      } catch (err) {
        setError("Failed to fetch blog");
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!blog) return null;

  const paragraphs = blog.article
    .split(/\.+\s/)
    .filter((p) => p.trim())
    .map((p) => p.trim() + ".");

  return (
    <>
      <Helmet>
        <title>{blog.title} | Movie News & Insights</title>
        <meta name="description" content={`${blog.summary} Read the full article for more insights on ${blog.title}.`} />
        <meta name="keywords" content={`${blog.title.split(" ")[0]}, movie blog, film insights, ${blog.title}`} />
        <link rel="canonical" href={`https://moviefinder-teckish.com/blog/${id}`} />
        <meta property="og:title" content={`${blog.title} | Movie News & Insights`} />
        <meta property="og:description" content={`${blog.summary} Read the full article for more insights.`} />
        <meta property="og:url" content={`https://moviefinder-teckish.com/blog/${id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.imageUrl || "https://moviefinder-teckish.com/default-image.jpg"} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": blog.summary,
            "image": blog.imageUrl || "https://moviefinder-teckish.com/default-image.jpg",
            "author": {
              "@type": "Organization",
              "name": "Your Movie Blog"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Your Movie Blog",
              "logo": {
                "@type": "ImageObject",
                "url": "https://moviefinder-teckish.com/logo.png"
              }
            },
            "datePublished": blog.createdAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://moviefinder-teckish.com/blog/${id}`
            }
          })}
        </script>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} | Movie News & Insights`} />
        <meta name="twitter:description" content={`${blog.summary} Read the full article for more insights.`} />
        <meta name="twitter:image" content={blog.imageUrl || "https://moviefinder-teckish.com/default-image.jpg"} />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-4xl font-bold text-center flex-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{blog.title}</h1>
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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
          <div></div>
          {/* <div className="bg-gray-700 p-4 rounded-lg text-center mb-8">
            <p className="text-gray-200 font-semibold">Advertisement</p>
            <div
              className="bg-gray-600 h-24 flex items-center justify-center mt-2"
              style={{ maxWidth: "728px", margin: "0 auto" }}
            >
              <p className="text-gray-300">Google Ad Placeholder (728x90)</p>
            </div>
          </div> */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
            <div className="mt-2 flex items-center mb-6">
        <img
          src={blog.authorImage}
          alt={`${blog.author} - Author`}
          className="w-8 h-8 rounded-full mr-2 object-cover"
        />
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          By {blog.author}
        </p>
      </div>
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={`Featured image for ${blog.title} - Movie blog post`}
                  className="w-full aspect-[4/3] object-cover rounded-lg mb-6"
                />
              )}
              <p className={`text-lg mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{blog.summary}</p>
              <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert text-gray-200' : 'text-gray-800'}`}>
                <h2 className="text-2xl font-semibold mb-6">{blog.title}</h2>
                {paragraphs.map((p, index) => (
                  <p key={index} className="mb-6 leading-loose">
                    {p}
                  </p>
                ))}
                <h2 className="text-2xl font-semibold mb-6 mt-8">Advice</h2>
                <p className={`mb-6 leading-loose ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{blog.advice}</p>

              </div>
              <div></div>
              {/* <div className="bg-gray-700 p-4 rounded-lg text-center mb-8">
                <p className="text-gray-200 font-semibold">Advertisement</p>
                <div
                  className="bg-gray-600 h-32 flex items-center justify-center mt-2"
                  style={{ maxWidth: "300px", margin: "0 auto" }}
                >
                  <p className="text-gray-300">Google Ad Placeholder (300x250)</p>
                </div>
              </div> */}
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Featured Blogs</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {blogs
                    .filter((b) => b._id !== id)
                    .slice(0, 3)
                    .map((b) => (
                      <article
                        key={b._id}
                        className="p-2 bg-white shadow-md rounded-lg border hover:scale-[1.02] transition-all duration-300"
                      >
                        <Link to={`/blog/${b._id}`}>
                          <h3 className="text-sm font-semibold text-blue-700 hover:underline">
                            {b.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(b.createdAt).toLocaleString()}
                        </p>
                        {b.imageUrl && (
                          <img
                            src={b.imageUrl}
                            alt={`Thumbnail for ${b.title} - Movie blog post`}
                            className="mt-1 w-full aspect-[4/3] object-cover rounded"
                          />
                        )}
                        <p className="text-xs mt-1 text-gray-700">{b.summary.split(" ").slice(0, 6).join(" ") + (b.summary.split(" ").length > 6 ? "..." : "")}</p>
                      </article>
                    ))}
                </div>
              </section>
            </div>
            <aside className="lg:w-1/3">
              <div className="sticky top-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 mt-16">
                  <h3 className="text-xl font-bold mb-4 text-white">More Articles</h3>
                  <ul className="space-y-3">
                    {blogs
                      .filter((b) => b._id !== id)
                      .slice(0, 3)
                      .map((b) => (
                        <li key={b._id}>
                          <Link to={`/blog/${b._id}`} className="text-blue-400 hover:underline text-sm">
                            {b.title}
                          </Link>
                          <p className="text-xs text-gray-400">
                            {new Date(b.createdAt).toLocaleString()}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
                <div></div>
                {/* <div className="bg-gray-700 p-4 rounded-lg text-center mb-6">
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
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Return to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default BlogPost;