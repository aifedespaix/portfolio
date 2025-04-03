<script setup lang="ts">
import type { I18nKey } from '~/types/i18n'
import { computed } from 'vue'
import { useHeadTag } from '~/composables/head-tag'

const { t } = useI18n()

useHeadTag({
  title: computed(() => t('pages.technologies.meta.title')),
  description: computed(() => t('pages.technologies.meta.description')),
  type: 'website',
})

interface Technology {
  name: string
  description: I18nKey
  url: string
  experience: number
  icon: string
  utilisation: I18nKey
  apports?: I18nKey
  libraries: Library[]
}

interface Library {
  name: string
  description: I18nKey
  url: string
  experience: number
  icon: string
  utilisation: I18nKey
  apports?: I18nKey
  creations?: Creation[]
}

interface Creation {
  name: string | I18nKey
  id: string
}
const projectsStore = useProjectsStore()
const technologies: Record<string, Technology> = {
  javascript: {
    name: 'JavaScript & TypeScript',
    description: 'pages.technologies.languages.javascript.description',
    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
    experience: new Date().getFullYear() - 2015,
    icon: 'i-mdi:language-javascript',
    utilisation: 'pages.technologies.languages.javascript.utilisation',
    libraries: [
      {
        name: 'Vue.js',
        description: 'pages.technologies.languages.javascript.libraries.vue.description',
        url: 'https://vuejs.org/',
        experience: new Date().getFullYear() - 2017,
        icon: 'i-mdi:vuejs',
        utilisation: 'pages.technologies.languages.javascript.libraries.vue.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.vue.apports',
        creations: [
          projectsStore.projectList['map-game'],
          projectsStore.projectList['map-education'],
          projectsStore.projectList['interface-administration'],
          projectsStore.projectList['game-666'],
          projectsStore.projectList['mini-games'],
        ],
      },
      {
        name: 'React',
        description: 'pages.technologies.languages.javascript.libraries.react.description',
        url: 'https://reactjs.org/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:react',
        utilisation: 'pages.technologies.languages.javascript.libraries.react.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.react.apports',
        creations: [
          projectsStore.projectList['video-learning'],
        ],
      },
      {
        name: 'Angular',
        description: 'pages.technologies.languages.javascript.libraries.angular.description',
        url: 'https://angular.dev/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:angular',
        utilisation: 'pages.technologies.languages.javascript.libraries.angular.utilisation',
      },
      {
        name: 'Leaflet',
        description: 'pages.technologies.languages.javascript.libraries.leaflet.description',
        url: 'https://leafletjs.com/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:leaf',
        utilisation: 'pages.technologies.languages.javascript.libraries.leaflet.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.leaflet.apports',
        creations: [
          projectsStore.projectList['map-education'],
          projectsStore.projectList['map-game'],
        ],
      },
      {
        name: 'NestJS',
        description: 'pages.technologies.languages.javascript.libraries.nestjs.description',
        url: 'https://nestjs.com/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-simple-icons:nestjs',
        utilisation: 'pages.technologies.languages.javascript.libraries.nestjs.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.nestjs.apports',
        creations: [
          projectsStore.projectList['bot-chat'],
        ],
      },
      {
        name: 'Firebase',
        description: 'pages.technologies.languages.javascript.libraries.firebase.description',
        url: 'https://firebase.google.com/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:firebase',
        utilisation: 'pages.technologies.languages.javascript.libraries.firebase.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.firebase.apports',
        creations: [
          projectsStore.projectList['interface-administration'],
        ],
      },
      {
        name: 'Three.js',
        description: 'pages.technologies.languages.javascript.libraries.threejs.description',
        url: 'https://threejs.org/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-tabler:brand-threejs',
        utilisation: 'pages.technologies.languages.javascript.libraries.threejs.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.threejs.apports',
        creations: [
          projectsStore.projectList['video-learning'],
          projectsStore.projectList['mini-games'],
        ],
      },

    ],
  },
  php: {
    name: 'PHP',
    description: 'pages.technologies.languages.php.description',
    utilisation: 'pages.technologies.languages.php.utilisation',
    experience: new Date().getFullYear() - 2018,
    icon: 'i-mdi:language-php',
    url: 'https://www.php.net/',
    libraries: [
      {
        name: 'Symfony',
        description: 'pages.technologies.languages.php.libraries.symfony.description',
        url: 'https://symfony.com/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:symfony',
        utilisation: 'pages.technologies.languages.php.libraries.symfony.utilisation',
        apports: 'pages.technologies.languages.php.libraries.symfony.apports',
      },
      {
        name: 'WordPress',
        description: 'pages.technologies.languages.php.libraries.wordpress.description',
        url: 'https://wordpress.org/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:wordpress',
        utilisation: 'pages.technologies.languages.php.libraries.wordpress.utilisation',
        creations: [
          projectsStore.projectList['map-education'],
        ],
        apports: 'pages.technologies.languages.php.libraries.wordpress.apports',
      },
    ],
  },
}

interface Software {
  name: string
  description: I18nKey
  url: string
  experience: number
  icon: {
    name: string
    classes?: string
  }
  utilisation: I18nKey
  class?: string
}

const softwares: Record<string, Software> = {
  photoshop: {
    name: 'Photoshop',
    utilisation: 'pages.technologies.softwares.photoshop.utilisation',
    description: 'pages.technologies.softwares.photoshop.description',
    url: 'https://www.adobe.com/fr/products/photoshop.html',
    experience: new Date().getFullYear() - 2013,
    icon: {
      name: 'i-logos:adobe-photoshop',
    },
  },
  illustrator: {
    name: 'Illustrator',
    description: 'pages.technologies.softwares.illustrator.description',
    utilisation: 'pages.technologies.softwares.illustrator.utilisation',
    url: 'https://www.adobe.com/fr/products/premiere.html',
    experience: 4,
    icon: {
      name: 'i-logos:adobe-illustrator',
    },
  },
  premierePro: {
    name: 'Premiere Pro',
    description: 'pages.technologies.softwares.premierePro.description',
    utilisation: 'pages.technologies.softwares.premierePro.utilisation',
    url: 'https://www.adobe.com/fr/products/premiere.html',
    experience: new Date().getFullYear() - 2010,
    icon: {
      name: 'i-logos:adobe-premiere',

    },
  },
  afterEffects: {
    name: 'After Effects',
    description: 'pages.technologies.softwares.afterEffects.description',
    utilisation: 'pages.technologies.softwares.afterEffects.utilisation',
    url: 'https://www.adobe.com/fr/products/aftereffects.html',
    experience: new Date().getFullYear() - 2019,
    icon: {
      name: 'i-logos:adobe-after-effects',

    },
  },
  davinciResolve: {
    name: 'DaVinci Resolve',
    description: 'pages.technologies.softwares.davinciResolve.description',
    url: 'https://www.blackmagicdesign.com/fr/products/davinciresolve',
    experience: new Date().getFullYear() - 2022,
    icon: {
      name: 'i-simple-icons:davinciresolve',

    },
    utilisation: 'pages.technologies.softwares.davinciResolve.utilisation',
  },
  vscode: {
    name: 'VSCode',
    description: 'pages.technologies.softwares.vscode.description',
    url: 'https://code.visualstudio.com/',
    experience: new Date().getFullYear() - 2017,
    icon: {
      name: 'i-logos:visual-studio-code',

    },
    utilisation: 'pages.technologies.softwares.vscode.utilisation',
  },
  obsStudio: {
    name: 'OBS Studio',
    description: 'pages.technologies.softwares.obsStudio.description',
    url: 'https://obsproject.com/',
    experience: new Date().getFullYear() - 2020,
    icon: {
      name: 'i-simple-icons:obsstudio',

    },
    utilisation: 'pages.technologies.softwares.obsStudio.utilisation',
  },
}
</script>

<template>
  <Pager>
    <TitleMain>{{ t('pages.technologies.meta.title') }}</TitleMain>
    <Card>
      <p class="text-justify">
        {{ t('pages.technologies.description') }}
      </p>
    </Card>

    <TitleH2>
      {{ t('pages.technologies.titles.languages') }}
    </TitleH2>

    <Card v-for="technologie in technologies" :key="technologie.name">
      <div class="flex items-center gap-2">
        <div
          :class="technologie.icon"
          class="h-14 w-14 flex items-center justify-center rounded-full text-4xl"
          text="blue-600 dark:blue-400"
        />
        <div>
          <TitleH2 class="mb-0! pb-0!">
            {{ t(technologie.name) }}
          </TitleH2>
          <div class="flex items-center gap-2 text-gray-500">
            <div class="font-bold">
              {{ t('pages.technologies.experience', { count: technologie.experience }) }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 text-justify">
        <p class="italic">
          {{ t(technologie.description) }}
        </p>
        <p class="mt-2">
          {{ t(technologie.utilisation) }}
        </p>
        <p v-if="technologie.apports" class="mt-2">
          {{ t(technologie.apports) }}
        </p>
      </div>

      <div class="mt-4">
        <a
          :href="technologie.url"
          target="_blank"
          class="w-fit flex items-center gap-2 rounded-md p-2 text-blue-600 dark:text-blue-400"
          transition="bg duration-300 ease-in-out"
          hover="bg-black/20"
        >
          <div class="i-mdi:web" />
          <div>{{ t('pages.technologies.website.title') }}</div>
        </a>
      </div>

      <div v-if="technologie.libraries?.length" class="mt-6">
        <TitleH3>{{ t('pages.technologies.titles.libraries') }}</TitleH3>
        <div class="grid gap-4" sm="grid-cols-2">
          <div
            v-for="lib in technologie.libraries"
            :key="lib.name"
            class="flex flex-col rounded-lg p-4"
          >
            <div class="mb-2 flex items-center gap-2">
              <div :class="lib.icon" class="text-2xl" text="blue-600 dark:blue-400" />
              <div class="font-bold">
                {{ t(lib.name) }}
              </div>
            </div>

            <div class="flex-1 text-justify">
              <p class="mb-2 text-sm italic">
                {{ t(lib.description) }}
              </p>
              <p class="mb-2 text-sm">
                {{ t(lib.utilisation) }}
              </p>
              <p v-if="lib.apports" class="mb-2 text-sm">
                {{ t(lib.apports) }}
              </p>
              <a
                :href="lib.url"
                target="_blank"
                class="mt-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400"
                hover="underline"
              >
                <div class="i-mdi:web text-sm" />
                <div>{{ t('pages.technologies.documentation') }}</div>
              </a>
            </div>

            <div v-if="lib.creations?.length" class="mt-2">
              <div class="mb-1 text-sm font-bold">
                {{ t('pages.technologies.titles.creations') }} :
              </div>
              <div class="flex flex-wrap gap-2">
                <LinkMini v-for="creation in lib.creations" :key="creation.id" :to="`/projects/${creation.id}`">
                  {{ t(creation.name) }}
                </LinkMini>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <TitleH2 class="mt-6">
      {{ t('pages.technologies.titles.softwares') }}
    </TitleH2>

    <div class="grid grid-cols-1 gap-2" md="grid-cols-2">
      <Card v-for="software in softwares" :key="software.name">
        <div class="flex items-center gap-2">
          <div
            :class="[software.icon.name]"
            class="h-14 w-14 flex items-center justify-center text-4xl" text="blue-600 dark:blue-400"
          />
          <div class="pl-2">
            <TitleH2 class="mb-0! mt-0! pb-0!">
              {{ t(software.name) }}
            </TitleH2>
            <div class="flex items-center gap-2 text-gray-500">
              <div class="font-bold">
                {{ t('pages.technologies.experience', { count: software.experience }) }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 text-justify">
          <p class="italic">
            {{ t(software.description) }}
          </p>
          <p class="mt-4">
            {{ t(software.utilisation) }}
          </p>
        </div>

        <div class="mt-4">
          <a
            :href="software.url"
            target="_blank"
            class="w-fit flex items-center gap-2 rounded-md p-2 text-blue-600 dark:text-blue-400"
            transition="bg duration-300 ease-in-out"
            hover="bg-black/20"
          >
            <div class="i-mdi:web" />
            <div>{{ t('pages.technologies.website.title') }}</div>
          </a>
        </div>
      </Card>
    </div>
  </Pager>
</template>
