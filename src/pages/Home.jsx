import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroArt from '../components/HeroArt.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import PricingPreview from '../components/PricingPreview.jsx'
import WorkCard from '../components/WorkCard.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { useBookCall } from '../components/BookCallModal.jsx'
import { work } from '../data/work.js'

export default function Home() {
  const { openBookCall } = useBookCall()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_34%_at_50%_62%,rgba(240,78,15,0.36),rgba(240,78,15,0.1)_40%,transparent_68%)] [mask-image:linear-gradient(to_bottom,#000_58%,transparent_90%)] md:bg-[radial-gradient(ellipse_52%_62%_at_68%_46%,rgba(240,78,15,0.32),rgba(240,78,15,0.08)_40%,transparent_70%)] md:[mask-image:linear-gradient(to_bottom,#000_68%,transparent_96%)]"
          aria-hidden="true"
        />
        <div className="container-x relative grid items-center gap-8 py-14 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-6 md:py-20 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-10">
          <div className={`hero-copy min-w-0${entered ? ' is-in' : ''}`}>
            <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Get found.
              <br />
              Get leads.
            </h1>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Follow up automatically.</p>
            <p className="mt-5 max-w-md text-white/70">
              Creative production, digital marketing, websites and AI automation from one partner, connected into a single
              growth system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#services" className="btn btn-accent">
                See services
              </Link>
              <button onClick={() => openBookCall()} className="btn btn-outline-light">
                Book a call
              </button>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section id="services" className="py-16 sm:py-20">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Our services</p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
                Four services.
                <br />
                One pipeline.
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Creative, campaigns, websites and follow-up. Start with one, or connect all four.
              </p>
            </div>
            <Link
              to="/services"
              className="shrink-0 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent"
            >
              Full service list &rarr;
            </Link>
          </Reveal>
          <div className="mt-8 sm:mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <section id="pricing" className="pb-16 sm:pb-20">
        <div className="container-x">
          <PricingPreview />
          <p className="mt-4 text-center text-sm text-muted">
            Starting prices in USD.{' '}
            <Link to="/pricing" className="font-medium text-white underline decoration-accent underline-offset-4 hover:text-accent">
              See every package
            </Link>
          </p>
        </div>
      </section>

      <section id="work" className="pb-16 sm:pb-20">
        <div className="container-x">
          <Reveal className="flex items-end justify-between">
            <div>
              <h2 className="section-title !text-3xl">Recent work</h2>
              <span className="mt-2 block h-0.5 w-12 bg-accent" />
            </div>
            <Link to="/work" className="text-sm font-medium hover:text-accent">
              View all &rarr;
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((item, i) => (
              <Reveal key={item.slug} delay={i * 90}>
                <WorkCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
