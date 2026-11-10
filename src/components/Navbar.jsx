import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/studio', label: 'The studio' },
]

function NavItem({ to, className, children }) {
  if (to.includes('#')) {
    return (
      <Link to={to} className={className({ isActive: false })}>
        {children}
      </Link>
    )
  }
  return (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) => `text-sm font-medium transition hover:text-accent ${isActive ? 'text-accent' : 'text-ink'}`

  return (
    <header className={`sticky top-0 z-40 transition-colors ${scrolled ? 'bg-canvas/90 backdrop-blur-xl' : 'bg-canvas'}`}>
      <nav className="container-x">
        <div className="flex h-20 items-center justify-between border-b border-line md:grid md:h-[104px] md:grid-cols-[1fr_auto_1fr]">
          <Logo />
          <ul className="hidden items-center gap-12 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavItem to={l.to} className={linkClass}>
                  {l.label}
                </NavItem>
              </li>
            ))}
          </ul>

          <div className="hidden items-center justify-end md:flex">
            <Link to="/contact" className="btn btn-dark h-[52px] !pr-[22px]">
              Let&rsquo;s talk <span className="btn-arrow text-[23px]" aria-hidden="true">&#8599;</span>
            </Link>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="relative block h-3.5 w-6">
              <span className={`absolute left-0 block h-0.5 w-6 bg-ink transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-ink transition ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 block h-0.5 w-6 bg-ink transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </nav>

      <div className={`overflow-hidden bg-canvas transition-[max-height] duration-300 md:hidden ${open ? 'max-h-[28rem] border-b border-line' : 'max-h-0'}`}>
        <ul className="container-x flex flex-col gap-1 py-4">
          {[...links, { to: '/contact', label: 'Get a quote' }].map((l) => (
            <li key={l.to}>
              <NavItem to={l.to} className={({ isActive }) => `block py-3 font-display text-2xl font-bold tracking-tight ${isActive ? 'text-accent' : ''}`}>
                {l.label}
              </NavItem>
            </li>
          ))}
          <li className="pt-3">
            <Link to="/contact" className="btn btn-dark w-full">
              Let&rsquo;s talk <span className="btn-arrow" aria-hidden="true">&#8599;</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
