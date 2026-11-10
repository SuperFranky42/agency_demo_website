import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function InquiryForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [errors, setErrors] = useState({})

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Please enter your first name.'
    if (!form.lastName.trim()) next.lastName = 'Please enter your last name.'
    if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(`inq-${Object.keys(next)[0]}`)?.focus()
      return
    }
    const params = new URLSearchParams({
      first: form.firstName.trim(),
      last: form.lastName.trim(),
      email: form.email.trim(),
    })
    navigate(`/contact?${params.toString()}#need`)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[10px] bg-canvas p-6 pt-[21px] text-ink">
      <h3 className="font-display text-2xl font-bold leading-[31.2px]">Let&rsquo;s make something matter.</h3>
      <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inq-firstName" className="mb-2 block text-[11px] font-medium text-muted">First name</label>
          <input
            id="inq-firstName"
            className={`field h-[43px] ${errors.firstName ? 'field-error' : ''}`}
            placeholder="Jane"
            value={form.firstName}
            onChange={set('firstName')}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-700">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="inq-lastName" className="mb-2 block text-[11px] font-medium text-muted">Last name</label>
          <input
            id="inq-lastName"
            className={`field h-[43px] ${errors.lastName ? 'field-error' : ''}`}
            placeholder="Doe"
            value={form.lastName}
            onChange={set('lastName')}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-700">{errors.lastName}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="inq-email" className="mb-2 block text-[11px] font-medium text-muted">Contact email</label>
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
      <button
        type="submit"
        className="mt-5 flex h-12 w-full cursor-pointer items-center justify-between rounded-full bg-ink pl-5 pr-4 text-sm font-medium text-canvas transition hover:bg-accent"
      >
        Tell us about your project
        <span className="text-[23px] leading-none" aria-hidden="true">&#8599;</span>
      </button>
      <p className="mt-3 pl-[3px] text-[10px] leading-[13px] text-muted">No perfect brief required. Just a place to start.</p>
    </form>
  )
}
