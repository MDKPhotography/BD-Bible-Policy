/**
 * Data Aggregator Service
 * Collects and analyzes quad chart submissions for reporting and insights
 */

const { Op, fn, col, literal } = require('sequelize');
const { QuadChartSubmission, QuadChartHistory } = require('../models/QuadChartSubmission');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs').promises;
const schedule = require('node-schedule');

class DataAggregator {
    constructor() {
        this.reportsDir = path.join(__dirname, '../../../reports');
        this.initializeScheduledJobs();
    }

    /**
     * Initialize scheduled jobs for automatic reporting
     */
    initializeScheduledJobs() {
        // Weekly report - Every Monday at 9 AM
        schedule.scheduleJob('0 9 * * 1', async () => {
            try {
                await this.generateWeeklyReport();
                console.log('Weekly report generated successfully');
            } catch (error) {
                console.error('Failed to generate weekly report:', error);
            }
        });

        // Monthly report - First day of every month at 9 AM
        schedule.scheduleJob('0 9 1 * *', async () => {
            try {
                await this.generateMonthlyReport();
                console.log('Monthly report generated successfully');
            } catch (error) {
                console.error('Failed to generate monthly report:', error);
            }
        });
    }

    /**
     * Get quad chart statistics
     */
    async getQuadChartStatistics(filters = {}) {
        try {
            const whereClause = this.buildWhereClause(filters);

            // Overall statistics
            const totalCharts = await QuadChartSubmission.count({ where: whereClause });

            // Status breakdown
            const statusBreakdown = await QuadChartSubmission.findAll({
                where: whereClause,
                attributes: [
                    'status',
                    [fn('COUNT', col('id')), 'count']
                ],
                group: ['status'],
                raw: true
            });

            // Charts by template
            const templateBreakdown = await QuadChartSubmission.findAll({
                where: whereClause,
                attributes: [
                    'templateName',
                    [fn('COUNT', col('id')), 'count']
                ],
                group: ['templateName'],
                raw: true
            });

            // Top companies
            const topCompanies = await QuadChartSubmission.findAll({
                where: whereClause,
                attributes: [
                    'companyName',
                    [fn('COUNT', col('id')), 'count']
                ],
                group: ['companyName'],
                order: [[fn('COUNT', col('id')), 'DESC']],
                limit: 10,
                raw: true
            });

            // User activity
            const userActivity = await QuadChartSubmission.findAll({
                where: whereClause,
                attributes: [
                    'userId',
                    [fn('COUNT', col('id')), 'submissions'],
                    [fn('AVG', col('versionNumber')), 'avgVersions']
                ],
                group: ['userId'],
                include: [
                    {
                        association: 'creator',
                        attributes: ['name', 'email']
                    }
                ],
                order: [[fn('COUNT', col('id')), 'DESC']],
                limit: 10
            });

            // Time-based statistics
            const submissionTrends = await this.getSubmissionTrends(whereClause);

            // Approval metrics
            const approvalMetrics = await this.getApprovalMetrics(whereClause);

            // Contract value statistics
            const contractValueStats = await this.getContractValueStatistics(whereClause);

            return {
                overview: {
                    total: totalCharts,
                    statusBreakdown: this.formatStatusBreakdown(statusBreakdown),
                    averageCompletionTime: await this.calculateAverageCompletionTime(whereClause)
                },
                templates: templateBreakdown,
                topCompanies,
                userActivity,
                trends: submissionTrends,
                approvalMetrics,
                contractValueStats
            };
        } catch (error) {
            console.error('Error getting statistics:', error);
            throw error;
        }
    }

    /**
     * Build where clause from filters
     */
    buildWhereClause(filters) {
        const whereClause = {};

        if (filters.startDate && filters.endDate) {
            whereClause.createdAt = {
                [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
            };
        }

        if (filters.status) {
            whereClause.status = filters.status;
        }

        if (filters.userId) {
            whereClause.userId = filters.userId;
        }

        if (filters.companyName) {
            whereClause.companyName = {
                [Op.iLike]: `%${filters.companyName}%`
            };
        }

        return whereClause;
    }

    /**
     * Format status breakdown
     */
    formatStatusBreakdown(statusData) {
        const formatted = {
            draft: 0,
            in_review: 0,
            submitted: 0,
            approved: 0,
            rejected: 0,
            archived: 0
        };

        statusData.forEach(item => {
            formatted[item.status] = parseInt(item.count);
        });

        return formatted;
    }

    /**
     * Get submission trends over time
     */
    async getSubmissionTrends(whereClause) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const trends = await QuadChartSubmission.findAll({
            where: {
                ...whereClause,
                createdAt: {
                    [Op.gte]: thirtyDaysAgo
                }
            },
            attributes: [
                [fn('DATE', col('createdAt')), 'date'],
                [fn('COUNT', col('id')), 'count']
            ],
            group: [fn('DATE', col('createdAt'))],
            order: [[fn('DATE', col('createdAt')), 'ASC']],
            raw: true
        });

        return trends;
    }

    /**
     * Get approval metrics
     */
    async getApprovalMetrics(whereClause) {
        const approved = await QuadChartSubmission.count({
            where: {
                ...whereClause,
                status: 'approved'
            }
        });

        const rejected = await QuadChartSubmission.count({
            where: {
                ...whereClause,
                status: 'rejected'
            }
        });

        const pending = await QuadChartSubmission.count({
            where: {
                ...whereClause,
                status: ['submitted', 'in_review']
            }
        });

        const approvalRate = (approved / (approved + rejected)) * 100 || 0;

        // Average time to approval
        const avgApprovalTime = await QuadChartSubmission.findOne({
            where: {
                ...whereClause,
                status: 'approved',
                approvedAt: { [Op.not]: null }
            },
            attributes: [
                [fn('AVG', literal('EXTRACT(EPOCH FROM ("approvedAt" - "submittedAt"))/3600')), 'avgHours']
            ],
            raw: true
        });

        return {
            approved,
            rejected,
            pending,
            approvalRate: approvalRate.toFixed(1),
            averageApprovalTimeHours: avgApprovalTime?.avgHours || 0
        };
    }

    /**
     * Get contract value statistics
     */
    async getContractValueStatistics(whereClause) {
        const values = await QuadChartSubmission.findAll({
            where: {
                ...whereClause,
                contractValue: { [Op.not]: null }
            },
            attributes: ['contractValue'],
            raw: true
        });

        // Parse contract values (handle various formats like $1M, $500K, etc.)
        const numericValues = values.map(v => this.parseContractValue(v.contractValue)).filter(v => v > 0);

        if (numericValues.length === 0) {
            return {
                total: 0,
                average: 0,
                min: 0,
                max: 0,
                count: 0
            };
        }

        const total = numericValues.reduce((sum, val) => sum + val, 0);
        const average = total / numericValues.length;

        return {
            total: this.formatCurrency(total),
            average: this.formatCurrency(average),
            min: this.formatCurrency(Math.min(...numericValues)),
            max: this.formatCurrency(Math.max(...numericValues)),
            count: numericValues.length
        };
    }

    /**
     * Parse contract value string to number
     */
    parseContractValue(valueStr) {
        if (!valueStr) return 0;

        // Remove $ and spaces
        let cleaned = valueStr.replace(/[\$\s,]/g, '');

        // Handle M (millions) and K (thousands)
        if (cleaned.toLowerCase().includes('m')) {
            return parseFloat(cleaned.replace(/m/i, '')) * 1000000;
        }
        if (cleaned.toLowerCase().includes('k')) {
            return parseFloat(cleaned.replace(/k/i, '')) * 1000;
        }

        return parseFloat(cleaned) || 0;
    }

    /**
     * Format currency value
     */
    formatCurrency(value) {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}K`;
        }
        return `$${value.toFixed(0)}`;
    }

    /**
     * Calculate average completion time
     */
    async calculateAverageCompletionTime(whereClause) {
        const completedCharts = await QuadChartSubmission.findAll({
            where: {
                ...whereClause,
                status: ['submitted', 'approved'],
                submittedAt: { [Op.not]: null }
            },
            attributes: [
                [fn('AVG', literal('EXTRACT(EPOCH FROM ("submittedAt" - "createdAt"))/3600')), 'avgHours']
            ],
            raw: true
        });

        const avgHours = completedCharts[0]?.avgHours || 0;

        if (avgHours < 24) {
            return `${Math.round(avgHours)} hours`;
        } else {
            return `${Math.round(avgHours / 24)} days`;
        }
    }

    /**
     * Generate weekly report
     */
    async generateWeeklyReport() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const stats = await this.getQuadChartStatistics({
            startDate: oneWeekAgo,
            endDate: new Date()
        });

        const report = await this.generateExcelReport(stats, 'Weekly');

        // Send email notification (implement if email service is available)
        // await this.sendReportEmail(report, 'weekly');

        return report;
    }

    /**
     * Generate monthly report
     */
    async generateMonthlyReport() {
        const firstDayLastMonth = new Date();
        firstDayLastMonth.setMonth(firstDayLastMonth.getMonth() - 1, 1);

        const lastDayLastMonth = new Date();
        lastDayLastMonth.setMonth(lastDayLastMonth.getMonth(), 0);

        const stats = await this.getQuadChartStatistics({
            startDate: firstDayLastMonth,
            endDate: lastDayLastMonth
        });

        const report = await this.generateExcelReport(stats, 'Monthly');

        // Send email notification (implement if email service is available)
        // await this.sendReportEmail(report, 'monthly');

        return report;
    }

    /**
     * Generate Excel report
     */
    async generateExcelReport(statistics, reportType = 'Custom') {
        await fs.mkdir(this.reportsDir, { recursive: true });

        const workbook = new ExcelJS.Workbook();

        // Overview sheet
        const overviewSheet = workbook.addWorksheet('Overview');
        this.addOverviewSheet(overviewSheet, statistics.overview);

        // User Activity sheet
        const userSheet = workbook.addWorksheet('User Activity');
        this.addUserActivitySheet(userSheet, statistics.userActivity);

        // Company Analysis sheet
        const companySheet = workbook.addWorksheet('Top Companies');
        this.addCompanySheet(companySheet, statistics.topCompanies);

        // Trends sheet
        const trendsSheet = workbook.addWorksheet('Trends');
        this.addTrendsSheet(trendsSheet, statistics.trends);

        // Contract Values sheet
        const contractSheet = workbook.addWorksheet('Contract Values');
        this.addContractSheet(contractSheet, statistics.contractValueStats);

        // Generate filename
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `QuadChart_${reportType}_Report_${timestamp}.xlsx`;
        const filepath = path.join(this.reportsDir, filename);

        // Save workbook
        await workbook.xlsx.writeFile(filepath);

        return filepath;
    }

    /**
     * Add overview sheet to workbook
     */
    addOverviewSheet(sheet, overview) {
        // Headers
        sheet.columns = [
            { header: 'Metric', key: 'metric', width: 30 },
            { header: 'Value', key: 'value', width: 20 }
        ];

        // Data
        sheet.addRow({ metric: 'Total Quad Charts', value: overview.total });
        sheet.addRow({ metric: 'Draft', value: overview.statusBreakdown.draft });
        sheet.addRow({ metric: 'In Review', value: overview.statusBreakdown.in_review });
        sheet.addRow({ metric: 'Submitted', value: overview.statusBreakdown.submitted });
        sheet.addRow({ metric: 'Approved', value: overview.statusBreakdown.approved });
        sheet.addRow({ metric: 'Rejected', value: overview.statusBreakdown.rejected });
        sheet.addRow({ metric: 'Average Completion Time', value: overview.averageCompletionTime });

        // Styling
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };
    }

    /**
     * Add user activity sheet to workbook
     */
    addUserActivitySheet(sheet, userActivity) {
        sheet.columns = [
            { header: 'User Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Submissions', key: 'submissions', width: 15 },
            { header: 'Avg Versions', key: 'avgVersions', width: 15 }
        ];

        userActivity.forEach(user => {
            sheet.addRow({
                name: user.creator?.name || 'Unknown',
                email: user.creator?.email || '',
                submissions: user.submissions,
                avgVersions: parseFloat(user.avgVersions).toFixed(1)
            });
        });

        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };
    }

    /**
     * Add company sheet to workbook
     */
    addCompanySheet(sheet, topCompanies) {
        sheet.columns = [
            { header: 'Company Name', key: 'company', width: 35 },
            { header: 'Number of Charts', key: 'count', width: 20 }
        ];

        topCompanies.forEach(company => {
            sheet.addRow({
                company: company.companyName,
                count: company.count
            });
        });

        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };
    }

    /**
     * Add trends sheet to workbook
     */
    addTrendsSheet(sheet, trends) {
        sheet.columns = [
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Submissions', key: 'count', width: 15 }
        ];

        trends.forEach(trend => {
            sheet.addRow({
                date: trend.date,
                count: trend.count
            });
        });

        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };
    }

    /**
     * Add contract values sheet to workbook
     */
    addContractSheet(sheet, contractStats) {
        sheet.columns = [
            { header: 'Metric', key: 'metric', width: 30 },
            { header: 'Value', key: 'value', width: 20 }
        ];

        sheet.addRow({ metric: 'Total Value', value: contractStats.total });
        sheet.addRow({ metric: 'Average Value', value: contractStats.average });
        sheet.addRow({ metric: 'Minimum Value', value: contractStats.min });
        sheet.addRow({ metric: 'Maximum Value', value: contractStats.max });
        sheet.addRow({ metric: 'Number of Contracts', value: contractStats.count });

        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };
    }

    /**
     * Export all submissions to Excel
     */
    async exportAllSubmissions(filters = {}) {
        const whereClause = this.buildWhereClause(filters);

        const submissions = await QuadChartSubmission.findAll({
            where: whereClause,
            include: [
                {
                    association: 'creator',
                    attributes: ['name', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Quad Chart Submissions');

        // Define columns
        sheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Opportunity Name', key: 'opportunityName', width: 30 },
            { header: 'Company Name', key: 'companyName', width: 25 },
            { header: 'Client Name', key: 'clientName', width: 25 },
            { header: 'Contract Value', key: 'contractValue', width: 15 },
            { header: 'Status', key: 'status', width: 12 },
            { header: 'Version', key: 'versionNumber', width: 10 },
            { header: 'Created By', key: 'createdBy', width: 20 },
            { header: 'Created Date', key: 'createdAt', width: 15 },
            { header: 'Submitted Date', key: 'submittedAt', width: 15 },
            { header: 'Approved Date', key: 'approvedAt', width: 15 }
        ];

        // Add data
        submissions.forEach(submission => {
            sheet.addRow({
                id: submission.id,
                opportunityName: submission.opportunityName,
                companyName: submission.companyName,
                clientName: submission.clientName,
                contractValue: submission.contractValue,
                status: submission.status,
                versionNumber: submission.versionNumber,
                createdBy: submission.creator?.name || '',
                createdAt: submission.createdAt?.toISOString().split('T')[0],
                submittedAt: submission.submittedAt?.toISOString().split('T')[0],
                approvedAt: submission.approvedAt?.toISOString().split('T')[0]
            });
        });

        // Style header row
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        // Generate file
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `QuadChart_Export_${timestamp}.xlsx`;
        const filepath = path.join(this.reportsDir, filename);

        await fs.mkdir(this.reportsDir, { recursive: true });
        await workbook.xlsx.writeFile(filepath);

        return filepath;
    }
}

// Create singleton instance
const dataAggregator = new DataAggregator();

module.exports = dataAggregator;