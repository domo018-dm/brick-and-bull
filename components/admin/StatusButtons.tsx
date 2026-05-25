'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { updateStatusAction } from '@/lib/actions'

const STATUSES = ['available', 'pending', 'sold'] as const

export function StatusButtons({ id, current }: { id: string; current: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function set(status: string) {
    startTransition(async () => {
      await updateStatusAction(id, status)
      router.refresh()
    })
  }

  return (
    <div className="admin-status-btns" style={{ opacity: isPending ? 0.5 : 1 }}>
      {STATUSES.map(s => (
        <button
          key={s}
          onClick={() => set(s)}
          className={`admin-status-btn admin-status-btn--${s}${current === s ? ' is-active' : ''}`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
