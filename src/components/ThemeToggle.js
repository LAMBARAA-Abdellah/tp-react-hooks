import React, { useContext } from 'react';
import { ThemeContext, LanguageContext } from '../App';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const label = isDarkTheme
    ? language === 'en' ? 'Light Mode' : 'Mode Clair'
    : language === 'en' ? 'Dark Mode' : 'Mode Sombre';

  return (
    <button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`px-5 py-2 rounded ${
        isDarkTheme
          ? 'bg-dark text-light border border-light'
          : 'bg-light text-dark border border-dark'
      }`}
    >
      {label}
    </button>
  );
};

export default ThemeToggle;
