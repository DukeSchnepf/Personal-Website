export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  status: 'active' | 'past' | 'launching'
  role: string
  year: string
  technologies: string[]
  highlights: string[]
  link?: string
  accent: 'cyan' | 'violet' | 'pink' | 'gold'
}

export const projects: Project[] = [
  {
    id: 'nwmc',
    title: 'Northwest Motor Club',
    tagline: 'Uniting Washington’s car community',
    description:
      'Founded and grew Northwest Motor Club from zero to a thriving community of 3,500+ enthusiasts, hosting 50+ meets, charity drives, and signature events across the Pacific Northwest.',
    status: 'active',
    role: 'Founder',
    year: '2018 — Present',
    technologies: ['Community', 'Events', 'Sponsorship', 'Brand', 'Marketing'],
    highlights: [
      '3,500+ active community members',
      '50+ meets and signature events',
      'Sponsorships, prizes, and live entertainment',
      'End-to-end event ops & on-site problem solving',
    ],
    link: 'https://www.instagram.com/northwestmotorclub/',
    accent: 'violet',
  },
  {
    id: 'thoughtops',
    title: 'Thought Ops · RBO',
    tagline: 'Game ops that fundraise for good',
    description:
      'Lead game operations and launch strategy for Thought Ops, including the rollout of RBO across Apple App Store, Google Play, and consoles, paired with weekly social presence and charity partnerships.',
    status: 'active',
    role: 'Game Operations Manager',
    year: '2020 — Present',
    technologies: ['Mobile', 'Console', 'Live Ops', 'Charity', 'Social'],
    highlights: [
      'Multi-platform launch (iOS, Android, console)',
      'Charity partnerships and volunteer recruitment',
      'Weekly social media operating cadence',
      'Production oversight and live issue resolution',
    ],
    accent: 'cyan',
  },
  {
    id: 'dukepromax',
    title: 'Duke Pro Max',
    tagline: 'Seattle-based venture co-op',
    description:
      'Co-founded and operate a multi-disciplinary venture in Seattle, WA — focused on combining product, services, and community-driven growth with a small, scrappy team.',
    status: 'active',
    role: 'Co-Founder',
    year: '2021 — Present',
    technologies: ['Strategy', 'Operations', 'Partnerships', 'Growth'],
    highlights: [
      'Co-founded and currently operate the venture',
      'Built ops and partnership pipeline',
      'Led product / community experiments',
    ],
    accent: 'pink',
  },
  {
    id: 'helpinghands',
    title: 'Duke’s Helping Hands',
    tagline: 'Hundreds of jobs, all 5★',
    description:
      'Self-employed service business spanning IT support, technical advising, computer repairs, small electrical work, and general handywork — built on word-of-mouth and consistent 5★ reviews.',
    status: 'past',
    role: 'Owner / Operator',
    year: '2015 — Present',
    technologies: ['IT Support', 'Hardware', 'Customer Service', 'Operations'],
    highlights: [
      'Hundreds of completed jobs',
      'Consistent 5-star client reviews',
      'IT support, repairs, and creative problem solving',
    ],
    accent: 'gold',
  },
]

export const projectStatuses = ['all', 'active', 'past', 'launching'] as const
export type ProjectStatus = (typeof projectStatuses)[number]
