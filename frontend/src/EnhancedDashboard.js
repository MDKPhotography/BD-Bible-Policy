import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';

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

const EnhancedDashboard = () => {
  const [animateNumbers, setAnimateNumbers] = useState(false);

  useEffect(() => {
    setAnimateNumbers(true);
  }, []);

  // Pipeline trend data with gradient
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Pipeline Value ($M)',
      data: [180, 195, 220, 245, 265, 285],
      fill: true,
      backgroundColor: 'rgba(0, 102, 51, 0.1)',
      borderColor: '#006633',
      tension: 0.4,
      pointBackgroundColor: '#FFCC33',
      pointBorderColor: '#006633',
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  };

  // Win rate by quarter
  const barChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Win Rate %',
      data: [28, 32, 35, 42],
      backgroundColor: [
        'rgba(0, 102, 51, 0.8)',
        'rgba(0, 102, 51, 0.7)',
        'rgba(255, 204, 51, 0.8)',
        'rgba(255, 204, 51, 0.9)'
      ],
      borderColor: '#006633',
      borderWidth: 2
    }]
  };

  // Opportunity distribution
  const doughnutData = {
    labels: ['Capture', 'Qualified', 'Proposed', 'Won'],
    datasets: [{
      data: [45, 30, 15, 10],
      backgroundColor: [
        '#006633',
        '#00563F',
        '#FFCC33',
        '#FFB81C'
      ],
      borderColor: '#ffffff',
      borderWidth: 3
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12 },
          padding: 15
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px'
    }}>
      {/* Animated Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        <h1 style={{
          fontSize: '3rem',
          color: '#006633',
          marginBottom: '10px',
          fontWeight: '800'
        }}>
          BD Performance Metrics
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>
          Real-time insights • Q4 2024
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {[
          { label: 'Pipeline Value', value: 284.6, prefix: '$', suffix: 'M', color: '#006633' },
          { label: 'Win Rate', value: 72, suffix: '%', color: '#FFCC33' },
          { label: 'Active Deals', value: 140, color: '#00563F' },
          { label: 'Avg Deal Size', value: 2.03, prefix: '$', suffix: 'M', color: '#FFB81C' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${metric.color}`,
              cursor: 'pointer'
            }}
          >
            <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
              {metric.label}
            </p>
            <h2 style={{
              color: metric.color,
              fontSize: '2.5rem',
              margin: '10px 0',
              fontWeight: 'bold'
            }}>
              {animateNumbers && (
                <>
                  {metric.prefix}
                  <CountUp
                    end={metric.value}
                    duration={2}
                    decimals={metric.prefix === '$' ? 1 : 0}
                  />
                  {metric.suffix}
                </>
              )}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px'
      }}>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            height: '350px'
          }}
        >
          <h3 style={{ color: '#006633', marginBottom: '20px' }}>Pipeline Growth</h3>
          <Line data={lineChartData} options={chartOptions} />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            height: '350px'
          }}
        >
          <h3 style={{ color: '#006633', marginBottom: '20px' }}>Win Rate Trend</h3>
          <Bar data={barChartData} options={chartOptions} />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            height: '350px'
          }}
        >
          <h3 style={{ color: '#006633', marginBottom: '20px' }}>Opportunity Distribution</h3>
          <Doughnut data={doughnutData} options={chartOptions} />
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
