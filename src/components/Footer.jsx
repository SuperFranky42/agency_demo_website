import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import Logo from './Logo.jsx'

const explore = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/studio', label: 'The studio' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="container-x grid gap-10 pb-10 pt-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] lg:pt-[35px]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo size="footer" className="-ml-1 text-canvas" />
          <p className="mt-4 text-[15px] leading-[22.5px] text-fog">Independent minds. Unforgettable brands.</p>
        </div>
        <div className="lg:pt-[18px]">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.1em] text-fog">Explore</h3>
          <ul className="mt-4 text-sm leading-[26.6px]">
            {explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-lime">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:pt-[18px]">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.1em] text-fog">Services</h3>
          <ul className="mt-4 text-sm leading-[26.6px]">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="hover:text-lime">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:pt-[18px]">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.1em] text-fog">Start something</h3>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-lg font-medium hover:text-lime">
            Let&rsquo;s talk <span aria-hidden="true">&#8599;</span>
          </Link>
          <ul className="mt-3 space-y-1 text-sm text-fog">
            <li>
              <a href="mailto:leadcraftmarketingagency@gmail.com" className="break-all hover:text-lime">
                leadcraftmarketingagency@gmail.com
              </a>
            </li>
            <li>Mon - Fri, 9:00 - 18:00</li>
          </ul>
        </div>
      </div>
      <div className="container-x">
        <div className="flex flex-col gap-2 border-t border-[#484b42] py-5 text-[11px] text-fog sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Offbeat. All rights reserved.</p>
          <p>A little different. By design.</p>
        </div>
      </div>
    </footer>
  )
}
