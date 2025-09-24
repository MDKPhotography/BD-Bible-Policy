import React, { useState } from 'react';

const RPRCCaptureDashboard = () => {
  const [activeGate, setActiveGate] = useState('all');
  
  const opportunities = [
    {
      id: 1,
      name: "DISA Cyber Security Support",
      agency: "Defense Information Systems Agency",
      currentGate: 2,
      contractValue: "$45M",
      rfpDate: "2024-03-15",
      opportunityManager: "John Smith",
      winProbability: 65
    },
    {
      id: 2,
      name: "Navy SPAWAR Engineering",
      agency: "Naval Information Warfare Systems",
      currentGate: 3,
      contractValue: "$120M",
      rfpDate: "2024-02-01",
      opportunityManager: "Sarah Johnson",
      winProbability: 78
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
        RPRC Capture Management Dashboard
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Business Development & Capture Process Tracking
      </p>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Active Opportunities</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Opportunity</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Agency</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Gate</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Value</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Win %</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>RFP Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Manager</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map(opp => (
              <tr key={opp.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{opp.name}</td>
                <td style={{ padding: '12px' }}>{opp.agency}</td>
                <td style={{ padding: '12px' }}>Gate {opp.currentGate}</td>
                <td style={{ padding: '12px' }}>{opp.contractValue}</td>
                <td style={{ padding: '12px' }}>{opp.winProbability}%</td>
                <td style={{ padding: '12px' }}>{opp.rfpDate}</td>
                <td style={{ padding: '12px' }}>{opp.opportunityManager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RPRCCaptureDashboard;
