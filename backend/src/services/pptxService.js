const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class PPTXService {
  constructor() {
    // Path to Python virtual environment
    this.pythonPath = path.join(__dirname, '../../venv/bin/python');
    // Path to the Python PPTX generator script
    this.scriptPath = path.join(__dirname, './pptxGenerator.py');
    // Output directory for generated files
    this.outputDir = path.join(__dirname, '../../data/generated_pptx');

    // Ensure output directory exists
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Generate a PPTX quad chart
   * @param {Object} chartData - The quad chart data
   * @returns {Promise<Object>} Result with file path
   */
  generateQuadChart(chartData) {
    return new Promise((resolve, reject) => {
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `quad_chart_${chartData.id || timestamp}.pptx`;
      const outputPath = path.join(this.outputDir, filename);

      // Prepare data for Python script
      const jsonData = JSON.stringify({
        title: chartData.title || 'Quad Chart',
        client: chartData.client || '',
        technical_approach: chartData.technical_approach || '',
        management_approach: chartData.management_approach || '',
        past_performance: chartData.past_performance || '',
        cost_schedule: chartData.cost_schedule || '',
        footer: `${chartData.client || 'BD Bible'} - Generated ${new Date().toLocaleDateString()}`,
        logo_path: chartData.logo_path || null
      });

      // Spawn Python process
      const pythonProcess = spawn(this.pythonPath, [
        this.scriptPath,
        jsonData,
        outputPath
      ]);

      let stdout = '';
      let stderr = '';

      // Capture stdout
      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      // Capture stderr
      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      // Handle process completion
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error('Python process error:', stderr);
          reject(new Error(`PPTX generation failed: ${stderr}`));
        } else {
          try {
            // Parse Python output
            const result = JSON.parse(stdout);
            if (result.success) {
              resolve({
                success: true,
                path: result.path,
                filename: filename,
                url: `/api/quad-charts/download/${filename}`
              });
            } else {
              reject(new Error(result.error || 'PPTX generation failed'));
            }
          } catch (parseError) {
            // If output isn't JSON, still try to check if file was created
            if (fs.existsSync(outputPath)) {
              resolve({
                success: true,
                path: outputPath,
                filename: filename,
                url: `/api/quad-charts/download/${filename}`
              });
            } else {
              reject(new Error('Failed to parse Python output: ' + stdout));
            }
          }
        }
      });

      // Handle process errors
      pythonProcess.on('error', (error) => {
        console.error('Failed to start Python process:', error);
        reject(new Error(`Failed to start Python process: ${error.message}`));
      });
    });
  }

  /**
   * Get the full path for a generated file
   * @param {string} filename - The filename
   * @returns {string} Full file path
   */
  getFilePath(filename) {
    return path.join(this.outputDir, filename);
  }

  /**
   * Check if a generated file exists
   * @param {string} filename - The filename
   * @returns {boolean} True if file exists
   */
  fileExists(filename) {
    const filePath = this.getFilePath(filename);
    return fs.existsSync(filePath);
  }

  /**
   * Delete a generated file
   * @param {string} filename - The filename
   * @returns {boolean} True if deleted successfully
   */
  deleteFile(filename) {
    try {
      const filePath = this.getFilePath(filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  /**
   * List all generated PPTX files
   * @returns {Array} List of generated files
   */
  listGeneratedFiles() {
    try {
      const files = fs.readdirSync(this.outputDir);
      return files
        .filter(file => file.endsWith('.pptx'))
        .map(file => {
          const stats = fs.statSync(path.join(this.outputDir, file));
          return {
            filename: file,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
          };
        });
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  /**
   * Validate chart data before generation
   * @param {Object} chartData - The chart data to validate
   * @returns {Object} Validation result
   */
  validateChartData(chartData) {
    const errors = [];

    if (!chartData.title || chartData.title.trim() === '') {
      errors.push('Title is required');
    }

    // Check content length limits (optional)
    const maxContentLength = 2000;
    const contentFields = [
      'technical_approach',
      'management_approach',
      'past_performance',
      'cost_schedule'
    ];

    contentFields.forEach(field => {
      if (chartData[field] && chartData[field].length > maxContentLength) {
        errors.push(`${field} exceeds maximum length of ${maxContentLength} characters`);
      }
    });

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}

// Export singleton instance
module.exports = new PPTXService();