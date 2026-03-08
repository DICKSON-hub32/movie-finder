import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import emailjs from '@emailjs/browser';
import Feedback from '../sections/Feedback';
import Footer from '../sections/Footer';

const ContactUs = () => {
  const formRef = useRef();
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  // const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // const [status, setStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackStatus("Sending...");
    console.log('Sending data:', formRef.current); // Debug log to verify data

    emailjs.sendForm(
      'service_hn0prne',
      'template_0iab83x',
      formRef.current,
      'atpk0B9q_fdSniB2N'
    ).then(
      () => {
        setFeedbackStatus("Message sent successfully!");
        formRef.current.reset();
        setTimeout(() => setFeedbackStatus(""), 3000);
      },
      (error) => {
        setFeedbackStatus("Failed to send feedback. Please try again.");
        console.error("EmailJS error:", error);
      }
    );
  };




  return (
    <>
      <Helmet>
        <title>Contact Us | Movie Blog</title>
        <meta
          name="description"
          content="Get in touch with us! Contact our movie blog team for inquiries, feedback, or collaboration opportunities."
        />
        <meta
          name="keywords"
          content="contact movie blog, film blog contact, movie news inquiries, cinema feedback"
        />
        <link rel="canonical" href="https://moviefinder-teckish.com/contact" />
        <meta property="og:title" content="Contact Us | Movie Blog" />
        <meta
          property="og:description"
          content="Get in touch with our movie blog team for inquiries, feedback, or collaboration opportunities."
        />
        <meta property="og:url" content="https://moviefinder-teckish.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Movie Blog" />
        <meta
          name="twitter:description"
          content="Get in touch with our movie blog team for inquiries or feedback."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <main className="flex-grow container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
          <section className="mt-6 text-center max-w-4xl mx-auto px-4">
  <p className={`text-lg   text-gray-300`}>
    Reach out to Movie Finder via our Contact page, your ultimate gateway to connect with a team passionate about discovering a world of cinematic treasures. This section is designed to enhance your movie-watching experience by providing easy access to support, feedback, and collaboration opportunities related to trending films and industry news. We’re here to assist you every step of the way in your cinematic journey.
  </p>
  <p className={`text-lg mt-4   text-gray-300`}>
    Get in touch with Movie Finder’s dedicated support team, who offer in-depth assistance and personalized recommendations to address your needs. Whether you have questions about our movie reviews, trending films, or the latest industry updates, this page serves as a bridge to our community. We value your input and strive to make your experience with us seamless and rewarding.
  </p>
  <p className={`text-lg mt-4   text-gray-300`}>
    Explore the various ways to contact Movie Finder on this page, where we aim to enhance your movie-watching experience with responsive communication. From email support to feedback forms, we cover all aspects to ensure you stay connected with our updates on trending films and industry news. Let us know how we can assist, and join us in shaping the future of cinematic exploration.
  </p>
</section>
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
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="bg-gray-800 mt-12 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-gray-300 mb-4">
                  We’d love to hear from you! Whether you have feedback, inquiries, or collaboration ideas, feel free to reach out.
                </p>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      // value={formData.name}
                      // onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full p-2 border border-gray-300 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      // value={formData.email}
                      // onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full p-2 border border-gray-300 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      // value={formData.message}
                      // onChange={handleChange}
                      placeholder="Your Message"
                      rows="5"
                      className="w-full p-2 border border-gray-300 rounded-lg text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Send Message
                  </button>
                  {feedbackStatus && (
          <p
            className={`mt-2 text-sm ${
              feedbackStatus.includes("Failed") ? "text-red-500" : "text-green-400"
            }`}
          >
            {feedbackStatus}
          </p>
        )}
                </form>
                {status && <p className="mt-4 text-center text-gray-300">{status}</p>}
              </div>
            </div>
            <aside className="lg:w-1/3">
              <div className="sticky top-4 mt-12">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <p className="text-gray-300 mb-2">
                    <strong>Email:</strong> <a href="mailto:info@moviefinder-teckish.com" className="text-blue-400 hover:underline">info@moviefinder-teckish.com</a>
                  </p>
                  <p className="text-gray-300 mb-4">
                    {/* <strong>Phone:</strong> <a href="tel:+1234567890" className="text-blue-400 hover:underline">+254 (746) 618-865</a> */}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </main>
        <Feedback />
        <Footer />
        <button
          onClick={scrollToTop}
          className={`fixed bottom-4 right-4 p-3 rounded-full bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-white shadow-lg transition-all duration-300 z-50 ${
            showScrollTop ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Return to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default ContactUs;