import { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import PricingCard from '../components/PricingCard.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { importantDetails, pricingTabs } from '../data/pricing.js'

function DetailsAccordion() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div className="divide-y divide-line rounded-md border border-line">
      {importantDetails.map((d, i) => {
        const open = openIndex === i
        return (
          <div key={d.title}>
            <button
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium hover:text-accent"
              aria-expanded={open}
            >
              {d.title}
              <span className={`text-xl text-accent transition-transform ${open ? 'rotate-45' : ''}`} aria-hidden="true">
                +
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Pricing() {
  const [params, setParams] = useSearchParams()
  const { hash } = useLocation()
  const activeId = pricingTabs.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'monthly'
  const tab = pricingTabs.find((t) => t.id === activeId)
  const targetId = hash.slice(1)

  const selectTab = (id) => setParams({ tab: id }, { replace: true })

  return (
    <>
      <PageHeader eyebrow="Pricing" title="Clear scope. No surprises.">
        Starting prices in USD. Final scope and pricing are confirmed in a written proposal before any work begins.
      </PageHeader>

      <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x no-scrollbar flex gap-2 overflow-x-auto py-3" role="tablist">
          {pricingTabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === activeId}
              onClick={() => selectTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                t.id === activeId ? 'bg-ink text-white' : 'text-ink hover:bg-neutral-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <section className="py-14 sm:py-16" role="tabpanel">
        <div className="container-x" key={activeId}>
          <div className="animate-[fadeIn_0.5s_ease]">
            <p className="eyebrow">{tab.label}</p>
            <h2 className="mt-2 section-title">{tab.heading}</h2>
            <p className="mt-3 max-w-2xl text-muted">{tab.description}</p>
          </div>

          {tab.groups.map((group, gi) => (
            <div key={gi} className="mt-12">
              {group.title && (
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
                  <h3 className="font-serif text-2xl">{group.title}</h3>
                  {group.range && <span className="font-semibold text-accent">{group.range}</span>}
                </div>
              )}
              <div className={`grid gap-6 sm:grid-cols-2 ${group.packages.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                {group.packages.map((pkg) => (
                  <PricingCard key={pkg.id} pkg={pkg} targeted={pkg.id === targetId} />
                ))}
              </div>
            </div>
          ))}

          {tab.support && (
            <div className="mt-14">
              <h3 className="font-serif text-2xl">Optional ongoing support</h3>
              <div className="mt-5 overflow-x-auto rounded-md border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Service</th>
                      <th className="px-5 py-3 font-semibold">Monthly range</th>
                      <th className="px-5 py-3 font-semibold">Typical scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {tab.support.map((s) => (
                      <tr key={s.service}>
                        <td className="px-5 py-3 font-medium">{s.service}</td>
                        <td className="whitespace-nowrap px-5 py-3 text-accent">{s.price}</td>
                        <td className="px-5 py-3 text-muted">{s.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab.addons && (
            <div className="mt-14">
              <h3 className="font-serif text-2xl">Optional extras</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tab.addons.map((a) => (
                  <li key={a.name} className="flex items-center justify-between rounded-md border border-line px-4 py-3 text-sm">
                    {a.name}
                    <span className="font-semibold text-accent">{a.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-neutral-50 py-14 sm:py-16">
        <div className="container-x grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="eyebrow">Important details</p>
            <h2 className="mt-2 section-title">Built around your business.</h2>
            <p className="mt-4 text-muted">
              We tailor deliverables, channels and automation to your goals, team and budget. These terms apply unless your
              proposal states otherwise.
            </p>
          </div>
          <DetailsAccordion />
        </div>
      </section>

      <CtaBanner title="Not sure which package fits?" cta="Get a tailored quote" />
    </>
  )
}
