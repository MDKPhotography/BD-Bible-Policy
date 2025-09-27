const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifyToken } = require('../auth');
const { TemplateManager, uploadMiddleware } = require('../services/templateManager');

// Get all templates
router.get('/', verifyToken, async (req, res) => {
  try {
    const templates = TemplateManager.getTemplates();
    res.json({ success: true, templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific template
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const template = TemplateManager.getTemplate(req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, error: 'Template not found' });
    }
    res.json({ success: true, template });
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload new template
router.post('/upload', verifyToken, uploadMiddleware, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const templateInfo = {
      name: req.body.name || 'Unnamed Template',
      description: req.body.description || '',
      client: req.body.client || 'Generic',
      category: req.body.category || 'Quad Chart',
      createdBy: req.user.email,
      mappings: req.body.mappings ? JSON.parse(req.body.mappings) : undefined
    };

    const template = await TemplateManager.registerTemplate(templateInfo, req.file.path);
    res.json({ success: true, template });
  } catch (error) {
    console.error('Error uploading template:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Process template with data
router.post('/:id/process', verifyToken, async (req, res) => {
  try {
    const templateId = req.params.id;
    const data = req.body;

    const result = await TemplateManager.processTemplate(templateId, data);
    res.json(result);
  } catch (error) {
    console.error('Error processing template:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update template metadata
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const templateId = req.params.id;
    const updates = req.body;

    const template = TemplateManager.updateTemplate(templateId, updates);
    res.json({ success: true, template });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete template
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const templateId = req.params.id;
    const permanent = req.query.permanent === 'true';

    const success = TemplateManager.deleteTemplate(templateId, permanent);
    if (success) {
      res.json({ success: true, message: 'Template deleted' });
    } else {
      res.status(404).json({ success: false, error: 'Template not found' });
    }
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clone template
router.post('/:id/clone', verifyToken, async (req, res) => {
  try {
    const templateId = req.params.id;
    const newInfo = {
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.email
    };

    const template = await TemplateManager.cloneTemplate(templateId, newInfo);
    res.json({ success: true, template });
  } catch (error) {
    console.error('Error cloning template:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get template history
router.get('/:id/history', verifyToken, async (req, res) => {
  try {
    const templateId = req.params.id;
    const history = TemplateManager.getTemplateHistory(templateId);
    res.json({ success: true, history });
  } catch (error) {
    console.error('Error fetching template history:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Download generated file
router.get('/download/:filename', verifyToken, (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../data/generated_pptx', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    res.download(filePath, filename);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;