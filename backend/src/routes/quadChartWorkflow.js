/**
 * Quad Chart Workflow API Routes
 * Handles all quad chart operations including CRUD, templates, and downloads
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const {
    QuadChartSubmission,
    QuadChartHistory,
    QuadChartComment
} = require('../models/QuadChartSubmission');
const templateService = require('../services/quadChartTemplates');
const pptxGenerator = require('../services/pptxGenerator');
const dataAggregator = require('../services/dataAggregator');

// Multer configuration for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

/**
 * GET /api/quad-charts/templates
 * List all available templates
 */
router.get('/templates', authenticateToken, async (req, res) => {
    try {
        const templates = templateService.getTemplates();
        res.json(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

/**
 * GET /api/templates/preview/:filename
 * Serve template preview images
 */
router.get('/templates/preview/:filename', async (req, res) => {
    try {
        const previewPath = path.join(
            __dirname,
            '../../templates/powerpoint/previews',
            req.params.filename
        );
        res.sendFile(previewPath);
    } catch (error) {
        res.status(404).json({ error: 'Preview not found' });
    }
});

/**
 * POST /api/quad-charts/create
 * Create a new quad chart
 */
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const {
            templateName,
            opportunityName,
            companyName,
            ...otherData
        } = req.body;

        // Validate template
        const template = templateService.getTemplate(templateName);
        if (!template) {
            return res.status(400).json({ error: 'Invalid template' });
        }

        // Create quad chart submission
        const quadChart = await QuadChartSubmission.create({
            userId: req.user.id,
            templateName,
            opportunityName,
            companyName,
            ...otherData,
            status: 'draft',
            versionNumber: 1
        });

        // Record creation in history
        await QuadChartHistory.create({
            quadChartId: quadChart.id,
            userId: req.user.id,
            action: 'created',
            versionNumber: 1,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.status(201).json({
            id: quadChart.id,
            message: 'Quad chart created successfully'
        });
    } catch (error) {
        console.error('Error creating quad chart:', error);
        res.status(500).json({ error: 'Failed to create quad chart' });
    }
});

/**
 * GET /api/quad-charts/:id
 * Get a specific quad chart
 */
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const quadChart = await QuadChartSubmission.findOne({
            where: {
                id: req.params.id,
                [Op.or]: [
                    { userId: req.user.id },
                    { '$creator.manager_id$': req.user.id }
                ]
            },
            include: [
                {
                    association: 'creator',
                    attributes: ['id', 'name', 'email']
                },
                {
                    association: 'comments',
                    include: [
                        {
                            association: 'user',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });

        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found' });
        }

        res.json({
            ...quadChart.toJSON(),
            data: {
                opportunityName: quadChart.opportunityName,
                companyName: quadChart.companyName,
                clientName: quadChart.clientName,
                submissionDate: quadChart.submissionDate,
                contractValue: quadChart.contractValue,
                rfpDate: quadChart.rfpDate,
                awardDate: quadChart.awardDate,
                technicalPoc: quadChart.technicalPoc,
                email: quadChart.email,
                phone: quadChart.phone,
                technicalData: quadChart.technicalData,
                managementData: quadChart.managementData,
                pastPerformanceData: quadChart.pastPerformanceData,
                costScheduleData: quadChart.costScheduleData,
                ...quadChart.additionalData
            },
            templateName: quadChart.templateName
        });
    } catch (error) {
        console.error('Error fetching quad chart:', error);
        res.status(500).json({ error: 'Failed to fetch quad chart' });
    }
});

/**
 * PUT /api/quad-charts/:id/save
 * Save/update quad chart (manual or auto-save)
 */
router.put('/:id/save', authenticateToken, async (req, res) => {
    try {
        const quadChart = await QuadChartSubmission.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id,
                status: { [Op.in]: ['draft', 'in_review'] }
            }
        });

        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found or not editable' });
        }

        // Track changes for history
        const previousData = quadChart.toJSON();

        // Update quad chart data
        const updatedData = {
            opportunityName: req.body.opportunityName || quadChart.opportunityName,
            companyName: req.body.companyName || quadChart.companyName,
            clientName: req.body.clientName || quadChart.clientName,
            submissionDate: req.body.submissionDate || quadChart.submissionDate,
            contractValue: req.body.contractValue || quadChart.contractValue,
            rfpDate: req.body.rfpDate || quadChart.rfpDate,
            awardDate: req.body.awardDate || quadChart.awardDate,
            technicalPoc: req.body.technicalPoc || quadChart.technicalPoc,
            email: req.body.email || quadChart.email,
            phone: req.body.phone || quadChart.phone,
            technicalData: req.body.technicalData || quadChart.technicalData,
            managementData: req.body.managementData || quadChart.managementData,
            pastPerformanceData: req.body.pastPerformanceData || quadChart.pastPerformanceData,
            costScheduleData: req.body.costScheduleData || quadChart.costScheduleData,
            additionalData: {
                majorMilestones: req.body.majorMilestones,
                customerMeeting: req.body.customerMeeting,
                risks: req.body.risks,
                ...req.body.additionalData
            },
            lastAutoSaveAt: req.body.isAutoSave ? new Date() : quadChart.lastAutoSaveAt
        };

        await quadChart.update(updatedData);

        // Record in history
        await QuadChartHistory.create({
            quadChartId: quadChart.id,
            userId: req.user.id,
            action: req.body.isAutoSave ? 'auto_saved' : 'updated',
            previousData: previousData,
            newData: updatedData,
            versionNumber: quadChart.versionNumber,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.json({
            message: 'Quad chart saved successfully',
            lastSaved: new Date()
        });
    } catch (error) {
        console.error('Error saving quad chart:', error);
        res.status(500).json({ error: 'Failed to save quad chart' });
    }
});

/**
 * POST /api/quad-charts/:id/submit
 * Submit quad chart for approval
 */
router.post('/:id/submit', authenticateToken, async (req, res) => {
    try {
        const quadChart = await QuadChartSubmission.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id,
                status: 'draft'
            }
        });

        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found or already submitted' });
        }

        // Update status
        await quadChart.update({
            status: 'submitted',
            submittedAt: new Date()
        });

        // Record in history
        await QuadChartHistory.create({
            quadChartId: quadChart.id,
            userId: req.user.id,
            action: 'submitted',
            versionNumber: quadChart.versionNumber,
            notes: req.body.notes || '',
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.json({
            message: 'Quad chart submitted successfully'
        });
    } catch (error) {
        console.error('Error submitting quad chart:', error);
        res.status(500).json({ error: 'Failed to submit quad chart' });
    }
});

/**
 * GET /api/quad-charts/:id/download
 * Generate and download PowerPoint
 */
router.get('/:id/download', authenticateToken, async (req, res) => {
    try {
        const quadChart = await QuadChartSubmission.findOne({
            where: {
                id: req.params.id,
                [Op.or]: [
                    { userId: req.user.id },
                    { '$creator.manager_id$': req.user.id }
                ]
            },
            include: ['creator']
        });

        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found' });
        }

        // Generate PowerPoint
        const pptxPath = await pptxGenerator.generateQuadChart(quadChart);

        // Record download in history
        await QuadChartHistory.create({
            quadChartId: quadChart.id,
            userId: req.user.id,
            action: 'downloaded',
            versionNumber: quadChart.versionNumber,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        // Send file
        res.download(pptxPath, `${quadChart.opportunityName}_QuadChart.pptx`, async (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
            // Clean up generated file
            try {
                await fs.unlink(pptxPath);
            } catch (cleanupError) {
                console.error('Error cleaning up file:', cleanupError);
            }
        });
    } catch (error) {
        console.error('Error generating PowerPoint:', error);
        res.status(500).json({ error: 'Failed to generate PowerPoint' });
    }
});

/**
 * GET /api/quad-charts/my-charts
 * Get current user's quad charts
 */
router.get('/my-charts', authenticateToken, async (req, res) => {
    try {
        const { status, search, limit = 20, offset = 0 } = req.query;

        const whereClause = {
            userId: req.user.id
        };

        if (status) {
            whereClause.status = status;
        }

        if (search) {
            whereClause[Op.or] = [
                { opportunityName: { [Op.iLike]: `%${search}%` } },
                { companyName: { [Op.iLike]: `%${search}%` } },
                { clientName: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const quadCharts = await QuadChartSubmission.findAndCountAll({
            where: whereClause,
            order: [['updatedAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: [
                'id', 'opportunityName', 'companyName', 'clientName',
                'status', 'versionNumber', 'createdAt', 'updatedAt',
                'submittedAt', 'templateName'
            ]
        });

        res.json({
            total: quadCharts.count,
            charts: quadCharts.rows,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('Error fetching user quad charts:', error);
        res.status(500).json({ error: 'Failed to fetch quad charts' });
    }
});

/**
 * GET /api/quad-charts/all
 * Admin view - get all quad chart submissions
 */
router.get('/all', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
    try {
        const { status, userId, search, limit = 20, offset = 0, startDate, endDate } = req.query;

        const whereClause = {};

        if (status) {
            whereClause.status = status;
        }

        if (userId) {
            whereClause.userId = userId;
        }

        if (search) {
            whereClause[Op.or] = [
                { opportunityName: { [Op.iLike]: `%${search}%` } },
                { companyName: { [Op.iLike]: `%${search}%` } },
                { clientName: { [Op.iLike]: `%${search}%` } }
            ];
        }

        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const quadCharts = await QuadChartSubmission.findAndCountAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [
                {
                    association: 'creator',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        res.json({
            total: quadCharts.count,
            charts: quadCharts.rows,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('Error fetching all quad charts:', error);
        res.status(500).json({ error: 'Failed to fetch quad charts' });
    }
});

/**
 * POST /api/quad-charts/:id/approve
 * Approve a quad chart (admin/manager only)
 */
router.post('/:id/approve', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
    try {
        const quadChart = await QuadChartSubmission.findOne({
            where: {
                id: req.params.id,
                status: 'submitted'
            }
        });

        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found or not in submitted status' });
        }

        await quadChart.update({
            status: 'approved',
            approvedBy: req.user.id,
            approvedAt: new Date()
        });

        // Record in history
        await QuadChartHistory.create({
            quadChartId: quadChart.id,
            userId: req.user.id,
            action: 'approved',
            versionNumber: quadChart.versionNumber,
            notes: req.body.notes || '',
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.json({
            message: 'Quad chart approved successfully'
        });
    } catch (error) {
        console.error('Error approving quad chart:', error);
        res.status(500).json({ error: 'Failed to approve quad chart' });
    }
});

/**
 * POST /api/quad-charts/:id/reject
 * Reject a quad chart (admin/manager only)
 */
router.post('/:id/reject', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
    try {
        const { reason } = req.body;

        if (!reason) {
            return res.status(400).json({ error: 'Rejection reason is required' });
        }

        const quadChart = await QuadChartSubmission.findOne({
            where: {
                id: req.params.id,
                status: 'submitted'
            }
        });

        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found or not in submitted status' });
        }

        await quadChart.update({
            status: 'rejected',
            rejectionReason: reason
        });

        // Record in history
        await QuadChartHistory.create({
            quadChartId: quadChart.id,
            userId: req.user.id,
            action: 'rejected',
            versionNumber: quadChart.versionNumber,
            notes: reason,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        res.json({
            message: 'Quad chart rejected'
        });
    } catch (error) {
        console.error('Error rejecting quad chart:', error);
        res.status(500).json({ error: 'Failed to reject quad chart' });
    }
});

/**
 * POST /api/quad-charts/:id/comment
 * Add a comment to a quad chart
 */
router.post('/:id/comment', authenticateToken, async (req, res) => {
    try {
        const { comment, quadrant = 'general', parentCommentId } = req.body;

        if (!comment) {
            return res.status(400).json({ error: 'Comment is required' });
        }

        const quadChart = await QuadChartSubmission.findByPk(req.params.id);
        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found' });
        }

        const newComment = await QuadChartComment.create({
            quadChartId: quadChart.id,
            userId: req.user.id,
            comment,
            quadrant,
            parentCommentId
        });

        const commentWithUser = await QuadChartComment.findByPk(newComment.id, {
            include: [
                {
                    association: 'user',
                    attributes: ['id', 'name']
                }
            ]
        });

        res.status(201).json(commentWithUser);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

/**
 * GET /api/quad-charts/:id/history
 * Get quad chart history
 */
router.get('/:id/history', authenticateToken, async (req, res) => {
    try {
        const quadChart = await QuadChartSubmission.findOne({
            where: {
                id: req.params.id,
                [Op.or]: [
                    { userId: req.user.id },
                    { '$creator.manager_id$': req.user.id }
                ]
            }
        });

        if (!quadChart) {
            return res.status(404).json({ error: 'Quad chart not found' });
        }

        const history = await QuadChartHistory.findAll({
            where: { quadChartId: quadChart.id },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    association: 'user',
                    attributes: ['id', 'name']
                }
            ]
        });

        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

/**
 * GET /api/quad-charts/statistics
 * Get statistics for dashboard
 */
router.get('/statistics', authenticateToken, authorizeRole(['admin', 'manager']), async (req, res) => {
    try {
        const stats = await dataAggregator.getQuadChartStatistics(req.query);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;