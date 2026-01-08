import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { productApi } from '../services/api';
import type { CreateProductDTO } from '../types/product.types';

interface ProductFormProps {
  onProductCreated: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated }) => {
  const [formData, setFormData] = useState<CreateProductDTO>({
    name: '',
    quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await productApi.createProduct(formData);

      // Reset form
      setFormData({ name: '', quantity: 0 });
      setSuccess(true);

      // Trigger refresh of product list
      onProductCreated();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.errors?.join(', ')
        || err.response?.data?.message
        || 'Failed to create product';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          Product created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
            placeholder="Enter quantity"
            min="0"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
