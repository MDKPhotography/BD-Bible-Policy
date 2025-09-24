import React, { useState } from 'react';

const QuadChart = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [expandedQuadrant, setExpandedQuadrant] = useState(null);

  const opportunities = [
    {
      id: 1,
      name: "DISA Cyber Security Support",
      quadrant1: {
        procuringAgency: "Defense Information Systems Agency",
        contractType: "FFP/T&M Hybrid",
        incumbentValue: "$42M",
        incumbentAwardDate: "2019-09-30",
        incumbentTerm: "5 years",
        projectedLOE: "45 FTEs",
        rfiDate: "2024-01-15",
        rfpReleaseDate: "2024-03-15",
        smallBizGoal: "35% Small Business",
        currentGate: "Gate 2 - Pursue",
        opportunityMgr: "John Smith",
        programMgr: "TBD (Gate 3)",
        proposalMgr: "TBD (Gate 3)"
      },
      quadrant2: {
        incumbent: {
          prime: "CyberCore Solutions",
          subs: ["TechSecure Inc", "DataShield LLC", "NetGuard Systems"]
        },
        competition: {
          likelyPrimes: ["Booz Allen Hamilton", "CACI", "SAIC"],
          potentialSubs: ["SecureNet", "InfoGuard", "CyberTech Solutions"]
        }
      },
      quadrant3: {
        sowDescription: "Provide 24/7 cyber security operations center (CSOC) support, incident response, vulnerability assessments, and security architecture design for DISA networks."
      },
      quadrant4: {
        corporateExperience: [
          "DHS CSOC Support (2020-Present, $35M)",
          "Navy Cyber Defense Contract (2019-2024, $28M)",
          "Air Force Network Security (2021-Present, $15M)"
        ]
      }
    },
    {
      id: 2,
      name: "Navy SPAWAR Engineering Services",
      quadrant1: {
        procuringAgency: "Naval Information Warfare Systems Command",
        contractType: "CPFF",
        incumbentValue: "$115M",
        incumbentAwardDate: "2018-05-15",
        incumbentTerm: "5 years + 2 option years",
        projectedLOE: "120 FTEs",
        rfiDate: "2023-11-01",
        rfpReleaseDate: "2024-02-01",
        smallBizGoal: "N/A - Full & Open",
        currentGate: "Gate 3 - Capture",
        opportunityMgr: "Sarah Johnson",
        programMgr: "Mike Davis",
        proposalMgr: "Emily Chen"
      },
      quadrant2: {
        incumbent: {
          prime: "General Dynamics",
          subs: ["Lockheed Martin", "Northrop Grumman", "L3Harris"]
        },
        competition: {
          likelyPrimes: ["Raytheon", "BAE Systems", "Leidos"],
          potentialSubs: ["RPRC", "Maritime Tech", "Naval Systems Inc"]
        }
      },
      quadrant3: {
        sowDescription: "Systems engineering and integration for naval command and control systems. Includes software development, hardware integration, and testing."
      },
      quadrant4: {
        corporateExperience: [
          "SPAWAR Legacy System Support (2017-2022, $95M)",
          "Marine Corps C4I Integration (2020-Present, $45M)",
          "Coast Guard Communications Upgrade (2019-2024, $30M)"
        ]
      }
    }
  ];

  const toggleQuadrant = (quadrant) => {
    setExpandedQuadrant(expandedQuadrant === quadrant ? null : quadrant);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Opportunity Quad Charts</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Select Opportunity:</label>
        <select 
          onChange={(e) => {
            const opp = opportunities.find(o => o.id === parseInt(e.target.value));
            setSelectedOpportunity(opp);
            setExpandedQuadrant(null);
          }}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">-- Select an Opportunity --</option>
          {opportunities.map(opp => (
            <option key={opp.id} value={opp.id}>{opp.name}</option>
          ))}
        </select>
      </div>

      {selectedOpportunity && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* Quadrant 1 */}
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h3 
              onClick={() => toggleQuadrant(1)}
              style={{ cursor: 'pointer', color: '#007bff', marginBottom: '10px' }}
            >
              Q1: The Opportunity {expandedQuadrant === 1 ? '▼' : '▶'}
            </h3>
            {expandedQuadrant === 1 && (
              <div style={{ fontSize: '14px' }}>
                <div><strong>Agency:</strong> {selectedOpportunity.quadrant1.procuringAgency}</div>
                <div><strong>Type:</strong> {selectedOpportunity.quadrant1.contractType}</div>
                <div><strong>Value:</strong> {selectedOpportunity.quadrant1.incumbentValue}</div>
                <div><strong>RFP Date:</strong> {selectedOpportunity.quadrant1.rfpReleaseDate}</div>
                <div><strong>Gate:</strong> {selectedOpportunity.quadrant1.currentGate}</div>
                <div><strong>Manager:</strong> {selectedOpportunity.quadrant1.opportunityMgr}</div>
              </div>
            )}
          </div>

          {/* Quadrant 2 */}
          <div style={{ backgroundColor: '#fff5f5', padding: '15px', borderRadius: '8px', border: '1px solid #f5c6cb' }}>
            <h3 
              onClick={() => toggleQuadrant(2)}
              style={{ cursor: 'pointer', color: '#dc3545', marginBottom: '10px' }}
            >
              Q2: Competition {expandedQuadrant === 2 ? '▼' : '▶'}
            </h3>
            {expandedQuadrant === 2 && (
              <div style={{ fontSize: '14px' }}>
                <div><strong>Incumbent:</strong> {selectedOpportunity.quadrant2.incumbent.prime}</div>
                <div><strong>Likely Primes:</strong> {selectedOpportunity.quadrant2.competition.likelyPrimes.join(', ')}</div>
              </div>
            )}
          </div>

          {/* Quadrant 3 */}
          <div style={{ backgroundColor: '#f0fff4', padding: '15px', borderRadius: '8px', border: '1px solid #c3e6cb' }}>
            <h3 
              onClick={() => toggleQuadrant(3)}
              style={{ cursor: 'pointer', color: '#28a745', marginBottom: '10px' }}
            >
              Q3: SOW Description {expandedQuadrant === 3 ? '▼' : '▶'}
            </h3>
            {expandedQuadrant === 3 && (
              <p style={{ fontSize: '14px' }}>{selectedOpportunity.quadrant3.sowDescription}</p>
            )}
          </div>

          {/* Quadrant 4 */}
          <div style={{ backgroundColor: '#fff9e6', padding: '15px', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
            <h3 
              onClick={() => toggleQuadrant(4)}
              style={{ cursor: 'pointer', color: '#ffc107', marginBottom: '10px' }}
            >
              Q4: Experience {expandedQuadrant === 4 ? '▼' : '▶'}
            </h3>
            {expandedQuadrant === 4 && (
              <ul style={{ fontSize: '14px', paddingLeft: '20px' }}>
                {selectedOpportunity.quadrant4.corporateExperience.map((exp, idx) => (
                  <li key={idx}>{exp}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuadChart;
