const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    default: 'ELITE Fashion Blog',
  },
  siteDescription: {
    type: String,
    default: 'Modern luxury fashion and style inspiration for the contemporary individual.',
  },
  logo: {
    type: String,
    default: '',
  },
  socials: {
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
