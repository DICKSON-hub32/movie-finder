export const slugify = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const buildMovieSlug = (title, id) => {
  const slug = slugify(title || "movie");
  return `${slug}-${id}`;
};
