import { loginAction } from '@/lib/actions'

export const metadata = { title: 'Admin Login — Brick & Bull' }

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <span className="logo-mark">B&amp;B</span>
          <span className="admin-login-title display">ADMIN</span>
        </div>
        <form action={loginAction} className="admin-login-form">
          <label className="field">
            <span className="field-label mono">Password</span>
            <input
              type="password"
              name="password"
              autoFocus
              autoComplete="current-password"
              placeholder="Enter admin password"
            />
          </label>
          {searchParams.error && (
            <p className="admin-login-error mono">Incorrect password — try again.</p>
          )}
          <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
            Sign in <span className="arr">→</span>
          </button>
        </form>
        <a href="/" className="admin-login-back mono">← Back to site</a>
      </div>
    </div>
  )
}
