import React from 'react';

const StatsCard = ({ label, value, color, gradient }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ fontSize: '28px', margin: '0 0 8px 0' }}>{value || 0}</h3>
      <p style={{ color: '#666', margin: 0 }}>{label}</p>
    </div>
  );
};

export default StatsCard;
