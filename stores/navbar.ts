import { defineStore } from "pinia";

export const useMiddleNavbarItems = defineStore("middleNavbarItems", {
  state: () => {
    return ({
      items: [
        [
          {
            label: 'About Me',
            icon: 'i-lucide-user',
            to: '/about',
            active: false,
            defaultOpen: true,
            children: [
              {
                label: 'Introduction',
                icon: 'i-lucide-house',
                description: 'A little on me',
                to: '/about?section=Introduction',
                active: false,
                class: 'zLink'
              },
              {
                label: '2010',
                icon: 'i-lucide-wrench',
                description: '6 years old | Modding',
                to: '/about?section=2010',
                active: false,
                class: 'zLink'
              },
              {
                label: '2016',
                icon: 'i-lucide-square-function',
                description: '12 years old | Programming',
                to: '/about?section=2016',
                active: false,
                class: 'zLink'
              },
              {
                label: '2018',
                icon: 'i-lucide-link',
                description: '14 years old | The Web',
                to: '/about?section=2018',
                active: false,
                class: 'zLink'
              },
              {
                label: '2020',
                icon: 'i-lucide-school',
                description: '16 years old | GCSEs',
                to: '/about?section=2020',
                active: false,
                class: 'zLink'
              },
              {
                label: '2022',
                icon: 'i-lucide-book-text',
                description: '18 years old | A-levels',
                to: '/about?section=2022',
                active: false,
                class: 'zLink'
              },
              {
                label: '2025',
                icon: 'i-lucide-graduation-cap',
                description: '21 years old | My Degree',
                to: '/about?section=2025',
                active: false,
                class: '-mt-0.5 zLink'
              },
              {
                label: 'Next Steps',
                icon: 'i-lucide-sparkles',
                description: 'What does my future hold?',
                active: false,
                disabled: true,
                class: '!cursor-not-allowed opacity-50 -mt-0.5 zLink'
              },
            ]
          },
          {
            label: 'Experience',
            icon: 'i-lucide-briefcase-business',
            to: '/experience',
            active: false,
            defaultOpen: true,
            children: [
              {
                label: 'All Roles',
                icon: 'i-lucide-briefcase',
                description: 'A summary of all my roles',
                to: '/experience',
                active: false,
                class: 'zLink'
              },
              {
                label: 'Jobs',
                icon: 'i-lucide-briefcase-business',
                description: 'A paid position of regular employment',
                to: '/experience?filter=jobs',
                active: false,
                class: 'zLink'
              },
              {
                label: 'Education',
                icon: 'i-lucide-backpack',
                description: 'Formal learning experiences, degrees, and certifications',
                to: '/experience?filter=education',
                active: false,
                class: 'zLink'
              },
              {
                label: 'Volunteering',
                icon: 'i-lucide-handbag',
                description: 'Unpaid work for the community or charitable organizations',
                to: '/experience?filter=volunteering',
                active: false,
                class: 'zLink'
              },
              {
                label: 'Long-term projects',
                icon: 'i-lucide-chart-gantt',
                description: 'Significant undertakings with defined goals and timelines',
                to: '/experience?filter=projects',
                active: false,
                class: 'zLink'
              },
              {
                label: 'Events',
                icon: 'i-lucide-ticket-check',
                description: 'Various affairs taken part in',
                to: '/experience?filter=events',
                active: false,
                class: 'zLink'
              },
            ]
          },
          {
            label: 'Portfolio',
            icon: 'i-lucide-presentation',
            to: '/portfolio',
            active: false,
            children: [
              {
                label: 'All Projects',
                description: 'A collection of my (public) projects',
                icon: 'i-lucide-square-kanban',
                to: '/portfolio?certs=noCerts',
                class: 'zLink'
              },
              {
                label: 'All Certificates',
                description: 'All my different certifications',
                icon: 'i-lucide-file-badge',
                to: '/portfolio?certs=onlyCerts',
                class: 'zLink'
              },
              {
                label: 'Quokka',
                description: 'An extremely customizable keystroke launcher with plugins',
                icon: 'i-lucide-paw-print',
                to: '/portfolio',
                class: 'zLink'
              },
              {
                label: 'Zarlasht',
                icon: 'i-lucide-bow-arrow',
                description: 'My dissertation; a concurrency-based game environment',
                to: '/portfolio',
                class: 'zLink'
              },
              {
                label: 'Muslim Guide',
                description: 'Duas and Umrah, Hajj & Madinah Guides',
                icon: 'i-lucide-moon-star',
                to: '/portfolio',
                class: 'zLink'
              },
              {
                label: 'IT Assets Metadata Repository',
                icon: 'i-lucide-boxes',
                description:
                  'A system for metadata-based organization of different assets',
                to: '/portfolio',
                class: 'zLink'
              },
            ]
          },
          {
            label: 'CV',
            icon: 'i-lucide-file-text',
            to: '/cv',
            active: false
          }
        ],
      ]
    })
  },
  actions: {
  },
});
