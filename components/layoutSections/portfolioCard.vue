<script setup lang="ts">
import { type Project, type Certificate } from "~/assets/scripts/db";

const props = defineProps<{
  project: Project | Certificate,
  images: string[],
  widthClass: string,
  heightClass: string,
  horizontal?: boolean,
}>();

const CarouselBG = ref(true)
const CarouselScroll = ref(true)

onMounted(() => {
  const html = document.getElementsByTagName('html')[0]
  const hasTheme = html.classList.contains('aTheme') || html.classList.contains('zTheme') || html.classList.contains('mTheme') || html.classList.contains('petalTheme')
  const isZTheme = html.classList.contains('zTheme')
  CarouselBG.value = hasTheme && !isZTheme
})

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
  <UCard class="ring-0" :class="widthClass"
    @mouseenter="CarouselScroll ? imagesCarousel?.emblaApi?.plugins().autoScroll.play() : null"
    @mouseleave="CarouselScroll ? imagesCarousel?.emblaApi?.plugins().autoScroll.stop() : null">

    <div :class="(horizontal ? 'flex justify-between ' : '') + heightClass">
      <div
        class=" w-full dark:border-gray-600 !border-default border rounded-2xl"
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
    </div>
    <div class=" flex items-start justify-between flex-col gap-4 mt-4">
      <USwitch v-model="CarouselBG" color="neutral" label="Carousel Backgrounds"
        size="sm" />
      <USwitch v-model="CarouselScroll" color="neutral" size="sm"
        description="(on hover)" label="Carousel Scrolling" />
    </div>
  </UCard>
</template>

<style lang="scss">
@use 'sass:math';

@keyframes fadeInBG {
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}

@for $num from 0 through 60 {
  $color1: rgba(math.random(100)+155, math.random(100)+155, math.random(100)+155, math.random(3)+2);
  $color2: rgba(math.random(100)+155, math.random(100)+155, math.random(100)+155, math.random(3)+2);
  $rotation: math.random(360);

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