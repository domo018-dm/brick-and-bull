import { notFound } from 'next/navigation'
import { getTruckById } from '@/lib/supabase'
import { TruckForm } from '@/components/admin/TruckForm'

export const metadata = { title: 'Edit Truck — B&B Admin' }

export default async function EditTruckPage({ params }: { params: { id: string } }) {
  const truck = await getTruckById(params.id)
  if (!truck) notFound()

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="display admin-page-h1">Edit Truck</h1>
          <p className="admin-page-sub mono">{truck.year} {truck.model} {truck.trim} · {truck.id}</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href={`/trucks/${truck.id}`} target="_blank" className="btn btn-ghost">View listing ↗</a>
          <a href="/admin" className="btn btn-ghost">← Back</a>
        </div>
      </div>
      <TruckForm truck={truck} />
    </div>
  )
}
