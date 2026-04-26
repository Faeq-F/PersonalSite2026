<script setup lang="ts">
import { db, type Project, type Skill } from "~/assets/scripts/db";
import { liveQuery } from 'dexie';
import { useObservable } from "@vueuse/rxjs";
import Gallery from "~/components/layoutSections/portfolioCard.vue"
import { from } from "rxjs";
import { MdPreview, type Themes, config } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import LinkAttr from 'markdown-it-link-attributes';
import { useTheme } from '@maz-ui/themes'

config({
  markdownItPlugins(_plugins, _opts) {
    return [
      {
        type: 'linkAttr',
        plugin: LinkAttr,
        options: {
          matcher(href: string) {
            return !href.startsWith('#');
          },
          attrs: {
            target: '_blank'
          }
        }
      },
    ]
  }
})

const route = useRoute()
const project = useObservable<Project | undefined>(from(liveQuery(async () => await db.projects.get((route.params.name + '').replaceAll('~', ' ')))));

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

const { colorMode } = useTheme()
const theme = ref(colorMode.value)
watch(colorMode, async (newTheme, _oldTheme) => theme.value = newTheme.toString())

const readme = ref('')
const loading = ref(true)

const getGithubReadmeUrl = (project: Project | undefined): string | null => {
  if (!project?.links) return null
  const githubLink = project.links.find(link => link.includes('github.com/Faeq-F/'))
  if (!githubLink) return null
  // Extract owner/repo from github.com/owner/repo URL
  const repo = githubLink.split('/')
  // TODO - account for lack of main branch - e.g. WRDSRCH uses Final & master
  return `https://raw.githubusercontent.com/Faeq-F/${repo[repo.length - 1]}/refs/heads/main/README.md`
}

watch(project, async (newProject) => {
  readme.value = ''
  loading.value = true
  const url = getGithubReadmeUrl(newProject)
  if (!url) {
    loading.value = false
    return
  }
  try {
    readme.value = await $fetch(url)
    // Remove first line (typically the title with #)
    readme.value = readme.value.substring(readme.value.indexOf('\n') + 1)
  } catch (err) {
    console.log('Error fetching README:', err)
    readme.value = 'Failed to load README.'
  } finally {
    loading.value = false
  }
}, { immediate: true })
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
                class="opacity-80 cardShadow border border-[var(--ui-border)] m-4">
                <template #header>
                  <div class="flex items-center text-sm">
                    <UIcon name="i-lucide-images" class="mr-1.5 !size-4" />
                    <span>Gallery</span>
                  </div>
                </template>
                <Gallery v-if="project" :project="project"
                  :images="project?.images || []" widthClass="w-full"
                  heightClass="h-96" :horizontal="true" />
              </UCard>
              <UCard
                class="opacity-80 cardShadow border border-[var(--ui-border)] m-4 ">
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
                  <MdPreview v-if="!loading" :theme="theme as Themes"
                    previewTheme="github" codeTheme="github" language="en-US"
                    class="!bg-transparent" :modelValue="readme" />
                  <USkeleton v-else class="h-32" />
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