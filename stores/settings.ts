import { defineStore } from "pinia";
import { useColorMode } from "@vueuse/core";

export const useSettingsStore = defineStore("settingsStore", {
  persist: {
    pick: ['petalTheme', 'zarlashtTheme', 'aeonTheme', 'mirageTheme', 'bgAnimation', 'defaultColor', 'colorModeOverride']
  },
  state: () => ({
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    petalTheme: false,
    zarlashtTheme: false,
    aeonTheme: false,
    mirageTheme: false,
    bgAnimation: false,
    defaultColor: { h: 10, s: 39, l: 46 },
    colorModeOverride: 'system' as 'light' | 'dark' | 'system',
    initialized: false
  }),
  actions: {
    initTheme() {
      // Initialize theme classes on HTML element based on store state
      // Called once on app mount
      if (this.initialized) return
      this.initialized = true

      const html = document.documentElement
      // Check if any theme class exists in HTML
      const hasThemeClass = html.classList.contains('petalTheme') ||
        html.classList.contains('zTheme') ||
        html.classList.contains('aTheme') ||
        html.classList.contains('mTheme')

      if (!hasThemeClass) {
        // No theme class found - leave bare (default theme, no class)
        // Petal theme is opt-in
        this.petalTheme = false
      } else {
        // Sync store from HTML
        this.syncFromHtml()
      }
    },
    setPetalTheme(value: boolean) {
      this.petalTheme = value
      if (value) {
        this.zarlashtTheme = false
        this.aeonTheme = false
        this.mirageTheme = false
        document.documentElement.classList.add('petalTheme')
        document.documentElement.classList.remove('zTheme', 'aTheme', 'mTheme')
        // Initialize CSS variables for petal theme
        this.setDefaultColor(this.defaultColor)
      } else {
        document.documentElement.classList.remove('petalTheme')
      }
    },
    setZarlashtTheme(value: boolean) {
      this.zarlashtTheme = value
      if (value) {
        this.petalTheme = false
        this.aeonTheme = false
        this.mirageTheme = false
        document.documentElement.classList.add('zTheme')
        document.documentElement.classList.remove('petalTheme', 'aTheme', 'mTheme')
      } else {
        document.documentElement.classList.remove('zTheme')
      }
    },
    setAeonTheme(value: boolean) {
      this.aeonTheme = value
      if (value) {
        this.petalTheme = false
        this.zarlashtTheme = false
        this.mirageTheme = false
        document.documentElement.classList.add('aTheme')
        document.documentElement.classList.remove('petalTheme', 'zTheme', 'mTheme')
      } else {
        document.documentElement.classList.remove('aTheme')
      }
    },
    setMirageTheme(value: boolean) {
      this.mirageTheme = value
      if (value) {
        this.petalTheme = false
        this.zarlashtTheme = false
        this.aeonTheme = false
        document.documentElement.classList.add('mTheme')
        document.documentElement.classList.remove('petalTheme', 'zTheme', 'aTheme')
      } else {
        document.documentElement.classList.remove('mTheme')
      }
    },
    clearThemes() {
      this.petalTheme = false
      this.zarlashtTheme = false
      this.aeonTheme = false
      this.mirageTheme = false
      document.documentElement.classList.remove('petalTheme', 'zTheme', 'aTheme', 'mTheme')
    },
    syncFromHtml() {
      const html = document.documentElement
      this.petalTheme = html.classList.contains('petalTheme')
      this.zarlashtTheme = html.classList.contains('zTheme')
      this.aeonTheme = html.classList.contains('aTheme')
      this.mirageTheme = html.classList.contains('mTheme')
    },
    setDefaultColor(color: { h: number; s: number; l: number }) {
      // Mutate existing object for proper reactivity
      Object.assign(this.defaultColor, color)
      // Update CSS variables
      document.documentElement.style.setProperty('--primary-hue', color.h.toString())
      document.documentElement.style.setProperty('--primary-sat', color.s + '%')
      document.documentElement.style.setProperty('--primary-lit', color.l + '%')
    },
    setColorMode(mode: 'light' | 'dark' | 'system') {
      this.colorModeOverride = mode
      const colorMode = useColorMode()
      if (mode !== 'system') {
        colorMode.value = mode
      }
    }
  },
});
