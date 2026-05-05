<template>
  <UCard
    class="m-5 my-4 opacity-80 cardShadow border border-[var(--ui-border)]">
    <template #header>
      <div class="flex justify-between">
        <span class="flex items-center">
          2016
          <USeparator orientation="vertical" class="h-4 inline-block mx-4" />
          Programming
        </span>
        <span class="opacity-70">
          12 years old
        </span>
      </div>
    </template>

    <div class="flex flex-col md:flex-row justify-between aboutContent">
      <div class="leading-[1.9] -mt-2 min-w-0">
        I began programming as a hobby throughout my primary school years.
        <div class="h-4"></div>
        Beginning with block-based programming on
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://en.scratch-wiki.info/wiki/Scratch_1.4"
            target="_blank" class="boxLink">Scratch 1.4</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Scratch 1.4</p>
          </template>
        </UPopover> &
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://en.scratch-wiki.info/wiki/Scratch_2.0"
            target="_blank" class="boxLink">2.0</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Scratch 2.0</p>
          </template>
        </UPopover>, I
        explored my creativity and developed
        engaging programs, including games such as
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://en.wikipedia.org/wiki/Pac-Man" target="_blank"
            class="boxLink">Pac-Man</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Pac-Man</p>
          </template>
        </UPopover>.
        <div class="h-4"></div>
        As my skills
        progressed, I delved into the realm of text-based programming with
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://www.python.org/" target="_blank"
            class="boxLink">Python</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Python</p>
          </template>
        </UPopover>, immersing myself, learning from professionals, and
        occasionally
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://stackoverflow.com/users/13165763/faeq"
            target="_blank" class="boxLink">contributing myself</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See StackOverflow</p>
          </template>
        </UPopover>.
      </div>
      <div class="flex flex-row mt-4 md:mt-0 md:mx-4">
        <USeparator orientation="vertical"
          class="hidden md:block self-center h-[6rem] mr-4" />
        <img src="/media/TimeLineImage2.png"
          class="rounded-lg md:h-[9rem] w-full md:w-auto object-contain" />
      </div>
    </div>
  </UCard>
</template>