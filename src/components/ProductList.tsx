import React, { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import type { Product } from '../types/product.types';
import ProductItem from './ProductItem';

interface ProductListProps {
  refreshTrigger: number;
}

export const ProductList: React.FC<ProductListProps> = ({ refreshTrigger }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productApi.getAllProducts();
      setProducts(data);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
        <button onClick={fetchProducts} className="btn-retry">Retry</button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2>Product List ({products.length})</h2>

      {products.length === 0 ? (
        <p className="empty-message">No products yet. Add your first product above!</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
