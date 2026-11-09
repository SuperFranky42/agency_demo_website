import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShowcaseCards from '../components/ShowcaseCards.jsx'
import ServicesGrid from '../components/ServicesGrid.jsx'
import PricingPreview from '../components/PricingPreview.jsx'
import WorkCard from '../components/WorkCard.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import Reveal from '../components/Reveal.jsx'
import { useBookCall } from '../components/BookCallModal.jsx'
import { services } from '../data/services.js'
import { work } from '../data/work.js'

const steps = [
  {
    title: 'Find the angle.',
    body: 'We get to know your business, your audience, and what you’re trying to change. Then we turn the big picture into a focused plan.',
  },
  {
    title: 'Make it matter.',
    body: 'We bring the strategy to life through content, campaigns, websites, and smart workflows. You stay involved as the pieces come together.',
  },
  {
    title: 'Launch. Learn. Repeat.',
    body: 'We put the work out into the world, pay attention to what happens, and refine the next move. Progress is a process.',
  },
]

const faqs = [
  {
    q: 'Do I need all four services?',
    a: 'Not at all. We can focus on one challenge or connect several services into a single plan. The starting point is what your business needs.',
  },
  {
    q: 'Can we start with a single project?',
    a: 'Yes. Start with a launch, a website, a campaign, or a workflow. We’ll shape a clear scope around the work you want to get done.',
  },
  {
    q: 'How do you price a project?',
    a: 'Scope, complexity, and deliverables shape the investment. We’ll talk through your goals and agree on the plan before we begin.',
    link: { to: '/pricing', label: 'See starting prices' },
  },
  {
    q: 'Where could AI automation help my business?',
    a: 'Start with repetitive tasks: qualifying leads, following up, or moving information between tools. We identify what’s useful before we build.',
  },
]

function SectionHead({ eyebrow, title, children, dark = false }) {
  return (
    <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-end lg:gap-10">
      <div>
        <p className={`eyebrow ${dark ? '!text-fog' : ''}`}>{eyebrow}</p>
        <h2 className={`display-title mt-6 lg:-ml-1 ${dark ? 'text-canvas' : ''}`}>{title}</h2>
      </div>
      {children && <p className={`text-[17px] leading-[28.05px] lg:pb-7 ${dark ? 'text-fog' : 'text-muted'}`}>{children}</p>}
    </Reveal>
  )
}

function Arrow({ className = '' }) {
  return (
    <span aria-hidden="true" className={`leading-none ${className}`}>
      &#8599;
    </span>
  )
}

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
      <section className="container-x">
        <div className={`hero-copy pt-8 sm:pt-[39px]${entered ? ' is-in' : ''}`}>
          <p className="eyebrow !text-ink">Independent minds. Unforgettable brands.</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_396px] lg:gap-10">
            <h1 className="font-display text-[42px] font-bold leading-[1.03] tracking-[-0.06em] min-[420px]:text-[50px] sm:text-[76px] lg:-ml-[7px] xl:text-[100px]">
              We make brands
              <br />
              hard to{' '}
              <span className="font-serif text-[1.16em] font-normal tracking-[-0.03em] text-accent italic">ignore.</span>
            </h1>
            <div className="lg:pt-9">
              <p className="text-[17px] leading-[29px] text-muted">
                Standout creative. Smarter marketing.
                <br />
                Websites and funnels that convert.
                <br />
                AI automation that gives you time back.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link to="/contact" className="btn btn-accent h-[52px] !pr-[22px]">
                  Let&rsquo;s make some noise <Arrow className="text-[23px]" />
                </Link>
                <button onClick={() => openBookCall()} className="cursor-pointer text-sm font-medium underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent">
                  Book a call
                </button>
              </div>
              <p className="mt-5 pl-2 text-xs text-muted">
                <span className="mr-2 text-accent">&#9679;</span>Open for new projects
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-2 pb-[33px] lg:mt-[58px]">
            <p className="eyebrow !text-ink">A little of what we do</p>
            <p className="text-[13px] text-muted">Different disciplines. Same obsession.</p>
          </div>
        </div>
        <ShowcaseCards />
        <div className="mt-9 grid grid-cols-2 items-center gap-x-6 gap-y-4 border-t border-line py-6 sm:grid-cols-3 lg:flex lg:justify-between lg:py-[25px]">
          <p className="col-span-full text-[10px] font-medium leading-[15px] text-muted sm:col-span-1 lg:w-[196px]">
            YOUR NEXT BIG THING,
            <br />
            ALL UNDER ONE ROOF.
          </p>
          {services.map((s) => (
            <Link key={s.id} to={`/services#${s.id}`} className="group flex items-baseline gap-3 hover:text-accent">
              <span className="text-[10px] font-medium text-accent">{s.number}</span>
              <span className="text-base font-medium">{s.title}</span>
            </Link>
          ))}
          <Link to="/services" aria-label="All services" className="hidden text-[29px] leading-none transition hover:translate-x-1 hover:-translate-y-1 hover:text-accent lg:block">
            &#8599;
          </Link>
        </div>
      </section>

      <section id="services" className="bg-ink pb-16 pt-14 sm:pb-[104px] sm:pt-[62px]">
        <div className="container-x">
          <SectionHead
            dark
            eyebrow="01 / What we do"
            title={
              <>
                Everything you need.
                <br />
                Nothing off the shelf.
              </>
            }
          >
            From the first idea to the next conversion, we connect the creative, the strategy, and the systems behind your
            growth.
          </SectionHead>
          <div className="mt-12 lg:mt-[59px]">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <section id="work" className="pb-16 pt-14 sm:pb-[72px] sm:pt-16">
        <div className="container-x">
          <SectionHead
            eyebrow="02 / Recent work"
            title={
              <>
                Ideas with
                <br />
                main-character energy.
              </>
            }
          >
            A glimpse of what we&rsquo;ve built. Real projects that bring our creative approach to life.
          </SectionHead>
          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-[39px]">
            {work.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 2) * 90}>
                <WorkCard item={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/work" className="btn btn-outline-dark">
              View all work <Arrow className="text-xl" />
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <SectionHead eyebrow="03 / Starting prices" title="Clear prices. No surprises.">
            Starting prices in USD. Final scope is confirmed in writing before any work begins.
          </SectionHead>
          <div className="mt-12">
            <PricingPreview />
          </div>
          <p className="mt-8 text-sm text-muted">
            <Link to="/pricing" className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              See every package
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-lilac pb-16 pt-14 sm:pb-24 sm:pt-[60px]">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow !text-plum">04 / How we get there</p>
            <h2 className="mt-7 font-display text-5xl font-bold leading-[1.08] tracking-[-0.05em] sm:text-[62px] lg:-ml-1">
              Big ideas. Clear next steps.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-[63px]">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="border-t border-[#ab9cc0]">
                <div className="mt-[25px] flex items-start justify-between">
                  <span className="font-serif text-[45px] leading-[49.5px] text-plum italic">0{i + 1}</span>
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="mt-2 hidden text-[30px] leading-none text-plum md:block">
                      &rarr;
                    </span>
                  )}
                </div>
                <h3 className="mt-[21px] font-display text-[27px] font-bold leading-[33.75px]">{s.title}</h3>
                <p className="mt-[22px] max-w-[416px] text-[15px] leading-[25.5px] text-plum">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="studio" className="container-x">
        <div className="grid gap-10 border-b border-line pb-16 pt-14 sm:pb-[90px] sm:pt-[60px] lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <p className="eyebrow">05 / The offbeat way</p>
            <p className="mt-8 font-serif text-[64px] leading-[1.03] tracking-[-0.03em] text-accent italic sm:text-[84px] lg:-ml-1">
              Think bigger.
              <br />
              Stay offbeat.
            </p>
          </Reveal>
          <Reveal delay={100} className="lg:pt-[55px]">
            <h2 className="font-display text-[28px] font-bold leading-[36.4px] tracking-[-0.02em]">
              The best ideas don&rsquo;t live in silos.
              <br />
              Neither should your agency.
            </h2>
            <p className="mt-6 max-w-[640px] text-[17px] leading-[28.05px] text-muted">
              We bring creative, marketing, digital experiences, and automation into one connected plan. Less handoff. More
              forward motion. A partner for the whole picture.
            </p>
            <ul className="mt-12 flex flex-wrap gap-4">
              {['Strategy meets craft', 'Built around you', 'Clear communication'].map((p) => (
                <li key={p} className="rounded-full bg-surface px-[14px] py-[9px] text-[11px] font-medium leading-[14.3px]">
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/studio" className="mt-8 inline-flex items-center gap-2 text-base font-medium hover:text-accent">
              Meet the studio <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="container-x">
        <div className="grid gap-12 pb-16 pt-14 sm:pb-[55px] sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,752px)] lg:gap-6">
          <Reveal className="flex flex-col">
            <p className="eyebrow">06 / Good questions</p>
            <h2 className="mt-8 max-w-[540px] font-display text-5xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-[60px] lg:-ml-1">
              A few things
              <br />
              you might be
              <br />
              wondering.
            </h2>
            <p className="mt-10 text-[15px] leading-[22.5px] text-muted lg:mt-[68px]">Something else on your mind?</p>
            <Link to="/contact" className="mt-3 inline-flex w-fit items-center gap-2 text-base font-medium hover:text-accent">
              Let&rsquo;s talk <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={100} className="lg:pt-[87px]">
            {faqs.map((f) => (
              <details key={f.q} open className="faq-item group border-b border-line pb-[18px] pt-[18px] first:pt-0">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[19px] font-medium leading-[24.7px] hover:text-accent">
                  {f.q}
                  <span aria-hidden="true" className="faq-icon text-2xl leading-none font-normal text-muted transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-[14px] max-w-[700px] text-[15px] leading-6 text-muted">
                  {f.a}{' '}
                  {f.link && (
                    <Link to={f.link.to} className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                      {f.link.label}
                    </Link>
                  )}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="start" className="bg-accent py-14 sm:py-[60px]">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_576px] lg:gap-16">
          <div className="flex flex-col">
            <p className="eyebrow !text-ink">Have a challenge? We&rsquo;re all ears.</p>
            <h2 className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-[-0.05em] text-ink sm:text-[68px] lg:-ml-1">
              Your next big thing
              <br />
              starts with a{' '}
              <span className="font-serif text-[1.22em] font-normal tracking-normal text-canvas italic">hello.</span>
            </h2>
            <p className="mt-8 max-w-[660px] text-[17px] leading-[28.05px] text-ink">
              A rough idea. An ambitious plan. A problem worth solving. Tell us what&rsquo;s on your mind &mdash; we&rsquo;ll
              take it from there.
            </p>
            <p className="mt-10 text-[11px] font-medium uppercase leading-[16.5px] text-ink lg:mt-auto">
              <span className="mr-2">&#9679;</span>Open for new projects
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  )
}
