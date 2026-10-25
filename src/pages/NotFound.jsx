import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-7xl text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold">This page took a wrong turn.</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-accent mt-8">
        Back to home
      </Link>
    </section>
  )
}
