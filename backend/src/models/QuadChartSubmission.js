/**
 * QuadChart Submission Database Model
 * Tracks all quad chart submissions with versioning and history
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Main QuadChart submission model
const QuadChartSubmission = sequelize.define('QuadChartSubmission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // User information
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },

    // Template information
    templateName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'template_name'
    },

    // Basic information
    opportunityName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'opportunity_name'
    },

    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'company_name'
    },

    clientName: {
        type: DataTypes.STRING,
        field: 'client_name'
    },

    submissionDate: {
        type: DataTypes.DATEONLY,
        field: 'submission_date'
    },

    contractValue: {
        type: DataTypes.STRING,
        field: 'contract_value'
    },

    rfpDate: {
        type: DataTypes.DATEONLY,
        field: 'rfp_date'
    },

    awardDate: {
        type: DataTypes.DATEONLY,
        field: 'award_date'
    },

    // Contact information
    technicalPoc: {
        type: DataTypes.STRING,
        field: 'technical_poc'
    },

    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },

    phone: {
        type: DataTypes.STRING
    },

    // Quadrant data stored as JSON
    technicalData: {
        type: DataTypes.JSON,
        field: 'technical_data',
        defaultValue: {
            title: 'Technical Approach',
            content: '',
            keyPoints: []
        }
    },

    managementData: {
        type: DataTypes.JSON,
        field: 'management_data',
        defaultValue: {
            title: 'Management Approach',
            content: '',
            keyPoints: []
        }
    },

    pastPerformanceData: {
        type: DataTypes.JSON,
        field: 'past_performance_data',
        defaultValue: {
            title: 'Past Performance',
            content: '',
            projects: []
        }
    },

    costScheduleData: {
        type: DataTypes.JSON,
        field: 'cost_schedule_data',
        defaultValue: {
            title: 'Cost/Schedule',
            content: '',
            milestones: []
        }
    },

    // Additional template-specific data
    additionalData: {
        type: DataTypes.JSON,
        field: 'additional_data',
        defaultValue: {}
    },

    // Status tracking
    status: {
        type: DataTypes.ENUM('draft', 'in_review', 'submitted', 'approved', 'rejected', 'archived'),
        defaultValue: 'draft'
    },

    // Version control
    versionNumber: {
        type: DataTypes.INTEGER,
        field: 'version_number',
        defaultValue: 1
    },

    parentId: {
        type: DataTypes.INTEGER,
        field: 'parent_id',
        references: {
            model: 'quad_chart_submissions',
            key: 'id'
        }
    },

    // Metadata
    tags: {
        type: DataTypes.JSON,
        defaultValue: []
    },

    notes: {
        type: DataTypes.TEXT
    },

    // File paths for generated documents
    generatedPptxPath: {
        type: DataTypes.STRING,
        field: 'generated_pptx_path'
    },

    generatedPdfPath: {
        type: DataTypes.STRING,
        field: 'generated_pdf_path'
    },

    // Approval tracking
    approvedBy: {
        type: DataTypes.INTEGER,
        field: 'approved_by',
        references: {
            model: 'users',
            key: 'id'
        }
    },

    approvedAt: {
        type: DataTypes.DATE,
        field: 'approved_at'
    },

    rejectionReason: {
        type: DataTypes.TEXT,
        field: 'rejection_reason'
    },

    // Submission tracking
    submittedAt: {
        type: DataTypes.DATE,
        field: 'submitted_at'
    },

    // Auto-save tracking
    lastAutoSaveAt: {
        type: DataTypes.DATE,
        field: 'last_auto_save_at'
    }
}, {
    tableName: 'quad_chart_submissions',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['user_id']
        },
        {
            fields: ['status']
        },
        {
            fields: ['opportunity_name']
        },
        {
            fields: ['company_name']
        },
        {
            fields: ['created_at']
        },
        {
            fields: ['parent_id']
        }
    ]
});

// History model for tracking all changes
const QuadChartHistory = sequelize.define('QuadChartHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    quadChartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quad_chart_id',
        references: {
            model: 'quad_chart_submissions',
            key: 'id'
        }
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },

    action: {
        type: DataTypes.ENUM('created', 'updated', 'submitted', 'approved', 'rejected', 'auto_saved', 'downloaded', 'archived'),
        allowNull: false
    },

    changes: {
        type: DataTypes.JSON,
        defaultValue: {}
    },

    previousData: {
        type: DataTypes.JSON,
        field: 'previous_data'
    },

    newData: {
        type: DataTypes.JSON,
        field: 'new_data'
    },

    versionNumber: {
        type: DataTypes.INTEGER,
        field: 'version_number'
    },

    notes: {
        type: DataTypes.TEXT
    },

    ipAddress: {
        type: DataTypes.STRING,
        field: 'ip_address'
    },

    userAgent: {
        type: DataTypes.TEXT,
        field: 'user_agent'
    }
}, {
    tableName: 'quad_chart_history',
    timestamps: true,
    underscored: true,
    updatedAt: false,
    indexes: [
        {
            fields: ['quad_chart_id']
        },
        {
            fields: ['user_id']
        },
        {
            fields: ['action']
        },
        {
            fields: ['created_at']
        }
    ]
});

// Comments model for review process
const QuadChartComment = sequelize.define('QuadChartComment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    quadChartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quad_chart_id',
        references: {
            model: 'quad_chart_submissions',
            key: 'id'
        }
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id'
        }
    },

    parentCommentId: {
        type: DataTypes.INTEGER,
        field: 'parent_comment_id',
        references: {
            model: 'quad_chart_comments',
            key: 'id'
        }
    },

    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    quadrant: {
        type: DataTypes.ENUM('technical', 'management', 'past_performance', 'cost_schedule', 'general'),
        defaultValue: 'general'
    },

    isResolved: {
        type: DataTypes.BOOLEAN,
        field: 'is_resolved',
        defaultValue: false
    },

    resolvedBy: {
        type: DataTypes.INTEGER,
        field: 'resolved_by',
        references: {
            model: 'users',
            key: 'id'
        }
    },

    resolvedAt: {
        type: DataTypes.DATE,
        field: 'resolved_at'
    }
}, {
    tableName: 'quad_chart_comments',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['quad_chart_id']
        },
        {
            fields: ['user_id']
        },
        {
            fields: ['parent_comment_id']
        }
    ]
});

// Define associations
QuadChartSubmission.associate = (models) => {
    // User associations
    QuadChartSubmission.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'creator'
    });

    QuadChartSubmission.belongsTo(models.User, {
        foreignKey: 'approvedBy',
        as: 'approver'
    });

    // Self-referencing for versions
    QuadChartSubmission.belongsTo(QuadChartSubmission, {
        foreignKey: 'parentId',
        as: 'parent'
    });

    QuadChartSubmission.hasMany(QuadChartSubmission, {
        foreignKey: 'parentId',
        as: 'versions'
    });

    // History association
    QuadChartSubmission.hasMany(QuadChartHistory, {
        foreignKey: 'quadChartId',
        as: 'history'
    });

    // Comments association
    QuadChartSubmission.hasMany(QuadChartComment, {
        foreignKey: 'quadChartId',
        as: 'comments'
    });
};

QuadChartHistory.associate = (models) => {
    QuadChartHistory.belongsTo(models.QuadChartSubmission, {
        foreignKey: 'quadChartId',
        as: 'quadChart'
    });

    QuadChartHistory.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
    });
};

QuadChartComment.associate = (models) => {
    QuadChartComment.belongsTo(models.QuadChartSubmission, {
        foreignKey: 'quadChartId',
        as: 'quadChart'
    });

    QuadChartComment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
    });

    QuadChartComment.belongsTo(models.User, {
        foreignKey: 'resolvedBy',
        as: 'resolver'
    });

    // Self-referencing for nested comments
    QuadChartComment.belongsTo(QuadChartComment, {
        foreignKey: 'parentCommentId',
        as: 'parent'
    });

    QuadChartComment.hasMany(QuadChartComment, {
        foreignKey: 'parentCommentId',
        as: 'replies'
    });
};

// Instance methods
QuadChartSubmission.prototype.createVersion = async function(userId) {
    const newVersion = await QuadChartSubmission.create({
        ...this.toJSON(),
        id: undefined,
        parentId: this.parentId || this.id,
        versionNumber: this.versionNumber + 1,
        status: 'draft',
        createdAt: undefined,
        updatedAt: undefined
    });

    // Record in history
    await QuadChartHistory.create({
        quadChartId: newVersion.id,
        userId: userId,
        action: 'created',
        versionNumber: newVersion.versionNumber,
        notes: `Created version ${newVersion.versionNumber} from version ${this.versionNumber}`
    });

    return newVersion;
};

QuadChartSubmission.prototype.recordChange = async function(userId, action, changes = {}, notes = '') {
    return await QuadChartHistory.create({
        quadChartId: this.id,
        userId: userId,
        action: action,
        changes: changes,
        versionNumber: this.versionNumber,
        notes: notes
    });
};

module.exports = {
    QuadChartSubmission,
    QuadChartHistory,
    QuadChartComment
};