import React, { useState } from 'react';

const SearchBar = ({ documents, onSelectDocument }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = documents.filter(doc =>
        doc.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDocs(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '30px' }}>
      <input
        type="text"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 20px',
          fontSize: '16px',
          border: '2px solid #006633',
          borderRadius: '25px',
          outline: 'none'
        }}
      />
      
      {showResults && filteredDocs.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginTop: '5px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 10
        }}>
          {filteredDocs.map(doc => (
            <div
              key={doc}
              onClick={() => {
                onSelectDocument(doc);
                setShowResults(false);
                setSearchTerm('');
              }}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.background = 'white'}
            >
              {doc.replace('.md', '').replace(/_/g, ' ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
