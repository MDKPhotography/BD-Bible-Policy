import React, { useState } from 'react';
import './App.css';
import BDBible from './BDBible';
import HeroPage from './HeroPage';
import RPRCCaptureDashboard from './RPRCCaptureDashboard';
import QuadChart from './QuadChart';
import GateChecklist from './GateChecklist';
import ClientMeetingTracker from './ClientMeetingTracker';
import WinThemesBuilder from './WinThemesBuilder';
import ProposalWorkflow from './ProposalWorkflow';

function App() {
  const [view, setView] = useState('home');
  const [documents] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);

  // GMU Official Colors
  const gmuColors = {
    primaryGreen: '#006633',
    primaryGold: '#FFCC33',
    darkGreen: '#00563F',
    secondaryGold: '#FFB81C'
  };

  const handleViewChange = (newView) => {
    console.log('Changing view to:', newView);
    setView(newView);
  };

  const getButtonStyle = (buttonName) => {
    const baseStyle = {
      marginRight: '5px',
      marginBottom: '5px',
      padding: '10px 15px',
      backgroundColor: gmuColors.primaryGold,
      color: gmuColors.primaryGreen,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      position: 'relative'
    };

    // Special style for BD SOP button
    if (buttonName === 'bdbible') {
      return {
        ...baseStyle,
        backgroundColor: view === 'bdbible' ? gmuColors.primaryGreen : gmuColors.darkGreen,
        color: 'white',
        border: `2px solid ${gmuColors.primaryGold}`,
        boxShadow: hoveredButton === 'bdbible' ? `0 0 25px ${gmuColors.primaryGold}` : 'none'
      };
    }

    // Active button style
    if (view === buttonName) {
      return {
        ...baseStyle,
        backgroundColor: gmuColors.secondaryGold,
        outline: `2px solid ${gmuColors.primaryGreen}`,
        boxShadow: `0 0 20px ${gmuColors.secondaryGold}`
      };
    }

    // Hover effect
    if (hoveredButton === buttonName) {
      return {
        ...baseStyle,
        backgroundColor: gmuColors.secondaryGold,
        transform: 'translateY(-2px)',
        boxShadow: `0 0 25px ${gmuColors.primaryGold}, 0 0 40px ${gmuColors.primaryGold}`,
        filter: 'brightness(1.1)'
      };
    }

    return baseStyle;
  };

  const headerStyle = {
    backgroundColor: gmuColors.primaryGreen,
    color: 'white',
    padding: '15px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  const navButtons = [
    { id: 'bdbible', label: 'BD SOP' },
    { id: 'home', label: 'Home' },
    { id: 'capture', label: 'Capture Dashboard' },
    { id: 'quadchart', label: 'Quad Charts' },
    { id: 'checklist', label: 'Gate Checklist' },
    { id: 'meetings', label: 'Meeting Tracker' },
    { id: 'winthemes', label: 'Win Themes' },
    { id: 'proposal', label: 'Proposal Workflow' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={headerStyle}>
        <nav style={{ display: 'flex', flexWrap: 'wrap' }}>
          {navButtons.map(button => (
            <button
              key={button.id}
              onClick={() => handleViewChange(button.id)}
              onMouseEnter={() => setHoveredButton(button.id)}
              onMouseLeave={() => setHoveredButton(null)}
              style={getButtonStyle(button.id)}
            >
              {button.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ padding: '0' }}>
        {view === 'bdbible' && (
          <div style={{ padding: '20px' }}>
            <BDBible />
          </div>
        )}
        {view === 'home' && (
          <div style={{ padding: '20px' }}>
            <HeroPage documents={documents} />
          </div>
        )}
        {view === 'capture' && (
          <div style={{ padding: '20px' }}>
            <RPRCCaptureDashboard />
          </div>
        )}
        {view === 'quadchart' && (
          <div style={{ padding: '20px' }}>
            <QuadChart />
          </div>
        )}
        {view === 'checklist' && (
          <div style={{ padding: '20px' }}>
            <GateChecklist />
          </div>
        )}
        {view === 'meetings' && (
          <div style={{ padding: '20px' }}>
            <ClientMeetingTracker />
          </div>
        )}
        {view === 'winthemes' && (
          <div style={{ padding: '20px' }}>
            <WinThemesBuilder />
          </div>
        )}
        {view === 'proposal' && (
          <div style={{ padding: '20px' }}>
            <ProposalWorkflow />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
