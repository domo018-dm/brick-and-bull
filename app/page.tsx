export const dynamic = 'force-dynamic'

import { getTrucks } from '@/lib/supabase'
import { UtilityBar } from '@/components/UtilityBar'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { StatsStrip } from '@/components/StatsStrip'
import { Inventory } from '@/components/Inventory'
import { Eras } from '@/components/Eras'
import { Process } from '@/components/Process'
import { Testimonials } from '@/components/Testimonials'
import { SellCTA } from '@/components/SellCTA'
import { Footer } from '@/components/Footer'

export default async function Page() {
  const trucks = await getTrucks()

  return (
    <div className="app font-shoulders">
      <UtilityBar />
      <Nav />
      <Hero />
      <StatsStrip />
      <Inventory initialTrucks={trucks} />
      <Eras trucks={trucks} />
      <Process />
      <Testimonials />
      <SellCTA />
      <Footer />
    </div>
  )
}
