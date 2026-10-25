function Mountain() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="peak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a7a7a" />
          <stop offset="1" stopColor="#151515" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#sky)" />
      <path d="M0 150 L60 120 L100 135 L150 95 L175 40 L200 85 L240 110 L280 100 L320 125 V200 H0Z" fill="url(#peak)" />
      <path d="M175 40 L165 75 L180 70 L190 90 L200 85Z" fill="#9a9a9a" opacity="0.6" />
      <path d="M0 170 L80 150 L140 165 L220 140 L320 160 V200 H0Z" fill="#0a0a0a" opacity="0.9" />
    </svg>
  )
}

function Dashboard() {
  return (
    <div className="flex h-full w-full gap-2 bg-ink-soft p-3 text-[7px] text-white/70">
      <div className="flex flex-1 flex-col rounded border border-white/10 p-2">
        <span className="font-semibold text-white/90">Performance</span>
        <div className="mt-4 flex justify-around">
          {[72, 54].map((v) => (
            <div key={v} className="relative h-14 w-14">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="4" strokeDasharray={`${(v / 100) * 94} 94`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">{v}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[42%] flex-col gap-1 rounded border border-white/10 p-2">
        <span className="font-semibold text-white/90">Leads</span>
        {['New', 'Qualified', 'Booked', 'Won', 'Follow-up'].map((r, i) => (
          <div key={r} className="flex items-center justify-between rounded bg-white/5 px-1.5 py-1">
            <span>{r}</span>
            <span className="h-1 rounded-full bg-white/40" style={{ width: `${30 - i * 4}px` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Laptop() {
  return (
    <div className="flex h-full w-full items-start justify-center bg-gradient-to-b from-[#1b1b1b] to-ink pt-[7%]">
      <div className="flex aspect-[16/10.5] h-[70%] flex-col">
        <div className="flex flex-1 gap-[4%] rounded-t-md border border-white/30 bg-[#141414] p-[3%] shadow-[0_0_40px_rgba(255,255,255,0.06)]">
          <div className="flex w-1/4 flex-col justify-around border-r border-white/10 pr-[4%]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-sm bg-white/30" />
                <span className="h-1 flex-1 rounded bg-white/15" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-[6%]">
            <div className="h-[35%] rounded bg-white/10" />
            <div className="grid h-[30%] grid-cols-3 gap-[4%]">
              <div className="rounded bg-white/5" />
              <div className="rounded bg-white/5" />
              <div className="rounded bg-white/5" />
            </div>
            <div className="h-1 w-2/3 rounded bg-white/15" />
            <div className="h-1 w-1/2 rounded bg-white/10" />
          </div>
        </div>
        <div className="mx-[-8%] h-[5%] rounded-b-lg bg-[#2a2a2a]" />
      </div>
    </div>
  )
}

export default function WorkVisual({ type }) {
  if (type === 'mountain') return <Mountain />
  if (type === 'dashboard') return <Dashboard />
  return <Laptop />
}
