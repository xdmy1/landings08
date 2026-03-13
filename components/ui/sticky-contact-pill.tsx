"use client";

import React from "react";
import Link from "next/link";

interface StickyContactPillProps {
  language: 'en' | 'ro' | 'de' | 'fr' | 'es';
}

export const StickyContactPill = ({ language }: StickyContactPillProps) => {
  const text = {
    en: { question: "Have a project?", contact: "Let's talk" },
    ro: { question: "Ai un proiect?", contact: "Hai sa vorbim" },
    de: { question: "Haben Sie ein Projekt?", contact: "Kontakt" },
    fr: { question: "Vous avez un projet ?", contact: "Parlons-en" },
    es: { question: "Tienes un proyecto?", contact: "Hablemos" }
  };

  const t = text[language];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-5rem)] sm:w-auto">
      <Link href="mailto:contact@landings.md" target="_blank" rel="noopener noreferrer">
        <div className="bg-surface/90 backdrop-blur-sm border border-divider shadow-card px-5 py-3 flex items-center justify-between sm:justify-start sm:gap-6 hover:border-amber/40 transition-all duration-300 cursor-pointer group">
          <span className="text-ink-muted text-sm tracking-wide">
            {t.question}
          </span>
          <span className="text-amber text-sm font-medium tracking-wide flex items-center gap-2 group-hover:text-amber-light transition-colors">
            {t.contact}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
};
