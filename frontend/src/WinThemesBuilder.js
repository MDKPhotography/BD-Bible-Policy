import React, { useState } from 'react';

const WinThemesBuilder = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState('');
  const [features, setFeatures] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [discriminators, setDiscriminators] = useState([]);
  const [winThemes, setWinThemes] = useState([]);

  const [newItem, setNewItem] = useState({
    feature: '',
    benefit: '',
    discriminator: '',
    winTheme: ''
  });

  const opportunities = [
    "DISA Cyber Security Support",
    "Navy SPAWAR Engineering Services",
    "Air Force Base Operations"
  ];

  const exampleFeatures = [
    { id: 1, text: "24/7 Cyber Security Operations Center", category: "Capability" },
    { id: 2, text: "Certified CMMI Level 3 processes", category: "Process" },
    { id: 3, text: "PhD-level cyber security experts", category: "People" },
    { id: 4, text: "Proprietary threat detection AI tools", category: "Tools" }
  ];

  const exampleBenefits = [
    { id: 1, text: "Reduces incident response time by 60%", linkedFeature: 1 },
    { id: 2, text: "Ensures consistent quality delivery", linkedFeature: 2 },
    { id: 3, text: "Provides cutting-edge threat analysis", linkedFeature: 3 },
    { id: 4, text: "Detects threats 3x faster than industry standard", linkedFeature: 4 }
  ];

  const addFeature = () => {
    if (newItem.feature) {
      setFeatures([...features, {
        id: features.length + 1,
        text: newItem.feature,
        category: 'Custom'
      }]);
      setNewItem({ ...newItem, feature: '' });
    }
  };

  const addBenefit = () => {
    if (newItem.benefit) {
      setBenefits([...benefits, {
        id: benefits.length + 1,
        text: newItem.benefit
      }]);
      setNewItem({ ...newItem, benefit: '' });
    }
  };

  const addDiscriminator = () => {
    if (newItem.discriminator) {
      setDiscriminators([...discriminators, {
        id: discriminators.length + 1,
        text: newItem.discriminator
      }]);
      setNewItem({ ...newItem, discriminator: '' });
    }
  };

  const addWinTheme = () => {
    if (newItem.winTheme) {
      setWinThemes([...winThemes, {
        id: winThemes.length + 1,
        text: newItem.winTheme,
        opportunity: selectedOpportunity
      }]);
      setNewItem({ ...newItem, winTheme: '' });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Win Themes Builder</h2>
      
      {/* Opportunity Selector */}
      <div style={{ marginBottom: '30px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Select Opportunity:</label>
        <select 
          value={selectedOpportunity}
          onChange={(e) => setSelectedOpportunity(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', width: '300px' }}
        >
          <option value="">-- Select Opportunity --</option>
          {opportunities.map(opp => (
            <option key={opp} value={opp}>{opp}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {/* Features Section */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Features (People, Process, Tools)</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Add a feature..."
              value={newItem.feature}
              onChange={(e) => setNewItem({ ...newItem, feature: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addFeature()}
              style={{ width: '70%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
            />
            <button 
              onClick={addFeature}
              style={{
                marginLeft: '10px',
                padding: '8px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>Examples:</strong>
            {exampleFeatures.map(feat => (
              <div key={feat.id} style={{ 
                padding: '8px', 
                margin: '5px 0', 
                backgroundColor: '#e7f3ff',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                <span style={{ 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '3px',
                  fontSize: '11px',
                  marginRight: '8px'
                }}>
                  {feat.category}
                </span>
                {feat.text}
              </div>
            ))}
          </div>

          {features.length > 0 && (
            <div>
              <strong>Your Features:</strong>
              {features.map(feat => (
                <div key={feat.id} style={{ 
                  padding: '8px', 
                  margin: '5px 0', 
                  backgroundColor: '#d4edda',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  {feat.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>Benefits (Value to Client)</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Add a benefit..."
              value={newItem.benefit}
              onChange={(e) => setNewItem({ ...newItem, benefit: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
              style={{ width: '70%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
            />
            <button 
              onClick={addBenefit}
              style={{
                marginLeft: '10px',
                padding: '8px 15px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>Examples:</strong>
            {exampleBenefits.map(ben => (
              <div key={ben.id} style={{ 
                padding: '8px', 
                margin: '5px 0', 
                backgroundColor: '#d4edda',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                ✓ {ben.text}
              </div>
            ))}
          </div>

          {benefits.length > 0 && (
            <div>
              <strong>Your Benefits:</strong>
              {benefits.map(ben => (
                <div key={ben.id} style={{ 
                  padding: '8px', 
                  margin: '5px 0', 
                  backgroundColor: '#e7f3ff',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  ✓ {ben.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discriminators Section */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#ffc107', marginBottom: '15px' }}>Discriminators (Only RPRC)</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Add a discriminator..."
              value={newItem.discriminator}
              onChange={(e) => setNewItem({ ...newItem, discriminator: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addDiscriminator()}
              style={{ width: '70%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
            />
            <button 
              onClick={addDiscriminator}
              style={{
                marginLeft: '10px',
                padding: '8px 15px',
                backgroundColor: '#ffc107',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>

          <div style={{ 
            padding: '10px', 
            backgroundColor: '#fff3cd', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '13px'
          }}>
            ⚠️ <strong>Remember:</strong> Discriminators must be unique to RPRC. Avoid mentioning competitors by name.
          </div>

          {discriminators.map(disc => (
            <div key={disc.id} style={{ 
              padding: '8px', 
              margin: '5px 0', 
              backgroundColor: '#fff9e6',
              borderRadius: '4px',
              fontSize: '14px',
              borderLeft: '4px solid #ffc107'
            }}>
              ★ {disc.text}
            </div>
          ))}
        </div>

        {/* Win Themes Section */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>Win Themes (Why RPRC?)</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <textarea
              placeholder="Craft a win theme combining hot buttons + features + benefits..."
              value={newItem.winTheme}
              onChange={(e) => setNewItem({ ...newItem, winTheme: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #ced4da',
                minHeight: '60px',
                resize: 'vertical'
              }}
            />
            <button 
              onClick={addWinTheme}
              style={{
                marginTop: '10px',
                padding: '8px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              disabled={!selectedOpportunity}
            >
              Add Win Theme
            </button>
          </div>

          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f8d7da', 
            borderRadius: '4px',
            marginBottom: '15px',
            fontSize: '13px'
          }}>
            <strong>Formula:</strong> Client Hot Button + Our Feature + Client Benefit = Win Theme
          </div>

          {winThemes.filter(wt => wt.opportunity === selectedOpportunity).map(theme => (
            <div key={theme.id} style={{ 
              padding: '10px', 
              margin: '10px 0', 
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              borderLeft: '4px solid #dc3545'
            }}>
              <strong>"{theme.text}"</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Win Theme Examples */}
      <div style={{ 
        backgroundColor: '#e8f4f8', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #bee5eb'
      }}>
        <h4 style={{ marginBottom: '15px' }}>Win Theme Examples (from Capture Plan)</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>"RPRC's 24/7 Cyber SOC with PhD-level experts delivers the rapid response times DISA requires, reducing incident resolution by 60%."</li>
          <li>"Our proven CMMI Level 3 processes ensure the consistent, high-quality delivery that Navy SPAWAR demands for mission-critical systems."</li>
          <li>"RPRC's proprietary AI threat detection tools identify vulnerabilities 3x faster, protecting your networks before threats materialize."</li>
        </ul>
      </div>
    </div>
  );
};

export default WinThemesBuilder;
