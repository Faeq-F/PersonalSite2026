<script setup lang="ts">
import PortfolioCard from '~/components/layoutSections/portfolioCard.vue'

import { db, type Project } from "~/assets/scripts/db";
import { liveQuery } from 'dexie';
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";

const project = useObservable<Project | undefined>(from(liveQuery(async () => await db.projects.get('WhatsappPortable'))));

const images = [
  'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/main/Screenshot.png',
  'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/main/ScreenshotDark.png',
  'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/main/Screenshot.png',
  'https://raw.githubusercontent.com/Faeq-F/whatsappPortable/main/ScreenshotDark.png',
]
</script>

<template>
  <PortfolioCard :project="project!" :images="images"
    widthClass="min-w-100 max-w-100" heightClass="h-60" />
</template>