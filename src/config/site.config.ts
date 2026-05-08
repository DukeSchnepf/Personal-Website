export const siteConfig = {
  name: 'Duke Schnepf',
  title: 'Tech Entrepreneur & Community Builder',
  description:
    'Duke Schnepf — Tech entrepreneur, founder of Northwest Motor Club, and full-stack builder uniting code, community, and craft.',
  url: 'https://dukeschnepf.com',
  email: 'Dukeschnepf@gmail.com',
  location: 'Seattle, Washington',
  available: true,

  navigation: [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],

  social: {
    github: 'https://github.com/DukeSchnepf',
    linkedin: 'https://www.linkedin.com/in/duke-schnepf-48a13b133/',
    email: 'mailto:Dukeschnepf@gmail.com',
  },

  resume: '/resume.pdf',
}

export type SiteConfig = typeof siteConfig
