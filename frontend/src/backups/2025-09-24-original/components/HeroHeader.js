import React from 'react';

const HeroHeader = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #006633 0%, #FFCC33 100%)',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center',
      marginBottom: '30px'
    }}>
      <h1 style={{ fontSize: '36px', margin: 0 }}>RPRC Business Development System</h1>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>Integrated Capture & Proposal Management</p>
    </div>
  );
};

export default HeroHeader;
