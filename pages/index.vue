<script setup lang="ts">
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import type { TabsItem } from '@nuxt/ui'
import { useSettingsStore } from '~/stores/settings'

const router = useRouter()
const settings = useSettingsStore()

const {
  isDark,
  toggleDarkMode,
  colorMode
} = useTheme()

// Use store state
const { zarlashtTheme, aeonTheme, mirageTheme, bgAnimation, defaultColor } = storeToRefs(settings)

const selectedMode = ref<'light' | 'dark' | 'system'>('system')
const selectedTheme = ref('default')

const themeTabs = ref<TabsItem[]>([
  { label: 'Default', value: 'default' },
  { label: 'Aeon', value: 'aeon' },
  { label: 'Mirage', value: 'mirage' },
  { label: 'Zarlasht', value: 'zarlasht' }
])

watch(selectedTheme, (newVal) => {
  if (newVal === 'default') {
    settings.clearThemes()
  } else if (newVal === 'aeon') {
    settings.setAeonTheme(true)
  } else if (newVal === 'mirage') {
    settings.setMirageTheme(true)
  } else if (newVal === 'zarlasht') {
    settings.setZarlashtTheme(true)
  }
})

// Watch for dark/light mode changes
watch(selectedMode, (newMode) => {
  colorMode.value = newMode
})

// Sync theme tabs with store state
watch([zarlashtTheme, aeonTheme, mirageTheme], ([z, a, m]) => {
  if (z) selectedTheme.value = 'zarlasht'
  else if (a) selectedTheme.value = 'aeon'
  else if (m) selectedTheme.value = 'mirage'
  else selectedTheme.value = 'default'
})

// Track if we're on default theme for bg animation logic
const isDefaultTheme = computed(() => !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value)

// Calculate primary color with dark mode offset
const primaryColorStyle = computed(() => {
  if (selectedTheme.value !== 'default') return {}
  const isDark = selectedMode.value === 'dark' || (selectedMode.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const hue = isDark ? defaultColor.value.h + 240 : defaultColor.value.h
  return { '--ui-primary': `hsl(${hue}, ${defaultColor.value.s}%, ${defaultColor.value.l}%)` }
})

// Turn off bg animation when default theme is active, enable when switching FROM default
let previousWasDefault = true
watch(isDefaultTheme, (isDefault) => {
  if (isDefault) {
    bgAnimation.value = false
  } else if (previousWasDefault) {
    // Switched FROM default TO a theme - auto-enable
    bgAnimation.value = true
  }
  previousWasDefault = isDefault
})

function enterSite() {
  router.push('/home')
}

// Reset color to default #a45848
function resetColor() {
  settings.setDefaultColor({ h: 10, s: 39, l: 46 })
}

// Sync initial theme state with HTML classes
onMounted(() => {
  settings.syncFromHtml()
  const html = document.documentElement
  if (html.classList.contains('zTheme')) {
    selectedTheme.value = 'zarlasht'
  } else if (html.classList.contains('aTheme')) {
    selectedTheme.value = 'aeon'
  } else if (html.classList.contains('mTheme')) {
    selectedTheme.value = 'mirage'
  }
  // Initialize CSS variables
  document.documentElement.style.setProperty('--primary-hue', defaultColor.value.h.toString())
  document.documentElement.style.setProperty('--primary-sat', defaultColor.value.s + '%')
  document.documentElement.style.setProperty('--primary-lit', defaultColor.value.l + '%')
})

// Watch for color changes to update CSS variables
watch(defaultColor, (newColor) => {
  document.documentElement.style.setProperty('--primary-hue', newColor.h.toString())
  document.documentElement.style.setProperty('--primary-sat', newColor.s + '%')
  document.documentElement.style.setProperty('--primary-lit', newColor.l + '%')
}, { deep: true })

// Actually control background animation
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
})

// Update CSS variable when default color changes
watch(defaultColor, (newColor) => {
  document.documentElement.style.setProperty('--primary-hue', newColor.h.toString())
}, { immediate: true, deep: true })
</script>

<template>
  <div
    class="welcome-container h-screen w-screen flex items-center justify-center p-8">
    <div
      class="cardShadow p-16 max-w-lg w-full h-[34rem] flex-col flex justify-between">
      <!-- Welcome Title -->
      <MazAnimatedElement direction="up" :duration="800" :delay="100">
        <div class="text-center mb-12">
          <h1 class="text-6xl font-bold varela">Welcome</h1>
        </div>
      </MazAnimatedElement>

      <!-- Theme Selection -->
      <MazAnimatedElement direction="up" :duration="700" :delay="300">
        <div class="mb-2" :style="primaryColorStyle">
          <h2 class="text-sm outfit tracking-wider mb-1">
            Pick your aesthetic
          </h2>
          <UTabs :content="false" :items="themeTabs" v-model="selectedTheme"
            :color="selectedTheme === 'default' ? 'primary' : 'neutral'"
            class="w-full theme-tabs" orientation="horizontal"
            :ui="{ list: 'grid grid-cols-4 gap-2', trigger: 'theme-tab-trigger' }">
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
          ]" v-model="selectedMode" class="w-full" color="neutral"
            :ui="{ list: 'grid grid-cols-3 gap-2' }" />

          <!-- Color Pickers & BG Animation Toggle -->
          <Transition name="fade" mode="out-in">
            <div v-if="selectedTheme === 'default'" key="sliders"
              class="mt-2 space-y-2">
              <!-- Hue -->
              <div
                class="flex items-center justify-between p-2 rounded-lg bg-elevated">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-palette" class="text-lg" />
                  <span class="text-sm font-medium">Hue</span>
                </div>
                <USlider v-model="defaultColor.h" :min="0" :max="360" :step="1"
                  class="w-24" size="sm" color="neutral" />
              </div>
              <!-- Saturation -->
              <div
                class="flex items-center justify-between p-2 rounded-lg bg-elevated">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-droplets" class="text-lg" />
                  <span class="text-sm font-medium">Saturation</span>
                </div>
                <USlider v-model="defaultColor.s" :min="0" :max="100" :step="1"
                  class="w-24" size="sm" color="neutral" />
              </div>
              <!-- Lightness -->
              <div
                class="flex items-center justify-between p-2 rounded-lg bg-elevated">
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-sun" class="text-lg" />
                  <span class="text-sm font-medium">Lightness</span>
                </div>
                <USlider v-model="defaultColor.l" :min="0" :max="100" :step="1"
                  class="w-24" size="sm" color="neutral" />
              </div>
              <!-- Reset Button -->
              <UButton variant="soft" size="xs" color="neutral"
                @click="resetColor" trailing-icon="i-lucide-rotate-ccw"
                class="w-full"
                :disabled="defaultColor.h === 10 && defaultColor.s === 39 && defaultColor.l === 46"
                :class="{ 'opacity-50': defaultColor.h === 10 && defaultColor.s === 39 && defaultColor.l === 46 }">
                <p class="w-full text-center">Reset Color</p>
              </UButton>
            </div>
            <div v-else key="bgAnim"
              class="mt-2 flex items-center bg-elevated justify-between p-3 rounded-lg">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-play-circle" class="text-lg " />
                <span class="text-sm font-medium">Background Animation</span>
              </div>
              <USwitch v-model="bgAnimation" color="neutral" size="sm" />
            </div>
          </Transition>
        </div>
      </MazAnimatedElement>
      <USeparator class="w-11/12 self-center my-3" />
      <!-- Enter Button -->
      <MazAnimatedElement direction="up" :duration="700" :delay="1100">
        <div class="contents" :style="primaryColorStyle">
          <UButton trailing-icon="i-lucide-arrow-right" @click="enterSite"
            class="w-full justify-center"
            :color="selectedTheme === 'default' ? 'primary' : 'neutral'">
            <span class="text-lg">Enter</span>
          </UButton>
        </div>
      </MazAnimatedElement>
    </div>
  </div>
</template>

<style>
/* Fade transition for color pickers */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>