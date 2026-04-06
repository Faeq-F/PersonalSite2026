import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settingsStore", {
  state: () => ({
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    zarlashtTheme: false,
    aeonTheme: false,
    mirageTheme: false,
    bgAnimation: false,
    defaultColor: { h: 10, s: 39, l: 46 } // Default brownish HSL color
  }),
  actions: {
    setZarlashtTheme(value: boolean) {
      this.zarlashtTheme = value
      if (value) {
        this.aeonTheme = false
        this.mirageTheme = false
        document.documentElement.classList.add('zTheme')
        document.documentElement.classList.remove('aTheme', 'mTheme')
      } else {
        document.documentElement.classList.remove('zTheme')
      }
    },
    setAeonTheme(value: boolean) {
      this.aeonTheme = value
      if (value) {
        this.zarlashtTheme = false
        this.mirageTheme = false
        document.documentElement.classList.add('aTheme')
        document.documentElement.classList.remove('zTheme', 'mTheme')
      } else {
        document.documentElement.classList.remove('aTheme')
      }
    },
    setMirageTheme(value: boolean) {
      this.mirageTheme = value
      if (value) {
        this.zarlashtTheme = false
        this.aeonTheme = false
        document.documentElement.classList.add('mTheme')
        document.documentElement.classList.remove('zTheme', 'aTheme')
      } else {
        document.documentElement.classList.remove('mTheme')
      }
    },
    clearThemes() {
      this.zarlashtTheme = false
      this.aeonTheme = false
      this.mirageTheme = false
      document.documentElement.classList.remove('zTheme', 'aTheme', 'mTheme')
    },
    syncFromHtml() {
      const html = document.documentElement
      this.zarlashtTheme = html.classList.contains('zTheme')
      this.aeonTheme = html.classList.contains('aTheme')
      this.mirageTheme = html.classList.contains('mTheme')
    },
    setDefaultColor(color: { h: number; s: number; l: number }) {
      this.defaultColor = color
      document.documentElement.style.setProperty('--primary-hue', color.h.toString())
      document.documentElement.style.setProperty('--primary-sat', color.s + '%')
      document.documentElement.style.setProperty('--primary-lit', color.l + '%')
    }
  },
});
