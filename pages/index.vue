<script setup lang="ts">
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import WelcomeColorPicker from '~/components/welcome/WelcomeColorPicker.vue'
import type { TabsItem } from '@nuxt/ui'
import { useSettingsStore } from '~/stores/settings'

const router = useRouter()
const settings = useSettingsStore()

const {
  isDark,
  toggleDarkMode,
  colorMode
} = useTheme()

// Use store state (all persisted via pinia-plugin-persistedstate)
const { petalTheme, zarlashtTheme, aeonTheme, mirageTheme, bgAnimation, defaultColor, colorModeOverride } = storeToRefs(settings)

const selectedTheme = ref('default')

const themeTabs = ref<TabsItem[]>([
  { label: 'Default', value: 'default' },
  { label: 'Petal', value: 'petal' },
  { label: 'Aeon', value: 'aeon' },
  { label: 'Mirage', value: 'mirage' },
  { label: 'Zarlasht', value: 'zarlasht' }
])

watch(selectedTheme, (newVal) => {
  if (newVal === 'default') {
    settings.clearThemes()
  } else if (newVal === 'petal') {
    settings.setPetalTheme(true)
  } else if (newVal === 'aeon') {
    settings.setAeonTheme(true)
  } else if (newVal === 'mirage') {
    settings.setMirageTheme(true)
  } else if (newVal === 'zarlasht') {
    settings.setZarlashtTheme(true)
  }
}, { immediate: true })

// Watch for dark/light mode changes (persisted in store)
watch(colorModeOverride, (newMode) => {
  if (newMode !== 'system') {
    colorMode.value = newMode
  }
}, { immediate: true })

// Sync theme tabs with store state
watch([petalTheme, zarlashtTheme, aeonTheme, mirageTheme], ([p, z, a, m]) => {
  if (p) selectedTheme.value = 'petal'
  else if (z) selectedTheme.value = 'zarlasht'
  else if (a) selectedTheme.value = 'aeon'
  else if (m) selectedTheme.value = 'mirage'
  else selectedTheme.value = 'default' // No theme active
})

// Track if we're on petal theme (custom colors)
const isPetalTheme = computed(() => petalTheme.value)

// Calculate primary color with dark mode offset
const primaryColorStyle = computed(() => {
  if (selectedTheme.value !== 'petal') return {}
  const isDark = colorModeOverride.value === 'dark' || (colorModeOverride.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const hue = isDark ? defaultColor.value.h + 240 : defaultColor.value.h
  return { '--ui-primary': `hsl(${hue}, ${defaultColor.value.s}%, ${defaultColor.value.l}%)` }
})

// Turn off bg animation when petal or default theme is active
let previousWasPetalOrDefault = false
watch([isPetalTheme, selectedTheme], ([isPetal, theme]) => {
  const isDefault = theme === 'default'
  if (isPetal || isDefault) {
    bgAnimation.value = false
  } else if (previousWasPetalOrDefault) {
    // Switched FROM petal/default TO another theme - auto-enable
    bgAnimation.value = true
  }
  previousWasPetalOrDefault = isPetal || isDefault
})

function enterSite() {
  router.push('/home')
}

// Reset color to default #a45848
function resetColor() {
  settings.setDefaultColor({ h: 10, s: 39, l: 46 })
}

// Sync initial theme state with persisted store values
onMounted(() => {
  // Sync theme selection from persisted store state
  if (petalTheme.value) {
    selectedTheme.value = 'petal'
  } else if (zarlashtTheme.value) {
    selectedTheme.value = 'zarlasht'
  } else if (aeonTheme.value) {
    selectedTheme.value = 'aeon'
  } else if (mirageTheme.value) {
    selectedTheme.value = 'mirage'
  } else {
    selectedTheme.value = 'default'
  }
  // Apply persisted color mode
  if (colorModeOverride.value !== 'system') {
    colorMode.value = colorModeOverride.value
  }
})

// Watch for color changes to update CSS variables
watch(defaultColor, (newColor) => {
  document.documentElement.style.setProperty('--primary-hue', newColor.h.toString())
  document.documentElement.style.setProperty('--primary-sat', newColor.s + '%')
  document.documentElement.style.setProperty('--primary-lit', newColor.l + '%')
}, { deep: true })

// Actually control background animation (apply persisted state immediately)
watch(bgAnimation, (newValue) => {
  const videoBGelem = document.getElementById('video-bg-elem') as HTMLVideoElement
  const fogWrap = document.getElementById('fogWrap')
  if (!videoBGelem) return
  if (newValue) {
    document.documentElement.classList.remove('noAnim')
    fogWrap?.classList.remove('hidden')
    videoBGelem.play()
  } else {
    document.documentElement.classList.add('noAnim')
    fogWrap?.classList.add('hidden')
    videoBGelem.pause()
  }
}, { immediate: true })

const device = useDevice()
const tabOrientation = computed(() => device.isMobile ? 'vertical' : 'horizontal')
</script>

<template>
  <div
    class="welcome-container h-screen w-screen flex items-center justify-center p-4 md:p-8">
    <div
      class="cardShadow p-6 md:p-16 max-w-xl w-full h-auto md:h-[34rem] flex-col flex justify-between">
      <!-- Welcome Title -->
      <MazAnimatedElement direction="up" :duration="800" :delay="100">
        <div class="text-center mb-6 md:mb-12">
          <h1 class="text-4xl md:text-6xl font-bold varela">Welcome</h1>
        </div>
      </MazAnimatedElement>

      <!-- Theme Selection -->
      <MazAnimatedElement direction="up" :duration="700" :delay="300">
        <div class="mb-2" :style="primaryColorStyle">
          <h2 class="text-sm outfit tracking-wider mb-1">
            Pick your aesthetic
          </h2>
          <UTabs :content="false" :items="themeTabs" v-model="selectedTheme"
            :color="selectedTheme === 'petal' ? 'primary' : 'neutral'"
            class="w-full theme-tabs"
            :ui="!device.isMobile ? { list: 'grid grid-cols-5 gap-2', trigger: 'theme-tab-trigger' } : { list: 'w-full' }"
            :orientation="tabOrientation">
          </UTabs>
        </div>
      </MazAnimatedElement>

      <!-- Light/Dark Mode -->
      <MazAnimatedElement direction="up" :duration="700" :delay="700">
        <div :style="primaryColorStyle">
          <UTabs :content="false" :items="[
            { label: 'Auto', icon: 'i-lucide-laptop', value: 'system' },
            { label: 'Light', icon: 'i-lucide-sun', value: 'light' },
            { label: 'Dark', icon: 'i-lucide-moon', value: 'dark' }
          ]" v-model="colorModeOverride" class="w-full" color="neutral"
            :ui="{ list: 'grid grid-cols-3 gap-2' }" />

          <!-- Color Pickers & BG Animation Toggle -->
          <WelcomeColorPicker :defaultColor="defaultColor"
            :selectedTheme="selectedTheme" :bgAnimation="bgAnimation"
            @update:defaultColor="(val) => settings.setDefaultColor(val)"
            @update:bgAnimation="bgAnimation = $event" />
        </div>
      </MazAnimatedElement>
      <USeparator class="w-11/12 self-center my-3" />
      <!-- Enter Button -->
      <MazAnimatedElement direction="up" :duration="700" :delay="1100">
        <div class="contents" :style="primaryColorStyle">
          <UButton trailing-icon="i-lucide-arrow-right" @click="enterSite"
            class="w-full justify-center"
            :color="selectedTheme === 'petal' ? 'primary' : 'neutral'">
            <span class="text-lg">Enter</span>
          </UButton>
        </div>
      </MazAnimatedElement>
    </div>
  </div>
</template>