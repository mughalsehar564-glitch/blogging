const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = new Settings({
        siteTitle: 'ELITE Fashion Blog',
        siteDescription: 'Modern luxury fashion and style inspiration for the contemporary individual.',
        logo: '',
        socials: {
          instagram: '',
          twitter: '',
          facebook: '',
          youtube: '',
        }
      });
      // We use try-catch here to handle potential validation errors or connection issues during save
      try {
        await settings.save();
      } catch (saveErr) {
        console.error('Error saving default settings:', saveErr);
        // If save fails, we still return the default object so the frontend doesn't break
        return res.json(settings);
      }
    }
    res.json(settings);
  } catch (err) {
    console.error('Settings fetch error:', err);
    res.status(500).json({ message: 'Error fetching settings: ' + err.message });
  }
});

// Update settings
router.post('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
    } else {
      settings = new Settings(req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
