<script setup lang="ts">
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import stackoverflow from '~/components/icons/stackoverflow.vue'
import github from '~/components/icons/github.vue'
import linkedin from '~/components/icons/linkedin.vue'
</script>

<template>
  <div id="HomeSocialButtonGroup" class="w-fit ml-30">
    <!-- Email -->
    <MazAnimatedElement direction="right" :duration="700" :delay="1400" class="inline">
      <a href="mailto:faeqfaisal@hotmail.co.uk" target="_blank">
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <button class="lg:inline-flex hidden items-center gap-2 py-2 rounded-full text-current justify-center mx-1 px-6">
            <UIcon name="i-lucide-mail" class="!size-5 contrast-0 hover:contrast-100 transition-all ease-in-out duration-200" />
          </button>
          <template #content>
            <p class="p-1 text-sm">Email</p>
          </template>
        </UPopover>
      </a>
    </MazAnimatedElement>

    <!-- LinkedIn -->
    <MazAnimatedElement direction="right" :duration="700" :delay="1500" class="inline">
      <a href="https://linkedin.com/in/faeq" target="_blank">
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <button class="lg:inline-flex hidden items-center gap-2 py-2 rounded-full text-current justify-center mx-1 px-6">
            <linkedin class="grayscale contrast-0 hover:contrast-100 hover:grayscale-0 transition-all ease-in-out duration-200 size-5 dark:hover:grayscale dark:hover:invert dark:hover:contrast-300" />
          </button>
          <template #content>
            <p class="p-1 text-sm">LinkedIn</p>
          </template>
        </UPopover>
      </a>
    </MazAnimatedElement>

    <!-- GitHub -->
    <MazAnimatedElement direction="right" :duration="700" :delay="1600" class="inline">
      <a href="https://github.com/Faeq-F" target="_blank">
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <button class="lg:inline-flex hidden items-center gap-2 py-2 rounded-full text-current justify-center mx-1 px-6">
            <github class="contrast-0 hover:contrast-100 transition-all ease-in-out duration-200 size-5 dark:hover:invert-100" />
          </button>
          <template #content>
            <p class="p-1 text-sm">GitHub</p>
          </template>
        </UPopover>
      </a>
    </MazAnimatedElement>

    <!-- StackOverflow -->
    <MazAnimatedElement direction="right" :duration="700" :delay="1700" class="inline">
      <a href="http://stackoverflow.com/users/13165763/faeq" target="_blank">
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <button class="lg:inline-flex hidden items-center gap-2 py-2 rounded-full text-current justify-center mx-1 px-6">
            <stackoverflow class="grayscale hover:grayscale-0 transition-all ease-in-out duration-200 size-5" />
          </button>
          <template #content>
            <p class="p-1 text-sm">StackOverflow</p>
          </template>
        </UPopover>
      </a>
    </MazAnimatedElement>

    <!-- SMS -->
    <MazAnimatedElement direction="right" :duration="700" :delay="1800" class="inline">
      <a href="sms:+447775901092?&body=Hello%Faeq," target="_blank">
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <button class="lg:inline-flex hidden items-center gap-2 py-2 rounded-full text-current justify-center mx-1 px-6">
            <UIcon name="i-lucide-message-square-text" class="!size-5 contrast-0 hover:contrast-100 transition-all ease-in-out duration-200" />
          </button>
          <template #content>
            <p class="p-1 text-sm">SMS</p>
          </template>
        </UPopover>
      </a>
    </MazAnimatedElement>

    <!-- Calendar (no px-6 for theme styling) -->
    <MazAnimatedElement direction="right" :duration="700" :delay="1900" class="inline">
      <a href="https://cal.com/Faeq-F" target="_blank">
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <button class="lg:inline-flex hidden items-center gap-2 py-2 rounded-full text-current justify-center mx-1">
            <UIcon name="i-lucide-calendar-plus-2" class="!size-5 contrast-0 hover:contrast-100 transition-all ease-in-out duration-200" />
          </button>
          <template #content>
            <p class="p-1 text-sm">Book a meeting</p>
          </template>
        </UPopover>
      </a>
    </MazAnimatedElement>
  </div>
</template>
