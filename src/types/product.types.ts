export interface Product {
  _id: string;
  name: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  name: string;
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  errors?: string[];
}
