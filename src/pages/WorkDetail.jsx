import { Link, useParams } from 'react-router-dom'
import WorkVisual from '../components/WorkVisual.jsx'
import WorkCard from '../components/WorkCard.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Reveal from '../components/Reveal.jsx'
import NotFound from './NotFound.jsx'
import { findWork, work } from '../data/work.js'

export default function WorkDetail() {
  const { slug } = useParams()
  const item = findWork(slug)
  if (!item) return <NotFound />

  const others = work.filter((w) => w.slug !== slug)

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-12 sm:py-16">
          <Link to="/work" className="text-sm text-white/60 hover:text-accent">
            &larr; All work
          </Link>
          <p className="eyebrow mt-6">
            {item.category} &middot; {item.year}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">{item.client}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{item.summary}</p>
          <div className="mt-10 aspect-[16/7] overflow-hidden rounded-md border border-white/10">
            <WorkVisual type={item.visual} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 md:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <Reveal>
              <h2 className="font-serif text-3xl">The challenge</h2>
              <p className="mt-4 leading-relaxed text-muted">{item.challenge}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-serif text-3xl">What we did</h2>
              <p className="mt-4 leading-relaxed text-muted">{item.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="font-serif text-3xl">Results</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {item.results.map((r) => (
                  <div key={r.label} className="rounded-md bg-ink p-5 text-white">
                    <dt className="text-3xl font-bold text-accent">{r.value}</dt>
                    <dd className="mt-2 text-sm text-white/70">{r.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <aside className="h-fit rounded-md border border-line p-6 md:sticky md:top-24">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Services used</h3>
            <ul className="mt-4 space-y-2">
              {item.services.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-accent mt-6 w-full">
              Get similar results
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="container-x">
          <h2 className="section-title !text-3xl">More work</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {others.map((w) => (
              <WorkCard key={w.slug} item={w} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
