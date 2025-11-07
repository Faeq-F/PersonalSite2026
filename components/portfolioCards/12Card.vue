<script setup lang="ts">
import PortfolioCard from '~/components/layoutSections/portfolioCard.vue'

import { db, type Certificate } from "~/assets/scripts/db";
import { liveQuery } from 'dexie';
import { useObservable } from "@vueuse/rxjs";
import { from } from "rxjs";

const project = useObservable<Certificate | undefined>(from(liveQuery(async () => await db.certificates.get('BSc Hons. Computer Science (Software Engineering)'))));

const images = [
  '/PersonalSite2025/media/portfolio/Faeq Faisal Certificate front side.jpg',
  '/PersonalSite2025/media/portfolio/Faeq Faisal Transcript page 1.png',
  '/PersonalSite2025/media/portfolio/Faeq Faisal Transcript page 2.png'
]
</script>

<template>
  <PortfolioCard :project="project!" :images="images"
    widthClass="min-w-350 max-w-350" heightClass="h-[60vh]" horizontal />
</template>