import type { Truck } from '@/types/truck'
import { FeaturedCard } from './FeaturedCard'

interface Props {
  truck: Truck | null
}

export function Hero({ truck }: Props) {
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
        {truck && <FeaturedCard truck={truck} />}
      </div>
    </section>
  )
}
