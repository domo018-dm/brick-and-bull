'use client'

import { useState } from 'react'

interface FormState {
  year: string
  model: string
  miles: string
  state: string
  notes: string
}

export function SellCTA() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>({ year: '', model: '', miles: '', state: '', notes: '' })
  const [refCode] = useState(() => Math.floor(Math.random() * 90000 + 10000))

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  return (
    <section id="sell" className="section sell">
      <div className="sell-inner">
        <div className="sell-l">
          <div className="kicker light"><span className="kicker-rule" />06 · SELL YOURS</div>
          <h2 className="section-h display light">
            Got a truck<br /> you&apos;d part with?
          </h2>
          <p className="sell-lede">
            We buy outright, take consignments, and pay finder&apos;s fees on cars we end up
            sourcing through your tip. Two-day turnaround on offers. We&apos;ll tell you in
            advance if we&apos;re not the right buyer.
          </p>
          <ul className="sell-bullets">
            <li><span className="mono">01</span> Tell us what you have</li>
            <li><span className="mono">02</span> We send a verbal range within 48 hours</li>
            <li><span className="mono">03</span> We look it over and make a firm offer</li>
            <li><span className="mono">04</span> Wire transfer or cash · you deliver or we arrange pickup</li>
          </ul>
          <div className="sell-call">
            <span className="mono">Or call directly</span>
            <a href="tel:5052049009" className="sell-phone">(505) 204-9009</a>
          </div>
        </div>
        <form className="sell-form" onSubmit={e => { e.preventDefault(); setStep(1) }}>
          <div className="sell-form-head">
            <span className="mono">FORM · 01 OF 01</span>
            <span className="mono">SECURE · ENCRYPTED</span>
          </div>
          {step === 0 ? (
            <>
              <div className="field-row">
                <Field label="Year" placeholder="1987" value={form.year} onChange={update('year')} />
                <Field label="Model" placeholder="F-250" value={form.model} onChange={update('model')} />
              </div>
              <div className="field-row">
                <Field label="Mileage" placeholder="142,800" value={form.miles} onChange={update('miles')} />
                <Field label="State" placeholder="AZ" value={form.state} onChange={update('state')} />
              </div>
              <Field
                label="Notes — drivetrain, rust, paperwork"
                placeholder="7.3 IDI Diesel, 4×4, runs and drives, some rust on cab corners…"
                value={form.notes}
                onChange={update('notes')}
                textarea
              />
              <div className="sell-form-foot">
                <span className="mono">No obligation · no upload required</span>
                <button className="btn btn-primary" type="submit">
                  Request offer <span className="arr">→</span>
                </button>
              </div>
            </>
          ) : (
            <div className="sell-thanks">
              <div className="mono">RECEIVED</div>
              <h3 className="display">We&apos;ll be in touch within 48 hours.</h3>
              <p>
                Reference code{' '}
                <b className="mono">B&amp;B-{refCode}</b>.
                Save it; that&apos;s how we&apos;ll find your truck in our system.
              </p>
              <button
                className="btn btn-ghost"
                onClick={() => { setStep(0); setForm({ year: '', model: '', miles: '', state: '', notes: '' }) }}
              >
                Submit another
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  textarea,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  textarea?: boolean
}) {
  return (
    <label className="field">
      <span className="field-label mono">{label}</span>
      {textarea ? (
        <textarea placeholder={placeholder} value={value} onChange={onChange} rows={4} />
      ) : (
        <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
      )}
    </label>
  )
}
