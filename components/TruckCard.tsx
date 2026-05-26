'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Truck } from '@/types/truck'
import { Hatched } from './Hatched'
import { TruckSilhouette } from './TruckSilhouette'

function fmt$(n: number) { return '$' + n.toLocaleString('en-US') }
function fmtMi(n: number) { return n.toLocaleString('en-US') + ' mi' }

interface Props {
  truck: Truck
  saved: boolean
  onToggle: (id: string) => void
  featured?: boolean
}

export function TruckCard({ truck: t, saved, onToggle, featured }: Props) {
  const allImages = t.images && t.images.length > 0
    ? t.images.map(i => i.url)
    : t.image_url
    ? [t.image_url]
    : []

  const [imgIdx, setImgIdx] = useState(0)
  const currentImage = allImages[imgIdx] ?? null
  const hasMultiple = allImages.length > 1

  function prev(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation()
    setImgIdx(i => (i - 1 + allImages.length) % allImages.length)
  }
  function next(e: React.MouseEvent) {
    e.preventDefault(); e.stopPropagation()
    setImgIdx(i => (i + 1) % allImages.length)
  }

  return (
    <article className={`tcard tcard-${t.status}`}>
      <div className="tcard-img">
        {currentImage ? (
          <>
            <Image
              src={currentImage}
              alt={`${t.year} Ford ${t.model} ${t.trim}`}
              fill
              className="tcard-photo"
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
            <div className="tcard-era">{t.era_label}</div>
          </>
        ) : (
          <Hatched density="dense">
            <div className="tcard-era">{t.era_label}</div>
            <div className="tcard-silhouette">
              <TruckSilhouette era={t.era} style={{ width: '88%', color: 'var(--fg)' }} />
            </div>
          </Hatched>
        )}

        {hasMultiple && (
          <>
            <button className="tcard-arr tcard-arr--prev" onClick={prev} aria-label="Previous image">‹</button>
            <button className="tcard-arr tcard-arr--next" onClick={next} aria-label="Next image">›</button>
            <div className="tcard-dots">
              {allImages.map((_, i) => (
                <span key={i} className={`tcard-dot${i === imgIdx ? ' is-active' : ''}`} />
              ))}
            </div>
          </>
        )}

        {featured && <div className="tcard-featured">FEATURED</div>}
        <button
          className={`save-btn ${saved ? 'is-saved' : ''}`}
          onClick={e => { e.preventDefault(); e.stopPropagation(); onToggle(t.id) }}
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          {saved ? '★' : '☆'}
        </button>
        {t.status !== 'available' && (
          <div className={`status-stamp stamp-${t.status}`}>
            {t.status === 'sold' ? 'SOLD' : t.status === 'coming_soon' ? 'COMING SOON' : 'PENDING'}
          </div>
        )}
      </div>
      <div className="tcard-body">
        <div className="tcard-headrow">
          <h3 className="tcard-h display">{t.year} <span>{t.model}</span></h3>
          <div className="tcard-price">{t.status === 'coming_soon' ? '—' : fmt$(t.price)}</div>
        </div>
        <div className="tcard-trim">{t.trim} · {t.engine} · {t.drive}</div>
        <dl className="tcard-specs">
          <div><dt>Mileage</dt><dd>{fmtMi(t.miles)}</dd></div>
          <div><dt>Transmission</dt><dd>{t.trans}</dd></div>
          <div><dt>Body</dt><dd>{t.cab}</dd></div>
          <div><dt>Location</dt><dd>{t.location}</dd></div>
        </dl>
        <div className="tcard-foot">
          <span className="mono tcard-id">B&amp;B / {t.id.toUpperCase()}</span>
          <a className="tcard-view" href={`/trucks/${t.id}`}>View truck <span className="arr">→</span></a>
        </div>
      </div>
    </article>
  )
}
