import type { Metadata } from 'next'
import { SavedProvider } from '@/context/SavedContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brick & Bull — 1980–1991 Ford F-Series Specialists',
  description: 'We find, fix, and sell seventh- and eighth-generation Ford F-Series trucks. Barn finds welcome. Bullnose and Bricknose only.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SavedProvider>
          {children}
        </SavedProvider>
      </body>
    </html>
  )
}
