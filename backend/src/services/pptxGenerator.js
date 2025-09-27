/**
 * PowerPoint Generator Service
 * Generates PowerPoint files from quad chart data using templates
 */

const path = require('path');
const fs = require('fs').promises;
const { spawn } = require('child_process');
const TemplateMapper = require('./templateMapper');

class PPTXGenerator {
    constructor() {
        this.outputDir = path.join(__dirname, '../../../output');
        this.templateDir = path.join(__dirname, '../../templates/powerpoint');
        this.pythonScript = path.join(__dirname, 'quadChartFiller.py');
        this.templateMapper = new TemplateMapper();
    }

    /**
     * Generate a quad chart PowerPoint from database record
     */
    async generateQuadChart(quadChartRecord) {
        try {
            // Ensure output directory exists
            await fs.mkdir(this.outputDir, { recursive: true });

            // Prepare data for PowerPoint generation
            const mappedData = this.prepareDataForPowerPoint(quadChartRecord);

            // Get template path
            const templatePath = path.join(this.templateDir, quadChartRecord.templateName);

            // Generate output filename
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const safeOpportunityName = quadChartRecord.opportunityName.replace(/[^a-zA-Z0-9]/g, '_');
            const outputFileName = `${safeOpportunityName}_${timestamp}.pptx`;
            const outputPath = path.join(this.outputDir, outputFileName);

            // Generate PowerPoint using Python script
            await this.executePythonScript(templatePath, mappedData, outputPath);

            // Update database with generated file path
            if (quadChartRecord.update) {
                await quadChartRecord.update({
                    generatedPptxPath: outputPath
                });
            }

            return outputPath;
        } catch (error) {
            console.error('Error generating PowerPoint:', error);
            throw new Error('Failed to generate PowerPoint presentation');
        }
    }

    /**
     * Prepare and map data for PowerPoint generation
     */
    prepareDataForPowerPoint(quadChartRecord) {
        const data = {
            // Basic information
            '[Opportunity Name]': quadChartRecord.opportunityName || '',
            '[Company Name]': quadChartRecord.companyName || '',
            '[Client Name]': quadChartRecord.clientName || '',
            '[Date]': this.formatDate(quadChartRecord.submissionDate),
            '[Submission Date]': this.formatDate(quadChartRecord.submissionDate),

            // Contract details
            '[Contract Value]': quadChartRecord.contractValue || 'TBD',
            '[RFP Date]': this.formatDate(quadChartRecord.rfpDate) || 'TBD',
            '[Award Date]': this.formatDate(quadChartRecord.awardDate) || 'TBD',

            // Contact information
            '[Technical POC]': quadChartRecord.technicalPoc || '',
            '[Email]': quadChartRecord.email || '',
            '[Phone]': quadChartRecord.phone || '',

            // Status
            '[Status]': this.formatStatus(quadChartRecord.status),

            // Quadrant content
            '[Technical Approach]': this.extractContent(quadChartRecord.technicalData),
            '[Management Approach]': this.extractContent(quadChartRecord.managementData),
            '[Past Performance]': this.extractContent(quadChartRecord.pastPerformanceData),
            '[Cost/Schedule]': this.extractContent(quadChartRecord.costScheduleData),

            // Additional template-specific fields from our template
            'Space Command J7': quadChartRecord.opportunityName || 'Space Command J7',
            'Opportunity ID': quadChartRecord.opportunityName || '',
            'Prime/Sub': quadChartRecord.additionalData?.primeOrSub || 'TBD',

            // Additional sections
            'Major Milestones/ Capture Progress': this.formatMultilineText(
                quadChartRecord.additionalData?.majorMilestones
            ),
            'Customer Meeting/ Teaming Progress': this.formatMultilineText(
                quadChartRecord.additionalData?.customerMeeting
            ),
            'Risks, Issues, Challenges, Requests': this.formatMultilineText(
                quadChartRecord.additionalData?.risks
            )
        };

        // Add any custom fields from additionalData
        if (quadChartRecord.additionalData) {
            Object.keys(quadChartRecord.additionalData).forEach(key => {
                const placeholderKey = `[${this.titleCase(key)}]`;
                if (!data[placeholderKey]) {
                    data[placeholderKey] = quadChartRecord.additionalData[key];
                }
            });
        }

        return data;
    }

    /**
     * Extract content from quadrant data
     */
    extractContent(quadrantData) {
        if (!quadrantData) return '';

        if (typeof quadrantData === 'string') {
            return this.stripHtml(quadrantData);
        }

        if (quadrantData.content) {
            let content = this.stripHtml(quadrantData.content);

            // Add key points if available
            if (quadrantData.keyPoints && quadrantData.keyPoints.length > 0) {
                content += '\n\nKey Points:\n';
                content += quadrantData.keyPoints.map(point => `• ${point}`).join('\n');
            }

            // Add projects for past performance
            if (quadrantData.projects && quadrantData.projects.length > 0) {
                content += '\n\nRelevant Projects:\n';
                content += quadrantData.projects.map(project =>
                    `• ${project.name}: ${project.description}`
                ).join('\n');
            }

            // Add milestones for cost/schedule
            if (quadrantData.milestones && quadrantData.milestones.length > 0) {
                content += '\n\nKey Milestones:\n';
                content += quadrantData.milestones.map(milestone =>
                    `• ${milestone.date}: ${milestone.description}`
                ).join('\n');
            }

            return content;
        }

        return '';
    }

    /**
     * Strip HTML tags from content
     */
    stripHtml(html) {
        if (!html) return '';

        // Remove HTML tags
        let text = html.replace(/<[^>]*>/g, '');

        // Replace HTML entities
        text = text.replace(/&nbsp;/g, ' ');
        text = text.replace(/&amp;/g, '&');
        text = text.replace(/&lt;/g, '<');
        text = text.replace(/&gt;/g, '>');
        text = text.replace(/&quot;/g, '"');
        text = text.replace(/&#39;/g, "'");

        // Clean up whitespace
        text = text.replace(/\s+/g, ' ').trim();

        return text;
    }

    /**
     * Format date for display
     */
    formatDate(date) {
        if (!date) return '';

        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Format status for display
     */
    formatStatus(status) {
        const statusMap = {
            'draft': 'Draft',
            'in_review': 'In Review',
            'submitted': 'Submitted',
            'approved': 'Approved',
            'rejected': 'Rejected',
            'archived': 'Archived'
        };

        return statusMap[status] || status;
    }

    /**
     * Format multiline text with bullet points
     */
    formatMultilineText(text) {
        if (!text) return '';

        // If text already has bullet points, return as-is
        if (text.includes('•') || text.includes('-')) {
            return text;
        }

        // Split by newlines and add bullet points
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length > 1) {
            return lines.map(line => `• ${line.trim()}`).join('\n');
        }

        return text;
    }

    /**
     * Convert string to title case
     */
    titleCase(str) {
        return str.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    /**
     * Execute Python script to generate PowerPoint
     */
    async executePythonScript(templatePath, data, outputPath) {
        return new Promise((resolve, reject) => {
            const python = process.platform === 'win32' ? 'python' : 'python3';
            const venvPython = path.join(__dirname, '../../../venv/bin/python');

            // Try venv python first, fallback to system python
            fs.access(venvPython).then(() => venvPython).catch(() => python).then(pyPath => {
                const args = [
                    this.pythonScript,
                    templatePath,
                    JSON.stringify(data),
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
                        console.error('Python script error:', stderr);
                        reject(new Error(`PowerPoint generation failed: ${stderr}`));
                    } else {
                        console.log('PowerPoint generated successfully:', stdout);
                        resolve(outputPath);
                    }
                });

                process.on('error', (error) => {
                    reject(new Error(`Failed to start Python process: ${error.message}`));
                });
            }).catch(reject);
        });
    }

    /**
     * Generate multiple quad charts in batch
     */
    async generateBatch(quadChartRecords) {
        const results = [];

        for (const record of quadChartRecords) {
            try {
                const outputPath = await this.generateQuadChart(record);
                results.push({
                    id: record.id,
                    success: true,
                    path: outputPath
                });
            } catch (error) {
                results.push({
                    id: record.id,
                    success: false,
                    error: error.message
                });
            }
        }

        return results;
    }

    /**
     * Generate a preview image of the PowerPoint
     */
    async generatePreview(quadChartRecord) {
        // This would use a library like unoconv or LibreOffice to convert
        // the first slide to an image for preview purposes
        // For now, return a placeholder
        return '/api/placeholder/800/600';
    }

    /**
     * Clean up old generated files
     */
    async cleanupOldFiles(daysToKeep = 7) {
        try {
            const files = await fs.readdir(this.outputDir);
            const now = Date.now();
            const cutoffTime = daysToKeep * 24 * 60 * 60 * 1000;

            for (const file of files) {
                if (file.endsWith('.pptx')) {
                    const filePath = path.join(this.outputDir, file);
                    const stats = await fs.stat(filePath);
                    const fileAge = now - stats.mtime.getTime();

                    if (fileAge > cutoffTime) {
                        await fs.unlink(filePath);
                        console.log(`Deleted old file: ${file}`);
                    }
                }
            }
        } catch (error) {
            console.error('Error cleaning up old files:', error);
        }
    }
}

// Create singleton instance
const pptxGenerator = new PPTXGenerator();

// Schedule cleanup every day
setInterval(() => {
    pptxGenerator.cleanupOldFiles().catch(console.error);
}, 24 * 60 * 60 * 1000);

module.exports = pptxGenerator;