import axios from 'axios';

const API_URL = 'http://localhost:5000/api/settings';

export const settingsService = {
  getSettings: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const response = await axios.post(API_URL, settingsData);
      return response.data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};
