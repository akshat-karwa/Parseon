const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Optional: speeds up user-specific template queries
  },
  templateName: {
    type: String,
    required: true,
    trim: true,
    // unique: true, // Optional: only if names must be unique per user
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  fields: {
    type: [String],
    required: true,
    validate: {
      validator: arr => arr.length > 0,
      message: 'Template must have at least one field',
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Template', templateSchema);
