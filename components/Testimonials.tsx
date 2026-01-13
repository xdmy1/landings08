"use client"

import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    company: "Stripe",
    avatar: "/api/placeholder/64/64",
    content: "The components are beautifully designed and saved me weeks of development time. The animations are smooth and the code is clean.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Design System Lead",
    company: "Vercel",
    avatar: "/api/placeholder/64/64",
    content: "Aceternity UI has become our go-to component library. The quality is outstanding and it integrates perfectly with our design system.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Product Designer",
    company: "Linear",
    avatar: "/api/placeholder/64/64",
    content: "I love how easy it is to customize these components. The documentation is excellent and the support is top-notch.",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Full Stack Developer",
    company: "Notion",
    avatar: "/api/placeholder/64/64",
    content: "These components helped us ship our landing page 3x faster. The animations add the perfect touch of polish to our UI.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Tech Lead",
    company: "Figma",
    avatar: "/api/placeholder/64/64",
    content: "The attention to detail is incredible. Every component feels carefully crafted and performs beautifully across all devices.",
    rating: 5
  },
  {
    name: "Lisa Zhang",
    role: "UI Engineer",
    company: "Supabase",
    avatar: "/api/placeholder/64/64",
    content: "Finally found a component library that matches the quality of our design team's work. Highly recommend!",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
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
            Loved by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              developers
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            See what developers are saying about our components
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-neutral-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-neutral-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Components", value: "40+" },
            { label: "Downloads", value: "100K+" },
            { label: "GitHub Stars", value: "12K+" },
            { label: "Happy Users", value: "5K+" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
    </section>
  )
}