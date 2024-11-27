import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useState } from "react";
import { getTheme } from "../helper/localStorage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme() || "light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

//declaring proptypes
ThemeProvider.propTypes = {
  children: PropTypes.node,
  toggleTheme: PropTypes.func,
};
