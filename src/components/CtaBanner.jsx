import { Link } from 'react-router-dom'

export default function CtaBanner({
  title = (
    <>
      Build the brand.
      <br />
      Fill the pipeline.
    </>
  ),
  cta = 'Start a project',
  to = '/contact',
}) {
  return (
    <section className="bg-ink py-16 text-center text-white sm:py-20">
      <div className="container-x">
        <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
        <Link to={to} className="btn btn-accent mt-8">
          {cta}
        </Link>
      </div>
    </section>
  )
}
