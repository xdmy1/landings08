"use client"

import { useState, useEffect } from 'react'

type Language = 'en' | 'ro' | 'de' | 'fr' | 'es'

const LANGS: Language[] = ['en', 'ro', 'de', 'fr', 'es']
const LANG_EVENT = 'landings-language-change'

const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  MD: 'ro', RO: 'ro',
  DE: 'de', AT: 'de', CH: 'de',
  FR: 'fr', BE: 'fr', MC: 'fr',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es',
}

function isLanguage(value: string | null): value is Language {
  return !!value && (LANGS as string[]).includes(value)
}

/* Every component on a page holds its own instance of this hook, so a change
   made in one (e.g. the nav switcher) is broadcast to all the others via a
   window event — the whole page translates instantly, no reload needed. */
export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const apply = (lang: Language) => {
      setLanguage(lang)
      document.documentElement.lang = lang
    }

    const saved = localStorage.getItem('language')
    if (isLanguage(saved)) {
      apply(saved)
    } else {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          const detected = COUNTRY_TO_LANGUAGE[data.country_code] || 'en'
          apply(detected)
          localStorage.setItem('language', detected)
          window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: detected }))
        })
        .catch(() => {
          apply('en')
        })
    }

    // same-page sync (nav switcher → page content, footer, pills…)
    const onLangEvent = (e: Event) => {
      const lang = (e as CustomEvent).detail
      if (isLanguage(lang)) apply(lang)
    }
    // cross-tab sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'language' && isLanguage(e.newValue)) apply(e.newValue)
    }

    window.addEventListener(LANG_EVENT, onLangEvent)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(LANG_EVENT, onLangEvent)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    if (!isLanguage(newLanguage)) return
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    document.documentElement.lang = newLanguage
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: newLanguage }))
  }

  return { language, setLanguage: handleLanguageChange }
}
