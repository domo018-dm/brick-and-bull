'use client'

import { useState } from 'react'
import type { Truck } from '@/types/truck'
import { Hatched } from './Hatched'
import { TruckSilhouette } from './TruckSilhouette'

const ERA_DATA = [
  {
    id: 'bull' as const,
    label: 'BULLNOSE',
    years: '1980 – 1986',
    name: 'Seventh generation',
    blurb: 'The smooth, single-headlight front clip that ended the square-jawed seventies. Light, simple, and absurdly fixable in a parking lot.',
    points: [
      ['Front', 'Single round or rectangular headlamps, soft hood lip'],
      ['Notable', 'First-year diesel option (6.9L IDI, 1983)'],
      ['Sweet spot', "'84–'86 with the EFI 302 or 6.9 diesel"],
    ] as [string, string][],
  },
  {
    id: 'brick' as const,
    label: 'BRICKNOSE',
    years: '1987 – 1991',
    name: 'Eighth generation refresh',
    blurb: 'Squared-off, dual-rectangular grille and the introduction of fuel injection across the board. The first F-series that feels modern to drive.',
    points: [
      ['Front', 'Vertical-bar grille, flush composite headlamps'],
      ['Notable', 'EFI 5.0/5.8 V8s and the 7.3L IDI Turbo (1993)'],
      ['Sweet spot', "'89–'91 F-250 4×4 with the ZF 5-speed"],
    ] as [string, string][],
  },
]

interface Props {
  trucks: Truck[]
}

export function Eras({ trucks }: Props) {
  const [activeId, setActiveId] = useState<'bull' | 'brick'>('brick')
  const era = ERA_DATA.find(e => e.id === activeId)!

  const countFor = (id: string) =>
    trucks.filter(t => t.era === id && t.status !== 'sold').length

  return (
    <section id="eras" className="section eras">
      <header className="section-head">
        <div className="section-head-l">
          <div className="kicker"><span className="kicker-rule" />03 · KNOW YOUR ERA</div>
          <h2 className="section-h display">Two front ends.<br />The whole story.</h2>
        </div>
        <div className="section-head-r">
          <p className="section-lede">
            People throw &ldquo;old Ford&rdquo; around like one truck. They aren&apos;t. The Bullnose and
            Bricknose share a chassis but drive, rust, and patina differently — and that&apos;s
            the whole reason we picked these two and stopped there.
          </p>
        </div>
      </header>

      <div className="era-tabs">
        {ERA_DATA.map(e => (
          <button
            key={e.id}
            className={`era-tab ${activeId === e.id ? 'is-on' : ''}`}
            onClick={() => setActiveId(e.id)}
          >
            <span className="era-tab-label">{e.label}</span>
            <span className="era-tab-years">{e.years}</span>
            <span className="era-tab-count">{countFor(e.id)} in stock</span>
          </button>
        ))}
      </div>

      <div className="era-panel">
        <div className="era-panel-l">
          <Hatched>
            <div className="era-portrait">
              <TruckSilhouette era={era.id} style={{ width: '85%', color: 'var(--fg)' }} />
            </div>
            <div className="era-meta">
              <span className="mono">GEN · {era.name.toUpperCase()}</span>
              <span className="mono">{era.years}</span>
            </div>
          </Hatched>
        </div>
        <div className="era-panel-r">
          <div className="era-name">
            <span className="mono">{era.years}</span>
            <h3 className="era-title display">The {era.label.toLowerCase()}</h3>
          </div>
          <p className="era-blurb">{era.blurb}</p>
          <dl className="era-points">
            {era.points.map(([k, v], i) => (
              <div key={i}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <a className="btn btn-ghost" href="#inventory">
            View {countFor(era.id)} {era.label.toLowerCase()} trucks <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
