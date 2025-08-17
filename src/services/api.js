import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Servicios para productos
export const productService = {
  // Obtener todos los productos con filtros y paginación
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener productos');
    }
  },

  // Obtener un producto por ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener producto');
    }
  },

  // Obtener productos destacados
  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener productos destacados');
    }
  },

  // Crear un nuevo producto
  createProduct: async (productData) => {
    try {
      const formData = new FormData();
      
      // Agregar campos de texto
      Object.keys(productData).forEach(key => {
        if (key !== 'images') {
          if (typeof productData[key] === 'object' && productData[key] !== null) {
            formData.append(key, JSON.stringify(productData[key]));
          } else {
            formData.append(key, productData[key]);
          }
        }
      });

      // Agregar imágenes si existen
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append('images', image);
          } else {
            formData.append(`images[${index}]`, image);
          }
        });
      }

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear producto');
    }
  },

  // Actualizar un producto
  updateProduct: async (id, productData) => {
    try {
      const formData = new FormData();
      
      // Agregar campos de texto
      Object.keys(productData).forEach(key => {
        if (key !== 'images') {
          if (typeof productData[key] === 'object' && productData[key] !== null) {
            formData.append(key, JSON.stringify(productData[key]));
          } else {
            formData.append(key, productData[key]);
          }
        }
      });

      // Agregar imágenes si existen
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append('images', image);
          } else {
            formData.append(`images[${index}]`, image);
          }
        });
      }

      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar producto');
    }
  },

  // Eliminar un producto
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar producto');
    }
  },
};

// Exportar la instancia de axios para uso directo si es necesario
export default api;