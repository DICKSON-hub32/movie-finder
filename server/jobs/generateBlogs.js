const axios = require('axios');
const BlogPost = require('../models/BlogPost');
const generateBlogFromMovie = require('../utils/generateBlog');
const fs = require('fs').promises; // For file-based state management


const authors = [
  { name: 'Elowen Fairchild', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750426107/Elowen_Fairchild_wu1oc2.jpg' },
  { name: 'Khamari Jelani', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750427063/Khamari_Jelani_fgtc0s.png' },
  { name: "Siobhan O'Connor", imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542548/Siobhan_O_Connor_oh9mjq.jpg' },
  { name: 'Emily Parker', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542548/Emily_Parker_ltur7l.jpg' },
  { name: 'Hiroshi Tanaka', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Hiroshi_Tanaka_hrv07m.jpg' },
  { name: 'Richard Lawson', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Richard_Lawson_g66vxo.jpg' },
  { name: 'Kevin Adaku', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Kevin_Adaku_kkvj3w.jpg' },
  { name: 'Mei Chen', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Mei_Chen_kid1gx.jpg' },
  { name: 'Sarah Davis', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Sarah_Davis_zf7sat.jpg' },
  { name: 'Emily Johnson', imageUrlAuthor: 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Emily_Johnson_hrxdnk.jpg' }
];

const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });
    return response.data.results.map(movie => ({
      title: movie.title || movie.name,
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750599955/movie_placeholder_dke8kt.jpg'
    }));
  } catch (error) {
    console.error('Failed to fetch trending movies:', error.message);
    return [];
  }
};

const fetchTopMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      params: { with_genres: genreId, sort_by: 'vote_average.desc' }
    });
    return response.data.results.map(movie => ({
      title: movie.title || movie.name,
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750599955/movie_placeholder_dke8kt.jpg'
    }));
  } catch (error) {
    console.error(`Failed to fetch top ${genreId} movies:`, error.message);
    return [];
  }
};

const fetchThematicMovies = async (themeKeyword) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      params: { with_keywords: themeKeyword, sort_by: 'popularity.desc' }
    });
    return response.data.results.map(movie => ({
      title: movie.title || movie.name,
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750599955/movie_placeholder_dke8kt.jpg'
    }));
  } catch (error) {
    console.error(`Failed to fetch thematic movies for ${themeKeyword}:`, error.message);
    return [];
  }
};

const fetchTopMoviesByDecade = async (yearStart) => {
  try {
    const yearEnd = yearStart + 9;
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      params: { primary_release_date_gte: `${yearStart}-01-01`, primary_release_date_lte: `${yearEnd}-12-31`, sort_by: 'vote_average.desc' }
    });
    return response.data.results.map(movie => ({
      title: movie.title || movie.name,
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750599955/movie_placeholder_dke8kt.jpg'
    }));
  } catch (error) {
    console.error(`Failed to fetch top ${yearStart}s movies:`, error.message);
    return [];
  }
};

const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      }
    });
    return response.data.results.map(movie => ({
      title: movie.title || movie.name,
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750599955/movie_placeholder_dke8kt.jpg'
    }));
  } catch (error) {
    console.error('Failed to fetch upcoming movies:', error.message);
    return [];
  }
};

const fetchCriticallyAcclaimedMovies = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      }
    });
    return response.data.results.map(movie => ({
      title: movie.title || movie.name,
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://res.cloudinary.com/djkuxeaaj/image/upload/v1750599955/movie_placeholder_dke8kt.jpg'
    }));
  } catch (error) {
    console.error('Failed to fetch critically acclaimed movies:', error.message);
    return [];
  }
};

const generateTrendingBlogs = async () => {
  // Load or initialize source index
  let sourceIndex = 0;
  const stateFile = './sourceIndex.json';
  try {
    const data = await fs.readFile(stateFile, 'utf8');
    sourceIndex = parseInt(data) || 0;
  } catch (error) {
    console.log('No state file found, starting from index 0.');
  }

  const sources = [
    { fetch: fetchTrendingMovies, name: 'Trending Movies' },
    { fetch: () => fetchTopMoviesByGenre(28), name: 'Top Action Movies' }, // Genre ID 28
    { fetch: () => fetchThematicMovies('summer'), name: 'Summer Blockbusters' },
    { fetch: () => fetchTopMoviesByDecade(1990), name: 'Top 1990s Movies' },
    { fetch: fetchUpcomingMovies, name: 'Upcoming Movies' },
    { fetch: fetchCriticallyAcclaimedMovies, name: 'Critically Acclaimed Movies' }
  ];

  const existingBlogs = await BlogPost.find({}, { title: 1 });
  const existingTitles = existingBlogs.map(blog => blog.title);

  const currentSource = sources[sourceIndex];
  console.log(`📝 Generating blogs from ${currentSource.name} (Index: ${sourceIndex})...`);

  let blogsGenerated = false;
  const movies = await currentSource.fetch();

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation (like dashes)
      .replace(/\s+/g, ' ')    // Collapse multiple spaces
      .trim();
  }

  function isWordMatch(movieTitle, blogTitle) {
    const movieWords = normalize(movieTitle).split(' ');
    const blogWords = normalize(blogTitle).split(' ');
    return movieWords.every(word => blogWords.includes(word));
  }
  


  for (const movie of movies.slice(0, 20)) {
// Check if movie title exists anywhere in existing blog titles (case-insensitive)
const movieTitle = movie.title;
const exists = existingTitles.some(existingTitle => isWordMatch(movieTitle, existingTitle));
if (!exists) {
  try {
    await generateBlogFromMovie(movie.title, movie.imageUrl);
    console.log(`✅ Blog saved for: ${movie.title} from ${currentSource.name}`);
    blogsGenerated = true;
  } catch (err) {
    console.error(`❌ Failed to create blog for "${movie.title}":`, err.message);
  }
} else {
  console.log(`⏩ Blog already exists containing: ${movie.title} from ${currentSource.name}`);
}
  }

  // Fallback: Rotate old blogs if no new content
  if (!blogsGenerated) {
    const oldBlogs = await BlogPost.find({ createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    for (const blog of oldBlogs) {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)]; // From generateBlog.js
      blog.author = randomAuthor.name;
      blog.authorImage = randomAuthor.imageUrlAuthor;
      blog.summary = `Updated summary for ${blog.title} by ${randomAuthor.name}...`;
      await blog.save();
      console.log(`🔄 Rotated author and summary for ${blog.title} by ${randomAuthor.name}`);
    }
    console.log('🔄 No new movies found, rotated old blogs.');
  } else {
    console.log('✅ Blog generation cycle completed!');
  }

  // Update and save the next source index
  sourceIndex = (sourceIndex + 1) % sources.length; // Cycle back to 0 after the last source
  await fs.writeFile(stateFile, sourceIndex.toString(), 'utf8');
  console.log(`🔄 Next source index set to ${sourceIndex} for tomorrow.`);
};

module.exports = generateTrendingBlogs;