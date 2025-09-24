import React, { useState, useEffect } from 'react';

const PresentationMode = ({ content, onExit }) => {
  const [fontSize, setFontSize] = useState(24);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onExit();
      if (e.key === '+') setFontSize(prev => Math.min(prev + 2, 48));
      if (e.key === '-') setFontSize(prev => Math.max(prev - 2, 16));
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onExit]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'white',
      zIndex: 9999,
      overflow: 'auto',
      padding: '40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <button
          onClick={onExit}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            background: '#006633',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 10000
          }}
        >
          Exit Presentation (ESC)
        </button>
        
        <div style={{
          fontSize: `${fontSize}px`,
          lineHeight: '1.8',
          color: '#333',
          whiteSpace: 'pre-wrap',
          paddingTop: '40px'
        }}>
          {content}
        </div>
        
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          Use +/- to adjust font size
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
