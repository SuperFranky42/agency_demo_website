import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Modal from './Modal.jsx'
import { appendToList, makeReference, readList } from '../lib/storage.js'

const BOOKINGS_KEY = 'aegis_bookings'
const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
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

function toKey(date) {
  return date.toISOString().slice(0, 10)
}

function nextWeekdays(count) {
  const days = []
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  while (days.length < count) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d))
  }
  return days
}

// Deterministic pseudo-availability so the demo calendar looks realistically busy.
function isPrebooked(dateKey, time) {
  let hash = 0
  for (const ch of dateKey + time) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return hash % 4 === 0
}

function BookCallFlow({ onClose }) {
  const days = useMemo(() => nextWeekdays(10), [])
  const [step, setStep] = useState(1)
  const [date, setDate] = useState(days[0])
  const [time, setTime] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], notes: '' })
  const [errors, setErrors] = useState({})
  const [booking, setBooking] = useState(null)

  const userBooked = useMemo(
    () => new Set(readList(BOOKINGS_KEY).map((b) => `${b.date}|${b.time}`)),
    [],
  )
  const dateKey = toKey(date)
  const slotTaken = (t) => isPrebooked(dateKey, t) || userBooked.has(`${dateKey}|${t}`)

  const longDate = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Please enter a valid email.'
    setErrors(next)
    if (Object.keys(next).length) return
    const entry = { reference: makeReference('CALL'), date: dateKey, time, ...form, createdAt: new Date().toISOString() }
    appendToList(BOOKINGS_KEY, entry)
    setBooking(entry)
    setStep(3)
  }

  return (
    <Modal open onClose={onClose} title="Book a call" size="max-w-xl">
      <div className="p-6 sm:p-8">
        {step < 3 && (
          <>
            <p className="eyebrow">Step {step} of 2</p>
            <h2 className="mt-2 font-serif text-3xl">{step === 1 ? 'Book a free strategy call' : 'Your details'}</h2>
            <p className="mt-2 text-sm text-muted">
              {step === 1
                ? '30 minutes to talk through your goals and recommend one clear solution.'
                : `${longDate} at ${time} (your local time)`}
            </p>
          </>
        )}

        {step === 1 && (
          <div className="mt-6">
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {days.map((d) => {
                const active = toKey(d) === dateKey
                return (
                  <button
                    key={toKey(d)}
                    onClick={() => {
                      setDate(d)
                      setTime(null)
                    }}
                    className={`flex w-16 shrink-0 flex-col items-center rounded-md border py-2.5 text-sm transition ${
                      active ? 'border-white bg-white text-ink' : 'border-white/25 hover:border-white'
                    }`}
                  >
                    <span className={`text-[11px] uppercase ${active ? 'text-ink/60' : 'text-muted'}`}>
                      {d.toLocaleDateString(undefined, { weekday: 'short' })}
                    </span>
                    <span className="text-lg font-semibold">{d.getDate()}</span>
                    <span className={`text-[11px] ${active ? 'text-ink/60' : 'text-muted'}`}>
                      {d.toLocaleDateString(undefined, { month: 'short' })}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {TIMES.map((t) => {
                const taken = slotTaken(t)
                return (
                  <button
                    key={t}
                    disabled={taken}
                    onClick={() => setTime(t)}
                    className={`rounded-md border py-2 text-sm font-medium transition ${
                      taken
                        ? 'cursor-not-allowed border-line text-white/30 line-through'
                        : time === t
                          ? 'border-accent bg-accent text-white'
                          : 'border-line hover:border-accent hover:text-accent'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

            <button disabled={!time} onClick={() => setStep(2)} className="btn btn-accent mt-6 w-full">
              {time ? `Continue with ${time}` : 'Select a time'}
            </button>
          </div>
        )}

        {step === 2 && (
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
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)} className="btn btn-outline-dark">
                Back
              </button>
              <button type="submit" className="btn btn-accent flex-1">
                Confirm booking
              </button>
            </div>
          </form>
        )}

        {step === 3 && booking && (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h2 className="mt-5 font-serif text-3xl">You are booked in.</h2>
            <p className="mt-3 text-muted">
              Thanks {booking.name.split(' ')[0]}. Your call is on <strong className="text-white">{longDate}</strong> at{' '}
              <strong className="text-white">{booking.time}</strong>. A confirmation will be sent to {booking.email}.
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
