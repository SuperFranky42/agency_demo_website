import { Link } from 'react-router-dom'

export default function Logo({ variant = 'wordmark' }) {
  if (variant === 'lockup') {
    return (
      <Link to="/" aria-label="LeadCraft home" className="inline-block max-w-[15.5rem]">
        <img
          src="/logo-lockup.png"
          alt="LeadCraft. We craft demand. You close deals. Growth and marketing agency."
          className="h-auto w-full"
        />
      </Link>
    )
  }

  return (
    <Link to="/" aria-label="LeadCraft home" className="inline-flex shrink-0">
      <img src="/logo-wordmark.png" alt="" className="h-16 w-auto" />
    </Link>
  )
}
