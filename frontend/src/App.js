import React, { useState } from 'react';
import GMULanding from './components/GMULanding';
import PageWrapper from './components/PageWrapper';
import BDBible from './BDBible';
import RPRCCaptureDashboard from './RPRCCaptureDashboard';
import QuadChart from './QuadChart';
import GateChecklist from './GateChecklist';
import ClientMeetingTracker from './ClientMeetingTracker';
import WinThemesBuilder from './WinThemesBuilder';
import ProposalWorkflow from './ProposalWorkflow';
import './index.css';

function App() {
  const [view, setView] = useState('home');

  // Handle navigation from GMULanding
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const viewMap = {
          'bd-sop': 'bdbible',
          'capture-dashboard': 'capture',
          'quad-charts': 'quadchart',
          'gate-checklist': 'checklist',
          'meeting-tracker': 'meetings',
          'win-themes': 'winthemes',
          'proposal-workflow': 'proposal'
        };

        if (viewMap[hash]) {
          setView(viewMap[hash]);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Render the appropriate view
  switch (view) {
    case 'bdbible':
      return (
        <PageWrapper title="BD Standard Operating Procedures" onBack={() => setView('home')}>
          <BDBible />
        </PageWrapper>
      );
    case 'capture':
      return (
        <PageWrapper title="RPRC Capture Dashboard" onBack={() => setView('home')}>
          <RPRCCaptureDashboard />
        </PageWrapper>
      );
    case 'quadchart':
      return (
        <PageWrapper title="Quad Charts" onBack={() => setView('home')}>
          <QuadChart />
        </PageWrapper>
      );
    case 'checklist':
      return (
        <PageWrapper title="Gate Checklist" onBack={() => setView('home')}>
          <GateChecklist />
        </PageWrapper>
      );
    case 'meetings':
      return (
        <PageWrapper title="Client Meeting Tracker" onBack={() => setView('home')}>
          <ClientMeetingTracker />
        </PageWrapper>
      );
    case 'winthemes':
      return (
        <PageWrapper title="Win Themes Builder" onBack={() => setView('home')}>
          <WinThemesBuilder />
        </PageWrapper>
      );
    case 'proposal':
      return (
        <PageWrapper title="Proposal Workflow" onBack={() => setView('home')}>
          <ProposalWorkflow />
        </PageWrapper>
      );
    case 'home':
    default:
      return <GMULanding />;
  }
}

export default App;