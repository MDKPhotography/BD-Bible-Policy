import React from 'react';
import Plot from 'react-plotly.js';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample BD metrics data
  const pipelineData = [
    { month: 'Jan', value: 45, wins: 12 },
    { month: 'Feb', value: 52, wins: 15 },
    { month: 'Mar', value: 48, wins: 13 },
    { month: 'Apr', value: 61, wins: 18 },
    { month: 'May', value: 67, wins: 22 },
    { month: 'Jun', value: 73, wins: 25 }
  ];

  const winRateData = {
    x: ['Q1', 'Q2', 'Q3', 'Q4'],
    y: [28, 32, 35, 38],
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: '#003f7f'},
    name: 'Win Rate %'
  };

  const gateData = [
    { name: 'Gate 0', opportunities: 45, value: 284.6 },
    { name: 'Gate 1', opportunities: 38, value: 220.5 },
    { name: 'Gate 2', opportunities: 25, value: 180.3 },
    { name: 'Gate 3', opportunities: 18, value: 120.7 },
    { name: 'Gate 4', opportunities: 12, value: 85.2 }
  ];

  const COLORS = ['#003f7f', '#0066cc', '#3399ff', '#66b3ff', '#99ccff'];

  return (
    <div style={{ padding: '20px' }}>
      <h2>BD Metrics Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        
        {/* Plotly Win Rate Trend */}
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Win Rate Trend</h3>
          <Plot
            data={[winRateData]}
            layout={{
              width: 500,
              height: 300,
              title: '',
              xaxis: { title: 'Quarter' },
              yaxis: { title: 'Win Rate (%)' }
            }}
          />
        </div>

        {/* Recharts Pipeline Progress */}
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Pipeline Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#003f7f" name="Pipeline ($M)" />
              <Line type="monotone" dataKey="wins" stroke="#00cc66" name="Wins" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gate Funnel */}
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Gate Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="opportunities" fill="#003f7f" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Opportunity Distribution */}
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Value by Gate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: $${entry.value}M`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {gateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
