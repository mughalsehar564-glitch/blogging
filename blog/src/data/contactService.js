import axios from 'axios';

const API_URL = 'http://localhost:5000/api/messages';

export const contactService = {
  // Save a new submission
  saveSubmission: async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error saving submission:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all submissions
  getSubmissions: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }
  },

  // Delete a submission
  deleteSubmission: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting submission:', error);
      return false;
    }
  }
};
