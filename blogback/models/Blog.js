const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Published',
  },
  views: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
