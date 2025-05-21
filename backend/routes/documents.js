const express = require('express');
const router = express.Router();
const { ParsedData, Template } = require('../models');
const auth = require('../middleware/auth');

// POST /api/documents/save — Save parsed document data
router.post('/save', auth, async (req, res) => {
  try {
    const { templateId, data } = req.body;

    // Ensure template exists and belongs to the user
    const template = await Template.findOne({ _id: templateId, userId: req.user.id });
    if (!template) {
      return res.status(404).json({ msg: 'Template not found or not owned by user' });
    }

    // Save parsed data
    const newEntry = new ParsedData({ templateId, data });
    await newEntry.save();

    res.json({ msg: 'Document data saved', entry: newEntry });
  } catch (err) {
    console.error('[SAVE DOCUMENT ERROR]', err);
    res.status(500).json({ msg: 'Failed to save document data' });
  }
});

// GET /api/documents/:templateId — Get all entries for a template
router.get('/:templateId', auth, async (req, res) => {
  try {
    const { templateId } = req.params;

    const template = await Template.findOne({ _id: templateId, userId: req.user.id });
    if (!template) {
      return res.status(404).json({ msg: 'Template not found or not owned by user' });
    }

    const entries = await ParsedData.find({ templateId });
    res.json(entries);
  } catch (err) {
    console.error('[GET DOCUMENT ENTRIES ERROR]', err);
    res.status(500).json({ msg: 'Failed to fetch document entries' });
  }
});

module.exports = router;
