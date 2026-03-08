import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Feedback from '../sections/Feedback';
import Footer from '../sections/Footer';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [showScrollTop, setShowScrollTop] = useState(false);
  


  // TMDB API Key
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    // Fetch trending movies
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&page=${currentPage}`,
          API_OPTIONS
        );
        setMovies(response.data.results || []);
        setTotalPages(Math.min(response.data.total_pages, 1000)); // TMDB caps at 1,000 pages
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    };

    // Fetch latest blog articles
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://backend.moviefinder-teckish.com/api/blogs/all');
        setBlogs(response.data.slice(0, 3)); // Limit to 3 articles
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchTrendingMovies();
    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Trending Movies | Latest Popular Films</title>
        <meta
          name="description"
          content={`Discover the top 20 trending movies right now. Page ${currentPage} of ${totalPages}. Stay updated with the latest popular films.`}
        />
        <meta
          name="keywords"
          content="trending movies, popular films, latest movies, movie trends, cinema updates"
        />
        <link rel="canonical" href={`https://moviefinder-teckish.com/trending?page=${currentPage}`} />
        <meta property="og:title" content={`Trending Movies - Page ${currentPage}`} />
        <meta
          property="og:description"
          content={`Explore the latest trending movies on page ${currentPage} of ${totalPages}.`}
        />
        <meta property="og:url" content={`https://moviefinder-teckish.com/trending?page=${currentPage}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Trending Movies - Page ${currentPage}`} />
        <meta
          name="twitter:description"
          content={`Explore the latest trending movies on page ${currentPage} of ${totalPages}.`}
        />
      </Helmet>
      <div className="min-h-screen flex flex-col text-white">
        <main className="flex-grow container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Trending Movies</h1>
          <section className="mt-6 text-center max-w-4xl mx-auto px-4">
  {/* <p className={`text-lg   text-gray-300`}>
    Step into the spotlight with Movie Finder’s Trending page, your ultimate guide to discovering a world of cinematic treasures dominating the box office and streaming platforms. This dynamic section highlights the latest trending films, offering real-time updates on what’s capturing audiences worldwide. Designed to enhance your movie-watching experience, it serves as a vibrant hub for cinephiles eager to stay ahead in the ever-evolving landscape of cinema.
  </p> */}
  <p className={`text-lg mt-4   text-gray-300`}>
    Explore an ever-refreshing lineup of trending films with in-depth reviews and insights that set Movie Finder apart as a leader in movie content. Our personalized recommendations ensure you never miss a hit, while the latest industry news keeps you informed about what’s making waves. This page is your gateway to the hottest titles, blending entertainment with expert analysis to enrich your cinematic journey.
  </p>
  <p className={`text-lg mt-4  text-gray-300}`}>
    Delve deeper into the world of cinema with Movie Finder’s Trending page, where each trending film is accompanied by comprehensive details and behind-the-scenes highlights. Stay updated with the latest industry news, from blockbuster premieres to emerging trends, all curated to enhance your movie-watching experience. Whether you’re a casual viewer or a dedicated fan, our tailored content ensures you’re always in the know about the films shaping the industry.
  </p>
</section>
          {/* <div className="bg-gray-700 p-3 rounded-lg text-center mb-6">
            <p className="text-gray-200 font-semibold">Advertisement</p>
            <div
              className="bg-gray-600 h-24 flex items-center justify-center mt-2"
              style={{ maxWidth: '728px', margin: '0 auto' }}
            >
              <p className="text-gray-300">Google Ad Placeholder (728x90)</p>
            </div>
          </div> */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <section className="mb-8 mt-12">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {movies.map((movie) => (
                    <article
                      key={movie.id}
                      onClick={() => handleMovieClick(movie.id)}
                      className="p-3 bg-white shadow-lg rounded-xl border hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={`Poster for ${movie.title} - Trending movie`}
                          className="w-full aspect-[2/3] object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">No Image</p>
                        </div>
                      )}
                      <h3 className="text-lg font-semibold text-blue-700 mt-2 hover:underline">
                        {movie.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Release Date: {movie.release_date || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                        {movie.overview || 'No description available.'}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
            <aside className="lg:w-1/3">
              <div className="sticky top-4 mt-12">
                <div className="bg-gray-700 p-3 rounded-lg text-center mb-6">
                  {/* <p className="text-gray-200 font-semibold">Advertisement</p> */}
                  <div
                    className="bg-gray-600 h-48 flex items-center justify-center mt-2"
                    style={{ maxWidth: '300px', margin: '0 auto' }}
                  >
                    {/* <p className="text-gray-300">Google Ad Placeholder (300x250)</p> */}
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Movie Articles</h3>
                  {blogs.length === 0 ? (
                    <p className="text-gray-400">No articles available.</p>
                  ) : (
                    <>
                      <ul className="space-y-3">
                        {blogs.map((blog) => (
                          <li key={blog._id}>
                            <Link
                              to={`/blog/${blog._id}`}
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
                      <div className="mt-4 text-center">
                        <Link
                          to="/blog"
                          className="inline-block px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-700"
                        >
                          More Articles &gt;&gt;
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>
        <Feedback />
        <Footer />
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-white shadow-lg transition-all duration-300 z-50 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
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

export default Trending;