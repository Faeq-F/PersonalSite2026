<script lang="ts" setup>
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import contentPanels from '~/components/layoutSections/contentPanels.vue';
import type { CheckboxGroupItem, CheckboxGroupValue, InputMenuItem, } from '@nuxt/ui'
import { ref } from 'vue';

import { db, type Role } from "~/assets/scripts/db";
import { liveQuery } from 'dexie';
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";

import { useSettingsStore } from '~/stores/settings'
const settings = useSettingsStore()
const allRoles = useObservable<Role[] | undefined>(from(liveQuery(async () => await db.roles.toArray())));
const skillsSelected = ref([]);

const items = computed(() => {
  return allRoles.value?.filter((role) => {
    if (skillsSelected.value.length > 0) {
      if (!skillsSelected.value.some(r => role.skills.includes(r))) {
        return false;
      }
    }
    return activeRole.value.includes(role.type);
  }).map((role) => ({
    date: `${settings.months[role.startDate.getMonth() ?? 0]?.substring(0, 3) ?? ''} ${role.startDate.getFullYear()}`,
    title: role.name,
    description: role.description || 'No description available',
    icon: role.type == 'jobs' ? 'i-lucide-briefcase-business' :
      role.type == 'education' ? 'i-lucide-backpack' :
        role.type == 'volunteering' ? 'i-lucide-handbag' :
          role.type == 'events' ? 'i-lucide-ticket-check' :
            role.type == 'projects' ? 'i-lucide-chart-gantt' :
              'i-lucide-activity',
    to: `/experience/${role.id}`
  })) || []
});

const roles = ref<CheckboxGroupItem[]>([
  {
    label: 'Jobs',
    value: 'jobs',
    description: 'A paid position of regular employment'
  },
  {
    label: 'Education',
    value: 'education',
    description: 'Formal learning experiences, degrees, and certifications'
  },
  {
    label: 'Volunteering',
    value: 'volunteering',
    description: 'Unpaid work for the community or charitable organizations'
  },
  {
    label: 'Events',
    value: 'events',
    description: 'Various affairs taken part in'
  },
  {
    label: 'Long-term projects',
    value: 'projects',
    description: 'Significant undertakings with defined goals and timelines'
  }
])
const activeRole = ref<CheckboxGroupValue[]>(['jobs', 'education', 'projects', 'volunteering', 'events'])

import { useRoute } from 'nuxt/app';
const route = useRoute()

const queryChange = (to: any) =>
  activeRole.value = to?.replace('/experience?filter=', '').split(',')

onMounted(() => {
  watch(() => route.query.filter, queryChange, { immediate: true });
  queryChange(route.query.filter ? route.query.filter :
    'jobs,education,projects,volunteering,events'
  );
})

</script>

<template>
  <contentPanels>
    <template #left-panel-header>
      <div class="font-bold " style="line-height: 1;">
        <MazAnimatedElement direction="up" :duration="700" :delay="500">
          <p class="text-[2.75rem] varela">Experience</p>
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="600">
          <p class="text-[1rem]">My professional growth</p>
        </MazAnimatedElement>
      </div>
    </template>

    <template #left-panel-content>
      <MazAnimatedElement direction="up" :duration="700" :delay="700">
        <UCheckboxGroup color="neutral" variant="table" :items="roles"
          v-model="activeRole" legend="Filter by role"
          :default-value="['jobs', 'education', 'projects', 'volunteering', 'events']">
          <template #legend>
            <UButton
              :icon="activeRole?.length! < 3 ? 'i-lucide-check-check' : 'i-lucide-squares-subtract'"
              color="neutral" variant="outline" size="sm" class="rolesGrid"
              @click="activeRole?.length! < 3 ? activeRole = ['jobs', 'education', 'projects', 'volunteering', 'events'] : activeRole = []" />
            <div class="font-bold ml-1 align-text-bottom inline">Filter by role
            </div>
          </template>
        </UCheckboxGroup>
      </MazAnimatedElement>
    </template>

    <template #left-panel-footer>
      <MazAnimatedElement direction="up" :duration="700" :delay="800">
        <SkillsInput
          @change="(e) => skillsSelected = JSON.parse(JSON.stringify(e)).map((i: { type: string, label: string }) => i.label)" />
      </MazAnimatedElement>
    </template>

    <template #content>
      <TransitionGroup name="list">
        <!-- multiple timelines used instead of one so that items can be transitioned -->
        <UTimeline :default-value="-1" v-for="(role, i) in items" :key="i"
          :items="i == items.length - 1 ? [role] : [role,
            { date: '', title: '', to: '', description: 'empty' }
          ]" class="w-full mt-1 timeline" size="lg" :ui="{
            date: 'float-end ms-1 pr-4 timeLineDetail',
            description: 'px-3 mr-4 py-2 mt-2 rounded-md text-default cardShadow border border-[var(--ui-border)] bg-white dark:bg-black opacity-80',
            separator: 'cardShadow border border-[var(--ui-border)] bg-white dark:bg-black brightness-200 timelineSeparator',
            indicator: 'cardShadow border border-[var(--ui-border)] bg-white dark:bg-black opacity-80 timeLineDetail timeLineIcon',
          }">
          <template #date="{ item }">
            <div v-if="item.description == 'empty'" class="hidden"></div>
            <nuxt-link :to="item.to" v-else>
              {{ item.date }}
            </nuxt-link>
          </template>
          <template #title="{ item }">
            <div v-if="item.description == 'empty'" class="hidden">
            </div>
            <nuxt-link :to="item.to" v-else class="timeLineDetail">
              {{ item.title }}
            </nuxt-link>
          </template>
          <template #description="{ item }">
            <div v-if="item.description == 'empty'" class="hidden"></div>
            <nuxt-link v-else :to="item.to">
              <!-- Could use md here -->
              {{ item.description }}
            </nuxt-link>
          </template>
        </UTimeline>
      </TransitionGroup>
    </template>

  </contentPanels>
</template>

<style>
.timeline div:has(.hidden) {
  display: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(70px);
}

html.mTheme .timeline .timeLineDetail {
  color: #fff;
}

html:not(.aTheme, .zTheme, .dark) .timeline .timeLineDetail.timeLineIcon {
  color: inherit;
}

html:not(.aTheme, .zTheme, .mTheme, .dark) .timeline .timelineSeparator {
  box-shadow: rgb(0 0 0 / 22%) 0px 1px 3px 0px,
    rgb(0 0 0 / 15%) 0px 1px 2px 0px;
}

html:not(.aTheme, .zTheme) fieldset label {
  margin-bottom: 0.25rem;
  border-radius: 0.5rem;
}
</style>