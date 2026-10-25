import { Link } from 'react-router-dom'
import WorkVisual from './WorkVisual.jsx'

export default function WorkCard({ item }) {
  return (
    <Link
      to={`/work/${item.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-sm bg-ink"
    >
      <div className="absolute inset-0 transition duration-500 group-hover:scale-105">
        <WorkVisual type={item.visual} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-accent">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {item.category}
        </p>
        <p className="mt-1 flex items-center justify-between text-lg font-semibold text-white">
          {item.client}
          <span className="translate-x-[-6px] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true">
            &rarr;
          </span>
        </p>
      </div>
    </Link>
  )
}
