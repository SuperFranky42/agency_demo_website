import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeroArt from '../components/HeroArt.jsx'
import BrandFilmModal from '../components/BrandFilmModal.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import PricingPreview from '../components/PricingPreview.jsx'
import WorkCard from '../components/WorkCard.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { useBookCall } from '../components/BookCallModal.jsx'
import { work } from '../data/work.js'

export default function Home() {
  const [filmOpen, setFilmOpen] = useState(false)
  const { openBookCall } = useBookCall()

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
          <div className="animate-[fadeIn_0.8s_ease]">
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
          <div className="animate-[fadeIn_1s_ease]">
            <HeroArt onPlay={() => setFilmOpen(true)} />
          </div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-20">
        <div className="container-x">
          <Reveal className="text-center">
            <h2 className="section-title">Our services</h2>
            <span className="accent-rule" />
          </Reveal>
          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <section id="pricing" className="pb-16 sm:pb-20">
        <div className="container-x">
          <PricingPreview />
          <p className="mt-4 text-center text-sm text-muted">
            Starting prices in USD.{' '}
            <Link to="/pricing" className="font-medium text-ink underline decoration-accent underline-offset-4 hover:text-accent">
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

      <BrandFilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
    </>
  )
}
