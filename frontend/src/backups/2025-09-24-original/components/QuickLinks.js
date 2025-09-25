import React from 'react';

const QuickLinks = ({ onNavigate }) => {
  const links = [
    { id: 'capture', label: 'Capture Dashboard', color: '#007bff' },
    { id: 'quadchart', label: 'Quad Charts', color: '#28a745' },
    { id: 'checklist', label: 'Gate Checklist', color: '#ffc107' },
    { id: 'meetings', label: 'Meeting Tracker', color: '#17a2b8' }
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Quick Access</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            style={{
              padding: '15px',
              backgroundColor: link.color,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
