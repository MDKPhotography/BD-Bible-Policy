import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import HeroPage from './HeroPage';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docContent, setDocContent] = useState('');
  const [view, setView] = useState('hero');

  useEffect(() => {
    if (token) {
      fetchDocuments();
    }
  }, [token]);

  const fetchDocuments = () => {
    axios.get('http://localhost:5001/api/documents', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => setDocuments(res.data.documents))
    .catch(err => {
      console.error('Error:', err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    });
  };

  const loadDocument = (filename) => {
    axios.get(`http://localhost:5001/api/documents/${filename}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      setSelectedDoc(filename);
      setDocContent(res.data.content);
      setView('document');
    })
    .catch(err => console.error('Error:', err));
  };

  const handleLogin = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setDocuments([]);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: '#006633',
        color: 'white',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* User info */}
        <div style={{
          background: 'rgba(255,204,51,0.1)',
          padding: '20px',
          borderBottom: '1px solid rgba(255,204,51,0.3)'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>Signed in as:</div>
          <div style={{ fontWeight: 'bold' }}>{user?.name || user?.email}</div>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              background: '#FFCC33',
              color: '#006633',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            Sign Out
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <div
            onClick={() => setView('hero')}
            style={{
              padding: '12px',
              background: view === 'hero' ? 'rgba(255,204,51,0.2)' : 'transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '8px'
            }}
          >
            Home
          </div>

          <h4 style={{ color: '#FFCC33', marginTop: '30px' }}>Documents</h4>
          {documents.map(doc => (
            <div
              key={doc}
              onClick={() => loadDocument(doc)}
              style={{
                padding: '10px',
                background: selectedDoc === doc && view === 'document' ? 'rgba(255,204,51,0.2)' : 'transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '4px'
              }}
            >
              {doc.replace('.md', '').replace(/_/g, ' ')}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {view === 'hero' ? (
          <HeroPage 
            documents={documents} 
            setView={setView} 
            loadDocument={loadDocument} 
          />
        ) : (
          <div style={{ padding: '40px', background: '#f8f9fa', minHeight: '100vh' }}>
            <h1 style={{ color: '#006633' }}>
              {selectedDoc?.replace('.md', '').replace(/_/g, ' ')}
            </h1>
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              whiteSpace: 'pre-wrap'
            }}>
              {docContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
