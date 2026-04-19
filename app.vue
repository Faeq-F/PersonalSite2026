<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'

const settings = useSettingsStore()

// Initialize theme on app mount
onMounted(() => {
  settings.initTheme()
})
</script>
<template>
  <UApp>
    <div id="wrapper">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>