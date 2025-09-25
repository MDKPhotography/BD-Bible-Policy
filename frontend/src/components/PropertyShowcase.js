import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PropertyShowcase = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [view3D, setView3D] = useState(false);

  const floors = [
    { id: 1, name: "Ground Floor", sqft: "5,000", available: true },
    { id: 2, name: "Second Floor", sqft: "4,500", available: true },
    { id: 3, name: "Third Floor", sqft: "4,500", available: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero with Video Background */}
      <div className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-6 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold text-white mb-4">
                BD-Bible Headquarters
              </h1>
              <p className="text-2xl text-white/90 mb-8">
                Modern workspace solutions for growing teams
              </p>
              <button
                onClick={() => setView3D(true)}
                className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
              >
                View 3D Tour
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Floor Selector */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Floor Plan Viewer */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Interactive Floor Plans</h2>
            <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
              {view3D ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">3D View Placeholder</p>
                  {/* Here you would integrate Three.js */}
                </div>
              ) : (
                <img
                  src={`/floor-${selectedFloor}.jpg`}
                  alt={`Floor ${selectedFloor}`}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setView3D(!view3D)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {view3D ? '2D View' : '3D View'}
              </button>
            </div>
          </div>

          {/* Floor Selector */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Spaces</h2>
            {floors.map((floor) => (
              <motion.div
                key={floor.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedFloor(floor.id)}
                className={`mb-4 p-6 rounded-lg cursor-pointer transition ${
                  selectedFloor === floor.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white hover:shadow-lg'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{floor.name}</h3>
                    <p className="text-sm opacity-75">{floor.sqft} sq ft</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    floor.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {floor.available ? 'Available' : 'Occupied'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid with Animations */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {['High-Speed Internet', 'Conference Rooms', 'Parking'].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold mb-3">{feature}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyShowcase;