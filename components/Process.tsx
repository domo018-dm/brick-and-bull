const STEPS = [
  {
    n: '01',
    t: 'FIND',
    body: 'We hunt barn finds, estate sales, and private sellers across the Southwest. The more overlooked the truck, the better.',
    proof: 'Avg. 2 of every 11 trucks viewed are bought.',
  },
  {
    n: '02',
    t: 'FIX',
    body: 'We go through the entire truck — engine, trans, brakes, suspension, electrical, cooling — until it starts reliably, drives safely, and stops like it should.',
    proof: "Not a restoration shop — we fix what matters and leave the rest original.",
  },
  {
    n: '03',
    t: 'PHOTOGRAPH',
    body: 'We photograph every angle, note what we know about the truck\'s history, and write an honest description of condition.',
    proof: 'Come look in person before you buy — always welcome.',
  },
  {
    n: '04',
    t: 'SELL',
    body: 'Trucks sell as-is. Pick up in Phoenix or we can help coordinate transport. Clean title, fair price, no games.',
    proof: 'What you see is what you get.',
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
            The market is full of &quot;drives great&quot; and &quot;no issues.&quot; We buy trucks cheap,
            get them running right, and sell them honest. Simple as that.
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
