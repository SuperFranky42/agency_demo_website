import { Link } from 'react-router-dom'
import { services } from '../data/services.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="lockup" />
          <p className="mt-4 max-w-xs text-sm text-muted">
            One partner for your brand, marketing and lead follow-up systems.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
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
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link to="/work" className="hover:text-accent">Work</Link></li>
            <li><Link to="/pricing" className="hover:text-accent">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Get a quote</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><a href="mailto:hello@leadcraft.com" className="hover:text-accent">hello@leadcraft.com</a></li>
            <li>Mon - Fri, 9:00 - 18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} LeadCraft. All rights reserved.
      </div>
    </footer>
  )
}
