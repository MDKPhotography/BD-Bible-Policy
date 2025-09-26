import React, { useState } from 'react';

const ProposalWorkflow = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  // GMU Colors
  const gmuColors = {
    primaryGreen: '#006633',
    primaryGold: '#FFCC33',
    darkGreen: '#00563F',
    secondaryGold: '#FFB81C'
  };

  const toggleCheck = (item) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'kickoff', label: 'Kick-Off Meeting' },
    { id: 'outline', label: 'Outline & Compliance' },
    { id: 'schedule', label: 'Schedule & Reviews' },
    { id: 'roles', label: 'Roles & Responsibilities' },
    { id: 'communications', label: 'Communications' },
    { id: 'checklist', label: 'Master Checklist' },
    { id: 'resources', label: 'Resources & References' }
  ];

  const sectionOverviews = [
    {
      id: 'kickoff',
      title: 'Kick-Off Meeting',
      icon: '🚀',
      description: 'Launch your proposal with a comprehensive kick-off meeting',
      keyPoints: [
        'Define proposal outline and structure',
        'Establish schedule with milestones',
        'Assign team roles and responsibilities',
        'Set up communication protocols'
      ],
      completionTime: '2-3 hours',
      critical: true
    },
    {
      id: 'outline',
      title: 'Outline & Compliance',
      icon: '📋',
      description: 'Ensure complete compliance with all RFP requirements',
      keyPoints: [
        'Develop compliance matrix',
        'Create detailed outlines for L & M criteria',
        'Define proposal templates',
        'Establish page limits and formatting'
      ],
      completionTime: '1-2 days',
      critical: true
    },
    {
      id: 'schedule',
      title: 'Schedule & Reviews',
      icon: '📅',
      description: 'Plan and execute color team reviews for quality assurance',
      keyPoints: [
        'Blue Team (30%) - Early review',
        'Pink Team (70%) - Draft review',
        'Red Team (90%) - Final review',
        'Gold Team (100%) - Submission ready'
      ],
      completionTime: 'Throughout proposal',
      critical: true
    },
    {
      id: 'roles',
      title: 'Roles & Responsibilities',
      icon: '👥',
      description: 'Clear definition of team member responsibilities',
      keyPoints: [
        'Proposal Manager oversight',
        'Volume Lead assignments',
        'Writer responsibilities',
        'Review team selection'
      ],
      completionTime: 'At kick-off',
      critical: false
    },
    {
      id: 'communications',
      title: 'Communications',
      icon: '💬',
      description: 'Establish effective communication and collaboration',
      keyPoints: [
        'SharePoint site setup',
        'Access control implementation',
        'Daily stand-up meetings',
        'Configuration management'
      ],
      completionTime: 'First week',
      critical: false
    },
    {
      id: 'checklist',
      title: 'Master Checklist',
      icon: '✅',
      description: 'Track all proposal activities and deliverables',
      keyPoints: [
        '38 critical tasks',
        'Progress tracking',
        'Quality assurance',
        'Final submission readiness'
      ],
      completionTime: 'Ongoing',
      critical: true
    }
  ];

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
      critical: true,
      description: "One of the most critical reviews! Ensures writers are going in the right direction before they go too far."
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
      ],
      description: "Most content should be complete and well thought-out. Authors must identify any gaps."
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
      ],
      description: "You should be able to submit this draft. Only minor tweaks to strengthen content should remain."
    },
    gold: {
      name: "Gold Team Review",
      timing: "Pre-Submission",
      completion: "100%",
      color: "#FFD700",
      focus: [
        "Final quality check",
        "Pricing approval",
        "Production complete",
        "Compliance verification",
        "Executive sign-off",
        "Submission readiness"
      ],
      description: "Final review before submission. All content locked down."
    }
  };

  const proposalResources = {
    books: [
      {
        title: "Proposal Best Practices",
        author: "Larry Newman & Tom Sant",
        year: "2011",
        description: "A comprehensive guide to winning government and commercial proposals",
        isbn: "978-1-56720-775-4",
        keyTopics: ["Win themes", "Executive summaries", "Proposal graphics", "Pricing strategies"]
      },
      {
        title: "Writing Winning Business Proposals",
        author: "Richard C. Freed, Shervin Freed, Joe Romano",
        year: "2010",
        description: "Step-by-step guide to crafting persuasive proposals",
        isbn: "978-0071742324",
        keyTopics: ["Customer focus", "Value propositions", "Proposal structure", "Review processes"]
      },
      {
        title: "Successful Proposal Strategies for Small Businesses",
        author: "Robert S. Frey",
        year: "2016",
        description: "Using knowledge management to win government, private-sector, and international contracts",
        isbn: "978-1-59693-997-1",
        keyTopics: ["Small business strategies", "Teaming arrangements", "Past performance", "Knowledge management"]
      },
      {
        title: "The Shipley Proposal Guide",
        author: "Larry Newman",
        year: "2016",
        description: "Industry-standard proposal development methodology",
        isbn: "978-0-9846066-2-3",
        keyTopics: ["Capture planning", "Color team reviews", "Compliance matrix", "Graphics development"]
      }
    ],
    websites: [
      {
        name: "APMP (Association of Proposal Management Professionals)",
        url: "www.apmp.org",
        description: "Industry certifications, best practices, and resources",
        resources: ["Body of Knowledge", "Certification programs", "Templates", "Webinars"]
      },
      {
        name: "SAM.gov",
        url: "www.sam.gov",
        description: "Official U.S. Government system for award management",
        resources: ["Active opportunities", "Contract awards", "Entity registrations", "Wage determinations"]
      },
      {
        name: "GovWin IQ",
        url: "www.govwin.com",
        description: "Government contracting intelligence and opportunities",
        resources: ["Opportunity tracking", "Competitive intelligence", "Spending analysis", "Teaming partners"]
      },
      {
        name: "FedBizOpps (now SAM.gov)",
        url: "www.sam.gov",
        description: "Federal business opportunities and solicitations",
        resources: ["RFPs/RFQs", "Sources sought", "Pre-solicitation notices", "Award notices"]
      },
      {
        name: "Bloomberg Government",
        url: "www.bgov.com",
        description: "Federal contracting data and analytics",
        resources: ["Contract data", "Spending analytics", "Legislation tracking", "Agency profiles"]
      }
    ],
    tools: [
      {
        category: "Proposal Management",
        tools: [
          { name: "Microsoft Project", use: "Schedule management and milestone tracking" },
          { name: "SharePoint", use: "Document management and collaboration" },
          { name: "Privia", use: "Proposal automation and content management" },
          { name: "Qvidian", use: "RFP response automation" }
        ]
      },
      {
        category: "Graphics & Design",
        tools: [
          { name: "Adobe Creative Suite", use: "Professional graphics and layouts" },
          { name: "Visio", use: "Technical diagrams and flowcharts" },
          { name: "Canva", use: "Quick graphics and infographics" },
          { name: "PowerPoint", use: "Presentations and simple graphics" }
        ]
      },
      {
        category: "Collaboration",
        tools: [
          { name: "Microsoft Teams", use: "Virtual meetings and collaboration" },
          { name: "Slack", use: "Team communication" },
          { name: "Zoom", use: "Video conferences and reviews" },
          { name: "Miro/Mural", use: "Virtual whiteboarding and brainstorming" }
        ]
      }
    ],
    standards: [
      {
        name: "ISO 9001:2015",
        description: "Quality management systems requirements",
        relevance: "Demonstrates quality processes in proposal development"
      },
      {
        name: "CMMI-DEV",
        description: "Capability Maturity Model Integration for Development",
        relevance: "Shows process maturity for technical proposals"
      },
      {
        name: "PMBOK Guide",
        description: "Project Management Body of Knowledge",
        relevance: "Standard project management practices for proposal efforts"
      },
      {
        name: "FAR/DFARS",
        description: "Federal/Defense Federal Acquisition Regulations",
        relevance: "Compliance requirements for government proposals"
      }
    ],
    templates: [
      {
        name: "Compliance Matrix Template",
        description: "Excel template for tracking RFP requirements",
        sections: ["Requirement", "Location", "Page limit", "Responsible party", "Status"]
      },
      {
        name: "Proposal Outline Template",
        description: "Standard structure for proposal volumes",
        sections: ["Executive Summary", "Technical Approach", "Management Approach", "Past Performance", "Price"]
      },
      {
        name: "Win Strategy Canvas",
        description: "Strategic planning template",
        sections: ["Customer hot buttons", "Discriminators", "Competitive analysis", "Risk mitigation"]
      },
      {
        name: "Color Review Checklist",
        description: "Review criteria for each color team",
        sections: ["Compliance check", "Win theme integration", "Graphics review", "Pricing validation"]
      }
    ],
    training: [
      {
        provider: "Shipley Associates",
        courses: ["Capture Management", "Proposal Management", "Proposal Writing", "Executive Summaries"],
        website: "www.shipleywins.com"
      },
      {
        provider: "APMP",
        courses: ["Foundation Certification", "Practitioner Certification", "Professional Certification"],
        website: "www.apmp.org"
      },
      {
        provider: "Lohfeld Consulting",
        courses: ["Capture Management", "Proposal Management", "Orals Coaching"],
        website: "www.lohfeldconsulting.com"
      },
      {
        provider: "OST Global Solutions",
        courses: ["Business Development", "Capture Planning", "Proposal Development"],
        website: "www.ostglobalsolutions.com"
      }
    ]
  };

  const masterChecklist = {
    kickoff: [
      "Schedule Proposal Kick-Off Meeting",
      "Prepare Proposal Outline",
      "Define Schedule with color team reviews",
      "Identify Proposal Team members",
      "Setup Communications plan",
      "Create contact information sheet",
      "Establish document storage location",
      "Schedule separate writer's kick-off"
    ],
    compliance: [
      "Develop Compliance Matrix",
      "Create detailed Outline for L & M criteria",
      "Map all proposal requirements",
      "Assign compliance ownership",
      "Create proposal template (if needed)",
      "Define font/margin guidelines",
      "Establish page count limits",
      "Review Government template (if applicable)"
    ],
    reviews: [
      "Schedule Blue Team Review",
      "Prepare storyboards/AMUs",
      "Schedule Pink Team Review",
      "Complete 70% draft",
      "Schedule Red Team Review",
      "Complete 90% draft",
      "Schedule Gold Team Review",
      "Identify review team members (non-writers)",
      "Prepare review packages",
      "Document review feedback"
    ],
    communications: [
      "Setup SharePoint proposal site",
      "Create folder structure",
      "Implement role-based access controls",
      "Schedule daily stand-ups",
      "Create distribution lists",
      "Establish escalation procedures",
      "Define configuration control process",
      "Setup version control"
    ],
    production: [
      "Final compliance check",
      "Complete all graphics",
      "Conduct final pricing review",
      "Complete executive summary",
      "Verify all resumes/past performance",
      "Final page count verification",
      "PDF generation and QC",
      "Prepare submission package",
      "Backup all files",
      "Submit proposal"
    ]
  };

  const renderOverviewTab = () => (
    <div style={{ padding: '20px' }}>
      <div style={{
        backgroundColor: gmuColors.primaryGreen,
        color: 'white',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>
          Proposal Management Workflow
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '0' }}>
          Your comprehensive guide to winning proposals through systematic excellence
        </p>
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '24px' }}>⚡</span>
        <div>
          <strong>Quick Start:</strong> Click any section below to jump directly to that workflow component.
          Each section contains detailed guidance, templates, and checklists to ensure proposal success.
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {sectionOverviews.map((section) => (
          <div
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            style={{
              backgroundColor: 'white',
              border: `2px solid ${section.critical ? gmuColors.primaryGold : gmuColors.primaryGreen}`,
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              if (section.critical) {
                e.currentTarget.style.borderColor = gmuColors.secondaryGold;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = section.critical ? gmuColors.primaryGold : gmuColors.primaryGreen;
            }}
          >
            {section.critical && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '15px',
                backgroundColor: gmuColors.primaryGold,
                color: gmuColors.primaryGreen,
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                CRITICAL
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '32px', marginRight: '15px' }}>{section.icon}</span>
              <div>
                <h3 style={{ color: gmuColors.primaryGreen, margin: '0 0 5px 0' }}>
                  {section.title}
                </h3>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  ⏱️ {section.completionTime}
                </div>
              </div>
            </div>

            <p style={{ marginBottom: '15px', color: '#555', fontSize: '14px' }}>
              {section.description}
            </p>

            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: gmuColors.darkGreen, fontSize: '13px' }}>Key Activities:</strong>
              <ul style={{ marginLeft: '20px', marginTop: '8px', marginBottom: '0' }}>
                {section.keyPoints.map((point, idx) => (
                  <li key={idx} style={{ fontSize: '13px', marginBottom: '4px', color: '#666' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              borderTop: `1px solid #e0e0e0`,
              paddingTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                style={{
                  backgroundColor: gmuColors.primaryGold,
                  color: gmuColors.primaryGreen,
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = gmuColors.secondaryGold;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = gmuColors.primaryGold;
                }}
              >
                Go to {section.title} →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px',
        padding: '20px',
        marginTop: '30px'
      }}>
        <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '10px' }}>
          📊 Proposal Statistics
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: gmuColors.primaryGreen }}>
              {Object.values(masterChecklist).flat().length}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Total Tasks</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: gmuColors.primaryGreen }}>
              4
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Color Reviews</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: gmuColors.primaryGreen }}>
              6
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Workflow Sections</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: gmuColors.primaryGreen }}>
              {Math.round((Object.values(checkedItems).filter(v => v).length / Object.values(masterChecklist).flat().length) * 100) || 0}%
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Complete</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKickoffTab = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
        Proposal Kick-Off Meeting
      </h3>

      <div style={{
        backgroundColor: gmuColors.primaryGreen,
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>
          The Proposal Manager leads the kick-off meeting covering these critical points:
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        {['Proposal Outline', 'Schedule', 'Proposal Team', 'Communications'].map((item, idx) => (
          <div key={idx} style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            marginBottom: '15px',
            borderLeft: `4px solid ${gmuColors.primaryGold}`,
            borderRadius: '4px'
          }}>
            <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '10px' }}>{item}</h4>
            <div style={{ fontSize: '14px', color: '#333' }}>
              {item === 'Proposal Outline' && 'Complete outline covering all requirements and evaluation criteria'}
              {item === 'Schedule' && 'Detailed timeline including all color team reviews and submission deadline'}
              {item === 'Proposal Team' && 'Team member assignments with clear roles and responsibilities'}
              {item === 'Communications' && 'Contact information, document storage location, and collaboration tools'}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        padding: '15px',
        marginTop: '20px'
      }}>
        <strong>Note:</strong> A separate writer's kick-off meeting is scheduled to discuss the approach to each major section and address any questions from the writing team.
      </div>
    </div>
  );

  const renderOutlineTab = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
        Proposal Outline & Compliance Matrix
      </h3>

      <div style={{
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <strong>Required for every proposal without exception!</strong>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>Compliance Matrix</h4>
          <p style={{ marginBottom: '10px' }}>
            A comprehensive table covering every proposal requirement. The Proposal Manager uses it as the primary tool to ensure overall proposal compliance.
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Maps all Section L & M requirements</li>
            <li>Tracks compliance status</li>
            <li>Assigns responsibility for each requirement</li>
            <li>Identifies page/section references</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>Proposal Outline</h4>
          <p style={{ marginBottom: '10px' }}>
            Covers the L & M criteria and topics that must be addressed. One outline is developed for every volume.
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Technical Volume outline</li>
            <li>Management Volume outline</li>
            <li>Past Performance Volume outline</li>
            <li>Price Volume outline</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>Proposal Template</h4>
          <p style={{ marginBottom: '10px' }}>
            Provides writers with guidelines for formatting to ensure consistency and compliance.
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Font specifications</li>
            <li>Margin requirements</li>
            <li>Page count limits</li>
            <li>Graphics standards</li>
            <li>Government template compliance (when applicable)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderRolesTab = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
        Roles & Responsibilities
      </h3>

      <div style={{
        backgroundColor: gmuColors.primaryGreen,
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '16px', marginBottom: '0' }}>
          Clear roles and responsibilities are critical for proposal success. The Proposal Manager maintains overall responsibility for compliance and schedule, regardless of prime/sub status.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>
            Proposal Manager
          </h4>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Responsible for proposal compliance and schedule</li>
            <li>Assigns volume leads and writers</li>
            <li>Main POC during Proposal Phase</li>
            <li>Leads daily stand-ups</li>
            <li>Resolves compliance questions and schedule deviations</li>
            <li>Manages color team reviews</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>
            Volume Leads
          </h4>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Understand compliance requirements for their volume</li>
            <li>Manage section writers</li>
            <li>Ensure schedule adherence</li>
            <li>Coordinate with Proposal Manager on issues</li>
            <li>Review and integrate sections</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>
            Writers
          </h4>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Understand their section requirements</li>
            <li>Meet all deadlines</li>
            <li>Participate in daily stand-ups</li>
            <li>Communicate blockers immediately</li>
            <li>Incorporate review feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCommunicationsTab = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
        Communications
      </h3>

      <div style={{
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <strong>Effective communication is essential for proposal success!</strong>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>
            SharePoint Proposal Site
          </h4>
          <p style={{ marginBottom: '10px' }}>
            Essential for configuration control and single source of truth. Reduces email traffic.
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Locked folder structure (same for every proposal)</li>
            <li>Role-based access controls for security</li>
            <li>Version control for all documents</li>
            <li>Centralized review comments</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>
            Access Control Roles
          </h4>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li><strong>Admin:</strong> Full control</li>
            <li><strong>Proposal Manager:</strong> Edit all content</li>
            <li><strong>Writers:</strong> Edit assigned sections</li>
            <li><strong>Reviewers:</strong> Read and comment only</li>
            <li><strong>Graphics Artists:</strong> Graphics folder access</li>
            <li><strong>Outside Users:</strong> Limited to specific folders</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>
            Daily Stand-ups
          </h4>
          <p style={{ marginBottom: '10px' }}>
            Led by Proposal Manager to ensure issues are addressed timely.
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>15-minute maximum duration</li>
            <li>Status updates from each writer</li>
            <li>Identify blockers</li>
            <li>Clarify requirements</li>
            <li>No detailed discussions (take offline)</li>
          </ul>
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '4px',
        padding: '15px'
      }}>
        <strong>Note:</strong> With proper controls, there should be no need for emails with dozens of people on cc. All questions go through the Proposal Manager.
      </div>
    </div>
  );

  const renderChecklistTab = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
        Master Proposal Checklist
      </h3>

      {Object.entries(masterChecklist).map(([category, items]) => (
        <div key={category} style={{
          backgroundColor: 'white',
          border: `2px solid ${gmuColors.primaryGreen}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{
            color: gmuColors.primaryGreen,
            marginBottom: '15px',
            textTransform: 'capitalize'
          }}>
            {category === 'kickoff' ? 'Kick-Off Meeting' :
             category === 'compliance' ? 'Compliance & Templates' :
             category === 'reviews' ? 'Color Team Reviews' :
             category === 'communications' ? 'Communications Setup' :
             'Production & Submission'}
          </h4>

          <div>
            {items.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: checkedItems[`${category}-${idx}`] ? '#e8f5e9' : '#f5f5f5',
                marginBottom: '5px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => toggleCheck(`${category}-${idx}`)}
              >
                <input
                  type="checkbox"
                  checked={checkedItems[`${category}-${idx}`] || false}
                  onChange={() => {}}
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <label style={{
                  cursor: 'pointer',
                  textDecoration: checkedItems[`${category}-${idx}`] ? 'line-through' : 'none',
                  color: checkedItems[`${category}-${idx}`] ? '#666' : '#333'
                }}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        backgroundColor: gmuColors.primaryGreen,
        color: 'white',
        padding: '15px',
        borderRadius: '4px',
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <strong>
          Checklist Progress: {
            Object.values(checkedItems).filter(v => v).length
          } / {
            Object.values(masterChecklist).flat().length
          } items completed
        </strong>
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
        Resources & References
      </h3>

      {/* Books Section */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '20px', fontSize: '20px' }}>
          📚 Essential Books & Publications
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {proposalResources.books.map((book, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              border: `1px solid ${gmuColors.primaryGreen}`,
              borderRadius: '8px',
              padding: '15px'
            }}>
              <h5 style={{ color: gmuColors.darkGreen, marginBottom: '8px' }}>{book.title}</h5>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                <strong>Author:</strong> {book.author} ({book.year})
              </p>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p style={{ fontSize: '12px', marginBottom: '10px' }}>{book.description}</p>
              <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '8px' }}>
                <strong style={{ fontSize: '12px' }}>Key Topics:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                  {book.keyTopics.map((topic, i) => (
                    <span key={i} style={{
                      backgroundColor: gmuColors.primaryGold,
                      color: gmuColors.primaryGreen,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px'
                    }}>
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Websites Section */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '20px', fontSize: '20px' }}>
          🌐 Key Websites & Online Resources
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {proposalResources.websites.map((site, idx) => (
            <div key={idx} style={{
              backgroundColor: '#f8f9fa',
              borderLeft: `4px solid ${gmuColors.primaryGold}`,
              padding: '15px',
              borderRadius: '4px'
            }}>
              <h5 style={{ color: gmuColors.darkGreen, marginBottom: '5px' }}>{site.name}</h5>
              <a href={`https://${site.url}`} target="_blank" rel="noopener noreferrer"
                style={{ color: '#007bff', fontSize: '13px', marginBottom: '8px', display: 'block' }}>
                {site.url}
              </a>
              <p style={{ fontSize: '12px', marginBottom: '10px' }}>{site.description}</p>
              <div>
                <strong style={{ fontSize: '12px' }}>Resources:</strong>
                <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
                  {site.resources.map((resource, i) => (
                    <li key={i} style={{ fontSize: '11px', marginBottom: '2px' }}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '20px', fontSize: '20px' }}>
          🛠️ Recommended Tools & Software
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {proposalResources.tools.map((category, idx) => (
            <div key={idx} style={{
              backgroundColor: 'white',
              border: `2px solid ${gmuColors.primaryGreen}`,
              borderRadius: '8px',
              padding: '20px'
            }}>
              <h5 style={{ color: gmuColors.primaryGreen, marginBottom: '15px' }}>{category.category}</h5>
              {category.tools.map((tool, i) => (
                <div key={i} style={{
                  borderBottom: i < category.tools.length - 1 ? '1px solid #e0e0e0' : 'none',
                  paddingBottom: '8px',
                  marginBottom: '8px'
                }}>
                  <strong style={{ fontSize: '13px', color: gmuColors.darkGreen }}>{tool.name}</strong>
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{tool.use}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Standards Section */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '20px', fontSize: '20px' }}>
          📋 Industry Standards & Compliance
        </h4>
        <div style={{ backgroundColor: 'white', border: `1px solid ${gmuColors.primaryGreen}`, borderRadius: '8px', padding: '20px' }}>
          {proposalResources.standards.map((standard, idx) => (
            <div key={idx} style={{
              borderBottom: idx < proposalResources.standards.length - 1 ? '1px solid #e0e0e0' : 'none',
              paddingBottom: '15px',
              marginBottom: '15px'
            }}>
              <h5 style={{ color: gmuColors.darkGreen, marginBottom: '5px' }}>{standard.name}</h5>
              <p style={{ fontSize: '13px', marginBottom: '5px' }}>{standard.description}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                <strong>Relevance:</strong> {standard.relevance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Training Section */}
      <div style={{ marginBottom: '40px' }}>
        <h4 style={{ color: gmuColors.primaryGreen, marginBottom: '20px', fontSize: '20px' }}>
          🎓 Training & Certification Programs
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {proposalResources.training.map((provider, idx) => (
            <div key={idx} style={{
              backgroundColor: '#e8f5e9',
              border: `1px solid ${gmuColors.primaryGreen}`,
              borderRadius: '8px',
              padding: '15px'
            }}>
              <h5 style={{ color: gmuColors.darkGreen, marginBottom: '8px' }}>{provider.provider}</h5>
              <a href={`https://${provider.website}`} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '12px', color: '#007bff', marginBottom: '10px', display: 'block' }}>
                {provider.website}
              </a>
              <strong style={{ fontSize: '12px' }}>Courses:</strong>
              <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
                {provider.courses.map((course, i) => (
                  <li key={i} style={{ fontSize: '11px', marginBottom: '2px' }}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScheduleTab = () => (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: gmuColors.darkGreen, marginBottom: '20px' }}>
        Proposal Schedule & Color Team Reviews
      </h3>

      <div style={{
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <strong>Schedule developed for every proposal without exception!</strong>
      </div>

      <div>
        {Object.entries(colorTeamReviews).map(([key, review]) => (
          <div key={key} style={{
            backgroundColor: 'white',
            border: `2px solid ${review.color}`,
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ color: review.color, margin: 0 }}>{review.name}</h4>
              <div style={{
                backgroundColor: review.color,
                color: 'white',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {review.completion} Complete
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <strong>Timing:</strong> {review.timing}
            </div>

            {review.critical && (
              <div style={{
                backgroundColor: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: '4px',
                padding: '10px',
                marginBottom: '15px'
              }}>
                <strong>⚠️ CRITICAL REVIEW</strong>
              </div>
            )}

            <p style={{ fontStyle: 'italic', marginBottom: '15px', color: '#666' }}>
              {review.description}
            </p>

            <div>
              <strong>Focus Areas:</strong>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                {review.focus.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: '4px',
        padding: '15px',
        marginTop: '20px'
      }}>
        <strong>Important:</strong> Reviewers must NOT be the writers! Independent review is critical for quality.
      </div>
    </div>
  );

  return (
    <div style={{
      backgroundColor: gmuColors.primaryGreen,
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '30px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '10px',
          borderRadius: '8px'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === tab.id ? gmuColors.primaryGold : 'white',
                color: activeTab === tab.id ? gmuColors.primaryGreen : gmuColors.primaryGreen,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          minHeight: '500px'
        }}>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'kickoff' && renderKickoffTab()}
          {activeTab === 'outline' && renderOutlineTab()}
          {activeTab === 'schedule' && renderScheduleTab()}
          {activeTab === 'roles' && renderRolesTab()}
          {activeTab === 'communications' && renderCommunicationsTab()}
          {activeTab === 'checklist' && renderChecklistTab()}
          {activeTab === 'resources' && renderResourcesTab()}
        </div>
      </div>
    </div>
  );
};

export default ProposalWorkflow;