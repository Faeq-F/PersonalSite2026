<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()
const {
  petalTheme,
  zarlashtTheme,
  aeonTheme,
  mirageTheme,
  bgAnimation,
  defaultColor
} = storeToRefs(settings)

// Petal theme has custom colors, other themes have bg animation (except default)
const showColorSliders = computed(() => petalTheme.value && !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value)
const isDefaultTheme = computed(() => !petalTheme.value && !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value)
const canAnimateBg = computed(() => !petalTheme.value && !isDefaultTheme.value)

// Watch for color changes and update CSS variables directly
watch(defaultColor, (newColor) => {
  document.documentElement.style.setProperty('--primary-hue', newColor.h.toString())
  document.documentElement.style.setProperty('--primary-sat', newColor.s + '%')
  document.documentElement.style.setProperty('--primary-lit', newColor.l + '%')
}, { deep: true })

function resetColor() {
  settings.setDefaultColor({ h: 10, s: 39, l: 46 })
}
</script>

<template>
  <div class="pl-2 flex !h-full mt-2 gap-0.5" id="themeControls">
    <div class="flex flex-col gap-0.5 mx-1">
      <!-- Vertical HSL Sliders - only for petal theme -->
      <div
        class="flex flex-row items-center justify-center gap-3 w-full transition-opacity duration-300"
        :class="{ 'opacity-50': !showColorSliders }">
        <!-- Hue -->
        <div class="flex flex-col items-center gap-1">
          <USlider v-model="defaultColor.h" :min="0" :max="360" :step="1"
            orientation="vertical" color="neutral" :disabled="!showColorSliders"
            class="h-28" size="xs" />
          <UIcon name="i-lucide-palette" class="text-sm" />
        </div>
        <!-- Saturation -->
        <div class="flex flex-col items-center gap-1">
          <USlider v-model="defaultColor.s" :min="0" :max="100" :step="1"
            orientation="vertical" color="neutral" :disabled="!showColorSliders"
            class="h-28" size="xs" />
          <UIcon name="i-lucide-droplet" class="text-sm" />
        </div>
        <!-- Lightness -->
        <div class="flex flex-col items-center gap-1">
          <USlider v-model="defaultColor.l" :min="0" :max="100" :step="1"
            orientation="vertical" color="neutral" :disabled="!showColorSliders"
            class="h-28" size="xs" />
          <UIcon name="i-lucide-sun" class="text-sm" />
        </div>
      </div>
      <!-- Reset Button -->
      <UButton variant="soft" size="xs" color="neutral" @click="resetColor"
        trailing-icon="i-lucide-rotate-ccw"
        class="w-full my-1 transition-opacity duration-300"
        :disabled="defaultColor.h === 10 && defaultColor.s === 39 && defaultColor.l === 46 || !showColorSliders"
        :class="{ 'opacity-50': !showColorSliders }">
        <p class="w-full text-center pr-0.5">Reset Color</p>
      </UButton>
    </div>
    <USeparator orientation="vertical" class="self-center h-[7rem] mx-3" />
    <!-- Theme Switches -->
    <div class="flex flex-col items-start gap-0.5">
      <USwitch v-model="bgAnimation" color="neutral" size="xs"
        description="Background" label="Animating" :disabled="!canAnimateBg" />
      <USwitch :model-value="petalTheme"
        @update:model-value="settings.setPetalTheme" color="neutral" size="xs"
        description="theme" label="Petal" />
      <USwitch :model-value="aeonTheme"
        @update:model-value="settings.setAeonTheme" color="neutral" size="xs"
        description="theme" label="Aeon" />
      <USwitch :model-value="mirageTheme"
        @update:model-value="settings.setMirageTheme" color="neutral" size="xs"
        description="theme" label="Mirage" />
      <USwitch :model-value="zarlashtTheme"
        @update:model-value="settings.setZarlashtTheme" color="neutral"
        size="xs" description="theme" label="Zarlasht" />
    </div>
  </div>
</template>