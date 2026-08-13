import apiClient from './apiClient';

export const blogService = {
  getAllBlogs: async () => {
    try {
      const response = await apiClient.get('/api/blogs');
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },

  getRecentBlogs: async () => {
    try {
      const response = await apiClient.get('/api/blogs/recent');
      return response.data;
    } catch (error) {
      console.error('Error fetching recent blogs:', error);
      return [];
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await apiClient.get(`/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },

  createBlog: async (blogData) => {
    try {
      const response = await apiClient.post('/api/blogs', blogData);
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  updateBlog: async (id, blogData) => {
    try {
      const response = await apiClient.put(`/api/blogs/${id}`, blogData);
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      await apiClient.delete(`/api/blogs/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }
};
