<script setup lang="ts">
import { type Project, type Certificate } from "~/assets/scripts/db";
import { inject } from 'vue'

const props = defineProps<{
  project: Project | Certificate,
  images: string[],
  widthClass: string,
  heightClass: string,
  horizontal?: boolean,
}>();

const CarouselBG = inject('CarouselBG')
const CarouselScroll = inject('CarouselScroll')

import { useSettingsStore } from '~/stores/settings'
const settings = useSettingsStore()

const projectStart = computed(() => {
  if (!props.project || 'awarded' in props.project) return '';
  if (!(props.project.startDate instanceof Date)) return '';
  const month = settings.months[props.project.startDate.getMonth()]?.substring(0, 3) ?? '';
  return `${month} ${props.project.startDate.getFullYear()}`;
});

const projectEnd = computed(() => {
  if (!props.project || 'awarded' in props.project) return '';
  if (!(props.project.endDate instanceof Date) || !(props.project.startDate instanceof Date)) return '';
  return props.project.endDate < props.project.startDate
    ? 'Present'
    : `${settings.months[props.project.endDate.getMonth()]?.substring(0, 3) ?? ''} ${props.project.endDate.getFullYear()}`;
});

const date = computed(() => {
  if (props.project && 'awarded' in props.project) return `${settings.months[props.project.awarded.getMonth()]?.substring(0, 3) ?? ''} ${props.project.awarded.getFullYear()}`;
  return projectStart.value + ' - ' + projectEnd.value
});

const imagesCarousel = useTemplateRef('imagesCarousel');
var bg = Math.floor(Math.random() * 60);
</script>
<template>
  <nuxt-link
    :to="(date.includes('-') ? '/project/' : '/certificate/') + project?.name.replaceAll(' ', '~')">
    <UCard
      class="opacity-80 cardShadow border border-[var(--ui-border)] m-4 hover:scale-105"
      :class="widthClass"
      @mouseenter="CarouselScroll ? imagesCarousel?.emblaApi?.plugins().autoScroll.play() : null"
      @mouseleave="CarouselScroll ? imagesCarousel?.emblaApi?.plugins().autoScroll.stop() : null">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-bold varela underline decoration-1 text-2xl">
            {{ project?.name }}
          </span>
          <span class="text-xs ">
            {{ date }}
          </span>
        </div>
      </template>

      <div :class="(horizontal ? 'flex justify-between ' : '') + heightClass">
        <div
          class=" w-full dark:border-gray-600 !border-default border rounded-2xl "
          :class="horizontal ? 'h-full' : 'h-[70%]'">
          <div class="relative h-full rounded-2xl"
            :class="CarouselBG ? `carouselContainerBG-${bg}` : `noCarouselContainerBG-${bg}`">
          </div>
          <UCarousel v-slot="{ item }" loop :auto-scroll="{ playOnInit: false }"
            :items="images"
            class=" h-full max-h-full w-full p-1 relative translate-y-[-100%]"
            ref="imagesCarousel" :ui="{
              container: 'max-h-full h-full w-full rounded-2xl',
              viewport: 'max-h-full h-full w-full rounded-2xl',
              item: 'h-full basis-auto ps-1'
            }">
            <img :src="item" class="rounded-2xl h-full ">
          </UCarousel>
        </div>
        <div
          :class="horizontal ? 'flex min-w-50 max-w-50' : 'w-full max-h-13 mt-2'">
          <USeparator :orientation="horizontal ? 'vertical' : 'horizontal'"
            class="h-full mx-3"
            :ui="{ border: 'dark:border-gray-600 h-full' }" />
          <div class="w-full" :class="horizontal ? '' : 'mt-2'">
            <span
              class="font-bold varela text-sm text-center w-full block pr-2.5">Skills</span>
            <ul
              :class="horizontal ? 'skillsScrollBlur overflow-y-scroll h-full' : 'overflow-x-scroll h-13 pt-2 flex overflow-y-hidden justify-center'"
              data-lenis-prevent>
              <li v-for="(skill, i) in project?.skills || []" :key="i"
                class=" text-center"
                :class="horizontal ? 'mb-2' : 'inline mr-2'">
                <UPopover mode="hover">
                  <nuxt-link :to="'/skill/' + skill"
                    class="boxLink !no-underline">
                    {{ skill }}
                  </nuxt-link>
                  <template #content>
                    <p class="p-1 text-sm">See this skill</p>
                  </template>
                </UPopover>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <template #footer>
        <div>
          {{ project?.description }}
        </div>
      </template>
    </UCard>
  </nuxt-link>
</template>

<style lang="scss">
@keyframes fadeInBG {
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}

@for $num from 0 through 60 {
  $color1: rgba(random(100)+155, random(100)+155, random(100)+155, random(3)+2);
  $color2: rgba(random(100)+155, random(100)+155, random(100)+155, random(3)+2);
  $rotation: random(360);

  .carouselContainerBG-#{$num} {
    background-image: linear-gradient(#{$rotation}deg, $color1, $color2);
    animation: fadeInBG 0.7s;
  }

  .noCarouselContainerBG-#{$num} {
    background-color: #00000000;
    animation: fadeOutBG-#{$num} 0.7s;
  }

  @keyframes fadeOutBG-#{$num} {
    0% {
      opacity: 1;
      background-image: linear-gradient(#{$rotation}deg, $color1, $color2);
    }

    100% {
      opacity: 0;
      background-image: none;
    }
  }
}
</style>