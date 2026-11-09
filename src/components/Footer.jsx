import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="lockup" />
          <p className="mt-4 max-w-xs text-sm text-canvas/70">
            One partner for your brand, marketing and lead follow-up systems.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-canvas/70">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-canvas/70">
            <li><Link to="/work" className="hover:text-accent">Work</Link></li>
            <li><Link to="/pricing" className="hover:text-accent">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Get a quote</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-canvas/70">
            <li><a href="mailto:leadcraftmarketingagency@gmail.com" className="hover:text-accent">leadcraftmarketingagency@gmail.com</a></li>
            <li>Mon - Fri, 9:00 - 18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-canvas/15 py-5 text-center text-sm text-canvas/60">
        &copy; {new Date().getFullYear()} LeadCraft. All rights reserved.
      </div>
    </footer>
  )
}
