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

function PriceList({ title, unit, tab, items }) {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-ink pb-4">
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">{title}</h3>
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted">{unit}</span>
      </div>
      <ul className="divide-y divide-line">
        {items.map((p) => (
          <li key={p.id}>
            <Link
              to={`/pricing?tab=${tab}#${p.id}`}
              className={`group flex items-center justify-between gap-4 py-4 transition ${p.featured ? '-mx-3 rounded-md bg-lime px-3' : 'hover:pl-1'}`}
            >
              <span className="flex items-center gap-3 font-medium group-hover:text-accent">
                {p.name}
                {p.featured && <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-lime">Popular</span>}
              </span>
              <span className="flex items-center gap-3 font-display text-lg font-bold">
                {p.price}
                <span aria-hidden="true" className="font-sans text-xl font-normal transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&#8599;</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PricingPreview() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-8">
      <Reveal>
        <PriceList title="New business" unit="One-time" tab="launch" items={newBusiness} />
      </Reveal>
      <Reveal delay={100}>
        <PriceList title="Already operating" unit="Per month" tab="monthly" items={operating} />
      </Reveal>
    </div>
  )
}
