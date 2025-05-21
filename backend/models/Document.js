const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['invoice', 'receipt', 'contract', 'other'], default: 'other' },
  data: { type: Map, of: String }, // dynamic key-value fields like PO Number, Date, Amount
  filename: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);
