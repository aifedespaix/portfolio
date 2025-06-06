<script setup lang="ts">
import type { I18nKey } from '~/types/i18n'
import type { ProjectRouteKey } from '~/types/route.type'
import { computed } from 'vue'
import { useHeadTag } from '~/composables/head-tag'

const { t } = useTranslationsStore()

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
  id: ProjectRouteKey
}

const technologiesStore = useTechnologiesStore()
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
        ...technologiesStore.technologies.vue3,
        description: 'pages.technologies.languages.javascript.libraries.vue.description',

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
          projectsStore.projectList['game-engine'],
          projectsStore.projectList['groove-box'],
        ],
      },
      {
        ...technologiesStore.technologies.react,
        description: 'pages.technologies.languages.javascript.libraries.react.description',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:react',
        utilisation: 'pages.technologies.languages.javascript.libraries.react.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.react.apports',
        creations: [
          projectsStore.projectList['video-learning'],
        ],
      },
      {
        ...technologiesStore.technologies.angular,
        description: 'pages.technologies.languages.javascript.libraries.angular.description',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:angular',
        utilisation: 'pages.technologies.languages.javascript.libraries.angular.utilisation',
      },
      {
        ...technologiesStore.technologies.leaflet,
        description: 'pages.technologies.languages.javascript.libraries.leaflet.description',
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
        ...technologiesStore.technologies.nestjs,
        description: 'pages.technologies.languages.javascript.libraries.nestjs.description',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-simple-icons:nestjs',
        utilisation: 'pages.technologies.languages.javascript.libraries.nestjs.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.nestjs.apports',
        creations: [
          projectsStore.projectList['bot-chat'],
        ],
      },
      {
        ...technologiesStore.technologies.firebase,
        description: 'pages.technologies.languages.javascript.libraries.firebase.description',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:firebase',
        utilisation: 'pages.technologies.languages.javascript.libraries.firebase.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.firebase.apports',
        creations: [
          projectsStore.projectList['interface-administration'],
        ],
      },
      {
        ...technologiesStore.technologies.threejs,
        description: 'pages.technologies.languages.javascript.libraries.threejs.description',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-tabler:brand-threejs',
        utilisation: 'pages.technologies.languages.javascript.libraries.threejs.utilisation',
        apports: 'pages.technologies.languages.javascript.libraries.threejs.apports',
        creations: [
          projectsStore.projectList['video-learning'],
          projectsStore.projectList['mini-games'],
          projectsStore.projectList['game-engine'],
        ],
      },
    ],
  },
  python: {
    name: 'Python',
    description: 'pages.technologies.languages.python.description',
    utilisation: 'pages.technologies.languages.python.utilisation',
    experience: new Date().getFullYear() - 2022,
    icon: 'i-mdi:language-python',
    url: 'https://www.python.org/',
    libraries: [
      {
        ...technologiesStore.technologies.pygame,
        description: 'pages.technologies.languages.python.libraries.pygame.description',
        experience: new Date().getFullYear() - 2024,
        icon: 'i-mdi:snake',
        utilisation: 'pages.technologies.languages.python.libraries.pygame.utilisation',
        apports: 'pages.technologies.languages.python.libraries.pygame.apports',
      },
      {
        ...technologiesStore.technologies.pandas,
        description: 'pages.technologies.languages.python.libraries.pandas.description',
        experience: new Date().getFullYear() - 2024,
        icon: 'i-mdi:panda',
        utilisation: 'pages.technologies.languages.python.libraries.pandas.utilisation',
        apports: 'pages.technologies.languages.python.libraries.pandas.apports',
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
        ...technologiesStore.technologies.symfony,
        description: 'pages.technologies.languages.php.libraries.symfony.description',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:symfony',
        utilisation: 'pages.technologies.languages.php.libraries.symfony.utilisation',
        apports: 'pages.technologies.languages.php.libraries.symfony.apports',
      },
      {
        ...technologiesStore.technologies.wordpress,
        description: 'pages.technologies.languages.php.libraries.wordpress.description',
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
  docker: {
    name: 'Docker',
    utilisation: 'pages.technologies.softwares.docker.utilisation',
    description: 'pages.technologies.softwares.docker.description',
    url: 'https://www.docker.com/',
    experience: new Date().getFullYear() - 2018,
    icon: {
      name: 'i-logos:docker',
    },
  },
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
    <TitleMain v-reveal>
      {{ t('pages.technologies.meta.title') }}
    </TitleMain>
    <Card>
      <p v-reveal class="text-justify">
        {{ t('pages.technologies.description') }}
      </p>
    </Card>

    <TitleH2 v-reveal>
      {{ t('pages.technologies.titles.languages') }}
    </TitleH2>

    <Card v-for="technologie in technologies" :key="technologie.name">
      <div v-reveal class="flex items-center gap-2">
        <div
          :class="technologie.icon"
          class="h-14 w-14 flex items-center justify-center rounded-full text-4xl"
          text="blue-600 dark:blue-400"
        />
        <div>
          <TitleH2 class="mb-0! pb-0!">
            {{ technologie.name }}
          </TitleH2>
          <div class="flex items-center gap-2 text-gray-500">
            <div class="font-bold">
              {{ t('pages.technologies.experience', { count: technologie.experience }) }}
            </div>
          </div>
        </div>
      </div>

      <div v-reveal class="mt-4 text-justify">
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

      <div v-reveal class="mt-4">
        <a
          :href="technologie.url"
          target="_blank"
          class="w-fit flex items-center gap-2 rounded-md p-2 text-blue-600 dark:text-blue-400"
          transition="bg duration-300 ease-in-out"
          hover="bg-black/20"
        >
          <div class="i-mdi:web" />
          <div>{{ t('pages.technologies.website.title') }}</div>
          <div class="i-mdi:external-link ml-1 inline-block text-xs" />
        </a>
      </div>

      <div v-if="technologie.libraries?.length" class="mt-6">
        <TitleH3 v-reveal>
          {{ t('pages.technologies.titles.libraries') }}
        </TitleH3>
        <div class="grid gap-4" sm="grid-cols-2">
          <div
            v-for="lib in technologie.libraries"
            :key="lib.name"
            v-reveal
            class="flex flex-col rounded-lg p-4"
          >
            <div class="mb-2 flex items-center gap-2">
              <div :class="lib.icon" class="text-2xl" text="blue-600 dark:blue-400" />
              <div class="font-bold">
                {{ lib.name }}
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
                <div class="i-mdi:external-link ml-1 inline-block text-xs" />
              </a>
            </div>

            <div v-if="lib.creations?.length" class="mt-2">
              <div class="mb-1 text-sm font-bold">
                {{ t('pages.technologies.titles.creations') }}
              </div>
              <div class="flex flex-wrap gap-2">
                <LinkMini v-for="creation in lib.creations" :key="creation.id" :to="creation.id">
                  {{ t(creation.name) }}
                </LinkMini>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <TitleH2 v-reveal class="mt-6">
      {{ t('pages.technologies.titles.softwares') }}
    </TitleH2>

    <div class="grid grid-cols-1 gap-2" md="grid-cols-2">
      <Card v-for="software in softwares" :key="software.name">
        <div v-reveal class="flex items-center gap-2">
          <div
            :class="[software.icon.name]"
            class="h-14 w-14 flex items-center justify-center text-4xl" text="blue-600 dark:blue-400"
          />
          <div class="pl-2">
            <TitleH2 class="mb-0! mt-0! pb-0!">
              {{ software.name }}
            </TitleH2>
            <div class="flex items-center gap-2 text-gray-500">
              <div class="font-bold">
                {{ t('pages.technologies.experience', { count: software.experience }) }}
              </div>
            </div>
          </div>
        </div>

        <div v-reveal class="flex-1 text-justify">
          <p class="italic">
            {{ t(software.description) }}
          </p>
          <p class="mt-4">
            {{ t(software.utilisation) }}
          </p>
        </div>

        <div v-reveal class="mt-4">
          <a
            :href="software.url"
            target="_blank"
            class="w-fit flex items-center gap-2 rounded-md p-2 text-blue-600 dark:text-blue-400"
            transition="bg duration-300 ease-in-out"
            hover="bg-black/20"
          >
            <div class="i-mdi:web" />
            <div>{{ t('pages.technologies.website.title') }}</div>
            <div class="i-mdi:external-link ml-1 inline-block text-xs" />
          </a>
        </div>
      </Card>
    </div>
  </Pager>
</template>
