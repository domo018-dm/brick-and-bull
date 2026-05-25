import { TruckForm } from '@/components/admin/TruckForm'

export const metadata = { title: 'Add Truck — B&B Admin' }

export default function NewTruckPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1 className="display admin-page-h1">Add Truck</h1>
          <p className="admin-page-sub mono">Create a new listing</p>
        </div>
        <a href="/admin" className="btn btn-ghost">← Back</a>
      </div>
      <TruckForm />
    </div>
  )
}
