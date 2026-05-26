'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { updateStatusAction } from '@/lib/actions'

const STATUSES = ['coming_soon', 'available', 'pending', 'sold'] as const

export function StatusButtons({ id, current }: { id: string; current: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [err, setErr] = useState<string | null>(null)

  function set(status: string) {
    setErr(null)
    startTransition(async () => {
      const result = await updateStatusAction(id, status)
      if ('error' in result) {
        setErr(result.error)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div>
      <div className="admin-status-btns" style={{ opacity: isPending ? 0.5 : 1 }}>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => set(s)}
            className={`admin-status-btn admin-status-btn--${s}${current === s ? ' is-active' : ''}`}
          >
            {s === 'coming_soon' ? 'soon' : s}
          </button>
        ))}
      </div>
      {err && <p className="mono" style={{ color: 'var(--rust)', fontSize: 11, marginTop: 4 }}>{err}</p>}
    </div>
  )
}
