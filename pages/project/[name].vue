<script setup lang="ts">
import { db, type Project, type Skill } from "~/assets/scripts/db";
import { liveQuery } from 'dexie';
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";
const route = useRoute()
const project = useObservable<Project | undefined>(from(liveQuery(async () => await db.projects.get(route.params.name + ''))));

import { useSettingsStore } from '~/stores/settings'
const settings = useSettingsStore()

const projectStart = computed(() => {
  if (!project.value || !(project.value.startDate instanceof Date)) return '';
  const month = settings.months[project.value.startDate.getMonth()]?.substring(0, 3) ?? '';
  return `${month} ${project.value.startDate.getFullYear()}`;
});

const projectEnd = computed(() => {
  if (!project.value || !(project.value.endDate instanceof Date) || !(project.value.startDate instanceof Date)) return '';
  return project.value.endDate < project.value.startDate
    ? 'Present'
    : `${settings.months[project.value.endDate.getMonth()]?.substring(0, 3) ?? ''} ${project.value.endDate.getFullYear()}`;
});

const date = computed(() => {
  return projectStart.value + ' - ' + projectEnd.value
});

const skills = useObservable<Skill[]>(from(liveQuery(async () => await db.skills.toArray())));
const getSkill = (skill: string) => skills.value?.find(s => s.name == skill);

import { VueLenis } from 'lenis/vue'
const LenisWrapper = ref();
const LenisContent = ref();
</script>

<template>
  <div class="p-8 h-full w-full">
    <div class="flex h-full w-full">
      <UCard :ui="{ footer: 'flex flex-col justify-around h-[70%]' }"
        class="m-4 h-full w-96 opacity-80 cardShadow border border-[var(--ui-border)]">
        <template #header>
          <div class="font-bold" style="line-height: 1;">
            <MazAnimatedElement direction="up" :duration="700" :delay="500">
              <p class="text-[3rem] break-all varela">{{ project?.name }}</p>
            </MazAnimatedElement>
            <MazAnimatedElement direction="up" :duration="700" :delay="600">
              <p class="text-[1rem]">{{ date }}</p>
            </MazAnimatedElement>
          </div>
        </template>
        <div>
          {{ project?.description }}
        </div>
        <template #footer>
          <MazAnimatedElement direction="left" :delay="1600" :duration="700">
            <div class="flex items-center text-sm ">
              <UIcon name="i-lucide-square-kanban" class="mr-1.5 !size-4" />
              <span>Links</span>
            </div>
            <USeparator class="my-3" :ui="{ border: 'dark:border-gray-600' }" />
            <div class="text-sm">
              <ul class="list-none text-left">
                <li v-for="link in project?.links">
                  <div class="flex">
                    <!--link type icon-->
                    <ULink :url="link">
                      {{ link }}
                    </ULink>
                  </div>
                </li>
              </ul>
            </div>
          </MazAnimatedElement>
          <MazAnimatedElement direction="left" :delay="2000" :duration="700">
            <div class="flex items-center text-sm ">
              <UIcon name="i-lucide-tags" class="mr-1.5 !size-4" />
              <span>Tags</span>
            </div>
            <USeparator class="my-3" :ui="{ border: 'dark:border-gray-600' }" />
            <UPopover v-for="(tag, i) in project?.skills" :key="i"
              class="mx-0.5 outfit" mode="hover">
              <UKbd>
                {{ tag }}
              </UKbd>
              <template #content>
                <div class="text-sm flex flex-col gap-2 p-2">
                  <UButton color="neutral" variant="soft" :to="'/skill/' + tag">
                    See the skill '{{ tag }}'
                  </UButton>
                  <USeparator class=""
                    :ui="{ border: 'dark:border-gray-600' }" />
                  Categories:
                  <UButton color="neutral" variant="outline"
                    :to="'/skill/' + skillCat" class="text-xs w-fit p-1"
                    v-for="skillCat in getSkill(tag)?.category ?? []">
                    {{ skillCat }}
                  </UButton>
                  <USeparator class=""
                    :ui="{ border: 'dark:border-gray-600' }" />
                  Current experience level:<br />
                  <ul class="list-disc ml-4 pr-4">
                    <li>sample level</li>
                  </ul>
                </div>
              </template>
            </UPopover>
          </MazAnimatedElement>
          <MazAnimatedElement direction="left" :delay="200" :duration="700">
            <div class="flex items-center text-sm ">
              <UIcon name="i-lucide-git-pull-request-arrow"
                class="mr-1.5 !size-4" />
              <span>Related Activities & Projects</span>
            </div>
            <span class="text-xs">
              {{ project?.relatedActivities }}
            </span>
            <USeparator class="my-3" :ui="{ border: 'dark:border-gray-600' }" />
            <div class="flex justify-around">
              {{ project?.relatedProjects }}
            </div>
          </MazAnimatedElement>
        </template>
      </UCard>
      <div id="contentPanelsContent" ref="LenisWrapper"
        class="flex flex-col h-full w-full mr-8 mt-4 overflow-y-scroll overflow-x-hidden ScrollBlur">
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
              <UCard
                class="opacity-80 cardShadow border border-[var(--ui-border)] m-4 hover:scale-103">
                <template #header>
                  <div class="flex items-center text-sm">
                    <UIcon name="i-lucide-images" class="mr-1.5 !size-4" />
                    <span>Gallery</span>
                  </div>
                </template>
                <MazCard :images="['https://loremflickr.com/600/600',
                  'https://loremflickr.com/700/700', 'https://loremflickr.com/400/400',
                  'https://loremflickr.com/300/300']" :images-show-count="3"
                  :no-remaining="false" zoom class="w-full"
                  :gallery-height="400" noPadding>
                </MazCard>
              </UCard>
              <UCard
                class="opacity-80 cardShadow border border-[var(--ui-border)] m-4 hover:scale-103">
                <template #header>
                  <nuxt-link
                    :to="'https://github.com/' + '/blob/main/README.md'"
                    class="!no-underline flex items-center !not-italic">
                    <UIcon name="i-lucide-book-open" class="mr-1.5 !size-4" />
                    <code>README.md</code>
                    <UIcon name="i-lucide-arrow-up-right"
                      class="!size-2 mb-1" />
                  </nuxt-link>
                </template>
                <div class="min-h-64">
                  <!-- <MdPreview :theme="theme" previewTheme="github" codeTheme="github"
                language="en-US" class="!bg-transparent" :modelValue="readme"
                v-if="!loading" /> -->
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add something to load a specific component for when project has extra
     details-->
  </div>
</template>