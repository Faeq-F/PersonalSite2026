<template>
  <div class="max-h-[45vh] overflow-y-scroll flex flex-col gap-2 p-2" data-lenis-prevent>
    <div class="flex flex-col gap-2">
      <MazAnimatedElement direction="up" :duration="700">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
      <MazAnimatedElement direction="down" :duration="700">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
    </div>
    <USeparator class="w-28 my-4 self-center" />
    <div class="flex gap-1">
      <MazAnimatedElement direction="right" :duration="700" class="flex-1/2">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="700" class="flex-1/2">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
    </div>
    <div>
      <MazAnimatedElement direction="up" :duration="700">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
    </div>
    <USeparator class="w-28 my-4 self-center" />
    <div>
      <MazAnimatedElement direction="down" :duration="700">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
    </div>
    <div class="flex gap-1">
      <MazAnimatedElement direction="right" :duration="700" class="flex-1/2">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="700" class="flex-1/2">
        <nuxt-link to="/">
          <UCard class="h-full w-full opacity-80 themeLink border border-[var(--ui-border)]">
            content
          </UCard>
        </nuxt-link>
      </MazAnimatedElement>
    </div>
  </div>
</template>
