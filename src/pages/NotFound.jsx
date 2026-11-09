import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-[120px] leading-none text-accent italic">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em]">This page took a wrong turn.</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-dark mt-8">
        Back to home <span className="btn-arrow" aria-hidden="true">&#8599;</span>
      </Link>
    </section>
  )
}
