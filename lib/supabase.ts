import { createClient } from '@supabase/supabase-js'
import type { Truck, TruckImage } from '@/types/truck'

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

function withImages(row: Record<string, unknown>): Truck {
  const { truck_images, ...rest } = row
  return {
    ...rest,
    images: ((truck_images ?? []) as TruckImage[])
      .sort((a, b) => a.position - b.position),
  } as Truck
}

export async function getTruckById(id: string): Promise<Truck | null> {
  const supabase = getClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('trucks')
    .select('*, truck_images(id, url, position)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Failed to fetch truck:', error.message)
    return null
  }
  return withImages(data as Record<string, unknown>)
}

export async function getLatestTruck(): Promise<Truck | null> {
  const supabase = getClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('trucks')
    .select('*, truck_images(id, url, position)')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Failed to fetch latest truck:', error.message)
    return null
  }
  return withImages(data as Record<string, unknown>)
}

export async function getTrucks(): Promise<Truck[]> {
  const supabase = getClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('trucks')
    .select('*, truck_images(id, url, position)')
    .order('year', { ascending: false })

  if (error) {
    console.error('Failed to fetch trucks:', error.message)
    return []
  }
  return (data as Record<string, unknown>[]).map(withImages)
}
