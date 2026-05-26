import { logoutAction } from '@/lib/actions'

export const metadata = { title: 'Admin — Brick & Bull' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-inner">
          <a className="admin-header-brand" href="/">
            <span className="logo-mark" style={{ width: 32, height: 32, fontSize: 13 }}>B&amp;B</span>
            <span className="mono admin-header-label">ADMIN</span>
          </a>
          <nav className="admin-nav-links">
            <a href="/admin">Inventory</a>
            <a href="/admin/trucks/new">Add Truck</a>
            <a href="/" target="_blank" rel="noopener">View Site ↗</a>
          </nav>
          <form action={logoutAction}>
            <button type="submit" className="admin-logout-btn mono">Logout</button>
          </form>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  )
}
