import { Link } from 'react-router-dom'

export default function CtaBanner({
  title = (
    <>
      Your next big thing
      <br />
      starts with a <span className="font-serif text-[1.22em] font-normal tracking-normal text-canvas italic">hello.</span>
    </>
  ),
  cta = 'Start a project',
  to = '/contact',
}) {
  return (
    <section className="bg-accent py-16 sm:py-20">
      <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow !text-ink">Have a challenge? We&rsquo;re all ears.</p>
          <h2 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-[-0.05em] text-ink sm:text-[68px] lg:-ml-1">
            {title}
          </h2>
        </div>
        <Link to={to} className="btn btn-dark h-[52px] shrink-0 self-start !pr-[22px] lg:self-auto">
          {cta} <span className="btn-arrow text-[23px]" aria-hidden="true">&#8599;</span>
        </Link>
      </div>
    </section>
  )
}
