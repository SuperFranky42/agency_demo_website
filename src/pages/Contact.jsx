import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { allPackages, findPackage } from '../data/pricing.js'
import { useBookCall } from '../components/BookCallModal.jsx'
import { appendToList, makeReference } from '../lib/storage.js'

const QUOTES_KEY = 'aegis_quotes'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NEEDS = [
  { id: 'launch', label: 'New business launch' },
  { id: 'marketing', label: 'Monthly marketing' },
  { id: 'website', label: 'Business / portfolio website' },
  { id: '3d', label: '3D website' },
  { id: 'ecommerce', label: 'E-commerce store' },
  { id: 'automation', label: 'AI automation / CRM' },
  { id: 'creative', label: 'Video and creative' },
  { id: 'unsure', label: 'Not sure yet' },
]
const OUTCOMES = ['Professional online presence', 'Online sales', 'More qualified leads', 'Automated appointments', 'Less manual work']
const FEATURES = ['Contact forms', 'Payments', 'Product catalogue', 'Booking', 'AI chat / voice', 'Follow-ups', 'CRM', '3D elements', 'Integrations']
const BUDGETS = ['Under $300', '$300 - $500', '$500 - $1,500', '$1,500 - $3,000', '$3,000+', 'Need guidance']
const TIMELINES = ['As soon as possible', '2 - 4 weeks', '1 - 3 months', 'Flexible']
const EXISTING = ['New build', 'Redesign', 'Add automation to an existing platform']

const SERVICE_TO_NEED = { creative: 'creative', marketing: 'marketing', websites: 'website', automation: 'automation' }

function needForPackage(pkg) {
  if (!pkg) return ''
  if (pkg.tabId === 'monthly') return 'marketing'
  if (pkg.tabId === 'launch') return 'launch'
  if (pkg.tabId === 'automation') return 'automation'
  if (pkg.tabId === 'video') return 'creative'
  if (pkg.id.startsWith('3d-')) return '3d'
  if (pkg.id.startsWith('shop-')) return 'ecommerce'
  if (pkg.id.startsWith('ai-')) return 'automation'
  return 'website'
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
        selected ? 'border-white bg-white text-ink' : 'border-white/25 hover:border-white'
      }`}
    >
      {children}
    </button>
  )
}

function Field({ label, error, optional, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [params] = useSearchParams()
  const { openBookCall } = useBookCall()

  const initialPackage = findPackage(params.get('package') ?? '')
  const [form, setForm] = useState(() => ({
    need: needForPackage(initialPackage) || SERVICE_TO_NEED[params.get('service')] || '',
    packageId: initialPackage?.id ?? '',
    name: '',
    email: '',
    business: '',
    industry: '',
    website: '',
    outcome: '',
    features: [],
    budget: '',
    timeline: '',
    existing: '',
    notes: '',
  }))
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const [sending, setSending] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const toggleFeature = (feat) =>
    setForm((f) => ({
      ...f,
      features: f.features.includes(feat) ? f.features.filter((x) => x !== feat) : [...f.features, feat],
    }))

  const validate = () => {
    const next = {}
    if (!form.need) next.need = 'Tell us what you need.'
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.business.trim()) next.business = 'Please enter your business name.'
    if (!form.outcome) next.outcome = 'Choose the main outcome you want.'
    if (!form.budget) next.budget = 'Select a budget range.'
    if (!form.timeline) next.timeline = 'Select a timeline.'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(`q-${Object.keys(next)[0]}`)?.focus()
      return
    }
    setSending(true)
    setTimeout(() => {
      const entry = { reference: makeReference('QTE'), ...form, createdAt: new Date().toISOString() }
      appendToList(QUOTES_KEY, entry)
      setSubmitted(entry)
      setSending(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 700)
  }

  const selectedPackage = findPackage(form.packageId)

  if (submitted) {
    const pkg = findPackage(submitted.packageId)
    return (
      <section className="container-x max-w-2xl py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </div>
        <h1 className="mt-6 font-serif text-4xl sm:text-5xl">Thanks, {submitted.name.split(' ')[0]}.</h1>
        <p className="mt-4 text-lg text-muted">
          We have your request for <strong className="text-white">{submitted.business}</strong>. Expect a reply at{' '}
          {submitted.email} within one business day with one clear recommendation.
        </p>
        <dl className="mx-auto mt-8 grid max-w-md gap-3 rounded-md border border-line p-5 text-left text-sm">
          <div className="flex justify-between gap-4"><dt className="text-muted">Reference</dt><dd className="font-mono">{submitted.reference}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted">Need</dt><dd>{NEEDS.find((n) => n.id === submitted.need)?.label}</dd></div>
          {pkg && <div className="flex justify-between gap-4"><dt className="text-muted">Package</dt><dd className="text-right">{pkg.name} ({pkg.price})</dd></div>}
          <div className="flex justify-between gap-4"><dt className="text-muted">Budget</dt><dd>{submitted.budget}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted">Timeline</dt><dd>{submitted.timeline}</dd></div>
        </dl>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => openBookCall()} className="btn btn-accent">Book a call now</button>
          <Link to="/" className="btn btn-outline-dark">Back to home</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="border-b border-line">
        <div className="container-x py-14 sm:py-20">
          <p className="eyebrow">Get a quote</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Tell us what you are building.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            A few quick questions so we can recommend one clear solution, not a long menu of options.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <form onSubmit={onSubmit} noValidate className="space-y-10">
            <fieldset className="space-y-5">
              <legend className="font-serif text-2xl">1. What do you need?</legend>
              <div id="q-need" tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                {NEEDS.map((n) => (
                  <Chip key={n.id} selected={form.need === n.id} onClick={() => setForm((f) => ({ ...f, need: n.id }))}>
                    {n.label}
                  </Chip>
                ))}
              </div>
              {errors.need && <p className="text-xs text-red-600">{errors.need}</p>}
              <Field label="Interested in a specific package?" optional htmlFor="q-package">
                <select id="q-package" className="field" value={form.packageId} onChange={set('packageId')}>
                  <option value="">No specific package</option>
                  {allPackages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} ({p.price})
                    </option>
                  ))}
                </select>
              </Field>
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="font-serif text-2xl">2. About you and your business</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" error={errors.name} htmlFor="q-name">
                  <input id="q-name" className={`field ${errors.name ? 'field-error' : ''}`} value={form.name} onChange={set('name')} autoComplete="name" />
                </Field>
                <Field label="Email" error={errors.email} htmlFor="q-email">
                  <input id="q-email" type="email" className={`field ${errors.email ? 'field-error' : ''}`} value={form.email} onChange={set('email')} autoComplete="email" />
                </Field>
                <Field label="Business name" error={errors.business} htmlFor="q-business">
                  <input id="q-business" className={`field ${errors.business ? 'field-error' : ''}`} value={form.business} onChange={set('business')} autoComplete="organization" />
                </Field>
                <Field label="Industry" optional htmlFor="q-industry">
                  <input id="q-industry" className="field" value={form.industry} onChange={set('industry')} />
                </Field>
              </div>
              <Field label="Current website or social profile" optional htmlFor="q-website">
                <input id="q-website" className="field" placeholder="https://" value={form.website} onChange={set('website')} />
              </Field>
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="font-serif text-2xl">3. Goals and requirements</legend>
              <div>
                <p className="mb-2 text-sm font-medium">Main outcome you want</p>
                <div id="q-outcome" tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                  {OUTCOMES.map((o) => (
                    <Chip key={o} selected={form.outcome === o} onClick={() => setForm((f) => ({ ...f, outcome: o }))}>
                      {o}
                    </Chip>
                  ))}
                </div>
                {errors.outcome && <p className="mt-1 text-xs text-red-600">{errors.outcome}</p>}
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">
                  What must it do? <span className="font-normal text-muted">(select all that apply)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {FEATURES.map((f) => (
                    <Chip key={f} selected={form.features.includes(f)} onClick={() => toggleFeature(f)}>
                      {f}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Budget range" error={errors.budget} htmlFor="q-budget">
                  <select id="q-budget" className={`field ${errors.budget ? 'field-error' : ''}`} value={form.budget} onChange={set('budget')}>
                    <option value="">Select...</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="Timeline" error={errors.timeline} htmlFor="q-timeline">
                  <select id="q-timeline" className={`field ${errors.timeline ? 'field-error' : ''}`} value={form.timeline} onChange={set('timeline')}>
                    <option value="">Select...</option>
                    {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium">Do you already have a website or system?</p>
                <div className="flex flex-wrap gap-2">
                  {EXISTING.map((x) => (
                    <Chip key={x} selected={form.existing === x} onClick={() => setForm((f) => ({ ...f, existing: f.existing === x ? '' : x }))}>
                      {x}
                    </Chip>
                  ))}
                </div>
              </div>
              <Field label="Anything else we should know?" optional htmlFor="q-notes">
                <textarea
                  id="q-notes"
                  rows={4}
                  className="field"
                  placeholder="Reference websites, must-have features, content availability, constraints..."
                  value={form.notes}
                  onChange={set('notes')}
                />
              </Field>
            </fieldset>

            <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">We reply within one business day. No spam, ever.</p>
              <button type="submit" disabled={sending} className="btn btn-accent sm:min-w-48">
                {sending ? 'Sending...' : 'Request my quote'}
              </button>
            </div>
          </form>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {selectedPackage && (
              <div className="rounded-md border border-line bg-ink-soft p-6">
                <p className="eyebrow">Selected package</p>
                <h3 className="mt-2 font-serif text-2xl">{selectedPackage.name}</h3>
                <p className="mt-1">
                  <span className="text-2xl font-bold text-accent">{selectedPackage.price}</span>{' '}
                  <span className="text-sm text-muted">{selectedPackage.unit}</span>
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {selectedPackage.features.slice(0, 4).map((f) => (
                    <li key={f}>&middot; {f}</li>
                  ))}
                </ul>
                <Link to={`/pricing?tab=${selectedPackage.tabId}#${selectedPackage.id}`} className="mt-4 inline-block text-sm text-accent hover:underline">
                  View full details &rarr;
                </Link>
              </div>
            )}
            <div className="rounded-md border border-line p-6">
              <h3 className="font-serif text-2xl">Prefer to talk?</h3>
              <p className="mt-2 text-sm text-muted">Book a free 30-minute strategy call and we will scope it together.</p>
              <button onClick={() => openBookCall()} className="btn btn-outline-dark mt-4 w-full">
                Book a call
              </button>
            </div>
            <div className="rounded-md border border-line p-6 text-sm">
              <h3 className="font-semibold">What happens next</h3>
              <ol className="mt-3 space-y-2 text-muted">
                <li><span className="font-semibold text-accent">1.</span> We review your answers.</li>
                <li><span className="font-semibold text-accent">2.</span> You get one clear recommendation and quote.</li>
                <li><span className="font-semibold text-accent">3.</span> Scope is confirmed in writing before work begins.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
