<template>
  <UCard
    class="m-5 my-4 opacity-80 cardShadow border border-[var(--ui-border)]">
    <template #header>
      <div class="flex justify-between">
        <span class="flex items-center">
          2018
          <USeparator orientation="vertical" class="h-4 inline-block mx-4" />
          The Web
        </span>
        <span class="opacity-70">
          14 years old
        </span>
      </div>
    </template>

    <div class="flex flex-col md:flex-row justify-between aboutContent">
      <div class="leading-[1.9] -mt-2 min-w-0">
        Intrigued by poor site design, I decided to look into web technologies.
        <div class="h-4"></div>
        As a result, I taught myself many more languages like
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link
            to="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="_blank" class="boxLink">JavaScript</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See JavaScript</p>
          </template>
        </UPopover>,
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://www.iso.org/standard/76583.html"
            target="_blank" class="boxLink">SQL</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See SQL</p>
          </template>
        </UPopover>,
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://html.spec.whatwg.org/" target="_blank"
            class="boxLink">HTML</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See HTML</p>
          </template>
        </UPopover>,
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://www.w3.org/TR/css/" target="_blank"
            class="boxLink">CSS</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See CSS</p>
          </template>
        </UPopover>, etc., while also learning how to use technologies
        like
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://nodejs.org/en" target="_blank"
            class="boxLink">Node.js</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Node.js</p>
          </template>
        </UPopover>,
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://www.electronjs.org/" target="_blank"
            class="boxLink">Electron</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Electron</p>
          </template>
        </UPopover> ,
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://react.dev/" target="_blank"
            class="boxLink">React</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See React</p>
          </template>
        </UPopover> and
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://jquery.com/" target="_blank"
            class="boxLink">jQuery</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See jQuery</p>
          </template>
        </UPopover>.
        <div class="h-4"></div>
        I also began publishing my code on
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://github.com/Faeq-F?tab=repositories"
            target="_blank" class="boxLink">GitHub</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See GitHub repositories</p>
          </template>
        </UPopover> and collaborating with people on various
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="/portfolio?certs=noCerts"
            class="boxLink">projects</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See my projects</p>
          </template>
        </UPopover>.
      </div>
      <div class="flex flex-row mt-4 md:mt-0 md:mx-4">
        <USeparator orientation="vertical"
          class="hidden md:block self-center h-[6rem] mr-4" />
        <img src="/media/TimeLineImage3.png"
          class="rounded-lg md:h-[9rem] w-full md:w-auto object-contain" />
      </div>
    </div>
  </UCard>
</template>