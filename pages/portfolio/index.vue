<script lang="ts" setup>
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import contentPanels from '~/components/layoutSections/contentPanels.vue';
import type { InputMenuItem, TabsItem } from '@nuxt/ui'
import { ref, provide } from 'vue';
import SkillsInput from '~/components/skillsInput.vue';

import Card1 from '~/components/portfolioCards/1Card.vue';
import Card2 from '~/components/portfolioCards/2Card.vue';
import Card3 from '~/components/portfolioCards/3Card.vue';
import Card4 from '~/components/portfolioCards/4Card.vue';
import Card5 from '~/components/portfolioCards/5Card.vue';
import Card6 from '~/components/portfolioCards/6Card.vue';
import Card7 from '~/components/portfolioCards/7Card.vue';
import Card8 from '~/components/portfolioCards/8Card.vue';
import Card9 from '~/components/portfolioCards/9Card.vue';
import Card10 from '~/components/portfolioCards/10Card.vue';
import Card11 from '~/components/portfolioCards/11Card.vue';
import Card12 from '~/components/portfolioCards/12Card.vue';
import Card13 from '~/components/portfolioCards/13Card.vue';
import Card14 from '~/components/portfolioCards/14Card.vue';
import Card15 from '~/components/portfolioCards/15Card.vue';
import Card16 from '~/components/portfolioCards/16Card.vue';
import Card17 from '~/components/portfolioCards/17Card.vue';
import Card18 from '~/components/portfolioCards/18Card.vue';
import Card19 from '~/components/portfolioCards/19Card.vue';
import Card20 from '~/components/portfolioCards/20Card.vue';
import Card21 from '~/components/portfolioCards/21Card.vue';
import Card22 from '~/components/portfolioCards/22Card.vue';
import Card23 from '~/components/portfolioCards/23Card.vue';
import Card24 from '~/components/portfolioCards/24Card.vue';
import Card25 from '~/components/portfolioCards/25Card.vue';
import Card26 from '~/components/portfolioCards/26Card.vue';
import Card27 from '~/components/portfolioCards/27Card.vue';
import Card28 from '~/components/portfolioCards/28Card.vue';
import Card29 from '~/components/portfolioCards/29Card.vue';
import Card30 from '~/components/portfolioCards/30Card.vue';
import Card31 from '~/components/portfolioCards/31Card.vue';
import Card32 from '~/components/portfolioCards/32Card.vue';
import Card33 from '~/components/portfolioCards/33Card.vue';
import Card34 from '~/components/portfolioCards/34Card.vue';
import Card35 from '~/components/portfolioCards/35Card.vue';
import Card36 from '~/components/portfolioCards/36Card.vue';
import Card37 from '~/components/portfolioCards/37Card.vue';
import Card38 from '~/components/portfolioCards/38Card.vue';
import Card39 from '~/components/portfolioCards/39Card.vue';
import Card40 from '~/components/portfolioCards/40Card.vue';
import Card41 from '~/components/portfolioCards/41Card.vue';
import Card42 from '~/components/portfolioCards/42Card.vue';
import Card43 from '~/components/portfolioCards/43Card.vue';
import Card44 from '~/components/portfolioCards/44Card.vue';
import Card45 from '~/components/portfolioCards/45Card.vue';
import Card46 from '~/components/portfolioCards/46Card.vue';
import Card47 from '~/components/portfolioCards/47Card.vue';
import Card48 from '~/components/portfolioCards/48Card.vue';
import Card49 from '~/components/portfolioCards/49Card.vue';
import Card50 from '~/components/portfolioCards/50Card.vue';

import { useRoute } from 'nuxt/app';
const route = useRoute()

const certsOptions = ref<TabsItem[]>([
  {
    label: 'Only Certificates',
    icon: 'i-lucide-file-badge',
    value: 'onlyCerts'
  },
  {
    label: 'All Content',
    icon: 'i-lucide-gallery-vertical-end',
    value: 'all'
  },
  {
    label: 'No Certificates',
    icon: 'i-lucide-square-kanban',
    value: 'noCerts'
  }
])
const certsActive = ref((route.query.certs as string) || 'all')

const contributorsOptions = ref<TabsItem[]>([
  {
    label: 'Solo',
    icon: 'i-lucide-user',
    value: 'onlySolo'
  },
  {
    label: 'All',
    icon: 'i-lucide-gallery-vertical-end',
    value: 'all'
  },
  {
    label: 'Team',
    icon: 'i-lucide-users',
    value: 'onlyTeam'
  }
])
const contributorsActive = ref((route.query.certs as string) || 'all')

const CarouselBG = ref(true)
const CarouselScroll = ref(true)
provide('CarouselBG', CarouselBG)
provide('CarouselScroll', CarouselScroll)

onMounted(() => {
  CarouselBG.value = !document.getElementsByTagName('html')[0].classList.contains("zTheme")
})


import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})
const calendarVal = ref<{ start: CalendarDate | undefined, end: CalendarDate | undefined }>({ start: undefined, end: undefined })

</script>

<template>
  <contentPanels contentClasses="flex justify-evenly flex-wrap">
    <template #left-panel-header>
      <div class="font-bold " style="line-height: 1;">
        <MazAnimatedElement direction="up" :duration="700" :delay="500">
          <p class="text-[3rem] varela">Portfolio</p>
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="600">
          <p class="text-[1rem]">What I have worked on</p>
        </MazAnimatedElement>
      </div>
    </template>

    <template #left-panel-content>
      <div class="flex flex-col items-start">
        <MazAnimatedElement direction="up" :duration="700" :delay="900">
          <UTabs :content="false" :items="contributorsOptions"
            class="mx-auto w-fit" style="--ui-primary: #4a5565"
            v-model="contributorsActive"
            :ui="{ trigger: 'self-start', label: 'dark:text-white', leadingIcon: 'dark:text-white' }" />
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="700">
          <SkillsInput
            @change="(e) => console.log(JSON.parse(JSON.stringify(e)))" />
        </MazAnimatedElement>
        <MazAnimatedElement direction="up" :duration="700" :delay="800">
          <UTabs :content="false" :items="certsOptions" class="mx-auto w-fit"
            style="--ui-primary: #4a5565" orientation="vertical"
            v-model="certsActive"
            :ui="{ trigger: 'self-start', label: 'dark:text-white', leadingIcon: 'dark:text-white' }" />
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
              <UCalendar v-model="(calendarVal as any)" class="p-2"
                color="primary" :number-of-months="2" range />
            </template>
          </UPopover>
        </MazAnimatedElement>
      </div>
    </template>

    <template #left-panel-footer>
      <div class=" flex items-start justify-between flex-col gap-4">
        <USwitch v-model="CarouselBG" color="neutral"
          label="Carousel Backgrounds" size="sm" />
        <USwitch v-model="CarouselScroll" color="neutral" size="sm"
          description="(on hover)" label="Carousel Scrolling" />
      </div>
    </template>

    <template #content>
      <MazAnimatedElement direction="right" :duration="1000"
        v-if="certsActive == 'noCerts' || certsActive == 'all'">
        <Card1 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="1000"
        v-if="certsActive == 'noCerts' || certsActive == 'all'">
        <Card2 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="right" :duration="1000">
        <Card3 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card4 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="1000">
        <Card5 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="right" :duration="1000">
        <Card6 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card7 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="1000">
        <Card8 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="right" :duration="1000">
        <Card9 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card10 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="1000">
        <Card11 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000"
        v-if="certsActive == 'onlyCerts' || certsActive == 'all'">
        <Card12 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="right" :duration="1000">
        <Card13 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card14 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="down" :duration="1000">
        <Card15 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="1000">
        <Card16 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="right" :duration="1000">
        <Card17 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="1000">
        <Card18 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="right" :duration="1000">
        <Card19 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="left" :duration="1000">
        <Card20 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card21 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card22 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card23 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card24 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card25 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card26 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card27 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card28 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card29 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card30 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card31 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card32 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card33 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card34 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card35 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card36 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card37 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card38 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card39 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card40 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card41 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card42 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card43 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card44 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card45 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card46 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card47 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card48 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card49 />
      </MazAnimatedElement>
      <MazAnimatedElement direction="up" :duration="1000">
        <Card50 />
      </MazAnimatedElement>
    </template>

  </contentPanels>
</template>