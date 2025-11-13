<script setup lang="ts">
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";
import { db, type SkillCategory, type Skill } from "~/assets/scripts/db";
import type { InputMenuItem } from "@nuxt/ui";

defineEmits(['change'])

let items = useObservable<Skill[]>(from(liveQuery<Skill[]>(() => db.skills.toArray())))
let categories = useObservable<SkillCategory[]>(from(liveQuery<SkillCategory[]>(() => db.skillCategories.toArray())))
let tags = computed(() => {
  let skills: InputMenuItem[] = []
  categories.value?.forEach((category) => {
    skills.push({
      type: 'label',
      label: category.name
    })
    let catItems = items.value?.filter((skill) => new Set(skill.category).intersection(new Set(category.subCategories)).size > 0 || skill.category.includes(category.name)) || [];
    skills = skills.concat(catItems.map((item) => ({ type: 'item', label: item.name })) || [])
    skills.push({
      type: 'separator'
    })
  })
  return new Set(skills).values().toArray();
})

const TagCatItems = ref(tags)
const TagCatValue = ref()

function onInputOpen(open: boolean) {
  if (open) {
    // make popup scrollable
    setTimeout(() => {
      document.querySelectorAll('[data-reka-popper-content-wrapper]')[0].setAttribute("data-lenis-prevent", "");
    }, 100);
  }
}
</script>
<template>
  <UInputMenu v-model="TagCatValue" :items="TagCatItems" multiple
    placeholder="Search for a skill" variant="soft"
    style="--ui-primary: #4a5565" :icon="TagCatValue?.icon" :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
      content: 'popoverContent'
    }" data-lenis-prevent class="mx-auto my-4 w-fit block"
    @update:open="onInputOpen" open-on-focus
    @change="$emit('change', TagCatValue)" />
</template>