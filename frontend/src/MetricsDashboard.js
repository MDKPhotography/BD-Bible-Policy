import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MetricsDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('pipeline');

  const pipelineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Pipeline Value ($M)',
      data: [180, 195, 220, 245, 265, 285, 310, 340, 365, 390, 420, 450],
      borderColor: '#006633',
      backgroundColor: 'rgba(0, 102, 51, 0.1)',
      tension: 0.4
    }]
  };

  const winRateData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Win Rate %',
      data: [28, 32, 35, 42],
      backgroundColor: '#FFCC33',
      borderColor: '#FFB81C',
      borderWidth: 2
    }]
  };

  const gateDistribution = {
    labels: ['Gate 0', 'Gate 1', 'Gate 2', 'Gate 3', 'Gate 4'],
    datasets: [{
      data: [45, 38, 27, 18, 12],
      backgroundColor: ['#006633', '#00563F', '#008850', '#FFCC33', '#FFB81C']
    }]
  };

  return (
    <div style={{
      padding: '40px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{
        color: '#006633',
        marginBottom: '40px',
        fontSize: '2.5rem',
        fontWeight: '800'
      }}>
        BD Analytics Dashboard
      </h1>

      {/* Metric Selector */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {['Pipeline', 'Win Rate', 'Gate Distribution'].map(metric => (
          <button
            key={metric}
            onClick={() => setSelectedMetric(metric.toLowerCase().replace(' ', ''))}
            style={{
              padding: '10px 20px',
              background: selectedMetric === metric.toLowerCase().replace(' ', '') ? '#006633' : 'white',
              color: selectedMetric === metric.toLowerCase().replace(' ', '') ? 'white' : '#006633',
              border: '2px solid #006633',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
          >
            {metric}
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#006633', marginBottom: '20px' }}>Pipeline Trend</h3>
          <Line data={pipelineData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#006633', marginBottom: '20px' }}>Win Rate by Quarter</h3>
          <Bar data={winRateData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#006633', marginBottom: '20px' }}>Opportunity Distribution</h3>
          <Doughnut data={gateDistribution} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
