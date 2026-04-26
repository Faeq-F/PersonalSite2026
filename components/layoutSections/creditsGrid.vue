<script setup lang="ts">
import Button from './creditsButton.vue'

interface Item {
  url: string
  icon: string
  label: string
}

const Rows = [
  // Row 1
  [
    { url: 'https://nuxt.com/', icon: 'i-lucide-server', label: 'Nuxt' },
    { url: 'https://vuejs.org/', icon: 'i-lucide-toy-brick', label: 'Vue.js' },
    { url: 'https://tailwindcss.com/', icon: 'i-lucide-wind', label: 'TailwindCSS' },
    { url: 'https://sass-lang.com/', icon: 'i-lucide-square-round-corner', label: 'Sass' }
  ],
  // Row 2
  [
    { url: 'https://youtu.be/Bj0h4VtMDQA', icon: 'i-lucide-image-play', label: 'Aeon theme background video' },
    { url: 'https://maz-ui.com/', icon: 'i-lucide-component', label: 'Maz UI' },
    { url: 'https://ui.nuxt.com/', icon: 'i-lucide-puzzle', label: 'Nuxt UI' },
    { url: 'https://pinia.vuejs.org/', icon: 'i-lucide-cylinder', label: 'Pinia' }
  ],
  // Row 3
  [
    { url: 'https://fonts.google.com/specimen/Varela+Round', icon: 'i-lucide-a-large-small', label: 'Varela Round Font' },
    { url: 'https://fonts.google.com/specimen/Outfit', icon: 'i-lucide-case-sensitive', label: 'Outfit Font' },
    { url: 'https://svgl.app/', icon: 'i-lucide-code-xml', label: 'SVGL icons' },
    { url: 'https://lucide.dev/', icon: 'i-lucide-shell', label: 'Lucide icons' }
  ],
  // Row 4
  [
    { url: 'https://www.rw-designer.com/cursor-set/windows-11-light-theme', icon: 'i-lucide-mouse-pointer-2', label: 'Cursors' },
    { url: 'https://www.fusejs.io/', icon: 'i-lucide-binoculars', label: 'Fuse.js' },
    { url: 'https://dexie.org/', icon: 'i-lucide-database', label: 'Dexie.js' },
    { url: '', icon: 'i-lucide-gallery-vertical', label: 'Scroller' }
  ],
  // Row 5
  [
    { url: 'https://lenis.darkroom.engineering/', icon: 'i-lucide-mouse', label: 'Lenis' },
    { url: 'https://pages.github.com/', icon: 'i-lucide-router', label: 'GitHub Pages' },
    { url: 'https://imzbf.github.io/md-editor-v3/en-US', icon: 'i-lucide-text-align-start', label: 'MdEditorV3' },
    { url: 'https://unsplash.com/photos/a-black-and-white-photo-of-a-mountain-0QzFognB6bY', icon: 'i-lucide-mountain', label: 'Zarlasht theme background image' }
  ],
  // Row 6
  [
    { url: 'https://www.1001fonts.com/requiem-font.html', icon: 'i-lucide-case-upper', label: 'Requiem Font' },
    { url: 'https://fonts.google.com/specimen/IM+Fell+DW+Pica', icon: 'i-lucide-case-lower', label: 'IM Fell DW Pica Font' },
    { url: 'https://fonts.google.com/specimen/Mona+Sans', icon: 'i-lucide-spell-check-2', label: 'Mona Sans Font' },
    { url: 'https://www.youtube.com/watch?v=XzTCntGgNJU', icon: 'i-lucide-projector', label: 'Mirage theme Background video' }
  ],
  // Row 7
  [
    { url: 'https://fonts.google.com/specimen/EB+Garamond', icon: 'i-lucide-scroll-text', label: 'EB Garamond Font' },
    { url: 'https://unsplash.com/photos/geometric-light-patterns-on-a-blue-surface-Rp17qQr9q8w', icon: 'i-lucide-images', label: 'Mirage theme image' },
    { url: 'https://unsplash.com/photos/white-swan-on-water-51U-PW1y3ts', icon: 'i-lucide-origami', label: 'Default theme image' },
    { url: 'https://unsplash.com/photos/white-and-black-round-gauge-X2SL7nrXiVM', icon: 'i-lucide-circle-gauge', label: 'Aeon theme image' },
  ],
  // Row 8
  [
    { url: 'https://unsplash.com/photos/soft-pink-cherry-blossoms-fill-the-frame-iQkLU7YgtYM', icon: 'i-lucide-flower-2', label: 'Petal theme image' },
    { url: '', icon: '', label: '' },
    { url: '', icon: '', label: '' },
    { url: '', icon: '', label: '' },
  ]
] as Item[][]
</script>

<template>
  <div class="rounded-2xl w-full h-full mt-1">
    <div v-for="(row, rowIndex) in Rows" :key="rowIndex" class="flex h-1/5">
      <template v-for="(item, itemIndex) in row" :key="itemIndex">
        <Button :url="item.url" :icon="item.icon" :label="item.label"
          :disabled="!item.label" :border="rowIndex === 0 && itemIndex === 0 ? 'border border-accented'
            : rowIndex === 7 && itemIndex === 0 ? 'border-x border-b border-accented'
              : rowIndex === 7 && itemIndex === 3 ? 'border-r border-b border-accented'
                : rowIndex === 0 && itemIndex === 3 ? 'border-y border-r border-accented'
                  : rowIndex === 0 ? 'border-r border-y border-accented'
                    : itemIndex === 0 ? 'border-b border-x border-accented'
                      : 'border-r border-b border-accented'"
          :rounded="rowIndex === 0 && itemIndex === 0 ? 'rounded-tl-2xl'
            : rowIndex === 0 && itemIndex === 3 ? 'rounded-tr-2xl'
              : rowIndex === 7 && itemIndex === 0 ? 'rounded-bl-2xl'
                : rowIndex === 7 && itemIndex === 3 ? 'rounded-br-2xl' : ''" />
      </template>
    </div>
  </div>
</template>