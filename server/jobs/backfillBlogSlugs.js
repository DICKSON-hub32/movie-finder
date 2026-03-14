const BlogPost = require("../models/BlogPost");
const { slugify, buildUniqueSlug } = require("../utils/slugify");

const backfillBlogSlugs = async () => {
  const blogs = await BlogPost.find({
    $or: [{ slug: { $exists: false } }, { slug: "" }]
  });

  let updated = 0;
  for (const blog of blogs) {
    const slugBase = slugify(blog.title);
    blog.slug = await buildUniqueSlug(BlogPost, slugBase, blog._id);
    await blog.save();
    updated += 1;
  }

  return updated;
};

module.exports = backfillBlogSlugs;
