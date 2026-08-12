import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogs';

export const blogService = {
  getAllBlogs: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },

  getRecentBlogs: async () => {
    try {
      const response = await axios.get(`${API_URL}/recent`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent blogs:', error);
      return [];
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },

  createBlog: async (blogData) => {
    try {
      const response = await axios.post(API_URL, blogData);
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  updateBlog: async (id, blogData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, blogData);
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }
};
