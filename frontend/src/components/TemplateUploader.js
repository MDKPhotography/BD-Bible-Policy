import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const TemplateUploader = () => {
  const [templates, setTemplates] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [templateInfo, setTemplateInfo] = useState({
    name: '',
    description: '',
    client: '',
    category: 'Quad Chart'
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [mappingMode, setMappingMode] = useState(false);
  const [testData, setTestData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Get auth headers
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  // Fetch templates
  const fetchTemplates = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/templates', {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load templates');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.pptx')) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid PPTX file');
      setSelectedFile(null);
    }
  };

  // Upload template
  const handleUpload = async () => {
    if (!selectedFile || !templateInfo.name) {
      setError('Please select a file and provide a name');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('template', selectedFile);
    formData.append('name', templateInfo.name);
    formData.append('description', templateInfo.description);
    formData.append('client', templateInfo.client);
    formData.append('category', templateInfo.category);

    try {
      const response = await fetch('http://localhost:5001/api/templates/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Template "${templateInfo.name}" uploaded successfully!`);
        setSelectedFile(null);
        setTemplateInfo({ name: '', description: '', client: '', category: 'Quad Chart' });
        fetchTemplates();

        // Clear file input
        document.getElementById('template-file-input').value = '';
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Failed to upload template');
    } finally {
      setUploading(false);
    }
  };

  // View template details
  const viewTemplate = async (templateId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/templates/${templateId}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setSelectedTemplate(data.template);
        setMappingMode(false);
      }
    } catch (err) {
      setError('Failed to load template details');
    }
  };

  // Update mappings
  const updateMappings = async (templateId, mappings) => {
    try {
      const response = await fetch(`http://localhost:5001/api/templates/${templateId}/mappings`, {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mappings })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Mappings updated successfully');
        fetchTemplates();
      }
    } catch (err) {
      setError('Failed to update mappings');
    }
  };

  // Test template with sample data
  const testTemplate = async (templateId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/templates/${templateId}/test`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
      });

      const data = await response.json();
      if (data.success && data.url) {
        window.open(`http://localhost:5001${data.url}`, '_blank');
      }
    } catch (err) {
      setError('Failed to test template');
    }
  };

  // Delete template
  const deleteTemplate = async (templateId) => {
    if (!window.confirm('Are you sure you want to delete this template?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/templates/${templateId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Template deleted successfully');
        setSelectedTemplate(null);
        fetchTemplates();
      }
    } catch (err) {
      setError('Failed to delete template');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#006633' }}>
            PowerPoint Template Manager
          </h1>
          <p className="text-gray-600">
            Upload and manage your PowerPoint templates with placeholder replacement
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between">
            {error}
            <button onClick={() => setError(null)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between">
            {success}
            <button onClick={() => setSuccess(null)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#006633' }}>
            Upload New Template
          </h2>

          <div className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Template File (.pptx)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  id="template-file-input"
                  type="file"
                  accept=".pptx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor="template-file-input"
                  className="cursor-pointer px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <ArrowUpTrayIcon className="h-5 w-5" />
                    <span>{selectedFile ? selectedFile.name : 'Choose File'}</span>
                  </div>
                </label>
                {selectedFile && (
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                )}
              </div>
            </div>

            {/* Template Info */}
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={templateInfo.name}
                    onChange={(e) => setTemplateInfo({ ...templateInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="e.g., DoD Quad Chart Template"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Client
                  </label>
                  <input
                    type="text"
                    value={templateInfo.client}
                    onChange={(e) => setTemplateInfo({ ...templateInfo, client: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="e.g., Department of Defense"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={templateInfo.category}
                    onChange={(e) => setTemplateInfo({ ...templateInfo, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  >
                    <option value="Quad Chart">Quad Chart</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Report">Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={templateInfo.description}
                    onChange={(e) => setTemplateInfo({ ...templateInfo, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="Brief description"
                  />
                </div>
              </motion.div>
            )}

            {/* Upload Button */}
            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={uploading || !templateInfo.name}
                className="px-6 py-2 rounded-lg text-white font-semibold disabled:opacity-50"
                style={{ backgroundColor: '#006633' }}
              >
                {uploading ? 'Uploading...' : 'Upload Template'}
              </button>
            )}
          </div>
        </div>

        {/* Placeholder Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <InformationCircleIcon className="h-6 w-6 text-blue-500 mt-1 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                How to Use Placeholders
              </h3>
              <p className="text-sm text-blue-700 mb-2">
                In your PowerPoint template, use double curly braces to mark replacement zones:
              </p>
              <div className="bg-white rounded p-3 font-mono text-sm">
                <div>{'{{CLIENT_NAME}}'} - Client name</div>
                <div>{'{{TECHNICAL_APPROACH}}'} - Technical approach section</div>
                <div>{'{{MANAGEMENT_APPROACH}}'} - Management approach section</div>
                <div>{'{{PAST_PERFORMANCE}}'} - Past performance section</div>
                <div>{'{{COST_SCHEDULE}}'} - Cost and schedule section</div>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                The system will automatically detect and replace these placeholders with your data.
              </p>
            </div>
          </div>
        </div>

        {/* Templates List */}
        {loading ? (
          <div className="text-center py-12">Loading templates...</div>
        ) : templates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <DocumentTextIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No Templates Yet</h3>
            <p className="text-gray-600">
              Upload your first PowerPoint template to get started
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#006633' }}>
              Available Templates
            </h2>
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {template.description}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Client: {template.client}</span>
                        <span>Category: {template.category}</span>
                        <span>Slides: {template.slideCount}</span>
                        <span>
                          Placeholders: {template.placeholders?.length || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewTemplate(template.id)}
                        className="p-2 text-gray-600 hover:text-blue-600"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => testTemplate(template.id)}
                        className="p-2 text-gray-600 hover:text-green-600"
                        title="Test Template"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="p-2 text-gray-600 hover:text-red-600"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Placeholder List */}
                  {template.placeholders && template.placeholders.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Detected Placeholders:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {template.placeholders.map((ph, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 rounded text-xs font-mono"
                            >
                              {`{{${ph.placeholder}}}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Template Details Modal */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold" style={{ color: '#006633' }}>
                  {selectedTemplate.name}
                </h2>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Template Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Client:</span> {selectedTemplate.client}
                    </div>
                    <div>
                      <span className="text-gray-600">Category:</span> {selectedTemplate.category}
                    </div>
                    <div>
                      <span className="text-gray-600">Slides:</span> {selectedTemplate.slideCount}
                    </div>
                    <div>
                      <span className="text-gray-600">Version:</span> {selectedTemplate.version}
                    </div>
                  </div>
                </div>

                {/* Placeholder Mappings */}
                <div>
                  <h3 className="font-semibold mb-2">Placeholder Mappings</h3>
                  <div className="space-y-2">
                    {selectedTemplate.placeholders?.map((ph, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                        <span className="font-mono text-sm w-1/3">
                          {`{{${ph.placeholder}}}`}
                        </span>
                        <span className="text-gray-500">→</span>
                        <span className="text-sm">
                          Maps to: {selectedTemplate.mappings?.[ph.placeholder]?.field || 'Not mapped'}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({selectedTemplate.mappings?.[ph.placeholder]?.type || 'text'})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Test Data Section */}
                <div>
                  <h3 className="font-semibold mb-2">Test Template</h3>
                  <div className="space-y-3">
                    {selectedTemplate.placeholders?.map((ph, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium mb-1">
                          {ph.placeholder}
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          rows="2"
                          placeholder={`Enter test data for ${ph.placeholder}`}
                          onChange={(e) => setTestData({
                            ...testData,
                            [selectedTemplate.mappings?.[ph.placeholder]?.field || ph.placeholder]: e.target.value
                          })}
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => testTemplate(selectedTemplate.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Generate Test Document
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TemplateUploader;