import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '../data/settingsService';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    siteTitle: 'ELITE Fashion Blog',
    siteDescription: 'Modern luxury fashion and style inspiration for the contemporary individual.',
    logo: '',
    socials: {
      instagram: '',
      twitter: '',
      facebook: '',
      youtube: ''
    }
  });

  const fetchSettings = async () => {
    const data = await settingsService.getSettings();
    if (data) {
      setSettings(data);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
