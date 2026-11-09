import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import Reveal from './Reveal.jsx'

export default function ServicesGrid() {
  return (
    <div className="grid gap-3 min-[520px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {services.map((s, i) => (
        <Reveal key={s.id} delay={i * 80} className="h-full">
          <Link
            to={`/services#${s.id}`}
            className="panel group relative flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface p-5 transition duration-300 hover:border-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 -top-5 font-serif text-7xl leading-none text-ink/10 transition duration-500 group-hover:text-accent/25"
            >
              {s.number}
            </span>
            <span className="relative font-serif text-3xl leading-none text-accent-dark">{s.number}</span>
            <h3 className="relative mt-5 font-serif text-2xl leading-tight">{s.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
            <span className="relative mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-6 text-sm">
              <span className="whitespace-nowrap">
                <span className="text-muted">From </span>
                <span className="font-semibold text-accent-dark">{s.startingFrom}</span>
              </span>
              <span className="inline-flex items-center whitespace-nowrap font-medium text-ink/70 transition duration-300 group-hover:translate-x-0.5 group-hover:text-accent-dark group-focus-visible:translate-x-0.5 group-focus-visible:text-accent-dark">
                View
                <span aria-hidden="true" className="ml-1">
                  &rarr;
                </span>
              </span>
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
