interface Props {
  children?: React.ReactNode
  density?: 'normal' | 'dense'
  tone?: 'default' | 'dark'
}

export function Hatched({ children, density = 'normal', tone = 'default' }: Props) {
  const stripe = density === 'dense' ? 6 : 9
  const bg = tone === 'dark' ? 'var(--fg)' : 'var(--bg-2)'
  const stripeColor = tone === 'dark' ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)'

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: bg,
      backgroundImage: `repeating-linear-gradient(135deg, ${stripeColor} 0 1px, transparent 1px ${stripe}px)`,
      overflow: 'hidden',
    }}>
      {children}
    </div>
  )
}
