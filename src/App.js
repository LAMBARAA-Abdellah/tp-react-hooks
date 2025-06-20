import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';

// TODO: Exercice 2.1 - Créer le LanguageContext
export const ThemeContext = createContext();
export const LanguageContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Exercice 1.1 - Ajouter l'état pour la recherche
  const [language, setLanguage] = useState('fr'); // Exercice 2.2 - Ajouter l'état pour la langue
  const titleText = language === 'en' ? 'Product Catalog' : 'Catalogue de Produits';
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}> {/* Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">{titleText}</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              {/* Exercice 2.2 - Ajouter le sélecteur de langue */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`form-select w-auto ${isDarkTheme ? 'bg-dark text-light' : ''}`}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </header>
          <main>
            <ProductSearch onSearch={setSearchTerm} /> {/* Exercice 1.1 - Passer la fonction onSearch */}
            <ProductList searchTerm={searchTerm} /> {/*Exercice 1.1 - Passer le terme de recherche */}
          </main>
        </div>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
