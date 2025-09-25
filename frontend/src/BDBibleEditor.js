import React, { useState, useEffect } from 'react';

const BDBibleEditor = ({ token }) => {
  const [content, setContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('business-model');

  const sections = [
    { id: 'business-model', title: '1. RPRC Business Model', icon: '🏢' },
    { id: 'key-roles', title: '2. Key Roles', icon: '👥' },
    { id: 'battle-rhythm', title: '3. Battle Rhythm', icon: '📅' },
    { id: 'marketing', title: '4. Marketing & Branding', icon: '📢' },
    { id: 'process', title: '5. BD Process Management', icon: '⚙️' },
    { id: 'capture', title: '6. Capture and Proposal', icon: '🎯' },
    { id: 'award', title: '7. Award and Transition', icon: '🏆' },
    { id: 'training', title: '8. Training Materials', icon: '📚' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Section Navigation */}
      <div style={{
        width: '300px',
        background: '#f8f9fa',
        padding: '20px',
        borderRight: '2px solid #dee2e6'
      }}>
        <h3 style={{ color: '#006633' }}>BD SOP Sections</h3>
        {sections.map(section => (
          <div
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              padding: '12px',
              margin: '8px 0',
              background: activeSection === section.id ? '#006633' : 'white',
              color: activeSection === section.id ? 'white' : '#333',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <span style={{ marginRight: '10px' }}>{section.icon}</span>
            {section.title}
          </div>
        ))}
      </div>

      {/* Content Editor */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#006633' }}>BD SOP Editor</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              padding: '10px 20px',
              background: editMode ? '#FFCC33' : '#006633',
              color: editMode ? '#006633' : 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {editMode ? 'Save Changes' : 'Edit Mode'}
          </button>
        </div>

        {editMode ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              height: '80vh',
              padding: '20px',
              fontSize: '14px',
              fontFamily: 'monospace',
              border: '2px solid #006633',
              borderRadius: '8px'
            }}
          />
        ) : (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            height: '80vh',
            overflow: 'auto'
          }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BDBibleEditor;
