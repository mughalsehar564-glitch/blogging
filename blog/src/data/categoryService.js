import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

export const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(API_URL, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }
};
