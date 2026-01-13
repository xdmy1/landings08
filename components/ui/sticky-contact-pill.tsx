"use client";

import React from "react";
import Link from "next/link";

interface StickyContactPillProps {
  language: 'en' | 'ro';
}

export const StickyContactPill = ({ language }: StickyContactPillProps) => {
  const text = {
    en: {
      question: "Do you have a project?",
      contact: "Click"
    },
    ro: {
      question: "Ai un proiect?", 
      contact: "Click"
    }
  };

  const t = text[language];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-0">
      <Link href="https://wa.me/37368327082" target="_blank" rel="noopener noreferrer">
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-full px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between gap-10 hover:bg-black/90 hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer group min-w-[280px] sm:min-w-0 w-[calc(100vw-2rem)] sm:w-auto max-w-[400px] sm:max-w-none">
          <span className="text-white text-sm font-medium truncate">
            {t.question}
          </span>
          <div className="bg-white/10 border border-white/20 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center gap-2 group-hover:bg-white/15 transition-all duration-300 flex-shrink-0">
            <span className="text-white text-sm font-medium">
              {t.contact}
            </span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};