const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'BD-Bible-Policy' });
});

app.get('/api/documents', (req, res) => {
  const docsPath = path.join(__dirname, '../../data/documents');
  const files = fs.readdirSync(docsPath).filter(f => f.endsWith('.md'));
  res.json({ documents: files });
});

app.get('/api/documents/:filename', (req, res) => {
  const docsPath = path.join(__dirname, '../../data/documents');
  const filePath = path.join(docsPath, req.params.filename);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ filename: req.params.filename, content: content });
  } else {
    res.status(404).json({ error: 'Document not found' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`BD-Bible Backend running on port ${PORT}`);
});
