<script setup lang="ts">
import Fuse from 'fuse.js'
import { computed, watch, onMounted, ref, nextTick } from 'vue'
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useMiddleNavbarItems } from '~/stores/navbar'
import { useSettingsStore } from '~/stores/settings'
const middleItems = useMiddleNavbarItems()
const settings = useSettingsStore()

const emit = defineEmits(['aeon'])

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
const { zarlashtTheme, aeonTheme, mirageTheme, bgAnimation, defaultColor } = storeToRefs(settings)
const disabledBgAnim = computed(() => !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value)

function resetColor() {
  settings.setDefaultColor({ h: 10, s: 39, l: 46 })
}

const isDefaultTheme = computed(() => !zarlashtTheme.value && !aeonTheme.value && !mirageTheme.value)

// Turn off bg animation when default theme is active, enable when switching FROM default
let previousWasDefault = true
watch(isDefaultTheme, (isDefault) => {
  if (isDefault) {
    bgAnimation.value = false
  } else if (previousWasDefault) {
    // Switched FROM default TO a theme - auto-enable
    bgAnimation.value = true
  }
  previousWasDefault = isDefault
})

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
          class: 'zLink zLinkTheme'
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          onSelect: () => toggleTheme(0),
          class: 'zLink zLinkTheme'
        },
        {
          label: 'System',
          icon: 'i-lucide-laptop-minimal',
          onSelect: () => toggleTheme(-1),
          class: 'zLink zLinkTheme'
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

//temp
const pages = [
  {
    title: 'About Me',
    description: 'A brief introduction about myself',
    icon: 'i-lucide-user',
    category: 'About Me',
    url: '/about'
  },
  {
    title: 'Experience',
    description: 'My professional journey and experiences',
    icon: 'i-lucide-briefcase',
    category: 'About Me',
    url: '/experience'
  },
  {
    title: 'Projects',
    description: 'Showcasing my projects and contributions',
    icon: 'i-lucide-folder',
    category: 'About Me',
    url: '/about'
  },
  {
    title: 'Skills',
    description: 'My technical skills and proficiencies',
    icon: 'i-lucide-code',
    category: 'About Me',
    url: '/about'
  },
  {
    title: 'Contact',
    description: 'How to get in touch with me',
    icon: 'i-lucide-mail',
    category: 'About Me',
    url: '/about'
  },
  {
    title: 'Degree',
    description: 'My academic qualifications',
    icon: 'i-lucide-mail',
    category: 'About Me',
    url: '/about'
  }
]

const searchVal = ref('')
const searchedPages = ref(pages)
const fuse = new Fuse(pages, {
  keys: ['description', 'title', 'category'],
});

watch(searchVal, (newSearch, _oldSearch) => {
  if (newSearch === '') {
    searchedPages.value = pages;
  } else {
    searchedPages.value = fuse.search(newSearch).map((result) => result.item);
  }
})

// Watch for color changes to update CSS variables
watch(defaultColor, (newColor) => {
  document.documentElement.style.setProperty('--primary-hue', newColor.h.toString())
  document.documentElement.style.setProperty('--primary-sat', newColor.s + '%')
  document.documentElement.style.setProperty('--primary-lit', newColor.l + '%')
}, { deep: true })

// Initialize CSS variables on mount
onMounted(() => {
  document.documentElement.style.setProperty('--primary-hue', defaultColor.value.h.toString())
  document.documentElement.style.setProperty('--primary-sat', defaultColor.value.s + '%')
  document.documentElement.style.setProperty('--primary-lit', defaultColor.value.l + '%')
})
</script>

<template>
  <MazAnimatedElement direction="up" :duration="700" id="navbar">
    <div
      class="max-h-12 rounded-3xl flex items-center gap-3 border-default border border-accent sticky top-0 bg-white dark:bg-[var(--ui-bg)] navbar"
      style="width: calc(100% - 3rem); margin: 0 auto;">
      <MazAnimatedElement direction="right" :delay='300' :duration="700"
        class="flex items-center">
        <div
          class="flex items-center bg-[#f6f7fa] dark:bg-[#0e0d0d] rounded-full px-3 ml-1.5 h-8 transition-all ease-in-out duration-200 homeNavSection">
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
              <div class="min-h-96 max-h-96 w-96" id="searchPanel">
                <UInput icon="i-lucide-search" size="md" variant="none"
                  placeholder="Search Pages..." class="w-full p-1"
                  v-model="searchVal" />
                <USeparator class="w-full " />
                <ul class="overflow-y-scroll max-h-86 min-h-86 pt-2 mr-0.5"
                  data-lenis-prevent>
                  <TransitionGroup name="list">
                    <li v-for="(page, i) in searchedPages" :key="i"
                      class="w-full p-2 pt-0 pr-1">
                      <nuxt-link :to="page.url">
                        <UButton :icon="page.icon" size="md" color="neutral"
                          variant="soft" class="w-full zLink ">
                          <USeparator orientation="vertical"
                            class="h-6 invert opacity-20 ml-1" />
                          <div class="w-full">
                            <div
                              class="w-full text-left pl-1.5 flex items-center justify-between ">
                              <span>
                                {{ page.title }}
                              </span>
                              <UBadge size="sm" color="neutral"
                                variant="outline"
                                class="text-muted flex items-center opacity-80">
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
          </UPopover>
        </div>
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :delay="700" :duration="700"
        class="w-full justify-center flex">
        <UNavigationMenu highlight highlight-color="neutral" color="neutral"
          orientation="horizontal" :items="middleItems.items" variant="link"
          class="middleItems" :ui="{
            viewport: '!px-70 mt-[1px] -translate-y-15/12 min-h-68 max-h-68',
            childLink: 'bg-white hover:bg-gray-100 dark:bg-[var(--ui-bg)] dark:hover:bg-gray-800 rounded-lg',
            childLinkDescription: 'text-balance line-clamp-2',
            linkTrailingIcon: 'rotate-180 group-data-[state=open]:rotate-0'
          }" />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :delay="900" :duration="700"
        class="relative flex w-auto justify-end ">
        <div
          class="relative flex w-auto justify-end bg-[#f6f7fa] dark:bg-[#0e0d0d] rounded-full h-8 transition-all ease-in-out duration-200 themeNavSection mr-1.5">
          <!-- Mode Switch (Light/Dark/System) -->
          <UNavigationMenu content-orientation="vertical" color="neutral"
            :items="modeItems" variant="link" trailing-icon=" " :ui="{
              viewport: '-translate-y-50 -translate-x-4 min-h-36 max-h-36 pr-28 navView',
              content: 'w-auto ml-0.5 max-h-full min-h-full overflow-hidden',
              childList: 'h-[15vh] overflow-hidden',
              childLabel: 'w-full',
              childLinkIcon: 'mt-0.5',
              childLinkDescription: 'line-clamp-1',
              childLink: '-mt-0.25 bg-white hover:bg-gray-100 dark:bg-[var(--ui-bg)] dark:hover:bg-gray-800 rounded-lg',
            }"
            class="relative flex w-auto justify-end bg-transparent dark:bg-[#0e0d0d] rounded-full rounded-r-none px-3 h-8 transition-all ease-in-out duration-200  !shadow-none">
            <template #item="{ item }">
              <UIcon :name="item.icon!" class="!size-4.5" />
            </template>
          </UNavigationMenu>
          <!-- Settings -->
          <UNavigationMenu content-orientation="vertical" color="neutral"
            :items="settingsItems" variant="link" trailing-icon=" " :ui="{
              viewport: '-translate-y-50 -translate-x-4 min-h-36 max-h-36 pr-64 navView',
              content: 'w-auto ml-0.5 max-h-full min-h-full overflow-hidden',
              childList: 'h-[15vh] overflow-hidden',
              childLabel: 'w-full',
              childLinkIcon: 'mt-0.5',
              childLinkDescription: 'line-clamp-1',
              childLink: '-mt-0.25 bg-white hover:bg-gray-100 dark:bg-[var(--ui-bg)] dark:hover:bg-gray-800 rounded-lg',
            }"
            class="relative flex w-auto justify-end bg-transparent dark:bg-[#0e0d0d] rounded-full rounded-l-none px-3 h-8 transition-all ease-in-out duration-200 !shadow-none">
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
              <div class="pl-2 flex !h-full mt-2 gap-0.5" id="themeControls">
                <div class="flex flex-col gap-0.5 mx-1">
                  <!-- Vertical HSL Sliders -->
                  <div
                    class="flex flex-row items-center justify-center gap-3 w-full transition-opacity duration-300"
                    :class="{ 'opacity-50': !isDefaultTheme }">
                    <!-- Hue -->
                    <div class="flex flex-col items-center gap-1">
                      <USlider v-model="defaultColor.h" :min="0" :max="360"
                        :step="1" orientation="vertical" color="neutral"
                        :disabled="!isDefaultTheme" class="h-20" size="xs" />
                      <UIcon name="i-lucide-palette" class="text-sm" />
                    </div>
                    <!-- Saturation -->
                    <div class="flex flex-col items-center gap-1">
                      <USlider v-model="defaultColor.s" :min="0" :max="100"
                        :step="1" orientation="vertical" color="neutral"
                        :disabled="!isDefaultTheme" class="h-20" size="xs" />
                      <UIcon name="i-lucide-droplet" class="text-sm" />
                    </div>
                    <!-- Lightness -->
                    <div class="flex flex-col items-center gap-1">
                      <USlider v-model="defaultColor.l" :min="0" :max="100"
                        :step="1" orientation="vertical" color="neutral"
                        :disabled="!isDefaultTheme" class="h-20" size="xs" />
                      <UIcon name="i-lucide-sun" class="text-sm" />
                    </div>
                  </div>
                  <!-- Reset Button -->
                  <UButton variant="soft" size="xs" color="neutral"
                    @click="resetColor" trailing-icon="i-lucide-rotate-ccw"
                    class="w-full my-1 transition-opacity duration-300"
                    :disabled="defaultColor.h === 10 && defaultColor.s === 39 && defaultColor.l === 46 || !isDefaultTheme"
                    :class="{ 'opacity-50': !isDefaultTheme }">
                    <p class="w-full text-center pr-0.5">Reset Color</p>
                  </UButton>
                </div>
                <USeparator orientation="vertical"
                  class="self-center h-[7rem] mx-3" />
                <!-- Theme Switches -->
                <div class="flex flex-col items-start gap-0.5">
                  <USwitch v-model="bgAnimation" color="neutral" size="xs"
                    description="Background" label="Animating"
                    :disabled="disabledBgAnim" />
                  <USwitch :model-value="aeonTheme"
                    @update:model-value="settings.setAeonTheme" color="neutral"
                    size="xs" description="theme" label="Aeon" />
                  <USwitch :model-value="mirageTheme"
                    @update:model-value="settings.setMirageTheme"
                    color="neutral" size="xs" description="theme"
                    label="Mirage" />
                  <USwitch :model-value="zarlashtTheme"
                    @update:model-value="settings.setZarlashtTheme"
                    color="neutral" size="xs" description="theme"
                    label="Zarlasht" />
                </div>
              </div>
            </template>
          </UNavigationMenu>
        </div>
      </MazAnimatedElement>
    </div>
  </MazAnimatedElement>
</template>

<style>
.zTheme #navbar {
  backdrop-filter: blur(6px) !important;
}

.zTheme .zLink,
.zTheme #navbar .navbar {
  border: 1px solid color-mix(in oklab, #000 15%, transparent);
  background-color: color-mix(in oklab, #000 10%, transparent);
  box-shadow: 0px 10px 10px -8px rgba(237, 237, 232, 0.02),
    0px 2px 2px -1.5px rgba(237, 237, 232, 0.02),
    0px 1px 1px -0.5px rgba(237, 237, 232, 0.02) !important;
}

.dark.zTheme .zLink,
.dark.zTheme #navbar .navbar {
  box-shadow: 0px 10px 10px -8px rgba(18, 18, 23, 0.02),
    0px 2px 2px -1.5px rgba(18, 18, 23, 0.02),
    0px 1px 1px -0.5px rgba(18, 18, 23, 0.02) !important;
  border: 1px solid color-mix(in oklab, #fff 15%, transparent) !important;
  background-color: color-mix(in oklab, #fff 15%, transparent) !important;
}

html.zTheme .zLink {
  margin-top: 0;
  border-radius: calc(var(--ui-radius) * 2) !important;
}

html:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .homeNavSection,
html:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .themeNavSection,
html:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .middleItems ul li a,
.zTheme #navbar .navbar .middleItems ul li a {
  background-color: #f6f7fa;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

html.dark:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .homeNavSection,
html.dark:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .themeNavSection,
html.dark:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .middleItems ul li a,
.dark.zTheme #navbar .navbar .middleItems ul li a {
  background-color: #0e0d0d;
  box-shadow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1),
    0 0 0 1px hsla(230, 13%, 9%, 0.075),
    0 0.3px 0.4px hsla(230, 13%, 9%, 0.02),
    0 0.9px 1.5px hsla(230, 13%, 9%, 0.045),
    0 3.5px 6px hsla(230, 13%, 9%, 0.09);
}

html:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .middleItems ul li a[href="/PersonalSite2026/about"],
html.zTheme #navbar .navbar .middleItems ul li a[href="/PersonalSite2026/about"] {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

html:not(.aTheme, .zTheme, .mTheme) #navbar .navbar .middleItems ul li a[href="/PersonalSite2026/cv"],
html.zTheme #navbar .navbar .middleItems ul li a[href="/PersonalSite2026/cv"] {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

html:not(.aTheme, .zTheme) #navbar .navbar .middleItems ul li a:not(.zLink) span {
  font-style: italic;
}

html:not(.aTheme, .zTheme) #themeControls label,
html:not(.aTheme, .zTheme) #themeControls p {
  font-size: 0.7rem !important;
}

html:not(.aTheme, .zTheme) div[role="dialog"]:has(#searchPanel) .zLink {
  background-color: #f6f7fa;
}

html:not(.aTheme, .zTheme) button.zLink.zLinkTheme {
  background-color: #fafafa;
  margin-left: -0.25rem !important;
  width: 6.25rem;
}

html.dark:not(.aTheme, .zTheme) div[role="dialog"]:has(#searchPanel) .zLink,
html.dark:not(.aTheme, .zTheme) button.zLink.zLinkTheme {
  background-color: #0e0d0d;
}
</style>