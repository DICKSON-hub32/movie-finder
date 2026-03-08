// import { useEffect } from 'react';
// import axios from 'axios';



// const SitemapGenerator = () => {



//       // TMDB API Key
//   const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
//   const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
//   const API_OPTIONS = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   };


  
//   const generateSitemap = async () => {
//     try {
//       // Fetch blog data
//       const blogsResponse = await axios.get('https://backend.moviefinder-teckish.com/api/blogs/all');
//       const blogs = blogsResponse.data;

//       // Fetch trending movies
// // Fetch first 500 trending movies (25 pages × 20 movies/page)
// const allMovies = [];
// for (let page = 1; page <= 25 && allMovies.length < 500; page++) {
//   const response = await axios.get(
//     `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&page=${page}`,
//     API_OPTIONS // Ensure this includes any necessary headers or params
//   );
//   const movies = response.data.results || [];
//   allMovies.push(...movies);
//   if (movies.length < 20) break; // Stop if fewer results indicate the end
// }
// const movies = allMovies.slice(0, 500); // Limit to 500 movies

//       // Static pages
//       const staticPages = [
//         { loc: '/', changefreq: 'daily', priority: '1.0' },
//         { loc: '/about', changefreq: 'monthly', priority: '0.8' },
//         { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
//         { loc: '/trending', changefreq: 'daily', priority: '0.9' },
//         { loc: '/blog', changefreq: 'daily', priority: '1.0' },
//       ];

//       // Blog pages
//       const blogPages = blogs.map(blog => ({
//         loc: `/blog/${blog._id}`,
//         lastmod: new Date(blog.createdAt).toISOString().split('T')[0],
//         changefreq: 'daily',
//         priority: '1.0',
//       }));

//       // Trending pages (pagination)
//       const trendingPages = Array.from({ length: 200 }, (_, i) => ({
//         loc: `/trending?page=${i + 1}`,
//         changefreq: 'daily',
//         priority: '0.8',
//       }));

//       // Movie pages
//       const moviePages = movies.map(movie => ({
//         loc: `/movie/${movie.id}`,
//         changefreq: 'weekly',
//         priority: '0.6',
//       }));

//       // Combine all pages
//       const allPages = [...staticPages, ...blogPages, ...trendingPages, ...moviePages];
//       const currentDate = new Date().toISOString().split('T')[0];

//       // Generate sitemap XML
//       const sitemap = `
//         <?xml version="1.0" encoding="UTF-8"?>
//         <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//           ${allPages.map(page => `
//             <url>
//               <loc>${import.meta.env.REACT_APP_BASE_URL || 'https://moviefinder-teckish.com'}${page.loc}</loc>
//               <lastmod>${page.lastmod || currentDate}</lastmod>
//               <changefreq>${page.changefreq}</changefreq>
//               <priority>${page.priority}</priority>
//             </url>
//           `).join('')}
//         </urlset>
//       `.trim();

// // Send to backend endpoint
// await axios.post('http://localhost:5000/api/generate-sitemap', { sitemap }, {
//     headers: { 'Content-Type': 'application/json' },
//   });
//       console.log('Sitemap generated and saved at', new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }));
//     } catch (error) {
//       console.error('Error generating sitemap:', error.message);
//     }
//   };

//   useEffect(() => {
//     generateSitemap(); // Run on mount (for testing)
//     // Optionally, set up a manual trigger button or interval
//   }, []);

//   return <div>Sitemap generation in progress...</div>; // Placeholder UI
// };

// export default SitemapGenerator;