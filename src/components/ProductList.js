import React, { useContext, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const {
    products,
    loading,
    error,
    reload,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
    setCurrentPage
  } = useProductSearch(searchTerm);

  useEffect(() => {
    if (searchTerm !== '') {
      setCurrentPage(1);
    }
  }, [searchTerm, setCurrentPage]);

  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{language === 'en' ? 'Loading...' : 'Chargement...'}</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      {language === 'en' ? 'Error:' : 'Erreur:'} {error}
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-primary" onClick={reload}>
          {language === 'en' ? 'Reload Products' : 'Recharger les produits'}
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{language === 'en' ? 'Price:' : 'Prix:'} </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={previousPage}>
              {language === 'en' ? 'Previous' : 'Précédent'}
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              {language === 'en' ? 'Page' : 'Page'} {currentPage} {language === 'en' ? 'of' : 'sur'} {totalPages}
            </span>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              {language === 'en' ? 'Next' : 'Suivant'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
