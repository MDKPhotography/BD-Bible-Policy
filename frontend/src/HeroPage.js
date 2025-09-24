import React, { useState, useEffect } from 'react';
import GMULogo from './GMULogo';

const HeroPage = ({ documents, setView, loadDocument }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f8f9fa 0%, #dee2e6 100%)',
      padding: '40px',
      position: 'relative'
    }}>
      {/* Hero Header with Patriot Labs Logo */}
      <div style={{
        background: 'linear-gradient(135deg, white 0%, #f8f9fa 100%)',
        borderRadius: '20px',
        padding: '80px 60px',
        boxShadow: `
          0 30px 60px rgba(0,0,0,0.12),
          0 15px 30px rgba(0,0,0,0.08),
          0 5px 15px rgba(0,0,0,0.04)
        `,
        textAlign: 'center',
        marginBottom: '50px',
        position: 'relative',
        transform: animate ? 'translateY(0)' : 'translateY(-20px)',
        opacity: animate ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, #006633 0%, #FFCC33 50%, #006633 100%)',
          borderRadius: '20px 20px 0 0'
        }} />

        {/* Logo Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <img 
            src="/images/Patriot Labs Green and Gold.svg" 
            alt="Patriot Labs"
            style={{ 
              height: '120px',
              filter: 'drop-shadow(0 10px 20px rgba(0,102,51,0.15))'
            }}
          />
          <GMULogo size="large" />
        </div>
        
        <h1 style={{
          fontSize: '4rem',
          background: 'linear-gradient(135deg, #006633 0%, #00563F 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '20px',
          fontWeight: '900',
          letterSpacing: '-0.02em',
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
        }}>
          BUSINESS DEVELOPMENT
        </h1>
        
        <div style={{
          fontSize: '3rem',
          color: '#FFCC33',
          fontWeight: '900',
          letterSpacing: '0.15em',
          marginBottom: '30px',
          textShadow: '3px 3px 6px rgba(0,0,0,0.1)',
          textTransform: 'uppercase'
        }}>
          BIBLE
        </div>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#495057',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <span style={{ color: '#006633' }}>●</span>
          George Mason University • Patriot Labs
          <span style={{ color: '#FFCC33' }}>●</span>
        </p>
      </div>

      {/* Stats Grid remains the same */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '35px',
        marginBottom: '50px'
      }}>
        {[
          { label: 'Pipeline', value: '$284.6M', color: '#006633', gradient: 'linear-gradient(135deg, #006633 0%, #008850 100%)' },
          { label: 'Opportunities', value: '140', color: '#00563F', gradient: 'linear-gradient(135deg, #00563F 0%, #006633 100%)' },
          { label: 'Win Rate', value: '72%', color: '#FFCC33', gradient: 'linear-gradient(135deg, #FFCC33 0%, #FFB81C 100%)' },
          { label: 'Documents', value: documents.length, color: '#FFB81C', gradient: 'linear-gradient(135deg, #FFB81C 0%, #FFD960 100%)' }
        ].map((stat, index) => (
          <div 
            key={stat.label} 
            style={{
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.1),
                0 10px 20px rgba(0,0,0,0.06)
              `,
              transform: animate ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              opacity: animate ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.boxShadow = `
                0 30px 60px rgba(0,0,0,0.15),
                0 15px 30px rgba(0,0,0,0.1)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = `
                0 20px 40px rgba(0,0,0,0.1),
                0 10px 20px rgba(0,0,0,0.06)
              `;
            }}
          >
            <div style={{ background: stat.gradient, height: '6px' }} />
            <div style={{ padding: '35px', textAlign: 'center' }}>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                background: stat.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '15px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.95rem',
                color: '#6c757d',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '700'
              }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '50px',
        boxShadow: `
          0 25px 50px rgba(0,0,0,0.1),
          0 12px 25px rgba(0,0,0,0.06)
        `,
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#006633', marginBottom: '35px', fontSize: '2rem' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
          <button 
            onClick={() => setView('dashboard')}
            style={{
              padding: '18px 45px',
              background: 'linear-gradient(135deg, #006633 0%, #00563F 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 10px 20px rgba(0,102,51,0.3)',
              transition: 'all 0.3s'
            }}
          >
            View Dashboard
          </button>
          <button 
            onClick={() => documents[0] && loadDocument(documents[0])}
            style={{
              padding: '18px 45px',
              background: 'linear-gradient(135deg, #FFCC33 0%, #FFB81C 100%)',
              color: '#006633',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 10px 20px rgba(255,204,51,0.3)',
              transition: 'all 0.3s'
            }}
          >
            Browse Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
