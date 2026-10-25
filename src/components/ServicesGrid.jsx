import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import Reveal from './Reveal.jsx'

export default function ServicesGrid() {
  return (
    <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <Reveal
          key={s.id}
          delay={i * 90}
          className={`flex flex-col border-line sm:pr-6 ${i % 2 === 1 ? 'sm:border-l sm:pl-6' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
        >
          <Link to={`/services#${s.id}`} className="group flex h-full flex-col">
            <span className="font-serif text-3xl text-accent">{s.number}</span>
            <h3 className="mt-2 font-serif text-2xl leading-tight">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.short}</p>
            <span className="mt-auto pt-6">
              <span className="block h-0.5 w-full origin-left bg-accent transition-transform duration-300 group-hover:scale-x-110" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
