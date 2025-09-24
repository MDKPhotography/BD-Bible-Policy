import React, { useState } from 'react';

const ClientMeetingTracker = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      date: "2024-01-10",
      opportunity: "DISA Cyber Security Support",
      attendees: ["John Smith (RPRC)", "Col. Martinez (CO)", "Jane Doe (PM)"],
      type: "Initial Introduction",
      hotButtons: ["Cost reduction", "Rapid deployment"],
      actionItems: ["Send capability statement", "Schedule technical demo"],
      status: "completed"
    },
    {
      id: 2,
      date: "2024-01-25",
      opportunity: "Navy SPAWAR Engineering",
      attendees: ["Sarah Johnson (RPRC)", "CAPT Williams (PM)", "Technical Team"],
      type: "Technical Discussion",
      hotButtons: ["Innovation", "Risk mitigation", "Past performance"],
      actionItems: ["Provide past performance refs", "Submit white paper"],
      status: "completed"
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    date: '',
    opportunity: '',
    attendees: '',
    type: 'Initial Introduction',
    hotButtons: '',
    actionItems: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const meetingTypes = [
    "Initial Introduction",
    "Technical Discussion",
    "Contracting Officer Meeting",
    "Program Manager Meeting",
    "Industry Day",
    "Site Visit",
    "Capability Briefing"
  ];

  const addMeeting = () => {
    if (newMeeting.date && newMeeting.opportunity) {
      setMeetings([...meetings, {
        id: meetings.length + 1,
        ...newMeeting,
        attendees: newMeeting.attendees.split(',').map(a => a.trim()),
        hotButtons: newMeeting.hotButtons.split(',').map(h => h.trim()),
        actionItems: newMeeting.actionItems.split(',').map(a => a.trim()),
        status: 'scheduled'
      }]);
      setNewMeeting({
        date: '',
        opportunity: '',
        attendees: '',
        type: 'Initial Introduction',
        hotButtons: '',
        actionItems: ''
      });
      setShowAddForm(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Client Meeting Tracker</h2>
      
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#007bff', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{meetings.length}</div>
          <div>Total Meetings</div>
        </div>
        <div style={{ backgroundColor: '#28a745', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {meetings.filter(m => m.status === 'completed').length}
          </div>
          <div>Completed</div>
        </div>
        <div style={{ backgroundColor: '#ffc107', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {[...new Set(meetings.flatMap(m => m.hotButtons))].length}
          </div>
          <div>Hot Buttons Identified</div>
        </div>
        <div style={{ backgroundColor: '#17a2b8', color: 'white', padding: '20px', borderRadius: '8px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {meetings.flatMap(m => m.actionItems).filter(Boolean).length}
          </div>
          <div>Action Items</div>
        </div>
      </div>

      {/* Add Meeting Button */}
      <button 
        onClick={() => setShowAddForm(!showAddForm)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {showAddForm ? 'Cancel' : '+ Add New Meeting'}
      </button>

      {/* Add Meeting Form */}
      {showAddForm && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #dee2e6'
        }}>
          <h3>Schedule New Meeting</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
              <input 
                type="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Opportunity:</label>
              <input 
                type="text"
                placeholder="Opportunity name"
                value={newMeeting.opportunity}
                onChange={(e) => setNewMeeting({...newMeeting, opportunity: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Meeting Type:</label>
              <select
                value={newMeeting.type}
                onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              >
                {meetingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Attendees (comma-separated):</label>
              <input 
                type="text"
                placeholder="John Smith (RPRC), Jane Doe (PM)"
                value={newMeeting.attendees}
                onChange={(e) => setNewMeeting({...newMeeting, attendees: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Hot Buttons (comma-separated):</label>
              <input 
                type="text"
                placeholder="Cost savings, Innovation"
                value={newMeeting.hotButtons}
                onChange={(e) => setNewMeeting({...newMeeting, hotButtons: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Action Items (comma-separated):</label>
              <input 
                type="text"
                placeholder="Send capabilities, Schedule follow-up"
                value={newMeeting.actionItems}
                onChange={(e) => setNewMeeting({...newMeeting, actionItems: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
          </div>
          <button 
            onClick={addMeeting}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '15px'
            }}
          >
            Save Meeting
          </button>
        </div>
      )}

      {/* Meetings Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Opportunity</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Attendees</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Hot Buttons</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Action Items</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map(meeting => (
              <tr key={meeting.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>{meeting.date}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef', fontWeight: 'bold' }}>{meeting.opportunity}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>{meeting.type}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ fontSize: '12px' }}>
                    {meeting.attendees.map((a, i) => (
                      <div key={i}>{a}</div>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  {meeting.hotButtons.map((hb, i) => (
                    <span key={i} style={{
                      backgroundColor: '#e7f3ff',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginRight: '4px',
                      display: 'inline-block',
                      marginBottom: '2px'
                    }}>
                      {hb}
                    </span>
                  ))}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <div style={{ fontSize: '12px' }}>
                    {meeting.actionItems.map((item, i) => (
                      <div key={i}>• {item}</div>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e9ecef' }}>
                  <span style={{
                    backgroundColor: meeting.status === 'completed' ? '#d4edda' : '#fff3cd',
                    color: meeting.status === 'completed' ? '#155724' : '#856404',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {meeting.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hot Buttons Summary */}
      <div style={{ marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px' }}>Key Hot Buttons Identified</h3>
        <div>
          {[...new Set(meetings.flatMap(m => m.hotButtons))].map(hb => (
            <span key={hb} style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              marginRight: '8px',
              marginBottom: '8px',
              display: 'inline-block'
            }}>
              {hb}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientMeetingTracker;
