interface Props {
  era?: 'bull' | 'brick'
  style?: React.CSSProperties
}

export function TruckSilhouette({ era = 'brick', style = {} }: Props) {
  const hood = era === 'bull'
    ? { x: 30, y: 58, w: 78, h: 52 }
    : { x: 30, y: 55, w: 80, h: 55 }
  const grilleH = era === 'bull' ? 14 : 22

  return (
    <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet" style={style}>
      <rect x="195" y="55" width="165" height="55" />
      <rect x="195" y="52" width="165" height="4" />
      <rect x="108" y="28" width="92" height="82" />
      <rect x="118" y="38" width="74" height="24" fill="var(--bg)" />
      <rect x="153" y="38" width="2" height="24" fill="currentColor" />
      <rect x={hood.x} y={hood.y} width={hood.w} height={hood.h} />
      <rect x={hood.x - 2} y={hood.y + (hood.h - grilleH) / 2} width="4" height={grilleH} />
      <rect x="160" y="72" width="14" height="2" fill="var(--bg)" />
      <rect x="55" y="100" width="50" height="20" fill="var(--bg)" />
      <rect x="280" y="100" width="60" height="20" fill="var(--bg)" />
      <circle cx="80" cy="115" r="18" />
      <circle cx="310" cy="115" r="18" />
      <circle cx="80" cy="115" r="7" fill="var(--bg)" />
      <circle cx="310" cy="115" r="7" fill="var(--bg)" />
      <rect x="0" y="135" width="400" height="1" />
    </svg>
  )
}
