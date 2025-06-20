// src/hooks/useProductSearch.js
import { useState, useEffect } from 'react';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.daaif.net/products?delay=1000');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fonction de rechargement
  const reload = () => {
    setLoading(true);
    setError(null);
    setProducts([]);
    setTimeout(() => {
      fetch('https://api.daaif.net/products?delay=1000')
        .then((res) => res.json())
        .then((data) => setProducts(data.products))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 0);
  };

  // Filtrage par mot-clé
  const filteredProducts = searchTerm
    ? products.filter((product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Pagination
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const previousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    products: paginatedProducts,
    loading,
    error,
    reload,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
    setCurrentPage
  };
};

export default useProductSearch;
