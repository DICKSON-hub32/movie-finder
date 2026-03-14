const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");
const generateBlogFromMovie = require("../utils/generateBlog");
const generateTrendingBlogs = require("../jobs/generateBlogs"); // For manual trigger
const { slugify, buildUniqueSlug } = require("../utils/slugify");
const genai = require("@google/generative-ai");
const genAI = new genai.GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Manual blog generation by topic
// router.post('/generate', async (req, res) => {
//   const { topic, imageUrl = '' } = req.body;

//   if (!topic) return res.status(400).json({ error: 'No topic provided' });

//   try {
//     const blog = await generateBlogFromMovie(topic, imageUrl);
//     res.json({ blog });
//   } catch (err) {
//     console.error('Error generating blog:', err.message);
//     res.status(500).json({ error: 'Failed to generate blog post' });
//   }
// });

// Testing something

// ✅ Get all blogs
router.get("/all", async (req, res) => {
  const sortBy =
    req.query.sort === "popular" ? { views: -1 } : { createdAt: -1 };

  try {
    const blogPosts = await BlogPost.find().sort(sortBy);
    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error.message);
    res.status(500).json({ message: "Failed to fetch blog posts" });
  }
});

// ✅ Optional: trigger auto blog generation from trending manually
router.post("/generate-trending", async (req, res) => {
  try {
    await generateTrendingBlogs();
    res.json({ message: "Trending blogs generated successfully" });
  } catch (error) {
    console.error("Error generating trending blogs:", error.message);
    res.status(500).json({ error: "Failed to generate trending blogs" });
  }
});

// Increment blog views when a user opens a blog (slug or id).
router.post("/view/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    const blog = await BlogPost.findOne({ slug: identifier });
    const target = blog ? { slug: identifier } : { _id: identifier };

    await BlogPost.findOneAndUpdate(target, { $inc: { views: 1 } });
    res.status(200).json({ message: "View counted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to count view" });
  }
});

// GET blog post by slug or ID (supports legacy URLs)
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    const blog =
      (await BlogPost.findOne({ slug: identifier })) ||
      (await BlogPost.findById(identifier));

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (!blog.slug) {
      const slugBase = slugify(blog.title);
      blog.slug = await buildUniqueSlug(BlogPost, slugBase, blog._id);
      await blog.save();
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update blog post by ID
router.put("/:id", async (req, res) => {
  try {
    const existingBlog = await BlogPost.findById(req.params.id);
    if (!existingBlog)
      return res.status(404).json({ message: "Blog not found" });

    const nextTitle = req.body.title || existingBlog.title;
    const slugBase = slugify(nextTitle);
    const slug = await buildUniqueSlug(BlogPost, slugBase, existingBlog._id);

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title: nextTitle,
        slug,
        summary: req.body.summary,
        article: req.body.article,
        advice: req.body.advice,
        imageUrl: req.body.imageUrl,
        author: req.body.author,
        authorImage: req.body.authorImage
      },
      { new: true } // Return the updated blog
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "✅ Blog deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
