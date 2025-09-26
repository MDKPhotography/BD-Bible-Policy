import React, { useState, useEffect } from 'react';

const BDBibleViewer = () => {
  const [content, setContent] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    // Fetch list of documents
    fetch('http://192.168.50.2:5005/api/content/documentation')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error fetching content:', err));
  }, []);

  const loadDocument = (slug) => {
    fetch(`http://192.168.50.2:5005/api/content/documentation/${slug}`)
      .then(res => res.json())
      .then(data => setSelectedDoc(data))
      .catch(err => console.error('Error loading document:', err));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{ width: '300px', background: '#006633', color: 'white', padding: '20px' }}>
        <h2 style={{ color: '#FFCC33' }}>BD Bible</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {content.map(doc => (
            <li key={doc.slug}>
              <button
                onClick={() => loadDocument(doc.slug)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px',
                  margin: '5px 0',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {doc.title || doc.slug}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '40px', background: 'white', margin: '20px', borderRadius: '8px' }}>
        {selectedDoc ? (
          <div dangerouslySetInnerHTML={{ __html: selectedDoc.content }} />
        ) : (
          <div>
            <h1 style={{ color: '#006633' }}>Welcome to BD Bible</h1>
            <p>Select a document from the sidebar to view its content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BDBibleViewer;
