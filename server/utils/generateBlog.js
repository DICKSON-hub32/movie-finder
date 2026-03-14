const genai = require("@google/generative-ai");
const BlogPost = require("../models/BlogPost");
const { slugify, buildUniqueSlug } = require("./slugify");
const genAI = new genai.GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const authors = [
  {
    name: "Elowen Fairchild",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750426107/Elowen_Fairchild_wu1oc2.jpg"
  },
  {
    name: "Khamari Jelani",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750427063/Khamari_Jelani_fgtc0s.png"
  },
  {
    name: "Siobhan O'Connor",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542548/Siobhan_O_Connor_oh9mjq.jpg"
  },
  {
    name: "Emily Parker",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542548/Emily_Parker_ltur7l.jpg"
  },
  {
    name: "Hiroshi Tanaka",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Hiroshi_Tanaka_hrv07m.jpg"
  },
  {
    name: "Richard Lawson",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Richard_Lawson_g66vxo.jpg"
  },
  {
    name: "Kevin Adaku",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Kevin_Adaku_kkvj3w.jpg"
  },
  {
    name: "Mei Chen",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Mei_Chen_kid1gx.jpg"
  },
  {
    name: "Sarah Davis",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Sarah_Davis_zf7sat.jpg"
  },
  {
    name: "Emily Johnson",
    imageUrlAuthor:
      "https://res.cloudinary.com/djkuxeaaj/image/upload/v1750542547/Emily_Johnson_hrxdnk.jpg"
  }
];

const generateBlogFromMovie = async (movieTitle, imageUrl = "") => {
  const prompt = `Write a movie blog post about "${movieTitle}". Include:
- A catchy blog title (start with "Title: ")
- A short summary (start with "Summary: ")
- A full, fun, and engaging article (start with "Article: ")
- Watch advice (start with "Advice: "); this is compulsory
-Optimize for SEO`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Recommended model
  const result = await model.generateContent(prompt);
  const content = result.response.text();
  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

  // Logging to debug AI output
  // console.log('\n===== RAW AI CONTENT =====\n', content, '\n==========================\n');

  // Extract sections using Regex with safe defaults
  const title =
    content.match(/Title:\s*(.*)/i)?.[1]?.trim() || `Blog about ${movieTitle}`;
  const summary =
    content
      .match(/Summary:\s*([\s\S]*?)(?:\n?Article:|\n?Advice:)/i)?.[1]
      ?.trim() || "No summary provided.";
  const article =
    content.match(/Article:\s*([\s\S]*?)(?:\n?Advice:)/i)?.[1]?.trim() ||
    "No article generated.";
  const advice =
    content.match(/Advice:\s*(.*)/i)?.[1]?.trim() || "No advice provided.";

  const cleanText = (text) => {
    if (!text) return "";
    return text
      .replace(/^#+\s*/gm, "") // Remove markdown headers like # or ##
      .replace(/\*/g, "") // Remove all asterisks (italic or bullet styling)
      .trim(); // Remove leading/trailing whitespace
  };

  // console.log('🧩 Extracted Fields:', { title, summary, article, advice });

  const cleanedTitle = cleanText(title);
  const slugBase = slugify(cleanedTitle);
  const slug = await buildUniqueSlug(BlogPost, slugBase);

  const newBlog = new BlogPost({
    title: cleanedTitle,
    slug,
    summary: cleanText(summary),
    article: cleanText(article),
    advice: cleanText(advice),
    imageUrl,
    author: randomAuthor.name,
    authorImage: randomAuthor.imageUrlAuthor
  });

  await newBlog.save();
  return newBlog;
};

module.exports = generateBlogFromMovie;
