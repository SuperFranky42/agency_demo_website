import { Link } from 'react-router-dom'

export default function PricingCard({ pkg, targeted = false }) {
  const featured = pkg.highlight
  return (
    <article
      id={pkg.id}
      className={`relative flex scroll-mt-40 flex-col rounded-md border bg-ink-soft p-6 transition ${
        featured ? 'border-accent' : 'border-line'
      } ${targeted ? 'ring-2 ring-accent ring-offset-4 ring-offset-ink' : ''}`}
    >
      {pkg.badge && (
        <span className="absolute -top-3 left-6 rounded-sm bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          {pkg.badge}
        </span>
      )}
      <h3 className="font-serif text-2xl">{pkg.name}</h3>
      <p className="mt-2 text-sm text-muted">{pkg.tagline}</p>
      <p className="mt-5">
        <span className="text-3xl font-bold text-accent">{pkg.price}</span>{' '}
        <span className="text-sm text-muted">{pkg.unit}</span>
      </p>
      <ul className="mt-5 space-y-2.5 text-sm">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="currentColor" aria-hidden="true">
              <path d="M7.6 13.4 4.2 10l-1.2 1.2 4.6 4.6 9.4-9.4-1.2-1.2z" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <Link to={`/contact?package=${pkg.id}`} className={`btn w-full ${featured ? 'btn-accent' : 'btn-outline-dark'}`}>
          Get started
        </Link>
      </div>
    </article>
  )
}
