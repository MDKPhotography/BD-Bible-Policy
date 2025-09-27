import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { format, parseISO } from 'date-fns';
import axios from 'axios';

const QuadCharts = ({ onNavigate }) => {
  // Use hash-based navigation instead of React Router
  const navigate = (path) => {
    if (onNavigate) {
      // Extract the view name from the path
      const viewMap = {
        '/quad-chart/new': 'quadchart-new',
        '/quad-chart/edit/': 'quadchart-edit',
        '/quad-chart/view/': 'quadchart-view'
      };

      // For now, just change the hash
      window.location.hash = path.replace('/', '');
    } else {
      // Fallback to hash navigation
      window.location.hash = path.replace('/', '');
    }
  };

  // State management
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedCharts, setSelectedCharts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [statistics, setStatistics] = useState({
    total: 0,
    draft: 0,
    submitted: 0,
    approved: 0
  });

  // Get auth headers
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  // Fetch user's quad charts
  const fetchCharts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/quad-charts/my-charts', {
        headers: getAuthHeaders(),
        params: {
          search: searchTerm,
          status: statusFilter === 'all' ? undefined : statusFilter
        }
      });

      setCharts(response.data.charts || []);

      // Calculate statistics
      const stats = {
        total: response.data.total || 0,
        draft: 0,
        submitted: 0,
        approved: 0
      };

      response.data.charts.forEach(chart => {
        if (chart.status === 'draft') stats.draft++;
        else if (chart.status === 'submitted') stats.submitted++;
        else if (chart.status === 'approved') stats.approved++;
      });

      setStatistics(stats);
    } catch (err) {
      setError('Failed to load quad charts');
      console.error('Error fetching charts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharts();
  }, [searchTerm, statusFilter]);

  // Create new quad chart
  const handleCreateNew = () => {
    navigate('/quad-chart/new');
  };

  // Edit quad chart
  const handleEdit = (chartId) => {
    navigate(`/quad-chart/edit/${chartId}`);
  };

  // Download PowerPoint
  const handleDownload = async (chartId, chartName) => {
    try {
      const response = await axios.get(
        `/api/quad-charts/${chartId}/download`,
        {
          headers: getAuthHeaders(),
          responseType: 'blob'
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${chartName || 'quad-chart'}.pptx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download PowerPoint');
    }
  };

  // Delete quad chart
  const handleDelete = async (chartId) => {
    if (!window.confirm('Are you sure you want to delete this quad chart?')) {
      return;
    }

    try {
      await axios.delete(`/api/quad-charts/${chartId}`, {
        headers: getAuthHeaders()
      });
      fetchCharts();
    } catch (err) {
      setError('Failed to delete quad chart');
    }
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'draft':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <PencilSquareIcon className="h-4 w-4" />,
          label: 'Draft'
        };
      case 'submitted':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <ClockIcon className="h-4 w-4" />,
          label: 'Submitted'
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircleIcon className="h-4 w-4" />,
          label: 'Approved'
        };
      case 'in_review':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <EyeIcon className="h-4 w-4" />,
          label: 'In Review'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: null,
          label: status
        };
    }
  };

  // Chart card component
  const ChartCard = ({ chart }) => {
    const statusInfo = getStatusInfo(chart.status);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {chart.opportunityName}
              </h3>
              <p className="text-sm text-gray-600">
                {chart.companyName} {chart.clientName && `• ${chart.clientName}`}
              </p>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
              {statusInfo.icon}
              {statusInfo.label}
            </div>
          </div>

          {/* Template info */}
          <div className="mb-4 pb-4 border-b">
            <p className="text-sm text-gray-500">
              Template: {chart.templateName?.replace('.pptx', '').replace(/-/g, ' ')}
            </p>
            <p className="text-sm text-gray-500">
              Version {chart.versionNumber} • {chart.updatedAt ? format(parseISO(chart.updatedAt), 'MMM d, yyyy') : 'Draft'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {chart.status === 'draft' && (
                <button
                  onClick={() => handleEdit(chart.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Edit"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => navigate(`/quad-chart/view/${chart.id}`)}
                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                title="View"
              >
                <EyeIcon className="h-5 w-5" />
              </button>
              {chart.status === 'draft' && (
                <button
                  onClick={() => handleDelete(chart.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => handleDownload(chart.id, chart.opportunityName)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quad Charts
              </h1>
              <p className="text-gray-600 mt-1">
                Create and manage business development quad charts
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <PlusIcon className="h-5 w-5" />
              Create New Quad Chart
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Charts</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600">Drafts</p>
              <p className="text-2xl font-bold text-blue-900">{statistics.draft}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-yellow-600">Submitted</p>
              <p className="text-2xl font-bold text-yellow-900">{statistics.submitted}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600">Approved</p>
              <p className="text-2xl font-bold text-green-900">{statistics.approved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search quad charts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'grid' ? 'bg-white shadow' : ''
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'list' ? 'bg-white shadow' : ''
                }`}
              >
                List
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchCharts}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Refresh"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : charts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <DocumentTextIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No matching quad charts found' : 'No quad charts yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first quad chart to get started'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <PlusIcon className="h-5 w-5" />
                Create Your First Quad Chart
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {charts.map((chart) => (
                <ChartCard key={chart.id} chart={chart} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default QuadCharts;