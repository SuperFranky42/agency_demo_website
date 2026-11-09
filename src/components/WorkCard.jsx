import { Link } from 'react-router-dom'
import WorkVisual from './WorkVisual.jsx'

export default function WorkCard({ item, caption = true }) {
  return (
    <Link to={`/work/${item.slug}`} className="group block focus-visible:outline-none">
      <div className="relative aspect-[640/428] overflow-hidden rounded-lg bg-ink ring-accent ring-offset-2 ring-offset-canvas group-focus-visible:ring-2">
        <div className="absolute inset-0 transition duration-500 group-hover:scale-[1.03]">
          {item.image ? (
            <img src={item.image} alt={item.client} loading="lazy" className="h-full w-full object-cover object-top" />
          ) : (
            <WorkVisual type={item.visual} />
          )}
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-canvas px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-ink sm:left-5 sm:top-5">
          {item.status ? `${item.status} · ${item.year}` : item.year}
        </span>
      </div>
      {caption && (
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold leading-[30px] tracking-[-0.02em] transition group-hover:text-accent">
              {item.client}
            </h3>
            <p className="mt-2 text-[13px] leading-[19.5px] text-muted">{item.category}</p>
          </div>
          <span
            aria-hidden="true"
            className="text-[30px] leading-none transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
          >
            &#8599;
          </span>
        </div>
      )}
    </Link>
  )
}
