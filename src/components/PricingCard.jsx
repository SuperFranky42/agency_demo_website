import { Link } from 'react-router-dom'

export default function PricingCard({ pkg, targeted = false }) {
  const featured = pkg.highlight
  return (
    <article
      id={pkg.id}
      className={`relative flex scroll-mt-40 flex-col md:scroll-mt-48 rounded-lg p-6 transition ${
        featured ? 'bg-ink text-canvas' : 'bg-surface'
      } ${targeted ? 'ring-2 ring-accent ring-offset-4 ring-offset-canvas' : ''}`}
    >
      {pkg.badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-ink">
          {pkg.badge}
        </span>
      )}
      <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">{pkg.name}</h3>
      <p className={`mt-2 text-sm ${featured ? 'text-fog' : 'text-muted'}`}>{pkg.tagline}</p>
      <p className="mt-5">
        <span className={`font-display text-3xl font-bold tracking-[-0.03em] ${featured ? 'text-lime' : 'text-ink'}`}>{pkg.price}</span>{' '}
        <span className={`text-sm ${featured ? 'text-fog' : 'text-muted'}`}>{pkg.unit}</span>
      </p>
      <ul className={`mt-5 space-y-2.5 border-t pt-5 text-sm ${featured ? 'border-[#484b42]' : 'border-line'}`}>
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <svg viewBox="0 0 20 20" className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-lime' : 'text-accent'}`} fill="currentColor" aria-hidden="true">
              <path d="M7.6 13.4 4.2 10l-1.2 1.2 4.6 4.6 9.4-9.4-1.2-1.2z" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        <Link
          to={`/contact?package=${pkg.id}`}
          className={`btn w-full justify-between ${featured ? 'btn-accent' : 'btn-dark'}`}
        >
          Get started <span className="btn-arrow" aria-hidden="true">&#8599;</span>
        </Link>
      </div>
    </article>
  )
}
