<script setup lang="ts">
import LinkPopover from './LinkPopover.vue'
import { db } from '~/assets/scripts/db'

const projectCount = ref(0)
const certificationCount = ref(0)

onMounted(async () => {
  projectCount.value = await db.projects.count()
  certificationCount.value = await db.certificates.count()
})
</script>

<template>
  <UCard class="my-5 mx-2 md:mx-4 opacity-80 min-h-auto cardShadow border border-[var(--ui-border)]">

    <div class="flex flex-col md:flex-row w-full">
      <div class="grow min-w-0">
        <div class="varela mt-2 ml-2 md:ml-4">
          Introduction
          <USeparator class="w-28 mb-4 mt-0.5 self-center" />
        </div>
        <div class="mr-2 ml-4 md:mr-4 md:ml-8 leading-[1.9] aboutContent text-sm md:text-base">
          I'm a software engineer with a passion for building
          useful things and contributing to the community. I actively
          work on a variety of projects, enjoy making open source
          contributions and answer questions on forums, etc., where I can.
          <div class="h-4"></div>
          I am constantly learning, whether through formal education or
          independently. I completed my
          <LinkPopover url="https://faeq-f.github.io/Quokka" text="Bachelor's degree in Software Engineering"
            content="See my degree" />
          at
          <LinkPopover url="https://www.royalholloway.ac.uk/" text="RHUL" content="See the University" />
          <LinkPopover url="https://en.wikipedia.org/wiki/Royal_Holloway,_University_of_London" text=""
            content="University Information" icon="i-lucide-info" />
          (Royal Holloway, University of London), graduating
          with a
          <LinkPopover
            url="https://en.wikipedia.org/wiki/British_undergraduate_degree_classification#Degree_classification"
            text="First Class Honours" content="See degree classification" />.
          Now I'm expanding my expertise,
          learning new skills on the job while proactively exploring
          exciting, new technologies.
          <div class="h-4"></div>
          <USeparator class="w-11/12 self-center" />
          <div class="h-4"></div>
          My current interests lie in declarative, functional
          programming, with a focus on concurrency and event-based
          architectures. I enjoy
          <LinkPopover url="https://en.wikipedia.org/wiki/Free_and_open-source_software" text="FOSS"
            content="See FOSS" />
          projects with plugin-based
          architectures and customizability. My preferred technologies
          include
          <LinkPopover url="https://learn.microsoft.com/en-us/dotnet/csharp/" text="C#" content="See C#" />,
          <LinkPopover url="https://vuejs.org/" text="Vue.js" content="See Vue.js" /> (with
          <LinkPopover url="https://nuxt.com/" text="Nuxt" content="See Nuxt" />
          ),
          <LinkPopover url="https://www.typescriptlang.org/" text="TypeScript" content="See TypeScript" />,
          <LinkPopover url="https://tailwindcss.com/" text="TailwindCSS" content="See TailwindCSS" />,
          <LinkPopover url="https://gleam.run/" text="Gleam" content="See Gleam" />, and
          <LinkPopover url="https://flutter.dev/" text="Flutter" content="See Flutter" />.
          <div class="h-4"></div>
          My main, current personal endeavor is
          <LinkPopover url="https://faeq-f.github.io/Quokka" text="Quokka" content="Project Site" />
          <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
            <nuxt-link to="/project/quokka" class="boxLink">
              <UIcon name="i-lucide-info" />
            </nuxt-link>
            <template #content>
              <p class="p-1 text-sm">Project Information</p>
            </template>
          </UPopover>
          , a portable keystroke launcher for Windows. It features fuzzy
          searching, plugins, and is highly customizable. As a completely
          free and open-source project, it is available for everyone to
          use and contribute to.
          <br /><br />
        </div>
      </div>
      <USeparator orientation="vertical" class="hidden md:block h-70 self-center mx-2 shrink-0" />
      <img src="/media/me.jpeg"
        class="md:h-96 rounded-lg mt-4 md:mt-0 md:ml-4 meImage object-cover w-full md:w-auto shrink-0" />
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2 md:gap-0 md:flex-nowrap md:flex-row justify-evenly">
        <span class="w-full md:w-auto">
          <UBadge icon="i-lucide-user" size="md" color="neutral" variant="soft"
            class="w-full md:w-auto md:justify-center justify-start">
            <USeparator orientation="vertical" class="h-4 invert opacity-20" />
            Legal Name:
            <span class="opacity-80">Faeq Faisal</span>
          </UBadge>
        </span>
        <span class="w-full md:w-auto">
          <UBadge icon="i-lucide-map-pin-house" size="md" color="neutral" variant="soft"
            class="w-full md:w-auto md:justify-center justify-start">
            <USeparator orientation="vertical" class="h-4 invert opacity-20" />
            Location:
            <span class="opacity-80">London, UK</span>
          </UBadge>
        </span>
        <span class="w-full md:w-auto">
          <nuxt-link to="/portfolio" class="block w-full md:w-auto">
            <UBadge icon="i-lucide-square-kanban" size="md" color="neutral" variant="soft"
              class="w-full md:w-auto md:justify-center justify-start">
              <USeparator orientation="vertical" class="h-4 invert opacity-20" />
              Number of Projects:
              <span class="opacity-80">{{ projectCount }}</span>
            </UBadge>
          </nuxt-link>
        </span>
        <span class="w-full md:w-auto">
          <nuxt-link to="/portfolio" class="block w-full md:w-auto">
            <UBadge icon="i-lucide-file-badge" size="md" color="neutral" variant="soft"
              class="w-full md:w-auto md:justify-center justify-start">
              <USeparator orientation="vertical" class="h-4 invert opacity-20" />
              Number of Certifications:
              <span class="opacity-80">{{ certificationCount }}</span>
            </UBadge>
          </nuxt-link>
        </span>
      </div>
    </template>
  </UCard>
</template>

<style>
html:not(.aTheme, .zTheme) .meImage {
  opacity: 0.8;
}
</style>