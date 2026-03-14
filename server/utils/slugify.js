const slugify = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const buildUniqueSlug = async (Model, baseSlug, excludeId = null) => {
  const safeBase = baseSlug && baseSlug.length > 0 ? baseSlug : "post";
  let slug = safeBase;
  let counter = 2;
  const exclusion = excludeId ? { _id: { $ne: excludeId } } : {};

  while (await Model.exists({ slug, ...exclusion })) {
    slug = `${safeBase}-${counter}`;
    counter += 1;
  }

  return slug;
};

module.exports = { slugify, buildUniqueSlug };
