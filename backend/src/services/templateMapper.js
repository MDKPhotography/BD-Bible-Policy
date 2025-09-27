/**
 * Template Mapper Service
 * Maps form fields to PowerPoint template placeholders and manages data flow
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

class TemplateMapper {
    constructor() {
        // Default template path
        this.templatePath = path.join(__dirname, '../../templates/powerpoint/space-bd-quad-charts.pptx');

        // Field mapping configuration
        // Maps form field names to template placeholder text
        this.fieldMapping = {
            // Header information
            companyName: '[Company Name]',
            technologyTitle: '[Technology Title]',
            date: '[Date]',
            technicalPoc: '[Technical POC]',
            email: '[Email]',
            phone: '[Phone]',

            // Quad 1 - Problem/Opportunity
            quad1Title: '[Quadrant 1 Title]',
            quad1Content: '[Quadrant 1 Content]',
            problemStatement: '[Problem Statement]',
            opportunity: '[Opportunity]',

            // Quad 2 - Solution/Approach
            quad2Title: '[Quadrant 2 Title]',
            quad2Content: '[Quadrant 2 Content]',
            solution: '[Solution]',
            technicalApproach: '[Technical Approach]',

            // Quad 3 - Benefits/Impact
            quad3Title: '[Quadrant 3 Title]',
            quad3Content: '[Quadrant 3 Content]',
            benefits: '[Benefits]',
            impact: '[Impact]',

            // Quad 4 - Implementation/Schedule
            quad4Title: '[Quadrant 4 Title]',
            quad4Content: '[Quadrant 4 Content]',
            implementation: '[Implementation]',
            schedule: '[Schedule]',
            milestones: '[Milestones]',

            // Additional common fields
            classification: '[Classification]',
            contractNumber: '[Contract Number]',
            programName: '[Program Name]',
            customerOrg: '[Customer Organization]',

            // Technical details
            trl: '[TRL]',
            mrl: '[MRL]',
            budget: '[Budget]',
            duration: '[Duration]',

            // Team information
            teamLead: '[Team Lead]',
            teamMembers: '[Team Members]',
            organization: '[Organization]',
            location: '[Location]'
        };

        // Python script paths
        this.analyzerScript = path.join(__dirname, 'analyzeTemplate.py');
        this.fillerScript = path.join(__dirname, 'quadChartFiller.py');

        // Output directory
        this.outputDir = path.join(__dirname, '../../../output');
    }

    /**
     * Map form data to template placeholders
     * @param {Object} formData - Raw form data from frontend
     * @returns {Object} - Mapped data ready for template filling
     */
    mapFormToTemplate(formData) {
        const mappedData = {};

        // Map each form field to its corresponding placeholder
        for (const [fieldName, placeholderText] of Object.entries(this.fieldMapping)) {
            if (formData[fieldName] !== undefined && formData[fieldName] !== null) {
                mappedData[placeholderText] = String(formData[fieldName]);
            }
        }

        // Handle special formatting
        if (formData.date) {
            const date = new Date(formData.date);
            mappedData[this.fieldMapping.date] = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Handle array fields (like team members, milestones)
        if (formData.teamMembers && Array.isArray(formData.teamMembers)) {
            mappedData[this.fieldMapping.teamMembers] = formData.teamMembers.join('\n• ');
        }

        if (formData.milestones && Array.isArray(formData.milestones)) {
            mappedData[this.fieldMapping.milestones] = formData.milestones
                .map(m => `${m.date}: ${m.description}`)
                .join('\n');
        }

        // Handle bullet points
        if (formData.benefits && Array.isArray(formData.benefits)) {
            mappedData[this.fieldMapping.benefits] = '• ' + formData.benefits.join('\n• ');
        } else if (formData.benefits && typeof formData.benefits === 'string') {
            // Convert newline-separated text to bullet points
            const lines = formData.benefits.split('\n').filter(line => line.trim());
            mappedData[this.fieldMapping.benefits] = '• ' + lines.join('\n• ');
        }

        return mappedData;
    }

    /**
     * Analyze the template to understand its structure
     * @returns {Promise<Object>} - Template analysis results
     */
    async analyzeTemplate() {
        return new Promise((resolve, reject) => {
            const python = process.platform === 'win32' ? 'python' : 'python3';
            const venvPython = path.join(__dirname, '../../../venv/bin/python');

            // Try venv python first, fallback to system python
            const pythonExec = fs.access(venvPython).then(() => venvPython).catch(() => python);

            pythonExec.then(pyPath => {
                const process = spawn(pyPath, [this.analyzerScript]);

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
                        reject(new Error(`Template analysis failed: ${stderr}`));
                    } else {
                        // Parse the analysis results
                        try {
                            const analysisFile = path.join(
                                path.dirname(this.templatePath),
                                'template_analysis.json'
                            );

                            fs.readFile(analysisFile, 'utf8')
                                .then(data => resolve(JSON.parse(data)))
                                .catch(err => reject(err));
                        } catch (error) {
                            resolve({ output: stdout, error: stderr });
                        }
                    }
                });
            }).catch(reject);
        });
    }

    /**
     * Fill the template with data
     * @param {Object} formData - Form data to fill template with
     * @param {String} outputFileName - Optional output file name
     * @returns {Promise<String>} - Path to generated file
     */
    async fillTemplate(formData, outputFileName = null) {
        // Map form data to template placeholders
        const mappedData = this.mapFormToTemplate(formData);

        // Generate output filename
        if (!outputFileName) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const companyName = formData.companyName || 'QuadChart';
            outputFileName = `${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.pptx`;
        }

        const outputPath = path.join(this.outputDir, outputFileName);

        // Ensure output directory exists
        await fs.mkdir(this.outputDir, { recursive: true });

        return new Promise((resolve, reject) => {
            const python = process.platform === 'win32' ? 'python' : 'python3';
            const venvPython = path.join(__dirname, '../../../venv/bin/python');

            // Try venv python first, fallback to system python
            const pythonExec = fs.access(venvPython).then(() => venvPython).catch(() => python);

            pythonExec.then(pyPath => {
                const args = [
                    this.fillerScript,
                    this.templatePath,
                    JSON.stringify(mappedData),
                    outputPath
                ];

                const process = spawn(pyPath, args);

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
                        reject(new Error(`Template filling failed: ${stderr}`));
                    } else {
                        resolve(outputPath);
                    }
                });
            }).catch(reject);
        });
    }

    /**
     * Get available placeholders from the template
     * @returns {Promise<Array>} - List of placeholder texts found in template
     */
    async getAvailablePlaceholders() {
        try {
            const analysis = await this.analyzeTemplate();
            const placeholders = new Set();

            // Extract all text that looks like placeholders [Text]
            for (const slide of analysis.slides) {
                for (const shape of slide.shapes) {
                    if (shape.text_frame && shape.text_frame.text) {
                        const matches = shape.text_frame.text.match(/\[([^\]]+)\]/g);
                        if (matches) {
                            matches.forEach(match => placeholders.add(match));
                        }
                    }
                }
            }

            return Array.from(placeholders);
        } catch (error) {
            console.error('Error getting placeholders:', error);
            // Return default placeholders if analysis fails
            return Object.values(this.fieldMapping);
        }
    }

    /**
     * Validate that required fields are present
     * @param {Object} formData - Form data to validate
     * @returns {Object} - Validation result { isValid: boolean, errors: [] }
     */
    validateFormData(formData) {
        const errors = [];
        const requiredFields = ['companyName', 'technologyTitle', 'date'];

        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                errors.push(`Required field missing: ${field}`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Export for use in other modules
module.exports = TemplateMapper;

// Example usage
if (require.main === module) {
    const mapper = new TemplateMapper();

    // Example form data
    const exampleFormData = {
        companyName: 'Aerospace Innovations Inc.',
        technologyTitle: 'Next-Gen Satellite Communication System',
        date: new Date(),
        technicalPoc: 'Dr. Robert Chen',
        email: 'rchen@aerospace-innovations.com',
        phone: '(555) 987-6543',

        problemStatement: 'Current satellite communication systems suffer from high latency and limited bandwidth.',
        solution: 'Quantum-enhanced communication protocol with adaptive beamforming technology.',
        benefits: [
            '10x increase in data throughput',
            '50% reduction in latency',
            'Enhanced security through quantum encryption'
        ],
        implementation: 'Phase 1: Prototype development (6 months)\nPhase 2: Testing (3 months)\nPhase 3: Deployment (3 months)',

        trl: '6',
        budget: '$2.5M',
        duration: '12 months'
    };

    // Test the mapper
    (async () => {
        try {
            console.log('Analyzing template...');
            const analysis = await mapper.analyzeTemplate();
            console.log('Template analyzed successfully');

            console.log('\nValidating form data...');
            const validation = mapper.validateFormData(exampleFormData);
            if (validation.isValid) {
                console.log('Form data is valid');

                console.log('\nFilling template...');
                const outputPath = await mapper.fillTemplate(exampleFormData);
                console.log(`Template filled successfully: ${outputPath}`);
            } else {
                console.log('Validation errors:', validation.errors);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}