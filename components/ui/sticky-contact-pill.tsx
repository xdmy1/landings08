"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface StickyContactPillProps {
  language: 'en' | 'ro' | 'de' | 'fr' | 'es';
}

export const StickyContactPill = ({ language }: StickyContactPillProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = {
    en: { question: "Have a project?", contact: "Let's talk" },
    ro: { question: "Ai un proiect?", contact: "Hai sa vorbim" },
    de: { question: "Haben Sie ein Projekt?", contact: "Kontakt" },
    fr: { question: "Vous avez un projet ?", contact: "Parlons-en" },
    es: { question: "Tienes un proyecto?", contact: "Hablemos" }
  };

  const t = text[language];

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-5rem)] sm:w-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? '0px' : '16px'})`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Link href="mailto:contact@landings.md" target="_blank" rel="noopener noreferrer">
        <div className="glass rounded-full shadow-[0_18px_50px_-18px_rgba(0,0,0,0.6)] pl-6 pr-2 py-2 flex items-center justify-between sm:justify-start sm:gap-5 transition-transform duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer group">
          <span className="text-ink-muted text-[13px] tracking-wide">{t.question}</span>
          <span className="bg-amber text-[#0A0A0A] rounded-full px-4 py-2 text-[13px] font-medium flex items-center gap-2 transition-colors group-hover:bg-amber-light">
            {t.contact}
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
};
