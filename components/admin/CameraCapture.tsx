'use client'

import { useRef, useState, useEffect } from 'react'
import { uploadImageAction } from '@/lib/actions'

interface Props {
  onCapture: (url: string) => void
  onClose: () => void
}

type Phase = 'starting' | 'live' | 'preview' | 'uploading' | 'error'

export function CameraCapture({ onCapture, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [phase, setPhase] = useState<Phase>('starting')
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [uploadErr, setUploadErr] = useState('')
  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    let active = true
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 } },
      })
      .then(stream => {
        if (!active) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        setPhase('live')
      })
      .catch(() => {
        setErrorMsg('Camera unavailable — check browser permissions and that the page is on HTTPS.')
        setPhase('error')
      })
    return () => {
      active = false
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [])

  function capture() {
    const v = videoRef.current
    const c = canvasRef.current
    if (!v || !c) return
    c.width = v.videoWidth
    c.height = v.videoHeight
    c.getContext('2d')?.drawImage(v, 0, 0)
    c.toBlob(blob => {
      if (!blob) return
      setCapturedBlob(blob)
      setPreviewSrc(URL.createObjectURL(blob))
      setUploadErr('')
      setPhase('preview')
    }, 'image/jpeg', 0.92)
  }

  function retake() {
    setPreviewSrc(null)
    setCapturedBlob(null)
    setUploadErr('')
    setPhase('live')
  }

  async function keep() {
    if (!capturedBlob) return
    setPhase('uploading')
    const file = new File([capturedBlob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
    const fd = new FormData()
    fd.append('file', file)
    const result = await uploadImageAction(fd)
    if ('url' in result) {
      onCapture(result.url)
      setSavedCount(n => n + 1)
      retake()
    } else {
      setUploadErr(result.error)
      setPhase('preview')
    }
  }

  function handleClose() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    onClose()
  }

  return (
    <div className="camera-overlay">
      <div className="camera-modal">

        <div className="camera-head">
          <span className="mono">
            CAMERA{savedCount > 0 ? ` · ${savedCount} SAVED` : ''}
          </span>
          <button type="button" className="camera-close" onClick={handleClose}>×</button>
        </div>

        <div className="camera-viewport">
          {/* Video stays in DOM so the stream stays warm during preview */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
            style={{ display: phase === 'live' || phase === 'starting' ? 'block' : 'none' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {(phase === 'preview' || phase === 'uploading') && previewSrc && (
            <img src={previewSrc} alt="Captured" className="camera-preview-img" />
          )}
          {(phase === 'starting' || phase === 'error') && (
            <div className="camera-hint mono">
              {phase === 'error' ? errorMsg : 'Starting camera…'}
            </div>
          )}
        </div>

        <div className="camera-controls">
          {phase === 'live' && (
            <button
              type="button"
              className="camera-shutter"
              onClick={capture}
              aria-label="Capture photo"
            />
          )}

          {(phase === 'preview' || phase === 'uploading') && (
            <div className="camera-review">
              {uploadErr && <p className="mono camera-upload-err">{uploadErr}</p>}
              <div className="camera-review-btns">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={retake}
                  disabled={phase === 'uploading'}
                >
                  ↺ Retake
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={keep}
                  disabled={phase === 'uploading'}
                >
                  {phase === 'uploading' ? 'Uploading…' : 'Keep →'}
                </button>
              </div>
            </div>
          )}

          {phase === 'starting' && <div style={{ height: 56 }} />}

          {phase === 'error' && (
            <button type="button" className="btn btn-ghost" onClick={handleClose}>Close</button>
          )}
        </div>

      </div>
    </div>
  )
}
