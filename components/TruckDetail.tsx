import type { Truck } from '@/types/truck'
import { ImageGallery } from './ImageGallery'

function fmt$(n: number) { return '$' + n.toLocaleString('en-US') }
function fmtMi(n: number) { return n.toLocaleString('en-US') + ' mi' }

export function TruckDetail({ truck: t }: { truck: Truck }) {
  const specs = [
    { label: 'Year',         value: String(t.year) },
    { label: 'Era',          value: t.era_label },
    { label: 'Model',        value: t.model },
    { label: 'Trim',         value: t.trim },
    { label: 'Engine',       value: t.engine },
    { label: 'Drive',        value: t.drive },
    { label: 'Transmission', value: t.trans },
    { label: 'Cab Style',    value: t.cab },
    { label: 'Mileage',      value: fmtMi(t.miles) },
    { label: 'Color',        value: t.color },
    { label: 'Location',     value: t.location },
    { label: 'Status',       value: t.status === 'coming_soon' ? 'Coming Soon' : t.status.charAt(0).toUpperCase() + t.status.slice(1) },
  ]

  return (
    <>
      <div className="tdetail-back">
        <a href="/#inventory">← Back to inventory</a>
      </div>

      <div className="tdetail-hero">

        {/* ── Left: image gallery */}
        <ImageGallery truck={t} />

        {/* ── Right: info panel */}
        <div className="tdetail-panel">
          <div>
            <div className="kicker"><span className="kicker-rule" />{t.era_label}</div>
            <h1 className="display tdetail-h1">
              {t.year} <span className="tdetail-h1-model">{t.model}</span>
            </h1>
            <div className="tdetail-price">
              {t.status === 'sold' ? <span className="tdetail-price-sold">SOLD</span>
                : t.status === 'coming_soon' ? <span className="tdetail-price-sold">COMING SOON</span>
                : fmt$(t.price)}
            </div>
            <p className="tdetail-oneliner">{t.trim} · {t.engine} · {t.drive}</p>
          </div>

          <dl className="tdetail-quickspecs">
            <div><dt>Mileage</dt><dd>{fmtMi(t.miles)}</dd></div>
            <div><dt>Transmission</dt><dd>{t.trans}</dd></div>
            <div><dt>Cab Style</dt><dd>{t.cab}</dd></div>
            <div><dt>Location</dt><dd>{t.location}</dd></div>
          </dl>

          <div className="tdetail-actions">
            {t.status === 'available' || t.status === 'pending' ? (
              <a href="#inquiry" className="btn btn-primary">
                {t.status === 'pending' ? 'Join the waitlist' : 'Inquire about this truck'}
                <span className="arr">→</span>
              </a>
            ) : t.status === 'coming_soon' ? (
              <a href="tel:5052049009" className="btn btn-primary">
                Call to get notified <span className="arr">→</span>
              </a>
            ) : (
              <a href="/#inventory" className="btn btn-primary">
                Browse available trucks <span className="arr">→</span>
              </a>
            )}
            <a href="/#inventory" className="btn btn-ghost">← Browse inventory</a>
          </div>

          <span className="mono tdetail-ref">B&amp;B / {t.id.toUpperCase()}</span>
        </div>
      </div>

      {/* ── Description */}
      {t.description && (
        <div className="tdetail-desc">
          <div className="kicker"><span className="kicker-rule" />About This Truck</div>
          <p className="tdetail-desc-text">{t.description}</p>
        </div>
      )}

      {/* ── Full specs */}
      <div className="tdetail-specs">
        <div className="kicker"><span className="kicker-rule" />Full Specifications</div>
        <dl className="tdetail-specs-grid">
          {specs.map(({ label, value }) => (
            <div key={label} className="tdetail-spec">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}
