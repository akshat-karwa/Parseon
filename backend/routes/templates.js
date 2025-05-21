const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
const authMiddleware = require('../middleware/auth');

// Create a new template
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { templateName, fields } = req.body;

    if (!templateName || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({ error: 'Template name and fields are required' });
    }

    const template = new Template({
      userId: req.user.id,
      templateName,
      fields
    });

    await template.save();
    res.status(201).json(template);
  } catch (err) {
    console.error('[CREATE TEMPLATE ERROR]', err);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// Get all templates for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const templates = await Template.find({ userId: req.user.id });
    res.json(templates);
  } catch (err) {
    console.error('[GET TEMPLATES ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

module.exports = router;
