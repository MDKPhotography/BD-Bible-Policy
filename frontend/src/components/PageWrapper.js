import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PageWrapper = ({ children, title, onBack }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'BD SOP', href: '#bd-sop' },
    { label: 'Capture Dashboard', href: '#capture-dashboard' },
    { label: 'Quad Charts', href: '#quad-charts' },
    { label: 'Gate Checklist', href: '#gate-checklist' },
    { label: 'Meeting Tracker', href: '#meeting-tracker' },
    { label: 'Win Themes', href: '#win-themes' },
    { label: 'Proposal Workflow', href: '#proposal-workflow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Navigation Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gmu-green ${
        scrollY > 50 ? 'shadow-lg py-2' : 'py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Home button on far left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onBack) onBack();
              window.location.hash = '';
            }}
            className="bg-gmu-gold text-gmu-green px-4 py-2 rounded-lg font-bold text-sm hover:bg-gmu-gold-secondary transition-all hover:scale-110 inline-block shadow-lg hover:shadow-xl"
            style={{
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 20px #FFCC33, 0 0 40px #FFCC33';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Home
          </a>

          {/* Other navigation items centered */}
          <div className="flex space-x-6 flex-wrap">
            {navigationItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-gmu-gold transition-all font-medium text-sm hover:scale-125 inline-block"
                style={{
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                }}
                onMouseEnter={(e) => {
                  e.target.style.textShadow = '0 0 20px #FFCC33, 0 0 40px #FFCC33';
                  e.target.style.transform = 'scale(1.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textShadow = 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Contact button on far right */}
          <a
            href="#contact"
            className="bg-gmu-gold text-gmu-green px-4 py-2 rounded-lg font-bold text-sm hover:bg-gmu-gold-secondary transition-all hover:scale-110 inline-block shadow-lg hover:shadow-xl"
            style={{
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 20px #FFCC33, 0 0 40px #FFCC33';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Page Title Section with GMU Branding */}
      <section className="relative bg-gmu-green text-white pt-32 pb-16">
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Small logo behind title */}
            <div className="relative inline-block">
              <img
                src="/images/Patriot Labs Green and Gold backgroundn removed.svg"
                alt="Patriot Labs Logo"
                className="absolute left-1/2 transform -translate-x-1/2 object-contain opacity-20"
                style={{
                  top: '-190px',
                  width: '480px',
                  height: '480px',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                }}
              />
              <h1 className="text-4xl font-bold relative z-10">
                <span className="text-gmu-gold">{title}</span>
              </h1>
              <div className="text-base mt-2 text-gray-200">
                GMU Business Development Excellence
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gmu-green text-white py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-300">
            © 2025 GMU Business Development. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageWrapper;