<script lang="ts" setup>
import contentPanels from '~/components/layoutSections/contentPanels.vue';
import PortfolioFilters from '~/components/portfolio/PortfolioFilters.vue'
import '~/assets/css/portfolio.css'
import { ref, computed, onMounted } from 'vue';

import { useSettingsStore } from '~/stores/settings'
const settings = useSettingsStore()
const { petalTheme, defaultColor, zarlashtTheme, aeonTheme, mirageTheme } = storeToRefs(settings)

// Import DB
import { db, type Project, type Certificate } from '~/assets/scripts/db';

// Check if on default theme
const isPetalTheme = computed(() => petalTheme.value && !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value)

// Placeholder image
const PLACEHOLDER_IMAGE = '/PersonalSite2026/media/placeholder.png'

// Portfolio data loaded from DB
const portfolioItems = ref<Array<Project | Certificate & { type: 'project' | 'certificate', id: string }>>([])

onMounted(async () => {
  // Load projects from DB
  const dbProjects = await db.projects.toArray()
  const projects = dbProjects.map(p => ({
    ...p,
    type: 'project' as const,
    id: p.name
  }))

  // Load certificates from DB
  const dbCerts = await db.certificates.toArray()
  const certs = dbCerts.map(c => ({
    ...c,
    type: 'certificate' as const,
    id: c.name,
    awarded: c.awarded
  }))

  portfolioItems.value = [...projects, ...certs]
})

// Flatten all images for waterfall layout (with placeholder fallback)
const imageSeed = ref(0)
const itemOrderSeed = ref(0)
const filteredItems = computed(() => {
  const seed = imageSeed.value
  const orderSeed = itemOrderSeed.value
  // Deterministic shuffle based on orderSeed using Fisher-Yates
  const shuffledItems = [...portfolioItems.value]
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    // Use a simple hash of orderSeed + i for deterministic random
    const hash = ((orderSeed * 9301 + 49297) * i) % 233280
    const j = hash % (i + 1)
      ;[shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]]
  }
  return shuffledItems.map(item => {
    // Fallback to placeholder if no images
    const images = (item.images && item.images.length > 0) ? item.images : [PLACEHOLDER_IMAGE]
    // Deterministic random based on item name and seed
    let hash = 0
    for (const char of item.id) {
      hash = (hash + char.charCodeAt(0)) % 10000
    }
    const randomIndex = ((hash + seed) % images.length + images.length) % images.length
    return {
      ...item,
      imageIndex: randomIndex,
      imageUrl: images[randomIndex],
      uniqueId: item.id
    }
  })
})

// Randomize image selection
const randomizeImages = () => {
  imageSeed.value = Math.floor(Math.random() * 10000)
}

// Randomize item order
const randomizeItems = () => {
  itemOrderSeed.value = Math.floor(Math.random() * 10000)
}

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

// UTabs filter options and state

// Track open popover state
const openPopovers = ref<string[]>([]);

const isPopoverOpen = (id: string) => openPopovers.value.includes(id);
const closePopover = (id: string) => {
  openPopovers.value = openPopovers.value.filter(pid => pid !== id);
};

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
      <PortfolioFilters />
    </template>

    <template #left-panel-footer>
      <div class="flex flex-col gap-2">
        <UButton color="neutral" variant="soft" icon="i-lucide-shuffle"
          @click="randomizeImages"
          :style="isPetalTheme ? { '--ui-primary': `hsl(${defaultColor.h}, ${defaultColor.s}%, ${defaultColor.l}%)` } : {}">
          Randomize Images
        </UButton>
        <UButton color="neutral" variant="soft" icon="i-lucide-arrow-up-down"
          @click="randomizeItems"
          :style="isPetalTheme ? { '--ui-primary': `hsl(${defaultColor.h}, ${defaultColor.s}%, ${defaultColor.l}%)` } : {}">
          Randomize Order
        </UButton>
      </div>
    </template>

    <template #content>
      <!-- Bento/Brick Grid Layout -->
      <div class="bento-grid p-4">
        <div v-for="(item, index) in filteredItems" :key="item.uniqueId"
          :class="['bento-item', getBentoClass(index)]">
          <UPopover :open="isPopoverOpen(item.uniqueId)"
            :ui="{ content: 'w-80 p-0' }" class="w-full h-full"
            :popper="{ placement: 'bottom' }"
            @update:open="(val: boolean) => val ? openPopovers.push(item.uniqueId) : closePopover(item.uniqueId)">
            <template #default>
              <div
                class="relative group overflow-hidden rounded-xl w-full h-full bg-[var(--ui-bg)] cardShadow clickable">
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
                    <div class="flex items-center gap-2">
                      <UBadge variant="soft" size="sm">
                        {{ item.type === 'certificate' ? 'Certificate' :
                          'Project' }}
                      </UBadge>
                      <UButton variant="ghost" size="xs" icon="i-lucide-x"
                        @click="closePopover(item.uniqueId)" />
                    </div>
                  </div>
                </template>

                <p class="text-sm text-muted mb-3">{{ item.description }}</p>

                <div v-if="item.skills?.filter(s => s).length"
                  class="flex flex-wrap gap-1">
                  <UTooltip v-for="skill in item.skills.filter(s => s)"
                    :key="skill" :text="skill">
                    <nuxt-link :to="'/skill/' + skill.replaceAll(' ', '~')"
                      class="text-xs px-2 py-1 rounded-full bg-[var(--ui-bg-elevated)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] transition-colors">
                      {{ skill }}
                    </nuxt-link>
                  </UTooltip>
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