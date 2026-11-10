import { Link } from 'react-router-dom'

// Card artwork is drawn on a 316px-wide grid and scaled with container query units.
const u = (px) => `${(px / 3.16).toFixed(3)}cqw`

const at = (left, top, extra = {}) => ({ position: 'absolute', left: u(left), top: u(top), ...extra })

function Label({ width, children }) {
  return (
    <span
      className="flex items-center rounded-full bg-canvas font-medium whitespace-nowrap text-ink"
      style={at(14, 14, { width: u(width), height: u(26), paddingLeft: u(10), fontSize: u(8) })}
    >
      {children}
    </span>
  )
}

function Card({ to, label, className = '', style, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`@container group relative block aspect-[316/300] overflow-hidden transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
      style={style}
    >
      <div className="absolute inset-0" style={{ borderRadius: 'inherit' }}>
        {children}
      </div>
    </Link>
  )
}

function CreativeCard() {
  return (
    <Card to="/services#creative" label="Creative production" className="rounded-[7.4px] bg-accent">
      <Label width={171}>01 / CREATIVE PRODUCTION</Label>
      {[
        { left: 47.58, top: 62.45, alpha: 0.2 },
        { left: 31.58, top: 112.45, alpha: 0.45 },
      ].map((echo) => (
        <p
          key={echo.top}
          className="font-display font-bold leading-none whitespace-nowrap text-transparent transition duration-500 group-hover:translate-x-2"
          style={at(echo.left, echo.top, {
            fontSize: u(52.958),
            letterSpacing: u(-2.9375),
            WebkitTextStroke: `${u(0.9)} rgba(255, 255, 255, ${echo.alpha})`,
          })}
          aria-hidden="true"
        >
          PACE
        </p>
      ))}
      <p className="font-display font-bold leading-none whitespace-nowrap text-white" style={at(15.58, 162.45, { fontSize: u(52.958), letterSpacing: u(-2.9375) })}>
        PACE
      </p>
      <p className="font-medium whitespace-nowrap text-ink" style={at(17.8, 220.31, { fontSize: u(7.418), letterSpacing: u(0.9643) })}>
        BUILT FOR THE CHASE.
      </p>
      <span
        className="flex items-center justify-center rounded-full bg-canvas text-ink"
        style={at(259.62, 209.18, { width: u(37.089), height: u(37.089), fontSize: u(11.127), paddingLeft: u(2) })}
        aria-hidden="true"
      >
        &#9654;
      </span>
    </Card>
  )
}

function MarketingCard() {
  return (
    <Card to="/services#marketing" label="Digital marketing" className="rounded-[7.4px] bg-lime text-[#263120]">
      <Label width={163}>02 / DIGITAL MARKETING</Label>
      <p className="font-display font-bold whitespace-nowrap" style={at(238, 51, { fontSize: u(9.598) })}>
        OUTLIER®
      </p>
      <p className="font-display font-bold whitespace-nowrap" style={at(16.24, 58.33, { fontSize: u(44.299), lineHeight: u(43.561), letterSpacing: u(-2.6579) })}>
        NOT FOR
        <br />
        EVERYONE.
      </p>
      <div className="flex items-center justify-center" style={at(16.24, 148.35, { width: u(161.303), height: u(42.795) })}>
        <div className="relative -rotate-4 bg-accent" style={{ width: u(159.477), height: u(31.748) }}>
          <p className="font-display font-bold whitespace-nowrap text-white" style={at(9.6, 7.38, { fontSize: u(15.505) })}>
            THAT&rsquo;S THE POINT.
          </p>
        </div>
      </div>
      <p className="font-medium whitespace-nowrap" style={at(16.98, 233.31, { fontSize: u(7.383), letterSpacing: u(0.886) })}>
        STAND OUT. STAY OUT.
      </p>
      <p className="leading-none transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={at(269.49, 209.68, { fontSize: u(34.701) })} aria-hidden="true">
        &#8599;
      </p>
    </Card>
  )
}

function WebsitesCard() {
  return (
    <Card to="/services#websites" label="Websites and funnels" className="rounded-[7.4px] bg-lilac text-[#332640]">
      <Label width={163}>03 / WEBSITES &amp; FUNNELS</Label>
      <p className="font-display font-bold whitespace-nowrap" style={at(250, 51, { fontSize: u(9.598) })}>
        forma®
      </p>
      <p className="font-serif whitespace-nowrap italic" style={at(16.24, 62, { fontSize: u(44), lineHeight: u(42), letterSpacing: u(-1.2) })}>
        Objects
        <br />
        of tomorrow.
      </p>
      <div className="bg-[#332640]/25" style={at(17, 160, { width: u(282), height: u(0.742) })} />
      <p className="whitespace-nowrap text-[#6b5f75]" style={at(16.98, 172, { fontSize: u(9), lineHeight: u(13) })}>
        Considered design.
        <br />
        Extraordinary everyday.
      </p>
      <span
        className="flex items-center rounded-full bg-[#332640] whitespace-pre text-white transition duration-300 group-hover:bg-accent"
        style={at(16.98, 222, { width: u(112), height: u(26), paddingLeft: u(12), fontSize: u(8) })}
      >
        {'Explore collection  ↗'}
      </span>
    </Card>
  )
}

const steps = [
  { n: '01', label: 'New inquiry received', top: 146 },
  { n: '02', label: 'AI qualifies the lead', top: 191 },
  { n: '03', label: 'Meeting booked', top: 236 },
]

const stepClass = [
  'bg-[#374132]',
  'bg-lime text-[#242922] group-hover:bg-[#374132] group-hover:text-canvas group-focus-visible:bg-[#374132] group-focus-visible:text-canvas',
  'bg-[#374132] group-hover:bg-lime group-hover:text-[#242922] group-focus-visible:bg-lime group-focus-visible:text-[#242922]',
]

function AutomationCard() {
  return (
    <Card to="/services#automation" label="AI automation" className="rounded-[8px] bg-[#242922] text-canvas">
      <Label width={143}>04 / AI AUTOMATION</Label>
      <p className="font-display font-bold whitespace-nowrap" style={at(19, 60, { fontSize: u(30), lineHeight: u(32), letterSpacing: u(-1.2) })}>
        Less busywork.
        <br />
        More momentum.
      </p>
      {steps.map((s, i) => (
        <div key={s.n}>
          <div
            className={`flex items-center font-medium whitespace-nowrap transition-colors duration-300 ${stepClass[i]}`}
            style={at(19, s.top, { width: u(278), height: u(34), borderRadius: u(6) })}
          >
            <span style={{ marginLeft: u(12), width: u(28), fontSize: u(9) }}>{s.n}</span>
            <span style={{ fontSize: u(11) }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <p className="font-medium text-[#b7c8aa]" style={at(151, s.top + 32, { fontSize: u(12) })} aria-hidden="true">
              &darr;
            </p>
          )}
        </div>
      ))}
    </Card>
  )
}

export default function ShowcaseCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <CreativeCard />
      <MarketingCard />
      <WebsitesCard />
      <AutomationCard />
    </div>
  )
}
