import React, { useState } from 'react';

const BDBible = () => {
  const [activeSection, setActiveSection] = useState('model');
  const [expandedDoc, setExpandedDoc] = useState(null);

  // GMU Colors
  const gmuColors = {
    primaryGreen: '#006633',
    primaryGold: '#FFCC33',
    darkGreen: '#00563F',
    secondaryGold: '#FFB81C'
  };

  const sections = {
    model: {
      title: "RPRC Business Model",
      content: "Mission, Vision, and Methods to Win",
      documents: [
        {
          id: 'mission-vision',
          title: 'Mission and Vision',
          sections: [
            {
              title: 'Vision',
              content: `A premier applied research institution, recognized for global thought leadership, cutting-edge capabilities, and a mission-focused culture that accelerates innovation and secure national advantage in a rapidly evolving world.`
            },
            {
              title: 'Mission',
              content: `To excel in agile, mission-driven applied research that delivers dual-use innovations and operational capabilities in support of global security, national defense, and private/public sectors that harness GMU's academic excellence, expanding research enterprise, strategic location, and enduring commitment to national service.`
            },
            {
              title: 'Core Capabilities',
              content: `• Applied Research and capability integration
- Take new technology and insert into existing C5ISR systems
- Leverage small business innovation
- Unbiased approach leveraging faculty to solve the toughest problems`
            },
            {
              title: 'Methods to Win and Conduct Applied Research',
              content: `1. Prime Contracts and OTAs
   • Example: MUDLAN/MADD – CDAO for OTA
   
2. Congressional Plus Ups
   • Require sponsor that provides PE
   • Support when asked by Congressional Staffers
   
3. SBIRs/STTRs
   • Small businesses providing innovation tech
   • Address operational gaps
   
4. Subcontractor Roles
   • Focus on large National Security Programs
   
5. Grants
   • NIH, NSF, and other federal agencies
   
6. Independently Funded Initiatives
   • Foundations and private funding sources`
            }
          ]
        }
      ]
    },
    roles: {
      title: "Key Roles",
      content: "Critical positions in the BD organization",
      documents: [
        {
          id: 'key-roles',
          title: 'BD Organization Roles',
          sections: [
            {
              title: 'Leadership Positions',
              content: `BD Director
- Overall BD strategy and execution
- Executive relationship management
- Portfolio oversight

Portfolio Manager
- Manage opportunity pipeline
- Resource allocation
- Performance tracking

Solutions Architect
- Technical solution development
- Innovation integration
- Capability mapping`
            },
            {
              title: 'Execution Positions',
              content: `Capture Manager
- Lead capture activities from Gate 1-4
- Client engagement
- Team formation
- Win strategy development

Proposal Manager
- Proposal compliance and schedule
- Color team reviews
- Writer coordination
- Submission management`
            }
          ]
        }
      ]
    },
    rhythm: {
      title: "Battle Rhythm",
      content: "Operational cadence and review cycles",
      documents: [
        {
          id: 'battle-rhythm',
          title: 'Meeting Schedule and Reviews',
          sections: [
            {
              title: 'Weekly Meetings',
              content: `Standard Agenda:
1. Pipeline Review (15 min)
   • New opportunities
   • Gate progressions
   • Risk items

2. Capture Updates (20 min)
   • Client meetings summary
   • Action items
   • Win theme development

3. Proposal Status (15 min)
   • Active proposals
   • Color team schedules
   • Resource needs

4. Wins/Losses (10 min)
   • Celebration
   • Lessons learned`
            },
            {
              title: 'Bi-Monthly Executive Reviews',
              content: `Format for Executive Director/Dean:
- Pipeline summary chart
- Financial projections
- Key wins and opportunities
- Resource requirements
- Strategic initiatives update`
            }
          ]
        }
      ]
    },
    marketing: {
      title: "Marketing & Branding",
      content: "External presence and thought leadership",
      documents: [
        {
          id: 'marketing',
          title: 'Marketing Strategy',
          sections: [
            {
              title: 'Digital Presence',
              content: `Website Requirements:
- Capabilities overview
- Past performance
- Key personnel
- Contact information
- News and updates`
            },
            {
              title: 'Marketing Collateral',
              content: `RPRC Capabilities Brief:
- One-page executive summary
- Core competencies
- Discriminators
- Past performance highlights

White Papers:
- Thought leadership pieces
- Technical solutions
- Innovation approaches

Conference Participation:
- Speaking opportunities
- Booth presence
- Networking events
- Workshop leadership`
            }
          ]
        }
      ]
    },
    process: {
      title: "BD Process Management",
      content: "CRM usage and opportunity tracking",
      documents: [
        {
          id: 'crm-process',
          title: 'CRM System Usage',
          sections: [
            {
              title: 'CRM Data Entry',
              content: `Required Fields:
- Opportunity name and description
- Agency and office
- Contract value (estimated)
- Key dates (RFI, RFP, Award)
- Probability of win
- Gate status
- Capture manager assigned

Update Frequency:
- New opportunities: Within 24 hours
- Gate changes: Same day
- Client meetings: Within 48 hours
- Win/Loss: Immediate`
            }
          ]
        }
      ]
    },
    gates: {
      title: "Gate Reviews",
      content: "Qualification and gate progression process",
      documents: [
        {
          id: 'gate-process',
          title: 'Gate Review Process',
          sections: [
            {
              title: 'Vetted Pursuit Checklist',
              content: `Qualification Requirements:
☐ Real opportunity confirmed
☐ Acquisition schedule identified
☐ Contract value validated
☐ Government PM identified
☐ Budget alignment verified
☐ RPRC capabilities match
☐ "We have a chance" confirmed`
            },
            {
              title: 'Quad Chart Requirements',
              content: `All opportunities require quad chart with:
- Q1: Opportunity details and financials
- Q2: Incumbent and competition analysis
- Q3: SOW/Requirements summary
- Q4: RPRC relevant experience`
            },
            {
              title: 'Gate Progression',
              content: `Gate 1: Opportunity ID/Qualification
Gate 2: Pursue Decision
Gate 3: Capture Execution
Gate 4: Bid/No Bid Decision

Each gate requires:
- Executive review
- Go/No-go decision
- Resource commitment
- Success criteria definition`
            }
          ]
        }
      ]
    },
    capture: {
      title: "Capture & Proposal",
      content: "Execution of capture and proposal activities",
      documents: [
        {
          id: 'capture-execution',
          title: 'Capture and Proposal Management',
          sections: [
            {
              title: 'Capture Phase',
              content: `Key Activities:
- Client engagement and call plans
- Hot button identification
- Win theme development
- Team formation
- Discriminator development
- Price-to-win analysis
- Storyboard development`
            },
            {
              title: 'Proposal Phase',
              content: `Key Activities:
- Kick-off meeting
- Compliance matrix development
- Writing assignments
- Color team reviews (Blue, Pink, Red)
- Production and submission`
            }
          ]
        }
      ]
    },
    transition: {
      title: "Award & Transition",
      content: "Post-award transition to execution",
      documents: [
        {
          id: 'transition',
          title: 'Award and Transition Process',
          sections: [
            {
              title: 'Transition Checklist',
              content: `Handoff to Operations (Patt Cobb):
☐ Contract documents transfer
☐ Key personnel availability confirmed
☐ Staffing plan activated
☐ Kick-off meeting scheduled
☐ Invoicing setup complete
☐ Program manager assigned
☐ Subcontractor agreements executed
☐ Security clearances verified
☐ Workspace/equipment ready
☐ First deliverables identified`
            }
          ]
        }
      ]
    }
  };

  const toggleDocument = (docId) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ 
        fontSize: '36px', 
        color: gmuColors.primaryGreen,
        borderBottom: `4px solid ${gmuColors.primaryGold}`,
        paddingBottom: '10px',
        marginBottom: '30px'
      }}>
        RPRC BD Bible Workflow
      </h1>

      {/* Vision and Mission Banner */}
      <div style={{ 
        backgroundColor: gmuColors.primaryGreen,
        color: 'white',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ 
            color: gmuColors.primaryGold,
            fontSize: '24px',
            marginBottom: '10px'
          }}>
            Vision
          </h2>
          <p style={{ 
            fontSize: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            A premier applied research institution, recognized for global thought leadership, cutting-edge capabilities, and a mission-focused culture that accelerates innovation and secure national advantage in a rapidly evolving world.
          </p>
        </div>
        
        <div style={{ 
          borderTop: `2px solid ${gmuColors.primaryGold}`,
          paddingTop: '20px'
        }}>
          <h2 style={{ 
            color: gmuColors.primaryGold,
            fontSize: '24px',
            marginBottom: '10px'
          }}>
            Mission
          </h2>
          <p style={{ 
            fontSize: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            To excel in agile, mission-driven applied research that delivers dual-use innovations and operational capabilities in support of global security, national defense, and private/public sectors that harness GMU's academic excellence, expanding research enterprise, strategic location, and enduring commitment to national service.
          </p>
        </div>
      </div>

      {/* Section Tabs - Two Rows */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
          {Object.keys(sections).slice(0, 4).map(key => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeSection === key ? gmuColors.primaryGreen : 'white',
                color: activeSection === key ? 'white' : gmuColors.primaryGreen,
                border: `2px solid ${gmuColors.primaryGreen}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {sections[key].title}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.keys(sections).slice(4).map(key => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                padding: '12px 24px',
                backgroundColor: activeSection === key ? gmuColors.primaryGreen : 'white',
                color: activeSection === key ? 'white' : gmuColors.primaryGreen,
                border: `2px solid ${gmuColors.primaryGreen}`,
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {sections[key].title}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
          {sections[activeSection].title}
        </h2>
        <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
          {sections[activeSection].content}
        </p>

        {/* Documents */}
        {sections[activeSection].documents.map(doc => (
          <div key={doc.id} style={{ marginBottom: '20px', border: `1px solid ${gmuColors.primaryGreen}`, borderRadius: '8px' }}>
            <div 
              onClick={() => toggleDocument(doc.id)}
              style={{ 
                padding: '15px',
                backgroundColor: gmuColors.primaryGold,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: expandedDoc === doc.id ? '8px 8px 0 0' : '8px'
              }}
            >
              <h3 style={{ margin: 0, color: gmuColors.darkGreen, fontSize: '18px' }}>
                {doc.title}
              </h3>
              <span style={{ fontSize: '20px', color: gmuColors.darkGreen }}>
                {expandedDoc === doc.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedDoc === doc.id && (
              <div style={{ padding: '20px', backgroundColor: '#fafafa' }}>
                {doc.sections.map((section, idx) => (
                  <div key={idx} style={{ marginBottom: '25px' }}>
                    <h4 style={{ 
                      color: gmuColors.primaryGreen, 
                      marginBottom: '15px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      {section.title}
                    </h4>
                    <div style={{ 
                      whiteSpace: 'pre-line',
                      lineHeight: '1.8',
                      fontSize: '14px',
                      paddingLeft: '20px',
                      borderLeft: `3px solid ${gmuColors.primaryGold}`,
                      color: '#333'
                    }}>
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px',
        backgroundColor: gmuColors.primaryGold,
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, color: gmuColors.darkGreen, fontWeight: 'bold' }}>
          Note: BD Training Charts - Future development, not part of Oct 1 deadline
        </p>
      </div>
    </div>
  );
};

export default BDBible;
