import React from 'react';
import StatsCard from './components/StatsCard';
import HeroHeader from './components/HeroHeader';
import QuickLinks from './components/QuickLinks';

const HeroPageSimple = ({ documents = [], onNavigate }) => {
  const stats = [
    { 
      label: 'Pipeline', 
      value: '$284.6M', 
      color: '#006633',
      gradient: 'linear-gradient(135deg, #006633 0%, #008850 100%)'
    },
    { 
      label: 'Opportunities', 
      value: '140', 
      color: '#00563F',
      gradient: 'linear-gradient(135deg, #00563F 0%, #006633 100%)'
    },
    { 
      label: 'Win Rate', 
      value: '72%', 
      color: '#FFCC33',
      gradient: 'linear-gradient(135deg, #FFCC33 0%, #FFB81C 100%)'
    },
    { 
      label: 'Documents', 
      value: documents?.length || 0, 
      color: '#FFB81C',
      gradient: 'linear-gradient(135deg, #FFB81C 0%, #FFD960 100%)'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <HeroHeader />
      
      <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Statistics Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Links */}
        {onNavigate && <QuickLinks onNavigate={onNavigate} />}
      </div>
    </div>
  );
};

export default HeroPageSimple;
