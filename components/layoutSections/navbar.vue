<script setup lang="ts">
import { watch, ref } from 'vue'
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useMiddleNavbarItems } from '~/stores/navbar'
import { useSettingsStore } from '~/stores/settings'
import SearchPanel from './SearchPanel.vue'
import ThemeControls from './ThemeControls.vue'
import '~/assets/css/navbar.css'

const middleItems = useMiddleNavbarItems()
const settings = useSettingsStore()

const {
  isDark,
  toggleDarkMode,
  colorMode
} = useTheme()

function toggleTheme(theme: number) {
  if (theme == 1) {
    colorMode.value = 'light'
  } else if (theme == 0) {
    colorMode.value = 'dark'
  } else {
    colorMode.value = 'auto'
  }
}

// Use store state
const { petalTheme, zarlashtTheme, aeonTheme, mirageTheme, bgAnimation } = storeToRefs(settings)

// Turn off bg animation when petal or default theme is active
let previousWasPetalOrDefault = false
watch([petalTheme, zarlashtTheme, aeonTheme, mirageTheme], ([p, z, a, m]) => {
  const isPetal = p && !z && !a && !m
  const isDefault = !p && !z && !a && !m
  if (isPetal || isDefault) {
    bgAnimation.value = false
  } else if (previousWasPetalOrDefault) {
    // Switched FROM petal/default TO another theme - auto-enable
    bgAnimation.value = true
  }
  previousWasPetalOrDefault = isPetal || isDefault
}, { immediate: true })

const modeItems = ref<NavigationMenuItem[][]>([
  [
    {
      icon: 'i-lucide-sun-moon',
      label: '',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          onSelect: () => toggleTheme(1),
          class: 'themeLink themeLinkVariant'
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          onSelect: () => toggleTheme(0),
          class: 'themeLink themeLinkVariant'
        },
        {
          label: 'System',
          icon: 'i-lucide-laptop-minimal',
          onSelect: () => toggleTheme(-1),
          class: 'themeLink themeLinkVariant'
        },
      ]
    }
  ]
])

const settingsItems = ref<NavigationMenuItem[][]>([
  [
    {
      icon: 'i-lucide-cog',
      label: '',
      slot: 'settings' as const,
    }
  ]
])

watch(bgAnimation, (newValue) => {
  let videoBGelem = document.getElementById("video-bg-elem") as HTMLVideoElement;
  if (!videoBGelem) return
  if (newValue) {
    document.getElementsByTagName('html')[0].classList.remove('noAnim')
    document.getElementById('fogWrap')!.classList.remove('hidden')
    videoBGelem.play();
  } else {
    document.getElementsByTagName('html')[0].classList.add('noAnim')
    document.getElementById('fogWrap')!.classList.add('hidden')
    videoBGelem.pause();
  }
}, { immediate: false })

const searchVal = ref('')
</script>

<template>
  <MazAnimatedElement direction="up" :duration="700" id="navbar">
    <div
      class="max-h-12 rounded-3xl flex items-center gap-3 border-default border border-accent sticky top-0 navbar"
      style="width: calc(100% - 3rem); margin: 0 auto;">
      <MazAnimatedElement direction="right" :delay='300' :duration="700"
        class="flex items-center">
        <div
          class="flex items-center cardShadow rounded-full px-3 ml-1.5 h-8 transition-all ease-in-out duration-200 homeNavSection">
          <nuxt-link to="/home" class="contents">
            <UIcon name="i-lucide-home"
              class="!size-4.5 hover:text-black dark:hover:text-white text-muted mx-2 my-1.5" />
          </nuxt-link>
          <USeparator orientation="vertical"
            class="h-4 mx-2.5 invert opacity-20" />
          <UPopover :ui="{ content: '-translate-y-6 ml-6' }">
            <UIcon name="i-lucide-search"
              class="!size-4.5 h-full clickable hover:text-black dark:hover:text-white text-muted mx-2.5 my-1.5" />
            <template #content>
              <SearchPanel v-model="searchVal" />
            </template>
          </UPopover>
        </div>
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :delay="700" :duration="700"
        class="w-full justify-center flex">
        <UNavigationMenu highlight highlight-color="neutral" color="neutral"
          orientation="horizontal" :items="middleItems.items" variant="link"
          class="middleItems" :ui="{
            viewport: '!px-70 mt-[1px] -translate-y-15/12 min-h-68 max-h-68',
            childLink: 'rounded-lg',
            childLinkDescription: 'text-balance line-clamp-2',
            linkTrailingIcon: 'rotate-180 group-data-[state=open]:rotate-0'
          }" />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :delay="900" :duration="700"
        class="relative flex w-auto justify-end ">
        <div
          class="relative flex w-auto justify-end rounded-full h-8 transition-all ease-in-out duration-200 themeNavSection mr-1.5 cardShadow">
          <!-- Mode Switch (Light/Dark/System) -->
          <UNavigationMenu content-orientation="vertical" color="neutral"
            :items="modeItems" variant="link" trailing-icon=" " :ui="{
              viewport: '-translate-y-50 -translate-x-4 min-h-36 max-h-36 pr-28 navView',
              content: 'w-auto ml-0.5 max-h-full min-h-full overflow-hidden',
              childList: 'h-[15vh] overflow-hidden',
              childLabel: 'w-full',
              childLinkIcon: 'mt-0.5',
              childLinkDescription: 'line-clamp-1',
              childLink: '-mt-0.25 rounded-lg',
            }"
            class="relative flex w-auto justify-end  rounded-full !rounded-r-none px-3 h-8 transition-all ease-in-out duration-200  !border-0">
            <template #item="{ item }">
              <UIcon :name="item.icon!" class="!size-4.5" />
            </template>
          </UNavigationMenu>
          <!-- Settings -->
          <UNavigationMenu content-orientation="vertical" color="neutral"
            :items="settingsItems" variant="link" trailing-icon=" " :ui="{
              viewport: '-translate-y-58 -translate-x-8 min-h-44 max-h-44 pr-64 navView',
              content: 'w-auto ml-0.5 max-h-full min-h-full overflow-hidden',
              childList: 'h-[15vh] overflow-hidden',
              childLabel: 'w-full',
              childLinkIcon: 'mt-0.5',
              childLinkDescription: 'line-clamp-1',
              childLink: '-mt-0.25 rounded-lg',
            }"
            class="relative flex w-auto justify-end  rounded-full !rounded-l-none px-3 h-8 transition-all ease-in-out duration-200  !border-0">
            <template #item="{ item }">
              <UIcon :name="item.icon!" class="!size-4.5 " />
            </template>
            <template #settings="{ item }: { item: NavigationMenuItem }">
              <USeparator orientation="vertical"
                class="h-4 mx-4 -ml-6 invert opacity-20" />
              <UIcon :name="item.icon!" class="!size-4.5"
                :class="bgAnimation ? 'animate-[spin_3s_linear_infinite]' : ''" />
            </template>
            <template #settings-content>
              <ThemeControls />
            </template>
          </UNavigationMenu>
        </div>
      </MazAnimatedElement>
    </div>
  </MazAnimatedElement>
</template>