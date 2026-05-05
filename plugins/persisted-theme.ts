import { defineNuxtPlugin } from '#app'
import { useSettingsStore } from '~/stores/settings'
import { useColorMode } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const store = useSettingsStore()
    
    // Wait for store to be ready (after persisted state is restored)
    setTimeout(() => {
      // Re-apply theme classes from persisted state
      if (store.petalTheme) {
        document.documentElement.classList.add('petalTheme')
        store.setDefaultColor(store.defaultColor)
      } else if (store.zarlashtTheme) {
        document.documentElement.classList.add('zTheme')
      } else if (store.aeonTheme) {
        document.documentElement.classList.add('aTheme')
      } else if (store.mirageTheme) {
        document.documentElement.classList.add('mTheme')
      }
      
      // Re-apply color mode if not system
      if (store.colorModeOverride && store.colorModeOverride !== 'system') {
        const colorMode = useColorMode()
        colorMode.value = store.colorModeOverride
      }
      
      // Re-apply CSS variables
      document.documentElement.style.setProperty('--primary-hue', store.defaultColor.h.toString())
      document.documentElement.style.setProperty('--primary-sat', store.defaultColor.s + '%')
      document.documentElement.style.setProperty('--primary-lit', store.defaultColor.l + '%')
    }, 0)
  })
})
