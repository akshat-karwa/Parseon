const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
  },
  passwordHash: {
    type: String,
    required: function () {
      return !this.authProvider; // allow if using OAuth
    },
  },
  authProvider: {
    type: String,
    enum: ['google', 'microsoft', 'apple', null],
    default: null,
  },
  name: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Correct export
module.exports = mongoose.model('User', userSchema);
