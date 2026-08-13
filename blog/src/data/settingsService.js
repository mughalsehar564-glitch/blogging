import apiClient from './apiClient';

export const settingsService = {
  getSettings: async () => {
    try {
      const response = await apiClient.get('/api/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const response = await apiClient.post('/api/settings', settingsData);
      return response.data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
};
