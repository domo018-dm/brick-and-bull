'use client'

import Image from 'next/image'
import { useState, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Truck } from '@/types/truck'
import { createTruckAction, updateTruckAction } from '@/lib/actions'

interface Props {
  truck?: Truck
}

export function TruckForm({ truck }: Props) {
  const isEdit = Boolean(truck)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(truck?.image_url ?? null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const action = isEdit ? updateTruckAction : createTruckAction
      const result = await action(formData)
      if (result && 'error' in result) {
        setError(result.error)
      } else {
        router.push('/admin')
        router.refresh()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {isEdit && <input type="hidden" name="_id" value={truck!.id} />}
      {/* Preserve existing URL if no new file/URL is provided */}
      <input type="hidden" name="existing_image_url" value={truck?.image_url ?? ''} />

      {/* ── Identity */}
      <div className="admin-form-section">
        <h2 className="admin-form-section-title mono">Identity</h2>
        <div className="admin-form-grid">
          {!isEdit && (
            <F label="Listing ID" name="id" placeholder="tk-02" required hint="Unique slug — used in the URL" />
          )}
          <div className="field">
            <span className="field-label mono">Era</span>
            <select name="era" defaultValue={truck?.era ?? 'brick'} required>
              <option value="brick">Bricknose '87–'91</option>
              <option value="bull">Bullnose '80–'86</option>
            </select>
          </div>
          <F label="Year" name="year" type="number" placeholder="1987" defaultValue={truck?.year} required />
          <div className="field">
            <span className="field-label mono">Model</span>
            <select name="model" defaultValue={truck?.model ?? 'F-250'} required>
              {['F-100','F-150','F-250','F-350'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <F label="Trim" name="trim" placeholder="XLT Lariat" defaultValue={truck?.trim} required />
        </div>
      </div>

      {/* ── Technical */}
      <div className="admin-form-section">
        <h2 className="admin-form-section-title mono">Technical</h2>
        <div className="admin-form-grid">
          <F label="Engine" name="engine" placeholder="7.5L 460 V8" defaultValue={truck?.engine} required />
          <div className="field">
            <span className="field-label mono">Drive</span>
            <select name="drive" defaultValue={truck?.drive ?? '4×4'} required>
              <option value="4×4">4×4</option>
              <option value="4×2">4×2</option>
            </select>
          </div>
          <F label="Transmission" name="trans" placeholder="5-Spd ZF Manual" defaultValue={truck?.trans} required />
          <div className="field">
            <span className="field-label mono">Cab Style</span>
            <select name="cab" defaultValue={truck?.cab ?? 'Regular'} required>
              {['Regular','SuperCab','Crew'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Details */}
      <div className="admin-form-section">
        <h2 className="admin-form-section-title mono">Details</h2>
        <div className="admin-form-grid">
          <F label="Mileage" name="miles" type="number" placeholder="84200" defaultValue={truck?.miles} required />
          <F label="Color" name="color" placeholder="Chestnut / Cream Two-Tone" defaultValue={truck?.color} required />
          <F label="Location" name="location" placeholder="Phoenix, AZ" defaultValue={truck?.location} required />
          <F label="Tone (optional)" name="tone" placeholder="warm" defaultValue={truck?.tone ?? ''} />
        </div>
      </div>

      {/* ── Commercial */}
      <div className="admin-form-section">
        <h2 className="admin-form-section-title mono">Commercial</h2>
        <div className="admin-form-grid">
          <F label="Price ($)" name="price" type="number" placeholder="28500" defaultValue={truck?.price} required />
          <div className="field">
            <span className="field-label mono">Status</span>
            <select name="status" defaultValue={truck?.status ?? 'coming_soon'} required>
              <option value="coming_soon">Coming Soon</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Photo */}
      <div className="admin-form-section">
        <h2 className="admin-form-section-title mono">Photo</h2>
        <div className="admin-photo-wrap">
          {preview && (
            <div className="admin-photo-preview">
              <Image src={preview} alt="Preview" fill className="tcard-photo" sizes="320px" />
            </div>
          )}
          <div className="admin-photo-inputs">
            <div className="field">
              <span className="field-label mono">Upload new image</span>
              <input
                ref={fileRef}
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFile}
                className="admin-file-input"
              />
            </div>
            <p className="admin-photo-or mono">— or paste URL —</p>
            <div className="field">
              <span className="field-label mono">Image URL</span>
              <input
                type="url"
                name="image_url_manual"
                placeholder="https://res.cloudinary.com/…"
                defaultValue=""
                onFocus={() => { if (fileRef.current) fileRef.current.value = '' }}
              />
            </div>
          </div>
        </div>
      </div>

      {error && <p className="admin-form-error mono">{error}</p>}

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create listing'}
          {!isPending && <span className="arr">→</span>}
        </button>
        <a href="/admin" className="btn btn-ghost">Cancel</a>
      </div>
    </form>
  )
}

function F({
  label, name, type = 'text', placeholder, defaultValue, required, hint,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  defaultValue?: string | number | null
  required?: boolean
  hint?: string
}) {
  return (
    <label className="field">
      <span className="field-label mono">{label}{hint && <span className="admin-field-hint"> — {hint}</span>}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ''}
        required={required}
      />
    </label>
  )
}
