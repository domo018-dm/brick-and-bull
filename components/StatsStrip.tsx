const STATS = [
  ['11', 'YEARS IN BUSINESS'],
  ['200+', 'TRUCKS SOLD'],
  ['47', 'STATES DELIVERED'],
  ['120', 'POINT INSPECTION'],
] as const

export function StatsStrip() {
  return (
    <section className="stats-strip">
      {STATS.map(([n, l], i) => (
        <div key={i} className="stat-cell">
          <div className="stat-n">{n}</div>
          <div className="stat-l">{l}</div>
        </div>
      ))}
    </section>
  )
}
