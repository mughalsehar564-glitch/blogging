import apiClient from './apiClient';

export const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/api/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await apiClient.post('/api/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await apiClient.delete(`/api/categories/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }
};
