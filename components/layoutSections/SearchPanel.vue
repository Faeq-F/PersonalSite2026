<script setup lang="ts">
import Fuse from 'fuse.js'
import { ref, watch, onMounted } from 'vue'
import { generateSearchPages } from '~/composables/useSearchPages'

const searchVal = defineModel<string>({ default: '' })

const searchPages = ref<Awaited<ReturnType<typeof generateSearchPages>>>([])
const searchedPages = ref<Awaited<ReturnType<typeof generateSearchPages>>>([])

let fuse: Fuse<{ title: string; description: string; icon: string; category: string; url: string }>

onMounted(async () => {
  searchPages.value = await generateSearchPages()
  searchedPages.value = searchPages.value

  fuse = new Fuse(searchPages.value, {
    keys: ['description', 'title', 'category'],
  })
})

watch(searchVal, (newSearch) => {
  if (newSearch === '') {
    searchedPages.value = searchPages.value
  } else {
    searchedPages.value = fuse.search(newSearch).map((result) => result.item)
  }
})
</script>

<template>
  <div id="searchPanel" class="min-h-96 max-h-96 w-96">
    <UInput icon="i-lucide-search" size="md" variant="none"
      placeholder="Search Pages..." class="w-full p-1" v-model="searchVal" />
    <USeparator class="w-full" />
    <ul class="overflow-y-scroll max-h-86 min-h-86 pt-2 mr-0.5"
      data-lenis-prevent>
      <TransitionGroup name="list">
        <li v-for="(page, i) in searchedPages" :key="i"
          class="w-full p-2 pt-0 pr-1">
          <nuxt-link :to="page.url">
            <UButton :icon="page.icon" size="md" color="neutral" variant="soft"
              class="w-full themeLink">
              <USeparator orientation="vertical"
                class="h-6 invert opacity-20 ml-1" />
              <div class="w-full">
                <div
                  class="w-full text-left pl-1.5 flex items-center justify-between">
                  <span>
                    {{ page.title }}
                  </span>
                  <UBadge size="sm" color="neutral" variant="outline"
                    class="text-[--primary-color] flex items-center opacity-80">
                    {{ page.category }}
                  </UBadge>
                </div>
                <div class="text-muted pl-1.5 w-full text-left">
                  {{ page.description }}
                </div>
              </div>
            </UButton>
          </nuxt-link>
        </li>
      </TransitionGroup>
    </ul>
  </div>
</template>