import { createClient } from '@supabase/supabase-js'
import type { Truck } from '@/types/truck'

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function getLatestTruck(): Promise<Truck | null> {
  const supabase = getClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('trucks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Failed to fetch latest truck:', error.message)
    return null
  }
  return data as Truck
}

export async function getTrucks(): Promise<Truck[]> {
  const supabase = getClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('trucks')
    .select('*')
    .order('year', { ascending: false })

  if (error) {
    console.error('Failed to fetch trucks:', error.message)
    return []
  }
  return data as Truck[]
}
