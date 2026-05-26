'use client'

import Image from 'next/image'
import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Truck } from '@/types/truck'
import { createTruckAction, updateTruckAction, uploadImageAction, enhanceDescriptionAction } from '@/lib/actions'
import { CameraCapture } from './CameraCapture'

interface ImageSlot { url: string; uploading: boolean }

interface Props {
  truck?: Truck
}

export function TruckForm({ truck }: Props) {
  const isEdit = Boolean(truck)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const [description, setDescription] = useState(truck?.description ?? '')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhanceErr, setEnhanceErr] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [images, setImages] = useState<ImageSlot[]>(() => {
    if (truck?.images && truck.images.length > 0) {
      return truck.images.map(i => ({ url: i.url, uploading: false }))
    }
    if (truck?.image_url) return [{ url: truck.image_url, uploading: false }]
    return []
  })

  async function handleFileAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const slotIdx = images.length
    setImages(prev => [...prev, { url: '', uploading: true }])
    const fd = new FormData()
    fd.append('file', file)
    const result = await uploadImageAction(fd)
    if ('url' in result) {
      setImages(prev => prev.map((img, i) => i === slotIdx ? { url: result.url, uploading: false } : img))
    } else {
      setImages(prev => prev.filter((_, i) => i !== slotIdx))
      setError(result.error)
    }
    e.target.value = ''
  }

  function addUrl() {
    const u = urlInput.trim()
    if (!u) return
    setImages(prev => [...prev, { url: u, uploading: false }])
    setUrlInput('')
  }

  function removeImage(idx: number) {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  async function handleEnhance() {
    if (!description.trim()) return
    setEnhanceErr(null)
    setIsEnhancing(true)
    const fd = formRef.current
    const year  = fd ? (fd.elements.namedItem('year')  as HTMLInputElement)?.value  : ''
    const model = fd ? (fd.elements.namedItem('model') as HTMLSelectElement)?.value : ''
    const engine = fd ? (fd.elements.namedItem('engine') as HTMLInputElement)?.value : ''
    const context = [year, model, engine].filter(Boolean).join(' ')
    const result = await enhanceDescriptionAction(description, context)
    if ('text' in result) {
      setDescription(result.text)
    } else {
      setEnhanceErr(result.error)
    }
    setIsEnhancing(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    fd.set('description', description)
    const valid = images.filter(i => i.url && !i.uploading)
    fd.set('image_count', String(valid.length))
    valid.forEach((img, i) => fd.set(`image_url_${i}`, img.url))
    startTransition(async () => {
      const action = isEdit ? updateTruckAction : createTruckAction
      const result = await action(fd)
      if (result && 'error' in result) {
        setError(result.error)
      } else {
        router.push('/admin')
        router.refresh()
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
      {isEdit && <input type="hidden" name="_id" value={truck!.id} />}

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

      {/* ── Description */}
      <div className="admin-form-section">
        <h2 className="admin-form-section-title mono">Description</h2>
        <div className="field">
          <span className="field-label mono">About this truck</span>
          <textarea
            name="description"
            rows={5}
            placeholder="Describe the truck — condition, notable details, work done…"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="admin-enhance-row">
          <button
            type="button"
            className="btn btn-ghost admin-enhance-btn"
            onClick={handleEnhance}
            disabled={isEnhancing || !description.trim()}
          >
            {isEnhancing ? 'Enhancing…' : 'Enhance with AI'}
            {!isEnhancing && <span className="arr">→</span>}
          </button>
          {enhanceErr && <span className="admin-enhance-err mono">{enhanceErr}</span>}
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

      {/* ── Images */}
      <div className="admin-form-section">
        <h2 className="admin-form-section-title mono">Images</h2>

        {images.length > 0 && (
          <div className="admin-img-grid">
            {images.map((img, i) => (
              <div key={i} className="admin-img-thumb">
                {img.uploading ? (
                  <div className="admin-img-uploading mono">uploading…</div>
                ) : img.url ? (
                  <Image src={img.url} alt="" fill className="tcard-photo" sizes="120px" />
                ) : null}
                {i === 0 && <span className="admin-img-primary mono">PRIMARY</span>}
                <button
                  type="button"
                  className="admin-img-remove"
                  onClick={() => removeImage(i)}
                  aria-label="Remove image"
                >×</button>
              </div>
            ))}
          </div>
        )}

        <div className="admin-img-add">
          <div className="admin-img-add-methods">
            <div className="field">
              <span className="field-label mono">Upload file</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileAdd}
                className="admin-file-input"
                disabled={isPending}
              />
            </div>
            <button
              type="button"
              className="btn btn-ghost admin-img-camera-btn"
              onClick={() => setShowCamera(true)}
            >
              Use camera <span className="arr">→</span>
            </button>
          </div>
          <p className="admin-photo-or mono">— or paste a URL —</p>
          <div className="admin-img-url-row">
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <span className="field-label mono">Image URL</span>
              <input
                type="url"
                placeholder="https://res.cloudinary.com/…"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addUrl() } }}
              />
            </div>
            <button
              type="button"
              className="btn btn-ghost admin-img-add-btn"
              onClick={addUrl}
            >
              Add <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>

      {error && <p className="admin-form-error mono">{error}</p>}

      {showCamera && (
        <CameraCapture
          onCapture={url => setImages(prev => [...prev, { url, uploading: false }])}
          onClose={() => setShowCamera(false)}
        />
      )}

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
