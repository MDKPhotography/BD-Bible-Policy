import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docContent, setDocContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/api/documents')
      .then(res => setDocuments(res.data.documents))
      .catch(err => console.error('Error:', err));
  }, []);

  const loadDocument = (filename) => {
    axios.get(`http://localhost:5001/api/documents/${filename}`)
      .then(res => {
        setSelectedDoc(filename);
        setDocContent(res.data.content);
      })
      .catch(err => console.error('Error:', err));
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{
        width: '280px',
        background: '#006633',
        color: 'white',
        padding: '20px'
      }}>
        <h2 style={{ color: '#FFCC33' }}>BD-Bible-Policy</h2>
        <p>George Mason University</p>
        <hr />
        {documents.map(doc => (
          <div
            key={doc}
            onClick={() => loadDocument(doc)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              background: selectedDoc === doc ? '#00563F' : 'transparent',
              marginBottom: '5px',
              borderRadius: '4px'
            }}
          >
            📄 {doc.replace('.md', '')}
          </div>
        ))}
      </div>
      
      <div style={{ flex: 1, padding: '20px', background: '#f5f5f5' }}>
        <h1 style={{ color: '#006633' }}>Business Development Command Center</h1>
        {selectedDoc ? (
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            borderTop: '4px solid #FFCC33',
            whiteSpace: 'pre-wrap'
          }}>
            <h2 style={{ color: '#006633' }}>{selectedDoc.replace('.md', '').replace(/_/g, ' ')}</h2>
            {docContent}
          </div>
        ) : (
          <p>Select a document to view</p>
        )}
      </div>
    </div>
  );
}

export default App;
