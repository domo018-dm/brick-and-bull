import Image from 'next/image'
import { getTrucks } from '@/lib/supabase'
import { StatusButtons } from '@/components/admin/StatusButtons'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const trucks = await getTrucks()

  const counts = {
    available: trucks.filter(t => t.status === 'available').length,
    pending:   trucks.filter(t => t.status === 'pending').length,
    sold:      trucks.filter(t => t.status === 'sold').length,
  }

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="display admin-page-h1">Inventory</h1>
          <p className="admin-page-sub mono">
            {trucks.length} trucks &nbsp;·&nbsp;
            {counts.available} available &nbsp;·&nbsp;
            {counts.pending} pending &nbsp;·&nbsp;
            {counts.sold} sold
          </p>
        </div>
        <a href="/admin/trucks/new" className="btn btn-primary">
          Add truck <span className="arr">→</span>
        </a>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Listing</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map(t => (
              <tr key={t.id}>
                <td className="admin-table-photo-cell">
                  <div className="admin-thumb">
                    {t.image_url ? (
                      <Image
                        src={t.image_url}
                        alt={`${t.year} ${t.model}`}
                        fill
                        className="tcard-photo"
                        sizes="80px"
                      />
                    ) : (
                      <div className="admin-thumb-empty mono">NO IMG</div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="admin-listing-title display">{t.year} {t.model}</div>
                  <div className="admin-listing-sub mono">{t.trim} · {t.era_label}</div>
                  <div className="admin-listing-id mono">{t.id}</div>
                </td>
                <td>
                  <span className="admin-price display">
                    {t.status === 'sold' ? '—' : `$${t.price.toLocaleString()}`}
                  </span>
                </td>
                <td>
                  <StatusButtons id={t.id} current={t.status} />
                </td>
                <td>
                  <a href={`/admin/trucks/${t.id}/edit`} className="btn btn-ghost admin-edit-btn">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
