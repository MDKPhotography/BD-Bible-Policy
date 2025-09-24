import React from 'react';

const GMULogo = ({ size = 'large' }) => {
  const sizes = {
    small: { fontSize: '2rem', strokeWidth: 2 },
    medium: { fontSize: '3rem', strokeWidth: 3 },
    large: { fontSize: '4rem', strokeWidth: 4 }
  };

  const config = sizes[size] || sizes.large;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0',
      fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
      fontWeight: '900',
      letterSpacing: '-0.08em'
    }}>
      {/* G with layered effect */}
      <span style={{
        fontSize: config.fontSize,
        position: 'relative',
        lineHeight: 1
      }}>
        <span style={{
          color: '#FFCC33',
          position: 'absolute',
          left: '3px',
          top: '3px',
          zIndex: 0,
          fontWeight: '900'
        }}>G</span>
        <span style={{
          color: '#006633',
          position: 'relative',
          zIndex: 1,
          fontWeight: '900'
        }}>G</span>
      </span>
      
      {/* M with layered effect */}
      <span style={{
        fontSize: config.fontSize,
        position: 'relative',
        lineHeight: 1,
        marginLeft: '-5px'
      }}>
        <span style={{
          color: '#FFCC33',
          position: 'absolute',
          left: '3px',
          top: '3px',
          zIndex: 0,
          fontWeight: '900'
        }}>M</span>
        <span style={{
          color: '#006633',
          position: 'relative',
          zIndex: 1,
          fontWeight: '900'
        }}>M</span>
      </span>
      
      {/* U with layered effect */}
      <span style={{
        fontSize: config.fontSize,
        position: 'relative',
        lineHeight: 1,
        marginLeft: '-5px'
      }}>
        <span style={{
          color: '#FFCC33',
          position: 'absolute',
          left: '3px',
          top: '3px',
          zIndex: 0,
          fontWeight: '900'
        }}>U</span>
        <span style={{
          color: '#006633',
          position: 'relative',
          zIndex: 1,
          fontWeight: '900'
        }}>U</span>
      </span>
    </div>
  );
};

export default GMULogo;
