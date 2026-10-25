export default function HeroArt({ onPlay }) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/70 bg-ink">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="white" strokeWidth="1" fill="none" opacity="0.85">
          <ellipse cx="200" cy="150" rx="150" ry="95" transform="rotate(-22 200 150)" />
          <path d="M20 250 C 80 230, 120 130, 200 150 S 330 60, 390 70" />
          <path d="M150 10 L 175 60" />
          <path d="M70 120 L 330 190" />
          <path d="M120 270 L 300 40" />
          <path d="M260 20 L 230 70" />
        </g>

        <g className="animate-float-slow">
          <path d="M200 150 C 160 110, 110 110, 70 150 C 30 190, 60 260, 120 255 C 170 250, 190 200, 200 150 Z" fill="var(--color-accent)" />
          <path d="M200 150 C 210 100, 240 50, 300 50 C 360 50, 380 120, 330 150 C 280 175, 240 170, 200 150 Z" fill="white" />
          <path d="M200 150 C 240 140, 300 120, 345 135 C 380 150, 380 210, 330 225 C 280 240, 220 200, 200 150 Z" fill="var(--color-accent)" />
          <path d="M200 150 C 180 190, 160 230, 120 255 C 160 250, 190 210, 200 150 Z" fill="white" opacity="0.9" />
        </g>

        <circle cx="200" cy="150" r="16" fill="var(--color-accent)" className="animate-pulse-dot" />
        <circle cx="128" cy="42" r="12" fill="var(--color-accent)" className="animate-pulse-dot" />
        <path d="M200 150 L 250 300" stroke="white" strokeWidth="1" opacity="0.8" />
      </svg>

      <span className="absolute left-5 top-[22%] rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white sm:text-sm">
        Brand film
      </span>

      <button
        onClick={onPlay}
        className="absolute bottom-5 right-6 flex h-12 w-12 items-center justify-center rounded-full text-accent transition hover:scale-110 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Play brand film"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      </button>
    </div>
  )
}
