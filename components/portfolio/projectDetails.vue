<script lang="ts" setup>
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";
import { liveQuery } from 'dexie';
import { db, type Project, type Skill } from "~/assets/scripts/db";

const route = useRoute()
const project = useObservable<Project | undefined>(from(liveQuery(async () => await db.projects.get((route.params.name + '').replaceAll('~', ' ')))));

const skills = useObservable<Skill[]>(from(liveQuery(async () => await db.skills.toArray())));
const getSkill = (skill: string) => skills.value?.find(s => s.name == skill);
</script>

<template>
  <MazAnimatedElement direction="left" :delay="1600" :duration="700">
    <div class="flex items-center text-sm">
      <UIcon name="i-lucide-square-kanban" class="mr-1.5 !size-4" />
      <span>Links</span>
    </div>
    <USeparator class="my-3" :ui="{ border: 'dark:border-gray-600' }" />
    <div class="text-sm min-w-0">
      <ul class="list-none text-left">
        <li v-for="link in project?.links" class="truncate">
          <div class="flex">
            <!--link type icon-->
            <ULink :url="link" class="truncate max-w-full">
              {{ link }}
            </ULink>
          </div>
        </li>
      </ul>
    </div>
  </MazAnimatedElement>
  <MazAnimatedElement direction="left" :delay="2000" :duration="700">
    <div class="flex items-center text-sm mt-4 md:mt-0">
      <UIcon name="i-lucide-tags" class="mr-1.5 !size-4" />
      <span>Tags</span>
    </div>
    <USeparator class="my-3" :ui="{ border: 'dark:border-gray-600' }" />
    <UPopover v-for="(tag, i) in project?.skills" :key="i" class="mx-0.5 outfit"
      mode="hover">
      <UKbd>
        {{ tag }}
      </UKbd>
      <template #content>
        <div class="text-sm flex flex-col gap-2 p-2">
          <UButton color="neutral" variant="soft" :to="'/skill/' + tag">
            See the skill '{{ tag }}'
          </UButton>
          <USeparator class="" :ui="{ border: 'dark:border-gray-600' }" />
          Categories:
          <UButton color="neutral" variant="outline" :to="'/skill/' + skillCat"
            class="text-xs w-fit p-1"
            v-for="skillCat in getSkill(tag)?.category ?? []">
            {{ skillCat }}
          </UButton>
          <USeparator class="" :ui="{ border: 'dark:border-gray-600' }" />
          Current experience level:<br />
          <ul class="list-disc ml-4 pr-4">
            <li>sample level</li>
          </ul>
        </div>
      </template>
    </UPopover>
  </MazAnimatedElement>
  <MazAnimatedElement direction="left" :delay="200" :duration="700">
    <div class="flex items-center text-sm mt-4 md:mt-0">
      <UIcon name="i-lucide-git-pull-request-arrow" class="mr-1.5 !size-4" />
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