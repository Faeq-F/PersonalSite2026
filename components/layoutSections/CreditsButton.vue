<script setup lang="ts">
defineProps({
  url: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  border: { type: String, default: 'border-t border-r border-b border-accented' },
  rounded: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <nuxt-link v-if="!disabled" :to="url"
    :target="url.startsWith('http') ? '_blank' : undefined"
    class="w-1/4 rounded-none" :class="[border, rounded]">
    <UButton
      class="p-2.5 rounded-none hover:bg-[var(--ui-bg-elevated)] w-full h-full"
      :icon="icon" size="md" color="neutral" variant="ghost">
      {{ label }}
    </UButton>
  </nuxt-link>
  <div v-else class="w-1/4 rounded-none" :class="[border, rounded]">
    <UButton class="p-2.5 rounded-none w-full h-full opacity-50 cursor-default"
      :icon="icon" size="md" color="neutral" variant="ghost" disabled>
      {{ label }}
    </UButton>
  </div>
</template>