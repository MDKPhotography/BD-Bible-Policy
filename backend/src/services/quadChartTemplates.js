/**
 * Quad Chart Template Management Service
 * Handles loading, previewing, and managing PowerPoint templates
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const sharp = require('sharp');

class QuadChartTemplateService {
    constructor() {
        this.templatesDir = path.join(__dirname, '../../templates/powerpoint');
        this.previewsDir = path.join(__dirname, '../../templates/powerpoint/previews');
        this.pythonScript = path.join(__dirname, 'analyzeTemplate.py');
        this.templates = new Map();
    }

    /**
     * Initialize the service and load all templates
     */
    async initialize() {
        try {
            // Ensure previews directory exists
            await fs.mkdir(this.previewsDir, { recursive: true });

            // Load all templates
            await this.loadTemplates();

            console.log(`Loaded ${this.templates.size} quad chart templates`);
        } catch (error) {
            console.error('Failed to initialize template service:', error);
            throw error;
        }
    }

    /**
     * Load all PPTX templates from the templates directory
     */
    async loadTemplates() {
        try {
            const files = await fs.readdir(this.templatesDir);
            const pptxFiles = files.filter(file => file.endsWith('.pptx'));

            for (const file of pptxFiles) {
                const templatePath = path.join(this.templatesDir, file);
                const templateInfo = await this.analyzeTemplate(templatePath);

                this.templates.set(file, {
                    filename: file,
                    path: templatePath,
                    name: this.formatTemplateName(file),
                    description: templateInfo.description || '',
                    slideCount: templateInfo.slideCount || 0,
                    preview: await this.getTemplatePreview(file),
                    fields: templateInfo.fields || [],
                    lastModified: templateInfo.lastModified,
                    size: templateInfo.size
                });
            }
        } catch (error) {
            console.error('Error loading templates:', error);
            throw error;
        }
    }

    /**
     * Analyze a template using Python script
     */
    async analyzeTemplate(templatePath) {
        return new Promise((resolve, reject) => {
            const python = process.platform === 'win32' ? 'python' : 'python3';
            const venvPython = path.join(__dirname, '../../../venv/bin/python');

            // Try venv python first, fallback to system python
            fs.access(venvPython).then(() => venvPython).catch(() => python).then(pyPath => {
                const process = spawn(pyPath, [this.pythonScript, templatePath]);

                let stdout = '';
                let stderr = '';

                process.stdout.on('data', (data) => {
                    stdout += data.toString();
                });

                process.stderr.on('data', (data) => {
                    stderr += data.toString();
                });

                process.on('close', (code) => {
                    if (code !== 0) {
                        console.warn(`Template analysis warning for ${templatePath}:`, stderr);
                        // Return basic info even if analysis fails
                        resolve(this.getBasicTemplateInfo(templatePath));
                    } else {
                        try {
                            const analysisFile = path.join(
                                path.dirname(templatePath),
                                'template_analysis.json'
                            );

                            fs.readFile(analysisFile, 'utf8')
                                .then(data => {
                                    const analysis = JSON.parse(data);
                                    resolve(this.parseTemplateAnalysis(analysis));
                                })
                                .catch(() => resolve(this.getBasicTemplateInfo(templatePath)));
                        } catch (error) {
                            resolve(this.getBasicTemplateInfo(templatePath));
                        }
                    }
                });
            }).catch(() => resolve(this.getBasicTemplateInfo(templatePath)));
        });
    }

    /**
     * Get basic template information without Python analysis
     */
    async getBasicTemplateInfo(templatePath) {
        try {
            const stats = await fs.stat(templatePath);
            return {
                description: 'Quad Chart Template',
                slideCount: 2,
                fields: this.getDefaultFields(),
                lastModified: stats.mtime,
                size: stats.size
            };
        } catch (error) {
            return {
                description: 'Quad Chart Template',
                slideCount: 2,
                fields: this.getDefaultFields(),
                lastModified: new Date(),
                size: 0
            };
        }
    }

    /**
     * Parse template analysis results
     */
    parseTemplateAnalysis(analysis) {
        const fields = new Set();
        let description = '';

        // Extract fields from all slides
        if (analysis.slides) {
            for (const slide of analysis.slides) {
                // Extract from shapes
                if (slide.shapes) {
                    for (const shape of slide.shapes) {
                        if (shape.text_frame && shape.text_frame.text) {
                            // Look for placeholder patterns like [Field Name]
                            const placeholders = shape.text_frame.text.match(/\[([^\]]+)\]/g);
                            if (placeholders) {
                                placeholders.forEach(p => fields.add(p));
                            }
                        }

                        // Extract from table cells
                        if (shape.table && shape.table.cells) {
                            for (const cell of shape.table.cells) {
                                if (cell.text) {
                                    const placeholders = cell.text.match(/\[([^\]]+)\]/g);
                                    if (placeholders) {
                                        placeholders.forEach(p => fields.add(p));
                                    }
                                }
                            }
                        }
                    }
                }

                // Get description from title
                if (!description && slide.placeholders) {
                    const titlePlaceholder = slide.placeholders.find(p => p.type && p.type.includes('TITLE'));
                    if (titlePlaceholder && titlePlaceholder.text) {
                        description = titlePlaceholder.text;
                    }
                }
            }
        }

        return {
            description: description || 'Quad Chart Template',
            slideCount: analysis.slide_count || 2,
            fields: Array.from(fields),
            lastModified: new Date(),
            size: 0
        };
    }

    /**
     * Get default fields for quad charts
     */
    getDefaultFields() {
        return [
            '[Opportunity Name]',
            '[Company Name]',
            '[Date]',
            '[Technical Approach]',
            '[Management Approach]',
            '[Past Performance]',
            '[Cost/Schedule]',
            '[Technical POC]',
            '[Contract Value]',
            '[RFP Date]',
            '[Award Date]'
        ];
    }

    /**
     * Format template name from filename
     */
    formatTemplateName(filename) {
        return filename
            .replace('.pptx', '')
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Get or generate template preview
     */
    async getTemplatePreview(filename) {
        const previewPath = path.join(this.previewsDir, filename.replace('.pptx', '.png'));

        try {
            // Check if preview already exists
            await fs.access(previewPath);
            return `/api/templates/preview/${filename.replace('.pptx', '.png')}`;
        } catch {
            // Generate preview if it doesn't exist
            await this.generateTemplatePreview(filename);
            return `/api/templates/preview/${filename.replace('.pptx', '.png')}`;
        }
    }

    /**
     * Generate a preview image for a template
     */
    async generateTemplatePreview(filename) {
        const templatePath = path.join(this.templatesDir, filename);
        const previewPath = path.join(this.previewsDir, filename.replace('.pptx', '.png'));

        // For now, create a placeholder preview
        // In production, you'd use a library to convert PPTX first slide to image
        try {
            // Create a placeholder image with template info
            const svg = `
                <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="300" fill="#f0f0f0" stroke="#ccc" stroke-width="2"/>
                    <text x="200" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="#333">
                        ${this.formatTemplateName(filename)}
                    </text>
                    <text x="200" y="180" font-family="Arial" font-size="14" text-anchor="middle" fill="#666">
                        Quad Chart Template
                    </text>
                </svg>
            `;

            await sharp(Buffer.from(svg))
                .png()
                .toFile(previewPath);

        } catch (error) {
            console.error(`Failed to generate preview for ${filename}:`, error);
            // Create a simple placeholder if Sharp fails
            await this.createSimplePreview(previewPath);
        }
    }

    /**
     * Create a simple preview file
     */
    async createSimplePreview(previewPath) {
        // Create a minimal PNG placeholder
        const buffer = Buffer.from([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
            // ... minimal PNG data for a 1x1 pixel image
        ]);
        await fs.writeFile(previewPath, buffer);
    }

    /**
     * Get all available templates
     */
    getTemplates() {
        return Array.from(this.templates.values());
    }

    /**
     * Get a specific template by filename
     */
    getTemplate(filename) {
        return this.templates.get(filename);
    }

    /**
     * Get template metadata
     */
    getTemplateMetadata(filename) {
        const template = this.templates.get(filename);
        if (!template) {
            throw new Error(`Template ${filename} not found`);
        }

        return {
            name: template.name,
            description: template.description,
            fields: template.fields,
            slideCount: template.slideCount,
            preview: template.preview
        };
    }

    /**
     * Validate that required fields are provided for a template
     */
    validateTemplateData(filename, data) {
        const template = this.templates.get(filename);
        if (!template) {
            throw new Error(`Template ${filename} not found`);
        }

        const errors = [];
        const requiredFields = ['[Opportunity Name]', '[Company Name]', '[Date]'];

        for (const field of requiredFields) {
            if (template.fields.includes(field) && !data[field]) {
                errors.push(`Required field missing: ${field}`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Create singleton instance
const templateService = new QuadChartTemplateService();

// Initialize on module load
templateService.initialize().catch(console.error);

module.exports = templateService;