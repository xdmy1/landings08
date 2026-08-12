"use client"

import React from 'react'

/* Hand-built UI mockups of real systems we shipped. Pure CSS/JSX — no
   screenshots of private client panels, no client data. Microcopy stays in
   Romanian on purpose: these render as authentic product UI. */

const P = {
  panel: '#121212',
  panelSoft: '#161616',
  inset: '#111111',
  green: '#7FB069',
}

/* ── DAVO.MD — seat-map booking ─────────────────────────────── */
export function SeatPickerMock({ className = "" }: { className?: string }) {
  const occupied = new Set(['1A', '1B', '2C', '2D', '3A', '4B', '4D', '5A', '5B', '6C'])
  const selected = '3C'
  const rows = [1, 2, 3, 4, 5, 6]

  const seat = (id: string) => {
    if (id === selected) return (
      <div key={id} className="relative w-6 h-6 md:w-7 md:h-7 bg-amber text-[#0A0A0A] text-[8px] md:text-[9px] font-semibold flex items-center justify-center rounded-[3px]">
        {id}
        <span className="absolute -inset-1 border border-amber/60 rounded-[5px] animate-pulse pointer-events-none" />
      </div>
    )
    if (occupied.has(id)) return (
      <div key={id} className="w-6 h-6 md:w-7 md:h-7 rounded-[3px] opacity-80" style={{ background: '#242424' }} />
    )
    return (
      <div key={id} className="w-6 h-6 md:w-7 md:h-7 border border-divider/70 rounded-[3px] text-[8px] md:text-[9px] text-ink-light flex items-center justify-center">
        {id}
      </div>
    )
  }

  return (
    <div className={`p-4 md:p-6 text-left ${className}`} style={{ background: P.inset }}>
      {/* route header */}
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <div>
          <p className="text-ink text-[12px] md:text-[13px] font-medium">Chisinau &rarr; Munchen</p>
          <p className="text-ink-light text-[9px] md:text-[10px] font-mono mt-0.5">Vineri, 22 Aug &middot; 14:00</p>
        </div>
        <span className="text-[8px] md:text-[9px] font-mono tracking-[0.15em] uppercase text-amber border border-amber/30 px-2 py-1">Alege locul</span>
      </div>

      <div className="flex gap-4 md:gap-6">
        {/* seat grid */}
        <div className="p-3 md:p-4 border border-divider/50" style={{ background: P.panel }}>
          <div className="space-y-1.5 md:space-y-2">
            {rows.map((r) => (
              <div key={r} className="flex items-center gap-1.5 md:gap-2">
                {seat(`${r}A`)}
                {seat(`${r}B`)}
                <span className="w-4 md:w-5 text-center text-[8px] text-ink-light/50 font-mono">{r}</span>
                {seat(`${r}C`)}
                {seat(`${r}D`)}
              </div>
            ))}
          </div>
        </div>

        {/* legend + summary */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
          <div className="space-y-1.5 md:space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 border border-divider/70 rounded-[2px] flex-shrink-0" />
              <span className="text-ink-muted text-[9px] md:text-[10px]">Liber</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-[2px] flex-shrink-0" style={{ background: '#242424' }} />
              <span className="text-ink-muted text-[9px] md:text-[10px]">Ocupat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber rounded-[2px] flex-shrink-0" />
              <span className="text-ink-muted text-[9px] md:text-[10px]">Locul tau</span>
            </div>
          </div>

          <div className="border border-divider/50 p-2.5 md:p-3 mt-3" style={{ background: P.panel }}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-ink-muted text-[9px] md:text-[10px]">Locul 3C</span>
              <span className="text-ink font-serif text-sm md:text-base">&euro;85</span>
            </div>
            <div className="mt-2 bg-amber text-[#0A0A0A] text-center text-[9px] md:text-[10px] font-medium py-1.5">
              Confirma rezervarea
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── INTER-BUS.MD — invoicing / stock / accounting panel ────── */
export function ErpDashboardMock({ className = "" }: { className?: string }) {
  const invoices = [
    { nr: 'F-1042', client: 'Reisen GmbH', suma: '€640', ok: true },
    { nr: 'F-1041', client: 'TransBaltic OU', suma: '€1,280', ok: true },
    { nr: 'F-1040', client: 'AutoParts SRL', suma: '€395', ok: false },
  ]
  return (
    <div className={`p-4 md:p-6 text-left ${className}`} style={{ background: P.inset }}>
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-ink text-[12px] md:text-[13px] font-medium">Panou administrare</p>
        <span className="text-[8px] md:text-[9px] font-mono text-ink-light border border-divider/50 px-2 py-1">August 2026</span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
        {[
          { l: 'Vanzari azi', v: '€2,340', d: '+12%' },
          { l: 'Profit luna', v: '€8,120', d: '+18%' },
          { l: 'Facturi emise', v: '47', d: 'auto' },
        ].map((k) => (
          <div key={k.l} className="border border-divider/50 p-2 md:p-3" style={{ background: P.panel }}>
            <p className="text-ink-light text-[8px] md:text-[9px] font-mono uppercase tracking-wide truncate">{k.l}</p>
            <p className="text-ink font-serif text-sm md:text-lg leading-tight mt-0.5">{k.v}</p>
            <p className="text-[8px] md:text-[9px] font-mono mt-0.5" style={{ color: P.green }}>{k.d}</p>
          </div>
        ))}
      </div>

      {/* invoices */}
      <div className="border border-divider/50 mb-3" style={{ background: P.panel }}>
        <div className="px-2.5 md:px-3 py-1.5 border-b border-divider/40 flex items-center justify-between">
          <span className="text-ink-muted text-[9px] md:text-[10px]">Facturi recente</span>
          <span className="text-[8px] font-mono" style={{ color: P.green }}>generate automat</span>
        </div>
        {invoices.map((f) => (
          <div key={f.nr} className="px-2.5 md:px-3 py-1.5 md:py-2 flex items-center gap-2 border-b border-divider/20 last:border-0">
            <span className="text-ink-light text-[8px] md:text-[9px] font-mono w-10 md:w-12 flex-shrink-0">{f.nr}</span>
            <span className="text-ink-muted text-[9px] md:text-[10px] flex-1 truncate">{f.client}</span>
            <span className="text-ink text-[9px] md:text-[10px] font-mono">{f.suma}</span>
            <span
              className="text-[7px] md:text-[8px] font-mono uppercase tracking-wide px-1.5 py-0.5 flex-shrink-0"
              style={f.ok ? { color: P.green, background: 'rgba(127,176,105,0.12)' } : { color: '#E8825A', background: 'rgba(232,130,90,0.12)' }}
            >
              {f.ok ? 'Platita' : 'In asteptare'}
            </span>
          </div>
        ))}
      </div>

      {/* stock alerts */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {[
          { p: 'Filtru aer MAN', n: '3 buc', w: '18%' },
          { p: 'Placute frana Setra', n: '5 buc', w: '32%' },
        ].map((s) => (
          <div key={s.p} className="border border-divider/50 p-2 md:p-2.5" style={{ background: P.panel }}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-ink-muted text-[8px] md:text-[9px] truncate">{s.p}</span>
              <span className="text-amber text-[8px] md:text-[9px] font-mono flex-shrink-0">{s.n}</span>
            </div>
            <div className="h-1 bg-divider/30 mt-1.5">
              <div className="h-full bg-amber/70" style={{ width: s.w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── SCOALA AUTO GLG — practical lesson scheduling ──────────── */
export function ScheduleCalendarMock({ className = "" }: { className?: string }) {
  const days = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin']
  const slots: Record<string, { t: string, who?: string, now?: boolean }[]> = {
    Lun: [{ t: '09:00', who: 'Maria P.' }, { t: '11:00', who: 'Andrei C.' }, { t: '14:00' }],
    Mar: [{ t: '09:00', who: 'Elena V.' }, { t: '11:00' }, { t: '14:00', who: 'Ion D.' }],
    Mie: [{ t: '09:00' }, { t: '11:00', who: 'Vasile M.', now: true }, { t: '14:00' }],
    Joi: [{ t: '09:00', who: 'Ana S.' }, { t: '11:00', who: 'Dan R.' }, { t: '14:00', who: 'Olga T.' }],
    Vin: [{ t: '09:00' }, { t: '11:00', who: 'Igor B.' }, { t: '14:00' }],
  }
  return (
    <div className={`p-4 md:p-6 text-left ${className}`} style={{ background: P.inset }}>
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-ink text-[12px] md:text-[13px] font-medium">Lectii practice &middot; Instructor Sergiu</p>
          <p className="text-ink-light text-[9px] md:text-[10px] font-mono mt-0.5">17 &ndash; 21 August</p>
        </div>
        <span className="text-[8px] md:text-[9px] font-mono tracking-[0.15em] uppercase text-amber border border-amber/30 px-2 py-1">Orar live</span>
      </div>

      {/* week grid */}
      <div className="grid grid-cols-5 gap-1.5 md:gap-2">
        {days.map((d) => (
          <div key={d}>
            <p className="text-ink-light text-[8px] md:text-[9px] font-mono uppercase tracking-wide text-center mb-1.5">{d}</p>
            <div className="space-y-1.5">
              {slots[d].map((s, i) => (
                s.who ? (
                  <div
                    key={i}
                    className={`border-l-2 p-1.5 md:p-2 ${s.now ? 'border-amber' : 'border-divider'}`}
                    style={{ background: s.now ? 'rgba(232,130,90,0.12)' : P.panel }}
                  >
                    <p className="text-ink-light text-[7px] md:text-[8px] font-mono">{s.t}</p>
                    <p className="text-ink text-[8px] md:text-[9px] truncate leading-tight mt-0.5">{s.who}</p>
                    {s.now && <p className="text-amber text-[7px] md:text-[8px] font-mono mt-0.5">&bull; acum</p>}
                  </div>
                ) : (
                  <div key={i} className="border border-dashed border-divider/50 p-1.5 md:p-2">
                    <p className="text-ink-light/60 text-[7px] md:text-[8px] font-mono">{s.t}</p>
                    <p className="text-ink-light/60 text-[8px] md:text-[9px] leading-tight mt-0.5">liber</p>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-ink-light text-[8px] md:text-[9px] font-mono mt-3 md:mt-4">3 instructori &middot; 42 lectii programate saptamana aceasta &middot; 0 apeluri</p>
    </div>
  )
}
