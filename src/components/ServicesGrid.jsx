import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import Reveal from './Reveal.jsx'

export default function ServicesGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-8">
      {services.map((s, i) => (
        <Reveal key={s.id} delay={(i % 2) * 90} className="h-full">
          <Link
            to={`/services#${s.id}`}
            className="group flex h-full flex-col rounded-lg bg-charcoal p-[26px] pt-6 text-canvas transition duration-300 hover:bg-[#33362f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            <span className="flex items-start justify-between">
              <span className="text-xs font-medium leading-[18px] text-lime">{s.number}</span>
              <span
                aria-hidden="true"
                className="-mt-1 text-[30px] leading-none text-fog transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime"
              >
                &#8599;
              </span>
            </span>
            <h3 className="mt-[15px] font-display text-[26px] font-bold leading-9 tracking-[-0.03em] sm:text-[30px]">{s.title}</h3>
            <p className="mt-3 max-w-[588px] text-[15px] leading-6 text-fog">{s.blurb}</p>
            <span className="mt-auto block pt-[26px]">
              <span className="block h-px bg-[#484b42]" />
              <span className="mt-[18px] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[10px] font-medium uppercase leading-[13px]">
                <span className="whitespace-pre-wrap text-lime">{s.tags.join('   /   ')}</span>
                <span className="whitespace-nowrap text-fog normal-case">
                  From <span className="text-[13px] font-semibold text-canvas">{s.startingFrom}</span>
                </span>
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
