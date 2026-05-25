const STEPS = [
  {
    n: '01',
    t: 'SOURCE',
    body: 'We buy from original owners, estates, and retiring fleets in the dry Southwest. No auction lane flips, no Carfax mysteries.',
    proof: 'Avg. 2 of every 11 trucks viewed are bought.',
  },
  {
    n: '02',
    t: 'INSPECT',
    body: '120-point inspection by an independent ASE-certified Ford specialist. Frame, floors, cab corners, and rocker rust mapped and photographed.',
    proof: "Inspection done off-site. We don't grade our own homework.",
  },
  {
    n: '03',
    t: 'DOCUMENT',
    body: 'Full photo set, undercarriage video, compression test, fluid analysis, and a written condition report. Every panel measured.',
    proof: 'PDF delivered before you put down a deposit.',
  },
  {
    n: '04',
    t: 'DELIVER',
    body: 'Enclosed transport to 47 states. We hand the keys over with a binder of receipts, the title, and a 30-day mechanical warranty.',
    proof: '90% of buyers never see Phoenix.',
  },
]

export function Process() {
  return (
    <section id="process" className="section process">
      <header className="section-head">
        <div className="section-head-l">
          <div className="kicker"><span className="kicker-rule" />04 · THE PROCESS</div>
          <h2 className="section-h display">How a truck earns<br />the Brick &amp; Bull badge.</h2>
        </div>
        <div className="section-head-r">
          <p className="section-lede">
            The market is full of &quot;drives great&quot; and &quot;no issues.&quot; Our binder tells you which
            two cab mounts are surface-rusted and exactly how the throttle position sensor
            behaves at idle. We&apos;d rather lose a sale than mislead a buyer.
          </p>
        </div>
      </header>
      <ol className="step-grid">
        {STEPS.map(s => (
          <li key={s.n} className="step">
            <div className="step-n mono">{s.n}</div>
            <h3 className="step-t display">{s.t}</h3>
            <p className="step-b">{s.body}</p>
            <div className="step-proof">
              <span className="step-proof-rule" />
              <span>{s.proof}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
