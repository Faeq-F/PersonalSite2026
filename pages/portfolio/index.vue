<script lang="ts" setup>
import contentPanels from '~/components/layoutSections/contentPanels.vue';
import PortfolioFilters from '~/components/portfolio/PortfolioFilters.vue'
import '~/assets/css/portfolio.css'
import { ref, computed, onMounted, nextTick, watch, provide } from 'vue';
import { storeToRefs } from 'pinia';

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

import BentoGrid from "@bentogrid/core";

let featuredBentoInstance: InstanceType<typeof BentoGrid> | null = null
let regularBentoInstance: InstanceType<typeof BentoGrid> | null = null

// Store calculated bento sizes per item (keyed by uniqueId)
const bentoSizes = ref<Record<string, string>>({})

// Preload an image and return its natural dimensions
function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => resolve({ width: 1, height: 1 }) // fallback to 1x1
    img.src = src
  })
}

function calcBentoValue(width: number, height: number): string {
  const ratio = width / height
  if (ratio > 1.4) {
    // Wide (landscape): 2x1 base, multiply both by random factor
    const multiplier = Math.floor(Math.random()) + 1
    return `${2 * multiplier}x${multiplier}`
  }
  if (ratio < 0.7) {
    // Portrait: 1x2 base, multiply both by random factor
    const multiplier = Math.floor(Math.random()) + 1
    return `${multiplier}x${2 * multiplier}`
  }
  // Square-ish: 1x1 base, multiply both by random factor
  const multiplier = Math.floor(Math.random()) + 1
  return `${multiplier}x${multiplier}`
}

function initFeaturedGrid() {
  if (featuredBentoInstance) {
    featuredBentoInstance.recalculate()
  } else {
    featuredBentoInstance = new BentoGrid({
      target: '.bentogrid.featured',
      cellGap: 16,
      columns: 6,
      aspectRatio: 1,
      breakpointReference: 'window',
    })
  }
}

function initRegularGrid() {
  if (regularBentoInstance) {
    regularBentoInstance.recalculate()
  } else {
    regularBentoInstance = new BentoGrid({
      target: '.bentogrid.regular',
      cellGap: 16,
      columns: 6,
      aspectRatio: 1,
      breakpointReference: 'window',
    })
  }
}

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
const featuredOrderSeed = ref(0)
const regularOrderSeed = ref(0)
const featuredItems = computed(() => {
  const orderSeed = featuredOrderSeed.value
  // Filter and shuffle featured items
  const featured = portfolioItems.value.filter(item => item.isFeatured)
  const shuffledItems = [...featured]
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const hash = ((orderSeed * 9301 + 49297) * i) % 233280
    const j = hash % (i + 1)
    const temp = shuffledItems[i]
    shuffledItems[i] = shuffledItems[j]
    shuffledItems[j] = temp
  }
  return shuffledItems.map(item => {
    const images = (item.images && item.images.length > 0) ? item.images : [PLACEHOLDER_IMAGE]
    return { ...item, imageIndex: 0, imageUrl: images[0], uniqueId: item.id }
  })
})
const regularItems = computed(() => {
  const orderSeed = regularOrderSeed.value
  const regular = portfolioItems.value.filter(item => !item.isFeatured)
  const shuffledItems = [...regular]
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const hash = ((orderSeed * 9301 + 49297) * i) % 233280
    const j = hash % (i + 1)
    const temp = shuffledItems[i]
    shuffledItems[i] = shuffledItems[j]
    shuffledItems[j] = temp
  }
  return shuffledItems.map(item => {
    const images = (item.images && item.images.length > 0) ? item.images : [PLACEHOLDER_IMAGE]
    return { ...item, imageIndex: 0, imageUrl: images[0], uniqueId: item.id }
  })
})

// Watch both sections – preload images, compute bento sizes, then init grids
watch([featuredItems, regularItems], async () => {
  // Preload featured items
  const featuredSizeMap: Record<string, string> = {}
  await Promise.all(
    featuredItems.value.map(async (item) => {
      const dims = await getImageDimensions(item.imageUrl)
      featuredSizeMap[item.uniqueId] = calcBentoValue(dims.width, dims.height)
    })
  )
  bentoSizes.value = { ...bentoSizes.value, ...featuredSizeMap }

  // Preload regular items
  const regularSizeMap: Record<string, string> = {}
  await Promise.all(
    regularItems.value.map(async (item) => {
      const dims = await getImageDimensions(item.imageUrl)
      regularSizeMap[item.uniqueId] = calcBentoValue(dims.width, dims.height)
    })
  )
  bentoSizes.value = { ...bentoSizes.value, ...regularSizeMap }

  // Wait for Vue to render the items with updated data-bento attributes
  await nextTick()
  // Small delay to ensure DOM is fully painted
  requestAnimationFrame(() => {
    initFeaturedGrid()
    initRegularGrid()
  })
}, { immediate: true })

// Randomize item order
const randomizeItems = () => {
  featuredOrderSeed.value = Math.floor(Math.random() * 10000)
  regularOrderSeed.value = Math.floor(Math.random() * 10000)
  featuredBentoInstance = null
  regularBentoInstance = null
}

//randomize initially
randomizeItems()

provide('randomizeItems', randomizeItems)
provide('isPetalTheme', isPetalTheme)
provide('defaultColor', defaultColor)

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
          <p class="text-[2rem] md:text-[3rem] varela">Portfolio</p>
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
      <div class="flex flex-col gap-2 text-sm text-muted">
        Images are compressed, with PII redacted, to prevent forgery / cloning. I am able to provide the original
        copies of documents on request.
      </div>
    </template>

    <template #content>
      <!-- Featured Projects Grid -->
      <div v-if="featuredItems.length > 0" class="mb-12">
        <h2 class="mt-4 text-2xl font-bold mb-4 ml-8 varela text-[var(--ui-text)]">Featured</h2>
        <div class="bentogrid featured">
          <div v-for="item in featuredItems" :key="item.uniqueId" :data-bento="bentoSizes[item.uniqueId] || '1x1'">
            <UPopover :open="isPopoverOpen(item.uniqueId)" :ui="{ content: 'w-80 p-0' }" class="w-full h-full"
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
                      <p class="text-white font-bold text-sm">{{ item.name }}</p>
                      <p class="text-white/80 text-xs">{{ formatDate(item) }}</p>
                    </div>
                  </div>
                </div>
              </template>

              <template #content>
                <UCard class="border-0 shadow-none">
                  <template #header>
                    <div class="flex justify-between items-start gap-2">
                      <div>
                        <h3 class="font-bold text-lg varela">{{ item.name }}</h3>
                        <p class="text-xs text-muted">{{ formatDate(item) }}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <UBadge variant="soft" size="sm">
                          {{ item.type === 'certificate' ? 'Certificate' : 'Project' }}
                        </UBadge>
                        <UButton variant="ghost" size="xs" icon="i-lucide-x" @click="closePopover(item.uniqueId)" />
                      </div>
                    </div>
                  </template>

                  <p class="text-sm text-muted mb-3">{{ item.description }}</p>

                  <div v-if="item.skills?.filter(s => s).length"
                    class="flex flex-wrap gap-1 max-h-20 overflow-y-scroll">
                    <UTooltip v-for="skill in item.skills.filter(s => s)" :key="skill" :text="skill">
                      <nuxt-link :to="'/skill/' + skill.replaceAll(' ', '~')"
                        class="text-xs px-2 py-1 rounded-full bg-[var(--ui-bg-elevated)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] transition-colors">
                        {{ skill }}
                      </nuxt-link>
                    </UTooltip>
                  </div>

                  <template #footer>
                    <nuxt-link
                      :to="(item.type === 'project' ? '/project/' : '/certificate/') + item.name.replaceAll(' ', '~')">
                      <UButton variant="soft" color="primary" size="sm" class="w-full"
                        trailing-icon="i-lucide-arrow-right">
                        View {{ item.type === 'project' ? 'Project' : 'Certificate' }}
                      </UButton>
                    </nuxt-link>
                  </template>
                </UCard>
              </template>
            </UPopover>
          </div>
        </div>
      </div>

      <!-- Additional Work Grid -->
      <div v-if="regularItems.length > 0" class="mb-12">
        <h2 class="my-4 text-2xl font-bold mb-4 ml-8 varela text-[var(--ui-text)]">Additional Work</h2>
        <div class="bentogrid regular">
          <div v-for="item in regularItems" :key="item.uniqueId" :data-bento="bentoSizes[item.uniqueId] || '1x1'">
            <UPopover :open="isPopoverOpen(item.uniqueId)" :ui="{ content: 'w-80 p-0' }" class="w-full h-full"
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
                      <p class="text-white font-bold text-sm truncate">{{ item.name }}</p>
                      <p class="text-white/80 text-xs">{{ formatDate(item) }}</p>
                    </div>
                  </div>
                </div>
              </template>

              <template #content>
                <UCard class="border-0 shadow-none">
                  <template #header>
                    <div class="flex justify-between items-start gap-2">
                      <div>
                        <h3 class="font-bold text-lg varela">{{ item.name }}</h3>
                        <p class="text-xs text-muted">{{ formatDate(item) }}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <UBadge variant="soft" size="sm">
                          {{ item.type === 'certificate' ? 'Certificate' : 'Project' }}
                        </UBadge>
                        <UButton variant="ghost" size="xs" icon="i-lucide-x" @click="closePopover(item.uniqueId)" />
                      </div>
                    </div>
                  </template>

                  <p class="text-sm text-muted mb-3">{{ item.description }}</p>

                  <div v-if="item.skills?.filter(s => s).length"
                    class="flex flex-wrap gap-1 max-h-20 overflow-y-scroll">
                    <UTooltip v-for="skill in item.skills.filter(s => s)" :key="skill" :text="skill">
                      <nuxt-link :to="'/skill/' + skill.replaceAll(' ', '~')"
                        class="text-xs px-2 py-1 rounded-full bg-[var(--ui-bg-elevated)] text-[var(--ui-text-muted)] hover:text-[var(--ui-text)] transition-colors">
                        {{ skill }}
                      </nuxt-link>
                    </UTooltip>
                  </div>

                  <template #footer>
                    <nuxt-link
                      :to="(item.type === 'project' ? '/project/' : '/certificate/') + item.name.replaceAll(' ', '~')">
                      <UButton variant="soft" color="primary" size="sm" class="w-full"
                        trailing-icon="i-lucide-arrow-right">
                        View {{ item.type === 'project' ? 'Project' : 'Certificate' }}
                      </UButton>
                    </nuxt-link>
                  </template>
                </UCard>
              </template>
            </UPopover>
          </div>
        </div>
      </div>
    </template>
  </contentPanels>
</template>

<style lang="css">
.bentogrid .bento-filler {
  border-radius: calc(var(--ui-radius) * 3);
  background-color: transparent;
  pointer-events: none;
  cursor: not-allowed !important;

  &::before {
    content: "Click on something to learn more!";
    font-size: 0.75rem;
    font-weight: 600;
    font-style: italic;
    line-height: 1;
    left: 1rem;
    opacity: 0.4;
    position: relative;
  }
}
</style>
