import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Feedback from '../sections/Feedback';
import Footer from '../sections/Footer';

const About = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
        <title>About Us | Movie Blog</title>
        <meta
          name="description"
          content="Learn more about our movie blog. We provide the latest movie news, reviews, and insights for film enthusiasts."
        />
        <meta
          name="keywords"
          content="about movie blog, film news, movie reviews, cinema insights"
        />
        <link rel="canonical" href="https://moviefinder-teckish.com/about" />
        <meta property="og:title" content="About Us | Movie Blog" />
        <meta
          property="og:description"
          content="Learn more about our movie blog. We provide the latest movie news, reviews, and insights for film enthusiasts."
        />
        <meta property="og:url" content="https://moviefinder-teckish.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Movie Blog" />
        <meta
          name="twitter:description"
          content="Learn more about our movie blog. We provide the latest movie news, reviews, and insights."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col text-white">
        <main className="flex-grow container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
          {/* Leaderboard Ad */}
          {/* <div className="bg-gray-700 p-3 rounded-lg text-center mb-6">
            <p className="text-gray-200 font-semibold">Advertisement</p>
            <div
              className="bg-gray-600 h-24 flex items-center justify-center mt-2"
              style={{ maxWidth: '728px', margin: '0 auto' }}
            >
              <p className="text-gray-300">Google Ad Placeholder (728x90)</p>
            </div>
          </div> */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Our Mission</h2>
            <p className="text-gray-300 mb-4 text-center">
              Welcome to our Movie Blog, your ultimate destination for everything cinema! We’re passionate about films and dedicated to bringing you the latest movie news, in-depth reviews, and insightful articles. Whether you’re a casual moviegoer or a hardcore cinephile, we’ve got something for everyone.
            </p>
            <p className="text-gray-300 text-center">
              Our goal is to keep you informed and entertained with trending movies, behind-the-scenes stories, and expert advice on what to watch next. Join our community and dive into the world of movies with us!
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Our Team</h2>
            <p className="text-gray-300 mb-4 text-center">
              We’re a small team of movie enthusiasts who love sharing our passion for films. Our writers and editors are dedicated to delivering high-quality content that resonates with movie lovers everywhere.
            </p>
            <p className="text-gray-300 text-center">
              Stay tuned as we grow our team and bring you even more exciting content!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {/* Team Member Cards */}
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg text-center">
                <img
                  src="./Aaravind Gupta.jpeg"
                  alt="Aaravind Gupta"
                  className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="text-lg font-semibold">Aaravind Gupta</h3>
                <p className="text-gray-400">Lead Developer</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg text-center">
                <img
                  src="./Elowen Fairchild.jpeg"
                  alt="Elowen Fairchild"
                  className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="text-lg font-semibold">Elowen Fairchild</h3>
                <p className="text-gray-400">Content Editor</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg text-center">
                <img
                  src="./Khamari Jelani.png"
                  alt="Khamari Jelani"
                  className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="text-lg font-semibold">Khamari Jelani</h3>
                <p className="text-gray-400">Content Editor</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg text-center">
                <img
                  src="./Zola Amare.png"
                  alt="Zola Amare"
                  className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="text-lg font-semibold">Zola Amare</h3>
                <p className="text-gray-400">Marketing Lead</p>
              </div>
            </div>
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

export default About;