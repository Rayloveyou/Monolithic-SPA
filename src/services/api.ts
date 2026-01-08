import axios from 'axios';
import type { Product, CreateProductDTO, ApiResponse } from '../types/product.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products');
    return response.data.data || [];
  },

  // Create product
  createProduct: async (product: CreateProductDTO): Promise<Product> => {
    const response = await apiClient.post<ApiResponse<Product>>('/products', product);
    if (!response.data.data) {
      throw new Error('Failed to create product');
    }
    return response.data.data;
  },
};
