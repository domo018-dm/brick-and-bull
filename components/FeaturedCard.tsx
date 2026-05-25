'use client'

import type { Truck } from '@/types/truck'
import { useSaved } from '@/context/SavedContext'
import { TruckCard } from './TruckCard'

export function FeaturedCard({ truck }: { truck: Truck }) {
  const { saved, toggle } = useSaved()
  return <TruckCard truck={truck} saved={saved.has(truck.id)} onToggle={toggle} featured />
}
