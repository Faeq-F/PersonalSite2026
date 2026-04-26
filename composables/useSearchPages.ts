import { db } from '~/assets/scripts/db'

/**
 * Truncate text to max length, adding ellipsis if truncated
 */
function truncate(text: string, maxLength: number = 85): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export interface SearchPage {
  title: string
  description: string
  icon: string
  category: string
  url: string
}

// Base pages that aren't in the DB
const basePages: SearchPage[] = [
  {
    title: 'About Me',
    description: 'A brief introduction about myself',
    icon: 'i-lucide-user',
    category: 'Navigation',
    url: '/about'
  },
  {
    title: 'Experience',
    description: 'My professional journey and experiences',
    icon: 'i-lucide-briefcase',
    category: 'Navigation',
    url: '/experience'
  },
  {
    title: 'Portfolio',
    description: 'Showcasing my projects and contributions',
    icon: 'i-lucide-folder',
    category: 'Navigation',
    url: '/portfolio'
  },
  {
    title: 'Skills',
    description: 'My technical skills and proficiencies',
    icon: 'i-lucide-code',
    category: 'Navigation',
    url: '/skill'
  },
  {
    title: 'CV',
    description: 'My curriculum vitae',
    icon: 'i-lucide-file-text',
    category: 'Navigation',
    url: '/cv'
  },
  {
    title: 'Contact',
    description: 'How to get in touch with me',
    icon: 'i-lucide-mail',
    category: 'Navigation',
    url: '/about?section=Contact'
  },
  {
    title: 'Degree',
    description: 'My academic qualifications',
    icon: 'i-lucide-graduation-cap',
    category: 'Navigation',
    url: '/experience?filter=education'
  },
  // Experience sub-pages
  {
    title: 'All Roles',
    description: 'A summary of all my roles',
    icon: 'i-lucide-briefcase',
    category: 'Experience',
    url: '/experience'
  },
  {
    title: 'Jobs',
    description: 'A paid position of regular employment',
    icon: 'i-lucide-briefcase-business',
    category: 'Experience',
    url: '/experience?filter=jobs'
  },
  {
    title: 'Education',
    description: 'Formal learning experiences, degrees, and certifications',
    icon: 'i-lucide-backpack',
    category: 'Experience',
    url: '/experience?filter=education'
  },
  {
    title: 'Volunteering',
    description: 'Unpaid work for the community or charitable organizations',
    icon: 'i-lucide-handbag',
    category: 'Experience',
    url: '/experience?filter=volunteering'
  },
  {
    title: 'Long-term projects',
    description: 'Significant undertakings with defined goals and timelines',
    icon: 'i-lucide-chart-gantt',
    category: 'Experience',
    url: '/experience?filter=projects'
  },
  {
    title: 'Events',
    description: 'Various affairs taken part in',
    icon: 'i-lucide-ticket-check',
    category: 'Experience',
    url: '/experience?filter=events'
  },
  // Portfolio sub-pages
  {
    title: 'All Projects',
    description: 'A collection of my (public) projects',
    icon: 'i-lucide-square-kanban',
    category: 'Portfolio',
    url: '/portfolio?certs=noCerts'
  },
  {
    title: 'All Certificates',
    description: 'All my different certifications',
    icon: 'i-lucide-file-badge',
    category: 'Portfolio',
    url: '/portfolio?certs=onlyCerts'
  },
  // About Me sub-pages
  {
    title: 'Introduction',
    description: 'A little on me',
    icon: 'i-lucide-house',
    category: 'About Me',
    url: '/about?section=Introduction'
  },
  {
    title: '2010',
    description: '6 years old | Modding',
    icon: 'i-lucide-wrench',
    category: 'About Me',
    url: '/about?section=2010'
  },
  {
    title: '2016',
    description: '12 years old | Programming',
    icon: 'i-lucide-square-function',
    category: 'About Me',
    url: '/about?section=2016'
  },
  {
    title: '2018',
    description: '14 years old | The Web',
    icon: 'i-lucide-link',
    category: 'About Me',
    url: '/about?section=2018'
  },
  {
    title: '2020',
    description: '16 years old | GCSEs',
    icon: 'i-lucide-school',
    category: 'About Me',
    url: '/about?section=2020'
  },
  {
    title: '2022',
    description: '18 years old | A-levels',
    icon: 'i-lucide-book-text',
    category: 'About Me',
    url: '/about?section=2022'
  },
  {
    title: '2025',
    description: '21 years old | My Degree',
    icon: 'i-lucide-graduation-cap',
    category: 'About Me',
    url: '/about?section=2025'
  },
]

/**
 * Generate all search pages from database + base pages
 */
export async function generateSearchPages(): Promise<SearchPage[]> {
  const [projects, certificates, skills, roles] = await Promise.all([
    db.projects.toArray(),
    db.certificates.toArray(),
    db.skills.toArray(),
    db.roles.toArray(),
  ])

  // Transform projects
  const projectPages: SearchPage[] = projects.map(p => ({
    title: p.name,
    description: truncate(p.description || 'Project'),
    icon: 'i-lucide-rocket',
    category: 'Project',
    url: `/project/${p.name.replaceAll(' ', '~')}`
  }))

  // Transform certificates
  const certificatePages: SearchPage[] = certificates.map(c => ({
    title: c.name,
    description: truncate(c.description || 'Certificate'),
    icon: 'i-lucide-award',
    category: 'Certificate',
    url: `/certificate/${c.name.replaceAll(' ', '~')}`
  }))

  // Transform skills
  const skillPages: SearchPage[] = skills.map(s => ({
    title: s.name,
    description: truncate(`Skill | ${s.category.slice(0, 3).join(', ')}`),
    icon: 'i-lucide-star',
    category: 'Skill',
    url: `/skill/${s.name.replaceAll(' ', '~')}`
  }))

  // Transform roles
  const rolePages: SearchPage[] = roles.map(r => ({
    title: r.name,
    description: truncate(r.description || 'Role'),
    icon: 'i-lucide-user',
    category: r.type.charAt(0).toUpperCase() + r.type.slice(1) as string,
    url: `/experience/${r.id}`
  }))

  return [
    ...basePages,
    ...projectPages,
    ...certificatePages,
    ...skillPages,
    ...rolePages,
  ]
}
