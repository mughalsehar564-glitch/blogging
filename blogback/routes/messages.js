const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Create Message
router.post('/', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    const newMessage = new Message({ name, email, message, subject });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
