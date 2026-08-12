const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const blogRoutes = require('./routes/blogs');
const categoryRoutes = require('./routes/categories');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/settings', settingsRoutes);

// Database Connection
const connectDB = async () => {
  try {
    // Using a more stable connection method to avoid DNS SRV timeouts
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000, // Wait up to 15 seconds for connection
    });
    console.log('MongoDB connected successfully to Atlas (test database)');
  } catch (err) {
    console.error('MongoDB connection error:');
    console.error(err.message);
    process.exit(1); // Exit if cannot connect
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
