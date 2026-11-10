const projects = [
  {
    slug: 'box-class',
    client: 'Box Class',
    category: 'Video edit',
    year: '2026',
    video: { title: 'Box Class', src: '/work/videos/box-class.mp4' },
    summary: 'A short film of a boxing class, cut from a full session down to the exchanges that carry the room.',
    challenge:
      'The class ran much longer than anyone would watch online. The useful footage was in the ring, mixed in with setup, rest, and moments that did not need to be in the cut.',
    solution:
      'We shaped one promotional edit around the sparring: tighter pacing, the hits that read on a small screen, and a length that holds attention from the first exchange to the last.',
    results: [
      { value: '49 sec', label: 'finished film from a full class' },
      { value: 'One cut', label: 'paced for social and the web' },
      { value: 'In the ring', label: 'the class, without the downtime' },
    ],
    services: ['Promotional video', 'Video editing'],
  },
  {
    slug: 'clubhouse-drive',
    client: 'Clubhouse Drive',
    category: 'Video edit',
    year: '2025',
    video: { title: 'Clubhouse Drive', src: '/work/videos/clubhouse-drive.mp4' },
    summary: 'A property film for a home in Laurel, Maryland, cut so the rooms and the location land in under a minute.',
    challenge:
      'A walkthrough is easy to shoot and hard to watch. The house needed a cut that showed the space clearly, named the place, and stayed short enough to send.',
    solution:
      'We edited the tour into a single promotional film, with the rooms in an order that makes sense on a first watch and the Laurel, Maryland title held on screen.',
    results: [
      { value: '50 sec', label: 'property film' },
      { value: 'Laurel, MD', label: 'location carried in the edit' },
      { value: 'One film', label: 'from the walkthrough footage' },
    ],
    services: ['Promotional video', 'Video editing'],
  },
  {
    slug: 'dhaka-concert',
    client: 'Dhaka Concert',
    category: 'Video edit',
    year: '2025',
    video: { title: 'Dhaka Concert', src: '/work/videos/dhaka-concert.mp4' },
    summary: 'A short concert film from a live set in Dhaka, cut to the performance rather than the wait around it.',
    challenge:
      'Live footage is long, loud, and full of in-between moments. The piece needed to feel like the show, in the time someone will actually give it.',
    solution:
      'We cut the set down to a 29-second film: the performer, the room, and the light, paced so the song still feels live.',
    results: [
      { value: '29 sec', label: 'concert film' },
      { value: 'Live set', label: 'cut to the performance' },
      { value: 'One film', label: 'ready to share from the night' },
    ],
    services: ['Promotional video', 'Video editing'],
  },
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
]

function rank(item) {
  const year = Number(item.year) || 0
  return (item.status === 'In progress' ? 10000 : 0) + year
}

export const work = [...projects].sort((a, b) => rank(b) - rank(a))

export function findWork(slug) {
  return work.find((item) => item.slug === slug)
}
