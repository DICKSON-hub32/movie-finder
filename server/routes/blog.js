const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const generateBlogFromMovie = require('../utils/generateBlog');
const generateTrendingBlogs = require('../jobs/generateBlogs'); // For manual trigger
const genai = require('@google/generative-ai');
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

// ✅ Get all blogs
router.get('/all', async (req, res) => {
  const sortBy = req.query.sort === 'popular' ? { views: -1 } : { createdAt: -1 };

  try {
    const blogPosts = await BlogPost.find().sort(sortBy);
    res.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
});

// ✅ Optional: trigger auto blog generation from trending manually
router.post('/generate-trending', async (req, res) => {
  try {
    await generateTrendingBlogs();
    res.json({ message: 'Trending blogs generated successfully' });
  } catch (error) {
    console.error('Error generating trending blogs:', error.message);
    res.status(500).json({ error: 'Failed to generate trending blogs' });
  }
});

// Increment blog views when a user opens a blog.
router.post('/view/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json({ message: 'View counted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to count view' });
  }
});

// GET blog post by ID for Editing
router.get('/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update blog post by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        summary: req.body.summary,
        article: req.body.article,
        advice: req.body.advice,
        imageUrl: req.body.imageUrl,
        author: req.body.author,
        authorImage: req.body.authorImage
      },
      { new: true } // Return the updated blog
    );

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: '✅ Blog deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
