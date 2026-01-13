"use client"

import React, { useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                aceternity
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="#components"
                className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Components
              </Link>
              <Link
                href="#templates"
                className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Templates
              </Link>
              <Link
                href="#docs"
                className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Docs
              </Link>
              <Link
                href="#pricing"
                className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-200 transition-colors">
              Get started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-300 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-neutral-800">
            <Link
              href="#components"
              className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Components
            </Link>
            <Link
              href="#templates"
              className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Templates
            </Link>
            <Link
              href="#docs"
              className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Docs
            </Link>
            <Link
              href="#pricing"
              className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Pricing
            </Link>
            <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-200 transition-colors w-full mt-4">
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}