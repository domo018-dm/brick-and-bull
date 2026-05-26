import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTruckById } from '@/lib/supabase'
import { UtilityBar } from '@/components/UtilityBar'
import { Nav } from '@/components/Nav'
import { TruckDetail } from '@/components/TruckDetail'
import { TruckInquiry } from '@/components/TruckInquiry'
import { Footer } from '@/components/Footer'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const truck = await getTruckById(id)
  if (!truck) return { title: 'Not Found — Brick & Bull' }
  return {
    title: `${truck.year} Ford ${truck.model} ${truck.trim} — Brick & Bull`,
    description: `${truck.era_label} · ${truck.engine} · ${truck.drive} · ${truck.miles.toLocaleString()} mi · ${truck.location}`,
  }
}

export default async function TruckPage({ params }: Props) {
  const { id } = await params
  const truck = await getTruckById(id)
  if (!truck) notFound()

  return (
    <div className="app font-shoulders">
      <UtilityBar />
      <Nav />
      <TruckDetail truck={truck} />
      {truck.status !== 'sold' && truck.status !== 'coming_soon' && <TruckInquiry truck={truck} />}
      <Footer />
    </div>
  )
}
