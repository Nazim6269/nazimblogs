export const getTheme = () => {
  const theme = localStorage.getItem("theme");

  if (!theme) {
    localStorage.setItem("theme", "dark");
    return "dark";
  }

  return theme;
};
