<script setup lang="ts">
import { computed } from 'vue'
import { useHeadTag } from '~/composables/head-tag'

const { t } = useI18n()

useHeadTag({
  title: t('page.title'),
  description: t('page.description'),
  type: 'website',
})

interface Technology {
  name: string
  description: ComputedRef<string>
  url: string
  experience: number
  icon: string
  utilisation: ComputedRef<string>
  apports?: string
  libraries: Library[]
}

interface Library {
  name: string
  description: ComputedRef<string>
  url: string
  experience: number
  icon: string
  utilisation: ComputedRef<string>
  apports?: ComputedRef<string>
  creations?: Creation[]
}

interface Creation {
  name: string | ComputedRef<string>
  id: string
}
const projectsStore = useProjectsStore()
const technologies: Record<string, Technology> = {
  javascript: {
    name: 'JavaScript & TypeScript',
    description: computed(() => t('technologies.javascript.description')),
    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
    experience: new Date().getFullYear() - 2015,
    icon: 'i-mdi:language-javascript',
    utilisation: computed(() => t('technologies.javascript.utilisation')),
    libraries: [
      {
        name: 'Vue.js',
        description: computed(() => t('technologies.javascript.libraries.vue.description')),
        url: 'https://vuejs.org/',
        experience: new Date().getFullYear() - 2017,
        icon: 'i-mdi:vuejs',
        utilisation: computed(() => t('technologies.javascript.libraries.vue.utilisation')),
        apports: computed(() => t('technologies.javascript.libraries.vue.apports')),
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
        description: computed(() => t('technologies.javascript.libraries.react.description')),
        url: 'https://reactjs.org/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:react',
        utilisation: computed(() => t('technologies.javascript.libraries.react.utilisation')),
        apports: computed(() => t('technologies.javascript.libraries.react.apports')),
        creations: [
          projectsStore.projectList['video-learning'],
        ],
      },
      {
        name: 'Angular',
        description: computed(() => t('technologies.javascript.libraries.angular.description')),
        url: 'https://angular.dev/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:angular',
        utilisation: computed(() => t('technologies.javascript.libraries.angular.utilisation')),
      },
      {
        name: 'Leaflet',
        description: computed(() => t('technologies.javascript.libraries.leaflet.description')),
        url: 'https://leafletjs.com/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:leaf',
        utilisation: computed(() => t('technologies.javascript.libraries.leaflet.utilisation')),
        apports: computed(() => t('technologies.javascript.libraries.leaflet.apports')),
        creations: [
          projectsStore.projectList['map-education'],
          projectsStore.projectList['map-game'],
        ],
      },
      {
        name: 'NestJS',
        description: computed(() => t('technologies.javascript.libraries.nestjs.description')),
        url: 'https://nestjs.com/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-simple-icons:nestjs',
        utilisation: computed(() => t('technologies.javascript.libraries.nestjs.utilisation')),
        apports: computed(() => t('technologies.javascript.libraries.nestjs.apports')),
        creations: [
          projectsStore.projectList['bot-chat'],
        ],
      },
      {
        name: 'Firebase',
        description: computed(() => t('technologies.javascript.libraries.firebase.description')),
        url: 'https://firebase.google.com/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:firebase',
        utilisation: computed(() => t('technologies.javascript.libraries.firebase.utilisation')),
        apports: computed(() => t('technologies.javascript.libraries.firebase.apports')),
        creations: [
          projectsStore.projectList['interface-administration'],
        ],
      },
      {
        name: 'Three.js',
        description: computed(() => t('technologies.javascript.libraries.threejs.description')),
        url: 'https://threejs.org/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-tabler:brand-threejs',
        utilisation: computed(() => t('technologies.javascript.libraries.threejs.utilisation')),
        apports: computed(() => t('technologies.javascript.libraries.threejs.apports')),
        creations: [
          projectsStore.projectList['video-learning'],
          projectsStore.projectList['mini-games'],
        ],
      },

    ],
  },
  php: {
    name: 'PHP',
    description: computed(() => t('technologies.php.description')),
    utilisation: computed(() => t('technologies.php.utilisation')),
    experience: new Date().getFullYear() - 2018,
    icon: 'i-mdi:language-php',
    url: 'https://www.php.net/',
    libraries: [
      {
        name: 'Symfony',
        description: computed(() => t('technologies.php.libraries.symfony.description')),
        url: 'https://symfony.com/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:symfony',
        utilisation: computed(() => t('technologies.php.libraries.symfony.utilisation')),
        apports: computed(() => t('technologies.php.libraries.symfony.apports')),
      },
      {
        name: 'WordPress',
        description: computed(() => t('technologies.php.libraries.wordpress.description')),
        url: 'https://wordpress.org/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:wordpress',
        utilisation: computed(() => t('technologies.php.libraries.wordpress.utilisation')),
        creations: [
          projectsStore.projectList['map-education'],
        ],
        apports: computed(() => t('technologies.php.libraries.wordpress.apports')),
      },
    ],
  },
}

interface Software {
  name: string
  description: ComputedRef<string>
  url: string
  experience: number
  icon: {
    name: string
    classes?: string
  }
  utilisation: ComputedRef<string>
  class?: string
}

const softwares: Record<string, Software> = {
  photoshop: {
    name: 'Photoshop',
    utilisation: computed(() => t('logiciels.photoshop.utilisation')),
    description: computed(() => t('logiciels.photoshop.description')),
    url: 'https://www.adobe.com/fr/products/photoshop.html',
    experience: new Date().getFullYear() - 2013,
    icon: {
      name: 'i-logos:adobe-photoshop',
    },
  },
  illustrator: {
    name: 'Illustrator',
    description: computed(() => t('logiciels.illustrator.description')),
    utilisation: computed(() => t('logiciels.illustrator.utilisation')),
    url: 'https://www.adobe.com/fr/products/premiere.html',
    experience: 4,
    icon: {
      name: 'i-logos:adobe-illustrator',
    },
  },
  premierePro: {
    name: 'Premiere Pro',
    description: computed(() => t('logiciels.premierePro.description')),
    utilisation: computed(() => t('logiciels.premierePro.utilisation')),
    url: 'https://www.adobe.com/fr/products/premiere.html',
    experience: new Date().getFullYear() - 2010,
    icon: {
      name: 'i-logos:adobe-premiere',

    },
  },
  afterEffects: {
    name: 'After Effects',
    description: computed(() => t('logiciels.afterEffects.description')),
    utilisation: computed(() => t('logiciels.afterEffects.utilisation')),
    url: 'https://www.adobe.com/fr/products/aftereffects.html',
    experience: new Date().getFullYear() - 2019,
    icon: {
      name: 'i-logos:adobe-after-effects',

    },
  },
  davinciResolve: {
    name: 'DaVinci Resolve',
    description: computed(() => t('logiciels.davinciResolve.description')),
    url: 'https://www.blackmagicdesign.com/fr/products/davinciresolve',
    experience: new Date().getFullYear() - 2022,
    icon: {
      name: 'i-simple-icons:davinciresolve',

    },
    utilisation: computed(() => t('logiciels.davinciResolve.utilisation')),
  },
  vscode: {
    name: 'VSCode',
    description: computed(() => t('logiciels.vscode.description')),
    url: 'https://code.visualstudio.com/',
    experience: new Date().getFullYear() - 2017,
    icon: {
      name: 'i-logos:visual-studio-code',

    },
    utilisation: computed(() => t('logiciels.vscode.utilisation')),
  },
  obsStudio: {
    name: 'OBS Studio',
    description: computed(() => t('logiciels.obsStudio.description')),
    url: 'https://obsproject.com/',
    experience: new Date().getFullYear() - 2020,
    icon: {
      name: 'i-simple-icons:obsstudio',

    },
    utilisation: computed(() => t('logiciels.obsStudio.utilisation')),
  },
}
</script>

<template>
  <Pager>
    <TitleMain>{{ t('page.title') }}</TitleMain>
    <Card>
      <p class="text-justify">
        {{ t('description') }}
      </p>
    </Card>

    <TitleH2>
      {{ t('titles.languages') }}
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
            {{ technologie.name }}
          </TitleH2>
          <div class="flex items-center gap-2 text-gray-500">
            <div class="font-bold">
              {{ t('experience', { count: technologie.experience }) }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 text-justify">
        <p class="italic">
          {{ technologie.description }}
        </p>
        <p class="mt-2">
          {{ technologie.utilisation }}
        </p>
        <p v-if="technologie.apports" class="mt-2">
          {{ technologie.apports }}
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
          <div>{{ t('website.title') }}</div>
        </a>
      </div>

      <div v-if="technologie.libraries?.length" class="mt-6">
        <TitleH3>{{ t('titles.libraries') }}</TitleH3>
        <div class="grid gap-4" sm="grid-cols-2">
          <div
            v-for="lib in technologie.libraries"
            :key="lib.name"
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
                {{ lib.description }}
              </p>
              <p class="mb-2 text-sm">
                {{ lib.utilisation }}
              </p>
              <p v-if="lib.apports" class="mb-2 text-sm">
                {{ lib.apports }}
              </p>
              <a
                :href="lib.url"
                target="_blank"
                class="mt-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400"
                hover="underline"
              >
                <div class="i-mdi:web text-sm" />
                <div>{{ t('documentation') }}</div>
              </a>
            </div>

            <div v-if="lib.creations?.length" class="mt-2">
              <div class="mb-1 text-sm font-bold">
                Réalisations :
              </div>
              <div class="flex flex-wrap gap-2">
                <LinkMini v-for="creation in lib.creations" :key="creation.id" :to="`/projects/${creation.id}`">
                  {{ creation.name }}
                </LinkMini>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <TitleH2 class="mt-6">
      {{ t('titles.softwares') }}
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
              {{ software.name }}
            </TitleH2>
            <div class="flex items-center gap-2 text-gray-500">
              <div class="font-bold">
                {{ t('experience', { count: software.experience }) }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 text-justify">
          <p class="italic">
            {{ software.description }}
          </p>
          <p class="mt-4">
            {{ software.utilisation }}
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
            <div>{{ t('website.title') }}</div>
          </a>
        </div>
      </Card>
    </div>
  </Pager>
</template>

<i18n lang="yaml">
fr:
  page:
    title: Technologies & Logiciels
    description: Les technologies, langages, frameworks, bibliothèques, logiciels et outils que j'utilise.
  description: Mon expérience en tant que développeur web m'a fait découvrir plusieurs langages de programmation, ainsi que de multiples frameworks, bibliothèques et outils. J'ai également appris à utiliser différents logiciel pour mon travail en tant que créateur de contenu. Cet espace permet de centraliser les technologies que j'ai adoptées dans mon processus de travail.
  titles:
    languages: Langages de programmation
    softwares: Les logiciels que j'utilise régulièrement
    libraries: Bibliothèques et Frameworks associés
  documentation: Documentation
  website:
    title: Site officiel
  experience: "{count} an d'expérience | {count} ans d'expérience"
  technologies:
    javascript:
      description: JavaScript est un langage de programmation côté client utilisé pour créer des pages web interactives. Il est initialement conçu pour ajouter des fonctionnalités dynamiques aux pages web, aujourd'hui il est utilisé pour créer des applications web complexes.
      utilisation: J'ai utilisé JavaScript pour la création de sites web interactifs. Je me suis rapidement tourné vers le TypeScript pour gagner en qualité de code et en facilité de développement.
      libraries:
        vue:
          description: Vue.js est un framework JavaScript pour la création de pages web interactives. Il est conçu pour faciliter la création d'applications et de sites webs de toute taille.
          utilisation: J'ai utilisé Vue.js pour la création de sites, interfaces de gestion, et overlays interactifs.
          apports: Vue est le framework qui m'a le plus attiré, de pars son approche orientée HTML de la logique. C'est avec l'arrivée de Vue 3 que je l'ai intégré à une majorité de mes projets.
        react:
          description: React est une librairie JavaScript pour la création de pages web interactives. Elle est la librairie la plus utilisée et populaire pour la création d'applications web.
          utilisation: J'utilise principalement React pour la réalisation de vidéos automatisées grâce à la librairie Remotion. J'en connais les bases, mais ne le reserve que pour cette utilisation.
          apports: ""
        angular:
          description: Angular est un framework dédié à la création d'applications web ambitieuses.
          utilisation: Angular fut mon premier framework front end que j'ai découvert. Son approche orientée composants et son architecture imposant une découpe stricte du code m'ont ouvert à de nombreux concepts que j'utilise aujourd'hui.
        leaflet:
          description: Leaflet est une librairie JavaScript pour la création de cartes interactives.
          utilisation: J'utilise Leaflet pour la création de cartes interactives.
          apports: La simplicité d'utilisation de Leaflet m'a permis de gagner du temps lors de la création de cartes.
        nestjs:
          description: NestJS est un framework pour la création d'applications Node.js. Il impose un cadre pour la structure du code, mais offre une grande flexibilité permettant de répondre à des besoins variés.
          utilisation: J'ai utilisé NestJS pour la création d'API REST et GraphQL, de services d'authentification, de stockage de fichiers.
          apports: Ayant pas mal travaillé sur AngularJS, j'ai tout de suite accroché à la philosophie de NestJS. Aujourd'hui je l'utilise pour beaucoup de projets backend, de grande ou petite envergure.
        firebase:
          description: Firebase est un service de base de données NoSQL pour le développement web.
          utilisation: J'ai utilisé Firebase pour la sauvegarde de données, l'authentification, les données en temps réel dans des projets où j'avais besoin d'un service rapide à mettre en place.
          apports: Firebase me fait gagner beaucoup de temps quand je dois concevoir stocker des données lors d'un projet où les résultats doivent être rapides.
        threejs:
          description: Three.js est une librairie JavaScript pour la création de 3D.
          utilisation: J'utilise souvent cette technologie pour la création de projets où je souhaite intégrer des graphismes 3D sur des projets persos. Que ce soit des petits jeux sur navigateur ou des graphismes 3D pour des sites web.
          apports: Three.js m'a ouvert au monde du développement en 3D et aux jeux vidéos. J'ai beaucoup progressé sur la programmation Orienté Objet et les Design Patterns. J'ai également pu travailler avec des moteurs Physiques, notamment Rapier, pour intégrer un système de gestion des collisions.
    php:
      description: PHP est un langage de programmation principalement utilisé pour le développement web côté serveur. Il est très populaire pour son utilisation dans le développement web dynamique et son intégration avec HTML.
      utilisation: J'ai débuté la programmation grâce à ce langage, j'ai appris à l'utiliser pour factoriser la création de mes pages web. Jusqu'à concevoir des applications robustes grâce à son approche objet. Jusqu'à m'intéresser à des frameworks pour viser une structure plus propre et plus maintenable.
      libraries:
        symfony:
          description: Symfony est un framework PHP pour le développement web. Il est conçu pour faciliter la création d'applications web robustes et scalables.
          utilisation: J'ai travaillé avec Symfony durant de nombreux projets scolaires. L'objectif était de travailler efficacement en groupe, le cadre d'un tel framework d'organiser efficacement les différents jalons de production.
          apports: J'ai appris à mettre en place des bonnes pratiques de développement, comme un découpage strict et une gestion des erreurs efficace.
        wordpress:
          description: WordPress est un système de gestion de contenu (CMS) open source conçu pour faciliter la création de sites web. Il est largement utilisé pour la création de blogs et de sites vitrines.
          utilisation: J'ai utilisé WordPress pour la création de sites web à destination d'autoentrepreneurs et d'associations. L'intérêt principal de WordPress est de pouvoir laisser le client gérer son contenu sans avoir besoin de connaissances en programmation. Mon travail consiste principalement à concevoir des thèmes WordPress adaptés à leurs besoins.
          apports: J'ai appris travailler le référencement naturel, les bonnes pratiques de sécurité, et d'accessibilité.
  logiciels:
    photoshop:
      description: Photoshop est un logiciel de retouche d'images.
      utilisation: J'utilise Photoshop pour la retouche d'images, la création de visuels pour mes projets, ou pour travailler des supports visuels rapidement.
    illustrator:
      description: Illustrator est un logiciel de création de visuels vectoriels.
      utilisation: J'utilise Illustrator pour la création et modification de logos ou illustrations.
    premierePro:
      description: Premiere Pro est un logiciel de montage de vidéos.
      utilisation: J'utilise Premiere Pro pour réaliser une grande partie de les vidéos. Ma maîtrise du logiciel lié à une bonne organisation me permet de travailler très efficacement pour réaliser des montages dynamiques et impactants.
    afterEffects:
      description: After Effects est un logiciel d'animations graphiques, il est utilisé pour du motion design et des effets spéciaux.
      utilisation: J'utilise ce logiciel pour gagner fluidifier mon montage vidéo. Je n'ai pas une maîtrise d'un niveau expert, mais je m'en sers pour compléter l'utilisation de Premiere Pro.
    davinciResolve:
      description: DaVinci Resolve est un logiciel de montage de vidéos.
      utilisation: Je me suis formé à Da Vinci Resolve car c'est un logiciel très complet et gratuit. Il m'a permis de progresser en colorimétrie et réfléchir à de nouvelles façons de monter mes vidéos.
    vscode:
      description: VSCode est un éditeur de code multi-plateforme gratuit et open source.
      utilisation: J'utilise VSCode pour la plus part de mes projets et scripts. Ancient abonné à la suite JetBrains durant mes études, je ne souhaitais pas payer pour un IDE. J'ai adopté VSCode et son écosystème. J'apprécie avoir un contrôle sur mon environnement de travail.
    obsStudio:
      description: OBS Studio est un logiciel de capture et de streaming de vidéos.
      utilisation: J'utilise OBS Studio pour la gestion de les steams et l'enregistrement de scènes. C'est un logiciel stable et complet. Il m'a permis de concevoir des émissions en direct sur de longues périodes. Que ce soit des streams quotidiens ou des émissions durant plusieurs jours avec gérée par une équipe à distance.
en:
  page:
    title: Technologies & Software
    description: The technologies, languages, frameworks, libraries, software and tools that I use.
  description: My experience as a web developer has led me to discover several programming languages, as well as multiple frameworks, libraries, and tools. I have also learned to use various software for my work as a content creator. This space centralizes the technologies I have adopted in my workflow.
  titles:
    languages: Programming Languages
    softwares: Software I Regularly Use
    libraries: Associated Libraries and Frameworks
  documentation: Documentation
  experience: "{count} year of experience | {count} years of experience"
  website:
    title: Official Website
  technologies:
    javascript:
      description: JavaScript is a client-side programming language used to create interactive web pages. It was initially designed to add dynamic features to web pages, but today it is used to create complex web applications.
      utilisation: I used JavaScript to create interactive websites. I quickly turned to TypeScript to improve code quality and ease of development.
      libraries:
        vue:
          description: Vue.js is a JavaScript framework for creating interactive web pages. It is designed to facilitate the creation of applications and websites of any size.
          utilisation: I used Vue.js to create websites, management interfaces, and interactive overlays.
          apports: Vue is the framework that attracted me the most, due to its HTML-oriented approach to logic. It was with the arrival of Vue 3 that I integrated it into a majority of my projects.
        react:
          description: React is a JavaScript library for creating interactive web pages. It is the most used and popular library for creating web applications.
          utilisation: I mainly use React for the creation of automated videos thanks to the Remotion library. I know the basics, but only use it for this purpose.
          apports: ""
        angular:
          description: Angular is a framework dedicated to the creation of ambitious web applications.
          utilisation: Angular was my first front-end framework that I discovered. Its component-oriented approach and its architecture imposing a strict code division opened me up to many concepts that I use today.
        leaflet:
          description: Leaflet is a JavaScript library for creating interactive maps.
          utilisation: I use Leaflet to create interactive maps.
          apports: Leaflet's ease of use saved me time when creating maps.
        nestjs:
          description: NestJS is a framework for creating Node.js applications. It imposes a framework for the code structure, but offers great flexibility to meet various needs.
          utilisation: I used NestJS to create REST and GraphQL APIs, authentication services, and file storage.
          apports: Having worked quite a bit on AngularJS, I immediately took to the philosophy of NestJS. Today I use it for many backend projects, large or small.
        firebase:
          description: Firebase is a NoSQL database service for web development.
          utilisation: I used Firebase for data backup, authentication, and real-time data in projects where I needed a quick-to-set-up service.
          apports: Firebase saves me a lot of time when I have to design and store data for a project where results need to be fast.
        threejs:
          description: Three.js is a JavaScript library for creating 3D graphics.
          utilisation: I often use this technology for creating projects where I want to integrate 3D graphics into personal projects. Whether it's small browser games or 3D graphics for websites.
          apports: Three.js opened me up to the world of 3D development and video games. I have made a lot of progress on Object-Oriented Programming and Design Patterns. I was also able to work with Physics engines, notably Rapier, to integrate a collision management system.
    php:
      description: PHP is a programming language mainly used for server-side web development. It is very popular for its use in dynamic web development and its integration with HTML.
      utilisation: I started programming with this language, I learned to use it to factorize the creation of my web pages. Up to designing robust applications thanks to its object-oriented approach. Up to getting interested in frameworks to aim for a cleaner and more maintainable structure.
      libraries:
        symfony:
          description: Symfony is a PHP framework for web development. It is designed to facilitate the creation of robust and scalable web applications.
          utilisation: I worked with Symfony on many school projects. The objective was to work efficiently as a group, the framework of such a framework to effectively organize the different production milestones.
          apports: I learned to implement good development practices, such as strict division and effective error management.
        wordpress:
          description: WordPress is an open-source content management system (CMS) designed to facilitate website creation. It is widely used for creating blogs and showcase sites.
          utilisation: I used WordPress to create websites for self-employed entrepreneurs and associations. The main interest of WordPress is to allow the client to manage their content without needing programming knowledge. My work mainly consists of designing WordPress themes adapted to their needs.
          apports: I learned to work on natural referencing, good security practices, and accessibility.
  logiciels:
    photoshop:
      description: Photoshop is an image editing software.
      utilisation: I use Photoshop for image editing, creating visuals for my projects, or quickly working on visual media.
    illustrator:
      description: Illustrator is a vector graphics creation software.
      utilisation: I use Illustrator for creating and modifying logos or illustrations.
    premierePro:
      description: Premiere Pro is a video editing software.
      utilisation: I use Premiere Pro to produce a large part of the videos. My mastery of the software combined with good organization allows me to work very efficiently to create dynamic and impactful edits.
    afterEffects:
      description: After Effects is a motion graphics software, used for motion design and special effects.
      utilisation: I use this software to streamline my video editing. I don't have expert-level mastery, but I use it to complement the use of Premiere Pro.
    davinciResolve:
      description: DaVinci Resolve is a video editing software.
      utilisation: I trained in DaVinci Resolve because it is a very complete and free software. It allowed me to progress in color grading and think about new ways to edit my videos.
    vscode:
      description: VSCode is a free and open-source multi-platform code editor.
      utilisation: I use VSCode for most of my projects and scripts. Former subscriber to the JetBrains suite during my studies, I did not want to pay for an IDE. I adopted VSCode and its ecosystem. I appreciate having control over my work environment.
    obsStudio:
      description: OBS Studio is a video capture and streaming software.
      utilisation: I use OBS Studio for managing streams and recording scenes. It is stable and complete software. It allowed me to design live broadcasts over long periods. Whether it's daily streams or broadcasts lasting several days managed by a remote team.
</i18n>
