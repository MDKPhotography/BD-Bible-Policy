const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { QuadChart } = require('../models/QuadChart');
const pptxService = require('../services/pptxService');
const { verifyToken } = require('../auth');

// Initialize QuadChart model
const quadChartModel = new QuadChart();

// GET /api/quad-charts - List all quad charts
router.get('/', verifyToken, async (req, res) => {
  try {
    const charts = quadChartModel.findAll();
    res.json({
      success: true,
      data: charts,
      count: charts.length
    });
  } catch (error) {
    console.error('Error fetching quad charts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quad charts'
    });
  }
});

// GET /api/quad-charts/:id - Get specific chart
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const chart = quadChartModel.findById(req.params.id);

    if (!chart) {
      return res.status(404).json({
        success: false,
        error: 'Quad chart not found'
      });
    }

    res.json({
      success: true,
      data: chart
    });
  } catch (error) {
    console.error('Error fetching quad chart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quad chart'
    });
  }
});

// POST /api/quad-charts - Create new quad chart
router.post('/', verifyToken, async (req, res) => {
  try {
    // Validate input
    const validation = pptxService.validateChartData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    // Create the chart
    const chartData = {
      ...req.body,
      created_by: req.user.email || req.user.id
    };

    const newChart = quadChartModel.create(chartData);

    res.status(201).json({
      success: true,
      data: newChart,
      message: 'Quad chart created successfully'
    });
  } catch (error) {
    console.error('Error creating quad chart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create quad chart'
    });
  }
});

// PUT /api/quad-charts/:id - Update chart
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Check if chart exists
    const existingChart = quadChartModel.findById(req.params.id);
    if (!existingChart) {
      return res.status(404).json({
        success: false,
        error: 'Quad chart not found'
      });
    }

    // Validate update data
    const validation = pptxService.validateChartData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    // Update the chart
    const updatedChart = quadChartModel.update(req.params.id, req.body);

    res.json({
      success: true,
      data: updatedChart,
      message: 'Quad chart updated successfully'
    });
  } catch (error) {
    console.error('Error updating quad chart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update quad chart'
    });
  }
});

// DELETE /api/quad-charts/:id - Delete chart
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = quadChartModel.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Quad chart not found'
      });
    }

    res.json({
      success: true,
      message: 'Quad chart deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting quad chart:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete quad chart'
    });
  }
});

// POST /api/quad-charts/:id/generate-pptx - Generate PowerPoint
router.post('/:id/generate-pptx', verifyToken, async (req, res) => {
  try {
    // Get the chart data
    const chart = quadChartModel.findById(req.params.id);

    if (!chart) {
      return res.status(404).json({
        success: false,
        error: 'Quad chart not found'
      });
    }

    // Generate the PPTX
    const result = await pptxService.generateQuadChart(chart);

    // Update chart with generated file info
    quadChartModel.update(req.params.id, {
      last_generated: new Date().toISOString(),
      generated_file: result.filename
    });

    res.json({
      success: true,
      data: result,
      message: 'PowerPoint generated successfully'
    });
  } catch (error) {
    console.error('Error generating PPTX:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate PowerPoint'
    });
  }
});

// GET /api/quad-charts/download/:filename - Download generated PPTX
router.get('/download/:filename', verifyToken, async (req, res) => {
  try {
    const filename = req.params.filename;

    // Security check - ensure filename is safe
    if (!filename.match(/^quad_chart_[\w]+\.pptx$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid filename'
      });
    }

    const filePath = pptxService.getFilePath(filename);

    if (!pptxService.fileExists(filename)) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to download file'
    });
  }
});

// GET /api/quad-charts/search - Search quad charts
router.get('/search', verifyToken, async (req, res) => {
  try {
    const query = req.query.q || '';

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const results = quadChartModel.search(query);

    res.json({
      success: true,
      data: results,
      count: results.length,
      query: query
    });
  } catch (error) {
    console.error('Error searching quad charts:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
});

// POST /api/quad-charts/generate-sample - Generate a sample quad chart
router.post('/generate-sample', verifyToken, async (req, res) => {
  try {
    const sampleData = {
      title: 'Sample GMU Quad Chart',
      client: 'Department of Defense',
      technical_approach: `• Leverage cutting-edge AI/ML technologies
• Implement secure cloud infrastructure
• Deploy microservices architecture
• Ensure 99.9% uptime SLA
• Integrate with existing DoD systems`,
      management_approach: `• Experienced PM with 15+ years DoD experience
• Agile/Scrum methodology
• Weekly stakeholder updates
• Risk management framework
• Quality assurance protocols`,
      past_performance: `• $50M Navy SPAWAR contract (2021-2023)
• $35M Army CECOM project (2020-2022)
• $28M Air Force modernization (2019-2021)
• CMMI Level 3 certified
• ISO 9001:2015 certified`,
      cost_schedule: `• Total cost: $12.5M
• Period of Performance: 36 months
• Key milestones:
  - Phase 1: 6 months ($3M)
  - Phase 2: 12 months ($5M)
  - Phase 3: 18 months ($4.5M)`,
      created_by: req.user.email || 'sample'
    };

    // Create the sample chart
    const newChart = quadChartModel.create(sampleData);

    // Generate PPTX immediately
    const pptxResult = await pptxService.generateQuadChart(newChart);

    res.json({
      success: true,
      data: {
        chart: newChart,
        pptx: pptxResult
      },
      message: 'Sample quad chart created and generated successfully'
    });
  } catch (error) {
    console.error('Error generating sample:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate sample quad chart'
    });
  }
});

module.exports = router;