import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

const newBusiness = [
  { id: 'brand-starter', name: 'Brand Starter', price: '$499' },
  { id: 'business-launch', name: 'Business Launch', price: '$999' },
  { id: 'launch-automation', name: 'Launch + Automation', price: '$1,799' },
]

const operating = [
  { id: 'essential', name: 'Essential', price: '$399' },
  { id: 'growth-engine', name: 'Growth Engine', price: '$799', featured: true },
  { id: 'complete', name: 'Complete', price: '$1,799' },
]

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </svg>
  )
}

export default function PricingPreview() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Reveal className="rounded-md border border-line bg-white p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl">New business</h3>
          <span className="text-xs text-muted">one-time</span>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {newBusiness.map((p) => (
            <li key={p.id}>
              <Link
                to={`/pricing?tab=launch#${p.id}`}
                className="group flex items-center justify-between py-3 transition hover:pl-1"
              >
                <span className="group-hover:text-accent">{p.name}</span>
                <span className="font-medium text-accent">{p.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={100} className="rounded-md bg-ink p-6 text-white shadow-sm">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl">Already operating</h3>
          <span className="text-xs text-white/60">per month</span>
        </div>
        <ul className="mt-4 space-y-1">
          {operating.map((p) => (
            <li key={p.id}>
              <Link
                to={`/pricing?tab=monthly#${p.id}`}
                className={`flex items-center justify-between rounded-sm px-2 py-3 transition ${p.featured ? 'bg-accent hover:bg-accent-dark' : 'hover:bg-white/10'}`}
              >
                <span className="flex items-center gap-2">
                  {p.featured && <SparkIcon />}
                  {p.name}
                </span>
                <span className="font-medium">{p.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
