import React, { useEffect } from 'react';

const BDBible = () => {
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
- Section coordination
- Final production

Business Development Lead
- Market research
- Opportunity identification
- Customer relationship management
- Competition analysis`
            }
          ]
        }
      ]
    },
    process: {
      title: "BD Process",
      content: "Stage Gate process from identification to award",
      documents: [
        {
          id: 'stage-gates',
          title: 'Stage Gate Process',
          sections: [
            {
              title: 'Gate 0 - Opportunity Identification',
              content: `Key Activities:
☐ Market research complete
☐ Customer need identified
☐ Initial competition assessment
☐ Resource requirements estimated
☐ BD lead assigned
☐ Opportunity entered in pipeline

Decision Criteria:
• Strategic alignment
• Resource availability
• Win probability >30%`
            },
            {
              title: 'Gate 1 - Opportunity Assessment',
              content: `Key Activities:
☐ Customer engagement initiated
☐ Competitive analysis complete
☐ Initial solution approach
☐ Team identification started
☐ Rough ROM developed
☐ Win themes identified

Decision Criteria:
• Customer budget confirmed
• Technical approach viable
• Win probability >40%`
            },
            {
              title: 'Gate 2 - Capture Planning',
              content: `Key Activities:
☐ Capture plan developed
☐ Solution architecture defined
☐ Team commitments secured
☐ Price-to-win analysis
☐ Win strategy finalized
☐ Customer intimacy established

Decision Criteria:
• Clear differentiators
• Competitive solution
• Win probability >50%`
            },
            {
              title: 'Gate 3 - Proposal Development',
              content: `Key Activities:
☐ Proposal outline complete
☐ Writing assignments made
☐ Pricing strategy approved
☐ Graphics developed
☐ Pink team review
☐ Red team review

Decision Criteria:
• Compliant response
• Compelling solution
• Competitive price`
            },
            {
              title: 'Gate 4 - Proposal Submission',
              content: `Key Activities:
☐ Gold team review
☐ Final pricing approved
☐ Production complete
☐ Quality check done
☐ Proposal submitted
☐ Orals preparation (if required)

Decision Criteria:
• All requirements met
• Risk mitigation complete
• Executive approval`
            }
          ]
        }
      ]
    },
    metrics: {
      title: "BD Metrics",
      content: "Key performance indicators and tracking",
      documents: [
        {
          id: 'kpis',
          title: 'Key Performance Indicators',
          sections: [
            {
              title: 'Pipeline Metrics',
              content: `• Total pipeline value
• Qualified pipeline (>Gate 2)
• Pipeline coverage ratio (3:1 minimum)
• Average deal size
• Pipeline velocity`
            },
            {
              title: 'Win Rate Metrics',
              content: `• Overall win rate (target: 45%)
• Competitive win rate
• Sole source conversion rate
• Recompete win rate (target: 90%)
• Prime vs. sub win rates`
            },
            {
              title: 'Activity Metrics',
              content: `• Customer touches per month
• Proposals submitted
• White papers delivered
• Industry day participation
• Teaming agreements executed`
            }
          ]
        }
      ]
    },
    tools: {
      title: "Tools & Templates",
      content: "Standard templates and resources",
      documents: [
        {
          id: 'templates',
          title: 'BD Templates',
          sections: [
            {
              title: 'Capture Plan Template',
              content: `1. Executive Summary
2. Opportunity Overview
3. Customer Analysis
4. Competitive Assessment
5. Solution Approach
6. Win Strategy
7. Price to Win
8. Risk Assessment
9. Resource Requirements
10. Action Items & Schedule`
            },
            {
              title: 'SWOT Analysis Template',
              content: `Strengths:
• GMU brand and reputation
• Academic expertise
• Research capabilities
• Location advantage

Weaknesses:
• Limited past performance
• Resource constraints
• Clearance limitations

Opportunities:
• Growing research budget
• Emerging technology needs
• Partnership potential

Threats:
• Established competitors
• Budget uncertainty
• Procurement changes`
            }
          ]
        }
      ]
    },
    resources: {
      title: "Resources",
      content: "Key contacts and information sources",
      documents: [
        {
          id: 'contacts',
          title: 'Key Contacts',
          sections: [
            {
              title: 'Internal Contacts',
              content: `BD Leadership:
• Kammy Sanghera - VP
• David Ihrie - BD Director
• Patt Cobb - Operations

Support Functions:
• Contracts/Procurement
• HR/Recruiting
• Finance
• IT/Security
• Facilities`
            },
            {
              title: 'External Resources',
              content: `Information Sources:
• SAM.gov
• GovWin IQ
• Bloomberg Government
• FedBizOpps

Industry Partners:
• Primes for subcontracting
• Small business partners
• Academic institutions
• FFRDCs`
            }
          ]
        }
      ]
    },
    playbooks: {
      title: "Playbooks",
      content: "Specific strategies for different scenarios",
      documents: [
        {
          id: 'playbook-types',
          title: 'BD Playbooks',
          sections: [
            {
              title: 'Recompete Playbook',
              content: `Timeline: Start 18 months before RFP

Actions:
1. Performance review and lessons learned
2. Customer satisfaction assessment
3. Incumbent advantage analysis
4. Early customer engagement
5. Innovation insertion
6. Team optimization
7. Past performance updates
8. Price competitiveness check`
            },
            {
              title: 'New Business Playbook',
              content: `Timeline: 12-24 month pursuit

Actions:
1. Market research and analysis
2. Customer discovery meetings
3. Capability development
4. Team formation
5. Discriminator development
6. Proof of concept demos
7. White paper submissions
8. Relationship building`
            },
            {
              title: 'Small Business Playbook',
              content: `Focus Areas:
1. SBIR/STTR opportunities
2. Small business set-asides
3. Subcontracting opportunities
4. Mentor-protege relationships
5. Joint ventures
6. Teaming agreements`
            }
          ]
        }
      ]
    },
    training: {
      title: "Training",
      content: "BD training and development resources",
      documents: [
        {
          id: 'training-program',
          title: 'BD Training Program',
          sections: [
            {
              title: 'Core Competencies',
              content: `Essential Skills:
• Capture management
• Proposal writing
• Pricing strategies
• Customer engagement
• Competitive intelligence
• Teaming and partnerships
• Contract vehicles
• Compliance requirements`
            },
            {
              title: 'Training Resources',
              content: `Internal Training:
• Monthly BD meetings
• Capture reviews
• Lessons learned sessions
• Mentoring program

External Training:
• APMP certification
• Shipley training
• Industry conferences
• Webinars and workshops`
            }
          ]
        }
      ]
    },
    transition: {
      title: "Award & Transition",
      content: "Post-award transition to operations",
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

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const yOffset = -100; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Add smooth scroll behavior on load
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div style={{
      backgroundColor: gmuColors.primaryGreen,
      minHeight: '100vh',
      paddingTop: '20px',
      paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Navigation Buttons */}
        <div style={{
          position: 'sticky',
          top: '80px',
          backgroundColor: 'rgba(0, 102, 51, 0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 30,
          padding: '20px',
          marginBottom: '30px',
          borderBottom: `3px solid ${gmuColors.primaryGold}`,
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(sections).map(key => (
            <button
              key={key}
              onClick={() => scrollToSection(key)}
              style={{
                padding: '10px 20px',
                backgroundColor: gmuColors.primaryGold,
                color: gmuColors.primaryGreen,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = gmuColors.secondaryGold;
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = gmuColors.primaryGold;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              {sections[key].title}
            </button>
          ))}
        </div>
      </div>

      {/* All Sections Expanded */}
      {Object.entries(sections).map(([key, section]) => (
        <div
          key={key}
          id={`section-${key}`}
          style={{
            marginBottom: '60px',
            scrollMarginTop: '100px'
          }}
        >
          {/* Section Header */}
          <div style={{
            backgroundColor: gmuColors.primaryGreen,
            color: 'white',
            padding: '20px 30px',
            borderRadius: '8px 8px 0 0',
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{
              fontSize: '28px',
              margin: 0,
              color: gmuColors.primaryGold
            }}>
              {section.title}
            </h2>
            <p style={{
              fontSize: '16px',
              margin: '10px 0 0 0',
              opacity: 0.9
            }}>
              {section.content}
            </p>
          </div>

          {/* Section Documents */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
            border: `2px solid ${gmuColors.primaryGreen}`,
            borderTop: 'none'
          }}>
            {section.documents.map(doc => (
              <div key={doc.id} style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '22px',
                  color: gmuColors.darkGreen,
                  borderBottom: `2px solid ${gmuColors.primaryGold}`,
                  paddingBottom: '10px',
                  marginBottom: '20px'
                }}>
                  {doc.title}
                </h3>

                {doc.sections.map((subSection, idx) => (
                  <div key={idx} style={{
                    marginBottom: '25px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderLeft: `4px solid ${gmuColors.primaryGold}`,
                    borderRadius: '4px'
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      color: gmuColors.primaryGreen,
                      marginBottom: '15px',
                      fontWeight: 'bold'
                    }}>
                      {subSection.title}
                    </h4>
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '1.8',
                      color: '#333',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {subSection.content}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

        {/* Back to Top Button */}
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              padding: '12px 24px',
              backgroundColor: gmuColors.primaryGold,
              color: gmuColors.primaryGreen,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = gmuColors.secondaryGold;
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = gmuColors.primaryGold;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default BDBible;