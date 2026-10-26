export const work = [
  {
    slug: 'nassar-construction',
    client: 'Nassar Construction LLC',
    category: 'Website, video & social',
    status: 'In progress',
    year: '2026',
    image: '/work/nassar-construction/cover.png',
    gallery: [
      { src: '/work/nassar-construction/full-page.png', alt: 'Nassar Construction website, full desktop page' },
      { src: '/work/nassar-construction/mobile-1.png', alt: 'Nassar Construction website on mobile' },
    ],
    videos: [
      {
        title: 'Nassar Construction short-form reel',
        src: 'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1745594173197074%2F&show_text=false&width=267&t=0',
      },
    ],
    summary:
      'Taking an Oklahoma renovation and construction company from a lone Facebook page to a full online presence: custom website, local SEO and scripted short-form video.',
    challenge:
      'Nassar Construction is a new company with no online footprint beyond a Facebook page. Homeowners searching for kitchen, bath and addition contractors in Oklahoma could not find them on Google, had no website to check their work or licence, and no easy way to request a quote.',
    solution:
      'We designed and built a custom website around one goal, getting quote requests, with click-to-call, a quote form, licence and trust badges, and service pages structured for local SEO. Alongside the site, we write scripts for short-form videos, edit them, and manage their social channels so the brand shows up consistently on Facebook and Instagram.',
    results: [
      { value: 'Custom', label: 'website with quote requests and click-to-call' },
      { value: 'Local SEO', label: 'foundations for Oklahoma search' },
      { value: 'Ongoing', label: 'scripted and edited short-form video' },
    ],
    services: [
      'Business Launch package',
      'Custom website (Premium)',
      'Essential monthly package (social media + local SEO)',
      'Scriptwriting for short video',
      'Short-form video editing (Creator Edit)',
    ],
  },
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
