'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createHash } from 'crypto'
import { getAdminClient } from './admin-supabase'

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string
  if (password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies()
    jar.set('bb_admin', process.env.ADMIN_PASSWORD!, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    redirect('/admin')
  }
  redirect('/admin/login?error=1')
}

export async function logoutAction() {
  const jar = await cookies()
  jar.delete('bb_admin')
  redirect('/admin/login')
}

// ── Image upload ──────────────────────────────────────────────────────────────

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey    = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary credentials not set')

  const timestamp = Math.round(Date.now() / 1000)
  const folder    = 'bb-trucks'
  const signature = createHash('sha256')
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex')

  const fd = new FormData()
  fd.append('file', file)
  fd.append('api_key', apiKey)
  fd.append('timestamp', String(timestamp))
  fd.append('folder', folder)
  fd.append('signature', signature)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: fd },
  )
  if (!res.ok) throw new Error(`Cloudinary error: ${res.statusText}`)
  const data = await res.json()
  return data.secure_url as string
}

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  try {
    const file = formData.get('file') as File | null
    if (!file || file.size === 0) return { error: 'No file provided' }
    const url = await uploadToCloudinary(file)
    return { url }
  } catch (e) {
    return { error: (e as Error).message }
  }
}

// ── Image helpers ─────────────────────────────────────────────────────────────

function getImageUrls(formData: FormData): string[] {
  const count = parseInt((formData.get('image_count') as string) ?? '0', 10)
  const urls: string[] = []
  for (let i = 0; i < count; i++) {
    const u = ((formData.get(`image_url_${i}`) as string) ?? '').trim()
    if (u) urls.push(u)
  }
  return urls
}

type AdminClient = ReturnType<typeof getAdminClient>

async function insertImages(supabase: AdminClient, truckId: string, urls: string[]) {
  if (urls.length === 0) return
  await supabase.from('truck_images').insert(
    urls.map((url, position) => ({ truck_id: truckId, url, position })),
  )
}

async function replaceImages(supabase: AdminClient, truckId: string, urls: string[]) {
  await supabase.from('truck_images').delete().eq('truck_id', truckId)
  await insertImages(supabase, truckId, urls)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function eraLabel(era: string) {
  return era === 'bull' ? 'BULLNOSE' : 'BRICKNOSE'
}

function pickFields(formData: FormData) {
  const era = formData.get('era') as string
  return {
    era,
    era_label:  eraLabel(era),
    year:       Number(formData.get('year')),
    model:      formData.get('model') as string,
    trim:       formData.get('trim') as string,
    engine:     formData.get('engine') as string,
    drive:      formData.get('drive') as string,
    cab:        formData.get('cab') as string,
    trans:      formData.get('trans') as string,
    miles:      Number(formData.get('miles')),
    color:      formData.get('color') as string,
    price:      Number(formData.get('price')),
    status:     formData.get('status') as string,
    location:   formData.get('location') as string,
    tone:        (formData.get('tone') as string) || null,
    description: (formData.get('description') as string) || null,
  }
}

// ── Truck CRUD ────────────────────────────────────────────────────────────────

export async function createTruckAction(
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  const supabase = getAdminClient()
  try {
    const id = (formData.get('id') as string).trim()
    const imageUrls = getImageUrls(formData)
    const truck: Record<string, unknown> = {
      id,
      ...pickFields(formData),
      image_url: imageUrls[0] ?? null,
    }
    const { error } = await supabase.from('trucks').insert(truck)
    if (error) return { error: error.message }
    await insertImages(supabase, id, imageUrls)
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function updateTruckAction(
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  const supabase = getAdminClient()
  const id = formData.get('_id') as string
  try {
    const imageUrls = getImageUrls(formData)
    const updates = {
      ...pickFields(formData),
      image_url: imageUrls[0] ?? null,
    }
    const { error } = await supabase.from('trucks').update(updates).eq('id', id)
    if (error) return { error: error.message }
    await replaceImages(supabase, id, imageUrls)
    revalidatePath('/')
    revalidatePath('/admin')
    revalidatePath(`/trucks/${id}`)
    return { success: true }
  } catch (e) {
    return { error: (e as Error).message }
  }
}

export async function updateStatusAction(
  id: string,
  status: string,
): Promise<{ error: string } | { success: true }> {
  try {
    const supabase = getAdminClient()
    const { error } = await supabase.from('trucks').update({ status }).eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/')
    revalidatePath('/admin')
    revalidatePath(`/trucks/${id}`)
    return { success: true }
  } catch (e) {
    return { error: (e as Error).message }
  }
}
