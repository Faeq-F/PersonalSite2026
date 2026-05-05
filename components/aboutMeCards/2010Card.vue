<template>
  <UCard
    class="m-5 my-4 opacity-80 cardShadow border border-[var(--ui-border)]">
    <template #header>
      <div class="flex justify-between">
        <span class="flex items-center">
          2010
          <USeparator orientation="vertical" class="h-4 inline-block mx-4" />
          Modding
        </span>
        <span class="opacity-70">
          6 years old
        </span>
      </div>
    </template>

    <div class="flex flex-col md:flex-row justify-between aboutContent">
      <div class="leading-[1.9] -mt-2 min-w-0">
        My journey began with digital games. I was completely immersed,
        from the puzzle
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://en.wikipedia.org/wiki/Windows_Desktop_Gadgets"
            target="_blank" class="boxLink">widget</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Windows Desktop Gadgets</p>
          </template>
        </UPopover> on
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://en.wikipedia.org/wiki/Windows_XP"
            target="_blank" class="boxLink">Windows XP</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Windows XP</p>
          </template>
        </UPopover>, to the exhilarating 3D
        Brawlers on the
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link to="https://en.wikipedia.org/wiki/Wii" target="_blank"
            class="boxLink">Nintendo Wii</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See Nintendo Wii</p>
          </template>
        </UPopover>.
        <div class="h-4"></div>
        This soon led me to successfully
        modifying my Wii console to accommodate SD-cards formatted with the
        <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
          <nuxt-link
            to="https://web.archive.org/web/20230303133311/https://wbfsmanager.com/"
            target="_blank" class="boxLink">WBFS manager</nuxt-link>
          <template #content>
            <p class="p-1 text-sm">See WBFS manager</p>
          </template>
        </UPopover>, allowing me to play any game without the need of a
        physical copy.
        <div class="h-4"></div>
        This initiated my profound interest in technology
        and its vast potential. I quickly became a proficient tinkerer,
        focusing on high levels of customization.
      </div>
      <div class="flex flex-row mt-4 md:mt-0 md:mx-4">
        <USeparator orientation="vertical"
          class="hidden md:block self-center h-[6rem] mr-4" />
        <img src="/media/TimeLineImage1.png"
          class="rounded-lg md:h-[9rem] w-full md:w-auto object-contain" />
      </div>
    </div>
  </UCard>
</template>