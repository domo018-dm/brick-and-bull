import { Hatched } from './Hatched'
import { TruckSilhouette } from './TruckSilhouette'

export function Hero() {
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
          <Hatched>
            <div className="portrait-meta top-l">
              <div className="kv"><span>VIN</span><b>1FTHF26G6HKA48201</b></div>
              <div className="kv"><span>YEAR</span><b>1987</b></div>
              <div className="kv"><span>ENGINE</span><b>7.5L 460 V8</b></div>
            </div>
            <div className="portrait-meta top-r">
              <span className="era-tag">BRICKNOSE</span>
            </div>
            <div className="portrait-truck">
              <TruckSilhouette era="brick" style={{ width: '78%', color: 'var(--fg)' }} />
            </div>
            <div className="portrait-meta bot">
              <span className="mono">F-250 XLT LARIAT · 4×4 · 5-SPD ZF · 84,200 MI</span>
              <span className="mono">PHOENIX, AZ</span>
            </div>
          </Hatched>
        </div>
      </div>
    </section>
  )
}
