<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  defaultColor: { h: number; s: number; l: number }
  selectedTheme: string
  bgAnimation: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:defaultColor': [value: { h: number; s: number; l: number }]
  'update:bgAnimation': [value: boolean]
}>()

// Local refs for v-model binding
const localColor = ref({ ...props.defaultColor })

// Sync with props when they change
watch(() => props.defaultColor, (newVal) => {
  localColor.value = { ...newVal }
}, { deep: true })

// Emit updates when local values change
watch(localColor, (newVal) => {
  emit('update:defaultColor', { ...newVal })
  // Also update CSS variables directly
  document.documentElement.style.setProperty('--primary-hue', newVal.h.toString())
  document.documentElement.style.setProperty('--primary-sat', newVal.s + '%')
  document.documentElement.style.setProperty('--primary-lit', newVal.l + '%')
}, { deep: true })

function resetColor() {
  localColor.value = { h: 10, s: 39, l: 46 }
  emit('update:defaultColor', { h: 10, s: 39, l: 46 })
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="selectedTheme === 'petal'" key="sliders" class="mt-2 space-y-2">
      <!-- Hue -->
      <div class="flex items-center justify-between p-2 rounded-lg bg-elevated">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-palette" class="text-lg" />
          <span class="text-sm font-medium">Hue</span>
        </div>
        <USlider v-model="localColor.h" :min="0" :max="360" :step="1"
          class="w-24" size="sm" color="neutral" />
      </div>
      <!-- Saturation -->
      <div class="flex items-center justify-between p-2 rounded-lg bg-elevated">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-droplets" class="text-lg" />
          <span class="text-sm font-medium">Saturation</span>
        </div>
        <USlider v-model="localColor.s" :min="0" :max="100" :step="1"
          class="w-24" size="sm" color="neutral" />
      </div>
      <!-- Lightness -->
      <div class="flex items-center justify-between p-2 rounded-lg bg-elevated">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-sun" class="text-lg" />
          <span class="text-sm font-medium">Lightness</span>
        </div>
        <USlider v-model="localColor.l" :min="0" :max="100" :step="1"
          class="w-24" size="sm" color="neutral" />
      </div>
      <!-- Reset Button -->
      <UButton variant="soft" size="xs" color="neutral" @click="resetColor"
        trailing-icon="i-lucide-rotate-ccw" class="w-full"
        :disabled="localColor.h === 10 && localColor.s === 39 && localColor.l === 46"
        :class="{ 'opacity-50': localColor.h === 10 && localColor.s === 39 && localColor.l === 46 }">
        <p class="w-full text-center">Reset Color</p>
      </UButton>
    </div>
    <div v-else-if="selectedTheme !== 'default'" key="bgAnim"
      class="mt-2 flex items-center bg-elevated justify-between p-3 rounded-lg">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-play-circle" class="text-lg" />
        <span class="text-sm font-medium">Background Animation</span>
      </div>
      <USwitch :modelValue="bgAnimation"
        @update:modelValue="emit('update:bgAnimation', $event)" color="neutral"
        size="sm" />
    </div>
  </Transition>
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