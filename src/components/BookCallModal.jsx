import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Modal from './Modal.jsx'
import { appendToList, makeReference } from '../lib/storage.js'

const BOOKINGS_KEY = 'aegis_bookings'
const TOPICS = ['New business launch', 'Monthly marketing', 'Website or funnel', 'AI automation / CRM', 'Video and creative', 'Not sure yet']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BookCallContext = createContext({ openBookCall: () => {} })

export function useBookCall() {
  return useContext(BookCallContext)
}

export function BookCallProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openBookCall = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ openBookCall }), [openBookCall])

  return (
    <BookCallContext.Provider value={value}>
      {children}
      {open && <BookCallFlow onClose={close} />}
    </BookCallContext.Provider>
  )
}

function BookCallFlow({ onClose }) {
  const rootRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], notes: '' })
  const [errors, setErrors] = useState({})
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    if (!booking) return
    rootRef.current?.parentElement?.scrollTo({ top: 0 })
  }, [booking])

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Please enter a valid email.'
    setErrors(next)
    if (Object.keys(next).length) return
    const entry = { reference: makeReference('CALL'), ...form, createdAt: new Date().toISOString() }
    appendToList(BOOKINGS_KEY, entry)
    setBooking(entry)
  }

  return (
    <Modal open onClose={onClose} title="Book a call" size="max-w-xl">
      <div ref={rootRef} className="p-6 sm:p-8">
        {!booking && (
          <>
            <h2 className="font-serif text-3xl">Book a free strategy call</h2>
            <p className="mt-2 text-sm text-muted">
              30 minutes to talk through your goals and recommend one clear solution. We will email you to lock in a time.
            </p>

            <form onSubmit={submit} noValidate className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="bc-name">Name</label>
                <input
                  id="bc-name"
                  className={`field ${errors.name ? 'field-error' : ''}`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="bc-email">Email</label>
                <input
                  id="bc-email"
                  type="email"
                  className={`field ${errors.email ? 'field-error' : ''}`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="bc-topic">What would you like to discuss?</label>
                <select id="bc-topic" className="field" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="bc-notes">Anything we should know? <span className="text-muted">(optional)</span></label>
                <textarea id="bc-notes" rows={3} className="field" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-accent w-full">
                Request a call
              </button>
            </form>
          </>
        )}

        {booking && (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h2 className="mt-5 font-serif text-3xl">Request received.</h2>
            <p className="mt-3 text-muted">
              Thanks {booking.name.split(' ')[0]}. We will email {booking.email} to arrange a time that works for you.
            </p>
            <p className="mt-4 inline-block rounded-md bg-white/10 px-3 py-1.5 font-mono text-sm">Ref: {booking.reference}</p>
            <button onClick={onClose} className="btn btn-accent mt-6 w-full">
              Done
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
