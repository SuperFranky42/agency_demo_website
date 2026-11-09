import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { services } from '../data/services.js'

const process = [
  { step: 'Discover', body: 'A short call to understand your business, goals, budget and timeline.' },
  { step: 'Scope', body: 'One clear recommendation with deliverables, exclusions and pricing in writing.' },
  { step: 'Build', body: 'We produce, launch and connect the pieces, with agreed revision rounds.' },
  { step: 'Grow', body: 'Monthly reporting, optimisation and new workflows as you scale.' },
]

export default function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title="One partner for your brand, marketing and follow-up.">
        Pick a single service or connect all four into one system that gets you found, captures leads and follows up
        automatically.
      </PageHeader>

      <nav className="sticky top-20 z-30 border-b border-line bg-canvas/95 backdrop-blur md:top-[104px]">
        <div className="container-x no-scrollbar flex gap-8 overflow-x-auto py-4 text-sm font-medium">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 hover:text-accent">
              <span className="text-[10px] text-accent">{s.number}</span> {s.title}
            </a>
          ))}
        </div>
      </nav>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className={`scroll-mt-36 py-16 md:scroll-mt-44 sm:py-20 ${i % 2 === 1 ? 'bg-lilac/40' : ''}`}>
          <div className="container-x grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <span className="font-serif text-6xl text-accent italic">{s.number}</span>
              <h2 className="mt-2 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">{s.title}</h2>
              <span className="mt-4 block h-0.5 w-16 bg-accent" />
              <p className="mt-6 leading-relaxed text-muted">{s.intro}</p>
              <p className="mt-6 text-sm">
                Starting from <span className="font-display text-xl font-bold text-ink">{s.startingFrom}</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/pricing?tab=${s.pricingTab}`} className="btn btn-outline-dark">
                  View pricing
                </Link>
                <Link to={`/contact?service=${s.id}`} className="btn btn-accent">
                  Get a quote
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 rounded-lg bg-surface p-4 text-sm">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <Reveal className="text-center">
            <h2 className="section-title">How we work</h2>
            <span className="accent-rule" />
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 90} className="rounded-lg bg-surface p-6">
                <span className="font-serif text-4xl text-accent italic">0{i + 1}</span>
                <h3 className="mt-2 font-display text-xl font-bold">{p.step}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
