<script lang="ts" setup>
import { VueLenis } from 'lenis/vue'
const props = defineProps(['contentClasses'])

const LenisWrapper = ref();
const LenisContent = ref();

// Collapsible state - collapsed by default on mobile
const device = useDevice()
const open = ref(false)

const route = useRoute()
const labelSuffix = route.name === 'about' ? 'details' : 'filters'
const label = computed(() => (open.value ? 'Close' : 'Open') + ' ' + labelSuffix)
</script>

<template>
  <div class="p-4 md:p-8 h-full w-full overflow-y-auto md:overflow-hidden">
    <div class="flex flex-col md:flex-row h-full w-full">
      <UCard
        class="m-2 md:m-4 h-auto md:h-full w-auto md:w-96 opacity-80 cardShadow border border-[var(--ui-border)] flex-shrink-0">
        <template #header>
          <slot name="left-panel-header"></slot>
        </template>

        <!-- Collapsible on mobile, always open on desktop -->
        <UCollapsible v-if="device.isMobile" v-model:open="open">
          <UButton :label="label" variant="soft" class="group" :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
          }" trailing-icon="i-lucide-chevron-down" block />
          <template #content>
            <div class="min-h-auto mt-4">
              <slot name="left-panel-content"></slot>
            </div>
          </template>
        </UCollapsible>
        <!-- Desktop -->
        <div class="min-h-[60vh]" v-if="!device.isMobile">
          <slot name="left-panel-content"></slot>
        </div>

        <template #footer v-if="!device.isMobile || (device.isMobile && open)">
          <slot name="left-panel-footer"></slot>
        </template>
      </UCard>
      <div id="contentPanelsContent" ref="LenisWrapper"
        class="flex flex-col h-full w-full mx-0 md:mr-8 mt-2 md:mt-4 overflow-y-scroll overflow-x-hidden ScrollBlur">
        <VueLenis root :options="{
          autoRaf: true,
          lerp: 0.1,
          anchors: true,
          content: LenisContent,
          wrapper: LenisWrapper,
        }" />
        <div id="lenis-content" :class="contentClasses" ref="LenisContent">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>