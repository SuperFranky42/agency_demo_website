export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="container-x">
      <div className="grid gap-6 border-b border-line pb-14 pt-10 sm:pb-20 sm:pt-[39px] lg:grid-cols-[minmax(0,1fr)_370px] lg:items-end lg:gap-10">
        <div>
          {eyebrow && <p className="eyebrow !text-ink">{eyebrow}</p>}
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.03] tracking-[-0.055em] sm:text-7xl lg:-ml-1 lg:text-[84px]">
            {title}
          </h1>
        </div>
        {children && <div className="text-[17px] leading-[28.05px] text-muted lg:pb-3">{children}</div>}
      </div>
    </section>
  )
}
