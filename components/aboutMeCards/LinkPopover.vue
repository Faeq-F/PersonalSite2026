<script setup lang="ts">
defineProps({
  url: { type: String, required: true },
  text: { type: String, required: true },
  target: { type: String, default: '_blank' },
  content: { type: String, default: '' },
  icon: { type: String, default: '' }
})
</script>

<template>
  <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
    <nuxt-link :to="url" :target="target" class="boxLink">
      <UIcon v-if="icon" :name="icon" />
      {{ text }}
    </nuxt-link>
    <template #content>
      <p class="p-1 text-sm">{{ content || `See ${text}` }}</p>
    </template>
  </UPopover>
</template>
