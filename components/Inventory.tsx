'use client'

import { useState, useMemo } from 'react'
import type { Truck } from '@/types/truck'
import { useSaved } from '@/context/SavedContext'
import { TruckCard } from './TruckCard'

const ERA_OPTIONS = [
  { id: 'all', label: 'Both eras' },
  { id: 'bull', label: "Bullnose '80–'86" },
  { id: 'brick', label: "Bricknose '87–'91" },
]

const DRIVE_OPTIONS = [
  { id: 'all', label: 'All drives' },
  { id: '4×4', label: '4×4' },
  { id: '4×2', label: '4×2' },
]

const STATUS_OPTIONS = [
  { id: 'all', label: 'All status' },
  { id: 'available', label: 'Available' },
  { id: 'pending', label: 'Pending' },
  { id: 'sold', label: 'Sold' },
]

interface Props {
  initialTrucks: Truck[]
}

export function Inventory({ initialTrucks }: Props) {
  const { saved, toggle } = useSaved()
  const [era, setEra] = useState('all')
  const [drive, setDrive] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('newest')

  const filtered = useMemo(() => {
    let r = initialTrucks.filter(t =>
      (era === 'all' || t.era === era) &&
      (drive === 'all' || t.drive === drive) &&
      (status === 'all' || t.status === status)
    )
    if (sort === 'newest') r = [...r].sort((a, b) => b.year - a.year)
    if (sort === 'oldest') r = [...r].sort((a, b) => a.year - b.year)
    if (sort === 'price-lo') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'price-hi') r = [...r].sort((a, b) => b.price - a.price)
    if (sort === 'miles') r = [...r].sort((a, b) => a.miles - b.miles)
    return r
  }, [initialTrucks, era, drive, status, sort])

  const now = new Date().toLocaleDateString('en-US', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).toUpperCase()

  return (
    <section id="inventory" className="section inventory">
      <header className="section-head">
        <div className="section-head-l">
          <div className="kicker"><span className="kicker-rule" />02 · CURRENT INVENTORY</div>
          <h2 className="section-h display">On the lot, today.</h2>
        </div>
        <div className="section-head-r">
          <p className="section-lede">
            Every truck runs, drives, and stops before it wears our badge.
            Reserve with a refundable deposit; we hold for 7 days.
          </p>
        </div>
      </header>

      <div className="filter-bar">
        <FilterGroup label="Era" value={era} onChange={setEra} options={ERA_OPTIONS} />
        <FilterGroup label="Drive" value={drive} onChange={setDrive} options={DRIVE_OPTIONS} />
        <FilterGroup label="Status" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
        <div className="filter-spacer" />
        <label className="sort-select">
          <span>Sort</span>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">Newest year</option>
            <option value="oldest">Oldest year</option>
            <option value="price-lo">Price · low to high</option>
            <option value="price-hi">Price · high to low</option>
            <option value="miles">Lowest mileage</option>
          </select>
        </label>
      </div>

      <div className="results-meta">
        <span><b>{filtered.length}</b> of {initialTrucks.length} trucks</span>
        <span className="mono">UPDATED {now}</span>
      </div>

      <div className="tcard-grid">
        {filtered.map(t => (
          <TruckCard
            key={t.id}
            truck={t}
            saved={saved.has(t.id)}
            onToggle={toggle}
          />
        ))}
        {filtered.length === 0 && (
          <div className="empty">
            No trucks match those filters.{' '}
            <button onClick={() => { setEra('all'); setDrive('all'); setStatus('all') }}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      <div className="see-all">
        <a className="btn btn-ghost" href="#all">
          See full inventory archive (200+) <span className="arr">→</span>
        </a>
      </div>
    </section>
  )
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { id: string; label: string }[]
}) {
  return (
    <div className="filter-group">
      <span className="filter-label">{label}</span>
      <div className="filter-chips">
        {options.map(o => (
          <button
            key={o.id}
            className={`chip ${value === o.id ? 'is-on' : ''}`}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
