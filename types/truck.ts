export interface Truck {
  id: string
  era: 'bull' | 'brick'
  era_label: string
  year: number
  model: string
  trim: string
  engine: string
  drive: string
  cab: string
  trans: string
  miles: number
  color: string
  price: number
  status: 'available' | 'pending' | 'sold'
  location: string
  image_url: string | null
  tone: string | null
  created_at: string
}
