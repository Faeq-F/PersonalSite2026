<script setup lang="ts">
import { db, type Certificate, type Skill } from "~/assets/scripts/db";
import { liveQuery } from 'dexie';
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";
import { MdPreview, type Themes, config } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import LinkAttr from 'markdown-it-link-attributes';
import { useTheme } from '@maz-ui/themes'
import ProjectDetails from "~/components/portfolio/projectDetails.vue";

config({
  markdownItPlugins(_plugins, _opts) {
    return [
      {
        type: 'linkAttr',
        plugin: LinkAttr,
        options: {
          matcher(href: string) {
            return !href.startsWith('#');
          },
          attrs: {
            target: '_blank'
          }
        }
      },
    ]
  }
})

const route = useRoute()
const cert = useObservable<Certificate | undefined>(from(liveQuery(async () => await db.certificates.get((route.params.name + '').replaceAll('~', ' ')))));

import { useSettingsStore } from '~/stores/settings'
const settings = useSettingsStore()

const date = computed(() => {
  if (!cert.value || !(cert.value.awarded instanceof Date)) return '';
  const month = settings.months[cert.value.awarded.getMonth()]?.substring(0, 3) ?? '';
  return `${month} ${cert.value.awarded.getFullYear()}`;
});

import { VueLenis } from 'lenis/vue'
const LenisWrapper = ref();
const LenisContent = ref();

const { colorMode } = useTheme()
const theme = ref(colorMode.value)
watch(colorMode, async (newTheme, _oldTheme) => theme.value = newTheme.toString())

const readme = ref('')
const loading = ref(true)

const device = useDevice()
const open = ref(false)
const label = computed(() => (open.value ? 'Close' : 'Open') + ' details')
</script>

<template>
  <div class="p-4 md:p-8 h-full w-full overflow-y-auto md:overflow-hidden">
    <div class="flex flex-col md:flex-row h-full w-full">
      <UCard :ui="{ footer: 'flex flex-col justify-around md:h-[70%]' }"
        class="m-2 md:m-4 h-auto md:h-full w-auto md:w-96 opacity-80 cardShadow border border-[var(--ui-border)] flex-shrink-0">
        <template #header>
          <div class="font-bold" style="line-height: 1;">
            <MazAnimatedElement direction="up" :duration="700" :delay="500">
              <p class="text-[2rem] md:text-[3rem] break-all varela">{{
                cert?.name }}</p>
            </MazAnimatedElement>
            <MazAnimatedElement direction="up" :duration="700" :delay="600">
              <p class="text-[0.875rem] md:text-[1rem]">{{ date }}</p>
            </MazAnimatedElement>
          </div>
        </template>
        <div class="min-w-0 text-sm md:text-base">
          {{ cert?.description }}
        </div>
        <template #footer>
          <!-- Collapsible on mobile, always open on desktop -->
          <UCollapsible v-if="device.isMobile" v-model:open="open">
            <UButton :label="label" variant="soft" class="group" :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }" trailing-icon="i-lucide-chevron-down" block />
            <template #content>
              <div class="min-h-auto mt-4">
                <ProjectDetails />
              </div>
            </template>
          </UCollapsible>
          <!-- Desktop -->
          <div class="min-h-[60vh]" v-if="!device.isMobile">
            <ProjectDetails />
          </div>
        </template>
      </UCard>
      <div id="contentPanelsContent" ref="LenisWrapper"
        class="flex flex-col h-full w-full md:mr-8 mt-2 md:mt-4 overflow-y-scroll overflow-x-hidden ScrollBlur">
        <VueLenis root :options="{
          autoRaf: true,
          lerp: 0.1,
          anchors: true,
          content: LenisContent,
          wrapper: LenisWrapper,
        }" />
        <div id="lenis-content" class="" ref="LenisContent">
          <div class="w-full flex flex-row" data-lenis-prevent>
            <div class="w-full pt-4 px-4">
              <UCard class="opacity-80 cardShadow border border-[var(--ui-border)] m-2 md:m-4">
                <template #header>
                  <div class="flex items-center text-sm">
                    <UIcon name="i-lucide-images" class="mr-1.5 !size-4" />
                    <span>Gallery</span>
                  </div>
                </template>
                <MazGallery :images="cert?.images" :height="256" />
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add something to load a specific component for when cert has extra
     details-->
  </div>
</template>