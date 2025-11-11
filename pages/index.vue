<script setup lang="ts">
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import stackoverflow from '~/components/icons/stackoverflow.vue'
import github from '~/components/icons/github.vue'
import linkedin from '~/components/icons/linkedin.vue'
import Card1 from '~/components/portfolioCards/1Card.vue';

const openAd = ref(false);
</script>

<template>
  <div class="p-8 h-full w-full flex">
    <div class="flex flex-col justify-center pl-8 h-full w-full">
      <div class="flex flex-col w-fit" id="homeContentWrapper">
        <div class="font-bold mb-5 homeTitle" style="line-height: 1;">
          <p class="text-[4rem] varela">Hello, I'm Faeq</p>
          <MazAnimatedElement direction="up" :duration="700" :delay="300">
            <p class="text-[2.3rem] varela">A software engineer</p>
          </MazAnimatedElement>
        </div>
        <div class="mb-5">
          <MazAnimatedElement direction="up" :duration="700" :delay="450">
            <div id="ad" class="text-center clickable w-7/12"
              @click="openAd = true">
              Featured work preview:&nbsp;&nbsp;<span
                class="varela">Quokka</span>
            </div>
          </MazAnimatedElement>
        </div>
        <div id="HomeSocialButtonGroup" class="">
          <MazAnimatedElement direction="right" :duration="700" :delay="600"
            class="inline">
            <a href="mailto:faeqfaisal@hotmail.co.uk" target="_blank">
              <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
                <button
                  class="lg:inline-flex hidden items-center gap-2 pr-4 py-2 rounded-full  text-current justify-center mr-3 pl-4 w-16 ml-1">
                  <UIcon name="i-lucide-mail"
                    class="!size-5 contrast-0 hover:contrast-100  transition-all ease-in-out duration-200" />
                </button>
                <template #content>
                  <p class="p-1 text-sm">Email</p>
                </template>
              </UPopover>
            </a>
          </MazAnimatedElement>
          <MazAnimatedElement direction="right" :duration="700" :delay="700"
            class="inline">
            <a href="https://linkedin.com/in/faeq" target="_blank">
              <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
                <button
                  class="lg:inline-flex hidden items-center gap-2 pr-4 py-2 rounded-full  text-current justify-center mr-3 pl-4 w-16">
                  <linkedin
                    class="grayscale contrast-0 hover:contrast-100 hover:grayscale-0 transition-all ease-in-out duration-200 size-5 dark:hover:grayscale dark:hover:invert dark:hover:contrast-300" />
                </button>
                <template #content>
                  <p class="p-1 text-sm">LinkedIn</p>
                </template>
              </UPopover>
            </a>
          </MazAnimatedElement>
          <MazAnimatedElement direction="right" :duration="700" :delay="800"
            class="inline">
            <a href="https://github.com/Faeq-F" target="_blank">
              <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
                <button
                  class="lg:inline-flex hidden items-center gap-2 pr-4 py-2 rounded-full  text-current justify-center mr-3 w-16 pl-4">
                  <github
                    class="contrast-0 hover:contrast-100 transition-all ease-in-out duration-200 size-5 dark:hover:invert-100" />
                </button>
                <template #content>
                  <p class="p-1 text-sm">GitHub</p>
                </template>
              </UPopover>
            </a>
          </MazAnimatedElement>
          <MazAnimatedElement direction="right" :duration="700" :delay="900"
            class="inline">
            <a href="http://stackoverflow.com/users/13165763/faeq"
              target="_blank">
              <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
                <button
                  class="lg:inline-flex hidden items-center gap-2 pr-4 py-2 rounded-full  text-current justify-center mr-3 w-16 pl-4">
                  <stackoverflow
                    class="grayscale hover:grayscale-0 transition-all ease-in-out duration-200 size-5" />
                </button>
                <template #content>
                  <p class="p-1 text-sm">StackOverflow</p>
                </template>
              </UPopover>
            </a>
          </MazAnimatedElement>
          <MazAnimatedElement direction="right" :duration="700" :delay="1000"
            class="inline">
            <a href="sms:+447775901092?&amp;body=Hello%Faeq," target="_blank">
              <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
                <button
                  class="lg:inline-flex hidden items-center gap-2 pr-4 py-2 rounded-full  text-current justify-center mr-3 w-16 pl-4">
                  <UIcon name="i-lucide-message-square-text"
                    class="!size-5 contrast-0 hover:contrast-100  transition-all ease-in-out duration-200" />
                </button>
                <template #content>
                  <p class="p-1 text-sm">SMS</p>
                </template>
              </UPopover>
            </a>
          </MazAnimatedElement>
          <MazAnimatedElement direction="right" :duration="700" :delay="1100"
            class="inline">
            <a href="https://cal.com/Faeq-F" target="_blank">
              <UPopover mode="hover" :ui="{ content: 'popoverContent' }">
                <button
                  class="lg:inline-flex hidden items-center gap-2 py-2 rounded-full  text-current justify-center mr-3 w-9 ">
                  <UIcon name="i-lucide-calendar-plus-2"
                    class="!size-5 contrast-0 hover:contrast-100  transition-all ease-in-out duration-200" />
                </button>
                <template #content>
                  <p class="p-1 text-sm">Book a meeting</p>
                </template>
              </UPopover>
            </a>
          </MazAnimatedElement>
        </div>
      </div>
    </div>
    <div>
      <UAlert title="This site is in development!" color="neutral"
        variant="outline" class="cardShadow w-96"
        description="Some content is not available" icon="i-lucide-wrench" />
      <MazAnimatedElement direction="left" :duration="700" v-if="openAd">
        <div
          class="absolute -left-[35vw] h-96 w-[40vw] mr-52 mt-34 rounded-2xl bg-transparent">
          <Card1 />
        </div>
      </MazAnimatedElement>
    </div>
  </div>
</template>

<style>
#HomeSocialButtonGroup button {
  transition: all;
  transition-duration: .2s;
  border-style: solid;
  color: #212126;
}

.zTheme #HomeSocialButtonGroup button {
  background: #fff;
}

.aTheme #HomeSocialButtonGroup button {
  box-shadow: #00000014 0 5px 15px, #191c2133 0 15px 35px -5px, #00000012 0 0 0 1px;
  background: #fff;
}

.dark #HomeSocialButtonGroup button {
  color: #deded9;
}

.dark.zTheme #HomeSocialButtonGroup button {
  background: #000;
}

.dark.aTheme #HomeSocialButtonGroup button {
  background: #000;
  box-shadow: #ffffff14 0 5px 15px, #e6e3de33 0 15px 35px -5px, #ffffff12 0 0 0 1px;
}

.zTheme .homeTitle {
  word-spacing: 0.5rem;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
}

.dark.zTheme .homeTitle {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

html:not(.aTheme, .zTheme) .popoverContent {
  padding: 0.25rem;
}

html:not(.aTheme, .zTheme) .homeTitle {
  font-weight: 600;
  font-style: italic;
}

html:not(.aTheme, .zTheme) #homeContentWrapper {
  padding: 2rem;
  margin-left: 6rem;
  background-position: center;
  background-size: cover;
  border-radius: 16px;
  color: #fff;
}

html:not(.aTheme, .zTheme, .mTheme) #homeContentWrapper {
  color: #222;
}

html.dark:not(.aTheme, .zTheme, .mTheme) #homeContentWrapper {
  color: #eee;
}

html.dark.mTheme #homeContentWrapper {
  color: #222;
}

html:not(.aTheme, .zTheme) #homeContentWrapper .homeTitle {
  padding-left: 1rem;
}

html:not(.aTheme, .zTheme) #homeContentWrapper .homeTitle>p {
  padding-bottom: 0.5rem;
}

@property --adColor {
  syntax: '<color>';
  initial-value: #999999aa;
  inherits: false;
}

@property --adColor1 {
  syntax: '<color>';
  initial-value: transparent;
  inherits: false;
}

@property --adColor2 {
  syntax: '<color>';
  initial-value: #a45848aa;
  inherits: false;
}

#ad {
  background: linear-gradient(135deg, var(--adColor1) 0%, var(--adColor) 25%, var(--adColor) 75%, var(--adColor1) 100%);
  border-radius: 2rem;
  margin-left: 0rem;
  color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  transition: --adColor1 0.5s, --adColor 0.5s;

  &:hover {
    background: linear-gradient(135deg, var(--adColor1) 0%, var(--adColor) 15%, var(--adColor) 85%, var(--adColor1) 100%);
    --adColor1: #999999aa;
    --adColor: transparent;
    color: var(--adColor1);
  }
}

html.dark:not(.mTheme) #ad:hover,
html.mTheme #ad:hover {
  color: #fff;
}

html.dark.mTheme #ad,
html.dark.mTheme #ad:hover {
  color: #000;
}

html.zTheme #ad:hover {
  color: #314158;
}

html:not(.aTheme, .zTheme, .mTheme) #ad {
  margin-left: 0.75rem;
  background: linear-gradient(135deg, var(--adColor1) 0%, var(--adColor2) 25%, var(--adColor2) 75%, var(--adColor1) 100%);

  &:hover {
    background: linear-gradient(135deg, var(--adColor1) 0%, var(--adColor2) 15%, var(--adColor2) 85%, var(--adColor1) 100%);
    --adColor1: #a45848aa;
    --adColor2: transparent;
  }
}
</style>