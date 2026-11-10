import { Link } from 'react-router-dom'

const sizes = {
  nav: 'text-[28px] tracking-[-0.04em] sm:text-[35px]',
  footer: 'text-7xl leading-none tracking-[-0.05em] sm:text-[108px]',
}

export default function Logo({ size = 'nav', className = '' }) {
  return (
    <Link to="/" aria-label="Oddbeat home" className={`inline-flex shrink-0 font-display font-bold ${sizes[size]} ${className}`}>
      oddbeat™
    </Link>
  )
}
