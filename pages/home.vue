<script setup lang="ts">
import MazAnimatedElement from 'maz-ui/components/MazAnimatedElement'
import MazAnimatedText from 'maz-ui/components/MazAnimatedText'
import SocialButtons from '~/components/social/SocialButtons.vue'
</script>

<template>
  <div
    class="p-4 md:p-8 h-full w-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
    <div
      class="flex flex-col justify-center pl-2 md:pl-8 h-auto md:h-full w-full">
      <div class="flex flex-col w-fit" id="homeContentWrapper">
        <div class="font-bold mb-5 homeTitle mt-16 md:mt-0"
          style="line-height: 1;">
          <MazAnimatedText tag="p" text="Hello, I'm Faeq" :delay="300"
            :duration="1000" direction="up"
            class="text-[2.5rem] md:text-[4rem] varela" />
          <MazAnimatedText tag="p" text="A software engineer" :delay="800"
            :duration="800" direction="up"
            class="text-[1.5rem] md:text-[2.3rem] varela" />
        </div>
      </div>
      <SocialButtons />
    </div>
    <div class="mt-4 md:mt-0 md:ml-auto flex-shrink-0">
      <MazAnimatedElement direction="left" :duration="700" :delay="2000">
        <UAlert title="This site is in development!" color="neutral"
          variant="outline" class="cardShadow w-70 md:w-96 ml-4 md:ml-0"
          description="Some content is not available" icon="i-lucide-wrench" />
      </MazAnimatedElement>
    </div>
  </div>
</template>

<style>
html.petalTheme #HomeSocialButtonGroup>div:last-child button,
html:not(.aTheme, .zTheme) #HomeSocialButtonGroup>div:last-child button {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

html.zTheme #HomeSocialButtonGroup>div:last-child button,
html.aTheme #HomeSocialButtonGroup>div:last-child button {
  width: 2.25rem;
}

#HomeSocialButtonGroup button {
  transition: all;
  transition-duration: .2s;
  border-style: solid;
  color: #212126;
}

.zTheme #HomeSocialButtonGroup button {
  background: #fff;
  box-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5), 1px -1px 0 rgba(0, 0, 0, 0.5), -1px 1px 0 rgba(0, 0, 0, 0.5), 1px 0 rgba(0, 0, 0, 0.5);
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

html:not(.zTheme, .mTheme, .aTheme, .petalTheme) .homeTitle,
.zTheme .homeTitle {
  word-spacing: 0.5rem;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
}

html.dark:not(.zTheme, .mTheme, .aTheme, .petalTheme) .homeTitle,
.dark.zTheme .homeTitle {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}

html.petalTheme .popoverContent,
html:not(.aTheme, .zTheme) .popoverContent {
  padding: 0.25rem;
}

.homeTitle {
  font-weight: 600;
  font-style: italic;
}

html:not(.zTheme, .mTheme, .aTheme, .petalTheme) .homeTitle,
html:not(.zTheme, .mTheme, .aTheme, .petalTheme) .homeTitle .varela {
  font-style: normal !important;
}

#homeContentWrapper {
  padding: 1rem;
  padding-bottom: 0;
  margin-left: 0;
  background-position: center;
  background-size: cover;
  border-radius: 16px;
  color: #fff;
}

@media (min-width: 768px) {
  #homeContentWrapper {
    padding: 2rem;
    padding-bottom: 0;
    margin-left: 6rem;
  }
}

html.petalTheme #homeContentWrapper,
html:not(.mTheme) #homeContentWrapper {
  color: #222;
}

html.dark.petalTheme #homeContentWrapper,
html.dark:not(.aTheme, .zTheme, .mTheme) #homeContentWrapper {
  color: #eee;
}

html.dark.mTheme #homeContentWrapper {
  color: #222;
}

html.dark.zTheme #homeContentWrapper,
html.dark.aTheme #homeContentWrapper {
  color: #fff;
}

html.petalTheme #homeContentWrapper .homeTitle,
html:not(.aTheme, .zTheme) #homeContentWrapper .homeTitle {
  padding-left: 1rem;
}

html.petalTheme #homeContentWrapper .homeTitle>p,
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
</style>