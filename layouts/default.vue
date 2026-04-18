<script setup>
import navbar from '~/components/layoutSections/navbar.vue'
import Credits from '~/components/layoutSections/credits.vue'
import { useSettingsStore } from '~/stores/settings'
import { watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const settings = useSettingsStore()

const { aeonTheme, bgAnimation } = storeToRefs(settings)

// Sync video playback with bgAnimation state
watch(bgAnimation, (newValue) => {
  const video = document.getElementById("video-bg-elem")
  if (!video) return
  if (newValue) {
    video.play()
  } else {
    video.pause()
  }
})

// Sync video when theme changes (element swaps)
watch(aeonTheme, async () => {
  await nextTick()
  const video = document.getElementById("video-bg-elem")
  if (!video) return
  if (bgAnimation.value) {
    video.play()
  } else {
    video.pause()
  }
})

onMounted(async () => {
  const video = document.getElementById("video-bg-elem")
  if (bgAnimation.value) {
    video?.play()
  }
})

</script>

<template>
  <div class="h-full w-full rounded-3xl" id="bodyPanel">

    <div id="vidBG" class="border-default rounded-none border border-accent">
      <video loop disablePictureInPicture muted id="video-bg-elem"
        class="h-full w-full" v-if="aeonTheme">
        <source src="/media/bg.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video loop disablePictureInPicture muted id="video-bg-elem"
        class="h-full w-full" v-else>
        <source src="/media/bgTheme.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="fogWrap" id="fogWrap">
      <img src="/media/cloud.png" v-for="_i in Array.from(Array(100).keys())" />
    </div>

    <div id="pageContent" class="overflow-hidden">
      <div style="height: calc(100% - 4.5rem)" class="w-full">
        <transition name="slide" mode="out-in">
          <div :key="route.name" class="h-full w-full">
            <slot />
          </div>
        </transition>
      </div>
      <navbar v-if="route.path !== '/'"
        @aeon="settings.setAeonTheme(!aeonTheme)" />
    </div>

  </div>
  <UDrawer v-if="route.path !== '/'" direction="bottom" title="Credits"
    description="Thank you!" inset :handle="false"
    :ui="{ content: 'rounded-3xl' }">
    <div id="credits" class="hover:underline">
      Built by Faeq
      <UIcon name="i-lucide-copyleft" class="!size-1.75 min-w-1.75 ml-0.5" />
    </div>

    <template #content>
      <Credits />
    </template>
  </UDrawer>

</template>

<style lang="scss">
@use 'sass:math';

//=-------------------------------------------------------------------
//== Page transitions ==//

.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 1s ease,
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

//=-------------------------------------------------------------------
//== Fog for the Zarlasht theme ==//

html.zTheme .fogWrap {
  perspective-origin: 50% 50%;
}

html.zTheme .fogWrap img {
  position: absolute;
  bottom: -100vh;
  transform-style: preserve-3d;
  z-index: -1;
  max-width: 20px;
}

html.zTheme html.dark {
  .fogWrap img {
    filter: invert(1);
  }
}

html:not(.zTheme) .fogWrap {
  display: none !important;
}

$bgAnimation: 100;

@for $i from 1 through $bgAnimation {
  $scale: math.random(2) - 0.4;

  html.zTheme .fogWrap img:nth-child(#{$i}) {
    left: math.random(120) * 1% - 20;
    animation: raise#{$i} 7+math.random(15)+s linear infinite;
    animation-delay: math.random(5) - 5 + s;
    transform: scale(0.3 * $i - 0.6) rotate(math.random(360) + deg);
    z-index: $i + 99;

    @keyframes raise#{$i} {
      to {
        bottom: 150vh;
        transform: scale(0.3 * $i - 0.6) rotate(math.random(360) + deg);
      }
    }
  }
}
</style>