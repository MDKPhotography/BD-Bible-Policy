const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const multer = require('multer');
const crypto = require('crypto');

class TemplateManager {
  constructor() {
    this.templatesDir = path.join(__dirname, '../../templates/powerpoint');
    this.metadataFile = path.join(this.templatesDir, 'templates.json');
    this.pythonPath = path.join(__dirname, '../../venv/bin/python');
    this.replicatorPath = path.join(__dirname, './pptxTemplateReplicator.py');

    this.ensureDirectories();
    this.loadMetadata();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.templatesDir)) {
      fs.mkdirSync(this.templatesDir, { recursive: true });
    }
  }

  loadMetadata() {
    if (fs.existsSync(this.metadataFile)) {
      const data = fs.readFileSync(this.metadataFile, 'utf8');
      this.templates = JSON.parse(data);
    } else {
      this.templates = [];
      this.saveMetadata();
    }
  }

  saveMetadata() {
    fs.writeFileSync(this.metadataFile, JSON.stringify(this.templates, null, 2));
  }

  /**
   * Register a new template
   * @param {Object} templateInfo - Template information
   * @param {string} filePath - Path to the uploaded template file
   * @returns {Object} Template metadata
   */
  async registerTemplate(templateInfo, filePath) {
    const templateId = crypto.randomBytes(16).toString('hex');
    const fileExt = path.extname(filePath);
    const newFileName = `template_${templateId}${fileExt}`;
    const newFilePath = path.join(this.templatesDir, newFileName);

    // Move file to templates directory
    fs.renameSync(filePath, newFilePath);

    // Extract template information using Python
    const templateData = await this.analyzeTemplate(newFilePath);

    // Create template metadata
    const template = {
      id: templateId,
      name: templateInfo.name,
      description: templateInfo.description || '',
      fileName: newFileName,
      filePath: newFilePath,
      client: templateInfo.client || 'Generic',
      category: templateInfo.category || 'Quad Chart',
      placeholders: templateData.placeholders || [],
      slideCount: templateData.slide_count || 1,
      version: 1,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      createdBy: templateInfo.createdBy || 'system',
      active: true,
      mappings: templateInfo.mappings || this.getDefaultMappings(templateData.placeholders)
    };

    // Add to templates array
    this.templates.push(template);
    this.saveMetadata();

    return template;
  }

  /**
   * Analyze a template to find placeholders
   * @param {string} templatePath - Path to template file
   * @returns {Promise<Object>} Template analysis
   */
  analyzeTemplate(templatePath) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn(this.pythonPath, [
        '-c',
        `
import json
import sys
sys.path.append('${path.dirname(this.replicatorPath)}')
from pptxTemplateReplicator import TemplateReplicator

replicator = TemplateReplicator('${templatePath}')
info = replicator.get_template_info()
print(json.dumps(info))
        `
      ]);

      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Template analysis failed: ${stderr}`));
        } else {
          try {
            const result = JSON.parse(stdout);
            resolve(result);
          } catch (error) {
            reject(new Error('Failed to parse template analysis'));
          }
        }
      });
    });
  }

  /**
   * Get default mappings for placeholders
   * @param {Array} placeholders - Array of placeholder objects
   * @returns {Object} Default mappings
   */
  getDefaultMappings(placeholders) {
    const mappings = {};

    // Map common placeholder names to field types
    const commonMappings = {
      'CLIENT_NAME': { field: 'client', type: 'text' },
      'CLIENT': { field: 'client', type: 'text' },
      'TECHNICAL_APPROACH': { field: 'technical_approach', type: 'multiline' },
      'TECHNICAL': { field: 'technical_approach', type: 'multiline' },
      'MANAGEMENT_APPROACH': { field: 'management_approach', type: 'multiline' },
      'MANAGEMENT': { field: 'management_approach', type: 'multiline' },
      'PAST_PERFORMANCE': { field: 'past_performance', type: 'multiline' },
      'PERFORMANCE': { field: 'past_performance', type: 'multiline' },
      'COST_SCHEDULE': { field: 'cost_schedule', type: 'multiline' },
      'COST': { field: 'cost_schedule', type: 'multiline' },
      'TITLE': { field: 'title', type: 'text' },
      'DATE': { field: 'date', type: 'date' },
      'OPPORTUNITY': { field: 'opportunity_name', type: 'text' },
      'CONTRACT_VALUE': { field: 'contract_value', type: 'number' }
    };

    placeholders.forEach(placeholder => {
      const placeholderName = placeholder.placeholder;
      if (commonMappings[placeholderName]) {
        mappings[placeholderName] = commonMappings[placeholderName];
      } else {
        // Default mapping for unknown placeholders
        mappings[placeholderName] = {
          field: placeholderName.toLowerCase(),
          type: 'text'
        };
      }
    });

    return mappings;
  }

  /**
   * Get all templates
   * @param {boolean} activeOnly - Return only active templates
   * @returns {Array} List of templates
   */
  getTemplates(activeOnly = true) {
    if (activeOnly) {
      return this.templates.filter(t => t.active);
    }
    return this.templates;
  }

  /**
   * Get a specific template
   * @param {string} templateId - Template ID
   * @returns {Object} Template metadata
   */
  getTemplate(templateId) {
    return this.templates.find(t => t.id === templateId);
  }

  /**
   * Update template metadata
   * @param {string} templateId - Template ID
   * @param {Object} updates - Updates to apply
   * @returns {Object} Updated template
   */
  updateTemplate(templateId, updates) {
    const index = this.templates.findIndex(t => t.id === templateId);
    if (index === -1) {
      throw new Error('Template not found');
    }

    // Don't allow changing certain fields
    delete updates.id;
    delete updates.fileName;
    delete updates.filePath;
    delete updates.created;

    this.templates[index] = {
      ...this.templates[index],
      ...updates,
      updated: new Date().toISOString()
    };

    this.saveMetadata();
    return this.templates[index];
  }

  /**
   * Process a template with data
   * @param {string} templateId - Template ID
   * @param {Object} data - Data to fill template with
   * @returns {Promise<Object>} Result with generated file path
   */
  async processTemplate(templateId, data) {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    // Map data fields to placeholder names
    const placeholderData = {};
    Object.entries(template.mappings).forEach(([placeholder, mapping]) => {
      if (data[mapping.field]) {
        placeholderData[placeholder] = data[mapping.field];
      }
    });

    // Generate output filename
    const timestamp = Date.now();
    const outputFileName = `generated_${templateId}_${timestamp}.pptx`;
    const outputPath = path.join(__dirname, '../../data/generated_pptx', outputFileName);

    return new Promise((resolve, reject) => {
      const pythonProcess = spawn(this.pythonPath, [
        this.replicatorPath,
        template.filePath,
        JSON.stringify(placeholderData),
        outputPath
      ]);

      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error('Python error:', stderr);
          reject(new Error(`Template processing failed: ${stderr}`));
        } else {
          try {
            const result = JSON.parse(stdout);
            if (result.success) {
              resolve({
                success: true,
                path: result.path,
                filename: outputFileName,
                url: `/api/templates/download/${outputFileName}`,
                replacements: result.replacements_made
              });
            } else {
              reject(new Error(result.error));
            }
          } catch (error) {
            reject(new Error('Failed to parse template processing result'));
          }
        }
      });
    });
  }

  /**
   * Delete a template
   * @param {string} templateId - Template ID
   * @param {boolean} permanent - Permanently delete or just deactivate
   * @returns {boolean} Success status
   */
  deleteTemplate(templateId, permanent = false) {
    const index = this.templates.findIndex(t => t.id === templateId);
    if (index === -1) {
      return false;
    }

    if (permanent) {
      const template = this.templates[index];
      // Delete the actual file
      if (fs.existsSync(template.filePath)) {
        fs.unlinkSync(template.filePath);
      }
      // Remove from array
      this.templates.splice(index, 1);
    } else {
      // Just mark as inactive
      this.templates[index].active = false;
      this.templates[index].updated = new Date().toISOString();
    }

    this.saveMetadata();
    return true;
  }

  /**
   * Clone a template with version tracking
   * @param {string} templateId - Template ID to clone
   * @param {Object} newInfo - New template information
   * @returns {Object} New template
   */
  async cloneTemplate(templateId, newInfo) {
    const original = this.getTemplate(templateId);
    if (!original) {
      throw new Error('Original template not found');
    }

    // Copy the file
    const newId = crypto.randomBytes(16).toString('hex');
    const newFileName = `template_${newId}.pptx`;
    const newFilePath = path.join(this.templatesDir, newFileName);

    fs.copyFileSync(original.filePath, newFilePath);

    // Create new metadata
    const newTemplate = {
      ...original,
      id: newId,
      name: newInfo.name || `${original.name} (Copy)`,
      description: newInfo.description || original.description,
      fileName: newFileName,
      filePath: newFilePath,
      version: original.version + 1,
      parentId: templateId,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      createdBy: newInfo.createdBy || 'system'
    };

    this.templates.push(newTemplate);
    this.saveMetadata();

    return newTemplate;
  }

  /**
   * Get template history (versions)
   * @param {string} templateId - Template ID
   * @returns {Array} Template version history
   */
  getTemplateHistory(templateId) {
    const template = this.getTemplate(templateId);
    if (!template) {
      return [];
    }

    // Find all related templates (parent and children)
    const history = [];

    // Find parent chain
    let current = template;
    while (current.parentId) {
      const parent = this.getTemplate(current.parentId);
      if (parent) {
        history.unshift(parent);
        current = parent;
      } else {
        break;
      }
    }

    // Add current template
    history.push(template);

    // Find children
    const children = this.templates.filter(t => t.parentId === templateId);
    history.push(...children);

    return history;
  }
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'template-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only PPTX files
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        path.extname(file.originalname).toLowerCase() === '.pptx') {
      cb(null, true);
    } else {
      cb(new Error('Only PPTX files are allowed'));
    }
  }
});

module.exports = {
  TemplateManager: new TemplateManager(),
  uploadMiddleware: upload.single('template')
};