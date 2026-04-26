<script setup lang="ts">
import { ref } from 'vue'
import SkillsInput from '~/components/skillsInput.vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import type { TabsItem } from '@nuxt/ui'

const calendarVal = ref<{ start: CalendarDate | undefined, end: CalendarDate | undefined }>({
  start: undefined,
  end: undefined
})

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const contributorsOptions = ref<TabsItem[]>([
  { label: 'All', value: 'all', icon: 'i-lucide-gallery-vertical-end' },
  { label: 'Solo', value: 'solo', icon: 'i-lucide-user' },
  { label: 'Team', value: 'team', icon: 'i-lucide-users' }
])
const contributorsActive = ref('all')

const certsOptions = ref<TabsItem[]>([
  { label: 'All', icon: 'i-lucide-gallery-vertical-end', value: 'all' },
  { label: 'Projects', icon: 'i-lucide-square-kanban', value: 'project' },
  { label: 'Certificates', icon: 'i-lucide-file-badge', value: 'certificate' }
])
const certsActive = ref('all')

defineExpose({
  contributorsActive,
  certsActive,
  calendarVal
})
</script>

<template>
  <div class="flex flex-col items-start">
    <MazAnimatedElement direction="up" :duration="700" :delay="900">
      <UTabs :content="false" :items="contributorsOptions" class="mx-auto w-fit"
        style="--ui-primary: #4a5565" v-model="contributorsActive"
        :ui="{ trigger: 'self-start', label: 'dark:text-[--primary]', leadingIcon: 'dark:text-[--primary]' }" />
    </MazAnimatedElement>
    <MazAnimatedElement direction="up" :duration="700" :delay="700">
      <SkillsInput
        @change="(e) => console.log(JSON.parse(JSON.stringify(e)))" />
    </MazAnimatedElement>
    <MazAnimatedElement direction="up" :duration="700" :delay="800">
      <UTabs :content="false" :items="certsOptions" class="mx-auto w-fit"
        style="--ui-primary: #4a5565" orientation="vertical"
        v-model="certsActive"
        :ui="{ trigger: 'self-start', label: 'dark:text-[--primary]', leadingIcon: 'dark:text-[--primary]' }" />
    </MazAnimatedElement>
    <MazAnimatedElement direction="up" :duration="700" :delay="950"
      class="flex justify-center mt-4">
      <UPopover>
        <UButton color="neutral" variant="soft" icon="i-lucide-calendar">
          <template v-if="calendarVal.start">
            <template v-if="calendarVal.end">
              {{ df.format(calendarVal.start.toDate(getLocalTimeZone())) }}
              -
              {{ df.format(calendarVal.end.toDate(getLocalTimeZone())) }}
            </template>
            <template v-else>
              {{ df.format(calendarVal.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else>
            Pick a date range
          </template>
        </UButton>
        <template #content>
          <UCalendar v-model="(calendarVal as any)" class="p-2" color="primary"
            :number-of-months="2" range />
        </template>
      </UPopover>
    </MazAnimatedElement>
  </div>
</template>