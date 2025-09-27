import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Container, Grid, Paper, Typography, Button, TextField,
    Box, Card, CardMedia, CardContent, CardActionArea,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert, IconButton, Chip, LinearProgress,
    Tabs, Tab, Divider, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import {
    Save as SaveIcon,
    CloudDownload as DownloadIcon,
    Preview as PreviewIcon,
    Send as SubmitIcon,
    ArrowBack as BackIcon,
    Edit as EditIcon,
    CheckCircle as CheckIcon,
    AutorenewIcon as AutoSaveIcon
} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const QuadChartEditor = ({ onNavigate }) => {
    // Get ID from hash or props
    const hash = window.location.hash.replace('#', '');
    const id = hash.includes('edit/') ? hash.split('edit/')[1] : null;

    // Navigation function
    const navigate = (path) => {
        window.location.hash = path.replace('/', '');
    };

    const autoSaveTimer = useRef(null);

    // State management
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showTemplateSelector, setShowTemplateSelector] = useState(!id);
    const [activeTab, setActiveTab] = useState(0);
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [lastSaved, setLastSaved] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // Form data state
    const [formData, setFormData] = useState({
        opportunityName: '',
        companyName: '',
        clientName: '',
        submissionDate: new Date().toISOString().split('T')[0],
        contractValue: '',
        rfpDate: '',
        awardDate: '',
        technicalPoc: '',
        email: '',
        phone: '',
        status: 'draft',

        // Quadrant data
        technicalData: {
            title: 'Technical Approach',
            content: '',
            keyPoints: []
        },
        managementData: {
            title: 'Management Approach',
            content: '',
            keyPoints: []
        },
        pastPerformanceData: {
            title: 'Past Performance',
            content: '',
            projects: []
        },
        costScheduleData: {
            title: 'Cost/Schedule',
            content: '',
            milestones: []
        },

        // Additional sections from template
        majorMilestones: '',
        customerMeeting: '',
        risks: ''
    });

    // Load templates on component mount
    useEffect(() => {
        loadTemplates();
        if (id) {
            loadQuadChart(id);
        }
    }, [id]);

    // Auto-save functionality
    useEffect(() => {
        if (autoSaveEnabled && selectedTemplate && !showTemplateSelector) {
            autoSaveTimer.current = setTimeout(() => {
                handleAutoSave();
            }, 30000); // Auto-save every 30 seconds

            return () => {
                if (autoSaveTimer.current) {
                    clearTimeout(autoSaveTimer.current);
                }
            };
        }
    }, [formData, autoSaveEnabled, selectedTemplate]);

    // Load available templates
    const loadTemplates = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/quad-charts/templates');
            setTemplates(response.data);
        } catch (error) {
            showSnackbar('Failed to load templates', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Load existing quad chart
    const loadQuadChart = async (chartId) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/quad-charts/${chartId}`);
            setFormData(response.data.data);
            setSelectedTemplate(response.data.templateName);
            setShowTemplateSelector(false);
        } catch (error) {
            showSnackbar('Failed to load quad chart', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle template selection
    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setShowTemplateSelector(false);

        // Create new quad chart with selected template
        if (!id) {
            createNewQuadChart(template);
        }
    };

    // Create new quad chart
    const createNewQuadChart = async (template) => {
        try {
            const response = await axios.post('/api/quad-charts/create', {
                templateName: template.filename,
                ...formData
            });

            // Navigate to edit URL with new ID
            navigate(`/quad-chart/edit/${response.data.id}`, { replace: true });
            showSnackbar('Quad chart created', 'success');
        } catch (error) {
            showSnackbar('Failed to create quad chart', 'error');
        }
    };

    // Handle form field changes
    const handleFieldChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle quadrant data changes
    const handleQuadrantChange = (quadrant, field, value) => {
        setFormData(prev => ({
            ...prev,
            [quadrant]: {
                ...prev[quadrant],
                [field]: value
            }
        }));
    };

    // Auto-save function
    const handleAutoSave = async () => {
        if (!id) return;

        try {
            setSaving(true);
            await axios.put(`/api/quad-charts/${id}/save`, formData);
            setLastSaved(new Date());
        } catch (error) {
            console.error('Auto-save failed:', error);
        } finally {
            setSaving(false);
        }
    };

    // Manual save
    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(`/api/quad-charts/${id}/save`, formData);
            setLastSaved(new Date());
            showSnackbar('Quad chart saved successfully', 'success');
        } catch (error) {
            showSnackbar('Failed to save quad chart', 'error');
        } finally {
            setSaving(false);
        }
    };

    // Submit quad chart
    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axios.post(`/api/quad-charts/${id}/submit`, formData);
            showSnackbar('Quad chart submitted successfully', 'success');
            navigate('/quad-charts');
        } catch (error) {
            showSnackbar('Failed to submit quad chart', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Download PowerPoint
    const handleDownload = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/api/quad-charts/${id}/download`,
                { responseType: 'blob' }
            );

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formData.opportunityName || 'quad-chart'}.pptx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            showSnackbar('PowerPoint downloaded successfully', 'success');
        } catch (error) {
            showSnackbar('Failed to download PowerPoint', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Show snackbar message
    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };

    // Rich text editor modules
    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ]
    };

    // Template selector dialog
    if (showTemplateSelector) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Select a Quad Chart Template
                </Typography>

                <Grid container spacing={3}>
                    {templates.map((template, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea onClick={() => handleTemplateSelect(template)}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={template.preview || '/api/placeholder/400/300'}
                                        alt={template.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {template.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {template.description}
                                        </Typography>
                                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                            {template.slideCount} slides
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate('/quad-charts')}>
                        <BackIcon />
                    </IconButton>
                    <Typography variant="h4">
                        {id ? 'Edit' : 'New'} Quad Chart
                    </Typography>
                    {saving && <CircularProgress size={20} />}
                    {lastSaved && (
                        <Chip
                            icon={<CheckIcon />}
                            label={`Last saved: ${lastSaved.toLocaleTimeString()}`}
                            color="success"
                            size="small"
                        />
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        startIcon={<PreviewIcon />}
                        variant="outlined"
                        onClick={() => setShowPreview(true)}
                    >
                        Preview
                    </Button>
                    <Button
                        startIcon={<SaveIcon />}
                        variant="outlined"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        Save
                    </Button>
                    <Button
                        startIcon={<DownloadIcon />}
                        variant="outlined"
                        onClick={handleDownload}
                        disabled={!id}
                    >
                        Download PPTX
                    </Button>
                    <Button
                        startIcon={<SubmitIcon />}
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!id || formData.status === 'submitted'}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>

            {loading && <LinearProgress />}

            {/* Main content */}
            <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Basic Information
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Opportunity Name"
                                    value={formData.opportunityName}
                                    onChange={(e) => handleFieldChange('opportunityName', e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    value={formData.companyName}
                                    onChange={(e) => handleFieldChange('companyName', e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Client Name"
                                    value={formData.clientName}
                                    onChange={(e) => handleFieldChange('clientName', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Contract Value"
                                    value={formData.contractValue}
                                    onChange={(e) => handleFieldChange('contractValue', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Submission Date"
                                    type="date"
                                    value={formData.submissionDate}
                                    onChange={(e) => handleFieldChange('submissionDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="RFP Date"
                                    type="date"
                                    value={formData.rfpDate}
                                    onChange={(e) => handleFieldChange('rfpDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Award Date"
                                    type="date"
                                    value={formData.awardDate}
                                    onChange={(e) => handleFieldChange('awardDate', e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Technical POC"
                                    value={formData.technicalPoc}
                                    onChange={(e) => handleFieldChange('technicalPoc', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    value={formData.phone}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Quadrant Tabs */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
                            <Tab label="Technical Approach" />
                            <Tab label="Management Approach" />
                            <Tab label="Past Performance" />
                            <Tab label="Cost/Schedule" />
                            <Tab label="Additional Info" />
                        </Tabs>

                        {/* Technical Approach */}
                        {activeTab === 0 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Technical Approach
                                </Typography>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.technicalData.content}
                                    onChange={(value) => handleQuadrantChange('technicalData', 'content', value)}
                                    modules={quillModules}
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
                            </Box>
                        )}

                        {/* Management Approach */}
                        {activeTab === 1 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Management Approach
                                </Typography>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.managementData.content}
                                    onChange={(value) => handleQuadrantChange('managementData', 'content', value)}
                                    modules={quillModules}
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
                            </Box>
                        )}

                        {/* Past Performance */}
                        {activeTab === 2 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Past Performance
                                </Typography>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.pastPerformanceData.content}
                                    onChange={(value) => handleQuadrantChange('pastPerformanceData', 'content', value)}
                                    modules={quillModules}
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
                            </Box>
                        )}

                        {/* Cost/Schedule */}
                        {activeTab === 3 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Cost/Schedule
                                </Typography>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.costScheduleData.content}
                                    onChange={(value) => handleQuadrantChange('costScheduleData', 'content', value)}
                                    modules={quillModules}
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
                            </Box>
                        )}

                        {/* Additional Information */}
                        {activeTab === 4 && (
                            <Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Major Milestones / Capture Progress
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={formData.majorMilestones}
                                            onChange={(e) => handleFieldChange('majorMilestones', e.target.value)}
                                            placeholder="Enter major milestones..."
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Customer Meeting / Teaming Progress
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={formData.customerMeeting}
                                            onChange={(e) => handleFieldChange('customerMeeting', e.target.value)}
                                            placeholder="Enter customer meeting details..."
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Risks, Issues, Challenges, Requests
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={formData.risks}
                                            onChange={(e) => handleFieldChange('risks', e.target.value)}
                                            placeholder="Enter risks and issues..."
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default QuadChartEditor;