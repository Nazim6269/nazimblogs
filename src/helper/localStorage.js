export const getTheme = () => {
  const theme = localStorage.getItem("theme");

  if (!theme) {
    localStorage.setItem("theme", "dark");
    return "dark";
  }


  return theme;
};

export const getBlogs = () => {
  const blogs = localStorage.getItem("blogs");
  return blogs ? JSON.parse(blogs) : [];
};

export const addBlog = (blog) => {
  const blogs = getBlogs();
  localStorage.setItem("blogs", JSON.stringify([blog, ...blogs]));
};
