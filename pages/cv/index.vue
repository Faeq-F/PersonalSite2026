<script setup lang="ts">
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import RelatedCards from '~/components/cv/RelatedCards.vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import '@tato30/vue-pdf/style.css'
import { ref, watch } from 'vue'
import { useSettingsStore } from '~/stores/settings'

const { pdf, pages } = usePDF('/PersonalSite2026/cv.pdf')

const settings = useSettingsStore()

const scale = ref(0.95)

import type { TabsItem } from '@nuxt/ui'
const viewOptions = ref<TabsItem[]>([
  {
    label: 'Single Page',
    icon: 'i-lucide-rectangle-vertical',
    value: 'single'
  },
  {
    label: 'Dual Page',
    icon: 'i-lucide-columns-2',
    value: 'dual'
  },
])
const viewActive = ref('dual')

const highlightText = ref('')
const highlightOptions = ref({
  completeWords: false,
  ignoreCase: true,
})

const page = ref(1)
watch(page, (newPageVal) => {
  document.getElementById('cvContainer')!.scrollTo({ top: document.getElementById('cvPage' + newPageVal)!.offsetTop, left: document.getElementById('cvPage' + newPageVal)!.offsetLeft, behavior: 'smooth' })
})


const LenisWrapper = ref();
const LenisContent = ref();

</script>


<template>
  <div class="flex w-full p-8 h-full">

    <div class="p-8 pb-0 h-full transition-all duration-200"
      :class="viewActive == 'single' ? 'flex-1/10' : ''">

      <UCard
        class="h-full w-full opacity-80 cardShadow border border-[var(--ui-border)]">

        <template #header>
          <div class="flex gap-4 items-center justify-between">
            <div class="font-bold" style="line-height: 1;">
              <MazAnimatedElement direction="up" :duration="700" :delay="500">
                <p class="text-[3rem] varela">Curriculum Vitae</p>
              </MazAnimatedElement>
            </div>
            <MazAnimatedElement direction="up" :duration="700" :delay="600">
              <a href="./cv.pdf" download="cv.pdf">
                <UButton leading-icon="i-lucide-download" size="xl"
                  color="primary" />
              </a>
            </MazAnimatedElement>
          </div>
        </template>

        <div class="">
          <MazAnimatedElement direction="up" :duration="700" :delay="700">
            <p class="font-bold text-[1rem]">Related content</p>
          </MazAnimatedElement>
          <USeparator class="w-28 mb-4 mt-0.5 self-center " />
          <RelatedCards />
        </div>

        <template #footer>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4 items-end w-full justify-between">
              <MazAnimatedElement direction="right" :duration="700"
                :delay="800">
                <UFormField label="Page">
                  <UInputNumber v-model="page" :min="1" :max="pages"
                    orientation="vertical" color="neutral"
                    placeholder="Enter a page number" />
                </UFormField>
              </MazAnimatedElement>
              <MazAnimatedElement direction="up" :duration="700" :delay="900">
                <UFormField label="Scale">
                  <UInputNumber v-model="scale" :min="0.1" :max="2"
                    color="neutral" placeholder="Enter a zoom amount"
                    :step="0.05" :format-options="{
                      style: 'percent'
                    }" />
                </UFormField>
              </MazAnimatedElement>
              <MazAnimatedElement direction="left" :duration="700"
                :delay="1000">
                <UTabs :content="false" :items="viewOptions"
                  v-model="viewActive"
                  :ui="{ trigger: 'self-start', label: 'dark:text-[--primary]', leadingIcon: 'dark:text-[--primary]' }"
                  style="--ui-primary: #4a5565" />
              </MazAnimatedElement>
            </div>
            <MazAnimatedElement direction="up" :duration="700" :delay="1100">
              <div
                class="flex flex-col border border-[var(--ui-border)] rounded-lg">
                <UInput v-model="highlightText" icon="i-lucide-search"
                  placeholder="Search..." color="neutral" variant="none">
                  <template #trailing v-if="highlightText?.length">
                    <div class="flex items-center gap-4">
                      <UButton color="neutral" variant="link" size="sm"
                        icon="i-lucide-circle-x" aria-label="Clear input"
                        @click="highlightText = ''" />
                    </div>
                  </template>
                </UInput>
                <USeparator class="w-full px-2 pb-1 my-0" />
                <div class="flex items-center justify-around pb-1">
                  <UCheckbox v-model="highlightOptions.completeWords"
                    label="Complete Words" color="neutral" class="opacity-80" />
                  <UCheckbox v-model="highlightOptions.ignoreCase"
                    label="Ignore Case" color="neutral" class="opacity-80" />
                </div>
              </div>
            </MazAnimatedElement>
          </div>
        </template>

      </UCard>
    </div>
    <div ref="LenisWrapper" id="cvContainer"
      class="opacity-80 h-full overflow-y-scroll transition-all ScrollBlur flex items-center mt-4"
      :class="viewActive == 'single' ? '' : 'flex-9/10'">
      <VueLenis root :options="{
        autoRaf: true,
        lerp: 0.1,
        anchors: true,
        content: LenisContent,
        wrapper: LenisWrapper,
      }" />
      <div ref="LenisContent"
        :class="viewActive == 'single' ? 'h-full' : ' flex mx-0.25 '">
        <TransitionGroup name="list">
          <div v-for="page in pages" :key="page" :id="`cvPage${page}`"
            class="cardShadow border border-[var(--ui-border)] rounded-md w-fit h-fit "
            :class="viewActive == 'single' ? page == 1 ? 'mb-2' : '' : page == 1 ? 'mr-2' : ''">
            <VuePDF :pdf="pdf" :page="page" text-layer
              :highlight-text="highlightText"
              :highlight-options="highlightOptions" :scale="scale" />
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style>
#cvContainer canvas {
  border-radius: 0.5rem;
}
</style>