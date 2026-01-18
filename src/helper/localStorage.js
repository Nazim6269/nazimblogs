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

export const updateBlog = (id, updatedBlog) => {
  const blogs = getBlogs();
  const updatedBlogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, ...updatedBlog } : blog
  );
  localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  return updatedBlogs;
};

export const deleteBlog = (id) => {
  const blogs = getBlogs();
  const filteredBlogs = blogs.filter((blog) => blog.id !== id);
  localStorage.setItem("blogs", JSON.stringify(filteredBlogs));
  return filteredBlogs;
};

