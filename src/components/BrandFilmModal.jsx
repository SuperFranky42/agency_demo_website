import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'

const frames = [
  { line: 'Get found.', sub: 'Content and campaigns that put you in front of the right people.' },
  { line: 'Get leads.', sub: 'Websites and funnels built to turn visitors into enquiries.' },
  { line: 'Follow up automatically.', sub: 'CRM, AI receptionist and workflows that never miss a lead.' },
  { line: 'Build the brand. Fill the pipeline.', sub: 'AEGIS Agency' },
]

export default function BrandFilmModal({ open, onClose }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!open) return
    setIndex(0)
    setPlaying(true)
  }, [open])

  useEffect(() => {
    if (!open || !playing) return
    const t = setInterval(() => setIndex((i) => (i + 1) % frames.length), 2800)
    return () => clearInterval(t)
  }, [open, playing])

  const frame = frames[index]

  return (
    <Modal open={open} onClose={onClose} title="Brand film" dark size="max-w-3xl">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,var(--color-accent)_0,transparent_45%),radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.25)_0,transparent_40%)] opacity-80" />
        <div key={index} className="relative flex h-full flex-col items-center justify-center px-8 text-center animate-[fadeIn_0.8s_ease]">
          <p className="text-3xl font-extrabold tracking-tight sm:text-5xl">{frame.line}</p>
          <p className="mt-4 max-w-md text-sm text-white/75 sm:text-base">{frame.sub}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 px-5 py-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
          )}
        </button>
        <div className="flex flex-1 gap-1.5">
          {frames.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 flex-1 rounded-full transition ${i <= index ? 'bg-accent' : 'bg-white/20'}`}
              aria-label={`Go to scene ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-xs text-white/60">0:{String((index + 1) * 3).padStart(2, '0')} / 0:12</span>
      </div>
    </Modal>
  )
}
