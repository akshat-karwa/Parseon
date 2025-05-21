// index.js - Handles PDF upload + forwarding to Python FastAPI

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { FormData, File } = require('formdata-node');
const { FormDataEncoder } = require('form-data-encoder');
const { fetch } = require('undici');
const dotenv = require('dotenv');

dotenv.config(); // Load env variables

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.options('*', cors());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const limit = req.body.limit || 5;

    const form = new FormData();
    form.append(
      'file',
      new File([file.buffer], file.originalname, { type: file.mimetype })
    );
    form.append('limit', limit.toString());

    const encoder = new FormDataEncoder(form);

    const response = await fetch('http://localhost:8000/parse', {
      method: 'POST',
      headers: encoder.headers,
      body: encoder.encode(),
      duplex: 'half',
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: `FastAPI error: ${text}` });
    }

    const result = await response.json();
    res.json({ extracted: result.answer });

  } catch (err) {
    console.error('[UPLOAD ERROR]', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

const PORT = process.env.UPLOAD_PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Upload server running on http://localhost:${PORT}`);
});
