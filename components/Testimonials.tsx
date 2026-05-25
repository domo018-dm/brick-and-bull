const TESTIMONIALS = [
  {
    q: "Binder showed up before the truck did. I knew which two body mounts had surface rust before I wrote the check. That's the whole game.",
    name: 'Dale R.',
    where: 'Bozeman, MT',
    truck: 'Bought a 1989 F-250 7.3 IDI',
  },
  {
    q: "I asked three other dealers for a compression test. Brick & Bull was the only one that already had it on file. Truck has 18,000 miles on it since I bought it and hasn't been in a shop yet.",
    name: 'Marisol G.',
    where: 'Burlington, VT',
    truck: 'Bought a 1986 F-150 Ranger XLT',
  },
  {
    q: "They told me not to buy a truck I wanted because the frame had been straightened. Found me a better one six weeks later. Anybody who tells you to stop spending money is somebody to trust.",
    name: 'Will K.',
    where: 'Asheville, NC',
    truck: 'Bought a 1991 F-350 Crew',
  },
]

export function Testimonials() {
  return (
    <section className="section testimonials">
      <header className="section-head">
        <div className="section-head-l">
          <div className="kicker"><span className="kicker-rule" />05 · OWNERS</div>
          <h2 className="section-h display">People who bought one.</h2>
        </div>
      </header>
      <div className="testi-grid">
        {TESTIMONIALS.map((t, i) => (
          <figure key={i} className="testi">
            <blockquote>&ldquo;{t.q}&rdquo;</blockquote>
            <figcaption>
              <div className="testi-name">{t.name}</div>
              <div className="testi-where mono">{t.where.toUpperCase()}</div>
              <div className="testi-truck">{t.truck}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
