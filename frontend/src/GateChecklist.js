import React, { useState } from 'react';

const GateChecklist = () => {
  const [selectedGate, setSelectedGate] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});

  const gateChecklists = {
    1: {
      name: "Gate 1: Opportunity Identification/Qualification",
      color: "#ffc107",
      items: [
        { id: "1-1", task: "Identify opportunity in SAM.gov/GOVWIN", required: true },
        { id: "1-2", task: "Validate acquisition schedule (RFI/RFP/Award dates)", required: true },
        { id: "1-3", task: "Confirm contract value and number of awards", required: true },
        { id: "1-4", task: "Identify Government PM or Leader", required: true },
        { id: "1-5", task: "Verify budget alignment (current/next FY)", required: true },
        { id: "1-6", task: "Initial client awareness of RPRC", required: false },
        { id: "1-7", task: "Confirm scope aligns with RPRC capabilities", required: true },
        { id: "1-8", task: "Document similar size/scope contracts", required: true }
      ]
    },
    2: {
      name: "Gate 2: Pursue",
      color: "#17a2b8",
      items: [
        { id: "2-1", task: "Document client history with RPRC", required: true },
        { id: "2-2", task: "Develop Call Plan for client meetings", required: true },
        { id: "2-3", task: "Schedule meeting with Contracting Officer", required: true },
        { id: "2-4", task: "Schedule meeting with Program Manager", required: true },
        { id: "2-5", task: "Create opportunity timeline with gate schedule", required: true },
        { id: "2-6", task: "Develop initial win themes", required: true },
        { id: "2-7", task: "Identify positioning strategy", required: true },
        { id: "2-8", task: "Document investment requirements", required: false }
      ]
    },
    3: {
      name: "Gate 3: Capture",
      color: "#28a745",
      items: [
        { id: "3-1", task: "Identify and vet Key Personnel", required: true },
        { id: "3-2", task: "Develop detailed Staffing Plan", required: true },
        { id: "3-3", task: "Assemble Dream Team (prime/subs)", required: true },
        { id: "3-4", task: "Update win themes based on client intel", required: true },
        { id: "3-5", task: "Complete Gap Analysis (SOW/Section L/M)", required: true },
        { id: "3-6", task: "Gather Past Performance references", required: true },
        { id: "3-7", task: "Develop preliminary pricing strategy", required: false },
        { id: "3-8", task: "Create draft storyboards", required: true }
      ]
    },
    4: {
      name: "Gate 4: Bid/No Bid",
      color: "#dc3545",
      items: [
        { id: "4-1", task: "Review final RFP requirements", required: true },
        { id: "4-2", task: "Analyze Terms & Conditions", required: true },
        { id: "4-3", task: "Evaluate payment terms", required: true },
        { id: "4-4", task: "Review Section M evaluation criteria", required: true },
        { id: "4-5", task: "Confirm team availability", required: true },
        { id: "4-6", task: "Final pricing review", required: true },
        { id: "4-7", task: "Executive bid decision", required: true },
        { id: "4-8", task: "Mobilize proposal team", required: true }
      ]
    }
  };

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getProgress = (gateNumber) => {
    const items = gateChecklists[gateNumber].items;
    const checkedCount = items.filter(item => checkedItems[item.id]).length;
    return Math.round((checkedCount / items.length) * 100);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Gate Progress Checklist</h2>
      
      {/* Gate Selector Tabs */}
      <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '2px solid #dee2e6' }}>
        {Object.entries(gateChecklists).map(([gateNum, gate]) => (
          <button
            key={gateNum}
            onClick={() => setSelectedGate(parseInt(gateNum))}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: selectedGate === parseInt(gateNum) ? gate.color : 'transparent',
              color: selectedGate === parseInt(gateNum) ? 'white' : '#333',
              fontWeight: selectedGate === parseInt(gateNum) ? 'bold' : 'normal',
              cursor: 'pointer',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px'
            }}
          >
            Gate {gateNum}
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              {getProgress(gateNum)}% Complete
            </div>
          </button>
        ))}
      </div>

      {/* Selected Gate Checklist */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          color: gateChecklists[selectedGate].color,
          marginBottom: '20px'
        }}>
          {gateChecklists[selectedGate].name}
        </h3>

        {/* Progress Bar */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            backgroundColor: '#e9ecef', 
            borderRadius: '10px',
            height: '30px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: gateChecklists[selectedGate].color,
              width: `${getProgress(selectedGate)}%`,
              height: '100%',
              transition: 'width 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {getProgress(selectedGate) > 0 && `${getProgress(selectedGate)}%`}
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div>
          {gateChecklists[selectedGate].items.map(item => (
            <div 
              key={item.id}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                borderBottom: '1px solid #e9ecef',
                backgroundColor: checkedItems[item.id] ? '#f8f9fa' : 'white',
                cursor: 'pointer'
              }}
              onClick={() => toggleCheck(item.id)}
            >
              <input
                type="checkbox"
                checked={checkedItems[item.id] || false}
                onChange={() => {}}
                style={{ 
                  marginRight: '15px',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ 
                flex: 1,
                textDecoration: checkedItems[item.id] ? 'line-through' : 'none',
                color: checkedItems[item.id] ? '#6c757d' : '#212529'
              }}>
                {item.task}
              </span>
              {item.required && (
                <span style={{ 
                  backgroundColor: '#dc3545',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  Required
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: gateChecklists[selectedGate].color }}>
              {gateChecklists[selectedGate].items.filter(item => checkedItems[item.id]).length}
            </div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>Completed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6c757d' }}>
              {gateChecklists[selectedGate].items.length - gateChecklists[selectedGate].items.filter(item => checkedItems[item.id]).length}
            </div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>Remaining</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
              {gateChecklists[selectedGate].items.filter(item => item.required && !checkedItems[item.id]).length}
            </div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>Required Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GateChecklist;
