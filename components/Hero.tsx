import Image from 'next/image'
import type { Truck } from '@/types/truck'
import { Hatched } from './Hatched'
import { TruckSilhouette } from './TruckSilhouette'

interface Props {
  truck: Truck | null
}

export function Hero({ truck }: Props) {
  const era = truck?.era ?? 'brick'
  const eraLabel = truck?.era_label ?? 'BRICKNOSE'

  const bottomDesc = truck
    ? `${truck.model} ${truck.trim} · ${truck.drive} · ${truck.trans} · ${truck.miles.toLocaleString()} MI`
    : null

  return (
    <section className="hero hero-split">
      <div className="hero-l">
        <div className="eyebrow">
          <span>1980</span><span className="dash" /><span>1991</span>
          <span className="pipe">·</span>
          <span>BULLNOSE</span>
          <span className="pipe">·</span>
          <span>BRICKNOSE</span>
        </div>
        <h1 className="hero-h display">
          F-SERIES<span className="hero-comma">,</span>
          <br /> KEPT <span className="hero-em">HONEST</span>.
        </h1>
        <p className="hero-p">
          We source, inspect, and document the seventh- and eighth-generation Ford F-series
          for people who actually drive them. Bullnose and Bricknose only — no flippers,
          no barn-find theatre. Honest iron with paperwork to match.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#inventory">Browse inventory <span className="arr">→</span></a>
          <a className="btn btn-ghost" href="#sell">Sell yours</a>
        </div>
      </div>
      <div className="hero-r">
        <div className="hero-portrait">
          {truck?.image_url ? (
            <Image
              src={truck.image_url}
              alt={`${truck.year} Ford ${truck.model} ${truck.trim}`}
              fill
              className="tcard-photo"
              sizes="(max-width: 720px) 100vw, 50vw"
              priority
            />
          ) : (
            <Hatched>
              <div className="portrait-truck">
                <TruckSilhouette era={era} style={{ width: '78%', color: 'var(--fg)' }} />
              </div>
            </Hatched>
          )}
          {truck && (
            <div className="portrait-meta top-l">
              <div className="kv"><span>YEAR</span><b>{truck.year}</b></div>
              <div className="kv"><span>ENGINE</span><b>{truck.engine}</b></div>
              <div className="kv"><span>COLOR</span><b>{truck.color}</b></div>
            </div>
          )}
          <div className="portrait-meta top-r">
            <span className="era-tag">{eraLabel}</span>
          </div>
          {truck && (
            <div className="portrait-meta bot">
              <span className="mono">{bottomDesc}</span>
              <span className="mono">{truck.location}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
