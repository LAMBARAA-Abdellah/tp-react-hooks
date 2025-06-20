import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App'; // Exercice 2.1 - Utiliser le LanguageContext
import useDebounce from '../hooks/useDebounce'; //Exercice 1.2 - Utiliser le hook useDebounce

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // Exercice 1.1 - Déclencher la recherche avec debounce
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  const placeholderText = language === 'en' ? 'Search for a product...' : 'Rechercher un produit...';

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholderText}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;
