import { Fragment } from 'react'
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
    <Fragment key={slug}>
      <section className="border-b border-line">
        <div className="container-x py-12 sm:py-16">
          <Link to="/work" className="text-sm text-muted hover:text-accent">
            &larr; All work
          </Link>
          <p className="eyebrow mt-6">
            {item.category} &middot; {item.year}
            {item.status && <> &middot; {item.status}</>}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">{item.client}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{item.summary}</p>
          <div className="mt-10 aspect-[16/7] overflow-hidden rounded-md border border-line">
            {item.image ? (
              <img src={item.image} alt={item.client} className="h-full w-full object-cover object-top" />
            ) : (
              <WorkVisual type={item.visual} />
            )}
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
              <h2 className="font-serif text-3xl">{item.status ? 'Progress so far' : 'Results'}</h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {item.results.map((r) => (
                  <div key={r.label} className="rounded-md border border-line bg-ink-soft p-5">
                    <dt className="text-3xl font-bold text-accent">{r.value}</dt>
                    <dd className="mt-2 text-sm text-muted">{r.label}</dd>
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

      {item.gallery && (
        <section className="border-t border-line py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <h2 className="section-title !text-3xl">Screens</h2>
            </Reveal>
            <div className="mt-8 grid items-start gap-8 md:grid-cols-[3fr_1fr]">
              {item.gallery.map((shot, i) => (
                <Reveal key={shot.src} delay={i * 90}>
                  <div
                    className={
                      i === 0
                        ? 'max-h-[600px] overflow-y-auto rounded-md border border-line bg-ink-soft'
                        : 'mx-auto max-h-[600px] max-w-[300px] overflow-y-auto rounded-[2rem] border-4 border-line bg-ink-soft'
                    }
                  >
                    <img src={shot.src} alt={shot.alt} loading="lazy" className="block w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">Scroll inside each screen to see the full page.</p>
          </div>
        </section>
      )}

      {item.videos && (
        <section className="border-t border-line py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <h2 className="section-title !text-3xl">Video work</h2>
              <p className="mt-3 max-w-2xl text-muted">Short-form videos we scripted and edited for {item.client}.</p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-6">
              {item.videos.map((video, i) => (
                <Reveal
                  key={video.src}
                  delay={i * 90}
                  className="aspect-[267/476] w-full max-w-[267px] overflow-hidden rounded-md border border-line bg-ink-soft"
                >
                  <iframe
                    src={video.src}
                    title={video.title}
                    className="h-full w-full"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="section-title !text-3xl">More work</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {others.map((w, i) => (
              <Reveal key={w.slug} delay={i * 90}>
                <WorkCard item={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </Fragment>
  )
}
