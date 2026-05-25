'use client'

import { useState } from 'react'
import type { Truck } from '@/types/truck'

interface FormState {
  name: string
  phone: string
  email: string
  message: string
}

export function TruckInquiry({ truck }: { truck: Truck }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    message: `I'm interested in the ${truck.year} Ford ${truck.model} ${truck.trim} (B&B / ${truck.id.toUpperCase()}). Please contact me with more details.`,
  })

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const isPending = truck.status === 'pending'

  return (
    <section id="inquiry" className="tinquiry">
      <div className="tinquiry-inner">

        <div className="tinquiry-l">
          <div className="kicker tinquiry-kicker">
            <span className="kicker-rule" />
            {isPending ? '05 · JOIN THE WAITLIST' : '05 · INQUIRE'}
          </div>
          <h2 className="display tinquiry-h">
            {isPending ? <>This one&apos;s<br />pending.</> : <>Interested<br />in this truck?</>}
          </h2>
          <p className="tinquiry-sub">
            {isPending
              ? "This truck is currently under contract. Leave your details and we'll reach out if it becomes available — or if we find something comparable."
              : "Fill out the form and we'll get back to you within one business day. No pressure, no obligation — just straight answers about the truck."}
          </p>
          <div className="sell-call">
            <span className="mono tinquiry-call-label">Or call directly</span>
            <a href="tel:5052049009" className="sell-phone tinquiry-phone">(505) 204-9009</a>
          </div>
        </div>

        {!sent ? (
          <form className="sell-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
            <div className="sell-form-head">
              <span className="mono">INQUIRY · {truck.year} {truck.model.toUpperCase()}</span>
              <span className="mono">SECURE · ENCRYPTED</span>
            </div>
            <div className="field-row">
              <InqField label="Full Name" placeholder="John Smith" value={form.name} onChange={update('name')} />
              <InqField label="Phone" placeholder="(505) 555-0100" value={form.phone} onChange={update('phone')} />
            </div>
            <InqField label="Email" placeholder="you@example.com" value={form.email} onChange={update('email')} />
            <InqField
              label="Message"
              placeholder=""
              value={form.message}
              onChange={update('message')}
              textarea
            />
            <div className="sell-form-foot">
              <span className="mono">No obligation · reply within 24 hrs</span>
              <button className="btn btn-primary" type="submit">
                Send inquiry <span className="arr">→</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="sell-form sell-thanks">
            <div className="mono">RECEIVED</div>
            <h3 className="display">We&apos;ll be in touch within 24 hours.</h3>
            <p>
              We have your inquiry for the <b>{truck.year} Ford {truck.model}</b>.
              We&apos;ll reach out via phone or email shortly.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}

function InqField({
  label, placeholder, value, onChange, textarea,
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
      {textarea
        ? <textarea placeholder={placeholder} value={value} onChange={onChange} rows={4} />
        : <input type="text" placeholder={placeholder} value={value} onChange={onChange} />}
    </label>
  )
}
