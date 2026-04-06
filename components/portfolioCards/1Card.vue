<script setup lang="ts">
import PortfolioCard from '~/components/layoutSections/portfolioCard.vue'

import { db, type Project } from "~/assets/scripts/db";
import { liveQuery } from 'dexie';
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";

const project = useObservable<Project | undefined>(from(liveQuery(async () => await db.projects.get('Quokka'))));

const images = [
  'https://faeq-f.github.io/Quokka/media/AppScreenshots/AllApps.png',
  '/PersonalSite2026/media/QuokkaLight.png',
  'https://faeq-f.github.io/Quokka/media/AppScreenshots/AllApps.png',
  '/PersonalSite2026/media/QuokkaLight.png',
]
</script>

<template>
  <PortfolioCard :project="project!" :images="images"
    widthClass="min-w-230 max-w-230" heightClass="h-60" horizontal />
</template>