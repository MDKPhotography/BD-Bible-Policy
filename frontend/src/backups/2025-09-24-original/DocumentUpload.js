import React, { useState } from 'react';

const DocumentUpload = ({ token, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setMessage('Document uploaded successfully!');
        setFile(null);
        onUploadSuccess();
      } else {
        setMessage('Upload failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error uploading document.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <h3 style={{ color: '#006633', marginBottom: '20px' }}>Upload New Document</h3>
      
      <form onSubmit={handleUpload}>
        <div style={{
          border: '2px dashed #006633',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          marginBottom: '20px',
          background: '#f8f9fa'
        }}>
          <input
            type="file"
            accept=".md,.txt,.pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginBottom: '10px' }}
          />
          {file && (
            <p style={{ color: '#006633', marginTop: '10px' }}>
              Selected: {file.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!file || uploading}
          style={{
            width: '100%',
            padding: '12px',
            background: file && !uploading ? '#006633' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: file && !uploading ? 'pointer' : 'not-allowed'
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          background: message.includes('success') ? '#d4edda' : '#f8d7da',
          color: message.includes('success') ? '#155724' : '#721c24',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
