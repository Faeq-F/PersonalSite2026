import { useSettingsStore } from '~/stores/settings'
import { storeToRefs } from 'pinia'

/**
 * Composable for theme-related utilities
 * Centralizes theme logic used across components
 */
export function useTheme() {
  const settings = useSettingsStore()
  const { petalTheme, zarlashtTheme, aeonTheme, mirageTheme, defaultColor } = storeToRefs(settings)

  /**
   * Check if on petal theme (custom colors)
   */
  const isPetalTheme = computed(() => 
    petalTheme.value && !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value
  )

  /**
   * Get theme name for current theme
   */
  const currentTheme = computed(() => {
    if (petalTheme.value) return 'petal'
    if (zarlashtTheme.value) return 'zarlasht'
    if (aeonTheme.value) return 'aeon'
    if (mirageTheme.value) return 'mirage'
    return 'default' // No special theme
  })

  /**
   * Check if specific theme is active
   */
  const isTheme = (theme: 'petal' | 'zarlasht' | 'aeon' | 'mirage' | 'default') => {
    return currentTheme.value === theme
  }

  return {
    petalTheme,
    zarlashtTheme,
    aeonTheme,
    mirageTheme,
    defaultColor,
    isPetalTheme,
    currentTheme,
    isTheme,
    setPetalTheme: settings.setPetalTheme,
    setZarlashtTheme: settings.setZarlashtTheme,
    setAeonTheme: settings.setAeonTheme,
    setMirageTheme: settings.setMirageTheme,
    clearThemes: settings.clearThemes,
    setDefaultColor: settings.setDefaultColor
  }
}
