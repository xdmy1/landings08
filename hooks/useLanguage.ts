"use client"

import { useState, useEffect } from 'react'

type Language = 'en' | 'ro' | 'de' | 'fr' | 'es'

const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  MD: 'ro', RO: 'ro',
  DE: 'de', AT: 'de', CH: 'de',
  FR: 'fr', BE: 'fr', MC: 'fr',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es',
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language')
    if (saved && ['en', 'ro', 'de', 'fr', 'es'].includes(saved)) {
      setLanguage(saved as Language)
      return
    }

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const detected = COUNTRY_TO_LANGUAGE[data.country_code] || 'en'
        setLanguage(detected)
        localStorage.setItem('language', detected)
      })
      .catch(() => {
        setLanguage('en')
      })
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as Language)
    localStorage.setItem('language', newLanguage)
  }

  return { language, setLanguage: handleLanguageChange }
}
