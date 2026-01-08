import React from 'react';
import type { Product } from '../types/product.types';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-quantity">Quantity: {product.quantity}</p>
      </div>
      <div className="product-meta">
        <small>Added: {new Date(product.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default ProductItem;
