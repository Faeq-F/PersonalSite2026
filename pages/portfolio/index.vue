<script lang="ts" setup>
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import contentPanels from '~/components/layoutSections/contentPanels.vue';
import type { TabsItem } from '@nuxt/ui'
import { ref, provide, computed } from 'vue';
import SkillsInput from '~/components/skillsInput.vue';

import { useRoute } from 'nuxt/app';
const route = useRoute()

import { useSettingsStore } from '~/stores/settings'
const settings = useSettingsStore()
const { defaultColor, zarlashtTheme, aeonTheme, mirageTheme } = storeToRefs(settings)

// Check if on default theme
const isDefaultTheme = computed(() => !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value)

// Portfolio data - all projects with their images and details
const portfolioItems = ref([
  {
    id: 'quokka',
    name: 'Quokka',
    type: 'project',
    images: [
      'https://faeq-f.github.io/Quokka/media/AppScreenshots/AllApps.png',
      '/PersonalSite2026/media/QuokkaLight.png',
      'https://faeq-f.github.io/Quokka/media/AppScreenshots/AllApps.png',
      '/PersonalSite2026/media/QuokkaLight.png',
    ],
    description: 'A collection of productivity applications',
    skills: ['C#', 'WPF', 'XAML', '.NET'],
    startDate: new Date('2023-01-01'),
    endDate: new Date('2024-12-31'),
  },
  {
    id: 'personal-site',
    name: 'Personal Site 2025',
    type: 'project',
    images: [
      '/PersonalSite2026/media/portfolio/site1.png',
      '/PersonalSite2026/media/portfolio/site2.png',
    ],
    description: 'My personal portfolio website built with Nuxt 3',
    skills: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31'),
  },
  {
    id: 'bsc-degree',
    name: 'BSc Hons. Computer Science (Software Engineering)',
    type: 'certificate',
    images: [
      '/PersonalSite2026/media/portfolio/Faeq Faisal Certificate front side.jpg',
      '/PersonalSite2026/media/portfolio/Faeq Faisal Transcript page 1.png',
      '/PersonalSite2026/media/portfolio/Faeq Faisal Transcript page 2.png'
    ],
    description: 'First Class Honours degree from the University of Westminster',
    skills: ['Software Engineering', 'Computer Science'],
    awarded: new Date('2024-07-01'),
  },
  // Add more items as needed - placeholders for the rest
  {
    id: 'project-2',
    name: 'E-Commerce Platform',
    type: 'project',
    images: [
      'https://picsum.photos/400/600?random=1',
      'https://picsum.photos/400/300?random=2',
    ],
    description: 'Full-stack e-commerce solution with payment integration',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-12-31'),
  },
  {
    id: 'project-3',
    name: 'AI Chat Assistant',
    type: 'project',
    images: [
      'https://picsum.photos/400/500?random=3',
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/350?random=5',
    ],
    description: 'Conversational AI powered by OpenAI GPT',
    skills: ['Python', 'FastAPI', 'OpenAI', 'WebSocket'],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30'),
  },
  {
    id: 'project-4',
    name: 'Mobile Fitness App',
    type: 'project',
    images: [
      'https://picsum.photos/400/700?random=6',
      'https://picsum.photos/400/450?random=7',
    ],
    description: 'Cross-platform fitness tracking application',
    skills: ['React Native', 'Firebase', 'HealthKit'],
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-08-31'),
  },
  {
    id: 'project-5',
    name: 'Data Visualization Dashboard',
    type: 'project',
    images: [
      'https://picsum.photos/400/550?random=8',
      'https://picsum.photos/400/380?random=9',
      'https://picsum.photos/400/420?random=10',
    ],
    description: 'Real-time analytics dashboard with D3.js',
    skills: ['D3.js', 'Vue.js', 'PostgreSQL', 'WebSocket'],
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-02-29'),
  },
  {
    id: 'project-6',
    name: 'Blockchain Wallet',
    type: 'project',
    images: [
      'https://picsum.photos/400/480?random=11',
      'https://picsum.photos/400/520?random=12',
    ],
    description: 'Secure cryptocurrency wallet with multi-sig support',
    skills: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    startDate: new Date('2022-11-01'),
    endDate: new Date('2023-05-31'),
  },
  {
    id: 'project-7',
    name: 'Video Streaming Platform',
    type: 'project',
    images: [
      'https://picsum.photos/400/640?random=13',
      'https://picsum.photos/400/360?random=14',
      'https://picsum.photos/400/400?random=15',
    ],
    description: 'Netflix-like streaming service with adaptive bitrate',
    skills: ['AWS', 'FFmpeg', 'Node.js', 'React'],
    startDate: new Date('2023-07-01'),
    endDate: new Date('2024-01-31'),
  },
  {
    id: 'project-8',
    name: 'IoT Home Automation',
    type: 'project',
    images: [
      'https://picsum.photos/400/580?random=16',
      'https://picsum.photos/400/440?random=17',
    ],
    description: 'Smart home system with voice control integration',
    skills: ['Raspberry Pi', 'MQTT', 'Python', 'Alexa Skills'],
    startDate: new Date('2022-08-01'),
    endDate: new Date('2023-02-28'),
  },
])

// Flatten all images for waterfall layout
const filteredItems = computed(() => {
  return portfolioItems.value.flatMap(item =>
    item.images.map((image, index) => ({
      ...item,
      imageIndex: index,
      imageUrl: image,
      uniqueId: `${item.id}-${index}`
    }))
  )
})

import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})
const calendarVal = ref<{ start: CalendarDate | undefined, end: CalendarDate | undefined }>({ start: undefined, end: undefined })

// Helper functions for formatting dates
const formatDate = (item: any) => {
  if (item.type === 'certificate' && item.awarded) {
    const month = settings.months[item.awarded.getMonth()]?.substring(0, 3) ?? ''
    return `${month} ${item.awarded.getFullYear()}`
  }
  if (item.startDate && item.endDate) {
    const startMonth = settings.months[item.startDate.getMonth()]?.substring(0, 3) ?? ''
    const endMonth = settings.months[item.endDate.getMonth()]?.substring(0, 3) ?? ''
    const endYear = item.endDate < item.startDate ? 'Present' : `${endMonth} ${item.endDate.getFullYear()}`
    return `${startMonth} ${item.startDate.getFullYear()} - ${endYear}`
  }
  return ''
}

// Determine bento grid span class based on index pattern
const getBentoClass = (index: number): string => {
  // Create a varied pattern: some wide, some tall, some both, some normal
  const pattern = index % 10
  switch (pattern) {
    case 0:
    case 5:
      return 'span-2-cols' // Wide
    case 2:
    case 7:
      return 'span-2-rows' // Tall
    case 4:
      return 'span-both' // Large (2x2)
    default:
      return '' // Normal (1x1)
  }
}

// Mutex for popovers - only one popup can be "opening" at a time
const activePopupId = ref<string | null>(null)
const popupOpenStates = ref<Record<string, boolean>>({})

// Delay constants
const POPUP_OPEN_DELAY = 150 // ms before opening
const POPUP_CLOSE_DELAY = 100 // ms before closing

// Set up hover handlers with mutex
const handleMouseEnter = (itemId: string) => {
  // Clear any existing timeout for this item
  if (popupTimeouts[itemId]) {
    clearTimeout(popupTimeouts[itemId])
  }

  // If another popup is opening or open, don't open this one immediately
  if (activePopupId.value && activePopupId.value !== itemId) {
    // Close the other popup first
    popupOpenStates.value[activePopupId.value] = false
  }

  // Set this as the active popup
  activePopupId.value = itemId

  // Open after delay
  popupTimeouts[itemId] = setTimeout(() => {
    popupOpenStates.value[itemId] = true
  }, POPUP_OPEN_DELAY)
}

const handleMouseLeave = (itemId: string) => {
  if (popupTimeouts[itemId]) {
    clearTimeout(popupTimeouts[itemId])
  }

  popupTimeouts[itemId] = setTimeout(() => {
    popupOpenStates.value[itemId] = false
    if (activePopupId.value === itemId) {
      activePopupId.value = null
    }
  }, POPUP_CLOSE_DELAY)
}

// Track timeouts
const popupTimeouts: Record<string, ReturnType<typeof setTimeout>> = {}

// UTabs filter options and state
const contributorsOptions = ref<TabsItem[]>([
  { label: 'All', value: 'all', icon: 'i-lucide-gallery-vertical-end' },
  { label: 'Solo', value: 'solo', icon: 'i-lucide-user' },
  { label: 'Team', value: 'team', icon: 'i-lucide-users' }
])
const contributorsActive = ref('all')

const certsOptions = ref<TabsItem[]>([
  { label: 'All', icon: 'i-lucide-gallery-vertical-end', value: 'all' },
  { label: 'Projects', icon: 'i-lucide-square-kanban', value: 'project' },
  { label: 'Certificates', icon: 'i-lucide-file-badge', value: 'certificate' }
])
const certsActive = ref('all')

// Carousel settings
const CarouselBG = ref(true)
const CarouselScroll = ref(true)

</script>

<template>
  <contentPanels contentClasses="flex justify-evenly flex-wrap">
    <template #left-panel-header>
      <div class="font-bold " style="line-height: 1;">
        <MazAnimatedElement direction="up" :duration="700" :delay="500">
          <p class="text-[3rem] varela">Portfolio</p>
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="600">
          <p class="text-[1rem]">What I have worked on</p>
        </MazAnimatedElement>
      </div>
    </template>

    <template #left-panel-content>
      <div class="flex flex-col items-start">
        <MazAnimatedElement direction="up" :duration="700" :delay="900">
          <UTabs :content="false" :items="contributorsOptions"
            class="mx-auto w-fit" style="--ui-primary: #4a5565"
            v-model="contributorsActive"
            :ui="{ trigger: 'self-start', label: 'dark:text-white', leadingIcon: 'dark:text-white' }" />
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="700">
          <SkillsInput
            @change="(e) => console.log(JSON.parse(JSON.stringify(e)))" />
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="800">
          <UTabs :content="false" :items="certsOptions" class="mx-auto w-fit"
            style="--ui-primary: #4a5565" orientation="vertical"
            v-model="certsActive"
            :ui="{ trigger: 'self-start', label: 'dark:text-white', leadingIcon: 'dark:text-white' }" />
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="950"
          class="flex justify-center mt-4">
          <UPopover>
            <UButton color="neutral" variant="soft" icon="i-lucide-calendar">
              <template v-if="calendarVal.start">
                <template v-if="calendarVal.end">
                  {{ df.format(calendarVal.start.toDate(getLocalTimeZone())) }}
                  -
                  {{ df.format(calendarVal.end.toDate(getLocalTimeZone())) }}
                </template>

                <template v-else>
                  {{ df.format(calendarVal.start.toDate(getLocalTimeZone())) }}
                </template>
              </template>
              <template v-else>
                Pick a date range
              </template>
            </UButton>
            <template #content>
              <UCalendar v-model="(calendarVal as any)" class="p-2"
                color="primary" :number-of-months="2" range />
            </template>
          </UPopover>
        </MazAnimatedElement>
      </div>
    </template>

    <template #left-panel-footer>
      <div class=" flex items-start justify-between flex-col gap-4"
        :style="isDefaultTheme ? { '--ui-primary': `hsl(${defaultColor.h}, ${defaultColor.s}%, ${defaultColor.l}%)` } : {}">
        <USwitch v-model="CarouselBG"
          :color="isDefaultTheme ? 'primary' : 'neutral'"
          label="Carousel Backgrounds" size="sm" />
        <USwitch v-model="CarouselScroll"
          :color="isDefaultTheme ? 'primary' : 'neutral'" size="sm"
          description="(on hover)" label="Carousel Scrolling" />
      </div>
    </template>

    <template #content>
      <!-- Bento/Brick Grid Layout -->
      <div class="bento-grid p-4">
        <div v-for="(item, index) in filteredItems" :key="item.uniqueId"
          :class="['bento-item', getBentoClass(index)]"
          @mouseenter="handleMouseEnter(item.uniqueId)"
          @mouseleave="handleMouseLeave(item.uniqueId)">
          <UPopover mode="hover" :ui="{ content: 'w-80 p-0' }"
            class="w-full h-full" :open="popupOpenStates[item.uniqueId]"
            :open-delay="0" :close-delay="0"
            @update:open="(val: boolean) => popupOpenStates[item.uniqueId] = val">
            <template #default>
              <div
                class="relative group cursor-pointer overflow-hidden rounded-xl w-full h-full bg-[var(--ui-bg)] cardShadow">
                <img :src="item.imageUrl" :alt="item.name"
                  class="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  loading="lazy" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                  <div class="absolute bottom-0 left-0 right-0 p-3">
                    <p class="text-white font-bold text-sm truncate">{{
                      item.name }}</p>
                    <p class="text-white/80 text-xs">{{ formatDate(item) }}
                    </p>
                  </div>
                </div>
              </div>
            </template>

            <template #content>
              <UCard class="border-0 shadow-none">
                <template #header>
                  <div class="flex justify-between items-start gap-2">
                    <div>
                      <h3 class="font-bold text-lg varela">{{ item.name }}
                      </h3>
                      <p class="text-xs text-muted">{{ formatDate(item) }}</p>
                    </div>
                    <UBadge
                      :color="item.type === 'certificate' ? 'warning' : 'primary'"
                      variant="soft" size="xs">
                      {{ item.type === 'certificate' ? 'Certificate' :
                        'Project' }}
                    </UBadge>
                  </div>
                </template>

                <p class="text-sm text-muted mb-3">{{ item.description }}</p>

                <div class="flex flex-wrap gap-1">
                  <span v-for="skill in item.skills.slice(0, 6)" :key="skill"
                    class="text-xs px-2 py-1 rounded-full bg-[var(--ui-bg-elevated)]">
                    {{ skill }}
                  </span>
                  <span v-if="item.skills.length > 6"
                    class="text-xs px-2 py-1 text-muted">
                    +{{ item.skills.length - 6 }}
                  </span>
                </div>

                <template #footer>
                  <nuxt-link
                    :to="(item.type === 'project' ? '/project/' : '/certificate/') + item.name.replaceAll(' ', '~')">
                    <UButton variant="soft" color="primary" size="sm"
                      class="w-full" trailing-icon="i-lucide-arrow-right">
                      View {{ item.type === 'project' ? 'Project' :
                        'Certificate' }}
                    </UButton>
                  </nuxt-link>
                </template>
              </UCard>
            </template>
          </UPopover>
        </div>
      </div>
    </template>

  </contentPanels>
</template>

<style scoped>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  grid-auto-flow: dense;
  gap: 1rem;
}

.bento-item {
  grid-column: span 1;
  grid-row: span 1;
}

.bento-item.span-2-cols {
  grid-column: span 2;
}

.bento-item.span-2-rows {
  grid-row: span 2;
}

.bento-item.span-both {
  grid-column: span 2;
  grid-row: span 2;
}

@media (max-width: 1200px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 180px;
  }

  .bento-item.span-2-cols {
    grid-column: span 2;
  }

  .bento-item.span-both {
    grid-column: span 2;
    grid-row: span 2;
  }
}

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px;
  }

  .bento-item.span-2-cols,
  .bento-item.span-both {
    grid-column: span 2;
  }

  .bento-item.span-2-rows,
  .bento-item.span-both {
    grid-row: span 2;
  }
}

@media (max-width: 480px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }

  .bento-item.span-2-cols,
  .bento-item.span-both {
    grid-column: span 1;
  }
}
</style>