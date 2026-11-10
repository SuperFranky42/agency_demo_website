import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Reveal from '../components/Reveal.jsx'

const principles = [
  {
    title: 'Strategy meets craft',
    body: 'The plan and the work stay in the same room. Creative, campaigns, websites, and automation are scoped as one system.',
  },
  {
    title: 'Built around you',
    body: 'Start with one project or connect several services. The scope follows the business, not a fixed package.',
  },
  {
    title: 'Clear communication',
    body: 'You stay involved as the pieces come together. Deliverables, exclusions, and pricing are agreed in writing before the work begins.',
  },
]

const members = [
  {
    image: '/studio/web-technical.jpg',
    alt: 'Studio lead for websites and technical work, seated with a laptop',
    number: '01',
    role: 'Websites & technical',
    body: 'Leads the sites, funnels, and the systems behind them. Structure, forms, tracking, and the automation that keeps a lead moving after the click.',
    links: [
      { to: '/services#websites', label: 'Websites and funnels' },
      { to: '/services#automation', label: 'AI automation' },
    ],
  },
  {
    image: '/studio/video-marketing.jpg',
    alt: 'Studio lead for video and marketing, holding a camera',
    number: '02',
    role: 'Video & marketing',
    body: 'Leads the edit and the campaigns around it. Short-form, brand films, and the marketing that puts that work in front of the right people.',
    links: [
      { to: '/services#creative', label: 'Creative production' },
      { to: '/services#marketing', label: 'Digital marketing' },
    ],
  },
]

export default function Studio() {
  return (
    <>
      <PageHeader eyebrow="The studio" title={<>Think bigger.<br />Beat the odds.</>}>
        We bring creative, marketing, digital experiences, and automation into one connected plan. Less handoff. More
        forward motion.
      </PageHeader>

      <section className="container-x py-16 sm:py-20">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-12">
          {members.map((member, i) => (
            <Reveal key={member.role} delay={i * 100} className={i === 1 ? 'lg:mt-28' : ''}>
              <div className="overflow-hidden rounded-lg bg-surface">
                <img
                  src={member.image}
                  alt={member.alt}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <p className="eyebrow mt-6">
                <span className="text-accent">{member.number}</span> {member.role}
              </p>
              <p className="mt-4 max-w-xl text-[17px] leading-[28.05px] text-muted">{member.body}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {member.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm font-medium hover:text-accent">
                      {link.label} <span aria-hidden="true">&#8599;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">How we show up</p>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              A partner for the whole picture.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 90} className="rounded-lg bg-surface p-6">
                <span className="font-serif text-4xl text-accent italic">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Your next big thing
            <br />
            starts here.
          </>
        }
        cta="Let’s talk"
      />
    </>
  )
}
