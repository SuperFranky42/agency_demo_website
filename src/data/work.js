export const work = [
  {
    slug: 'northline-advisory',
    client: 'Northline Advisory',
    category: 'Brand identity',
    visual: 'mountain',
    year: '2026',
    summary: 'A calm, confident identity for a boutique financial advisory firm entering a crowded market.',
    challenge:
      'Northline had strong referrals but an inconsistent look across their pitch decks, website and social profiles. Prospects found them through word of mouth, then lost confidence when the online presence felt dated.',
    solution:
      'We built a restrained brand system around a mountain mark and a single accent colour, then rolled it out across a new 5-page website, LinkedIn and Instagram templates, and a set of 8 launch graphics.',
    results: [
      { value: '2.4x', label: 'more website enquiries in 90 days' },
      { value: '38%', label: 'lower bounce rate on the new site' },
      { value: '3 wks', label: 'from kickoff to launch' },
    ],
    services: ['Brand identity', 'Business Launch package', 'Social profile setup'],
  },
  {
    slug: 'velocity-campaign',
    client: 'Velocity Campaign',
    category: 'Campaign',
    visual: 'dashboard',
    year: '2026',
    summary: 'A paid social and search campaign for a fitness studio chain, wired straight into a CRM.',
    challenge:
      'Velocity was spending on ads but had no idea which ones produced members. Leads arrived in three inboxes and many were never followed up.',
    solution:
      'We rebuilt their Meta and Google campaigns around one offer, sent every lead into a single CRM pipeline and added an automated SMS and email follow-up that books a trial session within minutes.',
    results: [
      { value: '-41%', label: 'cost per booked trial' },
      { value: '< 2 min', label: 'average lead response time' },
      { value: '312', label: 'trials booked in the first quarter' },
    ],
    services: ['Growth Engine package', 'Meta and Google Ads', 'CRM and lead follow-up'],
  },
  {
    slug: 'summit-path-advisors',
    client: 'Summit Path Advisors',
    category: 'Website & funnel',
    visual: 'laptop',
    year: '2025',
    summary: 'A lead-generation website and booking funnel with an AI receptionist for a consulting practice.',
    challenge:
      'Summit Path relied on a single-page site with a phone number. Calls went unanswered during client meetings, and there was no way to book a consultation online.',
    solution:
      'We designed a conversion-focused site with a dedicated funnel, calendar booking and an AI voice receptionist that answers routine questions, qualifies callers and logs summaries to the CRM.',
    results: [
      { value: '64%', label: 'of calls now handled without staff' },
      { value: '3.1x', label: 'more consultations booked' },
      { value: '24/7', label: 'enquiry coverage' },
    ],
    services: ['Website and funnel', 'AI Receptionist Setup', 'Booking automation'],
  },
]

export function findWork(slug) {
  return work.find((item) => item.slug === slug)
}
