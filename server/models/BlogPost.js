// models/BlogPost.js
const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  summary: { type: String, required: true },
  article: { type: String, required: true },
  advice: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: String, required: true },
  authorImage: { type: String, required: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
