import { useState, useEffect } from 'react';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []); // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination
  console.log("searchTerm reçu dans useProductSearch:", searchTerm);
  //Exercice 1.1 - Appliquer le filtre selon le texte recherché
  const filteredProducts = searchTerm
    ? products.filter((product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products;
  return {
    products: filteredProducts,
    loading,
    error
  };
};

export default useProductSearch;
