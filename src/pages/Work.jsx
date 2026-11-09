import PageHeader from '../components/PageHeader.jsx'
import WorkCard from '../components/WorkCard.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { work } from '../data/work.js'

export default function Work() {
  return (
    <>
      <PageHeader eyebrow="Work" title="Brands built. Pipelines filled.">
        A selection of recent projects across brand identity, campaigns, websites and automation.
      </PageHeader>

      <section className="py-16 sm:py-20">
        <div className="container-x space-y-16">
          {work.map((item, i) => (
            <Reveal key={item.slug} className="grid items-center gap-8 md:grid-cols-2">
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <WorkCard item={item} caption={false} />
              </div>
              <div>
                <p className="eyebrow">
                  {item.category} &middot; {item.year}
                  {item.status && <> &middot; {item.status}</>}
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">{item.client}</h2>
                <p className="mt-4 text-[17px] leading-7 text-muted">{item.summary}</p>
                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
                  {item.results.map((r) => (
                    <div key={r.label}>
                      <dt className="font-display text-2xl font-bold tracking-[-0.03em] text-accent">{r.value}</dt>
                      <dd className="mt-1 text-xs text-muted">{r.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner title="Your project could be next." cta="Start a project" />
    </>
  )
}
