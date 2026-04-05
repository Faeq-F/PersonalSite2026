import { Script } from "vm";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: "/PersonalSite2025/",
    buildAssetsDir: "assets",
    head: {
      link: [{ rel: "icon", type: "image/svg", href: "/PersonalSite2025/favicon.png" }],
      title: "<Faeq />"
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  router: {
    options: {
      scrollBehaviorType: "smooth"
    },
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        supported: {
          'top-level-await': true,
        },
      },
    },
    esbuild: {
      supported: {
        'top-level-await': true,
      },
    }
  },
  vue: {
    compilerOptions: {
      whitespace: 'preserve'
    }
  },
  css: [
    "~/assets/css/main.css"
  ],
  modules: [
    "lenis/nuxt",
    "@maz-ui/nuxt",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],
  mazUi: {
    theme: {
      preset: 'maz-ui',
      overrides: {
        colors: {
          light: {
            primary: '0 0% 0%',
            secondary: '266 100% 84%',
            info: '215 100% 83%',
            success: '130 51% 65%',
            warning: '44 100% 47%',
            destructive: '357 96% 58%',
            muted: '0 0% 54%',
            contrast: '0 0% 85%',
          },
          dark: {
            primary: '0 0% 100%',
            secondary: '266 100% 84%',
            info: '215 100% 83%',
            success: '130 51% 65%',
            warning: '44 100% 47%',
            destructive: '357 96% 58%',
            muted: '0 0% 54%',
            contrast: '210 8% 14%',
          },
        },
      },
      strategy: 'hybrid',
      darkModeStrategy: 'class',
    },
    translations: {
      locale: 'en',
      fallbackLocale: 'en',
    },
    plugins: {
      aos: true,
      dialog: true,
      toast: true,
      wait: true,
    },
    directives: {
      vTooltip: true,
      vLazyImg: true,
      vClickOutside: true,
    },
  },
  icon: {
    clientBundle: {
      icons: [],
      scan: true,
      includeCustomCollections: true,
      sizeLimitKb: 256,
    },
  },
});
