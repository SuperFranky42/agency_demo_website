import { useState } from 'react'
import { makeReference } from '../lib/storage.js'
import { submitForm } from '../lib/submitForm.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function InquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.notes.trim()) next.notes = 'Tell us a little about your project.'
    setErrors(next)
    setSubmitError('')
    if (Object.keys(next).length) {
      document.getElementById(`inq-${Object.keys(next)[0]}`)?.focus()
      return
    }
    setSending(true)
    const reference = makeReference('HEY')
    try {
      await submitForm(
        'inquiry',
        { name: form.name.trim(), email: form.email.trim(), notes: form.notes.trim(), reference },
        'New project inquiry',
      )
      setSent({ name: form.name.trim(), email: form.email.trim(), reference })
    } catch {
      setSubmitError('Something went wrong sending your message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-[380px] flex-col justify-center rounded-[10px] bg-canvas p-6 text-ink sm:p-8">
        <p className="eyebrow">Message received</p>
        <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em]">
          Thanks, {sent.name.split(' ')[0]}. <span className="font-serif font-normal italic text-accent">Talk soon.</span>
        </h3>
        <p className="mt-3 text-[15px] leading-6 text-muted">
          We&rsquo;ll reply to {sent.email} within one business day.
        </p>
        <p className="mt-5 w-fit rounded-full bg-surface px-3 py-1.5 font-mono text-xs">Ref: {sent.reference}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[10px] bg-canvas p-6 pt-[21px] text-ink">
      <h3 className="font-display text-2xl font-bold leading-[31.2px]">Let&rsquo;s make something matter.</h3>
      <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inq-name" className="mb-2 block text-[11px] font-medium text-muted">Name</label>
          <input
            id="inq-name"
            className={`field h-[43px] ${errors.name ? 'field-error' : ''}`}
            placeholder="Your name"
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="inq-email" className="mb-2 block text-[11px] font-medium text-muted">Work email</label>
          <input
            id="inq-email"
            type="email"
            className={`field h-[43px] ${errors.email ? 'field-error' : ''}`}
            placeholder="you@company.com"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="inq-notes" className="mb-2 block text-[11px] font-medium text-muted">What would you like to make happen?</label>
        <textarea
          id="inq-notes"
          rows={3}
          className={`field h-[79px] resize-none ${errors.notes ? 'field-error' : ''}`}
          placeholder="A little about your project, goals, or biggest challenge…"
          value={form.notes}
          onChange={set('notes')}
        />
        {errors.notes && <p className="mt-1 text-xs text-red-700">{errors.notes}</p>}
      </div>
      {submitError && <p className="mt-3 text-sm text-red-700">{submitError}</p>}
      <button
        type="submit"
        disabled={sending}
        className="mt-5 flex h-12 w-full cursor-pointer items-center justify-between rounded-full bg-ink pl-5 pr-4 text-sm font-medium text-canvas transition hover:bg-accent disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Tell us about your project'}
        <span className="text-[23px] leading-none" aria-hidden="true">&#8599;</span>
      </button>
      <p className="mt-3 pl-[3px] text-[10px] leading-[13px] text-muted">No perfect brief required. Just a place to start.</p>
    </form>
  )
}
