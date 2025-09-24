import React, { useState } from 'react';

const RoleComparison = () => {
  const [activeRole, setActiveRole] = useState('capture');

  const roles = {
    capture: {
      title: 'Capture Manager',
      timeline: '6-18 months before RFP',
      focus: 'Relationship building & intelligence',
      color: '#006633',
      responsibilities: [
        'Customer Engagement',
        'Intelligence Gathering', 
        'Strategy Development',
        'Team Building'
      ]
    },
    proposal: {
      title: 'Proposal Manager',
      timeline: 'RFP release through submission',
      focus: 'Proposal development & compliance',
      color: '#FFCC33',
      responsibilities: [
        'Proposal Planning',
        'Content Development',
        'Compliance & Quality',
        'Production & Submission'
      ]
    }
  };

  return (
    <div style={{ padding: '40px', background: '#f8f9fa' }}>
      <h2 style={{ color: '#006633', marginBottom: '30px' }}>
        Role Separation Guide
      </h2>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.entries(roles).map(([key, role]) => (
          <div
            key={key}
            onClick={() => setActiveRole(key)}
            style={{
              flex: 1,
              padding: '30px',
              background: 'white',
              borderTop: `5px solid ${role.color}`,
              borderRadius: '10px',
              cursor: 'pointer',
              opacity: activeRole === key ? 1 : 0.7,
              transform: activeRole === key ? 'scale(1.02)' : 'scale(1)',
              boxShadow: activeRole === key ? 
                '0 10px 30px rgba(0,0,0,0.15)' : 
                '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
          >
            <h3 style={{ color: role.color }}>{role.title}</h3>
            <p><strong>Timeline:</strong> {role.timeline}</p>
            <p><strong>Focus:</strong> {role.focus}</p>
            <ul>
              {role.responsibilities.map(resp => (
                <li key={resp}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleComparison;
