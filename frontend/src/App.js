import React, { useState, useEffect } from 'react';
import GMULanding from './components/GMULanding';
import BDBibleViewer from './components/BDBibleViewer';
import RPRCCaptureDashboard from './RPRCCaptureDashboard';
import QuadCharts from './QuadCharts';
import GateChecklist from './GateChecklist';
import ClientMeetingTracker from './ClientMeetingTracker';
import WinThemesBuilder from './WinThemesBuilder';
import ProposalWorkflow from './ProposalWorkflow';
import './App.css';

function App() {
  // State to track current view
  const [currentView, setCurrentView] = useState('home');

  // Debug logging
  useEffect(() => {
    console.log('Current view changed to:', currentView);
  }, [currentView]);

  // Handle navigation from URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      console.log('Hash changed to:', hash);

      // Map hash to view names
      const viewMap = {
        '': 'home',
        'home': 'home',
        'bd-sop': 'bdbible',
        'capture-dashboard': 'capture',
        'quad-charts': 'quadchart',
        'gate-checklist': 'checklist',
        'meeting-tracker': 'meetings',
        'win-themes': 'winthemes',
        'proposal-workflow': 'proposal'
      };

      const view = viewMap[hash] || 'home';
      console.log('Setting view to:', view);
      setCurrentView(view);
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle navigation function
  const handleNavigation = (view) => {
    console.log('handleNavigation called with:', view);

    // Map view names to hash values
    const hashMap = {
      'home': '',
      'bdbible': 'bd-sop',
      'capture': 'capture-dashboard',
      'quadchart': 'quad-charts',
      'checklist': 'gate-checklist',
      'meetings': 'meeting-tracker',
      'winthemes': 'win-themes',
      'proposal': 'proposal-workflow'
    };

    const hash = hashMap[view] || '';
    window.location.hash = hash;
    setCurrentView(view);

    console.log('Navigation complete - view:', view, 'hash:', hash);
  };

  // Render the appropriate component based on current view
  const renderView = () => {
    console.log('Rendering view:', currentView);

    switch(currentView) {
      case 'bdbible':
        return <BDBibleViewer onNavigate={handleNavigation} />;

      case 'capture':
        return <RPRCCaptureDashboard onNavigate={handleNavigation} />;

      case 'quadchart':
        return <QuadCharts onNavigate={handleNavigation} />;

      case 'checklist':
        return <GateChecklist onNavigate={handleNavigation} />;

      case 'meetings':
        return <ClientMeetingTracker onNavigate={handleNavigation} />;

      case 'winthemes':
        return <WinThemesBuilder onNavigate={handleNavigation} />;

      case 'proposal':
        return <ProposalWorkflow onNavigate={handleNavigation} />;

      case 'home':
      default:
        return <GMULanding onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar - Always visible */}
      <nav className="fixed top-0 w-full z-50 bg-gmu-green shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Home button */}
            <button
              type="button"
              onClick={() => handleNavigation('home')}
              className="bg-gmu-gold text-gmu-green px-4 py-2 rounded-lg font-bold text-sm hover:bg-gmu-gold-secondary transition-all hover:scale-110"
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              Home
            </button>

            {/* Navigation buttons */}
            <div className="flex space-x-4 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  console.log('BD SOP button clicked');
                  handleNavigation('bdbible');
                }}
                className={`text-white hover:text-gmu-gold transition-all font-medium text-sm ${
                  currentView === 'bdbible' ? 'text-gmu-gold' : ''
                }`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                BD SOP
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log('Capture Dashboard button clicked');
                  handleNavigation('capture');
                }}
                className={`text-white hover:text-gmu-gold transition-all font-medium text-sm ${
                  currentView === 'capture' ? 'text-gmu-gold' : ''
                }`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Capture Dashboard
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log('Quad Charts button clicked');
                  handleNavigation('quadchart');
                }}
                className={`text-white hover:text-gmu-gold transition-all font-medium text-sm ${
                  currentView === 'quadchart' ? 'text-gmu-gold' : ''
                }`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Quad Charts
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log('Gate Checklist button clicked');
                  handleNavigation('checklist');
                }}
                className={`text-white hover:text-gmu-gold transition-all font-medium text-sm ${
                  currentView === 'checklist' ? 'text-gmu-gold' : ''
                }`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Gate Checklist
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log('Meeting Tracker button clicked');
                  handleNavigation('meetings');
                }}
                className={`text-white hover:text-gmu-gold transition-all font-medium text-sm ${
                  currentView === 'meetings' ? 'text-gmu-gold' : ''
                }`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Meeting Tracker
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log('Win Themes button clicked');
                  handleNavigation('winthemes');
                }}
                className={`text-white hover:text-gmu-gold transition-all font-medium text-sm ${
                  currentView === 'winthemes' ? 'text-gmu-gold' : ''
                }`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Win Themes
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log('Proposal Workflow button clicked');
                  handleNavigation('proposal');
                }}
                className={`text-white hover:text-gmu-gold transition-all font-medium text-sm ${
                  currentView === 'proposal' ? 'text-gmu-gold' : ''
                }`}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
              >
                Proposal Workflow
              </button>
            </div>

            {/* Debug info - remove in production */}
            <div className="text-white text-xs">
              View: {currentView}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content - Add padding top for fixed nav */}
      <div className="pt-16">
        {renderView()}
      </div>
    </div>
  );
}

export default App;