"use client"

import React from 'react'
import { motion } from 'framer-motion'

const components = [
  {
    title: "Spotlight",
    description: "Spotlight effect to highlight content",
    gradient: "from-blue-400 to-purple-600"
  },
  {
    title: "Aurora Background",
    description: "Dynamic aurora background effect",
    gradient: "from-green-400 to-blue-500"
  },
  {
    title: "Floating Navbar",
    description: "Elegant floating navigation component",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    title: "Animated Testimonials",
    description: "Beautiful testimonial cards with animations",
    gradient: "from-orange-400 to-red-500"
  },
  {
    title: "3D Card Effect",
    description: "Interactive 3D card hover effects",
    gradient: "from-cyan-400 to-blue-600"
  },
  {
    title: "Infinite Moving Cards",
    description: "Smooth infinite scrolling card animations",
    gradient: "from-pink-400 to-purple-600"
  }
]

export function ComponentShowcase() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Beautiful{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              components
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Copy paste the most trending components and use them in your websites without having to worry about styling and animations.
          </p>
        </motion.div>

        {/* Components grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <motion.div
              key={component.title}
              className="group relative bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-neutral-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Card background with gradient */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${component.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Card content */}
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${component.gradient} mb-4 flex items-center justify-center`}>
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{component.title}</h3>
                <p className="text-neutral-400">{component.description}</p>
                
                {/* Preview button */}
                <div className="mt-4 flex items-center text-sm text-neutral-300 group-hover:text-white transition-colors">
                  <span>Preview</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* View all components button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-neutral-200 transition-all duration-200 shadow-lg hover:shadow-xl">
            View all 40+ components
          </button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
    </section>
  )
}