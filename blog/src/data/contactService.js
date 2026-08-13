import apiClient from './apiClient';

export const contactService = {
  saveSubmission: async (data) => {
    try {
      const response = await apiClient.post('/api/messages', data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error saving submission:', error);
      return { success: false, error: error.message };
    }
  },

  getSubmissions: async () => {
    try {
      const response = await apiClient.get('/api/messages');
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }
  },

  deleteSubmission: async (id) => {
    try {
      await apiClient.delete(`/api/messages/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting submission:', error);
      return false;
    }
  }
};
