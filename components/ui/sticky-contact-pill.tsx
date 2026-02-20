"use client";

import React from "react";
import Link from "next/link";

interface StickyContactPillProps {
  language: 'en' | 'ro' | 'de' | 'fr' | 'es';
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
    },
    de: {
      question: "Haben Sie ein Projekt?",
      contact: "Klick"
    },
    fr: {
      question: "Vous avez un projet ?",
      contact: "Clic"
    },
    es: {
      question: "Tienes un proyecto?",
      contact: "Clic"
    }
  };

  const t = text[language];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-0">
      <Link href="https://wa.me/37368327082" target="_blank" rel="noopener noreferrer">
        <div className="bg-cyan-950/60 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_25px_rgba(6,182,212,0.25),0_0_50px_rgba(6,182,212,0.1)] rounded-full p-2 sm:p-2.5 pl-4 sm:pl-5 flex items-center justify-between gap-10 hover:bg-cyan-950/70 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.35),0_0_60px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer group min-w-[280px] sm:min-w-0 w-[calc(100vw-2rem)] sm:w-auto max-w-[400px] sm:max-w-none">
          <span className="text-white text-sm font-medium truncate">
            {t.question}
          </span>
          <div className="bg-cyan-400/15 border border-cyan-400/30 rounded-full px-3 py-1.5 flex items-center gap-2 group-hover:bg-cyan-400/25 transition-all duration-300 flex-shrink-0">
            <span className="text-cyan-100 text-sm font-medium">
              {t.contact}
            </span>
            <div className="w-5 h-5 rounded-full bg-cyan-400/25 flex items-center justify-center group-hover:bg-cyan-400/40 transition-all duration-300">
              <svg className="w-3 h-3 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
