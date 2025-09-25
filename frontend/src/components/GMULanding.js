import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import {
  BookOpenIcon,
  ChartBarIcon,
  LockClosedIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  CpuChipIcon
} from '@heroicons/react/24/solid';

const GMULanding = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      Icon: BookOpenIcon,
      title: 'Knowledge Base',
      desc: 'Centralized BD documentation',
      color: 'text-gmu-green'
    },
    {
      Icon: CpuChipIcon,
      title: 'Process Automation',
      desc: 'Streamlined workflows',
      color: 'text-gmu-gold'
    },
    {
      Icon: ChartBarIcon,
      title: 'Analytics',
      desc: 'Real-time insights',
      color: 'text-gmu-dark-green'
    },
    {
      Icon: LockClosedIcon,
      title: 'Secure Access',
      desc: 'Enterprise security',
      color: 'text-gmu-green'
    },
    {
      Icon: RocketLaunchIcon,
      title: 'Fast Deploy',
      desc: 'Docker containerization',
      color: 'text-gmu-gold'
    },
    {
      Icon: UserGroupIcon,
      title: 'Collaboration',
      desc: 'Team synchronization',
      color: 'text-gmu-dark-green'
    }
  ];

  return (
    <ParallaxProvider>
      <div className="overflow-x-hidden">
        {/* Navigation - GMU Green background */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-gradient-to-r from-gmu-green to-gmu-dark-green shadow-lg py-2' : 'bg-gradient-to-r from-gmu-green to-gmu-dark-green py-6'
        }`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Home button on far left */}
            <a
              href="#home"
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
              {[
                'BD SOP',
                'Capture Dashboard',
                'Quad Charts',
                'Gate Checklist',
                'Meeting Tracker',
                'Win Themes',
                'Proposal Workflow'
              ].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
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
                  {item}
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

        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-gmu-green to-gmu-dark-green">
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative h-full flex items-center justify-center text-center text-white pt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Container for logo and text */}
              <div className="relative flex flex-col items-center" style={{ perspective: '1000px' }}>
                {/* Logo - positioned at top, stays visible with 3D effect */}
                <motion.img
                  src="/images/Patriot Labs Green and Gold backgroundn removed.svg"
                  alt="Patriot Labs Logo"
                  className="w-[54rem] h-[54rem] object-contain absolute -top-[15rem] drop-shadow-2xl"
                  initial={{ scale: 0, rotateY: -180, rotateX: -20 }}
                  animate={{ scale: 1, rotateY: 0, rotateX: 0 }}
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  style={{
                    opacity: 0.6,
                    zIndex: 0,
                    transformStyle: 'preserve-3d',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                  }}
                />

                {/* Text overlapping bottom half of logo with 3D effect */}
                <motion.h1
                  className="text-7xl font-bold mb-6 relative z-10 mt-[12rem]"
                  initial={{ rotateX: -30, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateX: -5,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    textShadow: `
                      3px 3px 0 rgba(0, 102, 51, 0.3),
                      6px 6px 0 rgba(0, 102, 51, 0.2),
                      9px 9px 0 rgba(0, 102, 51, 0.1),
                      0 0 40px rgba(255, 204, 51, 0.5)
                    `
                  }}
                >
                  <span className="text-gmu-gold inline-block">Business Development</span>
                  <br />
                  <span className="text-white inline-block">Excellence</span>
                </motion.h1>
              </div>
              <p className="text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
                GMU's comprehensive BD knowledge management system
              </p>
              <div className="flex justify-center">
                <button className="border-2 border-gmu-gold text-gmu-gold hover:bg-gmu-gold hover:text-gmu-green px-8 py-4 rounded-lg text-lg font-bold transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg className="w-6 h-10 text-white" fill="none" stroke="currentColor">
              <path d="M3 6L12 15L21 6" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
        </section>

        {/* Features Section with Stagger Animation */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Premium Features
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="mb-4">
                    <feature.Icon
                      className={`w-12 h-12 ${feature.color} group-hover:text-gmu-gold-secondary transition-colors`}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Floor Plans Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6">Interactive Floor Plans</h2>
                <p className="text-gray-600 mb-8">
                  Explore our spaces with interactive 3D tours and detailed floor plans.
                  Find the perfect space for your team.
                </p>
                <div className="space-y-4">
                  {[1, 2, 3].map(floor => (
                    <div
                      key={floor}
                      className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold">Floor {floor}</h3>
                          <p className="text-gray-500">5,000 - 10,000 sq ft available</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                          View 3D
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-white rounded-lg shadow-2xl p-8 h-96"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-200 rounded-lg h-full flex items-center justify-center">
                  <p className="text-gray-500">3D Tour Viewer</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <motion.div
                  key={i}
                  className="relative group overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={`https://source.unsplash.com/400x400/?office,modern&${i}`}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded">View</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join our community of innovative businesses
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
                Schedule a Tour Today
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </ParallaxProvider>
  );
};

export default GMULanding;