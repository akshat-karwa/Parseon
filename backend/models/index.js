const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: String,
  oauthProvider: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Template Schema
const templateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  fields: [String],
});

const Template = mongoose.models.Template || mongoose.model('Template', templateSchema);

// Parsed Document Entry Schema
const parsedDataSchema = new mongoose.Schema({
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
  data: {},
  uploadedAt: { type: Date, default: Date.now },
});

const ParsedData = mongoose.models.ParsedData || mongoose.model('ParsedData', parsedDataSchema);

module.exports = {
  User,
  Template,
  ParsedData,
};
