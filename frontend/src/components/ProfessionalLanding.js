import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const ProfessionalLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ParallaxProvider>
      <div className="overflow-x-hidden">
        {/* Fixed Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white shadow-lg py-2' : 'bg-transparent py-6'
        }`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className={`text-2xl font-bold transition-colors ${
              scrollY > 50 ? 'text-gray-900' : 'text-white'
            }`}>
              BD-Bible
            </div>
            <div className="hidden md:flex space-x-8">
              {['Features', 'Spaces', 'Gallery', 'Contact'].map(item => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`transition-colors ${
                    scrollY > 50 ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero with Parallax Background */}
        <section className="relative h-screen">
          <Parallax speed={-20}>
            <div 
              className="absolute inset-0 h-[120vh]"
              style={{
                backgroundImage: 'url(https://source.unsplash.com/1600x900/?modern,office)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          
          <div className="relative h-full flex items-center justify-center text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-7xl font-bold mb-6">
                Transform Your BD Process
              </h1>
              <p className="text-2xl mb-8 max-w-2xl mx-auto">
                Intelligent knowledge management for modern business development
              </p>
              <div className="flex gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
                  Schedule Tour
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all">
                  View Spaces
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
              {[
                { icon: '🏢', title: 'Modern Spaces', desc: 'Fully furnished offices with premium amenities' },
                { icon: '🚀', title: 'High-Speed Network', desc: 'Gigabit internet and enterprise networking' },
                { icon: '🤝', title: 'Community', desc: 'Connect with innovative businesses' },
                { icon: '🎯', title: 'Flexible Terms', desc: 'Month-to-month or long-term leases' },
                { icon: '☕', title: 'Amenities', desc: 'Coffee bar, lounge, and recreation areas' },
                { icon: '🔒', title: '24/7 Access', desc: 'Secure keycard entry anytime' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
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

export default ProfessionalLanding;
