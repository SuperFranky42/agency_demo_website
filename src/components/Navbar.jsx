import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useBookCall } from './BookCallModal.jsx'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openBookCall } = useBookCall()
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition hover:text-accent ${isActive ? 'text-accent' : 'text-white'}`

  return (
    <header
      className={`sticky top-0 z-40 border-b border-transparent bg-ink/90 backdrop-blur ${scrolled ? 'border-line' : ''}`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-black tracking-tight" aria-label="AEGIS home">
            AEGIS
          </Link>
          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/contact" className="text-sm font-medium hover:text-accent">
            Get a quote
          </Link>
          <button onClick={() => openBookCall()} className="btn btn-accent !py-2.5">
            Book a call
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-3.5 w-6">
            <span className={`absolute left-0 block h-0.5 w-6 bg-white transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 block h-0.5 w-6 bg-white transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </nav>

      <div className={`overflow-hidden border-t border-line transition-[max-height] duration-300 md:hidden ${open ? 'max-h-96' : 'max-h-0 border-t-0'}`}>
        <ul className="container-x flex flex-col gap-1 py-4">
          {[...links, { to: '/contact', label: 'Get a quote' }].map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => `block rounded-md px-2 py-3 text-base font-medium ${isActive ? 'text-accent' : ''}`}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-2">
            <button onClick={() => openBookCall()} className="btn btn-accent w-full">
              Book a call
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
