import React, { useState } from 'react';

const ProposalWorkflow = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReview, setSelectedReview] = useState('blue');

  const colorTeamReviews = {
    blue: {
      name: "Blue Team Review",
      timing: "Early - Before Writing",
      completion: "30%",
      color: "#007bff",
      focus: [
        "Review outline for compliance",
        "Review schedule for realism",
        "Review storyboards/AMUs",
        "Validate win themes alignment",
        "Check graphics plans",
        "Early course correction"
      ],
      critical: true
    },
    pink: {
      name: "Pink Team Review",
      timing: "Mid - First Draft",
      completion: "70%",
      color: "#e91e63",
      focus: [
        "Review 1st draft completeness",
        "Check for actual content (not cut/paste)",
        "Identify content holes",
        "Verify approach alignment",
        "Review win theme integration",
        "Assess compliance status"
      ]
    },
    red: {
      name: "Red Team Review",
      timing: "Final Draft",
      completion: "90%",
      color: "#dc3545",
      focus: [
        "Review final proposal draft",
        "Must be submission-ready",
        "Complete content review",
        "Flow and consistency check",
        "No contradictions",
        "Final compliance verification"
      ]
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Proposal Workflow Management</h2>
      
      <div style={{ display: 'flex', borderBottom: '2px solid #dee2e6', marginBottom: '30px' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: activeTab === 'overview' ? '#007bff' : 'transparent',
            color: activeTab === 'overview' ? 'white' : '#333',
            fontWeight: activeTab === 'overview' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: activeTab === 'reviews' ? '#007bff' : 'transparent',
            color: activeTab === 'reviews' ? 'white' : '#333',
            fontWeight: activeTab === 'reviews' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          Color Team Reviews
        </button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>Proposal Management Overview</h3>
          <p>Based on RPRC Proposal Standards - Jen Namvar Process</p>
          <ul>
            <li>Compliance Matrix required for every proposal</li>
            <li>Proposal Schedule with color team reviews</li>
            <li>Daily stand-ups led by Proposal Manager</li>
            <li>SharePoint for configuration control</li>
          </ul>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {Object.entries(colorTeamReviews).map(([key, review]) => (
              <button
                key={key}
                onClick={() => setSelectedReview(key)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: selectedReview === key ? review.color : '#f8f9fa',
                  color: selectedReview === key ? 'white' : '#333',
                  border: `2px solid ${review.color}`,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {review.name}
              </button>
            ))}
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>{colorTeamReviews[selectedReview].name}</h3>
            <p>Timing: {colorTeamReviews[selectedReview].timing}</p>
            <p>Completion: {colorTeamReviews[selectedReview].completion}</p>
            <ul>
              {colorTeamReviews[selectedReview].focus.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalWorkflow;
