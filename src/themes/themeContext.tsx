import React, { useState, useEffect, createContext, ReactNode } from "react";
import themes from "./themes";
import PropTypes from "prop-types";

interface Theme {
  name: string;
  background: {
    main: string;
    sectionheader: string;
    blockquote: string;
  };
  color: {
    markdownbody: string;
    sectionheader: string;
    previewbody: string;
    htmlheaders: string;
    h6: string;
    blockquote: string;
    code: string;
  };
  divider: string;
}

interface ThemeContextType {
  theme: Theme;
  handleThemeChange: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  handleThemeChange: () => {},
});


const ThemeContextWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    JSON.parse(localStorage.getItem("theme-browserMarkdownApp") || "null") || themes.dark
  );

  useEffect(() => {
    const currentTheme = JSON.parse(
      localStorage.getItem("theme-browserMarkdownApp") || "null"
    );
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme-browserMarkdownApp", JSON.stringify(theme));
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(theme.name === themes.light.name ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContextWrapper;
