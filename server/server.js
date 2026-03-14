const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const cron = require("node-cron");
const path = require("path");
const newsRoutes = require("./routes/news");
const trendingRoutes = require("./routes/trending");
const blogRoutes = require("./routes/blog");
const connectToMongoDB = require("./db/connect");
const generateTrendingBlogs = require("./jobs/generateBlogs"); // Added this line
const backfillBlogSlugs = require("./jobs/backfillBlogSlugs");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const { slugify, buildUniqueSlug } = require("./utils/slugify");

dotenv.config();
connectToMongoDB();
const BlogPost = require("./models/BlogPost");

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: "djkuxeaaj",
  api_key: "353927348361883",
  api_secret: "c2_ulX7ryOhUXn1SOIdUCk4M3nA"
});

require("./scheduler");

app.use(cors());
app.use(express.json());
app.use("/api/news", newsRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/blogs", blogRoutes);
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

app.get("/", (req, res) => {
  res.send("API is running...");
});

// TMDB API Key
const TMDB_API_KEY = process.env.TMDB_API_KEY1;
const API_KEY = process.env.TMDB_API_KEY1;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
};

const hydrateBlogSlugs = async () => {
  await backfillBlogSlugs();
};

// Function to generate sitemap
const generateSitemap = async () => {
  try {
    await hydrateBlogSlugs();
    // Fetch blog posts from database
    const blogs = await BlogPost.find({}, { _id: 1, slug: 1, createdAt: 1 });

    // Fetch trending movies from TMDB (up to 500)
    const allMovies = [];
    for (let page = 1; page <= 25 && allMovies.length < 500; page++) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&page=${page}`,
        API_OPTIONS
      );
      allMovies.push(...(response.data.results || []));
    }
    const movies = allMovies.slice(0, 500);

    // Define static pages
    const staticPages = [
      { loc: "/", changefreq: "daily", priority: "1.0" },
      { loc: "/about", changefreq: "monthly", priority: "0.8" },
      { loc: "/contact", changefreq: "monthly", priority: "0.8" },
      { loc: "/trending", changefreq: "daily", priority: "1.0" },
      { loc: "/blog", changefreq: "daily", priority: "1.0" }
    ];

    // Blog URLs
    const blogPages = blogs.map((blog) => ({
      loc: `/blog/${blog.slug || blog._id}`,
      lastmod: new Date(blog.createdAt).toISOString().split("T")[0],
      changefreq: "weekly",
      priority: "1.0"
    }));

    // Movie URLs
    const moviePages = movies.map((movie) => ({
      loc: `/movie/${slugify(movie.title || movie.name || "movie")}-${movie.id}`,
      changefreq: "weekly",
      priority: "1.0"
    }));

    // Trending pages (pagination)
    const trendingPages = Array.from({ length: 200 }, (_, i) => ({
      loc: `/trending?page=${i + 1}`,
      changefreq: "daily",
      priority: "0.8"
    }));

    // Combine all URLs
    const allPages = [
      ...staticPages,
      ...blogPages,
      ...moviePages,
      ...trendingPages
    ];
    const currentDate = new Date().toISOString().split("T")[0];

    // Generate sitemap XML
    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages
          .map(
            (page) => `
          <url>
            <loc>${"https://moviefinder-teckish.com"}${page.loc}</loc>
            <lastmod>${page.lastmod || currentDate}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
          </url>
        `
          )
          .join("")}
      </urlset>
    `.trim();

    // Save to public directory
    const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
    await fs.writeFile(sitemapPath, sitemap, "utf8");
    console.log("Sitemap generated successfully");
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
  }
};

// Serve static files from the backend/public folder
app.use(express.static(path.join(__dirname, "public")));

// Serve sitemap.xml directly
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await hydrateBlogSlugs();
  await generateSitemap();
});

// ⏰ Schedule the blog generation task to run (Every day at 9 AM - initially) (Every 4 hours - current)
cron.schedule("0 0 */4 * * *", async () => {
  console.log("📝 Auto-generating blogs from trending movies...");
  await generateTrendingBlogs();
  await generateSitemap();
});
