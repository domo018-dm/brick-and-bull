'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Truck } from '@/types/truck'
import { Hatched } from './Hatched'
import { TruckSilhouette } from './TruckSilhouette'

export function ImageGallery({ truck: t }: { truck: Truck }) {
  const allImages = t.images && t.images.length > 0
    ? t.images.map(i => i.url)
    : t.image_url
    ? [t.image_url]
    : []

  const [idx, setIdx] = useState(0)
  const src = allImages[idx] ?? null
  const total = allImages.length

  function prev() { setIdx(i => (i - 1 + total) % total) }
  function next() { setIdx(i => (i + 1) % total) }

  return (
    <div className="tdetail-media">
      {src ? (
        <Image
          src={src}
          alt={`${t.year} Ford ${t.model} ${t.trim}`}
          fill
          className="tcard-photo"
          sizes="(max-width: 720px) 100vw, 62vw"
          priority
        />
      ) : (
        <Hatched>
          <div className="tdetail-silhouette">
            <TruckSilhouette era={t.era} style={{ width: '70%', color: 'var(--fg)' }} />
          </div>
        </Hatched>
      )}

      <div className="tcard-era">{t.era_label}</div>

      {t.status !== 'available' && (
        <div className={`status-stamp stamp-${t.status}`}>
          {t.status === 'sold' ? 'SOLD' : t.status === 'coming_soon' ? 'COMING SOON' : 'PENDING'}
        </div>
      )}

      {total > 1 && (
        <>
          <button className="gallery-arr gallery-arr--prev" onClick={prev} aria-label="Previous image">‹</button>
          <button className="gallery-arr gallery-arr--next" onClick={next} aria-label="Next image">›</button>
          <div className="gallery-dots">
            {allImages.map((_, i) => (
              <span key={i} className={`gallery-dot${i === idx ? ' is-active' : ''}`} />
            ))}
          </div>
          <div className="gallery-thumbs">
            {allImages.map((url, i) => (
              <button
                key={i}
                className={`gallery-thumb${i === idx ? ' is-active' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Image ${i + 1}`}
              >
                <Image src={url} alt="" fill className="tcard-photo" sizes="80px" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
