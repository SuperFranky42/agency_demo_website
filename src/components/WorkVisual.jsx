function Mountain() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6ddf6" />
          <stop offset="1" stopColor="#d8cdf1" />
        </linearGradient>
        <linearGradient id="peak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d7da6" />
          <stop offset="1" stopColor="#51445d" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#sky)" />
      <circle cx="248" cy="52" r="16" fill="#f34e2b" />
      <path d="M0 150 L60 120 L100 135 L150 95 L175 40 L200 85 L240 110 L280 100 L320 125 V200 H0Z" fill="url(#peak)" />
      <path d="M175 40 L165 75 L180 70 L190 90 L200 85Z" fill="#f6f4ed" opacity="0.7" />
      <path d="M0 170 L80 150 L140 165 L220 140 L320 160 V200 H0Z" fill="#332640" opacity="0.9" />
    </svg>
  )
}

function Dashboard() {
  return (
    <div className="flex h-full w-full gap-2 bg-[#242922] p-3 text-[7px] text-canvas/70">
      <div className="flex flex-1 flex-col rounded bg-[#374132] p-2">
        <span className="font-semibold text-canvas">Performance</span>
        <div className="mt-4 flex justify-around">
          {[72, 54].map((v) => (
            <div key={v} className="relative h-14 w-14">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(246,244,237,0.15)" strokeWidth="4" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#daf26b" strokeWidth="4" strokeDasharray={`${(v / 100) * 94} 94`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-canvas">{v}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[42%] flex-col gap-1 rounded bg-[#374132] p-2">
        <span className="font-semibold text-canvas">Leads</span>
        {['New', 'Qualified', 'Booked', 'Won', 'Follow-up'].map((r, i) => (
          <div key={r} className={`flex items-center justify-between rounded px-1.5 py-1 ${i === 2 ? 'bg-lime text-[#242922]' : 'bg-canvas/5'}`}>
            <span>{r}</span>
            <span className={`h-1 rounded-full ${i === 2 ? 'bg-[#242922]/50' : 'bg-canvas/40'}`} style={{ width: `${30 - i * 4}px` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Laptop() {
  return (
    <div className="flex h-full w-full items-start justify-center bg-lime pt-[7%]">
      <div className="flex aspect-[16/10.5] h-[70%] flex-col">
        <div className="flex flex-1 gap-[4%] rounded-t-md bg-ink p-[3%]">
          <div className="flex w-1/4 flex-col justify-around border-r border-canvas/10 pr-[4%]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-sm bg-canvas/30" />
                <span className="h-1 flex-1 rounded bg-canvas/15" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-[6%]">
            <div className="h-[35%] rounded bg-accent" />
            <div className="grid h-[30%] grid-cols-3 gap-[4%]">
              <div className="rounded bg-canvas/10" />
              <div className="rounded bg-canvas/10" />
              <div className="rounded bg-canvas/10" />
            </div>
            <div className="h-1 w-2/3 rounded bg-canvas/20" />
            <div className="h-1 w-1/2 rounded bg-canvas/10" />
          </div>
        </div>
        <div className="mx-[-8%] h-[5%] rounded-b-lg bg-[#263120]" />
      </div>
    </div>
  )
}

export default function WorkVisual({ type }) {
  if (type === 'mountain') return <Mountain />
  if (type === 'dashboard') return <Dashboard />
  return <Laptop />
}
