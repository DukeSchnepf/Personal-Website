export const profile = {
  name: 'Duke Schnepf',
  title: 'Tech Entrepreneur · Community Builder · Founder of Northwest Motor Club',
  shortTitle: 'Tech Entrepreneur & Community Builder',
  location: 'Seattle, Washington',
  phone: '(425) 647-7993',
  email: 'Dukeschnepf@gmail.com',
  linkedin: 'https://www.linkedin.com/in/duke-schnepf-48a13b133/',
  headshot: '/images/profile.png',
  resumeUrl: '/resume.pdf',
  available: true,

  tagline: 'Building at the intersection of code, community, and craft.',

  philosophy: 'If opportunity doesn’t knock, build a door.',

  overview:
    'I’m an entrepreneurial technologist who loves turning ambitious ideas into communities, products, and experiences. From founding the Northwest Motor Club and uniting thousands of car enthusiasts, to operating game and tech ventures, I thrive where creativity meets execution — leading teams, shipping software, and building things that bring people together.',

  pillars: [
    'Founder mindset — ship, learn, iterate',
    'Community-first product thinking',
    'Hands-on full-stack engineering',
    'Operations, events, and marketing at scale',
  ],

  stats: [
    { value: '7+', label: 'Years building ventures' },
    { value: '50+', label: 'Events organized' },
    { value: '3,500+', label: 'Community members' },
    { value: '5★', label: 'Avg client rating' },
  ],
}

export type Profile = typeof profile
