export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="border-b border-line">
      <div className="container-x py-14 sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-muted">{children}</div>}
      </div>
    </section>
  )
}
